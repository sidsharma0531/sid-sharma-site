"use client";

import { useState } from "react";

type Props = {
  user: string;
  domain: string;
  variant: "button" | "text";
  /** "dark" for use on the ink background. */
  tone?: "light" | "dark";
  /** Text variant only: "lg" for the headline address, "sm" for a secondary one. */
  size?: "lg" | "sm";
};

// The address never appears whole in the page: user and domain arrive separately and the "@" is
// drawn by CSS, so scrapers miss it. Clicking copies it; if the clipboard is blocked, the mail app
// opens instead.
export default function CopyEmail({ user, domain, variant, tone = "light", size = "lg" }: Props) {
  const [copied, setCopied] = useState(false);
  const dark = tone === "dark";

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

  const label = `Copy email address: ${user} at ${domain.replaceAll(".", " dot ")}`;
  const status = (
    <span aria-live="polite" className="sr-only">
      {copied ? "Email address copied" : ""}
    </span>
  );

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={copy}
        aria-label={label}
        className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-colors ${
          dark ? "border-cream/25 hover:border-cream/70" : "border-ink/20 hover:border-ink/60"
        }`}
      >
        <svg aria-hidden viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.4">
          <rect x="1.5" y="3" width="13" height="10" rx="1.5" />
          <path d="m2 4 6 5 6-5" />
        </svg>
        <span aria-hidden>{copied ? "Copied" : "Copy email"}</span>
        {status}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      className={`group inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 text-left ${
        size === "lg" ? "font-serif text-[clamp(1.35rem,3vw,2rem)] tracking-[-0.01em]" : "text-base font-medium"
      }`}
    >
      <span
        aria-hidden
        className={`underline decoration-1 underline-offset-[0.2em] transition-colors group-hover:decoration-tomato ${
          dark ? "decoration-cream/35" : "decoration-ink/25"
        }`}
      >
        {user}
        <span className="before:content-['@']" />
        {domain}
      </span>
      <span aria-hidden className="font-sans text-sm opacity-55">
        {copied ? "copied" : "click to copy"}
      </span>
      {status}
    </button>
  );
}
