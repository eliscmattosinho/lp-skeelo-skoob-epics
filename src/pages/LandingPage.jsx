import React from "react";

import Header from "@/components/Header/Header";
import About from "@/components/About/About";

import InfoContext from "@/components/InfoContext/InfoContext";
import InfoElements from "@/components/InfoElements/InfoElements";

import Skeelo from "@/components/Skeelo/Skeelo";
import Skoob from "@/components/Skoob/Skoob";

import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <About />
      <InfoContext />
      <InfoElements />
      <Skeelo />
      <Skoob />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage;
