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
            § LEGAL / TERMS OF USE
          </span>
          <span className="label text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate select-none">
            LAST REVISED · NOVEMBER 2026
          </span>
        </div>

        <h1 className="font-display font-extrabold text-ink text-[clamp(36px,5.5vw,72px)] leading-[0.96] tracking-tight uppercase m-0 mb-4">
          Website Terms of Use
        </h1>

        <p className="text-slate text-base md:text-lg leading-relaxed font-normal mb-12">
          Rules for visitors accessing and using the Deezaina Studios website (deezaina.pro) and related studio channels. Commercial client commissions are governed separately by signed project proposals, statements of work, and master service agreements.
        </p>

        <div className="space-y-10 text-ink/85 text-sm md:text-base leading-relaxed">
          {/* Section 1 */}
          <section className="border-t border-line pt-8">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-3">
              01 / Acceptance and Scope
            </h2>
            <p className="text-slate mb-4">
              These terms govern access to deezaina.pro and its public content. By using the website, you agree to these terms. If you do not agree, do not use the website.
            </p>
            <p className="text-slate">
              These terms do not create a client engagement or replace a signed proposal, statement of work, or client services agreement. If documents conflict, the signed project documents govern the relevant project.
            </p>
          </section>

          {/* Section 2 */}
          <section className="border-t border-line pt-8">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-3">
              02 / Website Information and Services
            </h2>
            <p className="text-slate mb-4">
              The website describes Deezaina Studios&apos; brand strategy, visual identity, and web design services. Descriptions, examples, timelines, and availability are general information and may change.
            </p>
            <p className="text-slate mb-4">
              A service is engaged only after Deezaina and the client agree in writing on scope, fee, timing, and applicable commercial terms. Nothing on this site constitutes professional legal, tax, investment, or other regulated advice.
            </p>
            <p className="text-slate">
              No search ranking, sales result, business outcome, or launch date is guaranteed unless a signed project document expressly says otherwise.
            </p>
          </section>

          {/* Section 3 */}
          <section className="border-t border-line pt-8">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-3">
              03 / Permitted Use
            </h2>
            <p className="text-slate mb-4">
              You may view and share links to public pages for lawful purposes. You must not misuse the website, attempt unauthorised access, disrupt its operation, upload malicious code, infringe another person&apos;s rights, or use automated collection in a way that violates applicable law or our written instructions.
            </p>
            <p className="text-slate">
              You are responsible for any information you submit through our project brief or contact channels and must have the lawful right to provide it.
            </p>
          </section>

          {/* Section 4 */}
          <section className="border-t border-line pt-8">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-3">
              04 / Intellectual Property
            </h2>
            <p className="text-slate mb-4">
              Unless a page states otherwise, website text, visual design, graphics, studio marks, photographs, and other curated content are owned by or licensed to Deezaina Studios.
            </p>
            <p className="text-slate mb-4">
              Viewing the site does not transfer ownership or grant a commercial licence. You may not copy, adapt, redistribute, or commercially exploit site content without prior written permission, except for statutory uses permitted under applicable copyright law.
            </p>
            <p className="text-slate">
              Third-party client marks, brand names, and logos displayed in portfolio case studies belong to their respective corporate owners and are presented with authorization for archival documentation.
            </p>
          </section>

          {/* Section 5 */}
          <section className="border-t border-line pt-8">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-3">
              05 / Links, Availability and Liability
            </h2>
            <p className="text-slate mb-4">
              The website may link to third-party services (such as Calendly, Behance, or external reference resources) for convenience. We do not control those services or endorse every statement on them.
            </p>
            <p className="text-slate mb-4">
              We may update, suspend, or remove site content without prior notice. To the extent permitted by law, the website is provided for general information without a promise that it will always be available, uninterrupted, or error-free.
            </p>
            <p className="text-slate">
              Nothing in these terms excludes a right or liability that cannot lawfully be excluded. For any permitted limitation under applicable law, liability is limited strictly to direct loss caused by our proven breach or negligence.
            </p>
          </section>

          {/* Section 6 */}
          <section className="border-t border-line pt-8">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-3">
              06 / Privacy, Changes and Governing Law
            </h2>
            <p className="text-slate mb-4">
              Our{" "}
              <Link to="/privacy" className="text-signal-red font-semibold hover:underline">
                Privacy Notice
              </Link>{" "}
              and Cookie Notice explain website data practices. We may revise these terms by publishing an updated version with a revised review date.
            </p>
            <p className="text-slate mb-4">
              These terms are governed by the laws of the Federal Republic of Nigeria. A dispute should first be raised by writing to{" "}
              <a href="mailto:hello@deezaina.com" className="text-signal-red font-semibold hover:underline">
                hello@deezaina.com
              </a>{" "}
              so the parties can attempt a practical, good-faith resolution.
            </p>
            <p className="text-slate">
              This clause does not remove a consumer&apos;s statutory rights under the Federal Competition and Consumer Protection Act or the jurisdiction of a competent court.
            </p>
          </section>

          {/* Section 7 */}
          <section className="border-t border-line pt-8">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-3">
              07 / Statutory References
            </h2>
            <p className="text-slate mb-4">
              These official sources inform this framework and client practices:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate">
              <li>
                <a
                  href="https://fccpc.gov.ng/resources-library/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-signal-red font-semibold hover:underline"
                >
                  Federal Competition and Consumer Protection Commission (FCCPC) Resources ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.copyright.gov.ng/CopyrightAct/CopyrightAct2023FinalPublication1.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-signal-red font-semibold hover:underline"
                >
                  Nigeria Copyright Act 2022 (Official Publication) ↗
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
