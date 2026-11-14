import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────────────────────────────
   Crop mark: fine hairline registration detail
─────────────────────────────────────────────── */
const CropMark = ({ style }) => (
  <div
    aria-hidden="true"
    style={{
      position: "absolute",
      width: 18,
      height: 18,
      zIndex: 20,
      pointerEvents: "none",
      ...style,
    }}
  >
    {/* horizontal arm */}
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: "#DEDCD7",
        transform: "translateY(-50%)",
      }}
    />
    {/* vertical arm */}
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 0,
        bottom: 0,
        width: 1,
        backgroundColor: "#DEDCD7",
        transform: "translateX(-50%)",
      }}
    />
  </div>
);

/* ───────────────────────────────────────────────
   Shared headline font-size (clamp)
─────────────────────────────────────────────── */
const HL = "clamp(64px, 9.8vw, 142px)";

/* ───────────────────────────────────────────────
   Hero
─────────────────────────────────────────────── */
const Hero = () => {
  /* animation targets */
  const heroRef = useRef(null);
  const kickerRef = useRef(null);
  const line0 = useRef(null); // BE HARD
  const line1 = useRef(null); // TO IGNORE
  const dotRef = useRef(null); // ● (Signal Red, parallax)
  const line2 = useRef(null); // EASY TO
  const line3 = useRef(null); // CHOOSE.
  const sublineRef = useRef(null); // Subline paragraph + buttons
  const bottomDeckRef = useRef(null); // Bottom tags + scroll cue
  const monogramRef = useRef(null); // Gigantic "D." watermark

  /* ── Entrance & Scroll Animations ── */
  useEffect(() => {
    const revealEls = [
      line0.current,
      line1.current,
      line2.current,
      line3.current,
    ];

    gsap.set(revealEls, { y: 88, opacity: 0 });
    gsap.set([kickerRef.current, sublineRef.current, bottomDeckRef.current], {
      y: 28,
      opacity: 0,
    });

    const tl = gsap.timeline({ delay: 0.1 });

    tl.to(
      revealEls,
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.08,
        ease: "power4.out",
      },
      0.05,
    ).to(
      [kickerRef.current, sublineRef.current, bottomDeckRef.current],
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.1,
        ease: "power3.out",
      },
      "-=0.6",
    );
  }, []);

  /* ── Interactive Cursor Parallax (rAF-throttled, 2 layers) ── */
  useEffect(() => {
    let rafId = null;
    let pendingCx = 0;
    let pendingCy = 0;

    const applyParallax = () => {
      rafId = null;
      /* Monumental D. watermark */
      gsap.to(monogramRef.current, {
        x: pendingCx * 30,
        y: pendingCy * 22,
        duration: 1.8,
        ease: "power2.out",
        overwrite: "auto",
      });
      /* Signal Red dot */
      gsap.to(dotRef.current, {
        x: pendingCx * 22,
        y: pendingCy * 14,
        duration: 1.0,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const onMove = (e) => {
      pendingCx = e.clientX / window.innerWidth - 0.5;
      pendingCy = e.clientY / window.innerHeight - 0.5;
      if (!rafId) rafId = requestAnimationFrame(applyParallax);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative bg-paper"
      style={{
        minHeight: "100svh",
        fontFamily: "var(--font-body)",
        paddingTop: 80 /* clear fixed navbar */,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Crop marks ── */}
      <CropMark style={{ top: 88, left: 24 }} />
      <CropMark style={{ top: 88, right: 24 }} />
      <CropMark style={{ bottom: 18, left: 24 }} />
      <CropMark style={{ bottom: 18, right: 24 }} />

      {/* ══════════════════════════════════════════════════════
          COLOSSAL "D." MONOGRAM WATERMARK (from reference)
      ══════════════════════════════════════════════════════ */}
      <div
        ref={monogramRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "2%",
          top: "22%",
          transform: "translateY(-50%)",
          zIndex: 1,
          pointerEvents: "none",
          userSelect: "none",
          display: "flex",
          alignItems: "baseline",
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(260px, 44vw, 680px)",
          lineHeight: 0.8,
          color: "rgba(17, 17, 17, 0.048)",
          letterSpacing: "-0.04em",
        }}
      >
        <span class="text-[#ed3f380e]">D</span>
        <span
          style={{
            display: "inline-block",
            fontSize: "0.24em",
            marginLeft: "0.03em",
            lineHeight: 1,
            color: "#ed3f380e",
          }}
        >
          ●
        </span>
      </div>

      {/* ══════════════════════════════════════════════════════
          MAIN CONTENT ZONE
      ══════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full px-6 md:px-11 lg:px-14 pt-4 pb-8 flex-1 flex flex-col justify-between">
        {/* Top Kicker */}
        <div
          ref={kickerRef}
          className="flex items-center gap-2.5 mb-8 md:mb-10 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none"
        >
          <span className="w-2.25 h-2.25 rounded-full bg-signal-red inline-block flex-none" />
          <span>Independent creative studio / Strategy before design</span>
        </div>

        {/* ── Headline Block ── */}
        <div className="relative">
          {/* Line 0: BE HARD */}
          <div className="clip-reveal">
            <h1
              ref={line0}
              className="display text-ink"
              style={{ fontSize: HL, lineHeight: 0.9, margin: 0 }}
            >
              BE HARD
            </h1>
          </div>

          {/* Line 1: TO IGNORE + Optical Frosted Glass Lens Overlay */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              position: "relative",
            }}
          >
            <div className="clip-reveal" style={{ flex: "0 0 auto" }}>
              <h1
                ref={line1}
                className="display text-ink"
                style={{ fontSize: HL, lineHeight: 0.9, margin: 0 }}
              >
                TO IGNORE
              </h1>
            </div>

            {/* Signal Red dot */}
            <span
              ref={dotRef}
              aria-hidden="true"
              style={{
                display: "inline-block",
                color: "#FF3B4F",
                fontSize: `calc(${HL} * 0.68)`,
                lineHeight: 1,
                marginLeft: "0.07em",
                marginBottom: "0.05em",
              }}
            >
              ●
            </span>
          </div>

          {/* Line 2 & 3: EASY TO CHOOSE : offset right */}
          <div
            style={{
              marginLeft: "clamp(60px, 28%, 420px)",
              marginTop: "clamp(4px, 0.8vw, 12px)",
            }}
          >
            <div className="clip-reveal">
              <h1
                ref={line2}
                className="display text-ink"
                style={{ fontSize: HL, lineHeight: 0.9, margin: 0 }}
              >
                EASY TO
              </h1>
            </div>
            <div className="clip-reveal">
              <h1
                ref={line3}
                className="display text-ink"
                style={{ fontSize: HL, lineHeight: 0.9, margin: 0 }}
              >
                CHOOSE.
              </h1>
            </div>
          </div>
        </div>

        {/* ── Subline: Narrative paragraph + Action buttons ── */}
        <div
          ref={sublineRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mt-12 md:mt-16"
        >
          <p className="text-ink/85 text-[clamp(15px,1.4vw,20px)] leading-[1.55] max-w-145 m-0 font-normal">
            We find what's standing between your business and the people it
            needs to reach. Then we solve it through strategy, brand identity,
            creative media and digital experiences.
          </p>

          <div className="flex items-center gap-3 flex-wrap shrink-0">
            <a
              href="/contact"
              className="inline-flex items-center justify-between gap-6 px-6 md:px-7 py-4 bg-ink text-paper border border-ink text-[11px] font-extrabold uppercase tracking-[0.08em] hover:bg-signal-red hover:border-signal-red hover:text-ink transition-all duration-200 no-underline shadow-sm"
            >
              <span>FIND YOUR NEXT MOVE</span>
              <span className="text-xs">↗</span>
            </a>

            <a
              href="#work"
              className="inline-flex items-center justify-between gap-6 px-6 md:px-7 py-4 bg-transparent text-ink border border-ink text-[11px] font-extrabold uppercase tracking-[0.08em] hover:bg-ink hover:text-paper transition-all duration-200 no-underline"
            >
              <span>EXPLORE THE WORK</span>
              <span className="text-xs">↗</span>
            </a>
          </div>
        </div>

        {/* ── Bottom Deck: Discipline labels & Scroll cue ── */}
        <div
          ref={bottomDeckRef}
          className="flex items-center justify-between pt-12 md:pt-16 pb-2 text-[10px] md:text-[11px] font-bold tracking-[0.14em] text-ink/70"
        >
          <span className="label">
            STRATEGY &nbsp; / &nbsp; IDENTITY & MEDIA &nbsp; / &nbsp; WEB
          </span>

          <a
            href="#services"
            className="label hover:text-ink transition-colors flex items-center gap-1.5 no-underline"
          >
            <span>SCROLL TO DISCOVER</span>
            <span>↓</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
