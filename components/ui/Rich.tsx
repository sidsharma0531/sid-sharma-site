import { Fragment, type ReactNode } from "react";

// Renders content text: **bold** becomes <strong>, and [placeholders] get a highlighted tag.
export default function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-semibold text-ink">
            {withPlaceholders(part)}
          </strong>
        ) : (
          <Fragment key={i}>{withPlaceholders(part)}</Fragment>
        ),
      )}
    </>
  );
}

function withPlaceholders(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(/\[[^\]]+\]/g)) {
    const start = match.index ?? 0;
    if (start > last) out.push(text.slice(last, start));
    out.push(
      <span key={start} className="fill-me">
        {match[0]}
      </span>,
    );
    last = start + match[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
