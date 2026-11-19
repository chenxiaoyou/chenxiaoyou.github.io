import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import SiteFooter from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <>
      <main id="top">
        <Hero />
        <About />
        <Experience />
        <Projects />
      </main>
      <SiteFooter />
    </>
  );
}
