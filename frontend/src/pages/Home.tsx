import Footer from "../components/home/layout/Footer";
import Header from "../components/home/layout/Header";
import Features from "../components/home/sections/Features";
import Hero from "../components/home/sections/Hero";
import LoyaltyPrograms from "../components/home/sections/LoyaltyPrograms";
import Merchants from "../components/home/sections/Merchants";
import RevitalizeLoyalty from "../components/home/sections/RevitalizeLoyalty";


function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <LoyaltyPrograms />
      <Merchants />
      <RevitalizeLoyalty />
      <Footer />
    </div>
  );
}

export default Home;