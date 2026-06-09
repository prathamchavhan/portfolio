
import Hero from "@/components/Hero";
import PortfolioHeader from "@/components/header";
import Work from "@/components/Work";
import About from "@/components/About";
import Footer from "@/components/contact";

export default function Page() {
  return (
    <div>
      <PortfolioHeader />
      <Hero />
      <Work />
      <About />
      <Footer />
    </div>
  );
}