import { useEffect, useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { getPostBySlug, getRelatedPosts } from "../data/journal";
import {
  RiArrowLeftLine,
  RiArrowRightUpLine,
  RiQuestionLine,
  RiCheckLine,
  RiTimeLine,
  RiUserLine,
} from "react-icons/ri";

gsap.registerPlugin(ScrollTrigger);

const JournalPost = () => {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.from(".post-header-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.from(".post-section-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".post-body-content",
          start: "top 85%",
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [slug]);

  if (!post) {
    return <Navigate to="/journal" replace />;
  }

  const related = getRelatedPosts(slug);

  return (
    <div
      ref={containerRef}
      className="bg-paper text-ink font-body min-h-screen selection:bg-signal-red selection:text-white"
    >
      <Navbar />

      <main className="pt-32 md:pt-40 pb-20 md:pb-28 px-6 md:px-14 max-w-4xl mx-auto">
        {/* Back Link */}
        <div className="pb-6 border-b border-line mb-8">
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 label text-slate hover:text-signal-red text-xs font-bold uppercase tracking-wider no-underline transition-colors"
          >
            <RiArrowLeftLine className="text-sm" />
            <span>Return to Studio Journal</span>
          </Link>
        </div>

        {/* Eyeline Annotation */}
        <div className="post-header-reveal flex justify-between items-center gap-5 pt-3 pb-2 border-t border-ink mb-6">
          <span className="label text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-signal-red select-none">
            § {post.category.toUpperCase()}
          </span>
          <div className="flex items-center gap-4 text-slate label text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em]">
            <span className="flex items-center gap-1.5">
              <RiTimeLine className="text-xs" />
              <span>{post.readTime}</span>
            </span>
            <span>·</span>
            <span>{post.date}</span>
          </div>
        </div>

        {/* Article H1 Header */}
        <header className="post-header-reveal mb-10 md:mb-12">
          <h1 className="font-display font-extrabold text-ink text-[clamp(34px,5.2vw,64px)] leading-[1.02] tracking-tight m-0 mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 pt-4 border-t border-line text-slate text-xs md:text-sm">
            <span className="w-8 h-8 rounded-full bg-ink/10 flex items-center justify-center text-ink font-bold">
              <RiUserLine />
            </span>
            <div>
              <span className="font-bold text-ink block">{post.author}</span>
              <span className="text-[11px] uppercase tracking-wider text-slate">
                Deezaina Studios · Nigeria
              </span>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="post-header-reveal mb-12 rounded-sm overflow-hidden border border-line bg-ink/5 aspect-[16/9] shadow-sm">
          <img
            src={post.image}
            alt={post.imageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* IN A SENTENCE Callout */}
        <div className="post-header-reveal mb-12 p-6 md:p-8 bg-ink/[0.03] border-l-4 border-signal-red rounded-r-sm">
          <span className="label text-[10px] font-extrabold uppercase tracking-[0.16em] text-signal-red block mb-2">
            IN A SENTENCE
          </span>
          <p className="font-display font-medium text-lg md:text-xl text-ink leading-snug m-0">
            {post.inASentence}
          </p>
        </div>

        {/* Intro Paragraphs */}
        <div className="post-header-reveal space-y-5 text-slate text-base md:text-lg leading-relaxed mb-12">
          {post.introParagraphs.map((para, i) => (
            <p key={i} className="m-0">
              {para}
            </p>
          ))}
        </div>

        {/* Article Sections */}
        <div className="post-body-content space-y-12 text-ink/90 text-base md:text-lg leading-relaxed">
          {post.sections.map((section, sIdx) => (
            <section
              key={sIdx}
              className="post-section-reveal border-t border-line pt-8"
            >
              <h2 className="font-display font-bold text-2xl md:text-3xl text-ink tracking-tight mb-4">
                {section.heading}
              </h2>

              <div className="space-y-4 text-slate text-base md:text-lg">
                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="m-0">
                    {para}
                  </p>
                ))}
              </div>

              {section.list && section.list.length > 0 && (
                <ul className="mt-6 space-y-3 pl-0 list-none">
                  {section.list.map((item, lIdx) => (
                    <li
                      key={lIdx}
                      className="flex items-start gap-3 text-slate text-base md:text-lg"
                    >
                      <span className="w-5 h-5 rounded-full bg-signal-red/10 text-signal-red flex items-center justify-center flex-none mt-1 text-xs">
                        <RiCheckLine />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* FAQs Section */}
          {post.faqs && post.faqs.length > 0 && (
            <section className="post-section-reveal border-t-2 border-ink pt-10 mt-16">
              <div className="flex items-center gap-2 mb-6">
                <RiQuestionLine className="text-signal-red text-xl" />
                <h2 className="font-display font-bold text-2xl md:text-3xl text-ink tracking-tight m-0">
                  Questions Founders Often Ask
                </h2>
              </div>

              <div className="space-y-6">
                {post.faqs.map((faq, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-6 border border-line bg-ink/[0.02] rounded-sm space-y-2"
                  >
                    <h3 className="font-display font-bold text-lg md:text-xl text-ink m-0">
                      {faq.question}
                    </h3>
                    <p className="text-slate text-sm md:text-base leading-relaxed m-0">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Next Step Banner */}
          {post.nextStep && (
            <div className="post-section-reveal mt-16 p-8 md:p-10 border border-ink bg-ink text-white rounded-sm space-y-6">
              <span className="label text-[10px] font-extrabold uppercase tracking-[0.16em] text-signal-red block">
                § WHAT COMES NEXT
              </span>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight m-0">
                Ready to bring strategy, identity, and web together?
              </h3>
              <p className="text-white/70 text-base leading-relaxed m-0 max-w-2xl">
                {post.nextStep}
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="px-6 py-3.5 bg-signal-red text-white text-xs font-bold tracking-[0.08em] uppercase no-underline hover:bg-white hover:text-ink transition-colors"
                >
                  Send a Project Brief ↗
                </Link>
                <a
                  href="mailto:hello@deezaina.com"
                  className="px-6 py-3.5 bg-white/10 text-white border border-white/20 text-xs font-bold tracking-[0.08em] uppercase no-underline hover:bg-white hover:text-ink transition-colors"
                >
                  Email hello@deezaina.com
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Related Articles Footer */}
        {related && related.length > 0 && (
          <aside className="mt-20 pt-12 border-t border-line">
            <span className="label text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate block mb-6">
              RELATED STUDIO ESSAYS
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/journal/${rel.slug}`}
                  className="group p-6 border border-line bg-paper hover:border-ink transition-colors no-underline block"
                >
                  <span className="label text-[10px] font-bold uppercase tracking-wider text-signal-red block mb-2">
                    {rel.category}
                  </span>
                  <h4 className="font-display font-bold text-lg text-ink group-hover:text-signal-red transition-colors mb-2">
                    {rel.title}
                  </h4>
                  <p className="text-slate text-xs leading-relaxed line-clamp-2 m-0 mb-4">
                    {rel.inASentence}
                  </p>
                  <span className="inline-flex items-center gap-1.5 label text-[10px] font-bold uppercase tracking-wider text-ink group-hover:text-signal-red">
                    <span>Read Essay</span>
                    <RiArrowRightUpLine />
                  </span>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default JournalPost;
