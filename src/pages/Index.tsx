import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import ProgramsSpotlightSection from '@/components/home/ProgramsSpotlightSection';
import WhyTarkAISection from '@/components/home/WhyTarkAISection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ProgramsSpotlightSection />
      <WhyTarkAISection />
    </Layout>
  );
};

export default Index;
