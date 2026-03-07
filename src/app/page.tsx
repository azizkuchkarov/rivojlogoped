import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import MainInstructorSection from "@/components/MainInstructorSection";
import NewsSection from "@/components/NewsSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <MainInstructorSection />
        <NewsSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
