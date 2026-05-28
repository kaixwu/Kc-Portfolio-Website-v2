import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedProjectSection from "@/components/FeaturedProjectSection";
import FeaturesSection from "@/components/FeaturesSection";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import About from "@/components/About";
import DestinationSlider from "@/components/DestinationSlider";
import Organizations from "@/components/Organizations";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedProjectSection />
        <FeaturesSection />
        <Services />
        <Projects />
        <About />
        <DestinationSlider />
        <Organizations />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

