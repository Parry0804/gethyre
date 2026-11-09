import { siApple, siGoogleplay } from "simple-icons";
import { cx } from "@/components/ui";
import { site } from "@/lib/site";

type Store = "ios" | "android";

const stores = {
  ios: { icon: siApple, small: "Download on the", big: "App Store", label: "Download GetHyre.ai for iPhone on the App Store" },
  android: { icon: siGoogleplay, small: "Get it on", big: "Google Play", label: "Download GetHyre.ai for Android on Google Play" },
} as const;

/** One store button. Opens the store listing once its link is set. */
export function StoreButton({ store, tone = "dark", size = "md" }: { store: Store; tone?: "dark" | "light"; size?: "md" | "lg" }) {
  const s = stores[store];
  const url = site.apps[store];
  const className = cx(
    "inline-flex items-center gap-2.5 rounded-xl border transition-colors",
    size === "lg" ? "py-3 pl-4 pr-5" : "py-2 pl-3 pr-4",
    tone === "dark" ? "border-ink bg-ink text-white" : "border-white/25 bg-white text-ink",
    url && (tone === "dark" ? "hover:bg-[#1f2937]" : "hover:bg-sky"),
  );
  const inner = (
    <>
      <svg viewBox="0 0 24 24" aria-hidden className={cx("shrink-0 fill-current", size === "lg" ? "size-7" : "size-6")}>
        <path d={s.icon.path} />
      </svg>
      <span className="flex flex-col text-left leading-tight">
        <span className={cx("font-medium opacity-80", size === "lg" ? "text-xs" : "text-[10px]")}>{s.small}</span>
        <span className={cx("font-bold tracking-[-0.01em]", size === "lg" ? "text-lg" : "text-[15px]")}>{s.big}</span>
      </span>
    </>
  );

  // No store link yet: show the badge, but not as a dead link.
  if (!url) {
    return (
      <span className={className} title="Store link coming soon">
        {inner}
      </span>
    );
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={s.label} data-cta={`store-${store}`} className={className}>
      {inner}
    </a>
  );
}

/** App Store and Google Play buttons side by side. */
export function StoreButtons({ className, tone, size }: { className?: string; tone?: "dark" | "light"; size?: "md" | "lg" }) {
  return (
    <div className={cx("flex flex-wrap items-center gap-2.5", className)}>
      <StoreButton store="ios" tone={tone} size={size} />
      <StoreButton store="android" tone={tone} size={size} />
    </div>
  );
}
