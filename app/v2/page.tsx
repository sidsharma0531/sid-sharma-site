import type { Metadata } from "next";
import About from "@/components/v2/About";
import Contact from "@/components/v2/Contact";
import Credibility from "@/components/v2/Credibility";
import Gallery from "@/components/v2/Gallery";
import Hero from "@/components/v2/Hero";
import Milestones from "@/components/v2/Milestones";
import OtherExperience from "@/components/v2/OtherExperience";
import Press from "@/components/v2/Press";
import Recognition from "@/components/v2/Recognition";
import Work from "@/components/v2/Work";

const description =
  "Sid Sharma builds practical fixes for food waste and hunger: RescueLog, Waste2Taste, the cookbook Still Good, and economics research at the University of Houston.";

export const metadata: Metadata = {
  title: { absolute: "Sid Sharma · Portfolio" },
  description,
  alternates: { canonical: "/v2" },
  openGraph: { title: "Sid Sharma · Portfolio", description, url: "/v2", type: "website" },
  twitter: { title: "Sid Sharma · Portfolio", description },
};

export default function V2Home() {
  return (
    <>
      <Hero />
      <Credibility />
      <Work />
      <Recognition />
      <Press />
      <Gallery />
      <About />
      <Milestones />
      <OtherExperience />
      <Contact />
    </>
  );
}
