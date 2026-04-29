import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UnansweredCalls from "@/components/UnansweredCalls";
import ProblemStrip from "@/components/ProblemStrip";
import SolutionFlow from "@/components/SolutionFlow";
import WhyGetXM from "@/components/WhyGetXM";
import ComparisonTable from "@/components/ComparisonTable";
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
        <SolutionFlow />
        <WhyGetXM />
        <ComparisonTable />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
