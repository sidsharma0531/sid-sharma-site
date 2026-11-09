import Kicker from "@/components/ui/Kicker";

// Handwritten kicker with a little arrow, then the serif heading. With `center`, both are
// centered below md (the contact section on phones).
export default function SectionHeading({ kicker, title, center }: { kicker: string; title: string; center?: boolean }) {
  return (
    <div data-reveal className={`mb-10 sm:mb-14 ${center ? "text-center md:text-left" : ""}`}>
      <Kicker className={center ? "justify-center md:justify-start" : ""}>{kicker}</Kicker>
      <h2
        className={`mt-3 max-w-[22ch] font-serif text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.025em] text-balance sm:text-[3.4rem] ${
          center ? "mx-auto md:mx-0" : ""
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
