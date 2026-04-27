import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemStrip from "@/components/ProblemStrip";
import HowItWorks from "@/components/HowItWorks";
import PhoneDemo from "@/components/PhoneDemo";
import Outcomes from "@/components/Outcomes";
import LostCallsBento from "@/components/LostCallsBento";
import ComparisonTable from "@/components/ComparisonTable";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <ProblemStrip />
        <HowItWorks />
        <PhoneDemo />
        <Outcomes />
        <LostCallsBento />
        <ComparisonTable />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
