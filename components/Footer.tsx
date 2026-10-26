import Fill from "@/components/ui/Fill";
import { contact, hero, isPlaceholder } from "@/lib/content";

export default function Footer() {
  const linkClass =
    "underline decoration-ink/25 underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent";

  return (
    <footer id="contact" className="container-page pb-10">
      <div data-reveal className="border-t border-ink/15 pt-5">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Contact</p>
        <h2 className="mt-6 font-serif text-[2.75rem] leading-[1.02] font-light tracking-[-0.025em] sm:text-7xl">
          Get in touch
        </h2>

        <div className="mt-8 flex flex-col items-start gap-4 sm:mt-10 sm:flex-row sm:items-baseline sm:gap-10">
          <p className="font-serif text-2xl sm:text-3xl">
            {isPlaceholder(contact.email) ? (
              <Fill>{contact.email}</Fill>
            ) : (
              <a href={`mailto:${contact.email}`} className={linkClass}>
                {contact.email}
              </a>
            )}
          </p>

          <p className="text-base">
            {isPlaceholder(contact.linkedin) ? (
              <>
                LinkedIn <Fill>{contact.linkedin}</Fill>
              </>
            ) : (
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                LinkedIn <span aria-hidden>↗</span>
              </a>
            )}
          </p>
        </div>
      </div>

      <p className="mt-24 text-sm text-ink/50 sm:mt-32">© 2026 {hero.name}</p>
    </footer>
  );
}
