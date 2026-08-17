import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import SpaceBackground from "@/components/SpaceBackground";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Publications from "@/components/Publications";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <SpaceBackground />
      <CustomCursor />
      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Publications />
        </main>
        <Footer />
      </div>
    </>
  );
}
