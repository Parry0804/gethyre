import type { Metadata } from "next";
import { ThankYou } from "./thank-you";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return <ThankYou />;
}
