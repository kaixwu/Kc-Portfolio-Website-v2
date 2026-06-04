import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedProjectSection from "@/components/FeaturedProjectSection";
import FeaturesSection from "@/components/FeaturesSection";
import TechMarquee from "@/components/TechMarquee";
import Projects from "@/components/Projects";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Above the fold (loads instantly) */}
        <Hero />
        
        {/* Below the fold (lazy loaded) */}
        <TechMarquee />
        <FeaturedProjectSection />
        <FeaturesSection />
        <Projects />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
