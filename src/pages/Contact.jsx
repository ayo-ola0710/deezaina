import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import Diagnosis from "../components/Diagnosis";
import {
  RiMailLine,
  RiTimeLine,
  RiCheckLine,
  RiArrowRightLine,
  RiSparklingLine,
  RiSendPlaneLine,
} from "react-icons/ri";

const LANDING_SERVICES = [
  { id: "strategy", label: "Brand Strategy" },
  { id: "identity", label: "Brand Identity" },
  { id: "web", label: "Web & Digital" },
  { id: "media", label: "Creative Media & Content" },
  { id: "launch", label: "Connected Launch Package" },
  { id: "desk", label: "The Brand Desk (Ongoing Partner)" },
  { id: "flagship", label: "Flagship Brand Partnership" },
  { id: "wedding", label: "Wedding & Event Digital" },
];

const TIMELINES = [
  "In 2 to 4 Weeks",
  "Immediately",
  "Next Quarter",
  "Flexible / Exploring",
];

const BUDGET_TIERS = [
  {
    id: 0,
    ngn: "₦500,000 - ₦1,000,000",
    usd: "$350 - $700",
    subNgn: "≈ $350 - $700",
    subUsd: "≈ ₦500k - ₦1m",
  },
  {
    id: 1,
    ngn: "₦1,000,000 - ₦3,500,000",
    usd: "$700 - $2,500",
    subNgn: "≈ $700 - $2,500",
    subUsd: "≈ ₦1m - ₦3.5m",
  },
  {
    id: 2,
    ngn: "₦3,500,000 - ₦8,000,000",
    usd: "$2,500 - $5,500",
    subNgn: "≈ $2,500 - $5,500",
    subUsd: "≈ ₦3.5m - ₦8m",
  },
  {
    id: 3,
    ngn: "₦8,000,000 - ₦20,000,000+",
    usd: "$5,500 - $14,000+",
    subNgn: "≈ $5,500 - $14,000+",
    subUsd: "≈ ₦8m - ₦20m+",
  },
  {
    id: 4,
    ngn: "Monthly Brand Desk (₦550k+/mo)",
    usd: "Monthly Brand Desk ($400+/mo)",
    subNgn: "≈ $400+/mo",
    subUsd: "≈ ₦550k+/mo",
  },
];

const BUDGETS = BUDGET_TIERS.map((t) => t.ngn);

/* Corner registration crosshair mark */
const LetterCropMark = ({ className = "" }) => (
  <div
    aria-hidden="true"
    className={`absolute w-3.5 h-3.5 pointer-events-none opacity-40 select-none ${className}`}
  >
    <div className="absolute top-1/2 left-0 right-0 h-px bg-ink -translate-y-1/2" />
    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-ink -translate-x-1/2" />
  </div>
);

