import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TABS = [
  { id: "identity", label: "Brand identity" },
  { id: "strategy", label: "Strategy" },
  { id: "web", label: "Web" },
  { id: "media", label: "Creative media" },
];

const OFFERINGS = {
  identity: [
    {
      name: "Identity Essentials",
      price: "₦500,000",
      description:
        "A recognisable foundation: logo system, colour and typography, essential usage guidance and agreed exports.",
    },
    {
      name: "Identity System",
      price: "₦950,000",
      description:
        "A broader visual language, applications and guidelines for a business appearing across more touchpoints.",
    },
    {
      name: "Strategy-Led Identity",
      price: "From ₦1,600,000",
      description:
        "Strategic positioning and a comprehensive identity system for a changing or expanding business.",
    },
  ],
  strategy: [
    {
      name: "Brand Clarity Session",
      price: "₦75,000",
      description:
        "Focused 75-minute advisory session and concise written direction memo.",
    },
    {
      name: "Strategy Sprint",
      price: "From ₦400,000",
      description:
        "Positioning, audience, message and usable strategic recommendations.",
    },
    {
      name: "Brand Strategy System",
      price: "From ₦900,000",
      description:
        "A more complete foundation for teams needing aligned strategy and communication.",
    },
  ],
  web: [
    {
      name: "Bespoke Landing Page",
      price: "From ₦350,000",
      description:
        "A custom conversion-focused page for a defined offer, campaign or audience.",
    },
    {
      name: "Business Website",
      price: "From ₦750,000",
      description:
        "A responsive business website with clear content structure and lead pathway.",
    },
    {
      name: "Digital Experience",
      price: "From ₦1,800,000",
      description:
        "A more ambitious tailored experience with defined functionality and integrations.",
    },
  ],
  media: [
    {
      name: "Campaign Creative",
      price: "From ₦300,000",
      description:
        "Campaign creative concept and defined multi-format assets for an agreed brief.",
    },
    {
      name: "Media Desk",
      price: "₦550,000/month",
      description:
        "Ongoing content design and planning for one channel; onboarding fee applies.",
    },
    {
      name: "Brand Partner",
      price: "₦950,000/month",
      description:
        "Broader brand and campaign support across up to two channels; onboarding applies.",
    },
  ],
};

const SERVICES = [
  {
    num: "01",
    total: "04",
    tagline: "FOUNDATION & POSITIONING",
    name: "BRAND STRATEGY",
    quote: "“Know what you stand for. Know who it matters to.”",
    desc: "We conduct rigorous stakeholder excavations, market reality checks, and category segmentation to crystallize your core positioning. We don't write 200-page shelf-ware decks; we deliver sharp, actionable strategic playbooks.",
    badges: [
      "BRAND DISCOVERY & AUDIT",
      "COMPETITOR MATRIX",
      "CORE VALUE PROPOSITION",
      "VERBAL IDENTITY & VOICE",
      "NAMING ARCHITECTURE",
      "CREATIVE ROADMAP",
    ],
  },
  {
    num: "02",
    total: "04",
    tagline: "VISUAL SYSTEMS & CRAFT",
    name: "BRAND IDENTITY",
    quote: "“Look like yourself. Only sharper.”",
    desc: "Typographic hierarchies, graphic marks, material guidelines, and visual language systems built to work across billboards, packaging, investor documents, and high-density screens.",
    badges: [
      "LOGO SYSTEM ARCHITECTURE",
      "TYPOGRAPHIC HIERARCHY",
      "EDITORIAL ART DIRECTION",
      "BRAND GUIDELINE MANUALS",
      "PACKAGING & PRINT EPHEMERA",
      "LAUNCH CAMPAIGN ASSETS",
    ],
  },
  {
    num: "03",
    total: "04",
    tagline: "DIGITAL EXPERIENCES & WEB",
    name: "WEB DESIGN",
    quote: "“Built to perform. Designed to endure.”",
    desc: "Editorial, conversion-driven websites engineered with meticulous interaction design. From architecture to production code, every pixel, transition, and micro-interaction is tuned for maximum impact.",
    badges: [
      "INTERACTION DESIGN",
      "EDITORIAL WEB LAYOUTS",
      "GSAP & MOTION SYSTEMS",
      "FULL-STACK ARCHITECTURE",
      "HEADLESS CMS INTEGRATION",
      "PERFORMANCE & ACCESSIBILITY",
    ],
  },
  {
    num: "04",
    total: "04",
    tagline: "CAMPAIGNS & ART DIRECTION",
    name: "CREATIVE MEDIA",
    quote: "“Cut through noise. Command sustained attention.”",
    desc: "Multi-format creative campaigns, editorial art direction, and social promotion frameworks designed to amplify brand recognition and drive engagement across critical touchpoints.",
    badges: [
      "CAMPAIGN CONCEPT CREATIVE",
      "ART DIRECTION & VISUAL STYLING",
      "SOCIAL MEDIA FRAMEWORKS",
      "LAUNCH PROMOTION ASSETS",
      "BRAND CONTENT DESIGN",
      "MULTI-FORMAT COLLATERAL",
    ],
  },
];

