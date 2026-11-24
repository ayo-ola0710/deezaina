import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { RiArrowRightUpLine, RiFilter3Line } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const ALL_PROJECTS = [
  {
    id: "01",
    slug: "iconfig-technology",
    client: "iConfig Technology",
    category: "Technology",
    service: "Brand Identity & Design System",
    year: "2024",
    tags: ["Technology", "Identity System", "Merchandise"],
    summary:
      "A distinctive tech identity engineered for seamless recognition across corporate stationery, apparel, hard-hats and field equipment.",
    deliverables: [
      "Wordmark & Symbol",
      "Color Architecture",
      "Corporate Stationery",
      "Executive Business Cards",
      "Apparel & Hardhat Application",
    ],
    heroImage: "/projects/iconfig/hero.webp",
    altImage: "/projects/iconfig/cards.webp",
    caseUrl: "https://www.behance.net/gallery/207306215/Brand-Identity-Design-for-Tech-Brand",
    caseLabel: "Verified Case on Behance",
    colorAccent: "#0B1528",
  },
  {
    id: "02",
    slug: "velcro-finance",
    client: "Velcro Finance",
    category: "Fintech",
    service: "Fintech App & Visual System",
    year: "2024",
    tags: ["Fintech", "Product UI", "Avatar System"],
    summary:
      "A compact, flexible symbol & visual language designed for small-scale app icons, digital avatars and identity systems.",
    deliverables: [
      "Standalone V Symbol",
      "Mobile App Icon Design",
      "Digital Profile Avatars",
      "Identity System Board",
    ],
    heroImage: "/projects/velcro/hero.webp",
    altImage: "/projects/velcro/dp.jpg",
    caseUrl: "https://www.behance.net/gallery/207317309/Visual-Identity-for-Velcro-Finance-App",
    caseLabel: "Verified Case on Behance",
    colorAccent: "#141414",
  },
  {
    id: "03",
    slug: "margin-plus",
    client: "Margin Plus",
    category: "Digital Product",
    service: "Multi-Touchpoint Identity",
    year: "2024",
    tags: ["Agrotech", "Digital Product", "Retail Signage"],
    summary:
      "A comprehensive graphic system translating fluidly from digital app interfaces to exterior retail signage.",
    deliverables: [
      "Mobile App Interface System",
      "App Icon & Glyph Design",
      "Exterior Architectural Signage",
      "Retail Display Banners",
    ],
    heroImage: "/projects/margin-plus/hero.webp",
    altImage: "/projects/margin-plus/alt.webp",
    caseUrl: "https://www.behance.net/gallery/207305111/Agrotech-(Margin-Plus)-Brand-Identity",
    caseLabel: "Verified Case on Behance",
    colorAccent: "#0C1F16",
  },
  {
    id: "04",
    slug: "shuga-entertainment",
    client: "Shuga Entertainment",
    category: "Entertainment",
    service: "Ticketing & Event Identity",
    year: "2024",
    tags: ["Entertainment", "Ticketing", "Event Collateral"],
    summary:
      "High-contrast black, gold and white visual identity designed for modern ticketing interfaces, VIP cards and event wristbands.",
    deliverables: [
      "Interlocking Flowing Emblem",
      "Ticketing Platform Mobile UI",
      "VIP Access Cards & Pass System",
      "Event Access Wristbands",
    ],
    heroImage: "/projects/shuga/hero.webp",
    altImage: "/projects/shuga/card.jpg",
    caseUrl: "https://www.behance.net/gallery/241822031/Ticketing-Platform-Brand-Identity-Design",
    caseLabel: "Verified Case on Behance",
    colorAccent: "#1A1813",
  },
  {
    id: "05",
    slug: "nourish-bites",
    client: "Nourish Bites",
    category: "Packaging",
    service: "FMCG Brand & Packaging Range",
    year: "2024",
    tags: ["FMCG", "Packaging", "Character Mark"],
    summary:
      "A bright packaged-peanuts identity that brings the Nourish Bites character into a repeatable, shelf-ready pouch presentation.",
    deliverables: [
      "Brand Mascot & Character Mark",
      "Peanut Snack Pouch System",
      "Retail Label Hierarchy",
      "Flavor Color Blocking",
    ],
    heroImage: "/projects/nourish-bites/hero.webp",
    altImage: "/projects/nourish-bites/alt.webp",
    caseUrl: "https://www.behance.net/gallery/241822281/Packaged-Peanuts-Branding",
    caseLabel: "Verified Case on Behance",
    colorAccent: "#381E11",
  },
  {
    id: "06",
    slug: "smg-plug",
    client: "SMG Plug",
    category: "Retail",
    service: "Online Phone Store Identity",
    year: "2024",
    tags: ["E-Commerce", "Retail", "Mobile Store"],
    summary:
      "A high-contrast identity for an online phone store, pairing a responsive symbol with vivid green promotional graphics and digital store UI.",
    deliverables: [
      "Responsive Icon & Glyph System",
      "E-Commerce Trust Badges",
      "Social Promo Framework",
      "Retail Flyer Formats",
      "Mobile Store Touchpoints",
    ],
    heroImage: "/projects/smg-plug/hero.jpg",
    altImage: "/projects/smg-plug/alt.jpg",
    caseUrl: "https://www.behance.net/gallery/241825091/Online-Phone-Store-Branding-Icon-Design",
    caseLabel: "Verified Case on Behance",
    colorAccent: "#0B2612",
  },
  {
    id: "07",
    slug: "daily-tummies",
    client: "Daily Tummies",
    category: "Packaging",
    service: "Food Packaging & Multi-SKU Range",
    year: "2024",
    tags: ["Food Packaging", "Nutritional", "Multi-SKU"],
    summary:
      "A vibrant food packaging system designed to make Daily Tummies' nutritional product family immediately recognisable across retail shelf displays.",
    deliverables: [
      "500g Stand-Up Pouch Architecture",
      "Multi-SKU Product Range System",
      "Nutritional Read Hierarchy",
      "Ingredient Color Blocking",
    ],
    heroImage: "/projects/daily-tummies/hero.jpg",
    altImage: "/projects/daily-tummies/alt.jpg",
    caseUrl: "https://drive.google.com/drive/folders/12uOigPHYskI2VnILJE3DW4cwLIEqi51v",
    caseLabel: "Curated Studio Review Set (Google Drive)",
    colorAccent: "#1B432A",
  },
  {
    id: "08",
    slug: "suzyque",
    client: "Suzyque",
    category: "Consumer Goods",
    service: "Packaged Food & Brand Extension",
    year: "2024",
    tags: ["Consumer Goods", "Packaging", "Brand Identity"],
    summary:
      "A warm, high-visibility food brand identity developed across product labels, stand-up pouches, packaging stickers, and promotional cards.",
    deliverables: [
      "Brand Mark & Script Emblem",
      "Stand-Up Groundnut Pouch",
      "Transparent Jar Label System",
      "Security Stickers & Loyalty Cards",
    ],
    heroImage: "/projects/suzyque/hero.jpg",
    altImage: "/projects/suzyque/alt.jpg",
    caseUrl: "https://drive.google.com/drive/folders/1EfAlof4nkqK35cBq8_RTjCSu5BvrBdzh",
    caseLabel: "Curated Studio Review Set (Google Drive)",
    colorAccent: "#C85215",
  },
  {
    id: "09",
    slug: "kraftigo",
    client: "Kraftigo",
    category: "Industrial",
    service: "Brand Identity & Equipment System",
    year: "2024",
    tags: ["Industrial", "Engineering", "Safety Equipment"],
    summary:
      "A resilient industrial brand identity and equipment marking system engineered for high visibility across job sites, machinery, and apparel.",
    deliverables: [
      "Industrial Wordmark & Construction Symbol",
      "Safety Orange & Royal Blue Palette",
      "Field Safety Hardhat Branding",
      "Crew Uniform & Workwear Apparel",
      "Architectural Outdoor Signage",
      "Executive Business Stationery",
    ],
    heroImage: "/projects/kraftigo/hero.webp",
    altImage: "/projects/kraftigo/card.webp",
    caseUrl: "https://drive.google.com/drive/folders/1G8pwlYG3Q8OnaQm8FCWYASBueMtBVfoX",
    caseLabel: "Curated Studio Review Set (Google Drive)",
    colorAccent: "#050517",
  },
];

