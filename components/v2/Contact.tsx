import { contact } from "@/data/content";
import { closing } from "@/data/v2";
import Arrow from "./Arrow";
import CopyEmail from "./CopyEmail";

export default function Contact() {
  const [user, domain] = contact.email.split("@");
  const [orgUser, orgDomain] = closing.orgEmail.split("@");
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-16 bg-ink text-cream">
      <div className="v2-wrap py-20 sm:py-28">
        <p className="-rotate-2 font-hand text-[1.75rem] leading-none text-butter">let&apos;s connect</p>
        <h2 id="contact-title" className="mt-4 max-w-[20ch] font-serif text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02] font-medium tracking-[-0.03em] text-balance">
          {closing.title}
        </h2>
        <div className="mt-10">
          <CopyEmail user={user} domain={domain} variant="text" tone="dark" />
        </div>
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 text-cream/80 transition-colors hover:text-cream"
        >
          LinkedIn
          <Arrow direction="up-right" />
        </a>
        <div className="mt-14 max-w-[56ch] border-t border-cream/15 pt-6 text-[15px] leading-relaxed text-cream/65">
          <p>{closing.body}</p>
          <div className="mt-2 text-cream">
            <CopyEmail user={orgUser} domain={orgDomain} variant="text" tone="dark" size="sm" />
          </div>
        </div>
      </div>
    </section>
  );
}
