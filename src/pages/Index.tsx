import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UnansweredCalls from "@/components/UnansweredCalls";
import ProblemStrip from "@/components/ProblemStrip";
import WhyGetXM from "@/components/WhyGetXM";
import LostCallsBento from "@/components/LostCallsBento";
import ResultsBento from "@/components/ResultsBento";
import ComparisonTable from "@/components/ComparisonTable";
import Pricing from "@/components/Pricing";
import BookDemo from "@/components/BookDemo";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <UnansweredCalls />
        <ProblemStrip />
        <WhyGetXM />
        <LostCallsBento />
        <ResultsBento />
        <ComparisonTable />
        <Pricing />
        <BookDemo />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
