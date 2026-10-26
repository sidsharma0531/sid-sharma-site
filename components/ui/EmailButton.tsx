"use client";

import { Fragment, useState, type ReactNode } from "react";
import Doodle from "@/components/doodles";

type Props = { user: string; domain: string; variant: "icon" | "text" };

// The address is never written out whole in the page, so scrapers miss it.
// Clicking copies it; if copying is blocked, the mail app opens instead.
export default function EmailButton({ user, domain, variant }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const address = `${user}@${domain}`;
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${address}`;
    }
  };

  const [host, ...rest] = domain.split(".");

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy email address: ${user} at ${domain.replaceAll(".", " dot ")}`}
        className="relative grid size-12 place-items-center rounded-full border-[1.5px] border-ink bg-paper shadow-[2px_2px_0_var(--color-ink)] transition-[transform,background-color] duration-150 hover:-translate-y-0.5 hover:bg-butter"
      >
        <Doodle name="envelope" className="size-6 text-ink" />
        <Toast show={copied} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="relative inline-flex flex-wrap items-baseline rounded-full border-[1.5px] border-ink bg-paper px-5 py-2.5 text-left text-lg font-medium shadow-[3px_3px_0_var(--color-ink)] transition-[transform,background-color] duration-150 hover:-translate-y-0.5 hover:bg-butter sm:text-xl"
    >
      {user}
      <Sep>at</Sep>
      {host}
      {rest.map((part, i) => (
        <Fragment key={i}>
          <Sep>dot</Sep>
          {part}
        </Fragment>
      ))}
      <span className="sr-only"> (click to copy)</span>
      <Toast show={copied} />
    </button>
  );
}

// Margins do the visual spacing; the real spaces make screen readers say "name at domain dot com".
function Sep({ children }: { children: ReactNode }) {
  return (
    <span className="mx-1.5 font-hand text-[1.3em] leading-none text-tomato-deep">
      {" "}
      {children}{" "}
    </span>
  );
}

function Toast({ show }: { show: boolean }) {
  return (
    <span
      aria-live="polite"
      className={`pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 -rotate-6 font-hand text-xl whitespace-nowrap text-tomato-deep transition-opacity duration-200 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      {show ? "copied!" : ""}
    </span>
  );
}
