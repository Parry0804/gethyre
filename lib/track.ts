type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

/** Sends a GA4 event if GA is loaded. Safe to call anywhere on the client. */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", event, params);
}
