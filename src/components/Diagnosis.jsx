import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const QUESTIONS = [
  {
    question: "Which problem sounds familiar?",
    options: [
      "People don't understand what makes us different.",
      "We've outgrown how our brand looks.",
      "People visit, but don't take the next step.",
      "We're inconsistent across channels.",
      "We're launching and need everything to work together.",
      "This is bigger than a single service.",
    ],
  },
  {
    question: "What stage are you at?",
    options: [
      "Just getting started.",
      "Established, but something is not working.",
      "Growing into something bigger.",
      "Planning a special event.",
    ],
  },
  {
    question: "What needs to improve first?",
    options: [
      "Clarity: being understood.",
      "Credibility: looking like we mean business.",
      "Enquiries: making it easier to act.",
      "Consistency: showing up with one voice.",
      "Experience: making something memorable.",
    ],
  },
];

const RECOMMENDATIONS = {
  strategy: {
    key: "Brand Strategy",
    name: "Brand Strategy",
    price: "From ₦400,000",
    why: "Your challenge points to an unclear position or message. A focused strategy sprint can help establish what the brand should say and to whom. A ₦75,000 Brand Clarity Session is a lighter first step.",
    link: "/#services",
    serviceName: "Brand Strategy",
  },
  identity: {
    key: "Brand Identity",
    name: "Brand Identity",
    price: "From ₦500,000",
    why: "Your brand may have grown beyond its current visual language. Start with a defined identity scope; a larger strategic rebuild is considered when the problem reaches across the business.",
    link: "/#picker",
    serviceName: "Visual Identity",
  },
  web: {
    key: "Web & Digital",
    name: "Web & Digital",
    price: "From ₦350,000",
    why: "You need a clearer customer journey and a better way for visitors to understand the offer and take action. Start by reviewing the page and the next step it asks people to take.",
    link: "/#picker",
    serviceName: "Web & Interaction Design",
  },
  desk: {
    key: "The Brand Desk",
    name: "The Brand Desk",
    price: "From ₦550,000/month",
    why: "Your need sounds recurring rather than one-off. An external creative/media partner can build rhythm and consistency; first establish a suitable identity foundation if it is missing.",
    link: "/#solutions",
    serviceName: "Complete Brand Platform",
  },
  launch: {
    key: "Start Properly / Look & Launch",
    name: "Start Properly / Look & Launch",
    price: "From ₦1,250,000",
    why: "Several things need to work together from day one. A connected launch scope is more useful than buying unrelated deliverables and hoping they fit.",
    link: "/#solutions",
    serviceName: "Design Systems",
  },
  bespoke: {
    key: "Bespoke Engagement",
    name: "Bespoke Engagement",
    price: "Scoped after discovery",
    why: "Your situation may require more than one fixed package. We should define the scope before recommending an investment. Major brand programmes may start around ₦20m.",
    link: "/#bespoke",
    serviceName: "Complete Brand Platform",
  },
  wedding: {
    key: "Wedding & Event Experience",
    name: "Wedding & Event Experience",
    price: "From ₦95,000; bespoke wedding ₦1m",
    why: "A special event can require both useful guest information and a designed story. The right tier depends on whether you need a themed page or a complete invitation and guest-management experience.",
    link: "/#bespoke",
    serviceName: "Web & Interaction Design",
  },
};

const getRecommendation = (choices) => {
  const [a, b, c] = choices;
  if (b === 3) return RECOMMENDATIONS.wedding;
  if (a === 5 || (b === 2 && c === 4)) return RECOMMENDATIONS.bespoke;
  if (a === 3) return RECOMMENDATIONS.desk;
  if (a === 1) return RECOMMENDATIONS.identity;
  if (a === 2) return RECOMMENDATIONS.web;
  if (a === 0) return RECOMMENDATIONS.strategy;
  if (a === 4) return RECOMMENDATIONS.launch;
  return RECOMMENDATIONS.strategy;
};