/* Custom Popover Dropdown Pill */
const CustomPillSelect = ({
  value,
  onChange,
  options,
  isOpen,
  onToggle,
  onClose,
  label,
  header,
}) => {
  return (
    <span className="relative inline-block align-baseline mx-1 my-0.5">
      <button
        type="button"
        onClick={onToggle}
        aria-label={label}
        className="inline-flex items-center gap-1.5 px-3 py-1 bg-paper hover:bg-ink hover:text-paper border border-ink/40 hover:border-ink rounded-full text-xs font-body font-bold uppercase tracking-wider text-ink transition-all cursor-pointer shadow-2xs select-none"
      >
        <span>{value}</span>
        <span className="text-[20px] text-signal-red font-bold">▾</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <div className="absolute left-0 top-full mt-1.5 z-50 bg-white border-2 border-ink rounded-xs shadow-2xl py-1 min-w-64 sm:min-w-72 max-w-[90vw] animate-fade-in">
            {header}
            <div className="py-1">
              {options.map((opt) => {
                const optLabel = typeof opt === "string" ? opt : opt.label;
                const optSub = typeof opt === "object" ? opt.sub : null;
                const isSelected = value === optLabel;

                return (
                  <button
                    type="button"
                    key={optLabel}
                    onClick={() => {
                      onChange(optLabel);
                      onClose();
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-body font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-signal-red text-ink font-extrabold"
                        : "text-ink hover:bg-ink hover:text-paper group"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span>{optLabel}</span>
                      {optSub && (
                        <span
                          className={`text-[10px] font-medium tracking-normal normal-case pt-0.5 ${
                            isSelected
                              ? "text-ink/85"
                              : "text-slate group-hover:text-paper/75"
                          }`}
                        >
                          {optSub}
                        </span>
                      )}
                    </div>
                    {isSelected && <span className="font-bold text-sm shrink-0">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </span>
  );
};

/* Multi-Select Checkbox Dropdown Pill */
const ServicesCheckboxDropdown = ({
  selected,
  onToggle,
  options,
  isOpen,
  onToggleOpen,
  onClose,
}) => {
  let displayLabel = "Select Services";
  if (selected.length === 1) {
    displayLabel = selected[0];
  } else if (selected.length === 2) {
    displayLabel = `${selected[0]}, ${selected[1]}`;
  } else if (selected.length > 2) {
    displayLabel = `${selected.length} Services Selected`;
  }

  return (
    <span className="relative inline-block align-baseline mx-1 my-0.5">
      <button
        type="button"
        onClick={onToggleOpen}
        aria-label="Select partnership services"
        className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-paper hover:bg-ink hover:text-paper border border-ink/40 hover:border-ink rounded-full text-xs font-body font-bold uppercase tracking-wider text-ink transition-all cursor-pointer shadow-2xs select-none"
      >
        <span className="truncate max-w-56 sm:max-w-80">{displayLabel}</span>
        <span className="text-[20px] text-signal-red font-bold">▾</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <div className="absolute left-0 top-full mt-1.5 z-50 bg-white border-2 border-ink rounded-xs shadow-2xl py-2 min-w-72 sm:min-w-85 max-h-95 overflow-y-auto animate-fade-in">
            <div className="px-3.5 pb-2 mb-1 border-b border-line flex items-center justify-between">
              <span className="label text-[10px] text-slate font-bold tracking-wider uppercase">
                LANDING DISCIPLINES ({selected.length} SELECTED)
              </span>
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-slate hover:text-ink font-bold cursor-pointer px-1 py-0.5"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            {options.map((opt) => {
              const isChecked = selected.includes(opt.label);
              return (
                <div
                  key={opt.id}
                  onClick={() => onToggle(opt.label)}
                  className={`px-3.5 py-2.5 transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                    isChecked
                      ? "bg-signal-red/10 hover:bg-signal-red/15"
                      : "hover:bg-paper"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-4 h-4 rounded-xs border flex items-center justify-center transition-colors shrink-0 ${
                        isChecked
                          ? "bg-signal-red border-signal-red text-ink font-bold text-xs"
                          : "border-ink/40 bg-white"
                      }`}
                    >
                      {isChecked ? "✓" : ""}
                    </div>
                    <span className="text-xs font-body font-bold text-ink uppercase tracking-wide">
                      {opt.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </span>
  );
};

const Contact = () => {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const formRef = useRef(null);
  const sidebarRef = useRef(null);

  const [servicesOpen, setServicesOpen] = useState(false);
  const [timelineOpen, setTimelineOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [currency, setCurrency] = useState("NGN"); // "NGN" | "USD"

  const handleCurrencyChange = (newCurr) => {
    if (newCurr === currency) return;
    setCurrency(newCurr);
    setForm((prev) => {
      const tierIndex = BUDGET_TIERS.findIndex(
        (t) => t.ngn === prev.budget || t.usd === prev.budget
      );
      if (tierIndex !== -1) {
        return {
          ...prev,
          budget:
            newCurr === "USD"
              ? BUDGET_TIERS[tierIndex].usd
              : BUDGET_TIERS[tierIndex].ngn,
        };
      }
      return prev;
    });
  };

  const budgetOptions = BUDGET_TIERS.map((t) => ({
    label: currency === "USD" ? t.usd : t.ngn,
    sub: currency === "USD" ? t.subUsd : t.subNgn,
  }));

  // Lagos local time live ticker
  const [lagosTime, setLagosTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setLagosTime(new Intl.DateTimeFormat([], options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Form state initialized with optional query params (?service=...)
  const [form, setForm] = useState(() => {
    let initialServices = ["Brand Strategy", "Brand Identity"];
    let initialStory = "";
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const serviceParam = params.get("service");
      if (serviceParam) {
        const matched =
          LANDING_SERVICES.find(
            (s) =>
              s.label.toLowerCase() === serviceParam.toLowerCase() ||
              s.label.toLowerCase().includes(serviceParam.toLowerCase()) ||
              serviceParam.toLowerCase().includes(s.label.toLowerCase()),
          )?.label || serviceParam;
        initialServices = [matched];
        initialStory = `[Selected Service Inquiry: ${serviceParam}]. `;
      }
    }
    return {
      name: "",
      company: "",
      email: "",
      services: initialServices,
      timeline: "In 2 to 4 Weeks",
      budget: "₦1,000,000 - ₦3,500,000",
      story: initialStory,
    };
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const toggleService = (svc) => {
    setForm((prev) => {
      const exists = prev.services.includes(svc);
      if (exists) {
        return { ...prev, services: prev.services.filter((s) => s !== svc) };
      } else {
        return { ...prev, services: [...prev.services, svc] };
      }
    });
  };

  const location = useLocation();

  // Robust smooth scroll to section with navbar offset (using scrollIntoView with scroll-margin-top)
  const scrollToSection = (targetId, behavior = "smooth") => {
    const cleanId = targetId.replace("#", "");
    const el = document.getElementById(cleanId);
    if (!el) return;

    el.scrollIntoView({ behavior, block: "start" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setErrorMsg(
        "Please provide at least your name and email so we can reply.",
      );
      return;
    }
    setErrorMsg("");
    setSubmitted(true);
    setTimeout(() => scrollToSection("story-builder"), 60);
  };

  const handleApplyRec = (rec) => {
    if (rec && rec.serviceName) {
      setForm((prev) => {
        const nextServices = prev.services.includes(rec.serviceName)
          ? prev.services
          : [...prev.services, rec.serviceName];
        return {
          ...prev,
          services: nextServices,
          story: prev.story
            ? prev.story
            : `[Diagnosed Starting Point: ${rec.name}]. `,
        };
      });
    }
    scrollToSection("story-builder");
  };

  // Scroll to hash or service target on mount / route update
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");
    const hash = location.hash || window.location.hash;

    const targetId = serviceParam ? "story-builder" : hash;
    if (!targetId) return;

    let attempts = 0;
    const maxAttempts = 6;

    const performScroll = () => {
      attempts++;
      const cleanId = targetId.replace("#", "");
      const el = document.getElementById(cleanId);

      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });

        // Double check after animation to make sure smooth scroll was not aborted
        if (attempts === 1) {
          setTimeout(() => {
            const rect = el.getBoundingClientRect();
            // Expected top position is around 90px-140px due to scroll-mt-28 (112px)
            // If it's still > 250px or < -50px, smooth scroll was interrupted; retry
            if (rect.top > 250 || rect.top < -50) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 450);
        }
      } else if (attempts < maxAttempts) {
        setTimeout(performScroll, 80);
      }
    };

    // Initial slight delay so DOM is mounted
    const initialTimer = setTimeout(performScroll, 60);

    return () => clearTimeout(initialTimer);
  }, [location.pathname, location.hash, location.search]);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
      );
      gsap.fromTo(
        formRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: "power3.out", delay: 0.15 },
      );
      gsap.fromTo(
        sidebarRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: "power3.out", delay: 0.25 },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const isReady = Boolean(form.name.trim() && form.email.trim());

  return (
    <div
      ref={containerRef}
      className="bg-paper min-h-screen text-ink font-body"
    >
      <Navbar />

      <main className="pt-28 md:pt-36">
        {/* ── Top Header Deck ── */}
        <div
          ref={headlineRef}
          className="px-6 md:px-14 max-w-350 mx-auto pb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="label text-slate text-[11px] tracking-[0.14em]">
                § START A DIALOGUE
              </span>
              <span className="text-line text-xs">/</span>
              <span className="label text-ink text-[11px] font-semibold">
                COMMISSION INTAKE
              </span>
            </div>

            <div className="flex items-center gap-2 label text-slate text-[11px]">
              <RiTimeLine className="text-signal-red w-3.5 h-3.5" />
              <span>LAGOS WAT (UTC+1):</span>
              <span className="text-ink font-semibold">
                {lagosTime || "12:00:00"}
              </span>
            </div>
          </div>

          <h1 className="font-display font-extrabold text-ink text-[clamp(40px,6vw,92px)] leading-[0.92] tracking-tight uppercase m-0 max-w-260">
            TELL US YOUR STORY. <br />
            <span className="text-deep-red">LET'S MAKE IT ENDURE.</span>
            <span className="text-signal-red ml-2 inline-block">●</span>
          </h1>

          <p className="text-slate text-sm md:text-base leading-relaxed max-w-180 mt-6 font-normal">
            No sterile, 20-field funnels. Complete your strategic ambition in a
            single living letterhead below with zero scrolling fatigue, or run
            our 3-question diagnosis if you need guidance on scope.
          </p>

          <div className="flex items-center gap-3 pt-6 flex-wrap">
            <button
              type="button"
              onClick={() => scrollToSection("story-builder")}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-ink text-paper text-xs font-bold uppercase tracking-wider hover:bg-signal-red hover:text-ink transition-colors cursor-pointer shadow-xs"
            >
              <span>01 / Unified Strategic Brief</span>
              <span>↓</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("diagnosis")}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-transparent border border-ink text-ink text-xs font-bold uppercase tracking-wider hover:bg-ink hover:text-paper transition-colors cursor-pointer"
            >
              <span>02 / 3-Question Diagnosis</span>
              <span>↓</span>
            </button>
          </div>
        </div>

        {/* ── Section 1: The Unified Story Builder Canvas & Studio Dossier ── */}
        <section
          id="story-builder"
          className="pb-20 md:pb-28 px-6 md:px-14 max-w-350 mx-auto scroll-mt-24 lg:scroll-mt-28"
        >
          {/* Section Eyeline */}
          <div className="flex justify-between items-center gap-5 pt-3 pb-2 border-t border-ink mb-8 md:mb-10">
            <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none">
              § 01 / 02 · LIVING STRATEGIC NARRATIVE
            </span>
            <span className="flex items-center gap-2 text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none">
              DIRECT INTAKE
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: The Unified Mad-Libs Letterhead (8 cols) */}
            <div ref={formRef} className="lg:col-span-8">
              {submitted ? (
                /* Success State Receipt */
                <div className="bg-white border-2 border-ink rounded-xs p-8 md:p-14 space-y-6 shadow-md relative overflow-hidden">
                  <LetterCropMark className="top-3 left-3" />
                  <LetterCropMark className="top-3 right-3" />
                  <LetterCropMark className="bottom-3 left-3" />
                  <LetterCropMark className="bottom-3 right-3" />

                  <div className="flex items-center justify-between pb-4 border-b border-line">
                    <span className="label text-slate text-[10px] tracking-widest">
                      TRANSMISSION RECEIPT // DZ-LOGGED
                    </span>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-signal-red/10 text-signal-red text-xs font-bold rounded-full">
                      <RiCheckLine className="w-4 h-4" />
                      <span>AMBITION LOGGED</span>
                    </div>
                  </div>

                  <h2 className="font-display font-extrabold text-[clamp(28px,3.5vw,48px)] leading-[1.05] tracking-tight uppercase m-0 text-ink">
                    THANK YOU, {form.name.trim() || "FOUNDER"}. <br />
                    YOUR BRIEF IS RECEIVED.
                  </h2>

                  <p className="text-slate text-base leading-relaxed font-normal">
                    We have logged your strategic narrative for{" "}
                    <strong className="text-ink font-semibold">
                      {form.company.trim() || "your brand"}
                    </strong>
                    . Ayo and our senior leads review every dispatch thoroughly.
                    Expect a considered response at{" "}
                    <strong className="text-ink font-semibold">
                      {form.email}
                    </strong>{" "}
                    within 24 to 48 hours.
                  </p>

                  {/* Transmission Summary Box */}
                  <div className="p-5 bg-paper rounded-xs border border-line space-y-2 text-xs font-body">
                    <div className="flex justify-between py-1 border-b border-line/60">
                      <span className="label text-slate text-[10px]">
                        INQUIRER:
                      </span>
                      <span className="font-semibold text-ink">
                        {form.name} ({form.email})
                      </span>
                    </div>
                    {form.company && (
                      <div className="flex justify-between py-1 border-b border-line/60">
                        <span className="label text-slate text-[10px]">
                          BRAND / ENTITY:
                        </span>
                        <span className="font-semibold text-ink">
                          {form.company}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between py-1 border-b border-line/60">
                      <span className="label text-slate text-[10px]">
                        SERVICES:
                      </span>
                      <span className="font-semibold text-ink">
                        {form.services.join(", ")}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-line/60">
                      <span className="label text-slate text-[10px]">
                        TIMELINE:
                      </span>
                      <span className="font-semibold text-ink">
                        {form.timeline}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="label text-slate text-[10px]">
                        BUDGET:
                      </span>
                      <span className="font-semibold text-ink">
                        {form.budget}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-line flex items-center justify-between">
                    <span className="label text-slate text-[11px] tracking-wider">
                      DEEZAINA STUDIOS · WORKING WORLDWIDE
                    </span>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="label text-deep-red text-xs font-semibold hover:underline cursor-pointer"
                    >
                      EDIT THIS BRIEF ↺
                    </button>
                  </div>
                </div>
              ) : (
                /* Unified Mad-Libs Letter Form (All in 1 Card!) */
                <form
                  onSubmit={handleSubmit}
                  className="bg-white border-2 border-ink rounded-xs p-6 sm:p-10 md:p-12 shadow-md relative overflow-hidden space-y-8"
                >
                  {/* Crop marks for tactile Swiss aesthetic */}
                  <LetterCropMark className="top-3 left-3" />
                  <LetterCropMark className="top-3 right-3" />
                  <LetterCropMark className="bottom-3 left-3" />
                  <LetterCropMark className="bottom-3 right-3" />

                  {/* Letterhead Top Status Strip */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-line">
                    <div className="flex items-center gap-2">
                      <span className="label text-slate text-[10px] tracking-[0.14em]">
                        SPEC: DZ-BRIEF-2026 // MMXXV
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      {isReady ? (
                        <span className="inline-flex items-center gap-1.5 label text-ink text-[10px] font-bold tracking-wider uppercase">
                          <span className="w-2 h-2 rounded-full bg-signal-red animate-pulse" />
                          READY FOR DISPATCH
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 label text-slate text-[10px] font-semibold tracking-wider uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate/40" />
                          DRAFT IN PROGRESS
                        </span>
                      )}
                      <span className="text-line text-xs hidden sm:inline">
                        |
                      </span>
                      <span className="label text-slate text-[10px] tracking-wider hidden sm:inline">
                        1-PAGE CANVAS
                      </span>
                    </div>
                  </div>

                  {/* 1. Single Continuous Mad-Libs Story Prose */}
                  <div className="font-display font-medium text-[clamp(18px,1.9vw,24px)] leading-[2.3] text-ink tracking-tight">
                    <span>Hello Deezaina, my name is </span>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="[ your name ]"
                      aria-label="Your full name"
                      className="border-b-2 border-ink/40 focus:border-signal-red bg-transparent text-ink font-bold focus:outline-none px-2 py-0.5 inline-block w-44 sm:w-60 placeholder:text-slate/40 placeholder:font-normal placeholder:italic focus:bg-signal-red/5 transition-colors align-baseline mx-0.5"
                    />
                    <span> from </span>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                      placeholder="[ company or brand ]"
                      aria-label="Company or brand name"
                      className="border-b-2 border-ink/40 focus:border-signal-red bg-transparent text-ink font-bold focus:outline-none px-2 py-0.5 inline-block w-48 sm:w-64 placeholder:text-slate/40 placeholder:font-normal placeholder:italic focus:bg-signal-red/5 transition-colors align-baseline mx-0.5"
                    />
                    <span>. You can reach me at </span>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="[ your email address ]"
                      aria-label="Your email address"
                      className="border-b-2 border-ink/40 focus:border-signal-red bg-transparent text-ink font-bold focus:outline-none px-2 py-0.5 inline-block w-56 sm:w-76 placeholder:text-slate/40 placeholder:font-normal placeholder:italic focus:bg-signal-red/5 transition-colors align-baseline mx-0.5"
                    />
                    <span>. We need partnership in </span>
                    <ServicesCheckboxDropdown
                      selected={form.services}
                      onToggle={toggleService}
                      options={LANDING_SERVICES}
                      isOpen={servicesOpen}
                      onToggleOpen={() => {
                        setServicesOpen(!servicesOpen);
                        setTimelineOpen(false);
                        setBudgetOpen(false);
                      }}
                      onClose={() => setServicesOpen(false)}
                    />
                    <span>, aiming to kick off </span>
                    <CustomPillSelect
                      value={form.timeline}
                      onChange={(val) => setForm({ ...form, timeline: val })}
                      options={TIMELINES}
                      isOpen={timelineOpen}
                      onToggle={() => {
                        setTimelineOpen(!timelineOpen);
                        setServicesOpen(false);
                        setBudgetOpen(false);
                      }}
                      onClose={() => setTimelineOpen(false)}
                      label="Kickoff timeline"
                    />
                    <span> with an investment of </span>
                    <CustomPillSelect
                      value={form.budget}
                      onChange={(val) => setForm({ ...form, budget: val })}
                      options={budgetOptions}
                      isOpen={budgetOpen}
                      onToggle={() => {
                        setBudgetOpen(!budgetOpen);
                        setServicesOpen(false);
                        setTimelineOpen(false);
                      }}
                      onClose={() => setBudgetOpen(false)}
                      label="Investment budget"
                      header={
                        <div className="flex items-center justify-between px-3.5 py-2 border-b border-line bg-ink/3">
                          <span className="label text-slate text-[10px] font-bold uppercase tracking-widest">
                            Currency
                          </span>
                          <div className="inline-flex items-center p-0.5 rounded-full border border-line bg-white shadow-2xs">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCurrencyChange("NGN");
                              }}
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider transition-all cursor-pointer ${
                                currency === "NGN"
                                  ? "bg-ink text-paper shadow-2xs"
                                  : "text-ink/60 hover:text-ink"
                              }`}
                            >
                              ₦ NGN
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCurrencyChange("USD");
                              }}
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider transition-all cursor-pointer ${
                                currency === "USD"
                                  ? "bg-ink text-paper shadow-2xs"
                                  : "text-ink/60 hover:text-ink"
                              }`}
                            >
                              $ USD
                            </button>
                          </div>
                        </div>
                      }
                    />
                    {/* Inline Currency Switcher Toggle */}
                    <span className="inline-flex items-center p-0.5 bg-paper border border-ink/40 rounded-full align-baseline mx-1 shadow-2xs select-none">
                      <button
                        type="button"
                        onClick={() => handleCurrencyChange("NGN")}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                          currency === "NGN"
                            ? "bg-ink text-paper shadow-2xs"
                            : "text-ink/60 hover:text-ink"
                        }`}
                        title="Display budget in Nigerian Naira (₦)"
                      >
                        ₦ NGN
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCurrencyChange("USD")}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                          currency === "USD"
                            ? "bg-ink text-paper shadow-2xs"
                            : "text-ink/60 hover:text-ink"
                        }`}
                        title="Display budget in US Dollars ($)"
                      >
                        $ USD
                      </button>
                    </span>
                    <span>.</span>

                    {/* Integrated brief note */}
                    <div className="mt-8 pt-6 border-t border-line/70">
                      <div className="flex items-center justify-between mb-2">
                        <span className="label text-slate text-[11px] font-bold tracking-widest uppercase">
                          HERE IS WHAT WE WANT TO SOLVE:
                        </span>
                        <span className="label text-slate text-[10px] tracking-wider">
                          IN YOUR OWN WORDS
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        value={form.story}
                        onChange={(e) =>
                          setForm({ ...form, story: e.target.value })
                        }
                        placeholder="What does your business do, who are you trying to reach, and what commercial or creative gap must we conquer?..."
                        className="w-full bg-paper/60 border border-line focus:border-ink focus:bg-white text-ink text-sm md:text-base font-body p-4 rounded-xs focus:outline-none transition-colors placeholder:text-slate/40 placeholder:italic resize-y leading-relaxed block"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <p className="text-signal-red text-xs font-semibold m-0">
                      ⚠ {errorMsg}
                    </p>
                  )}

                  {/* Immediate Action Deck (Zero Scrolling!) */}
                  <div className="pt-6 border-t-2 border-ink flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-ink text-paper rounded-full font-body text-xs font-bold tracking-[0.14em] uppercase hover:bg-signal-red hover:text-ink transition-all duration-300 shadow-md cursor-pointer hover:scale-[1.02] group"
                    >
                      <RiSendPlaneLine className="w-4 h-4 text-signal-red group-hover:text-ink transition-colors" />
                      <span>DISPATCH STRATEGIC BRIEF</span>
                      <RiArrowRightLine className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Studio Dossier & Direct Access (4 cols) */}
            <div ref={sidebarRef} className="lg:col-span-4 space-y-6">
              {/* Direct Studio Channels */}
              <div className="bg-white border border-line rounded-xs p-6 md:p-8 space-y-6 shadow-xs">
                <span className="label text-slate text-[10px] tracking-[0.16em] block">
                  DIRECT STUDIO CHANNELS
                </span>

                <div className="space-y-4">
                  <div>
                    <span className="label text-slate text-[10px] block mb-1">
                      PRIMARY ELECTRONIC MAIL
                    </span>
                    <a
                      href="mailto:hello@deezaina.com"
                      className="text-signal-red font-display text-base font-bold tracking-tight hover:underline flex items-center gap-1.5"
                    >
                      <RiMailLine className="w-4 h-4" />
                      <span>hello@deezaina.com ↗</span>
                    </a>
                  </div>
                  <p className="text-slate text-xs leading-relaxed font-normal m-0 pt-2 border-t border-line/60">
                    Prefer direct email? Send your pitch deck, RFP, or a brief
                    greeting directly to our inbox.
                  </p>
                </div>
              </div>

              {/* Expected SLA Box */}
              <div className="p-6 border-l-2 border-signal-red bg-signal-red/5 rounded-xs space-y-2">
                <div className="flex items-center gap-2">
                  <RiSparklingLine className="text-signal-red w-4 h-4" />
                  <span className="label text-deep-red text-[10px] font-bold tracking-wider">
                    RESPONSE COMMITMENT
                  </span>
                </div>
                <p className="text-ink text-xs leading-relaxed m-0 font-medium">
                  Every brief receives thorough senior review. We respond with
                  candid feasibility, estimated schedule, and initial alignment
                  notes within 48 hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 2: Strategy Diagnosis (Positioned below for clients seeking guidance) ── */}
        <section
          id="diagnosis"
          className="bg-ink text-paper relative border-b border-white/80 scroll-mt-24 lg:scroll-mt-28"
        >
          <Diagnosis onApplyRecommendation={handleApplyRec} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
