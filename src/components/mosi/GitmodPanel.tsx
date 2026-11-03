import { useEffect, useState } from "react";
import { cleanLabel, cleanSecret, purifyDocument } from "@/lib/mosi/purify";
import { readSessionId } from "@/lib/mosi/storage";
import {
  decryptVault,
  encryptVault,
  forgetSecrets,
  identityFingerprint,
  issueLease,
  mintIdentity,
  openSeal,
  pqcSealIdentity,
  sealFingerprint,
  verifyTicket,
  type TicketVerdict,
} from "@/lib/mosi/session";

type Entry = { id: string; label: string; iv: string; ct: string };

const control =
  "inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-surface px-3 text-sm text-fg hover:border-primary disabled:opacity-40";
const primary =
  "inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-3 text-sm text-bg hover:opacity-90 disabled:opacity-40";

const VERDICT: Record<TicketVerdict, string> = {
  valid: "Signature valid for this session, and the lease is still in time.",
  invalid: "Signature does not match the ticket.",
  expired: "Signature matches this session, but the lease has expired.",
  foreign: "Signature is valid for a different identity, not this session.",
  malformed: "Ticket could not be read. Private key material is refused.",
};

export function GitmodPanel() {
  const [sessionId, setSessionId] = useState("…");
  const [sealFp, setSealFp] = useState<string | null>(null);
  const [idFp, setIdFp] = useState<string | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [label, setLabel] = useState("");
  const [secret, setSecret] = useState("");
  const [revealed, setRevealed] = useState("");
  const [cap, setCap] = useState("preview-fold");
  const [ticket, setTicket] = useState("");
  const [verdict, setVerdict] = useState("");
  const [pqc, setPqc] = useState("");
  const [doc, setDoc] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const purified = purifyDocument(doc);

  useEffect(() => {
    setSessionId(readSessionId());
  }, []);

  useEffect(() => {
    if (!revealed) return;
    const timer = window.setTimeout(() => setRevealed(""), 8000);
    return () => window.clearTimeout(timer);
  }, [revealed]);

  async function run(work: () => Promise<void>) {
    setBusy(true);
    try {
      await work();
    } catch {
      setStatus("That step failed. Nothing was sent anywhere.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted">
        Local id {sessionId}. Keys stay in this tab. Reload drops them. Nothing here is fetched or written into the
        repo.
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={primary}
          disabled={busy}
          onClick={() =>
            void run(async () => {
              const fp = await openSeal();
              setSealFp(fp);
              setStatus("P-256 agreement sealed into a non-extractable AES-GCM key.");
            })
          }
        >
          Open fold seal
        </button>
        <button
          type="button"
          className={control}
          disabled={busy}
          onClick={() =>
            void run(async () => {
              const fp = await mintIdentity();
              setIdFp(fp);
              setStatus("P-256 identity minted. The private key cannot be exported.");
            })
          }
        >
          Mint elliptic identity
        </button>
      </div>
      {sealFp ? <p className="break-all text-xs text-muted">Seal {sealFp.slice(0, 24)}</p> : null}
      {idFp ? <p className="break-all text-xs text-muted">Identity {idFp.slice(0, 24)}</p> : null}

      <form
        className="flex flex-col gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          const nextLabel = cleanLabel(label);
          const nextSecret = cleanSecret(secret);
          if (!nextLabel || !nextSecret) {
            setStatus("Need a short label and a value. Labels are not encrypted.");
            return;
          }
          void run(async () => {
            const sealed = await encryptVault(nextSecret);
            setEntries((prev) => [{ id: crypto.randomUUID(), label: nextLabel, ...sealed }, ...prev].slice(0, 12));
            setSecret("");
            setStatus("Value sealed. The buffer was zeroized. The ciphertext stays in this tab.");
          });
        }}
      >
        <label className="text-sm text-fg" htmlFor="vault-label">
          Label, stored in the clear
        </label>
        <input
          id="vault-label"
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          maxLength={48}
          autoComplete="off"
          className="min-h-11 rounded-xl border border-border bg-bg px-3 text-sm text-fg"
        />
        <label className="text-sm text-fg" htmlFor="vault-secret">
          Value, encrypted
        </label>
        <input
          id="vault-secret"
          type="password"
          value={secret}
          onChange={(event) => setSecret(event.target.value)}
          maxLength={280}
          autoComplete="off"
          className="min-h-11 rounded-xl border border-border bg-bg px-3 text-sm text-fg"
        />
        <button type="submit" className={primary} disabled={busy || !sealFp}>
          Seal into vault
        </button>
      </form>

      <ul className="flex flex-col gap-2">
        {entries.map((entry) => (
          <li key={entry.id} className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-fg">{entry.label}</span>
            <button
              type="button"
              className={control}
              disabled={busy}
              onClick={() =>
                void run(async () => {
                  const text = await decryptVault(entry.iv, entry.ct);
                  setRevealed(text);
                  setStatus("Revealed for a few seconds, then cleared. Strings cannot be truly wiped.");
                })
              }
            >
              Reveal
            </button>
            <button
              type="button"
              className={control}
              onClick={() => setEntries((prev) => prev.filter((item) => item.id !== entry.id))}
            >
              Drop
            </button>
          </li>
        ))}
      </ul>
      {revealed ? (
        <p className="rounded-xl border border-border bg-bg p-3 text-sm text-fg" aria-live="polite">
          {revealed}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <label className="sr-only" htmlFor="lease-cap">
          Lease capability
        </label>
        <select
          id="lease-cap"
          value={cap}
          onChange={(event) => setCap(event.target.value)}
          className="min-h-11 rounded-xl border border-border bg-bg px-3 text-sm text-fg"
        >
          <option value="preview-fold">Preview the fold</option>
          <option value="export-ciphertext">Export ciphertext</option>
          <option value="lease-read">Read a lease ticket</option>
        </select>
        <button
          type="button"
          className={control}
          disabled={busy || !idFp}
          onClick={() =>
            void run(async () => {
              const next = await issueLease(cap);
              setTicket(next);
              setVerdict(await verifyTicket(next));
              setStatus("Lease signed with this session's P-256 key. It calls no API.");
            })
          }
        >
          Sign 15-minute lease
        </button>
      </div>
      {ticket ? (
        <textarea
          value={ticket}
          onChange={(event) => setTicket(event.target.value)}
          className="min-h-24 w-full rounded-xl border border-border bg-bg p-3 text-xs text-fg"
          spellCheck={false}
          aria-label="Lease ticket"
        />
      ) : null}
      {verdict ? <p className="text-sm text-accent">{VERDICT[verdict as TicketVerdict] ?? verdict}</p> : null}
      {ticket ? (
        <button
          type="button"
          className={control}
          disabled={busy}
          onClick={() =>
            void run(async () => {
              setVerdict(await verifyTicket(ticket));
            })
          }
        >
          Check ticket
        </button>
      ) : null}

      <button
        type="button"
        className={control}
        disabled={busy || !idFp}
        onClick={() =>
          void run(async () => {
            const result = await pqcSealIdentity();
            setPqc(
              result.ok
                ? `Lamport-128 seal checked. Public ${result.pubFp.slice(0, 16)}. Signature ${result.sigFp.slice(0, 16)}. Secret zeroized.`
                : "Seal did not verify.",
            );
          })
        }
      >
        One-time hash seal
      </button>
      {pqc ? <p className="text-sm text-fg">{pqc}</p> : null}

      <button
        type="button"
        className={control}
        onClick={() => {
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
        }}
      >
        Forget session keys
      </button>

      <div>
        <label className="text-sm text-fg" htmlFor="foldwatch">
          Foldwatch
        </label>
        <p className="mt-1 text-sm text-muted">
          Paste is filtered in the page. It is not fetched, and it is not fed to the fold. Markup, hidden marks, and
          instruction-override lines are held.
        </p>
        <textarea
          id="foldwatch"
          value={doc}
          onChange={(event) => setDoc(event.target.value)}
          maxLength={4000}
          className="mt-2 min-h-28 w-full rounded-xl border border-border bg-bg p-3 text-sm text-fg"
          spellCheck={false}
        />
        <p className={`mt-2 text-sm ${purified.held ? "text-primary" : "text-accent"}`} aria-live="polite">
          {purified.held ? "Hold" : "Clear"}
        </p>
        <ul className="mt-1 text-sm text-muted">
          {purified.reasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
        {purified.clean && !purified.held ? (
          <p className="mt-2 whitespace-pre-wrap rounded-xl border border-border bg-bg p-3 text-sm text-fg">
            {purified.clean}
          </p>
        ) : null}
      </div>
      {status ? <p className="text-sm text-muted">{status}</p> : null}
      <p className="text-sm text-muted">
        Elliptic curve work is WebCrypto P-256. The post-quantum seal is a one-time Lamport signature over the first
        128 bits of SHA-256, not a NIST lattice KEM. A public repository cannot hide a private folder, so Gitmod does
        not invent one.
      </p>
    </div>
  );
}
