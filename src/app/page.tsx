import React from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

// Lazy load below-the-fold components to speed up initial render
const FeaturedProjectSection = dynamic(() => import("@/components/FeaturedProjectSection"), { ssr: true });
const FeaturesSection = dynamic(() => import("@/components/FeaturesSection"), { ssr: true });
const TechMarquee = dynamic(() => import("@/components/TechMarquee"), { ssr: true });
const Projects = dynamic(() => import("@/components/Projects"), { ssr: true });
const ContactForm = dynamic(() => import("@/components/ContactForm"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

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
