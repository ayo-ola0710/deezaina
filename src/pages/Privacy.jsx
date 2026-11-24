import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { RiArrowLeftLine } from "react-icons/ri";

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-paper text-ink font-body min-h-screen selection:bg-signal-red selection:text-white">
      <Navbar />

      <main className="pt-32 md:pt-40 pb-20 md:pb-28 px-6 md:px-14 max-w-4xl mx-auto">
        {/* Back Link */}
        <div className="pb-6 border-b border-line mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 label text-slate hover:text-signal-red text-xs font-bold uppercase tracking-wider no-underline transition-colors"
          >
            <RiArrowLeftLine className="text-sm" />
            <span>Return to Studio Home</span>
          </Link>
        </div>

        {/* Eyeline Annotation */}
        <div className="flex justify-between items-center gap-5 pt-3 pb-2 border-t border-ink mb-8">
          <span className="label text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink select-none">
            § LEGAL / CLIENT PRIVACY
          </span>
          <span className="label text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate select-none">
            LAST REVISED · NOVEMBER 2026
          </span>
        </div>

        <h1 className="font-display font-extrabold text-ink text-[clamp(36px,5.5vw,72px)] leading-[0.96] tracking-tight uppercase m-0 mb-6">
          Privacy Policy
        </h1>

        <p className="text-slate text-base md:text-lg leading-relaxed font-normal mb-12">
          Deezaina Studios (“we,” “us,” or “the studio”) is an independent brand strategy and design practice based in Lagos, Nigeria, working with clients worldwide. This policy explains what information we collect when you visit deezaina.pro or submit an enquiry, how we use it, and how your information is safeguarded.
        </p>

        <div className="space-y-10 text-ink/85 text-sm md:text-base leading-relaxed">
          {/* Section 1 */}
          <section className="border-t border-line pt-8">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-3">
              01 / Information We Collect
            </h2>
            <p className="text-slate mb-4">
              We collect information that you deliberately provide to us when submitting a project brief or requesting a strategic consultation. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate">
              <li><strong className="text-ink">Contact Details:</strong> Your full name and email address.</li>
              <li><strong className="text-ink">Project Details:</strong> Company or brand name, selected service areas, kickoff timeline, investment budget tier, and your project brief description.</li>
              <li><strong className="text-ink">Direct Communications:</strong> Any supplementary project decks, documents, or notes shared via email or scheduled discovery calls.</li>
            </ul>
            <p className="text-slate mt-4">
              We do not collect sensitive personal data, financial card numbers, or automated profiling identifiers through our website forms.
            </p>
          </section>

          {/* Section 2 */}
          <section className="border-t border-line pt-8">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-3">
              02 / How We Use Your Information
            </h2>
            <p className="text-slate mb-4">
              Information gathered through the brief intake canvas and direct enquiries is used solely for professional studio engagements:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate">
              <li>To evaluate project feasibility and align scope with studio capacity.</li>
              <li>To prepare tailored proposals, estimated project timelines, and strategic recommendations.</li>
              <li>To communicate directly with you regarding your enquiry.</li>
            </ul>
            <p className="text-slate mt-4">
              We do not sell, rent, or trade client details or enquiry information to third-party marketing companies, advertisers, or data brokers.
            </p>
          </section>

          {/* Section 3 */}
          <section className="border-t border-line pt-8">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-3">
              03 / Cookies & Tracking
            </h2>
            <p className="text-slate mb-4">
              Our website does not use tracking cookies for cross-site behavioral advertising. We use standard browser storage strictly to preserve form state (such as your currency preference between ₦ NGN and $ USD) during your visit.
            </p>
            <p className="text-slate">
              If you schedule a call via Calendly or access third-party portfolio links (such as Behance), those independent services operate under their respective privacy policies.
            </p>
          </section>

          {/* Section 4 */}
          <section className="border-t border-line pt-8">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-3">
              04 / Data Retention & Confidentiality
            </h2>
            <p className="text-slate mb-4">
              Client brief materials, business narratives, and contact communications are retained only as long as necessary to facilitate ongoing discussions or contracted client engagements. Non-contracted enquiries are periodically archived and removed.
            </p>
            <p className="text-slate">
              Confidential client brand strategies, unreleased marks, and proprietary commercial information are treated under strict professional confidence.
            </p>
          </section>

          {/* Section 5 */}
          <section className="border-t border-line pt-8">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-3">
              05 / Your Rights & Contact
            </h2>
            <p className="text-slate mb-4">
              You have the right to request a copy of the information you have submitted to us, or to request its correction or complete deletion at any time.
            </p>
            <p className="text-slate">
              For privacy enquiries or data deletion requests, contact Ayo-Ola and the studio team directly at{" "}
              <a href="mailto:hello@deezaina.com" className="text-signal-red font-semibold hover:underline">
                hello@deezaina.com
              </a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
