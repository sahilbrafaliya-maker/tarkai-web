import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import ProgramsSpotlightSection from '@/components/home/ProgramsSpotlightSection';
import WhyTarkAISection from '@/components/home/WhyTarkAISection';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>AI Career Guidance Platform | AI-Powered Education – TARK AI</title>
        <meta name="description" content="TARK AI is an AI-powered EdTech platform delivering intelligent career guidance, personalized roadmaps, and future-ready AI programs." />
        <meta name="keywords" content="AI Career Guidance Platform, AI EdTech Platform, AI-Powered Education, AI Career Counseling, AI Career Navigator" />
        <link rel="canonical" href="https://tarkaiedtech.com/" />
      </Helmet>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ProgramsSpotlightSection />
      <WhyTarkAISection />
    </Layout>
  );
};

export default Index;
