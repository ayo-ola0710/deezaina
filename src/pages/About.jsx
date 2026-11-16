import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import {
  RiCompass3Line,
  RiVideoLine,
  RiGlobalLine,
  RiArrowRightUpLine,
  RiCheckDoubleLine,
} from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    num: "01",
    tag: "STRATEGY",
    icon: RiCompass3Line,
    title: "Building the blueprint for digital success.",
    description:
      "From comprehensive campaign planning to streamlined operational workflows, we ensure every creative decision is driven by purpose and positioned for impact.",
    capabilities: [
      "Comprehensive Campaign Planning",
      "Brand Positioning & Narrative",
      "Operational Creative Workflows",
      "Audience Journey Mapping",
    ],
  },
  {
    num: "02",
    tag: "MEDIA",
    icon: RiVideoLine,
    title: "Crafting scroll-stopping visual narratives.",
    description:
      "We manage end-to-end production and structured post-production pipelines, delivering cinematic content that captures attention and elevates your brand.",
    capabilities: [
      "End-to-End Video Production",
      "Cinematic Brand Storytelling",
      "Structured Post-Production Pipelines",
      "Multi-Format Content Campaigns",
    ],
  },
  {
    num: "03",
    tag: "WEB",
    icon: RiGlobalLine,
    title: "Developing digital platforms that perform.",
    description:
      "We build functional, seamless web experiences that bridge the gap between your visual identity and your audience's digital journey.",
    capabilities: [
      "High-Performance Web Design",
      "Interactive Digital Experiences",
      "Design Systems & Brand Platforms",
      "Conversion & Engagement Paths",
    ],
  },
];

const APPROACH_STEPS = [
  {
    step: "01",
    title: "Onboarding & Alignment",
    desc: "From the very first checklist, we align on goals, benchmarks, and creative direction with zero ambiguity.",
  },
  {
    step: "02",
    title: "Structured Operations",
    desc: "We take the friction out of execution with predictable milestones and rigorous quality reviews.",
  },
  {
    step: "03",
    title: "Impact & Delivery",
    desc: "Every deliverable is on time, on brand, and engineered to engage your target audience effectively.",
  },
];