const Services = () => {
  const sectionRef = useRef(null);
  const rowsRef = useRef([]);
  const [activeTab, setActiveTab] = useState("identity");
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowsRef.current.forEach((row) => {
        if (!row) return;

        const line = row.querySelector(".svc-line");
        const num = row.querySelector(".svc-num");
        const titleBlock = row.querySelector(".svc-title-block");
        const contentBlock = row.querySelector(".svc-content-block");
        const badges = row.querySelectorAll(".svc-badge");

        // 1. Line draw animation
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0, transformOrigin: "left" },
            {
              scaleX: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 85%",
              },
            },
          );
        }

        // 2. Big number entrance (once only, no scrub)
        if (num) {
          gsap.fromTo(
            num,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 88%",
                once: true,
              },
            },
          );
        }

        // 3. Staggered reveal of titles and content
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
          },
        });

        tl.fromTo(
          titleBlock,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        )
          .fromTo(
            contentBlock,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.5",
          )
          .fromTo(
            badges,
            { y: 12, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.45,
              stagger: 0.04,
              ease: "back.out(1.5)",
            },
            "-=0.4",
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-paper py-[clamp(80px,12vh,150px)] px-6 md:px-14 font-body relative overflow-hidden"
    >
      {/* ── Section header ── */}
      <div className="flex justify-between items-center gap-5 pt-3 pb-2 border-t border-ink mb-4 md:mb-6">
        <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none">
          § WHAT WE DO / FOUR CONNECTED DISCIPLINES
        </span>
        <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none">
          03 / 07
        </span>
      </div>

      {/* ── Stacked Editorial Service Rows ── */}
      <div className="space-y-0">
        {SERVICES.map((s, i) => (
          <div
            key={s.num}
            ref={(el) => (rowsRef.current[i] = el)}
            data-cursor="view"
            data-cursor-label="SCOPE"
            className="group relative -mx-6 md:-mx-14 px-6 md:px-14 pt-12 pb-16 md:py-20 transition-colors duration-300 overflow-hidden cursor-pointer"
          >
            {/* Animated hairline rule */}
            <div className="svc-line absolute top-0 left-6 md:left-14 right-6 md:right-14 h-px bg-line group-hover:bg-signal-red/30 transition-colors duration-300 z-20" />

            {/* Very light red background fill that wipes in from left to right on hover */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-signal-red/8 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none z-0"
            />

            {/* 3-column structured grid */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[140px_1.1fr_1.3fr] gap-8 lg:gap-14 items-start">
              {/* Left Column: Monumental Number */}
              <div className="flex items-baseline gap-2 select-none">
                <span className="svc-num font-display font-extrabold text-[clamp(56px,6vw,96px)] leading-none text-ink tracking-tight inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                  {s.num}
                </span>
                <span className="label text-slate group-hover:text-ink/60 text-xs font-semibold tracking-wider transition-colors duration-300">
                  / {s.total}
                </span>
              </div>

              {/* Middle Column: Tagline + Title + Editorial Quote */}
              <div className="svc-title-block space-y-3">
                <span className="label text-deep-red group-hover:text-signal-red text-[11px] font-bold tracking-[0.14em] block transition-colors duration-300">
                  {s.tagline}
                </span>
                <div className="flex items-center gap-3">
                  <h3 className="font-display font-extrabold text-ink text-[clamp(32px,3.6vw,52px)] leading-[0.96] tracking-tight m-0 uppercase">
                    {s.name}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-signal-red text-2xl font-bold inline-block"
                  >
                    ↗
                  </span>
                </div>
                <p className="font-body italic text-slate group-hover:text-ink/85 text-sm md:text-base leading-snug pt-1 m-0 transition-colors duration-300">
                  {s.quote}
                </p>
              </div>

              {/* Right Column: Paragraph + Deliverables Pill Badges */}
              <div className="svc-content-block space-y-6 lg:pt-1">
                <p className="text-slate group-hover:text-ink/90 text-btn leading-relaxed font-normal m-0 max-w-155 transition-colors duration-300">
                  {s.desc}
                </p>

                {/* Badge tags with magnetic micro-interactions */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {s.badges.map((badge) => (
                    <span
                      key={badge}
                      className="svc-badge inline-block px-3 py-1.5 rounded-xs border border-line group-hover:border-signal-red/25 bg-white/70 group-hover:bg-white text-ink font-body text-[10px] font-semibold tracking-[0.08em] uppercase select-none transition-all duration-200 hover:border-ink! hover:bg-ink! hover:text-paper! hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom boundary line for the last item */}
            {i === SERVICES.length - 1 && (
              <div className="absolute bottom-0 left-6 md:left-14 right-6 md:right-14 h-px bg-line group-hover:bg-signal-red/30 transition-colors duration-300 z-20" />
            )}
          </div>
        ))}
      </div>

      {/* ── Interactive Service Pricing Picker ── */}
      <div
        id="picker"
        className="mt-16 md:mt-24 p-6 md:p-11 bg-paper border border-line"
      >
        <span className="label text-slate text-[11px] tracking-[0.14em] block">
          § SERVICE SCOPES / INVESTMENT BENCHMARKS
        </span>
        <h3 className="font-display font-bold text-ink text-[clamp(26px,3vw,44px)] leading-tight tracking-tight mt-4 mb-0">
          Know what you need? See your options.
        </h3>

        {/* Tab List */}
        <div
          role="tablist"
          aria-label="Choose a service to view pricing"
          className="flex flex-wrap gap-2 pt-6 pb-2"
        >
          {TABS.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isSelected}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedItem(null);
                }}
                className={`px-5 py-3 border text-xs font-bold uppercase tracking-[0.06em] transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-ink text-paper border-ink"
                    : "bg-transparent text-ink border-ink hover:bg-ink/5"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Price Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-6">
          {OFFERINGS[activeTab].map((item) => (
            <article
              key={item.name}
              className="bg-white border border-line p-6 md:p-7 flex flex-col justify-between transition-all duration-200 hover:border-ink/40 shadow-xs"
            >
              <div>
                <span className="label text-slate text-[10px] tracking-[0.12em] block">
                  {activeTab === "identity"
                    ? "BRAND IDENTITY"
                    : "SCOPED SERVICE"}
                </span>
                <h4 className="font-display font-bold text-ink text-xl md:text-lead leading-snug tracking-tight my-3">
                  {item.name}
                </h4>
                <div className="font-display font-extrabold text-ink text-[clamp(22px,2.4vw,34px)] leading-tight tracking-tight mb-3">
                  {item.price}
                </div>
                <p className="text-slate text-xs md:text-[13px] leading-relaxed m-0 min-h-14 font-normal">
                  {item.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedItem(item);
                }}
                className="w-full mt-6 py-3 px-4 bg-ink text-paper hover:bg-signal-red hover:text-ink transition-colors font-bold text-[11px] tracking-wider uppercase text-left flex items-center justify-between cursor-pointer"
              >
                <span>Add to my brief</span>
                <span>↗</span>
              </button>
            </article>
          ))}
        </div>

        {/* Selected Scope Status */}
        {selectedItem && (
          <div
            role="status"
            className="mt-5 p-4 bg-ink text-paper text-xs font-semibold tracking-wide flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-signal-red animate-pulse" />
              <span>
                SELECTED: <strong>{selectedItem.name.toUpperCase()}</strong> ({selectedItem.price})
              </span>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <a
                href={`/contact?service=${encodeURIComponent(selectedItem.name)}`}
                className="px-4 py-2 bg-signal-red text-ink font-bold text-[11px] tracking-wider uppercase hover:bg-white transition-colors no-underline shadow-xs"
              >
                Proceed to brief ↗
              </a>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-paper/60 hover:text-paper text-sm cursor-pointer px-2 py-1"
                aria-label="Clear selection"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
