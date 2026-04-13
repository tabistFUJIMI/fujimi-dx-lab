import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/sections/HeroSection";
import ProductSeriesSection from "./components/sections/ProductSeriesSection";
import AboutSection from "./components/sections/AboutSection";
import FreeToolSection from "./components/sections/FreeToolSection";
import PartnerCTASection from "./components/sections/PartnerCTASection";
import JsonLd from "./components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main>
        <HeroSection />
        <ProductSeriesSection />
        <AboutSection />
        <FreeToolSection />
        <PartnerCTASection />
      </main>
      <Footer />
    </>
  );
}
