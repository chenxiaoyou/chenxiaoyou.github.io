import Hero from "@/components/Hero";
import Resume from "@/components/Resume";
import SiteFooter from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <>
      <main id="top">
        <Hero />
        <Resume />
      </main>
      <SiteFooter />
    </>
  );
}
