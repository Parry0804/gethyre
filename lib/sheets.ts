import "server-only";
import { JWT } from "google-auth-library";

/**
 * Appends one row to a tab of the leads Google Sheet using a service account.
 * Share the sheet with GOOGLE_SERVICE_ACCOUNT_EMAIL as an Editor.
 */
export function sheetsConfigured() {
  return Boolean(
    process.env.GOOGLE_SHEET_ID && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY,
  );
}

let client: JWT | null = null;

function auth() {
  if (!client) {
    client = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      // Vercel stores the key with literal "\n"; turn them back into newlines.
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  }
  return client;
}

export async function appendRow(tab: string, row: string[]) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const { token } = await auth().getAccessToken();
  const range = encodeURIComponent(`${tab}!A1`);
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ values: [row] }),
      cache: "no-store",
    },
  );
  if (!res.ok) {
    throw new Error(`Sheets append failed (${res.status}): ${await res.text()}`);
  }
}
