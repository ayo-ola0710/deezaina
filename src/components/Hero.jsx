import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────────────────────────────
   Crop mark: fine hairline registration detail
   Only rendered on tablet and desktop (hidden on mobile)
─────────────────────────────────────────────── */
const CropMark = ({ style }) => (
  <div
    aria-hidden="true"
    className="hidden md:block pointer-events-none z-20"
    style={{
      position: "absolute",
      width: 18,
      height: 18,
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
   Hero
─────────────────────────────────────────────── */
const Hero = () => {
  /* animation targets */
  const heroRef = useRef(null);
  const kickerRef = useRef(null);
  const line0 = useRef(null);
  const line1 = useRef(null);
  const dotRef = useRef(null);
  const line2 = useRef(null);
  const line3 = useRef(null);
  const dot2Ref = useRef(null);
  const sublineRef = useRef(null);
  const bottomDeckRef = useRef(null);
  const monogramRef = useRef(null);

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
    if (dotRef.current)
      gsap.set([dotRef.current, dot2Ref.current], { scale: 0, opacity: 0 });

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
    )
      .to(
        [dotRef.current, dot2Ref.current],
        {
          scale: 1,
          opacity: 1,
          duration: 0.45,
          stagger: 0.08,
          ease: "back.out(2)",
        },
        "-=0.5",
      )
      .to(
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

  /* ── Interactive Cursor Parallax (rAF-throttled) ── */
  useEffect(() => {
    let rafId = null;
    let pendingCx = 0;
    let pendingCy = 0;

    const applyParallax = () => {
      rafId = null;
      if (monogramRef.current) {
        gsap.to(monogramRef.current, {
          x: pendingCx * 30,
          y: pendingCy * 22,
          duration: 1.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      if (dotRef.current) {
        gsap.to([dotRef.current, dot2Ref.current], {
          x: pendingCx * 22,
          y: pendingCy * 14,
          duration: 1.0,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
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
      className="relative bg-paper pt-18 md:pt-20 min-h-svh font-body flex flex-col justify-between overflow-hidden"
    >
      {/* ── Crop marks: Exact original desktop & tablet registration marks ── */}
      <CropMark style={{ top: 88, left: 24 }} />
      <CropMark style={{ top: 88, right: 24 }} />
      <CropMark style={{ bottom: 18, left: 24 }} />
      <CropMark style={{ bottom: 18, right: 24 }} />

      {/* ══════════════════════════════════════════════════════
          COLOSSAL "D." MONOGRAM WATERMARK
          Desktop: original right 2%, top 22%, 44vw
          Mobile: right -4%, top 28%, 58vw
      ══════════════════════════════════════════════════════ */}
      <div
        ref={monogramRef}
        aria-hidden="true"
        className="absolute right-[-4%] md:right-[2%] top-[30%] md:top-[42%] -translate-y-1/2 z-0 md:z-1 pointer-events-none select-none flex items-baseline font-display font-extrabold text-[clamp(300px,58vw,680px)] md:text-[clamp(800px,44vw,680px)] leading-[0.8] tracking-[-0.04em] text-[#ed3f380e] md:text-[#ed3f380e]"
      >
        <span>D</span>
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
      <div className="relative z-10 w-full px-5 sm:px-8 md:px-11 lg:px-14 pt-2 md:pt-4 pb-5 md:pb-8 flex-1 flex flex-col justify-between">
        {/* Top Kicker
            Mobile: 2-line wrapped text with prominent red dot matching mock
            Desktop: exact original single line with 2.25px dot
        */}
        <div
          ref={kickerRef}
          className="flex items-start md:items-center gap-2.5 mb-6 md:mb-10 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none"
        >
          <span className="w-2.5 h-2.5 md:w-2.25 md:h-2.25 rounded-full bg-signal-red inline-block flex-none mt-1 md:mt-0" />
          <span className="leading-tight md:leading-normal max-w-67.5 md:max-w-none">
            INDEPENDENT CREATIVE STUDIO / STRATEGY BEFORE DESIGN
          </span>
        </div>

        {/* ── Headline Block ── */}
        <div className="relative">
          {/* Line 0: BE HARD TO (mobile) / BE HARD (desktop/tablet) */}
          <div className="clip-reveal">
            <h1
              ref={line0}
              className="display text-ink text-[clamp(60px,12.8vw,64px)] md:text-[clamp(64px,9.8vw,142px)] leading-[0.88] md:leading-[0.9] m-0"
            >
              BE HARD <span className="md:hidden">TO</span>
            </h1>
          </div>

          {/* Line 1: IGNORE (mobile) / TO IGNORE (desktop/tablet) + Signal Red period dot */}
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
                className="display text-ink text-[clamp(60px,12.8vw,64px)] md:text-[clamp(64px,9.8vw,142px)] leading-[0.88] md:leading-[0.9] m-0"
              >
                <span className="hidden md:inline">TO </span>IGNORE
              </h1>
            </div>

            {/* Signal Red period dot after IGNORE */}
            <span
              ref={dotRef}
              aria-hidden="true"
              className="inline-block text-signal-red select-none text-[calc(clamp(112px,12.8vw,64px)*0.34)] md:text-[calc(clamp(64px,9.8vw,142px)*0.68)] leading-none ml-[0.07em] mb-[0.06em] md:mb-[0.05em] align-baseline"
            >
              ●
            </span>
          </div>

          {/* Lines 2 & 3:
              Mobile: flush-left (ml-0), tight leading
              Desktop/Tablet: exact original marginLeft clamp(60px, 28%, 420px), marginTop clamp(4px, 0.8vw, 12px)
          */}
          <div className="ml-20 md:ml-[clamp(60px,28%,420px)] mt-1 md:mt-[clamp(4px,0.8vw,12px)] ">
            {/* Line 2: EASY TO */}
            <div className="clip-reveal">
              <h1
                ref={line2}
                className="display text-ink text-[clamp(60px,12.8vw,64px)] md:text-[clamp(64px,9.8vw,142px)] leading-[0.88] md:leading-[0.9] m-0"
              >
                EASY TO
              </h1>
            </div>

            {/* Line 3: CHOOSE
                Mobile: CHOOSE + Signal Red period dot matching mock
                Desktop: CHOOSE. (with exact original punctuation)
            */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                position: "relative",
              }}
            >
              <div className="clip-reveal" style={{ flex: "0 0 auto" }}>
                <h1
                  ref={line3}
                  className="display text-ink text-[clamp(60px,12.8vw,64px)] md:text-[clamp(64px,9.8vw,142px)] leading-[0.88] md:leading-[0.9] m-0"
                >
                  CHOOSE<span className="hidden md:inline">.</span>
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* ── Subline: Narrative paragraph + Action buttons ──
            Mobile: stacked full-width buttons
            Desktop: exact original side-by-side buttons
        */}
        <div
          ref={sublineRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-8 mt-6 md:mt-16"
        >
          <p className="text-ink/85 text-[13.5px] md:text-[clamp(15px,1.4vw,20px)] leading-[1.55] max-w-xl md:max-w-145 m-0 font-normal">
            We find what's standing between your business and the people it
            needs to reach. Then we solve it through strategy, brand identity,
            creative media and digital experiences.
          </p>

          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5 md:gap-3 w-full md:w-auto shrink-0 mt-4 md:mt-0">
            <a
              href="/contact"
              className="inline-flex items-center justify-between gap-6 px-6 md:px-7 py-3.5 md:py-4 bg-ink text-paper border border-ink text-[11px] font-extrabold uppercase tracking-[0.08em] hover:bg-signal-red hover:border-signal-red hover:text-ink transition-all duration-200 no-underline shadow-sm w-full md:w-auto text-left"
            >
              <span>FIND YOUR NEXT MOVE</span>
              <span className="text-xs">↗</span>
            </a>

            <a
              href="#work"
              className="inline-flex items-center justify-between gap-6 px-6 md:px-7 py-3.5 md:py-4 bg-transparent text-ink border border-ink text-[11px] font-extrabold uppercase tracking-[0.08em] hover:bg-ink hover:text-paper transition-all duration-200 no-underline w-full md:w-auto text-left"
            >
              <span>EXPLORE THE WORK</span>
              <span className="text-xs">↗</span>
            </a>
          </div>
        </div>

        {/* ── Bottom Deck: Discipline labels & Scroll cue ──
            Mobile: single clean row across bottom matching mock
            Desktop: exact original label text and spacing
        */}
        <div
          ref={bottomDeckRef}
          className="flex items-center justify-between w-full pt-2 md:pt-16 pb-2 md:text-[11px] font-extrabold md:font-bold tracking-widest md:tracking-[0.14em] text-ink md:text-ink/70 select-none"
        >
          <span className="label hidden  md:flex items-center gap-1.5 md:gap-2 shrink-0 ">
            <span>STRATEGY</span>
            <span className="text-ink/40 md:inline">&nbsp;/&nbsp;</span>
            <span>IDENTITY & MEDIA</span>
            <span className="text-ink/40 md:inline">&nbsp;/&nbsp;</span>
            <span>WEB</span>
          </span>

          <a
            href="#services"
            className="label hover:text-ink transition-colors flex items-center gap-1.5 no-underline shrink-0 text-ink"
          >
            <span>SCROLL TO DISCOVER</span>
            <span className="text-signal-red md:text-inherit">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
