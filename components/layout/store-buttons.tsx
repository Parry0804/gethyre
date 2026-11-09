import { siApple, siGoogleplay } from "simple-icons";
import { cx } from "@/components/ui";
import { site } from "@/lib/site";

type Store = "ios" | "android";

const stores = {
  ios: { icon: siApple, small: "Download on the", big: "App Store", label: "Download GetHyre.ai for iPhone on the App Store" },
  android: { icon: siGoogleplay, small: "Get it on", big: "Google Play", label: "Download GetHyre.ai for Android on Google Play" },
} as const;

/** One store button. Opens the store listing when its link is set, otherwise the /download page. */
export function StoreButton({ store, tone = "dark", size = "md" }: { store: Store; tone?: "dark" | "light"; size?: "md" | "lg" }) {
  const s = stores[store];
  const url = site.apps[store];
  return (
    <a
      href={url || "/download"}
      {...(url ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={s.label}
      data-cta={`store-${store}`}
      className={cx(
        "inline-flex items-center gap-2.5 rounded-xl border transition-colors",
        size === "lg" ? "py-3 pl-4 pr-5" : "py-2 pl-3 pr-4",
        tone === "dark"
          ? "border-ink bg-ink text-white hover:bg-[#1f2937]"
          : "border-white/25 bg-white text-ink hover:bg-sky",
      )}
    >
      <svg viewBox="0 0 24 24" aria-hidden className={cx("shrink-0 fill-current", size === "lg" ? "size-7" : "size-6")}>
        <path d={s.icon.path} />
      </svg>
      <span className="flex flex-col text-left leading-tight">
        <span className={cx("font-medium opacity-80", size === "lg" ? "text-xs" : "text-[10px]")}>{s.small}</span>
        <span className={cx("font-bold tracking-[-0.01em]", size === "lg" ? "text-lg" : "text-[15px]")}>{s.big}</span>
      </span>
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
