import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import About from "@/components/About";
import DestinationSlider from "@/components/DestinationSlider";
import Organizations from "@/components/Organizations";
import FAQ from "@/components/FAQ";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Kc Casipit",
  description: "Learn more about Kc Casipit, a professional web developer.",
};

export default function AboutPage() {
  return (
    <>
      <Header isProjectPage={true} />
      <main>
        <About />
        <DestinationSlider />
        <Organizations />
        <FAQ />
      </main>
      <Footer isAboutPage={true} />
    </>
  );
}
