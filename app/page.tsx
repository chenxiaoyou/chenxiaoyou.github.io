import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Pipeline from "@/components/Pipeline";
import SiteFooter from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <>
      <main id="top">
        <Hero />
        <Work />
        <About />
        <Pipeline />
      </main>
      <SiteFooter />
    </>
  );
}
