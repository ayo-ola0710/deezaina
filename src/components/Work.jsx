import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Featured 4-project editorial bento selection from the studio review library */
const PROJECTS = [
  {
    id: "01",
    slug: "iconfig-technology",
    client: "iConfig Technology",
    project: "Brand Identity & Design System",
    description:
      "A distinctive tech identity engineered for seamless recognition across corporate stationery, apparel and digital touchpoints.",
    year: "2024",
    tags: ["Technology", "Identity"],
    bgClass: "bg-[#0B1528]",
    image: "/projects/iconfig/hero.webp",
    gridClass: "col-span-12 lg:col-span-7",
    imageHeight: "h-64 sm:h-80 lg:h-96",
  },
  {
    id: "02",
    slug: "velcro-finance",
    client: "Velcro Finance",
    project: "Fintech App & Visual System",
    description:
      "A compact, flexible symbol & visual language designed for small-scale app icons, debit cards and physical brand assets.",
    year: "2024",
    tags: ["Fintech", "Product"],
    bgClass: "bg-[#141414]",
    image: "/projects/velcro/hero.webp",
    gridClass: "col-span-12 lg:col-span-5",
    imageHeight: "h-64 sm:h-80 lg:h-96",
  },
  {
    id: "03",
    slug: "shuga-entertainment",
    client: "Shuga Entertainment",
    project: "Ticketing & Event Identity",
    description:
      "High-contrast black, gold and white visual identity designed for modern ticketing interfaces and live event collateral.",
    year: "2024",
    tags: ["Entertainment", "Ticketing"],
    bgClass: "bg-[#1A1813]",
    image: "/projects/shuga/hero.webp",
    gridClass: "col-span-12 lg:col-span-5",
    imageHeight: "h-64 sm:h-80 lg:h-96",
  },
  {
    id: "04",
    slug: "margin-plus",
    client: "Margin Plus",
    project: "Multi-Touchpoint Identity",
    description:
      "A comprehensive graphic system translating fluidly from digital app interfaces to retail banners, signage and campaigns.",
    year: "2024",
    tags: ["Agrotech", "Digital Product"],
    bgClass: "bg-[#0C1F16]",
    image: "/projects/margin-plus/hero.webp",
    gridClass: "col-span-12 lg:col-span-7",
    imageHeight: "h-64 sm:h-80 lg:h-96",
  },
];

/* Bento Project Card with editorial composition & hover interaction */
const BentoProjectCard = ({ project }) => {
  return (
    <Link
      to={`/works/${project.slug}`}
      className="cursor-pointer group flex flex-col no-underline text-inherit block h-full"
      data-cursor="view"
      data-cursor-label="EXPLORE CASE"
    >
      {/* image area */}
      <div
        className={`w-full ${project.imageHeight} relative overflow-hidden rounded-xs ${project.bgClass} transition-transform duration-500 ease-out group-hover:scale-[1.01] shadow-xs border border-line/50`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.client}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading={project.id === "01" || project.id === "02" ? "eager" : "lazy"}
            fetchPriority={project.id === "01" || project.id === "02" ? "high" : "auto"}
          />
        ) : null}

        {/* Category tag badge top-left */}
        <div className="absolute top-3.5 left-3.5 pointer-events-none select-none z-10">
          <span className="label text-paper/90 bg-ink/60 backdrop-blur-xs px-2 py-0.5 rounded-xs text-[9px] font-semibold tracking-wider uppercase border border-white/10">
            {project.tags[0]}
          </span>
        </div>

        {/* hover overlay */}
        <div className="absolute inset-0 bg-ink/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center z-20 backdrop-blur-xs">
          <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <span className="label text-signal-red text-xs tracking-[0.2em] font-bold block mb-1.5">
              CASE STUDY
            </span>
            <span className="display text-paper text-lg font-bold">
              VIEW PROJECT ↗
            </span>
          </div>
        </div>
      </div>

      {/* metadata & title deck */}
      <div className="flex flex-col justify-between mt-4 flex-1">
        <div>
          {/* tags & year row */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <span className="label text-signal-red font-bold text-[10px]">
                {project.id}
              </span>
              <span className="w-px h-2.5 bg-line inline-block" />
              {project.tags.map((t, idx) => (
                <span key={t} className="flex items-center gap-1.5">
                  <span className="label text-slate text-[10px] tracking-wider uppercase font-semibold">
                    {t}
                  </span>
                  {idx < project.tags.length - 1 && (
                    <span className="text-line text-[9px]">·</span>
                  )}
                </span>
              ))}
            </div>

            <span className="label text-slate/70 text-[10px] tracking-wider font-semibold">
              {project.year}
            </span>
          </div>

          {/* client name */}
          <h4 className="font-display font-bold text-[clamp(20px,2vw,26px)] text-ink m-0 mb-1 tracking-tight leading-tight group-hover:text-deep-red transition-colors">
            {project.client}
          </h4>
          <p className="text-slate text-[13px] leading-relaxed m-0 font-normal line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

const Work = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Initial entrance stagger
      gsap.from(".work-item", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-paper py-[clamp(56px,8vw,140px)] px-5 sm:px-8 md:px-11 font-body overflow-hidden"
    >
      {/* ── header row ── */}
      <div className="flex justify-between items-center gap-5 pt-3 pb-2 border-t border-ink mb-6 md:mb-8">
        <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none">
          § SELECTED WORK / ARCHIVE 2024
        </span>
        <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none">
          02 / 07
        </span>
      </div>

      {/* ── 4-card editorial bento grid ── */}
      <div className="grid grid-cols-12 gap-6 lg:gap-8 items-stretch pb-10 md:pb-16">
        {PROJECTS.map((p, idx) => (
          <div
            key={p.id}
            ref={(el) => (cardRefs.current[idx] = el)}
            className={`work-item ${p.gridClass}`}
          >
            <BentoProjectCard project={p} />
          </div>
        ))}
      </div>

      {/* ── bottom archive link row ── */}
      <div className="pt-6 -pb-30 flex flex-col sm:flex-row justify-end items-end gap-4">
        
        <Link
          to="/works"
          className="inline-flex items-center gap-2 text-ink hover:text-signal-red font-display text-xs font-bold uppercase tracking-wider no-underline transition-colors"
        >
          <span>View all work & archive</span>
          <span>↗</span>
        </Link>
      </div>
    </section>
  );
};

export default Work;
