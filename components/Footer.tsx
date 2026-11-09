import Doodle from "@/components/doodles";
import ContactLinks from "@/components/ui/ContactLinks";
import SectionHeading from "@/components/ui/SectionHeading";
import { footer, site } from "@/data/content";

export default function Footer() {
  return (
    <footer id="contact" className="mt-6">
      <div aria-hidden className="gingham h-6 border-y border-ink/15" />

      {/* Centered on phones, like the hero. */}
      <div className="container-page relative pt-14 pb-10 sm:pt-28">
        <SectionHeading kicker={footer.kicker} title={footer.line} center />

        <div data-reveal>
          <ContactLinks variant="full" className="justify-center md:justify-start" />
        </div>

        <div aria-hidden className="pointer-events-none absolute top-24 right-10 hidden rotate-12 lg:block">
          <Doodle name="bread" className="size-28 text-ink" />
        </div>

        <p className="mt-14 text-center text-sm text-ink/55 sm:mt-32 md:text-left">{site.copyright}</p>
      </div>
    </footer>
  );
}
