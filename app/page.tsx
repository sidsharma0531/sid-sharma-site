import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LogoWall from "@/components/LogoWall";
import Nav from "@/components/Nav";
import Press from "@/components/Press";
import Recognition from "@/components/Recognition";
import RevealObserver from "@/components/RevealObserver";
import { nav, press, site } from "@/data/content";

export default function Home() {
  // The Press icon only shows when there is press to show.
  const navItems = nav.filter((item) => item.href !== "#press" || press.items.length > 0);

  return (
    <>
      <Nav name={site.name} items={navItems} />
      <main id="main">
        <Hero />
        <LogoWall />
        <Experience />
        <Recognition />
        <Press />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
