import { ChatIcon } from "@/components/icons";
import { whatsappLink } from "@/lib/site";

/** Floating WhatsApp click-to-chat button. Hidden until NEXT_PUBLIC_WHATSAPP_NUMBER is set. */
export function ChatButton() {
  const href = whatsappLink();
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="whatsapp-float"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-30 inline-flex size-14 items-center justify-center gap-2.5 rounded-full bg-whatsapp text-white shadow-[0_8px_24px_rgb(17_24_39/0.18)] transition-colors hover:bg-success-strong sm:size-auto sm:py-3 sm:pl-4 sm:pr-5 lg:bottom-6 lg:right-6"
    >
      <ChatIcon size={22} />
      <span className="hidden text-[15px] font-semibold sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
