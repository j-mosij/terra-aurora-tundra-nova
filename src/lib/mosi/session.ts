import { b64, hex, sha256, sha256Hex, toArrayBuffer, unb64, unhex, zeroize } from "./bytes";

const BITS = 128;
const CAPS = new Set(["preview-fold", "export-ciphertext", "lease-read"]);

type Seal = { aes: CryptoKey; fp: string };
type Identity = { keys: CryptoKeyPair; fp: string };

const bag: { seal: Seal | null; identity: Identity | null } = {
  seal: null,
  identity: null,
};

export function sealReady(): boolean {
  return bag.seal !== null;
}

export function identityReady(): boolean {
  return bag.identity !== null;
}

export function identityFingerprint(): string | null {
  return bag.identity?.fp ?? null;
}

export async function openSeal(): Promise<string> {
  const mine = await crypto.subtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, false, ["deriveBits"]);
  const peer = await crypto.subtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, true, []);
  const pub = new Uint8Array(await crypto.subtle.exportKey("raw", peer.publicKey));
  const raw = new Uint8Array(
    await crypto.subtle.deriveBits({ name: "ECDH", public: peer.publicKey }, mine.privateKey, 256),
  );
  const fp = await sha256Hex(raw);
  const aes = await crypto.subtle.importKey("raw", raw, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
  zeroize(raw);
  zeroize(pub);
  bag.seal = { aes, fp };
  return fp;
}

export function sealFingerprint(): string | null {
  return bag.seal?.fp ?? null;
}

export async function encryptVault(plain: string): Promise<{ iv: string; ct: string }> {
  if (!bag.seal) throw new Error("NO_SEAL");
  const iv = new Uint8Array(12);
  crypto.getRandomValues(iv);
  const encoded = new TextEncoder().encode(plain);
  const ct = new Uint8Array(
    await crypto.subtle.encrypt({ name: "AES-GCM", iv }, bag.seal.aes, encoded),
  );
  const out = { iv: b64(iv), ct: b64(ct) };
  zeroize(encoded);
  zeroize(ct);
  zeroize(iv);
  return out;
}

export async function decryptVault(ivB64: string, ctB64: string): Promise<string> {
  if (!bag.seal) throw new Error("NO_SEAL");
  const iv = unb64(ivB64);
  const ct = unb64(ctB64);
  if (!iv || !ct) throw new Error("BAD_BLOB");
  try {
    const plain = new Uint8Array(
      await crypto.subtle.decrypt({ name: "AES-GCM", iv: toArrayBuffer(iv) }, bag.seal.aes, toArrayBuffer(ct)),
    );
    const text = new TextDecoder().decode(plain);
    zeroize(plain);
    return text;
  } finally {
    zeroize(iv);
    zeroize(ct);
  }
}

export async function mintIdentity(): Promise<string> {
  const keys = await crypto.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, false, ["sign", "verify"]);
  const spki = new Uint8Array(await crypto.subtle.exportKey("spki", keys.publicKey));
  const fp = await sha256Hex(spki);
  zeroize(spki);
  bag.identity = { keys, fp };
  return fp;
}

function canonical(lease: { v: 1; cap: string; exp: number; nonce: string }): string {
  return JSON.stringify({ v: lease.v, cap: lease.cap, exp: lease.exp, nonce: lease.nonce });
}

export async function issueLease(cap: string): Promise<string> {
  if (!bag.identity) throw new Error("NO_ID");
  if (!CAPS.has(cap)) throw new Error("BAD_CAP");
  const lease = { v: 1 as const, cap, exp: Date.now() + 15 * 60 * 1000, nonce: crypto.randomUUID() };
  const bytes = new TextEncoder().encode(canonical(lease));
  const sig = new Uint8Array(
    await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, bag.identity.keys.privateKey, bytes),
  );
  const pub = await crypto.subtle.exportKey("jwk", bag.identity.keys.publicKey);
  const ticket = JSON.stringify({ lease, sig: hex(sig), pub });
  zeroize(sig);
  zeroize(bytes);
  return ticket;
}

type Ticket = {
  lease: { v: 1; cap: string; exp: number; nonce: string };
  sig: string;
  pub: JsonWebKey;
};

