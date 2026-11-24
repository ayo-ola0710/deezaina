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
            § LEGAL / PRIVACY &amp; COOKIE NOTICE
          </span>
          <span className="label text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate select-none">
            LAST REVISED · NOVEMBER 2026
          </span>
        </div>

        <h1 className="font-display font-extrabold text-ink text-[clamp(36px,5.5vw,72px)] leading-[0.96] tracking-tight uppercase m-0 mb-4">
          Privacy Notice &amp; Cookies
        </h1>

        <p className="text-slate text-base md:text-lg leading-relaxed font-normal mb-12">
          Public-facing notice for enquiries, website visits, and studio communications at Deezaina Studios (deezaina.pro), compliant with the Nigeria Data Protection Act 2023 (NDPA) and NDPC General Application and Implementation Directive.
        </p>

        <div className="space-y-10 text-ink/85 text-sm md:text-base leading-relaxed">
          {/* Section 1 */}
          <section className="border-t border-line pt-8">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-3">
              01 / Who is Responsible
            </h2>
            <p className="text-slate mb-4">
              This notice applies to the website and enquiry channels operated under the Deezaina Studios name. The data controller is Deezaina Studios, Nigeria.
            </p>
            <p className="text-slate">
              Primary studio and privacy contact:{" "}
              <a href="mailto:hello@deezaina.com" className="text-signal-red font-semibold hover:underline">
                hello@deezaina.com
              </a>.
            </p>
          </section>

          {/* Section 2 */}
          <section className="border-t border-line pt-8">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-3">
              02 / Information We May Collect
            </h2>
            <p className="text-slate mb-4">
              Depending on the live features you use on this site, we may process:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate mb-4">
              <li><strong className="text-ink">Project Enquiries:</strong> Full name, company or brand name, email address, requested services, target kickoff timeline, budget bracket, and project brief description provided through our enquiry form or email.</li>
              <li><strong className="text-ink">Correspondence:</strong> Supplementary project decks, discovery call notes, and email discussions.</li>
              <li><strong className="text-ink">Technical Data:</strong> Limited technical information such as device type, browser user-agent, server security logs, and client-side preference states (such as currency display selection).</li>
            </ul>
            <p className="text-slate">
              Do not submit sensitive personal data (e.g. government identification, financial card numbers, or health information) through our public contact forms.
            </p>
          </section>

          {/* Section 3 */}
          <section className="border-t border-line pt-8">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-3">
              03 / Why We Use Information and Lawful Grounds
            </h2>
            <p className="text-slate mb-4">
              We process personal information under the following lawful grounds established by the NDPA 2023:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate mb-4">
              <li><strong className="text-ink">Pre-Contractual Steps:</strong> To respond to your project brief, assess strategic and creative fit, prepare tailored proposals, and scope deliverables before entering a formal contract.</li>
              <li><strong className="text-ink">Contractual Performance:</strong> To deliver agreed brand strategy, visual identity, or website design services once commissioned.</li>
              <li><strong className="text-ink">Legitimate Studio Operations:</strong> To maintain site security, prevent abuse, operate network infrastructure, and establish or defend legal claims.</li>
            </ul>
            <p className="text-slate">
              We never sell, rent, or trade your personal or business enquiry information to commercial data brokers or third-party advertisers.
            </p>
          </section>

          {/* Section 4 */}
          <section className="border-t border-line pt-8">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-3">
              04 / Who May Receive Information
            </h2>
            <p className="text-slate mb-4">
              Access to enquiry information is restricted strictly to authorized Deezaina Studios personnel and verified infrastructure providers who support our operations (such as web hosting, transactional email delivery, and encrypted file backup).
            </p>
            <p className="text-slate">
              All infrastructure partners are bound by confidentiality obligations and industry-standard security safeguards. We disclose data to public authorities only where required by valid statutory process.
            </p>
          </section>

          {/* Section 5 */}
          <section className="border-t border-line pt-8">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-3">
              05 / Data Retention and Security
            </h2>
            <p className="text-slate mb-4">
              We retain personal information only for as long as necessary to fulfill the purposes for which it was collected, resolve disputes, and satisfy accounting or legal obligations:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate mb-4">
              <li>Uncontracted enquiries are periodically archived and securely purged.</li>
              <li>Active client contracts, accounting records, and delivery archives are retained in accordance with statutory Nigerian commercial and tax requirements.</li>
              <li>Server security logs are maintained for limited operational cycles to ensure system integrity.</li>
            </ul>
            <p className="text-slate">
              We apply technical and organizational security measures to protect your information, recognizing that no internet transmission or electronic storage can be guaranteed completely immune from unauthorized access.
            </p>
          </section>

          {/* Section 6: Cookies */}
          <section id="cookies" className="border-t border-line pt-8">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-3">
              06 / Cookie Notice and Browser Storage
            </h2>
            <p className="text-slate mb-4">
              In accordance with NDPC GAID Article 19, this section discloses how cookies and local browser storage are utilized on deezaina.pro:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate mb-4">
              <li><strong className="text-ink">Strictly Essential Storage:</strong> We use lightweight browser local storage exclusively for essential user experience preferences—specifically maintaining your chosen currency switcher (₦ NGN / $ USD) and active form draft fields so your data is not lost on page reload.</li>
              <li><strong className="text-ink">Advertising &amp; Profiling Cookies:</strong> We do NOT employ third-party behavioral advertising cookies, remarketing pixels, or cross-site commercial trackers.</li>
              <li><strong className="text-ink">Third-Party Links:</strong> When accessing external scheduling tools (such as Calendly) or external social links, those external providers operate under their independent privacy terms.</li>
            </ul>
            <p className="text-slate">
              You can clear or disable browser cookies and local storage through your browser settings at any time without impacting your ability to browse portfolio case studies or read the studio journal.
            </p>
          </section>

          {/* Section 7 */}
          <section className="border-t border-line pt-8">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-3">
              07 / Your Rights and NDPC Complaints
            </h2>
            <p className="text-slate mb-4">
              Under the Nigeria Data Protection Act 2023, you have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate mb-4">
              <li>Request confirmation of whether we process your personal data and obtain a copy.</li>
              <li>Request rectification of inaccurate or incomplete details.</li>
              <li>Request erasure or restriction of processing where applicable under law.</li>
              <li>Object to processing based on legitimate interests.</li>
              <li>Withdraw consent at any time where processing relies on consent.</li>
            </ul>
            <p className="text-slate mb-4">
              To exercise any of these rights, email{" "}
              <a href="mailto:hello@deezaina.com" className="text-signal-red font-semibold hover:underline">
                hello@deezaina.com
              </a>{" "}
              with &ldquo;Privacy Request&rdquo; in the subject line. We will respond within statutory timeframes.
            </p>
            <p className="text-slate">
              You also have the statutory right to lodge a complaint with the Nigeria Data Protection Commission (NDPC) at{" "}
              <a
                href="https://ndpc.gov.ng/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-signal-red font-semibold hover:underline"
              >
                https://ndpc.gov.ng/ ↗
              </a>.
            </p>
          </section>

          {/* Section 8 */}
          <section className="border-t border-line pt-8">
            <h2 className="font-display font-bold text-xl md:text-2xl text-ink tracking-tight mb-3">
              08 / Statutory References
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-slate">
              <li>
                <a
                  href="https://ndpc.gov.ng/wp-content/uploads/2024/03/Nigeria_Data_Protection_Act_2023.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-signal-red font-semibold hover:underline"
                >
                  Nigeria Data Protection Act 2023 (NDPA) ↗
                </a>
              </li>
              <li>
                <a
                  href="https://ndpc.gov.ng/wp-content/uploads/2025/03/NDP-ACT-GAID-2025-MARCH-20TH.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-signal-red font-semibold hover:underline"
                >
                  NDPC General Application and Implementation Directive (GAID) ↗
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

export default Privacy;
