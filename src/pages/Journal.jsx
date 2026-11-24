import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { JOURNAL_POSTS } from "../data/journal";
import { RiArrowRightUpLine, RiBookOpenLine } from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const Journal = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Header entrance animation
      gsap.from(".journal-header-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Post cards stagger
      gsap.from(".journal-card-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".journal-grid",
          start: "top 85%",
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-paper text-ink font-body min-h-screen selection:bg-signal-red selection:text-white"
    >
      <Navbar />

      <main className="pt-32 md:pt-40 pb-20 md:pb-28 px-6 md:px-14 max-w-7xl mx-auto">
        {/* Eyeline annotation */}
        <div className="journal-header-reveal flex justify-between items-center gap-5 pt-3 pb-2 border-t border-ink mb-8">
          <span className="label text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none flex items-center gap-2">
            <RiBookOpenLine className="text-signal-red" />
            <span>§ EDITORIAL / DEEZAINA JOURNAL</span>
          </span>
          <span className="label text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate select-none">
            3 ESSAYS · NIGERIA &amp; WORLDWIDE
          </span>
        </div>

        {/* Hero Title */}
        <div className="journal-header-reveal max-w-4xl mb-14 md:mb-20">
          <h1 className="font-display font-extrabold text-ink text-[clamp(40px,7vw,84px)] leading-[0.95] tracking-tight uppercase m-0 mb-6">
            Diagnose Before Design.
          </h1>
          <p className="text-slate text-lg md:text-2xl leading-relaxed font-normal max-w-3xl">
            Practical perspectives on brand strategy, visual identity systems, and high-conversion web design for founders and business leaders building in Nigeria and beyond.
          </p>
        </div>

        {/* Articles List / Grid */}
        <div className="journal-grid border-t border-ink divide-y divide-line">
          {JOURNAL_POSTS.map((post, index) => (
            <article
              key={post.slug}
              className="journal-card-reveal py-10 md:py-14 group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
            >
              {/* Left Column: Number + Category + Reading Time */}
              <div className="lg:col-span-3 flex flex-row lg:flex-col justify-between lg:justify-start gap-4">
                <span className="font-display font-black text-ink/20 group-hover:text-signal-red text-4xl lg:text-5xl leading-none transition-colors">
                  0{index + 1}
                </span>
                <div className="space-y-1.5 text-right lg:text-left">
                  <span className="label text-[11px] font-extrabold uppercase tracking-[0.14em] text-signal-red block">
                    {post.category}
                  </span>
                  <span className="label text-[10px] text-slate uppercase tracking-wider block">
                    {post.readTime} · {post.date}
                  </span>
                </div>
              </div>

              {/* Middle Column: Thumbnail preview */}
              <div className="lg:col-span-4 overflow-hidden rounded-sm border border-line bg-ink/5 aspect-[16/10]">
                <Link to={`/journal/${post.slug}`} className="block w-full h-full">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                </Link>
              </div>

              {/* Right Column: Title, In a sentence, Read Action */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
                <div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-ink leading-tight tracking-tight group-hover:text-signal-red transition-colors mb-3">
                    <Link to={`/journal/${post.slug}`} className="no-underline text-inherit">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-slate text-sm md:text-base leading-relaxed line-clamp-3">
                    {post.inASentence}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    to={`/journal/${post.slug}`}
                    className="inline-flex items-center gap-2 label text-xs font-bold uppercase tracking-wider text-ink group-hover:text-signal-red no-underline transition-colors border-b border-ink/30 pb-0.5 group-hover:border-signal-red"
                  >
                    <span>Read Full Article</span>
                    <RiArrowRightUpLine className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Strategic Callout */}
        <div className="mt-16 md:mt-24 p-8 md:p-12 border border-ink/20 bg-ink/[0.02] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="label text-[10px] font-extrabold uppercase tracking-[0.14em] text-signal-red block mb-2">
              § START WITH A QUESTION
            </span>
            <h3 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-2">
              Ready to clarify your brand position before designing?
            </h3>
            <p className="text-slate text-sm leading-relaxed m-0">
              Take our 3-question diagnostic or share your project brief to receive strategic guidance tailored to your commercial stage.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <Link
              to="/#diagnosis"
              className="px-6 py-3.5 bg-paper text-ink border border-ink text-xs font-bold tracking-[0.08em] uppercase no-underline hover:bg-ink hover:text-white transition-colors text-center flex-1 md:flex-none"
            >
              Start 3-Question Diagnosis
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3.5 bg-signal-red text-white text-xs font-bold tracking-[0.08em] uppercase no-underline hover:bg-ink transition-colors text-center flex-1 md:flex-none"
            >
              Send a Project Brief ↗
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Journal;
