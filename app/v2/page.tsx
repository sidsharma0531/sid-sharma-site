import type { Metadata } from "next";
import DividerStrip from "@/components/DividerStrip";
import Footer from "@/components/Footer";
import LogoWall from "@/components/LogoWall";
import Nav from "@/components/Nav";
import Press from "@/components/Press";
import RevealObserver from "@/components/RevealObserver";
import Experience from "@/components/v2/Experience";
import Hero from "@/components/v2/Hero";
import PhotoWall from "@/components/v2/PhotoWall";
import Recognition from "@/components/v2/Recognition";
import { nav, press, site } from "@/data/content";
import { photosFor } from "@/lib/images";

// Experimental layout with photos placed across the page. Kept out of search results so only
// people with the link see it.
export const metadata: Metadata = {
  title: `${site.name} (v2 preview)`,
  robots: { index: false, follow: false },
};

export default function V2() {
  // The Press icon only shows when there is press to show.
  const navItems = nav.filter((item) => item.href !== "#press" || press.items.length > 0);

  return (
    <>
      <Nav name={site.name} items={navItems} />
      <main id="main">
        <Hero />
        <LogoWall />
        <PhotoWall />
        <Experience />
        <Press />
        <DividerStrip photos={photosFor("divider", "before-recognition")} />
        <Recognition />
        <DividerStrip photos={photosFor("divider", "before-contact")} />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
