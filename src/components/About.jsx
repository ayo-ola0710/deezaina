import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 30, suffix: "+", label: "Brands Built" },
  { value: 4, suffix: "+", label: "Years in Practice" },
  { value: 5, suffix: "+", label: "Countries Reached" },
  { value: 100, suffix: "%", label: "Independently Owned" },
];

const QUOTE_LINES = ["Built for the", "world."];

const About = () => {
  const sectionRef = useRef(null);
  const quoteLines = useRef([]);
  const bioRef = useRef(null);
  const statsContainerRef = useRef(null);
  const counterRefs = useRef([]);

  const addLine = (i) => (el) => {
    quoteLines.current[i] = el;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });

      gsap.set(quoteLines.current, { y: 60, opacity: 0 });
      gsap.set(bioRef.current, { y: 36, opacity: 0 });

      tl.to(quoteLines.current, {
        y: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.08,
        ease: "power4.out",
      }).to(
        bioRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
        },
        "-=0.7",
      );

      // Fast rolling counters for stats
      STATS.forEach((stat, i) => {
        const el = counterRefs.current[i];
        if (!el) return;
        const counter = { val: 0 };

        gsap.to(counter, {
          val: stat.value,
          duration: 1.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsContainerRef.current,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            el.innerText = `${Math.round(counter.val)}${stat.suffix}`;
          },
        });
      });

      // Subtle stagger entrance for stat boxes
      gsap.fromTo(
        ".stat-box",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsContainerRef.current,
            start: "top 85%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-paper py-[clamp(72px,10vw,140px)] px-6 md:px-11 font-body"
    >
      {/* ── annotation ── */}
      <div className="flex justify-between items-center gap-5 pt-3 pb-2 border-t border-ink mb-8 md:mb-11">
        <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none">
          § THE STUDIO / SMALL BY DESIGN
        </span>
        <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none">
          06 / 07
        </span>
      </div>

      {/* ── 2-col layout ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(48px,6vw,96px)] items-start">
        {/* left: pull-quote */}
        <div>
          {QUOTE_LINES.map((line, i) => (
            <div key={i} className="clip-reveal">
              <h2
                ref={addLine(i)}
                className="display text-ink text-[clamp(38px,5.5vw,80px)] leading-[0.93] m-0"
              >
                {line}
              </h2>
            </div>
          ))}

          {/* attribution hairline */}
          <div className="flex items-center gap-4 mt-10">
            <div className="w-6 h-px bg-line" />
            <span className="label text-slate text-[11px]">
              DEEZAINA STUDIOS · EST. MMXXIV
            </span>
          </div>
        </div>

        {/* right: bio */}
        <div ref={bioRef} className="pt-1.5">
          <p className="text-ink text-base md:text-lg leading-relaxed font-normal m-0 mb-5">
            Deezaina is an independent, strategy-led creative practice. We
            connect research, identity, media and digital thinking so the work
            feels joined up, not handed between disconnected vendors.
          </p>
          <p className="text-slate text-base md:text-lg leading-relaxed font-normal m-0 mb-6">
            Our value isn't how many deliverables we can add to a list. It's how
            well each decision answers the original problem.
          </p>
          <Link
            className="inline-flex items-center gap-2 text-signal-red hover:text-ink font-semibold tracking-wide transition-colors uppercase text-sm no-underline"
            to="/contact"
          >
            <span>Start a dialogue</span>
            <span>↗</span>
          </Link>
        </div>
      </div>

      {/* ── Full-Width Stats Deck (Spans full page width) ── */}
      <div
        ref={statsContainerRef}
        className="w-full mt-16 md:mt-24 pt-10 text-center border-t border-line grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
      >
        {STATS.map(({ suffix, label }, i) => (
          <div key={label} className="stat-box">
            <div className="display text-ink text-[clamp(36px,4.5vw,64px)] leading-none tracking-tight">
              <span ref={(el) => (counterRefs.current[i] = el)}>0{suffix}</span>
            </div>
            <div className="label text-slate text-[11px] mt-2 uppercase tracking-[0.08em]">
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
