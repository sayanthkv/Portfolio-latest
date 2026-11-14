import { ArrowUpRight, Download, FileText, Github, Linkedin, Mail } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";
import { LineReveal, Reveal } from "./motion";

export function Contact() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="overflow-hidden bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-5 pt-24 md:px-10 md:pt-36">
        <div className="grid gap-10 md:grid-cols-12">
          <LineReveal
            as="h2"
            className="font-display text-[2.6rem] font-normal leading-[0.98] tracking-[-0.035em] sm:text-6xl md:col-span-8 md:text-7xl lg:text-[5.5rem]"
            lines={[<>Let's build</>, <span className="serif-em text-[1.1em]">something meaningful.</span>]}
          />
          <Reveal className="md:col-span-4 md:self-end" delay={0.15}>
            <p className="leading-relaxed text-ink-muted text-sm sm:text-base">
              Seeking MERN Stack Developer opportunities, including junior developer positions and
              internships. Let's discuss how I can contribute to your team.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-ink-foreground px-5 py-3 label-caps text-[0.625rem] text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                Send an Email
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:rotate-45" />
              </a>
              <a
                href={profile.resumePdf}
                download="Sayanth_KV_Resume.pdf"
                className="group inline-flex items-center gap-2 rounded-full border border-ink-border px-5 py-3 label-caps text-[0.625rem] text-ink-foreground transition-all duration-300 hover:bg-ink-foreground/10 hover:-translate-y-0.5"
              >
                Download Resume
                <Download className="size-3.5" />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-10 border-t border-ink-border pt-10 sm:grid-cols-2 md:mt-28 md:grid-cols-4">
          <div>
            <p className="label-caps text-[0.6rem] text-ink-muted">Email</p>
            <a href={`mailto:${profile.email}`} className="mt-3 block break-all text-sm hover:underline text-ink-foreground">
              {profile.email}
            </a>
          </div>
          <div>
            <p className="label-caps text-[0.6rem] text-ink-muted">Phone / WhatsApp</p>
            <a href={profile.phoneHref} className="mt-3 block text-sm hover:underline text-ink-foreground">
              {profile.phone}
            </a>
          </div>
          <div>
            <p className="label-caps text-[0.6rem] text-ink-muted">Social Profiles</p>
            <div className="mt-3 flex gap-2">
              {[
                { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
                { href: profile.github, label: "GitHub", Icon: Github },
                { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-full bg-ink-foreground text-ink transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105"
                >
                  <Icon className="size-4" strokeWidth={1.6} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="label-caps text-[0.6rem] text-ink-muted">Curriculum Vitae</p>
            <a
              href={profile.resumePdf}
              download="Sayanth_KV_Resume.pdf"
              className="group mt-3 inline-flex items-center gap-2 text-sm text-ink-foreground hover:underline"
            >
              <FileText className="size-4 text-ink-muted" />
              Download Official PDF
              <Download className="size-3.5 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <nav aria-label="Footer">
            <p className="label-caps text-[0.6rem] text-ink-muted">Navigation</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>
                <a href="#top" className="text-ink-muted hover:text-ink-foreground transition-colors">Home</a>
              </li>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-ink-muted hover:text-ink-foreground transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-1 text-xs text-ink-muted sm:text-right">
            <p>© {year} {profile.name}. MERN Stack Developer.</p>
            <p>Based in {profile.location}.</p>
          </div>
        </div>
      </div>

      {/* oversized closing wordmark, cropped at the bottom */}
      <div aria-hidden className="mt-12 select-none overflow-hidden">
        <p className="translate-y-[14%] whitespace-nowrap text-center font-display text-[15.5vw] font-semibold uppercase leading-[0.8] tracking-[-0.06em] text-ink-foreground">
          Sayanth<span className="serif-em font-normal normal-case text-ink-muted">.kv</span>
        </p>
      </div>
    </footer>
  );
}
