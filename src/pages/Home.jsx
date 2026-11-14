import Navbar from "../components/shared/Navbar";
import Hero from "../components/Hero";
import Statement from "../components/Statement";
import Services from "../components/Services";
import Solutions from "../components/Solutions";
import Work from "../components/Work";
import Process from "../components/Process";
import About from "../components/About";
import CTA from "../components/CTA";
import Footer from "../components/shared/Footer";

const Home = () => {
  return (
    <div className="bg-paper text-ink font-body">
      <Navbar />
      <section id="home">
        <Hero />
      </section>
      <Statement />
      <section id="work">
        <Work />
      </section>
      <section id="services">
        <Services />
      </section>
      <Solutions />
      <section id="process">
        <Process />
      </section>
      <section id="about">
        <About />
      </section>
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
