import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    name: "Discover",
    tagline: "What is actually happening?",
    desc: "Understand the people, category, business context and obstacles.",
  },
  {
    num: "02",
    name: "Define",
    tagline: "What needs to change?",
    desc: "Agree on positioning, priorities and what a useful result would mean.",
  },
  {
    num: "03",
    name: "Design",
    tagline: "What is the right response?",
    desc: "Make a joined-up brand, content or digital experience around the brief.",
  },
  {
    num: "04",
    name: "Deliver",
    tagline: "Will it work in the real world?",
    desc: "Test, refine, launch, hand over or continue as an ongoing partner.",
  },
];

/* ───────────────────────────────────────────────
   High-Performance 3D Canvas Renderer for Sculpted "D"
   Optimized: 16 slices, capped DPR, IntersectionObserver (pauses off-screen)
─────────────────────────────────────────────── */
const Canvas3DLetter = ({ rotationRef, targetMouse }) => {
  const canvasRef = useRef(null);
  const [inView, setInView] = useState(false);

  // Pause rendering when scrolled out of view to save 100% GPU/CPU
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin: "150px" }
    );

    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      // Cap DPR to 2 to prevent GPU fillrate choking on 3x/4x screens
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    // Draw the 2D cross-section path of letter "D" centered at (0, 0)
    const traceLetterD = (c, w, h, thickness) => {
      c.beginPath();
      const r = h / 2;
      const left = -w / 2;
      const top = -h / 2;

      // Outer D path
      c.moveTo(left, top);
      c.lineTo(left + w - r, top);
      c.arc(left + w - r, 0, r, -Math.PI / 2, Math.PI / 2, false);
      c.lineTo(left, top + h);
      c.closePath();

      // Inner counter cutout
      const innerW = w - thickness * 2;
      const innerH = h - thickness * 2;
      const innerR = innerH / 2;
      const innerLeft = left + thickness;

      c.moveTo(innerLeft, -innerH / 2);
      c.lineTo(innerLeft, innerH / 2);
      c.lineTo(innerLeft + innerW - innerR, innerH / 2);
      c.arc(
        innerLeft + innerW - innerR,
        0,
        innerR,
        Math.PI / 2,
        -Math.PI / 2,
        true
      );
      c.closePath();
    };

    let time = 0;
    const currentMouse = { x: 0, y: 0 };

    const render = () => {
      time += 0.015;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = canvas.width;
      const ch = canvas.height;

      ctx.clearRect(0, 0, cw, ch);
      ctx.save();
      ctx.scale(dpr, dpr);

      const renderW = cw / dpr;
      const renderH = ch / dpr;
      const centerX = renderW / 2;
      const centerY = renderH / 2;

      // Smooth lerp mouse coordinates (no GSAP overhead)
      const targetM = targetMouse.current || { x: 0, y: 0 };
      currentMouse.x += (targetM.x - currentMouse.x) * 0.08;
      currentMouse.y += (targetM.y - currentMouse.y) * 0.08;

      // Base rotations influenced by scroll + mouse tilt
      const scrollRot = rotationRef.current || { y: -0.4, x: 0.12, floatY: 0 };

      const rotY = scrollRot.y + currentMouse.x * 0.35 + Math.sin(time) * 0.03;
      const rotX = scrollRot.x + currentMouse.y * 0.25 + Math.cos(time * 0.8) * 0.02;
      const floatOffsetY = scrollRot.floatY + Math.sin(time * 1.5) * 6;

      // Drop shadow on the floor
      const shadowScale = 1 - Math.sin(time * 1.5) * 0.05;
      const dWidth = Math.min(renderW * 0.54, 245);
      const dHeight = dWidth * 1.25;
      const thickness = dWidth * 0.28;
      const depth = 52;

      const shadowY = centerY + dHeight * 0.62;
      const shadowRadius = dWidth * 0.85 * shadowScale;
      const shadowGrad = ctx.createRadialGradient(
        centerX,
        shadowY,
        10,
        centerX,
        shadowY,
        shadowRadius
      );
      shadowGrad.addColorStop(0, "rgba(17, 17, 17, 0.12)");
      shadowGrad.addColorStop(1, "rgba(17, 17, 17, 0)");
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.ellipse(
        centerX,
        shadowY,
        shadowRadius,
        28 * shadowScale,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Extrusion parameters (16 slices is buttery smooth & visually solid)
      const numSlices = 16;
      const cosY = Math.cos(rotY);
      const cosX = Math.cos(rotX);
      const sinY = Math.sin(rotY);
      const sinX = Math.sin(rotX);

      // Pre-calculate slices with depth sorting
      const slices = [];
      for (let i = 0; i < numSlices; i++) {
        const z = -depth / 2 + (i / (numSlices - 1)) * depth;
        const depthSortKey = z * cosY * cosX;
        slices.push({ index: i, z, depthSortKey });
      }

      slices.sort((a, b) => a.depthSortKey - b.depthSortKey);

      // Render each depth slice
      slices.forEach((slice) => {
        const { index, z } = slice;
        const progress = index / (numSlices - 1);
        const isFrontFace = index === numSlices - 1;
        const isBackFace = index === 0;

        ctx.save();
        ctx.translate(centerX, centerY + floatOffsetY);

        const offsetX = z * sinY * 0.9;
        const offsetY = -z * sinX * cosY * 0.9;
        const scale = 1 + z * cosY * 0.0018;

        ctx.translate(offsetX, offsetY);
        ctx.scale(scale * cosY, scale * cosX);

        const normZ = cosY * cosX;
        const brightness = Math.max(
          0.18,
          Math.min(0.95, normZ * 0.5 + 0.35)
        );

        if (isFrontFace) {
          ctx.fillStyle = "#111111";
          ctx.strokeStyle = "rgba(222, 220, 215, 0.45)";
          ctx.lineWidth = 1.2;
        } else if (isBackFace) {
          ctx.fillStyle = "#1c1c1c";
          ctx.strokeStyle = "rgba(17, 17, 17, 0.6)";
          ctx.lineWidth = 1;
        } else {
          const shade = Math.floor(18 + progress * 24 * brightness);
          ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
          ctx.strokeStyle = `rgba(${shade + 8}, ${shade + 8}, ${shade + 8}, 0.5)`;
          ctx.lineWidth = 0.9;
        }

        traceLetterD(ctx, dWidth, dHeight, thickness);
        ctx.fill();
        ctx.stroke();

        ctx.restore();
      });

      // ── Floating 3D Signal Red Dot orbiting the "D" ──
      const dotOrbitAngle = rotY + 0.6;
      const dotDist = dWidth * 0.72;
      const dotX = centerX + Math.cos(dotOrbitAngle) * dotDist;
      const dotY =
        centerY + floatOffsetY + Math.sin(rotX) * 20 + dHeight * 0.32;
      const dotScale = 1 + Math.sin(dotOrbitAngle) * 0.25;

      ctx.save();
      ctx.translate(dotX, dotY);

      // Red dot shadow
      ctx.fillStyle = "rgba(183, 19, 42, 0.25)";
      ctx.beginPath();
      ctx.arc(0, 4, 13 * dotScale, 0, Math.PI * 2);
      ctx.fill();

      // Red dot body
      const redGrad = ctx.createRadialGradient(-3, -3, 2, 0, 0, 14 * dotScale);
      redGrad.addColorStop(0, "#FF6B7A");
      redGrad.addColorStop(0.6, "#FF3B4F");
      redGrad.addColorStop(1, "#B7132A");
      ctx.fillStyle = redGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 12 * dotScale, 0, Math.PI * 2);
      ctx.fill();

      // Highlight sheen
      ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
      ctx.beginPath();
      ctx.arc(-3, -3, 3.5 * dotScale, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [inView, rotationRef, targetMouse]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block pointer-events-none select-none"
    />
  );
};

