import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Works from "./pages/Works";
import CaseStudy from "./pages/CaseStudy";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Journal from "./pages/Journal";
import JournalPost from "./pages/JournalPost";
import NotFound from "./pages/NotFound";
import { CursorProvider } from "./context/CursorContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import Cursor from "./components/shared/Cursor";
import { Routes, Route } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  /* After all sections mount, recalculate scroll positions on Home.
     Required when a pinned section (Process) sits above others. */
  useEffect(() => {
    if (typeof window === "undefined" || window.location.pathname !== "/") return;
    const id = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);
    return () => clearTimeout(id);
  }, []);

  return (
    <CurrencyProvider>
      <CursorProvider>
        <Cursor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/works" element={<Works />} />
          <Route path="/works/:slug" element={<CaseStudy />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<JournalPost />} />
          <Route path="/blog" element={<Journal />} />
          <Route path="/blog/:slug" element={<JournalPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CursorProvider>
    </CurrencyProvider>
  );
};

export default App;
