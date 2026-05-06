import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SolutionFlow from "@/components/SolutionFlow";
import OnboardingFlow from "@/components/OnboardingFlow";
import UnansweredCalls from "@/components/UnansweredCalls";
import WhyGetXM from "@/components/WhyGetXM";
import Pricing from "@/components/Pricing";
import ClinicMatchTest from "@/components/ClinicMatchTest";
import FAQ from "@/components/FAQ";
import DemoBooking from "@/components/DemoBooking";
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
        <Pricing />
        <ClinicMatchTest />
        <FAQ />
        <DemoBooking />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
