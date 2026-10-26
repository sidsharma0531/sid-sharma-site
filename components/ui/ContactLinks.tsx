import Doodle, { type IconName } from "@/components/doodles";
import { contact } from "@/data/content";
import { isLink, isPlaceholder } from "@/lib/text";
import EmailButton from "./EmailButton";

const sticker =
  "grid size-12 place-items-center rounded-full border-[1.5px] transition-[transform,background-color] duration-150";

// "icons": three round buttons (hero). "full": the email spelled out, then the icons (footer).
export default function ContactLinks({ variant }: { variant: "icons" | "full" }) {
  const at = contact.email.indexOf("@");
  const email =
    !isPlaceholder(contact.email) && at > 0
      ? { user: contact.email.slice(0, at), domain: contact.email.slice(at + 1) }
      : null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {variant === "full" &&
        (email ? (
          <EmailButton {...email} variant="text" />
        ) : (
          <span className="fill-me text-lg">{contact.email}</span>
        ))}
      {variant === "icons" &&
        (email ? <EmailButton {...email} variant="icon" /> : <Unfilled icon="envelope" label="Email" />)}
      <Social href={contact.linkedin} icon="linkedin" label="LinkedIn" />
      <Social href={contact.instagram} icon="instagram" label="Instagram" />
    </div>
  );
}

function Social({ href, icon, label }: { href: string; icon: IconName; label: string }) {
  if (!isLink(href)) return <Unfilled icon={icon} label={label} />;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`${sticker} border-ink bg-paper shadow-[2px_2px_0_var(--color-ink)] hover:-translate-y-0.5 hover:bg-butter`}
    >
      <Doodle name={icon} className="size-6 text-ink" />
    </a>
  );
}

// Dashed until the real link is added in data/content.ts.
function Unfilled({ icon, label }: { icon: IconName; label: string }) {
  return (
    <span title={`Add your ${label} in data/content.ts`} className={`${sticker} border-dashed border-ink/40 opacity-70`}>
      <Doodle name={icon} className="size-6 text-ink" />
      <span className="sr-only">{label} (not added yet)</span>
    </span>
  );
}
