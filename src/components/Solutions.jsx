import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PATHWAYS = [
  {
    num: "01 / A SINGLE CHALLENGE",
    title: ["One project.", "Clear scope."],
    desc: "Brand identity, a strategy sprint, a campaign or a website. See what fits before committing to more.",
    footLeft: "Identity from ₦500k",
    footRight: "Explore ↗",
    href: "#picker",
  },
  {
    num: "02 / PIECES THAT WORK TOGETHER",
    title: ["A launch.", "A rebuild.", "One direction."],
    desc: "Strategy, identity, digital and media delivered together as a coordinated project.",
    footLeft: "Packages from ₦1.25m",
    footRight: "Explore ↗",
    href: "#bespoke",
  },
  {
    num: "03 / AN ONGOING PARTNER",
    title: ["Make us", "your brand desk."],
    desc: "A defined external team shaping content, campaigns and day-to-day creative consistency.",
    footLeft: "From ₦550k/month",
    footRight: "Discuss ↗",
    href: "/contact",
  },
];

const Solutions = () => {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const pathwaysRef = useRef(null);
  const bespokeRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Header entrance
      gsap.fromTo(
        headRef.current,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headRef.current,
            start: "top 85%",
          },
        },
      );

      // 2. Pathways cards stagger
      gsap.fromTo(
        ".path-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pathwaysRef.current,
            start: "top 82%",
          },
        },
      );

      // 3. Featured bespoke cards stagger
      gsap.fromTo(
        ".bespoke-card",
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bespokeRef.current,
            start: "top 82%",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="bg-paper py-[clamp(72px,9vw,140px)] px-6 md:px-11 font-body overflow-hidden"
    >
      {/* ── Top Eyeline Annotation ── */}
      <div className="flex justify-between items-center gap-5 pt-3 pb-2 border-t border-ink mb-8 md:mb-12">
        <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none">
          § WAYS TO WORK / ONE STUDIO, DIFFERENT ENGAGEMENTS
        </span>
        <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none">
          04 / 07
        </span>
      </div>

      {/* ── Section Head ── */}
      <div
        ref={headRef}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12"
      >
        <h2 className="display text-ink text-[clamp(32px,5.2vw,72px)] leading-[0.94] tracking-tight m-0 uppercase font-display font-extrabold">
          The right fit.
          <br />
          Not the <span className="text-signal-red">biggest package.</span>
        </h2>
        <p className="text-slate text-base md:text-lg leading-relaxed max-w-115 font-normal md:text-right m-0">
          Bring us a clear project, a connected launch, or the responsibility of
          showing up well month after month.
        </p>
      </div>

      {/* ── Pathways (3 Tier Engagement Paths) ── */}
      <div
        ref={pathwaysRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-12 md:mt-16"
      >
        {PATHWAYS.map((p) => (
          <a
            key={p.num}
            href={p.href}
            className="path-card no-underline text-ink bg-transparent hover:bg-white border border-ink p-7 md:p-8 flex flex-col justify-between transition-all duration-300 group min-h-80 shadow-xs hover:shadow-md hover:-translate-y-1 cursor-pointer"
          >
            <div>
              <span className="label text-slate text-[10px] md:text-[11px] tracking-[0.14em] block">
                {p.num}
              </span>
              <h3 className="display text-ink text-[clamp(24px,2.2vw,36px)] leading-[1.04] tracking-tight my-5 group-hover:text-signal-red transition-colors">
                {p.title.map((line, idx) => (
                  <span key={idx} className="block">
                    {line}
                  </span>
                ))}
              </h3>
              <p className="text-slate text-xs md:text-sm leading-relaxed m-0 font-normal">
                {p.desc}
              </p>
            </div>
            <div className="mt-8 pt-5 border-t border-line flex items-center justify-between text-xs font-bold text-ink tracking-wide">
              <span>{p.footLeft}</span>
              <span className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">
                {p.footRight}
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* ── Featured Bespoke Engagements ── */}
      <div
        id="bespoke"
        ref={bespokeRef}
        className="grid grid-cols-1 lg:grid-cols-2 mt-16 md:mt-24 border border-ink overflow-hidden"
      >
        {/* Card 1: Flagship Engagement (Ink background) */}
        <article className="bespoke-card bg-ink text-paper p-8 md:p-12 lg:p-14 min-h-95 flex flex-col justify-between">
          <div>
            <span className="label text-paper/50 text-[10px] md:text-[11px] tracking-[0.14em] block mb-4">
              BESPOKE / FLAGSHIP ENGAGEMENT
            </span>
            <h3 className="display text-paper text-[clamp(32px,3.6vw,54px)] leading-[0.98] tracking-tight my-4">
              The whole
              <br />
              brand picture.
            </h3>
            <p className="text-paper/75 text-sm md:text-base leading-relaxed max-w-115 font-normal m-0 mb-6">
              Research, strategy, a complete identity system, substantial
              website, launch campaign and embedded activation. Designed for
              established organisations.
            </p>
            <div className="label text-paper/60 text-[11px] tracking-wider mb-8">
              THE COMPLETE BRAND PARTNERSHIP · FROM ₦20,000,000
            </div>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center justify-between gap-5 px-6 py-3.5 border border-paper text-paper text-xs font-extrabold uppercase tracking-wider hover:bg-paper hover:text-ink transition-colors no-underline self-start cursor-pointer"
          >
            <span>Discuss a private proposal</span>
            <span>↗</span>
          </a>
        </article>

        {/* Card 2: Digital Celebration (Signal Red background with Ink text for contrast) */}
        <article className="bespoke-card bg-signal-red text-ink p-8 md:p-12 lg:p-14 min-h-95 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-ink">
          <div>
            <span className="label text-ink/65 text-[10px] md:text-[11px] tracking-[0.14em] block mb-4">
              BESPOKE / DIGITAL CELEBRATION
            </span>
            <h3 className="display text-ink text-[clamp(32px,3.6vw,54px)] leading-[0.98] tracking-tight my-4">
              Not just a
              <br />
              wedding link.
            </h3>
            <p className="text-ink/85 text-sm md:text-base leading-relaxed max-w-115 font-normal m-0 mb-6">
              A bespoke digital home for the couple, invitations, RSVP journeys,
              guest-safe sharing and memories that live beyond the day.
            </p>
            <div className="label text-ink/75 text-[11px] tracking-wider mb-8">
              THE WEDDING EXPERIENCE · ₦1,000,000
            </div>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center justify-between gap-5 px-6 py-3.5 border border-ink text-ink text-xs font-extrabold uppercase tracking-wider hover:bg-ink hover:text-paper transition-colors no-underline self-start cursor-pointer"
          >
            <span>Explore the experience</span>
            <span>↗</span>
          </a>
        </article>
      </div>
    </section>
  );
};

export default Solutions;
