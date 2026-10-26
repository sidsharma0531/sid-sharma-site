import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import More from "@/components/More";
import Nav from "@/components/Nav";
import Photos from "@/components/Photos";
import RevealObserver from "@/components/RevealObserver";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Work />
        <Photos />
        <More />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
