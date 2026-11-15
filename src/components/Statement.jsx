import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Statement = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 82%",
            once: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-paper py-[clamp(56px,9vh,140px)] px-5 sm:px-8 md:px-14 relative font-body overflow-hidden flex flex-col justify-between select-none"
    >
      {/* ── Top annotation rule ── */}
      <div className="flex justify-between items-center gap-5 pt-3 pb-2 border-t border-ink shrink-0 mb-8 sm:mb-12 md:mb-16">
        <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none">
          <span>§ STUDIO POSITIONING</span>
          <span className="text-ink/40">/</span>
          <span>WHO WE ARE</span>
        </span>
        <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none">
          01 / 07
        </span>
      </div>

      {/* ── Center Stage: Unified Statement Paragraph with Scroll Fade Up ── */}
      <div className="relative w-full max-w-285 mx-auto my-auto">
        <p
          ref={textRef}
          className="font-display font-bold text-[clamp(21px,3.6vw,52px)] leading-[1.28] tracking-tight text-ink m-0 select-none"
        >
          <span className="text-signal-red font-extrabold">
            DEEZAINA STUDIOS
          </span>{" "}
          <span className="text-ink">
            is an independent brand strategy, visual identity and digital
            studio. We work at the intersection of strategy and craft, building
            sharp, enduring brands for ambitious teams worldwide. We don't start
            with aesthetics; we start with questions: Who are you? Who are you
            for? Why should anyone choose you? The design follows. The brand
            lasts.
          </span>
          <span
            aria-hidden="true"
            className="inline-block text-signal-red ml-2 text-[0.8em] leading-none"
          >
            ●
          </span>
        </p>
      </div>
    </section>
  );
};

export default Statement;
