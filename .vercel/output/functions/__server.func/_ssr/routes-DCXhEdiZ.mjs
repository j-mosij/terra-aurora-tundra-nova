import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Volume2, t as VolumeX } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DCXhEdiZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var PHI = (1 + Math.sqrt(5)) / 2;
/** Golden angle, about 137.507764°. */
var GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
/** arccot(φ) = arctan(1/φ). Yoshimura n=3 golden module angle. */
var GOLDEN_BETA = Math.atan(1 / PHI);
/** Classical flat-foldable Yoshimura angle for n=3. */
var CLASSIC_BETA = Math.PI / 6;
var BEST_KEY = "mosimodule-best-v1";
var SOUND_KEY = "mosimodule-sound-v1";
var VEHICLES = {
	k0: {
		modules: 1,
		name: "k0 pod",
		line: "One folded container. Three creases."
	},
	k3: {
		modules: 3,
		name: "k3 triad",
		line: "Three-ring boom. Ternary circumference."
	},
	k8: {
		modules: 8,
		name: "k8 octet",
		line: "Eight containers. The 2³ pop-space, opened."
	}
};
function moduleCount(id) {
	return VEHICLES[id].modules;
}
function emptyFolds(modules) {
	return Array.from({ length: modules * 3 }, () => 0);
}
function cycleCrease(c) {
	if (c === -1) return 0;
	if (c === 0) return 1;
	return -1;
}
function creaseName(c) {
	if (c === -1) return "valley";
	if (c === 1) return "mountain";
	return "flat";
}
function creaseMark(c) {
	if (c === -1) return "V";
	if (c === 1) return "M";
	return "F";
}
function fibonacci(n) {
	let a = 1;
	let b = 1;
	for (let i = 1; i < n; i++) {
		const next = a + b;
		a = b;
		b = next;
	}
	return a;
}
function fibonacciList(n) {
	const out = [];
	for (let i = 1; i <= n; i++) out.push(fibonacci(i));
	return out;
}
function toDeg(rad) {
	return rad * 180 / Math.PI;
}
var mosimodule_crease_default = "#!/usr/bin/env python3\n\"\"\"Mosimodule crease generator. Python 3 stdlib only. No network. No secrets.\"\"\"\n\nimport json\nimport math\nimport sys\n\nPHI = (1 + math.sqrt(5)) / 2\nGOLDEN_ANGLE = math.pi * (3 - math.sqrt(5))\nGOLDEN_BETA = math.atan(1 / PHI)\nCLASSIC_BETA = math.pi / 6\n\n\ndef fibonacci(n: int) -> list[int]:\n    a, b = 1, 1\n    out = []\n    for _ in range(n):\n        out.append(a)\n        a, b = b, a + b\n    return out\n\n\ndef phyllotaxis(count: int, scale: float = 0.052) -> list[dict[str, float]]:\n    pts = []\n    for i in range(count):\n        radius = scale * math.sqrt(i)\n        theta = i * GOLDEN_ANGLE\n        pts.append({\"i\": i, \"x\": radius * math.cos(theta), \"z\": radius * math.sin(theta)})\n    return pts\n\n\ndef check() -> None:\n    cot = 1 / math.tan(GOLDEN_BETA)\n    if abs(cot - PHI) > 1e-9:\n        raise SystemExit(\"cot(beta) is not phi\")\n    deg = math.degrees(GOLDEN_BETA)\n    if not 31.7 < deg < 31.73:\n        raise SystemExit(\"golden beta out of range\")\n    if abs(math.degrees(CLASSIC_BETA) - 30) > 1e-9:\n        raise SystemExit(\"classic beta is not 30\")\n\n\ndef main() -> int:\n    check()\n    json.dump(\n        {\n            \"phi\": PHI,\n            \"golden_angle_deg\": math.degrees(GOLDEN_ANGLE),\n            \"golden_beta_deg\": math.degrees(GOLDEN_BETA),\n            \"classic_beta_deg\": math.degrees(CLASSIC_BETA),\n            \"fibonacci\": fibonacci(8),\n            \"phyllotaxis_8\": phyllotaxis(8),\n        },\n        sys.stdout,\n        indent=2,\n    )\n    sys.stdout.write(\"\\n\")\n    return 0\n\n\nif __name__ == \"__main__\":\n    raise SystemExit(main())\n";
var gitmod_vault_default = "#!/usr/bin/env python3\n\"\"\"Gitmod policy. Stdlib only.\n\nA public git repository cannot contain a private directory. This tool\nrefuses to write plaintext secrets and will not create a hidden folder\nthat pretends to be private.\n\"\"\"\n\nimport argparse\nimport sys\n\n\ndef main(argv: list[str]) -> int:\n    parser = argparse.ArgumentParser(description=\"Gitmod vault policy\")\n    parser.add_argument(\"--write-secret\", action=\"store_true\", help=\"attempt a plaintext write (always refused)\")\n    parser.add_argument(\"--check\", action=\"store_true\", help=\"print the policy and exit 0\")\n    args = parser.parse_args(argv)\n    if args.write_secret:\n        sys.stderr.write(\"refused: plaintext secrets are not written to the tree\\n\")\n        return 2\n    sys.stdout.write(\n        \"gitmod: public trees stay public. ciphertext only, and only in memory. no private subfolder is created.\\n\"\n    )\n    return 0\n\n\nif __name__ == \"__main__\":\n    raise SystemExit(main(sys.argv[1:]))\n";
function randomCreases(modules) {
	const buf = new Uint8Array(modules * 3);
	crypto.getRandomValues(buf);
	const out = [];
	for (let i = 0; i < buf.length; i++) {
		const v = buf[i] % 3 - 1;
		out.push(v);
	}
	return out;
}
function sameCreases(a, b) {
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
	return true;
}
function dealTarget(modules, avoid) {
	for (let i = 0; i < 8; i++) {
		const target = randomCreases(modules);
		if (!target.every((c) => c === 0) && !sameCreases(target, avoid)) return target;
	}
	const fallback = randomCreases(modules);
	fallback[0] = 1;
	return fallback;
}
var ctx = null;
function unlockAudio() {
	try {
		if (!ctx) ctx = new AudioContext();
		if (ctx.state === "suspended") ctx.resume();
		return ctx;
	} catch {
		return null;
	}
}
function tone(context, freq, when, dur, peak) {
	const osc = context.createOscillator();
	const gain = context.createGain();
	osc.type = "triangle";
	osc.frequency.value = freq;
	gain.gain.setValueAtTime(1e-4, when);
	gain.gain.exponentialRampToValueAtTime(peak, when + .02);
	gain.gain.exponentialRampToValueAtTime(1e-4, when + dur);
	osc.connect(gain);
	gain.connect(context.destination);
	osc.start(when);
	osc.stop(when + dur + .02);
	osc.onended = () => {
		osc.disconnect();
		gain.disconnect();
	};
}
function playFold(crease, index) {
	const context = unlockAudio();
	if (!context) return;
	tone(context, 196 * Math.pow(PHI, index % 6 / 2) * (crease === 0 ? 1 : crease === 1 ? 1.03 : .97), context.currentTime, .28, .06);
}
function playSeat() {
	const context = unlockAudio();
	if (!context) return;
	const now = context.currentTime;
	for (let i = 0; i < 3; i++) tone(context, 220 * Math.pow(PHI, i / 2), now + i * .07, .4, .05);
}
function playLadder() {
	const context = unlockAudio();
	if (!context) return;
	const now = context.currentTime;
	for (let i = 0; i < 5; i++) tone(context, 196 * Math.pow(PHI, i / 2), now + i * .09, .22, .05);
}
function readBest() {
	try {
		const n = Number(localStorage.getItem(BEST_KEY));
		if (!Number.isFinite(n) || n < 0 || n > 1e6) return 0;
		return Math.floor(n);
	} catch {
		return 0;
	}
}
function writeBest(n) {
	try {
		localStorage.setItem(BEST_KEY, String(Math.floor(n)));
	} catch {}
}
function readSound() {
	try {
		return localStorage.getItem(SOUND_KEY) === "1";
	} catch {
		return false;
	}
}
function writeSound(on) {
	try {
		localStorage.setItem(SOUND_KEY, on ? "1" : "0");
	} catch {}
}
function readSessionId() {
	const key = "mosimodule-session-v1";
	try {
		const existing = sessionStorage.getItem(key);
		if (existing && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(existing)) return existing;
		const id = crypto.randomUUID();
		sessionStorage.setItem(key, id);
		return id;
	} catch {
		return crypto.randomUUID();
	}
}
function FoldCanvas({ folds, target, modules, onCycle }) {
	const canvasRef = (0, import_react.useRef)(null);
	const handleRef = (0, import_react.useRef)(null);
	const cycleRef = (0, import_react.useRef)(onCycle);
	const viewRef = (0, import_react.useRef)({
		folds,
		target,
		modules
	});
	cycleRef.current = onCycle;
	viewRef.current = {
		folds,
		target,
		modules
	};
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		let alive = true;
		let handle = null;
		import("./stage-Bu24Y4Ia.mjs").then(({ mountStage }) => {
			if (!alive) return;
			handle = mountStage(canvas, (module, crease) => cycleRef.current(module, crease));
			handleRef.current = handle;
			const view = viewRef.current;
			handle.setFolds(view.folds, view.target, view.modules);
		});
		return () => {
			alive = false;
			handle?.dispose();
			handleRef.current = null;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		handleRef.current?.setFolds(folds, target, modules);
	}, [
		folds,
		target,
		modules
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		className: "block h-full w-full touch-none",
		"aria-label": "Mosimodule sculpture. Drag to orbit, pinch to zoom, tap a facet to cycle valley, flat, mountain."
	});
}
var HIDDEN = /[\u202A-\u202E\u2066-\u2069\u200B-\u200F\u2060\uFEFF\u2028\u2029]/g;
var CONTROLS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g;
var INJECTION = [
	/ignore (all |any )?(previous|prior|above)/i,
	/disregard (all |any )?(previous|prior|above)/i,
	/system prompt/i,
	/<\s*script/i,
	/javascript\s*:/i,
	/data\s*:\s*text\/html/i,
	/<\/\s*(script|iframe|object|embed)/i,
	/you are now/i,
	/jailbreak/i,
	/\[(?:system|inst|instruction)\]/i
];
function hits(text) {
	return INJECTION.some((pattern) => pattern.test(text));
}
/** Local text filter. Does not fetch, and does not interpret the result as instructions. */
function purifyDocument(input) {
	const reasons = [];
	const capped = input.slice(0, 4e3);
	if (input.length > 4e3) reasons.push("Truncated to 4000 characters.");
	let text = capped;
	if (HIDDEN.test(text)) {
		reasons.push("Stripped hidden direction or zero-width marks.");
		text = text.replace(HIDDEN, "");
	}
	if (CONTROLS.test(text)) {
		reasons.push("Stripped control characters.");
		text = text.replace(CONTROLS, "");
	}
	if (/[<>]|&\s*#/.test(text)) {
		reasons.push("Stripped markup.");
		text = text.replace(/<[^>]*>/g, "").replace(/[<>]/g, "");
	}
	text = text.replace(/[ \t]+\n/g, "\n").trim();
	const held = hits(capped) || hits(text);
	if (held) reasons.push("Held. Instruction-override pattern. The fold engine will not read this.");
	return {
		clean: text,
		held,
		reasons
	};
}
function cleanLabel(input) {
	return input.replace(CONTROLS, "").replace(/<[^>]*>/g, "").replace(/[<>]/g, "").trim().slice(0, 48);
}
function cleanSecret(input) {
	return input.replace(/[\u0000-\u001F]/g, "").slice(0, 280);
}
function zeroize(bytes) {
	if (!bytes || bytes.byteLength === 0) return;
	bytes.fill(0);
	crypto.getRandomValues(bytes);
	bytes.fill(0);
}
function hex(bytes) {
	let out = "";
	for (let i = 0; i < bytes.length; i++) out += bytes[i].toString(16).padStart(2, "0");
	return out;
}
function unhex(value) {
	if (value.length % 2 !== 0 || !/^[0-9a-f]+$/i.test(value)) return null;
	const out = new Uint8Array(value.length / 2);
	for (let i = 0; i < out.length; i++) out[i] = Number.parseInt(value.slice(i * 2, i * 2 + 2), 16);
	return out;
}
function b64(bytes) {
	let binary = "";
	for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
	return btoa(binary);
}
function unb64(value) {
	try {
		const binary = atob(value);
		const out = new Uint8Array(binary.length);
		for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
		return out;
	} catch {
		return null;
	}
}
function toArrayBuffer(data) {
	const copy = new ArrayBuffer(data.byteLength);
	new Uint8Array(copy).set(data);
	return copy;
}
async function sha256(data) {
	return new Uint8Array(await crypto.subtle.digest("SHA-256", toArrayBuffer(data)));
}
async function sha256Hex(data) {
	const digest = await sha256(data);
	const out = hex(digest);
	zeroize(digest);
	return out;
}
var BITS = 128;
var CAPS = /* @__PURE__ */ new Set([
	"preview-fold",
	"export-ciphertext",
	"lease-read"
]);
var bag = {
	seal: null,
	identity: null
};
function identityFingerprint() {
	return bag.identity?.fp ?? null;
}
async function openSeal() {
	const mine = await crypto.subtle.generateKey({
		name: "ECDH",
		namedCurve: "P-256"
	}, false, ["deriveBits"]);
	const peer = await crypto.subtle.generateKey({
		name: "ECDH",
		namedCurve: "P-256"
	}, true, []);
	const pub = new Uint8Array(await crypto.subtle.exportKey("raw", peer.publicKey));
	const raw = new Uint8Array(await crypto.subtle.deriveBits({
		name: "ECDH",
		public: peer.publicKey
	}, mine.privateKey, 256));
	const fp = await sha256Hex(raw);
	const aes = await crypto.subtle.importKey("raw", raw, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
	zeroize(raw);
	zeroize(pub);
	bag.seal = {
		aes,
		fp
	};
	return fp;
}
function sealFingerprint() {
	return bag.seal?.fp ?? null;
}
async function encryptVault(plain) {
	if (!bag.seal) throw new Error("NO_SEAL");
	const iv = /* @__PURE__ */ new Uint8Array(12);
	crypto.getRandomValues(iv);
	const encoded = new TextEncoder().encode(plain);
	const ct = new Uint8Array(await crypto.subtle.encrypt({
		name: "AES-GCM",
		iv
	}, bag.seal.aes, encoded));
	const out = {
		iv: b64(iv),
		ct: b64(ct)
	};
	zeroize(encoded);
	zeroize(ct);
	zeroize(iv);
	return out;
}
async function decryptVault(ivB64, ctB64) {
	if (!bag.seal) throw new Error("NO_SEAL");
	const iv = unb64(ivB64);
	const ct = unb64(ctB64);
	if (!iv || !ct) throw new Error("BAD_BLOB");
	try {
		const plain = new Uint8Array(await crypto.subtle.decrypt({
			name: "AES-GCM",
			iv: toArrayBuffer(iv)
		}, bag.seal.aes, toArrayBuffer(ct)));
		const text = new TextDecoder().decode(plain);
		zeroize(plain);
		return text;
	} finally {
		zeroize(iv);
		zeroize(ct);
	}
}
async function mintIdentity() {
	const keys = await crypto.subtle.generateKey({
		name: "ECDSA",
		namedCurve: "P-256"
	}, false, ["sign", "verify"]);
	const spki = new Uint8Array(await crypto.subtle.exportKey("spki", keys.publicKey));
	const fp = await sha256Hex(spki);
	zeroize(spki);
	bag.identity = {
		keys,
		fp
	};
	return fp;
}
function canonical(lease) {
	return JSON.stringify({
		v: lease.v,
		cap: lease.cap,
		exp: lease.exp,
		nonce: lease.nonce
	});
}
async function issueLease(cap) {
	if (!bag.identity) throw new Error("NO_ID");
	if (!CAPS.has(cap)) throw new Error("BAD_CAP");
	const lease = {
		v: 1,
		cap,
		exp: Date.now() + 9e5,
		nonce: crypto.randomUUID()
	};
	const bytes = new TextEncoder().encode(canonical(lease));
	const sig = new Uint8Array(await crypto.subtle.sign({
		name: "ECDSA",
		hash: "SHA-256"
	}, bag.identity.keys.privateKey, bytes));
	const pub = await crypto.subtle.exportKey("jwk", bag.identity.keys.publicKey);
	const ticket = JSON.stringify({
		lease,
		sig: hex(sig),
		pub
	});
	zeroize(sig);
	zeroize(bytes);
	return ticket;
}
function readTicket(text) {
	if (text.length > 12e3) return null;
	let data;
	try {
		data = JSON.parse(text);
	} catch {
		return null;
	}
	if (!data || typeof data !== "object") return null;
	const rec = data;
	const lease = rec.lease;
	if (!lease || typeof lease !== "object") return null;
	const l = lease;
	if (l.v !== 1 || typeof l.cap !== "string" || typeof l.exp !== "number" || typeof l.nonce !== "string") return null;
	if (!CAPS.has(l.cap) || !Number.isFinite(l.exp)) return null;
	if (typeof rec.sig !== "string") return null;
	const pub = rec.pub;
	if (!pub || typeof pub !== "object") return null;
	const jwk = pub;
	if (jwk.kty !== "EC" || jwk.crv !== "P-256" || typeof jwk.x !== "string" || typeof jwk.y !== "string") return null;
	if ("d" in jwk) return null;
	return {
		lease: {
			v: 1,
			cap: l.cap,
			exp: l.exp,
			nonce: l.nonce
		},
		sig: rec.sig,
		pub: jwk
	};
}
async function verifyTicket(text) {
	const ticket = readTicket(text);
	if (!ticket) return "malformed";
	const sig = unhex(ticket.sig);
	if (!sig) return "malformed";
	try {
		const key = await crypto.subtle.importKey("jwk", ticket.pub, {
			name: "ECDSA",
			namedCurve: "P-256"
		}, true, ["verify"]);
		const bytes = new TextEncoder().encode(canonical(ticket.lease));
		const ok = await crypto.subtle.verify({
			name: "ECDSA",
			hash: "SHA-256"
		}, key, toArrayBuffer(sig), toArrayBuffer(bytes));
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
async function lamportKeygen() {
	const sk = /* @__PURE__ */ new Uint8Array(8192);
	crypto.getRandomValues(sk);
	const pk = /* @__PURE__ */ new Uint8Array(8192);
	for (let i = 0; i < 256; i++) {
		const hash = await sha256(sk.subarray(i * 32, i * 32 + 32));
		pk.set(hash, i * 32);
		zeroize(hash);
	}
	return {
		sk,
		pk
	};
}
async function lamportSign(sk, message) {
	const digest = await sha256(message);
	const sig = /* @__PURE__ */ new Uint8Array(4096);
	for (let i = 0; i < BITS; i++) {
		const bit = digest[i >> 3] >> 7 - (i & 7) & 1;
		const off = (i * 2 + bit) * 32;
		sig.set(sk.subarray(off, off + 32), i * 32);
	}
	zeroize(digest);
	return sig;
}
async function lamportVerify(pk, message, sig) {
	const digest = await sha256(message);
	let ok = true;
	for (let i = 0; i < BITS; i++) {
		const bit = digest[i >> 3] >> 7 - (i & 7) & 1;
		const hash = await sha256(sig.subarray(i * 32, i * 32 + 32));
		const expect = pk.subarray((i * 2 + bit) * 32, (i * 2 + bit) * 32 + 32);
		for (let j = 0; j < 32; j++) if (hash[j] !== expect[j]) ok = false;
		zeroize(hash);
	}
	zeroize(digest);
	return ok;
}
async function pqcSealIdentity() {
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
	return {
		ok,
		sigFp,
		pubFp
	};
}
function forgetSecrets() {
	bag.seal = null;
	bag.identity = null;
}
var control$1 = "inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-surface px-3 text-sm text-fg hover:border-primary disabled:opacity-40";
var primary$1 = "inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-3 text-sm text-bg hover:opacity-90 disabled:opacity-40";
var VERDICT = {
	valid: "Signature valid for this session, and the lease is still in time.",
	invalid: "Signature does not match the ticket.",
	expired: "Signature matches this session, but the lease has expired.",
	foreign: "Signature is valid for a different identity, not this session.",
	malformed: "Ticket could not be read. Private key material is refused."
};
function GitmodPanel() {
	const [sessionId, setSessionId] = (0, import_react.useState)("…");
	const [sealFp, setSealFp] = (0, import_react.useState)(null);
	const [idFp, setIdFp] = (0, import_react.useState)(null);
	const [entries, setEntries] = (0, import_react.useState)([]);
	const [label, setLabel] = (0, import_react.useState)("");
	const [secret, setSecret] = (0, import_react.useState)("");
	const [revealed, setRevealed] = (0, import_react.useState)("");
	const [cap, setCap] = (0, import_react.useState)("preview-fold");
	const [ticket, setTicket] = (0, import_react.useState)("");
	const [verdict, setVerdict] = (0, import_react.useState)("");
	const [pqc, setPqc] = (0, import_react.useState)("");
	const [doc, setDoc] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const purified = purifyDocument(doc);
	(0, import_react.useEffect)(() => {
		setSessionId(readSessionId());
	}, []);
	(0, import_react.useEffect)(() => {
		if (!revealed) return;
		const timer = window.setTimeout(() => setRevealed(""), 8e3);
		return () => window.clearTimeout(timer);
	}, [revealed]);
	async function run(work) {
		setBusy(true);
		try {
			await work();
		} catch {
			setStatus("That step failed. Nothing was sent anywhere.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Local id ",
					sessionId,
					". Keys stay in this tab. Reload drops them. Nothing here is fetched or written into the repo."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: primary$1,
					disabled: busy,
					onClick: () => void run(async () => {
						const fp = await openSeal();
						setSealFp(fp);
						setStatus("P-256 agreement sealed into a non-extractable AES-GCM key.");
					}),
					children: "Open fold seal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: control$1,
					disabled: busy,
					onClick: () => void run(async () => {
						const fp = await mintIdentity();
						setIdFp(fp);
						setStatus("P-256 identity minted. The private key cannot be exported.");
					}),
					children: "Mint elliptic identity"
				})]
			}),
			sealFp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "break-all text-xs text-muted",
				children: ["Seal ", sealFp.slice(0, 24)]
			}) : null,
			idFp ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "break-all text-xs text-muted",
				children: ["Identity ", idFp.slice(0, 24)]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-2",
				onSubmit: (event) => {
					event.preventDefault();
					const nextLabel = cleanLabel(label);
					const nextSecret = cleanSecret(secret);
					if (!nextLabel || !nextSecret) {
						setStatus("Need a short label and a value. Labels are not encrypted.");
						return;
					}
					run(async () => {
						const sealed = await encryptVault(nextSecret);
						setEntries((prev) => [{
							id: crypto.randomUUID(),
							label: nextLabel,
							...sealed
						}, ...prev].slice(0, 12));
						setSecret("");
						setStatus("Value sealed. The buffer was zeroized. The ciphertext stays in this tab.");
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm text-fg",
						htmlFor: "vault-label",
						children: "Label, stored in the clear"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "vault-label",
						value: label,
						onChange: (event) => setLabel(event.target.value),
						maxLength: 48,
						autoComplete: "off",
						className: "min-h-11 rounded-xl border border-border bg-bg px-3 text-sm text-fg"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm text-fg",
						htmlFor: "vault-secret",
						children: "Value, encrypted"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "vault-secret",
						type: "password",
						value: secret,
						onChange: (event) => setSecret(event.target.value),
						maxLength: 280,
						autoComplete: "off",
						className: "min-h-11 rounded-xl border border-border bg-bg px-3 text-sm text-fg"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: primary$1,
						disabled: busy || !sealFp,
						children: "Seal into vault"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-2",
				children: entries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-fg",
							children: entry.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: control$1,
							disabled: busy,
							onClick: () => void run(async () => {
								const text = await decryptVault(entry.iv, entry.ct);
								setRevealed(text);
								setStatus("Revealed for a few seconds, then cleared. Strings cannot be truly wiped.");
							}),
							children: "Reveal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: control$1,
							onClick: () => setEntries((prev) => prev.filter((item) => item.id !== entry.id)),
							children: "Drop"
						})
					]
				}, entry.id))
			}),
			revealed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-xl border border-border bg-bg p-3 text-sm text-fg",
				"aria-live": "polite",
				children: revealed
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "sr-only",
						htmlFor: "lease-cap",
						children: "Lease capability"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						id: "lease-cap",
						value: cap,
						onChange: (event) => setCap(event.target.value),
						className: "min-h-11 rounded-xl border border-border bg-bg px-3 text-sm text-fg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "preview-fold",
								children: "Preview the fold"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "export-ciphertext",
								children: "Export ciphertext"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "lease-read",
								children: "Read a lease ticket"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: control$1,
						disabled: busy || !idFp,
						onClick: () => void run(async () => {
							const next = await issueLease(cap);
							setTicket(next);
							setVerdict(await verifyTicket(next));
							setStatus("Lease signed with this session's P-256 key. It calls no API.");
						}),
						children: "Sign 15-minute lease"
					})
				]
			}),
			ticket ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				value: ticket,
				onChange: (event) => setTicket(event.target.value),
				className: "min-h-24 w-full rounded-xl border border-border bg-bg p-3 text-xs text-fg",
				spellCheck: false,
				"aria-label": "Lease ticket"
			}) : null,
			verdict ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-accent",
				children: VERDICT[verdict] ?? verdict
			}) : null,
			ticket ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: control$1,
				disabled: busy,
				onClick: () => void run(async () => {
					setVerdict(await verifyTicket(ticket));
				}),
				children: "Check ticket"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: control$1,
				disabled: busy || !idFp,
				onClick: () => void run(async () => {
					const result = await pqcSealIdentity();
					setPqc(result.ok ? `Lamport-128 seal checked. Public ${result.pubFp.slice(0, 16)}. Signature ${result.sigFp.slice(0, 16)}. Secret zeroized.` : "Seal did not verify.");
				}),
				children: "One-time hash seal"
			}),
			pqc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-fg",
				children: pqc
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: control$1,
				onClick: () => {
					forgetSecrets();
					setSealFp(sealFingerprint());
					setIdFp(identityFingerprint());
					setEntries([]);
					setSecret("");
					setRevealed("");
					setTicket("");
					setVerdict("");
					setPqc("");
					setStatus("Session keys dropped. Ciphertext in this panel was discarded.");
				},
				children: "Forget session keys"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-sm text-fg",
					htmlFor: "foldwatch",
					children: "Foldwatch"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Paste is filtered in the page. It is not fetched, and it is not fed to the fold. Markup, hidden marks, and instruction-override lines are held."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					id: "foldwatch",
					value: doc,
					onChange: (event) => setDoc(event.target.value),
					maxLength: 4e3,
					className: "mt-2 min-h-28 w-full rounded-xl border border-border bg-bg p-3 text-sm text-fg",
					spellCheck: false
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: `mt-2 text-sm ${purified.held ? "text-primary" : "text-accent"}`,
					"aria-live": "polite",
					children: purified.held ? "Hold" : "Clear"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-1 text-sm text-muted",
					children: purified.reasons.map((reason) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: reason }, reason))
				}),
				purified.clean && !purified.held ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 whitespace-pre-wrap rounded-xl border border-border bg-bg p-3 text-sm text-fg",
					children: purified.clean
				}) : null
			] }),
			status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: status
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Elliptic curve work is WebCrypto P-256. The post-quantum seal is a one-time Lamport signature over the first 128 bits of SHA-256, not a NIST lattice KEM. A public repository cannot hide a private folder, so Gitmod does not invent one."
			})
		]
	});
}
function Line({ crease }) {
	if (crease === -1) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 flex-1 rounded-sm bg-fg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 flex-1 rounded-sm bg-fg" })]
	});
	if (crease === 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-1.5 rounded-sm bg-fg" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-1.5 rounded-sm bg-primary" });
}
function Hexagram({ creases, label }) {
	const six = [];
	for (let i = 0; i < 6; i++) six.push(creases[i] ?? 0);
	const topDown = [...six].reverse();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-1.5",
			"aria-hidden": true,
			children: topDown.map((crease, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, { crease }, index))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-muted",
			children: label
		})]
	});
}
var control = "inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-surface px-3 text-sm text-fg hover:border-primary disabled:opacity-40";
var primary = "inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-3 text-sm text-bg hover:opacity-90 disabled:opacity-40";
function download(name, source) {
	const blob = new Blob([source], { type: "text/x-python" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = name;
	link.click();
	URL.revokeObjectURL(url);
}
function App() {
	const [vehicle, setVehicle] = (0, import_react.useState)("k3");
	const [folds, setFolds] = (0, import_react.useState)(() => emptyFolds(3));
	const [target, setTarget] = (0, import_react.useState)(() => emptyFolds(3).map(() => 1));
	const [booted, setBooted] = (0, import_react.useState)(false);
	const [score, setScore] = (0, import_react.useState)(0);
	const [best, setBest] = (0, import_react.useState)(0);
	const [streak, setStreak] = (0, import_react.useState)(0);
	const [solved, setSolved] = (0, import_react.useState)(0);
	const [moves, setMoves] = (0, import_react.useState)(0);
	const [soundOn, setSoundOn] = (0, import_react.useState)(false);
	const [flash, setFlash] = (0, import_react.useState)(false);
	const [history, setHistory] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const next = emptyFolds(3);
		setFolds(next);
		setTarget(dealTarget(3, next));
		setBest(readBest());
		setSoundOn(readSound());
		setBooted(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!flash) return;
		const timer = window.setTimeout(() => setFlash(false), 1200);
		return () => window.clearTimeout(timer);
	}, [flash]);
	const modules = moduleCount(vehicle);
	function onCycle(module, crease) {
		if (!booted) return;
		const index = module * 3 + crease;
		if (index < 0 || index >= folds.length) return;
		const next = folds.slice();
		next[index] = cycleCrease(next[index] ?? 0);
		setMoves((value) => value + 1);
		if (soundOn) playFold(next[index], index);
		if (sameCreases(next, target)) {
			const scored = score + fibonacci(streak + 1);
			const bestNext = Math.max(best, scored);
			setScore(scored);
			setBest(bestNext);
			writeBest(bestNext);
			setStreak((value) => value + 1);
			setSolved((value) => value + 1);
			setHistory((prev) => [next.slice(0, 6), ...prev].slice(0, 4));
			setFlash(true);
			if (soundOn) playSeat();
			setTarget(dealTarget(modules, next));
		}
		setFolds(next);
	}
	function choose(id) {
		const count = moduleCount(id);
		const next = emptyFolds(count);
		setVehicle(id);
		setFolds(next);
		setTarget(dealTarget(count, next));
		setStreak(0);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh flex-col overflow-hidden bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-xl leading-none",
				children: "Mosimodule"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Golden ternary flat fold"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [score, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-fg",
						children: [" / ", best]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: control,
					"aria-pressed": soundOn,
					onClick: () => {
						const next = !soundOn;
						setSoundOn(next);
						writeSound(next);
						if (next) playLadder();
					},
					children: [
						soundOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: soundOn ? "Sound on" : "Sound off"
						}),
						"Sonify"
					]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-1 flex-col lg:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-1/2 min-h-64 shrink-0 lg:h-auto lg:min-h-0 lg:flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoldCanvas, {
						folds,
						target,
						modules,
						onCycle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pointer-events-none absolute bottom-3 left-4 text-sm text-muted",
						children: "Drag to orbit. Pinch to zoom. Tap a facet."
					}),
					flash ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "absolute left-4 top-3 rounded-xl bg-primary px-3 py-2 text-sm text-bg",
						children: "Fold seated"
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "min-h-0 flex-1 overflow-y-auto border-t border-border lg:h-full lg:w-96 lg:flex-none lg:border-l lg:border-t-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sticky top-0 z-10 flex items-end gap-4 border-b border-border bg-bg px-4 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hexagram, {
								creases: folds,
								label: "Live"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hexagram, {
								creases: target,
								label: "Target"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "pb-1 text-sm text-muted",
								children: [
									solved,
									" seated",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block",
										children: "Mountain solid, valley broken, flat gold."
									})
								]
							})
						]
					}),
					history.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-3 overflow-x-auto border-b border-border px-4 py-3",
						children: history.map((reading, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hexagram, {
							creases: reading,
							label: `Seat ${solved - index}`
						}, index))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "border-b border-border px-4 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-widest text-muted",
								children: "CELL 01"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 font-display text-lg",
								children: "Vehicle"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted",
								children: [
									"Design angle β ≈ ",
									toDeg(GOLDEN_BETA).toFixed(2),
									"° where cot β = φ. Classical flat fold sits at",
									" ",
									toDeg(CLASSIC_BETA).toFixed(0),
									"°. These are lattice sizes, not a cluster install."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 grid grid-cols-3 gap-2",
								children: Object.keys(VEHICLES).map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: vehicle === id ? primary : control,
									onClick: () => choose(id),
									children: VEHICLES[id].name
								}, id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-fg",
								children: VEHICLES[vehicle].line
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "border-b border-border px-4 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-widest text-muted",
								children: "CELL 02"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 font-display text-lg",
								children: "Creases"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted",
								children: [
									"Cycle valley, flat, mountain. A match scores the next Fibonacci step. ",
									moves,
									" moves."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex flex-col gap-2",
								children: Array.from({ length: modules }, (_, module) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-4 gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex min-h-11 items-center text-sm text-muted",
										children: module + 1
									}), [
										0,
										1,
										2
									].map((crease) => {
										const value = folds[module * 3 + crease] ?? 0;
										const matched = value === (target[module * 3 + crease] ?? 0);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: matched ? `${control} border-accent text-accent` : control,
											onClick: () => onCycle(module, crease),
											"aria-label": `Module ${module + 1} crease ${crease + 1}, ${creaseName(value)}`,
											children: creaseMark(value)
										}, crease);
									})]
								}, module))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: control,
									onClick: () => setFolds(emptyFolds(modules)),
									children: "Rest"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: control,
									onClick: () => {
										setTarget(dealTarget(modules, folds));
										setStreak(0);
									},
									children: "Redeal"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "border-b border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
							className: "px-4 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs tracking-widest text-muted",
								children: "CELL 03"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block font-display text-lg",
								children: "Gitmod seal"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-4 pb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitmodPanel, {})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "border-b border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
							className: "px-4 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs tracking-widest text-muted",
								children: "CELL 04"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block font-display text-lg",
								children: "Research twin"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 px-4 pb-4 text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"φ ",
									PHI.toFixed(6),
									". Golden angle ",
									toDeg(GOLDEN_ANGLE).toFixed(3),
									"°. Fibonacci",
									" ",
									fibonacciList(8).join(" "),
									"."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The sunflower disk, pinecone stack, ocean spray, and torus are one sculpture. The Python files are the stdlib twin of the crease math and the vault policy. They do not run in the page." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: control,
										onClick: () => download("mosimodule_crease.py", mosimodule_crease_default),
										children: "Crease script"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: control,
										onClick: () => download("gitmod_vault.py", gitmod_vault_default),
										children: "Gitmod policy"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Sonify plays a golden ladder, 196 Hz times powers of φ, on the first tap after you turn it on. No audio leaves the browser." })
							]
						})]
					})
				]
			})]
		})]
	});
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {});
}
//#endregion
export { GOLDEN_ANGLE as n, routes_exports as t };
