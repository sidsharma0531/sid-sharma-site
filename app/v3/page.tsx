import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LogoWall from "@/components/LogoWall";
import Nav from "@/components/Nav";
import Press from "@/components/Press";
import Recognition from "@/components/Recognition";
import RevealObserver from "@/components/RevealObserver";
import ExperienceRow from "@/components/v3/ExperienceRow";
import { nav, press, site } from "@/data/content";

// V3: the homepage with Experience as one row of cards that scrolls left to right. A trial to
// compare against "/", so nothing links here and it stays out of search results.
export const metadata: Metadata = {
  title: { absolute: `${site.name} · V3` },
  robots: { index: false, follow: true },
};

export default function V3Home() {
  // The Press icon only shows when there is press to show.
  const navItems = nav.filter((item) => item.href !== "#press" || press.items.length > 0);

  return (
    <>
      <Nav name={site.name} items={navItems} />
      <main id="main">
        <Hero />
        <LogoWall />
        <ExperienceRow />
        <Press />
        <Recognition />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
