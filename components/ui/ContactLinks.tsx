import Doodle, { type IconName } from "@/components/doodles";
import { contact } from "@/data/content";
import { isLink, isPlaceholder } from "@/lib/text";
import EmailButton from "./EmailButton";

// "icons": round buttons (hero). "full": the email spelled out, then the icons (footer).
// Anything without a real value is left out.
export default function ContactLinks({ variant }: { variant: "icons" | "full" }) {
  const at = contact.email.indexOf("@");
  const email =
    !isPlaceholder(contact.email) && at > 0
      ? { user: contact.email.slice(0, at), domain: contact.email.slice(at + 1) }
      : null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {email && <EmailButton {...email} variant={variant === "full" ? "text" : "icon"} />}
      <Social href={contact.linkedin} icon="linkedin" label="LinkedIn" />
      <Social href={contact.instagram} icon="instagram" label="Instagram" />
    </div>
  );
}

function Social({ href, icon, label }: { href?: string; icon: IconName; label: string }) {
  if (!isLink(href)) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid size-12 place-items-center rounded-full border-[1.5px] border-ink bg-paper shadow-[2px_2px_0_var(--color-ink)] transition-[transform,background-color] duration-150 hover:-translate-y-0.5 hover:bg-butter"
    >
      <Doodle name={icon} className="size-6 text-ink" />
    </a>
  );
}
