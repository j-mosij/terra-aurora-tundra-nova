const HIDDEN = /[\u202A-\u202E\u2066-\u2069\u200B-\u200F\u2060\uFEFF\u2028\u2029]/g;
const CONTROLS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g;

const INJECTION = [
  /ignore (all |any )?(previous|prior|above)/i,
  /disregard (all |any )?(previous|prior|above)/i,
  /system prompt/i,
  /<\s*script/i,
  /javascript\s*:/i,
  /data\s*:\s*text\/html/i,
  /<\/\s*(script|iframe|object|embed)/i,
  /you are now/i,
  /jailbreak/i,
  /\[(?:system|inst|instruction)\]/i,
];

export type PurifyResult = {
  clean: string;
  held: boolean;
  reasons: string[];
};

function hits(text: string): boolean {
  return INJECTION.some((pattern) => pattern.test(text));
}

/** Local text filter. Does not fetch, and does not interpret the result as instructions. */
export function purifyDocument(input: string): PurifyResult {
  const reasons: string[] = [];
  const capped = input.slice(0, 4000);
  if (input.length > 4000) reasons.push("Truncated to 4000 characters.");

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

  return { clean: text, held, reasons };
}

export function cleanLabel(input: string): string {
  return input.replace(CONTROLS, "").replace(/<[^>]*>/g, "").replace(/[<>]/g, "").trim().slice(0, 48);
}

export function cleanSecret(input: string): string {
  return input.replace(/[\u0000-\u001F]/g, "").slice(0, 280);
}
