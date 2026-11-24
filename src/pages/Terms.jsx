import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { RiArrowLeftLine } from "react-icons/ri";

const Terms = () => {
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
            § LEGAL / TERMS OF ENGAGEMENT
          </span>
          <span className="label text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate select-none">
            LAST REVISED · NOVEMBER 2026
          </span>
        </div>

        <h1 className="font-display font-extrabold text-ink text-[clamp(36px,5.5vw,72px)] leading-[0.96] tracking-tight uppercase m-0 mb-6">
          Terms of Service
        </h1>

        <p className="text-slate text-base md:text-lg leading-relaxed font-normal mb-12">
          These Terms of Service outline the general principles governing the use of the Deezaina Studios website (deezaina.pro) and our initial client intake process. Commercial client projects are additionally governed by formal written project agreements, signed proposals, and agreed deliverables.
        </p>

        <div className="space-y-10 text-ink/85 text-sm md:text-base leading-relaxed">
          {/* Section 1 */}
          <section className="border-t border-line pt-8">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-3">
              01 / Studio Practice & Scope
            </h2>
            <p className="text-slate mb-4">
              Deezaina Studios operates as an independent brand strategy and design studio. Information presented on this website—including pricing benchmarks, package descriptions, and diagnostic suggestions—is provided for preliminary evaluation and guidance.
            </p>
            <p className="text-slate">
              No formal commercial engagement, delivery schedule, or binding contract is created solely through the submission of a project brief or diagnosis form. Engagements begin only upon mutual execution of a written statement of work (SOW) or proposal and receipt of initial commitment deposits.
            </p>
          </section>

          {/* Section 2 */}
          <section className="border-t border-line pt-8">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-3">
              02 / Intellectual Property & Portfolio Rights
            </h2>
            <p className="text-slate mb-4">
              All visual marks, brand identities, graphic layouts, editorial texts, photography, and mockups displayed on this website are the intellectual property of Deezaina Studios or are reproduced with client permission for portfolio documentation.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate">
              <li><strong className="text-ink">Client Work:</strong> Final delivered brand assets, identity files, and approved design packages transfer to client ownership upon full settlement of contracted project fees in accordance with the signed agreement.</li>
              <li><strong className="text-ink">Studio Rights:</strong> Deezaina Studios retains the right to display completed design work, case studies, and visual documentation in studio archives, exhibitions, award submissions, and portfolio presentations.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="border-t border-line pt-8">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-3">
              03 / Proposals, Estimates & Currencies
            </h2>
            <p className="text-slate mb-4">
              Project quotes and scope estimates are provided based on the specific deliverables outlined during discovery discussions. Prices are quoted in Nigerian Naira (₦ NGN) for domestic engagements or US Dollars ($ USD) for international commissions.
            </p>
            <p className="text-slate">
              Estimates remain valid for thirty (30) calendar days from issuance unless otherwise specified in writing.
            </p>
          </section>

          {/* Section 4 */}
          <section className="border-t border-line pt-8">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-3">
              04 / Disclaimer of Warranties
            </h2>
            <p className="text-slate mb-4">
              While we take meticulous care to ensure the accuracy of our site documentation and design rationale, the website content is provided on an “as is” basis. Design mockups illustrate conceptual applications and brand systems, and do not constitute representations of third-party corporate endorsement unless expressly verified.
            </p>
            <p className="text-slate">
              We do not promise specific commercial sales outcomes, investor valuations, or advertising returns, as commercial success depends on broader operational and market factors beyond creative design.
            </p>
          </section>

          {/* Section 5 */}
          <section className="border-t border-line pt-8">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-3">
              05 / Governing Law
            </h2>
            <p className="text-slate mb-4">
              These terms and any general website disputes are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Formal client contracts may specify mutually agreed international arbitration or jurisdiction terms.
            </p>
            <p className="text-slate">
              For any questions regarding these terms, contact us at{" "}
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

export default Terms;
