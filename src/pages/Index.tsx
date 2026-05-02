import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UnansweredCalls from "@/components/UnansweredCalls";
import SolutionFlow from "@/components/SolutionFlow";
import OnboardingFlow from "@/components/OnboardingFlow";
import WhyGetXM from "@/components/WhyGetXM";
import PricingContact from "@/components/PricingContact";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <UnansweredCalls />
        <SolutionFlow />
        <OnboardingFlow />
        <WhyGetXM />
        <PricingContact />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
