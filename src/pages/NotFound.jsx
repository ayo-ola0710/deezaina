import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { RiArrowLeftLine, RiArrowRightUpLine } from "react-icons/ri";

const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-paper text-ink font-body min-h-screen flex flex-col justify-between selection:bg-signal-red selection:text-white">
      <Navbar />

      <main className="pt-36 md:pt-48 pb-24 px-6 md:px-14 max-w-4xl mx-auto text-center flex-1 flex flex-col items-center justify-center">
        {/* Eyeline Stamp */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-signal-red" />
          <span className="label text-signal-red text-xs font-extrabold uppercase tracking-[0.16em]">
            404 / ROUTE NOT LOCATED
          </span>
        </div>

        <h1 className="font-display font-extrabold text-ink text-[clamp(48px,9vw,120px)] leading-[0.88] tracking-tight uppercase m-0 mb-6">
          Page Not <br />
          <span className="text-signal-red">Found.</span>
        </h1>

        <p className="text-slate text-base md:text-xl max-w-xl leading-relaxed m-0 mb-10 font-normal">
          The dispatch coordinates you requested do not exist in the Deezaina studio archive or may have been reorganized.
        </p>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-ink text-paper text-xs font-bold uppercase tracking-wider hover:bg-signal-red hover:text-ink transition-colors no-underline shadow-sm"
          >
            <RiArrowLeftLine className="text-sm" />
            <span>Return to Studio Home</span>
          </Link>
          <Link
            to="/works"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-transparent border border-ink text-ink text-xs font-bold uppercase tracking-wider hover:bg-ink hover:text-paper transition-colors no-underline"
          >
            <span>Explore Selected Work</span>
            <RiArrowRightUpLine className="text-sm" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-transparent border border-line text-slate hover:text-ink hover:border-ink text-xs font-bold uppercase tracking-wider transition-colors no-underline"
          >
            <span>Send a Project Brief</span>
            <RiArrowRightUpLine className="text-sm" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
