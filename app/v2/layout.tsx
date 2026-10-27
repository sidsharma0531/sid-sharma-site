import type { Metadata } from "next";
import Footer from "@/components/v2/Footer";
import Nav from "@/components/v2/Nav";
import Reveal from "@/components/v2/Reveal";

// The /v2 portfolio. It shares the root layout's fonts and colors but none of the homepage's
// sections, so changes here never touch "/".
export const metadata: Metadata = {
  title: { default: "Sid Sharma · Portfolio", template: "%s · Sid Sharma" },
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div id="top">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-cream"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
      <Reveal />
    </div>
  );
}
