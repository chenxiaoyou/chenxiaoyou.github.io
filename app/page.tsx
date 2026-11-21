import Hero from "@/components/Hero";
import Work from "@/components/Work";
import SiteFooter from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <>
      <main id="top">
        <Hero />
        <Work />
      </main>
      <SiteFooter />
    </>
  );
}
