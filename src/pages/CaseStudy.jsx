import { useEffect, useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { getCaseStudyBySlug } from "../data/caseStudies";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiArrowRightUpLine,
  RiCheckDoubleLine,
  RiFileCopyLine,
} from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const CaseStudy = () => {
  const { slug } = useParams();
  const project = getCaseStudyBySlug(slug);
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Header entrance animation
      gsap.from(".case-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.1,
      });

      // Gallery images entrance animation
      gsap.from(".gallery-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".case-gallery-section",
          start: "top 80%",
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [slug]);

  if (!project) {
    return (
      <div className="bg-paper text-ink font-body min-h-screen">
        <Navbar />
        <div className="pt-40 pb-24 px-6 text-center max-w-xl mx-auto">
          <span className="label text-signal-red text-xs font-bold tracking-widest uppercase mb-4 block">
            404 / CASE STUDY
          </span>
          <h1 className="display text-4xl font-bold mb-4">Case Study Coming Soon</h1>
          <p className="text-slate text-sm mb-8 leading-relaxed">
            This project’s documentation is currently being edited from the studio review library.
          </p>
          <Link
            to="/works"
            className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-paper text-xs font-bold uppercase tracking-wider no-underline hover:bg-signal-red hover:text-white transition-colors"
          >
            <span>← Return to All Works</span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="bg-paper text-ink font-body min-h-screen selection:bg-signal-red selection:text-white"
    >
      <Navbar />

      {/* ── Top Navigation & Breadcrumb ── */}
      <div className="pt-28 md:pt-36 px-5 sm:px-8 md:px-14 max-w-7xl mx-auto">
        <div className="case-reveal flex items-center justify-between pb-4 border-b border-line text-xs">
          <Link
            to="/works"
            className="inline-flex items-center gap-2 label text-slate hover:text-signal-red font-bold uppercase tracking-wider no-underline transition-colors"
          >
            <RiArrowLeftLine className="text-sm" />
            <span>All Selected Work</span>
          </Link>

          <span className="label text-slate/70 font-bold uppercase tracking-widest text-[11px]">
            § ARCHIVE / № {project.id} · {project.year}
          </span>
        </div>
      </div>

      {/* ── Hero Header ── */}
      <section className="pt-8 md:pt-12 pb-12 md:pb-16 px-5 sm:px-8 md:px-14 max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12">
          {/* Category / Discipline Pill */}
          <div className="case-reveal flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-signal-red inline-block" />
            <span className="label text-signal-red text-xs font-bold tracking-[0.16em] uppercase">
              {project.category} · {project.service}
            </span>
          </div>

          {/* Client Title */}
          <h1 className="case-reveal display text-[clamp(40px,7.5vw,96px)] leading-[0.92] tracking-tight text-ink m-0 mb-6">
            {project.client}
          </h1>

          {/* Headline Statement */}
          <p className="case-reveal font-display text-xl sm:text-2xl lg:text-3xl font-medium text-slate leading-snug max-w-4xl m-0">
            {project.headline}
          </p>
        </div>

        {/* Project Metadata Strip */}
        <div className="case-reveal grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-line">
          <div>
            <span className="label text-slate text-[10px] font-bold uppercase tracking-widest block mb-1">
              Sector
            </span>
            <span className="text-xs sm:text-sm font-semibold text-ink">
              {project.clientSector}
            </span>
          </div>

          <div>
            <span className="label text-slate text-[10px] font-bold uppercase tracking-widest block mb-1">
              Discipline
            </span>
            <span className="text-xs sm:text-sm font-semibold text-ink">
              {project.service}
            </span>
          </div>

          <div>
            <span className="label text-slate text-[10px] font-bold uppercase tracking-widest block mb-1">
              Timeline / Year
            </span>
            <span className="text-xs sm:text-sm font-semibold text-ink">
              {project.year} · Studio Practice
            </span>
          </div>

          <div>
            <span className="label text-slate text-[10px] font-bold uppercase tracking-widest block mb-1">
              Verification
            </span>
            <a
              href={project.behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-signal-red hover:underline"
            >
              <span>{project.sourceLabel || "Behance Presentation"}</span>
              <RiArrowRightUpLine className="text-sm" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Main Full-Bleed Lead Visual ── */}
      <section className="px-5 sm:px-8 md:px-14 max-w-7xl mx-auto mb-16 md:mb-24">
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-xs bg-ink/5 border border-line/60 shadow-sm">
          <img
            src={project.heroImage}
            alt={project.client}
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute top-4 right-4 bg-ink/75 backdrop-blur-xs text-paper px-3 py-1 rounded-xs text-[10px] font-bold uppercase tracking-widest border border-white/10">
            Lead Identity Asset
          </div>
        </div>
      </section>

      {/* ── Context & Narrative Section (2-Column Studio Architecture) ── */}
      <section className="px-5 sm:px-8 md:px-14 max-w-7xl mx-auto mb-20 md:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative & Color Palette */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <span className="label text-signal-red text-xs font-bold tracking-[0.16em] uppercase block mb-3">
                01 / THE CONTEXT & OBJECTIVE
              </span>
              <h2 className="display text-2xl sm:text-3xl text-ink leading-tight m-0 mb-4">
                What was actually happening?
              </h2>
              <p className="text-slate text-base sm:text-lg leading-relaxed m-0 font-normal">
                {project.overview}
              </p>
            </div>

            <div>
              <span className="label text-signal-red text-xs font-bold tracking-[0.16em] uppercase block mb-3">
                02 / THE STRATEGIC RESPONSE
              </span>
              <h2 className="display text-2xl sm:text-3xl text-ink leading-tight m-0 mb-4">
                Strategy before aesthetic decisions.
              </h2>
              <p className="text-slate text-base sm:text-lg leading-relaxed m-0 font-normal">
                {project.approach}
              </p>
            </div>

            {/* Color Palette Display */}
            {project.palette && (
              <div className="pt-6 border-t border-line">
                <span className="label text-slate text-[11px] font-bold uppercase tracking-widest block mb-4">
                  Color System Architecture
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.palette.map((c) => (
                    <div
                      key={c.name}
                      className="border border-line rounded-xs overflow-hidden shadow-2xs"
                    >
                      <div className={`h-16 w-full ${c.class}`} />
                      <div className="p-2.5 bg-paper/60">
                        <span className="block font-bold text-[11px] text-ink leading-tight">
                          {c.name}
                        </span>
                        <span className="label text-slate text-[10px] tracking-wider uppercase">
                          {c.hex}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Deliverables Card & Dialogue Action */}
          <div className="lg:col-span-5 bg-ink/3 border border-line p-6 sm:p-8 rounded-xs space-y-8 sticky top-28">
            <div>
              <span className="label text-slate text-[10px] font-bold uppercase tracking-widest block mb-3">
                Project Scope & Deliverables
              </span>
              <ul className="list-none m-0 p-0 space-y-3">
                {project.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-ink">
                    <RiCheckDoubleLine className="text-signal-red text-base shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-line/60">
              <span className="label text-signal-red text-[10px] font-bold uppercase tracking-widest block mb-2">
                Need a similar system?
              </span>
              <p className="text-slate text-xs leading-relaxed m-0 mb-4">
                We design brands that feel joined up across digital, print, and operations.
              </p>
              <a
                href="https://calendly.com/deezainaa/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full px-5 py-3.5 bg-ink text-paper text-xs font-bold uppercase tracking-wider hover:bg-signal-red hover:text-white transition-colors duration-200 no-underline shadow-sm"
              >
                <span>Book a discovery call</span>
                <RiArrowRightUpLine className="text-base" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Curated Application Gallery Section ── */}
      <section className="case-gallery-section bg-ink/2 py-20 md:py-28 px-5 sm:px-8 md:px-14 border-t border-b border-line">
        <div className="max-w-7xl mx-auto">
          {/* Gallery Header */}
          <div className="flex justify-between items-end gap-5 mb-10 md:mb-14">
            <div>
              <span className="label text-signal-red text-xs font-bold tracking-[0.16em] uppercase block mb-2">
                03 / APPLICATION SHOWCASE
              </span>
              <h2 className="display text-3xl sm:text-4xl text-ink m-0">
                Visual language in practice.
              </h2>
            </div>
            <span className="label text-slate text-xs uppercase tracking-widest hidden sm:inline-block">
              {project.gallery.length} Verified Frames
            </span>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-12 gap-6 lg:gap-8 items-start">
            {project.gallery.map((item, idx) => (
              <figure
                key={idx}
                className={`gallery-card ${item.span} m-0 flex flex-col justify-between`}
              >
                <div
                  className={`w-full ${item.aspect} overflow-hidden rounded-xs bg-ink/5 border border-line/60 shadow-xs mb-3 group`}
                >
                  <img
                    src={item.url}
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                    loading="lazy"
                  />
                </div>
                <figcaption className="label text-slate text-xs leading-relaxed pt-1">
                  <span className="font-bold text-ink mr-1.5">{String(idx + 1).padStart(2, "0")}</span>
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Next / Previous Project Navigation ── */}
      <section className="py-14 md:py-20 px-5 sm:px-8 md:px-14 border-b border-line max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-stretch justify-between gap-6">
          {project.prevSlug ? (
            <Link
              to={`/works/${project.prevSlug}`}
              className="flex-1 p-6 border border-line hover:border-ink hover:bg-ink/2 transition-colors no-underline group rounded-xs"
            >
              <span className="label text-slate text-[10px] font-bold uppercase tracking-widest block mb-2">
                ← Previous Case Study
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-ink m-0 group-hover:text-signal-red transition-colors">
                {project.prevClient}
              </h3>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {project.nextSlug ? (
            <Link
              to={`/works/${project.nextSlug}`}
              className="flex-1 p-6 border border-line hover:border-ink hover:bg-ink/2 transition-colors no-underline group text-right rounded-xs"
            >
              <span className="label text-slate text-[10px] font-bold uppercase tracking-widest block mb-2">
                Next Case Study →
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-ink m-0 group-hover:text-signal-red transition-colors">
                {project.nextClient}
              </h3>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </section>

      {/* ── Studio Intake CTA ── */}
      <section className="bg-ink border-b text-paper py-20 md:py-28 px-5 sm:px-8 md:px-14">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <h2 className="display text-paper text-[clamp(32px,5vw,68px)] leading-[0.95] tracking-tight m-0 mb-6">
            Ready for a brand that <br />
            demands attention?
          </h2>
          <p className="text-paper/70 text-base md:text-lg max-w-2xl leading-relaxed m-0 mb-10">
            Tell us what is changing or what you are aiming to build. We will begin with strategic clarity.
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
              <RiArrowRightUpLine className="text-base" />
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

export default CaseStudy;
