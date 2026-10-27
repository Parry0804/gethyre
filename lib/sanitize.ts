import "server-only";

/** Longest raw value we'll even look at; anything bigger is cut before validation. */
const MAX_RAW = 2000;

/**
 * Normalises a submitted text value: removes control and invisible characters
 * (keeping line breaks only where allowed), collapses runs of whitespace and caps the length.
 */
export function cleanText(value: string, { multiline = false } = {}) {
  let v = value.slice(0, MAX_RAW).normalize("NFC");
  // Drop zero-width and bidi-override characters that can disguise text.
  v = v.replace(/[​-‏‪-‮⁦-⁩﻿]/g, "");
  if (multiline) {
    v = v.replace(/\r\n?/g, "\n").replace(/[^\S\n]+/g, " ").replace(/\n{3,}/g, "\n\n");
    v = v.replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, "");
  } else {
    v = v.replace(/[\u0000-\u001F\u007F]+/g, " ").replace(/\s+/g, " ");
  }
  return v.trim();
}

/**
 * Stops spreadsheet formula injection: a cell that starts with = + - @ (or a tab or
 * carriage return) would run as a formula if the sheet is exported and opened in Excel.
 * Prefixing a quote keeps it as plain text. Phone fields are exempt because they are
 * validated as digits and may start with "+".
 */
export function safeCell(value: string, { isPhone = false } = {}) {
  if (isPhone) return value;
  return /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
}
