import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Featured 3-column editorial project selection */
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
    aspectClass: "aspect-[4/3] sm:aspect-[16/11]",
    offsetClass: "md:mt-0",
  },
  {
    id: "02",
    slug: "velcro-finance",
    client: "Velcro Finance",
    project: "Fintech App & Visual System",
    description:
      "A compact, flexible symbol & visual language designed for small-scale app icons, avatars and digital brand touchpoints.",
    year: "2024",
    tags: ["Fintech", "Product"],
    bgClass: "bg-[#141414]",
    image: "/projects/velcro/hero.webp",
    aspectClass: "aspect-[4/3] sm:aspect-[16/11]",
    offsetClass: "md:mt-16 lg:mt-24",
  },
  {
    id: "03",
    slug: "kraftigo",
    client: "Kraftigo",
    project: "Brand Identity & Equipment System",
    description:
      "A resilient industrial brand identity and equipment marking system engineered for high visibility across job sites and machinery.",
    year: "2024",
    tags: ["Industrial", "Engineering"],
    bgClass: "bg-[#050517]",
    image: "/projects/kraftigo/logo.webp",
    aspectClass: "aspect-[4/3] sm:aspect-[16/11]",
    offsetClass: "md:mt-8 lg:mt-12",
  },
];

/* 3-Column Project Card with editorial composition & hover interaction */
const ProjectCard = ({ project }) => {
  return (
    <Link
      to={`/works/${project.slug}`}
      className="cursor-pointer group flex flex-col no-underline text-inherit block h-full"
      data-cursor="view"
      data-cursor-label="EXPLORE CASE"
    >
      {/* image area */}
      <div
        className={`w-full ${project.aspectClass} relative overflow-hidden rounded-xs ${project.bgClass} transition-transform duration-500 ease-out group-hover:scale-[1.015] border border-line/50 shadow-xs`}
      >
        <img
          src={project.image}
          alt={project.client}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Category tag badge top-left */}
        <div className="absolute top-3.5 left-3.5 pointer-events-none select-none z-10">
          <span className="label text-paper/90 bg-ink/60 backdrop-blur-xs px-2 py-0.5 rounded-xs text-[9px] font-semibold tracking-wider uppercase border border-white/10">
            {project.tags[0]}
          </span>
        </div>

        {/* Index watermark top-right */}
        <div className="absolute top-3.5 right-3.5 pointer-events-none select-none z-10">
          <span className="label text-paper/80 bg-ink/60 backdrop-blur-xs px-2 py-0.5 rounded-xs text-[10px] font-bold tracking-widest border border-white/10">
            № {project.id}
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
      <div className="flex flex-col justify-between mt-5 flex-1">
        <div>
          {/* tags & year row */}
          <div className="flex items-center justify-between gap-2 mb-2">
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
          <h4 className="font-display font-bold text-[clamp(20px,2.2vw,28px)] text-ink m-0 mb-1 tracking-tight leading-tight group-hover:text-deep-red transition-colors">
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
      // Entrance stagger
      gsap.from(".work-item", {
        y: 60,
        opacity: 0,
        duration: 0.95,
        stagger: 0.15,
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
      id="work"
      ref={sectionRef}
      className="bg-paper py-[clamp(56px,8vw,140px)] px-5 sm:px-8 md:px-11 font-body overflow-hidden"
    >
      {/* ── header row ── */}
      <div className="flex justify-between items-center gap-5 pt-3 pb-2 border-t border-ink mb-6 md:mb-10">
        <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none">
          § SELECTED WORK / ARCHIVE 2024
        </span>
        <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none">
          02 / 07
        </span>
      </div>

      {/* ── 3-column editorial staggered project grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-11 items-start pb-12 md:pb-20">
        {PROJECTS.map((p, idx) => (
          <div
            key={p.id}
            ref={(el) => (cardRefs.current[idx] = el)}
            className={`work-item ${p.offsetClass}`}
          >
            <ProjectCard project={p} />
          </div>
        ))}
      </div>

      {/* ── bottom archive link row ── */}
      <div className="pt-6 flex justify-end items-center">
        <Link
          to="/works"
          className="inline-flex items-center gap-2 text-ink hover:text-signal-red font-display text-xs font-bold uppercase tracking-wider no-underline transition-colors border-b border-ink/30 pb-0.5 hover:border-signal-red"
        >
          <span>View all work & archive</span>
          <span>↗</span>
        </Link>
      </div>
    </section>
  );
};

export default Work;
