import Doodle from "@/components/doodles";
import Photo from "@/components/ui/Photo";
import type { ResolvedPhoto } from "@/lib/images";

// One or two app screenshots in clean phone frames. With no screenshots yet, the phone shows
// a simple name screen instead of an empty slot.
export default function PhoneMockup({ screens, name }: { screens: ResolvedPhoto[]; name: string }) {
  const shots = screens.filter((screen) => screen.exists).slice(0, 2);

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-leaf/15">
      <div aria-hidden className="absolute -right-6 -bottom-6 opacity-25">
        <Doodle name="carrot" className="size-36 rotate-[24deg] text-ink" />
      </div>

      {shots.length === 2 ? (
        <>
          <Phone screen={shots[1]} className="absolute top-[13%] left-[47%] h-[72%] rotate-[7deg]" />
          <Phone screen={shots[0]} className="absolute top-[7%] left-[11%] h-[84%] -rotate-[4deg]" />
        </>
      ) : (
        <Phone screen={shots[0]} name={name} className="absolute top-[8%] left-1/2 h-[84%] -translate-x-1/2 -rotate-2" />
      )}
    </div>
  );
}

function Phone({ screen, name = "", className }: { screen?: ResolvedPhoto; name?: string; className: string }) {
  return (
    <div
      className={`aspect-[9/19.5] bg-ink shadow-[0_28px_50px_-24px_rgba(34,28,24,0.6)] ${className}`}
      style={{ borderRadius: "15% / 7%" }}
    >
      {/* Inset as a % of the phone itself, so the bezel stays thin at every size. */}
      <div className="absolute inset-x-[4%] inset-y-[1.85%] overflow-hidden bg-cream" style={{ borderRadius: "12% / 5.5%" }}>
        {screen ? (
          <Photo photo={screen} alt={screen.alt} ratio="fill" bg="bg-cream" imgClassName="object-top" sizes="220px" />
        ) : (
          <Splash name={name} />
        )}
        <span aria-hidden className="absolute top-[2.2%] left-1/2 h-[3.4%] w-[32%] -translate-x-1/2 rounded-full bg-ink" />
      </div>
    </div>
  );
}

function Splash({ name }: { name: string }) {
  return (
    <div className="@container absolute inset-0 flex flex-col items-center justify-center gap-[6cqw] px-[10%] text-center">
      <span className="grid size-[40cqw] place-items-center rounded-[24%] bg-leaf/25">
        <Doodle name="carrot" className="size-[68%] text-ink" />
      </span>
      <span className="font-serif text-[14cqw] leading-none font-semibold tracking-[-0.02em]">{name}</span>
      <span className="text-[7cqw] font-medium text-ink/55">iOS · Android</span>
    </div>
  );
}