function readTicket(text: string): Ticket | null {
  if (text.length > 12000) return null;
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return null;
  }
  if (!data || typeof data !== "object") return null;
  const rec = data as Record<string, unknown>;
  const lease = rec.lease;
  if (!lease || typeof lease !== "object") return null;
  const l = lease as Record<string, unknown>;
  if (l.v !== 1 || typeof l.cap !== "string" || typeof l.exp !== "number" || typeof l.nonce !== "string") return null;
  if (!CAPS.has(l.cap) || !Number.isFinite(l.exp)) return null;
  if (typeof rec.sig !== "string") return null;
  const pub = rec.pub;
  if (!pub || typeof pub !== "object") return null;
  const jwk = pub as JsonWebKey;
  if (jwk.kty !== "EC" || jwk.crv !== "P-256" || typeof jwk.x !== "string" || typeof jwk.y !== "string") return null;
  if ("d" in jwk) return null;
  return { lease: { v: 1, cap: l.cap, exp: l.exp, nonce: l.nonce }, sig: rec.sig, pub: jwk };
}

export type TicketVerdict = "valid" | "invalid" | "expired" | "foreign" | "malformed";

export async function verifyTicket(text: string): Promise<TicketVerdict> {
  const ticket = readTicket(text);
  if (!ticket) return "malformed";
  const sig = unhex(ticket.sig);
  if (!sig) return "malformed";
  try {
    const key = await crypto.subtle.importKey(
      "jwk",
      ticket.pub,
      { name: "ECDSA", namedCurve: "P-256" },
      true,
      ["verify"],
    );
    const bytes = new TextEncoder().encode(canonical(ticket.lease));
    const ok = await crypto.subtle.verify(
      { name: "ECDSA", hash: "SHA-256" },
      key,
      toArrayBuffer(sig),
      toArrayBuffer(bytes),
    );
    zeroize(sig);
    zeroize(bytes);
    if (!ok) return "invalid";
    const spki = new Uint8Array(await crypto.subtle.exportKey("spki", key));
    const fp = await sha256Hex(spki);
    zeroize(spki);
    if (!bag.identity || fp !== bag.identity.fp) return "foreign";
    if (ticket.lease.exp < Date.now()) return "expired";
    return "valid";
  } catch {
    zeroize(sig);
    return "malformed";
  }
}

async function lamportKeygen(): Promise<{ sk: Uint8Array; pk: Uint8Array }> {
  const sk = new Uint8Array(BITS * 2 * 32);
  crypto.getRandomValues(sk);
  const pk = new Uint8Array(BITS * 2 * 32);
  for (let i = 0; i < BITS * 2; i++) {
    const slice = sk.subarray(i * 32, i * 32 + 32);
    const hash = await sha256(slice);
    pk.set(hash, i * 32);
    zeroize(hash);
  }
  return { sk, pk };
}

async function lamportSign(sk: Uint8Array, message: Uint8Array): Promise<Uint8Array> {
  const digest = await sha256(message);
  const sig = new Uint8Array(BITS * 32);
  for (let i = 0; i < BITS; i++) {
    const bit = (digest[i >> 3] >> (7 - (i & 7))) & 1;
    const off = (i * 2 + bit) * 32;
    sig.set(sk.subarray(off, off + 32), i * 32);
  }
  zeroize(digest);
  return sig;
}

async function lamportVerify(pk: Uint8Array, message: Uint8Array, sig: Uint8Array): Promise<boolean> {
  const digest = await sha256(message);
  let ok = true;
  for (let i = 0; i < BITS; i++) {
    const bit = (digest[i >> 3] >> (7 - (i & 7))) & 1;
    const hash = await sha256(sig.subarray(i * 32, i * 32 + 32));
    const expect = pk.subarray((i * 2 + bit) * 32, (i * 2 + bit) * 32 + 32);
    for (let j = 0; j < 32; j++) if (hash[j] !== expect[j]) ok = false;
    zeroize(hash);
  }
  zeroize(digest);
  return ok;
}

export async function pqcSealIdentity(): Promise<{ ok: boolean; sigFp: string; pubFp: string }> {
  if (!bag.identity) throw new Error("NO_ID");
  const message = new TextEncoder().encode(`mosimodule-pqc-v1:${bag.identity.fp}`);
  const { sk, pk } = await lamportKeygen();
  const sig = await lamportSign(sk, message);
  zeroize(sk);
  const ok = await lamportVerify(pk, message, sig);
  const sigFp = await sha256Hex(sig);
  const pubFp = await sha256Hex(pk);
  zeroize(sig);
  zeroize(pk);
  zeroize(message);
  return { ok, sigFp, pubFp };
}

export function forgetSecrets(): void {
  bag.seal = null;
  bag.identity = null;
}
