const KEY = "gh_utm";
const FIELDS = ["utm_source", "utm_medium", "utm_campaign"] as const;

export type Utm = Partial<Record<(typeof FIELDS)[number], string>>;

/** Stores the first UTM tags a visitor arrives with, e.g. ?utm_source=college-name from a campus QR code. */
export function captureUtm() {
  try {
    if (sessionStorage.getItem(KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const utm: Utm = {};
    for (const f of FIELDS) {
      const v = params.get(f);
      if (v) utm[f] = v.slice(0, 120);
    }
    if (Object.keys(utm).length > 0) sessionStorage.setItem(KEY, JSON.stringify(utm));
  } catch {
    // Storage can be unavailable (private mode); tracking is best-effort.
  }
}

export function readUtm(): Utm {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}") as Utm;
  } catch {
    return {};
  }
}
