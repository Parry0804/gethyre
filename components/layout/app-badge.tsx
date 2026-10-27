import { PhoneIcon } from "@/components/icons";

/** "Android app · Coming soon". Swap for a store link when the app is live. */
export function AppBadge() {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-xl bg-ink py-2.5 pl-3.5 pr-4 text-white">
      <PhoneIcon size={22} />
      <span className="flex flex-col leading-tight">
        <span className="text-[11px] font-medium text-subtle">Coming soon</span>
        <span className="text-[15px] font-bold">Android app</span>
      </span>
    </span>
  );
}