/* ───────────────────────────────────────────────
   Process Section Component with Pinned Scroll
   Smooth 4-stage progression: 01 Discover → 02 Define → 03 Design → 04 Deliver
─────────────────────────────────────────────── */
const Process = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);
  const activeStageRef = useRef(0);

  // 3D rotation shared reference (scrubbed smoothly via ScrollTrigger)
  const rotationRef = useRef({ y: -0.4, x: 0.12, floatY: 0 });
  const targetMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    // Lightweight mouse tilt (passive, zero GSAP overhead)
    const handleMouseMove = (e) => {
      const rect = track.getBoundingClientRect();
      targetMouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetMouse.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    track.addEventListener("mousemove", handleMouseMove, { passive: true });

    const ctx = gsap.context(() => {
      // Pin track while scrolling through the 4 process stages
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=200%",
        pin: track,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;

          // Continuous 3D rotation of the letter D as user scrolls
          rotationRef.current.y = -0.4 + p * Math.PI * 2.2;
          rotationRef.current.x = 0.12 + Math.sin(p * Math.PI * 3) * 0.18;
          rotationRef.current.floatY = Math.sin(p * Math.PI * 4) * 20;

          // Determine current active stage evenly (0, 1, 2, or 3)
          let current = 0;
          if (p >= 0.75) current = 3;
          else if (p >= 0.5) current = 2;
          else if (p >= 0.25) current = 1;

          // Only trigger React state change when the stage actually changes
          if (current !== activeStageRef.current) {
            activeStageRef.current = current;
            setActiveStage(current);
          }
        },
      });
    }, container);

    return () => {
      ctx.revert();
      track.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-paper font-body relative"
    >
      {/* ── Outer Pinned Track ── */}
      <div
        ref={trackRef}
        className="h-screen w-full flex flex-col justify-between px-6 md:px-12 py-4 md:py-6 relative overflow-hidden"
      >
        {/* ── Top Header Bar ── */}
        <div className="flex justify-between items-center gap-5 pt-3 pb-2 border-t border-ink">
          <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none">
            § HOW WE WORK / THE DEEZAINA METHOD
          </span>
          <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none">
            05 / 07
          </span>
        </div>

        {/* ── Headline ── */}
        <h2 className="font-[1000] text-[clamp(26px,3.4vw,48px)] leading-[1.05] tracking-tight mt-3 md:mt-5 mb-5 md:mb-8 title">
          We start with the question. <br />
          <span className="text-signal-red">Not the palette.</span>
        </h2>

        {/* ── Middle Arena: 3D "D" in Center with 4 Clean Unboxed Content Blocks ── */}
        <div className="relative flex-1 w-full my-auto flex items-center justify-center">
          {/* ════════════════════════════════════════
              CENTERPIECE: 3D "D" CANVAS (Larger, Sculpted Letter)
          ════════════════════════════════════════ */}
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <div className="w-70 h-70 sm:w-85 sm:h-85 md:w-105 md:h-105 lg:w-120 lg:h-120">
              <Canvas3DLetter rotationRef={rotationRef} targetMouse={targetMouse} />
            </div>
          </div>

          {/* ════════════════════════════════════════
              SURROUNDING STAGE CONTENT (Desktop 4-Quadrant)
          ════════════════════════════════════════ */}
          <div className="hidden lg:grid grid-cols-2 grid-rows-2 w-full h-full max-w-6xl mx-auto z-20 py-2 pointer-events-auto">
            {STEPS.map((step, idx) => {
              const isActive = activeStage === idx;

              // Quadrant alignments around the 3D center
              const alignment =
                idx === 0
                  ? "justify-self-start self-start text-left"
                  : idx === 1
                    ? "justify-self-end self-start text-right"
                    : idx === 2
                      ? "justify-self-start self-end text-left"
                      : "justify-self-end self-end text-right";

              return (
                <div
                  key={step.num}
                  onClick={() => {
                    activeStageRef.current = idx;
                    setActiveStage(idx);
                  }}
                  className={`w-72 xl:w-84 transition-all duration-500 cursor-pointer ${alignment} ${
                    isActive
                      ? "opacity-100 scale-100"
                      : "opacity-30 scale-95 hover:opacity-60"
                  }`}
                >
                  {/* Stage Number & Tagline */}
                  <div
                    className={`flex items-center gap-2.5 mb-2.5 md:mb-3 ${
                      idx === 1 || idx === 3 ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span
                      className={`font-display font-extrabold text-xl leading-none transition-colors ${
                        isActive ? "text-signal-red" : "text-slate"
                      }`}
                    >
                      {step.num}
                    </span>
                    <span className="w-2 h-px bg-line" />
                    <span className="label text-deep-red text-[10px] font-bold tracking-[0.14em]">
                      {step.tagline}
                    </span>
                  </div>

                  {/* Stage Title */}
                  <h3 className="display text-ink text-2xl xl:text-4xl leading-none mt-2.5 mb-3.5">
                    {step.name}
                  </h3>

                  {/* Content / Description */}
                  <p className="text-slate text-[13px] xl:text-[14px] leading-relaxed m-0 font-normal max-w-75 xl:max-w-85">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* ════════════════════════════════════════
              MOBILE / TABLET ACTIVE CONTENT (< 1024px)
          ════════════════════════════════════════ */}
          <div className="lg:hidden z-20 w-full max-w-md p-3 text-left">
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="font-display font-extrabold text-xl text-signal-red">
                {STEPS[activeStage].num}
              </span>
              <span className="w-2 h-px bg-line" />
              <span className="label text-deep-red text-[10px] font-bold tracking-wider">
                {STEPS[activeStage].tagline}
              </span>
            </div>
            {/* Stage Title */}
            <h3 className="display text-ink text-3xl mt-2.5 mb-3">
              {STEPS[activeStage].name}
            </h3>
            {/* Content / Description */}
            <p className="text-slate text-xs sm:text-sm leading-relaxed m-0">
              {STEPS[activeStage].desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
