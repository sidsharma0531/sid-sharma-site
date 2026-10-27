import type { ProjectTone } from "@/data/v2";

// Each project keeps one quiet color: RescueLog leaf, Waste2Taste tomato, Still Good butter,
// research ink. Used for small dots, panels behind visuals, and figures.
export const toneDot: Record<ProjectTone, string> = {
  leaf: "bg-leaf",
  tomato: "bg-tomato",
  butter: "bg-butter",
  ink: "bg-ink",
};

export const tonePanel: Record<ProjectTone, string> = {
  leaf: "bg-leaf/15",
  tomato: "bg-tomato/10",
  butter: "bg-butter/35",
  ink: "bg-ink",
};

export const toneText: Record<ProjectTone, string> = {
  leaf: "text-leaf-deep",
  tomato: "text-tomato-deep",
  butter: "text-tomato-deep",
  ink: "text-ink",
};
