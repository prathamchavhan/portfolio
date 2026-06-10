
import Hero from "@/components/Hero";
import PortfolioHeader from "@/components/header";
import Work from "@/components/Work";
import About from "@/components/About";
import MyStack from "@/components/MyStack";
import ImageGallery from "@/components/ImageGallery";
import Footer from "@/components/contact";

export default function Page() {
  return (
    <div>
      <PortfolioHeader />
      <Hero />
      <Work />
      <MyStack />
      <About />
      <ImageGallery />

      <Footer />
    </div>
  );
}