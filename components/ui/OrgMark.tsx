import Doodle from "@/components/doodles";
import type { Mark } from "@/data/content";
import { getImage } from "@/lib/images";
import LogoImage from "./LogoImage";

const tones = {
  tomato: "bg-tomato/15 text-tomato-deep",
  butter: "bg-butter/50 text-ink",
  leaf: "bg-leaf/20 text-leaf-deep",
};

// Square tile beside an entry: real logo if the file exists, otherwise a doodle or initials.
export default function OrgMark({ mark, size = "md" }: { mark: Mark; size?: "md" | "lg" }) {
  const logo = mark.logo ? getImage(mark.logo, "logos", [1, 1]) : null;
  const box = size === "lg" ? "size-14 rounded-2xl sm:size-16" : "size-11 rounded-xl sm:size-12";

  if (logo?.exists) {
    const cover = mark.fit === "cover";
    return (
      <span className={`relative block shrink-0 overflow-hidden border border-ink/10 bg-white ${box}`}>
        <span className={`absolute ${cover ? "inset-0" : "inset-[14%]"}`}>
          <LogoImage image={logo} alt="" sizes="64px" fit={cover ? "cover" : "contain"} />
        </span>
      </span>
    );
  }

  return (
    <span aria-hidden className={`grid shrink-0 place-items-center border border-ink/10 ${tones[mark.tone]} ${box}`}>
      {mark.doodle ? (
        <Doodle name={mark.doodle} className="size-[62%] text-ink" />
      ) : (
        <span
          className={`font-serif font-semibold tracking-tight ${
            (mark.initials?.length ?? 0) > 2 ? "text-[11px]" : "text-[15px]"
          }`}
        >
          {mark.initials}
        </span>
      )}
    </span>
  );
}
