/** True for unfilled values written like "[X]" or "[link]". */
export function isPlaceholder(value?: string) {
  return !value || /^\[[^\]]+\]$/.test(value.trim());
}

/** True when a link is real and safe to render as <a href>. */
export function isLink(href?: string): href is string {
  return !isPlaceholder(href) && /^(https?:|mailto:)/.test(href!.trim());
}
