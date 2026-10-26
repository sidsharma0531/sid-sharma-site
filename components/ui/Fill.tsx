import { isPlaceholder } from "@/lib/content";

// Renders text as-is, or as a highlighted tag if it is still a [placeholder].
export default function Fill({ children }: { children: string }) {
  if (!isPlaceholder(children)) return <>{children}</>;
  return <span className="fill-me">{children}</span>;
}
