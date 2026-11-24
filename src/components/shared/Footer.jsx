import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  RiInstagramLine,
  RiTwitterXLine,
  RiLinkedinBoxLine,
  RiFacebookBoxLine,
} from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

/* ─── Navigation links ─── */
const NAV_LINKS = [
  { name: "ABOUT", href: "/about" },
  { name: "WORKS", href: "/works" },
  { name: "CONTACT", href: "/contact" },
];

/* ─── Legal & Privacy links ─── */
const LEGAL_LINKS = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Pricing Options", href: "/#picker" },
];

/* ─── Social icons configuration ─── */
const SOCIAL_ICONS = [
  {
    label: "Instagram",
    href: "https://instagram.com/deezainaa?utm_source=qr&cplk=MWxqdzF6dW1pcnVyeA==",
    icon: RiInstagramLine,
  },
  {
    label: "Twitter / X",
    href: "https://x.com/Deezainaa",
    icon: RiTwitterXLine,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/deezaina-studios/",
    icon: RiLinkedinBoxLine,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1FEvsKAPS9/",
    icon: RiFacebookBoxLine,
  },
];

const Footer = () => {
  const footerRef = useRef(null);
  const wordmarkRef = useRef(null);
  const ctaBtnRef = useRef(null);

  /* GSAP scroll-triggered animations and interactive physics */
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      // 1. Column stagger entrance
      gsap.fromTo(
        ".footer-col",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 82%",
          },
        },
      );

      // 2. Social icons pop-in stagger
      gsap.fromTo(
        ".footer-icon-btn",
        { scale: 0.7, opacity: 0, y: 10 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: footer,
            start: "top 78%",
          },
        },
      );

      // 3. Giant DEEZAINA watermark scroll reveal (opacity driven purely by GSAP)
      if (wordmarkRef.current) {
        gsap.fromTo(
          wordmarkRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 0.5,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: wordmarkRef.current,
              start: "top 95%",
              end: "bottom 70%",
              scrub: 1.0,
            },
          },
        );
      }
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-ink font-body pt-18 relative overflow-hidden text-white"
    >
      {/* ══════════════════════════════════════
          TOP BLOCK: 3 COLUMNS
      ══════════════════════════════════════ */}
      <div className="px-6 md:px-11 pb-16 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
        {/* Col 1: Studio identity + Contact email + Social Icons */}
        <div className="footer-col space-y-6">
          <div>
            <span className="bg-white inline-block rounded-sm px-2.5 py-1 mb-3">
              <img src="/logo.png" alt="" className="w-25 h-9" />
            </span>
            <p className="text-white/70 text-sm leading-relaxed max-w-70 font-normal">
              Strategy-led identity, media and digital experiences. Work that
              starts with a question and earns its place.
            </p>
          </div>

          <div>
            {/* Contact Email Link */}
            <a
              href="mailto:hello@deezaina.com"
              className="inline-block text-signal-red text-[14px] font-medium tracking-[0.04em] no-underline border-b border-signal-red/40 pb-0.5 hover:border-signal-red transition-colors"
            >
              hello@deezaina.com ↗
            </a>

            {/* Social Icons Row directly under the email */}
            <div className="flex items-center gap-2.5 pt-5">
              {SOCIAL_ICONS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      scale: 1.15,
                      y: -2,
                      duration: 0.25,
                      ease: "back.out(2)",
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      scale: 1,
                      y: 0,
                      duration: 0.25,
                      ease: "power2.out",
                    });
                  }}
                  className="footer-icon-btn w-9 h-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/70 hover:text-signal-red hover:border-signal-red/60 hover:bg-signal-red/10 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div className="footer-col">
          <span className="label text-white/35 text-[11px] tracking-[0.14em] block mb-6">
            NAVIGATE
          </span>
          <ul className="list-none m-0 p-0 flex flex-col gap-3.5">
            {NAV_LINKS.map((l) => (
              <li key={l.name}>
                <Link
                  to={l.href}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { x: 4, duration: 0.2 });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { x: 0, duration: 0.2 });
                  }}
                  className="inline-block text-white/70 no-underline text-sm font-normal hover:text-white transition-colors"
                >
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Terms & Privacy + Start a Project Button */}
        <div className="footer-col flex flex-col justify-between">
          <div>
            <span className="label text-white/35 text-[11px] tracking-[0.14em] block mb-6">
              TERMS & PRIVACY
            </span>
            <ul className="list-none m-0 p-0 flex flex-col gap-3.5 uppercase">
              {LEGAL_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, { x: 4, duration: 0.2 });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, { x: 0, duration: 0.2 });
                    }}
                    className="inline-block text-white/70 no-underline text-sm font-normal hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Start a project: interactive pill button with GSAP physics */}
          <Link
            ref={ctaBtnRef}
            to="/contact"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.05,
                duration: 0.25,
                ease: "power2.out",
              });
              const arrow = e.currentTarget.querySelector(".footer-btn-arrow");
              if (arrow) gsap.to(arrow, { x: 4, duration: 0.2 });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
              });
              const arrow = e.currentTarget.querySelector(".footer-btn-arrow");
              if (arrow) gsap.to(arrow, { x: 0, duration: 0.2 });
            }}
            className="inline-flex items-center justify-center gap-2.5 mt-10 px-7 py-3.5 bg-paper text-ink text-[13px] font-semibold tracking-[0.06em] no-underline uppercase  self-start hover:bg-signal-red hover:text-ink transition-colors shadow-sm"
          >
            <span>Send a project brief</span>
            <span className="footer-btn-arrow text-sm inline-block">↗</span>
          </Link>
        </div>
      </div>

      {/* ── Mid Hairline Divider ── */}
      <div className="h-px bg-white/12 mx-6 md:mx-11" />

      {/* ══════════════════════════════════════
          MONUMENTAL WORDMARK (Scroll Parallax)
      ══════════════════════════════════════ */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none mt-2 md:mt-12 text-center px-2 sm:px-4 py-3">
        <span
          ref={wordmarkRef}
          className="text-[clamp(40px,16.8vw,80px)] md:text-[clamp(90px,18.5vw,340px)] font-[1000] leading-[0.8] text-white block -tracking-widest select-none pointer-events-none will-change-transform opacity-0 whitespace-nowrap w-full text-center"
          style={{ fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif' }}
          aria-hidden="true"
        >
          DEEZAINA
        </span>
      </div>

      {/* ══════════════════════════════════════
          BOTTOM BAR: Legal 
      ══════════════════════════════════════ */}
      <div className="h-px bg-white/12 mt-6" />
      <div className="flex flex-col sm:flex-row items-center justify-between py-4 px-6 md:px-11 gap-3">
        <span className="label text-[10px] text-white/30 tracking-widest">
          © <span>2026</span> DEEZAINA STUDIOS. ALL RIGHTS RESERVED.
        </span>

        {/* Registration Mark + Studio Location */}
        <div className="flex items-center gap-5">
          <span className="label text-[10px] text-white/40 tracking-widest">
            <span>NIGERIA · WORKING WORLDWIDE</span>
          </span>
          <span
            aria-hidden="true"
            className="text-white/15 text-sm font-body leading-none"
          >
            ⊕
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
