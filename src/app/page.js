import Hero from "@/components/Hero";
import MobileHero from "@/components/MobileHero";
import PortfolioHeader from "@/components/header";
import Work from "@/components/Work";
import MobileWork from "@/components/MobileWork";
import MyStack from "@/components/MyStack";
import ImageGallery from "@/components/ImageGallery";
import Footer from "@/components/contact";
import AboutExperience from "./about/AboutExperience";

export default function Page() {
  return (
    <main className="min-h-screen bg-black">
      <PortfolioHeader />
      <Hero />
      <MobileHero />
      <Work />
      <MobileWork />
      <MyStack />
      <AboutExperience />
      <ImageGallery />
      <Footer />
    </main>
  );
}