const About = () => {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const whoRef = useRef(null);
  const approachRef = useRef(null);
  const pillarsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero entrance
      gsap.fromTo(
        heroRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, ease: "power3.out" },
      );

      // 2. Who We Are entrance
      gsap.fromTo(
        whoRef.current,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: whoRef.current,
            start: "top 82%",
          },
        },
      );

      // 3. Approach entrance
      gsap.fromTo(
        approachRef.current,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: approachRef.current,
            start: "top 82%",
          },
        },
      );

      // 4. Pillars entrance
      gsap.fromTo(
        ".pillar-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pillarsRef.current,
            start: "top 80%",
          },
        },
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-paper text-ink font-body min-h-screen">
      <Navbar />

      <main className="pt-28 md:pt-36">
        {/* ══════════════════════════════════════════════════════
            HERO SECTION: Headline & Mission Statement
        ══════════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="px-6 md:px-14 max-w-350 mx-auto pb-16 md:pb-24"
        >
          {/* Eyeline Annotation */}
          <div className="flex justify-between items-center gap-5 pt-3 pb-2 border-t border-ink mb-10 md:mb-16">
            <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none">
              § THE STUDIO / ABOUT DEEZAINA
            </span>
            <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none">
              OVERVIEW
            </span>
          </div>

          <h1 className="font-display font-extrabold text-ink text-[clamp(44px,7.2vw,104px)] leading-[0.92] tracking-tight uppercase m-0 max-w-280">
            Where Strategy Meets{" "}
            <span className="text-signal-red">Storytelling</span>
            <span className="text-signal-red">.</span>
          </h1>

          <p className="text-slate text-lg md:text-2xl leading-relaxed max-w-230 mt-8 font-normal">
            We are Deezaina Studios, a digital and creative solutions agency
            building brands, executing campaigns, and producing media that
            leaves a lasting impact.
          </p>

          <div className="flex items-center gap-4 pt-10 flex-wrap">
            <a
              href="/contact"
              className="inline-flex items-center justify-between gap-6 px-7 py-4 bg-ink text-paper text-xs font-bold tracking-[0.08em] uppercase hover:bg-signal-red hover:text-ink transition-colors no-underline shadow-sm"
            >
              <span>Start a project with us</span>
              <RiArrowRightUpLine className="text-base" />
            </a>
            <a
              href="#pillars"
              className="inline-flex items-center justify-between gap-4 px-7 py-4 bg-transparent border border-ink text-ink text-xs font-bold tracking-[0.08em] uppercase hover:bg-ink hover:text-paper transition-colors no-underline"
            >
              <span>Explore what we do</span>
              <span>↓</span>
            </a>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION 1: Who We Are (Introduction)
        ══════════════════════════════════════════════════════ */}
        <section
          ref={whoRef}
          className="px-6 md:px-14 max-w-350 mx-auto py-16 md:py-24"
        >
          <div className="flex justify-between items-center gap-5 pt-3 pb-2 border-t border-ink mb-10 md:mb-14">
            <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none">
              § WHO WE ARE / THE INTRODUCTION
            </span>
            <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none">
              PHILOSOPHY
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-6">
              <h2 className="font-display font-extrabold text-ink text-[clamp(32px,4.5vw,64px)] leading-[0.98] tracking-tight uppercase m-0">
                At Deezaina, we don't just create content; we build{" "}
                <span className="text-signal-red">comprehensive digital experiences.</span>
              </h2>
            </div>

            <div className="lg:col-span-6 space-y-6 pt-2">
              <p className="text-slate text-base md:text-xl leading-relaxed font-normal m-0">
                We are a dynamic team of strategists, designers, and video
                specialists dedicated to bridging the gap between imagination
                and execution.
              </p>
              <p className="text-slate text-base md:text-xl leading-relaxed font-normal m-0">
                Whether you are a startup looking for a striking brand identity
                or an established organization launching a large-scale media
                campaign, we bring your vision to life with precision and
                flair.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION 2: Our Approach (The "Why Us" Section)
        ══════════════════════════════════════════════════════ */}
        <section
          ref={approachRef}
          className="bg-[#111111] text-paper py-16 md:py-28 px-6 md:px-14 overflow-hidden"
        >
          <div className="max-w-350 mx-auto">
            <div className="flex justify-between items-center gap-5 pt-3 pb-2 border-t border-white/20 mb-10 md:mb-16">
              <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-paper select-none">
                § OUR APPROACH / THE "WHY US"
              </span>
              <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-paper/60 select-none">
                METHODOLOGY
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16 md:mb-20">
              <div className="lg:col-span-5">
                <h2 className="font-display font-extrabold text-paper text-[clamp(34px,4.6vw,68px)] leading-[0.98] tracking-tight uppercase m-0">
                  Solid strategy. <br />
                  <span className="text-signal-red">Seamless operations.</span>
                </h2>
              </div>

              <div className="lg:col-span-7">
                <p className="text-paper/85 text-base md:text-xl leading-relaxed font-normal m-0 mb-6">
                  We believe that the best creative work is built on a foundation
                  of solid strategy and seamless operations. We take the friction
                  out of the creative process.
                </p>
                <p className="text-paper/65 text-base md:text-lg leading-relaxed font-normal m-0">
                  From the first onboarding checklist to the final video export,
                  our structured workflows ensure that every deliverable is on
                  time, on brand, and built to engage your target audience.
                </p>
              </div>
            </div>

            {/* Approach 3-Step Process Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
              {APPROACH_STEPS.map(({ step, title, desc }) => (
                <div
                  key={step}
                  className="bg-white/5 border border-white/10 p-6 md:p-8 flex flex-col justify-between min-h-[220px]"
                >
                  <div>
                    <span className="text-signal-red text-xs font-extrabold tracking-widest block mb-4">
                      {step} / APPROACH
                    </span>
                    <h3 className="font-display font-bold text-xl text-paper tracking-tight mb-3">
                      {title}
                    </h3>
                  </div>
                  <p className="text-paper/70 text-sm leading-relaxed m-0 font-normal">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            SECTION 3: What We Do (Core Pillars)
        ══════════════════════════════════════════════════════ */}
        <section
          id="pillars"
          ref={pillarsRef}
          className="px-6 md:px-14 max-w-350 mx-auto py-16 md:py-28"
        >
          <div className="flex justify-between items-center gap-5 pt-3 pb-2 border-t border-ink mb-10 md:mb-16">
            <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none">
              § WHAT WE DO / CORE PILLARS
            </span>
            <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none">
              CAPABILITIES
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {PILLARS.map(({ num, tag, icon: Icon, title, description, capabilities }) => (
              <article
                key={num}
                className="pillar-card border border-ink p-8 md:p-10 flex flex-col justify-between bg-white/40 hover:bg-white transition-all duration-300 group shadow-xs hover:shadow-md hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-line mb-6">
                    <span className="label text-slate text-xs font-bold tracking-wider">
                      {num} / {tag}
                    </span>
                    <Icon className="w-5 h-5 text-ink group-hover:text-signal-red transition-colors" />
                  </div>

                  <h3 className="font-display font-extrabold text-[clamp(24px,2.2vw,34px)] leading-[1.08] tracking-tight text-ink mb-4 group-hover:text-deep-red transition-colors">
                    {title}
                  </h3>

                  <p className="text-slate text-sm leading-relaxed font-normal mb-8">
                    {description}
                  </p>
                </div>

                <div className="pt-6 border-t border-line">
                  <span className="label text-[10px] tracking-widest text-slate block mb-3">
                    DELIVERABLES & INCLUSIONS
                  </span>
                  <ul className="list-none p-0 m-0 space-y-2">
                    {capabilities.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-ink/85 flex items-center gap-2 font-medium"
                      >
                        <RiCheckDoubleLine className="text-signal-red shrink-0 w-3.5 h-3.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            BOTTOM BANNER: Start an Engagement
        ══════════════════════════════════════════════════════ */}
        <section className="bg-signal-red text-ink py-16 md:py-20 px-6 md:px-14">
          <div className="max-w-350 mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <span className="label text-ink/75 text-[11px] font-bold tracking-[0.14em] block mb-3">
                LET'S MAKE SOMETHING ENDURING
              </span>
              <h2 className="font-display font-extrabold text-ink text-[clamp(32px,4vw,56px)] leading-[0.98] tracking-tight uppercase m-0">
                Ready to bring your vision to life?
              </h2>
            </div>

            <div className="flex items-center gap-4 shrink-0 flex-wrap">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-ink text-paper text-xs font-bold tracking-[0.1em] uppercase hover:bg-white hover:text-ink transition-colors no-underline shadow-sm"
              >
                <span>Dispatch your brief</span>
                <span>↗</span>
              </Link>
              <Link
                to="/contact#diagnosis"
                className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-ink text-ink text-xs font-bold tracking-[0.1em] uppercase hover:bg-ink hover:text-paper transition-colors no-underline"
              >
                <span>Take the diagnosis</span>
                <span>↓</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
