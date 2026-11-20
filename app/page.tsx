import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Stack from "@/components/Stack";
import About from "@/components/About";
import Pipeline from "@/components/Pipeline";
import SiteFooter from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <>
      <main id="top">
        <Hero />
        <Work />
        <Stack />
        <About />
        <Pipeline />
      </main>
      <SiteFooter />
    </>
  );
}
