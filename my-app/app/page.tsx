import Image from "next/image";
import Navbar from "./components/navbar";
import ServiceCard from "./components/services";
import CTASection from "./components/ctasection";
import Footer from "./components/footer";
import HeroSlider from "./components/hero";
import TruckFlyIn from "./components/TruckFlyIn";
export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSlider />
      <ServiceCard />
      <TruckFlyIn />
      <CTASection />
      

      <Footer />

    </div>
  );
}
