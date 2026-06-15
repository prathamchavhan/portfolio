import Hero from "@/components/Hero";
import PortfolioHeader from "@/components/header";
import Work from "@/components/Work";
import MyStack from "@/components/MyStack";
import ImageGallery from "@/components/ImageGallery";
import Footer from "@/components/contact";
import AboutExperience from "./about/AboutExperience";

export default function Page() {
  return (
    <main className="min-h-screen bg-black">
      <PortfolioHeader />
      <Hero />
      <Work />
      <MyStack />
      <AboutExperience />
      <ImageGallery />
      <Footer />
    </main>
  );
}