const CATEGORIES = [
  "ALL",
  "TECHNOLOGY",
  "FINTECH",
  "DIGITAL PRODUCT",
  "ENTERTAINMENT",
  "PACKAGING",
  "RETAIL",
  "CONSUMER GOODS",
  "INDUSTRIAL",
];

const Works = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [viewModes, setViewModes] = useState({});
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  // Toggle between hero and alt preview image for each project card
  const toggleViewMode = (id) => {
    setViewModes((prev) => ({
      ...prev,
      [id]: prev[id] === "alt" ? "hero" : "alt",
    }));
  };

  const filteredProjects =
    activeCategory === "ALL"
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter(
          (p) =>
            p.category.toUpperCase() === activeCategory ||
            p.tags.some((t) => t.toUpperCase() === activeCategory)
        );

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.from(".works-header-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.from(".works-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-paper text-ink font-body min-h-screen selection:bg-signal-red selection:text-white">
      <Navbar />

      {/* ── Editorial Header ── */}
      <section
        ref={headerRef}
        className="pt-32 md:pt-40 pb-12 md:pb-16 px-5 sm:px-8 md:px-14 border-b border-line"
      >
        <div className="max-w-7xl mx-auto">
          {/* Top chapter stamp */}
          <div className="works-header-reveal flex justify-between items-center gap-5 pt-3 pb-2 border-t border-ink mb-6 md:mb-10">
            <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none">
              <span className="w-2 h-2 rounded-full bg-signal-red inline-block" />
              <span>§ SELECTED WORK / EDITORIAL ARCHIVE</span>
            </span>
            <span className="text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate select-none">
              {ALL_PROJECTS.length} DOCUMENTED COMMISSIONS · STUDIO & BEHANCE ARCHIVE
            </span>
          </div>

          {/* Main Title & Deck */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10 md:mb-14">
            <div className="lg:col-span-8">
              <h1 className="works-header-reveal display text-[clamp(40px,7.5vw,96px)] leading-[0.92] tracking-tight text-ink m-0">
                Strategic identities. <br />
                <span className="text-signal-red">Built to endure.</span>
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-2">
              <p className="works-header-reveal text-slate text-sm md:text-base leading-relaxed m-0">
                Independent strategy, visual systems, and digital product identity.
                Every decision answers the core business challenge—not just an aesthetic impulse.
              </p>
            </div>
          </div>

          {/* Filter Bar with Mobile Scroll Hint */}
          <div className="relative">
            <div className="works-header-reveal flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-4 border-t border-line/60 pr-8">
              <div className="flex items-center gap-1.5 text-xs text-slate font-bold tracking-wider mr-2 uppercase shrink-0">
                <RiFilter3Line className="text-signal-red text-sm" />
                <span>Filter:</span>
              </div>
              {CATEGORIES.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xs text-[11px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? "bg-ink text-paper shadow-sm"
                        : "bg-ink/5 text-ink/70 hover:bg-ink/10 hover:text-ink"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            {/* Right scroll hint fade for narrow viewports */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-paper to-transparent md:hidden" />
          </div>
        </div>
      </section>

      {/* ── Projects Grid: 2-Column Editorial Presentation ── */}
      <section ref={gridRef} className="py-16 md:py-24 px-5 sm:px-8 md:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-16">
            {filteredProjects.map((project, idx) => {
              const currentImage =
                viewModes[project.id] === "alt" ? project.altImage : project.heroImage;

              return (
                <article
                  key={project.id}
                  id={project.slug}
                  className="works-card group flex flex-col justify-between border-b border-line pb-12"
                >
                  {/* Top image presentation */}
                  <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] overflow-hidden rounded-xs bg-ink/5 border border-line/60 shadow-xs mb-6 group/img">
                    <Link to={`/works/${project.slug}`} className="block w-full h-full">
                      <img
                        src={currentImage}
                        alt={project.client}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-104"
                        loading={idx < 2 ? "eager" : "lazy"}
                        fetchPriority={idx < 2 ? "high" : "auto"}
                      />
                    </Link>

                    {/* Top index watermark */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
                      <span className="label text-paper bg-ink/70 backdrop-blur-xs px-2.5 py-1 rounded-xs text-[10px] font-bold tracking-widest border border-white/10">
                        № {project.id}
                      </span>
                      <span className="label text-paper bg-ink/70 backdrop-blur-xs px-2.5 py-1 rounded-xs text-[10px] font-semibold tracking-wider uppercase border border-white/10">
                        {project.category}
                      </span>
                    </div>

                    {/* Image View Mode Switcher */}
                    {project.altImage && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleViewMode(project.id);
                        }}
                        className="absolute bottom-4 right-4 z-10 bg-paper/90 hover:bg-paper text-ink backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xs border border-line shadow-xs transition-colors cursor-pointer"
                      >
                        {viewModes[project.id] === "alt" ? "View Hero" : "View Details"} ↺
                      </button>
                    )}
                  </div>

                  {/* Metadata & Editorial Copy */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* Tags & Year */}
                      <div className="flex items-center justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          {project.tags.map((t, idx) => (
                            <span key={t} className="flex items-center gap-2">
                              <span className="label text-slate text-[10.5px] font-bold tracking-wider uppercase">
                                {t}
                              </span>
                              {idx < project.tags.length - 1 && (
                                <span className="text-line text-[9px]">·</span>
                              )}
                            </span>
                          ))}
                        </div>
                        <span className="label text-slate/70 text-[11px] font-bold tracking-wider shrink-0">
                          {project.year}
                        </span>
                      </div>

                      {/* Client Title */}
                      <Link
                        to={`/works/${project.slug}`}
                        className="no-underline block group-hover:text-deep-red transition-colors"
                      >
                        <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-ink tracking-tight leading-tight m-0 mb-3 hover:text-signal-red transition-colors">
                          {project.client}
                        </h2>
                      </Link>

                      {/* Summary */}
                      <p className="text-slate text-sm sm:text-[15px] leading-relaxed m-0 mb-5 font-normal">
                        {project.summary}
                      </p>

                      {/* Deliverables Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.deliverables.map((item) => (
                          <span
                            key={item}
                            className="bg-ink/4 text-ink/75 border border-line/60 rounded-xs text-[10px] font-medium tracking-wide px-2.5 py-1"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="pt-4 border-t border-line/50 flex items-center justify-between gap-4 flex-wrap">
                      <Link
                        to={`/works/${project.slug}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-ink text-paper text-xs font-bold uppercase tracking-wider rounded-xs no-underline hover:bg-signal-red hover:text-white transition-colors shadow-2xs"
                      >
                        <span>View Studio Case</span>
                        <RiArrowRightUpLine className="text-sm" />
                      </Link>

                      <a
                        href={project.caseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="label text-slate hover:text-ink text-[11px] font-bold uppercase tracking-wider no-underline transition-colors"
                      >
                        {project.caseLabel} ↗
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Studio Project Intake CTA ── */}
      <section className="bg-ink border-b border-line text-paper py-20 md:py-28 px-5 sm:px-8 md:px-14">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <h2 className="display text-paper text-[clamp(32px,5vw,68px)] leading-[0.95] tracking-tight m-0 mb-6">
            Ready to build a brand <br />
            that refuses to be ignored?
          </h2>
          <p className="text-paper/70 text-base md:text-lg max-w-2xl leading-relaxed m-0 mb-10">
            Tell us what is changing, what isn't working, or what you are aiming to build.
            We will start with strategy before a single pixel moves.
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-ink text-paper font-display text-xs font-extrabold uppercase tracking-wider hover:bg-white hover:text-ink transition-colors duration-200 no-underline shadow-md"
            >
              <span>Send a project brief</span>
              <RiArrowRightUpLine className="text-base" />
            </Link>
            <Link
              to="/contact#diagnosis"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-transparent border border-white/30 text-paper font-display text-xs font-extrabold uppercase tracking-wider hover:bg-white hover:text-ink hover:border-white transition-all duration-200 no-underline shadow-sm"
            >
              <span>Take the 3-question diagnosis</span>
              <span className="text-base">↓</span>
            </Link>
            <a
              href="https://calendly.com/deezainaa/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-signal-red text-ink font-display text-xs font-extrabold uppercase tracking-wider hover:bg-white transition-colors duration-200 no-underline shadow-md"
            >
              <span>Book a discovery call</span>
              <RiArrowRightUpLine className="text-base" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Works;