const Diagnosis = ({ onApplyRecommendation }) => {
  const [step, setStep] = useState(0);
  const [choices, setChoices] = useState([null, null, null]);

  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftColRef.current,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: leftColRef.current,
            start: "top 82%",
          },
        },
      );
      gsap.fromTo(
        panelRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.1,
          clearProps: "transform",
          scrollTrigger: {
            trigger: panelRef.current,
            start: "top 82%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSelect = (idx) => {
    const nextChoices = [...choices];
    nextChoices[step] = idx;
    setChoices(nextChoices);
  };

  const handleNext = () => {
    if (step < 3 && choices[step] !== null) {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((s) => s - 1);
    }
  };

  const handleReset = () => {
    setChoices([null, null, null]);
    setStep(0);
  };

  const isEnd = step === 3;
  const recommendation = isEnd ? getRecommendation(choices) : null;

  return (
    <div
      ref={sectionRef}
      className="bg-ink text-paper py-[clamp(72px,9vw,140px)] px-6 md:px-14 font-body"
    >
      <div className="max-w-350 mx-auto">
        {/* ── Top Eyeline Annotation ── */}
        <div className="flex justify-between items-center gap-5 pt-3 pb-2 border-t border-white/20 mb-10 md:mb-16">
          <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-paper select-none">
            § THE DIAGNOSIS / START HERE
          </span>
          <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-paper/60 select-none">
            {isEnd ? "RECOMMENDATION READY" : `QUESTION 0${step + 1} OF 03`}
          </span>
        </div>

        {/* ── 2-Column Grid: Intro & Interactive Panel ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start relative">
          {/* Left Column: Heading & Note (Sticky on Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <div ref={leftColRef} className="space-y-6">
              <h2 className="font-display font-extrabold text-[clamp(42px,5.8vw,92px)] leading-[0.92] tracking-tight uppercase m-0 text-paper">
                What's
                <br />
                getting
                <br />
                in your <span className="text-signal-red">way?</span>
              </h2>

              <p className="text-paper/75 text-base md:text-lg leading-relaxed max-w-105 font-normal mt-6 md:mt-8 m-0">
                You may not need a rebrand, a website or more content. Tell us
                what's not working. We'll help you find a sensible starting point.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Diagnostic Panel */}
          <div ref={panelRef} className="lg:col-span-7">
            <div
              className="bg-[#1c1c1c] border border-white/15 p-6 md:p-10 lg:p-12 min-h-[560px] flex flex-col justify-between shadow-2xl transition-all"
              aria-live="polite"
            >
              <div>
                {/* Panel progress row */}
                <div className="flex items-center justify-between pb-4 border-b border-white/15 mb-8 text-[11px] tracking-[0.14em] uppercase text-paper/60 font-bold">
                  <span>YOUR BRIEF STARTS HERE</span>
                  <span className="text-signal-red">
                    {isEnd ? "YOUR NEXT MOVE" : `0${step + 1} / 03`}
                  </span>
                </div>

                {/* Question Screen */}
                {!isEnd ? (
                  <div>
                    <h3 className="font-display font-extrabold text-[clamp(22px,2.4vw,34px)] leading-[1.12] tracking-tight text-paper mb-6">
                      {QUESTIONS[step].question}
                    </h3>

                    <div className="grid gap-2.5">
                      {QUESTIONS[step].options.map((option, idx) => {
                        const isSelected = choices[step] === idx;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSelect(idx)}
                            className={`w-full text-left p-4 md:p-4.5 border text-xs md:text-sm font-medium transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${
                              isSelected
                                ? "bg-[#301f1e] border-signal-red text-paper shadow-xs"
                                : "bg-transparent border-white/15 text-paper/85 hover:border-white/40 hover:bg-white/5"
                            }`}
                          >
                            <span>{option}</span>
                            <span
                              className={`text-sm font-bold transition-transform ${
                                isSelected
                                  ? "text-signal-red translate-x-0.5 -translate-y-0.5"
                                  : "text-white/20"
                              }`}
                            >
                              ↗
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* Recommendation Result Screen */
                  <div className="space-y-4">
                    <div className="text-signal-red text-[11px] font-bold uppercase tracking-[0.16em]">
                      SUGGESTED STARTING POINT
                    </div>

                    <h4 className="font-display font-extrabold text-[clamp(30px,3.4vw,48px)] leading-[0.98] tracking-tight uppercase text-paper m-0">
                      {recommendation.name}
                    </h4>

                    <div className="text-signal-red font-display text-xl md:text-2xl font-bold tracking-tight">
                      {recommendation.price}
                    </div>

                    <p className="text-paper/80 text-sm md:text-base leading-relaxed max-w-130 font-normal m-0 pt-2">
                      {recommendation.why}
                    </p>

                    <div className="pt-6 flex items-center gap-4 flex-wrap">
                      {onApplyRecommendation ? (
                        <button
                          type="button"
                          onClick={() => onApplyRecommendation(recommendation)}
                          className="inline-flex items-center justify-between gap-4 px-6 py-3.5 bg-signal-red text-ink font-display text-xs font-extrabold uppercase tracking-wider hover:bg-white hover:text-ink transition-all duration-200 cursor-pointer shadow-sm"
                        >
                          <span>Apply this direction to brief</span>
                          <span>↑</span>
                        </button>
                      ) : (
                        <a
                          href={recommendation.link}
                          className="inline-flex items-center justify-between gap-4 px-6 py-3.5 bg-signal-red text-ink font-display text-xs font-extrabold uppercase tracking-wider hover:bg-white hover:text-ink transition-all duration-200 no-underline shadow-sm"
                        >
                          <span>Explore this direction</span>
                          <span>↗</span>
                        </a>
                      )}

                      {/* Book a Call Action */}
                      <a
                        href="https://calendly.com/deezainaa/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between gap-3 px-6 py-3.5 bg-transparent border border-white/30 text-paper font-display text-xs font-extrabold uppercase tracking-wider hover:bg-white hover:text-ink hover:border-white transition-all duration-200 no-underline cursor-pointer shadow-sm"
                      >
                        <span>Book a call</span>
                        <span>↗</span>
                      </a>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="text-[11px] font-bold uppercase tracking-[0.12em] text-paper/60 hover:text-paper transition-colors cursor-pointer bg-transparent border-none p-2"
                      >
                        Start again ↺
                      </button>
                    </div>

                    <p className="text-paper/40 text-[11px] leading-relaxed pt-4 m-0 font-normal">
                      This is a guided recommendation, not a final quote or a
                      guarantee of results.
                    </p>
                  </div>
                )}
              </div>

              {/* Panel Bottom Navigation Actions */}
              {!isEnd && (
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10 gap-4">
                  <button
                    type="button"
                    disabled={step === 0}
                    onClick={handleBack}
                    className="text-[11px] font-bold uppercase tracking-[0.12em] text-paper/60 hover:text-paper disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer bg-transparent border-none p-0"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    disabled={choices[step] === null}
                    onClick={handleNext}
                    className="inline-flex items-center justify-between gap-4 px-6 py-3.5 bg-signal-red text-ink font-display text-xs font-extrabold uppercase tracking-wider hover:bg-white hover:text-ink disabled:opacity-35 disabled:hover:bg-signal-red disabled:hover:text-ink disabled:cursor-not-allowed transition-all duration-200 cursor-pointer shadow-sm"
                  >
                    <span>{step === 2 ? "See my direction" : "Next"}</span>
                    <span>↗</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;
