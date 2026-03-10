import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import MainInstructorSection from "@/components/MainInstructorSection";
import NewsSection from "@/components/NewsSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-white to-stone-50">
      <Header />
      <main className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_60%)]" />
        <div className="relative space-y-24 lg:space-y-28">
          <Hero />
          <Services />
          <MainInstructorSection />
          <NewsSection />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
