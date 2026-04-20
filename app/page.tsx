import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/sections/HeroSection";
import ReserveNaviSpotlightSection from "./components/sections/ReserveNaviSpotlightSection";
import ProductSeriesSection from "./components/sections/ProductSeriesSection";
import AboutSection from "./components/sections/AboutSection";
import FreeToolSection from "./components/sections/FreeToolSection";
import PartnerCTASection from "./components/sections/PartnerCTASection";
import StickyCTA from "./components/StickyCTA";
import JsonLd from "./components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main>
        <HeroSection />
        <ReserveNaviSpotlightSection />
        <ProductSeriesSection />
        <AboutSection />
        <FreeToolSection />
        <PartnerCTASection />
      </main>
      <Footer />
      <StickyCTA
        primaryHref="https://www.fujimin-pass.com/register"
        primaryLabel="無料で始める"
        secondaryHref="https://lin.ee/UPArZn9"
        secondaryLabel="LINE相談"
        caption="1分で登録・いつでも解約OK"
      />
    </>
  );
}
