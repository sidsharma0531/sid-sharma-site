import Kicker from "@/components/ui/Kicker";

// Handwritten kicker with a little arrow, then the serif heading.
export default function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div data-reveal className="mb-10 sm:mb-14">
      <Kicker>{kicker}</Kicker>
      <h2 className="mt-3 max-w-[22ch] font-serif text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.025em] text-balance sm:text-[3.4rem]">
        {title}
      </h2>
    </div>
  );
}
