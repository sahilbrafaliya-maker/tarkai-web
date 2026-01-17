import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Sparkles, Compass, Brain } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';

const steps = ['Profile', 'Assessment', 'Analysis', 'Results'];

const AICareerGuider = () => {
  const { isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [profileData, setProfileData] = useState({
    education: '',
    currentRole: '',
    interests: '',
    goals: '',
  });
  const highlightCards = [
    {
      icon: Sparkles,
      title: 'Interactive intake',
      description: 'Adaptive prompts respond to what you share so the portal feels conversational.',
    },
    {
      icon: Compass,
      title: 'Guided checkpoints',
      description: 'Four short stages help you reflect on skills, goals, and interests at a relaxed pace.',
    },
    {
      icon: Brain,
      title: 'Insight snapshots',
      description: 'Recommendations surface as starting points you can refine with mentors and peers.',
    },
  ];
  const progressPercent = (currentStep / (steps.length - 1)) * 100;

  // Auth Gate
  if (!isAuthenticated) {
    return (
      <Layout>
        <section className="min-h-[80vh] flex items-center px-6 md:px-12 lg:px-20 pt-20">
          <div className="container-wide mx-auto">
            <div className="max-w-xl mx-auto text-center">
              <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4">Access Required</p>
              <h1 className="text-4xl md:text-5xl mb-6">Sign in to Continue</h1>
              <div className="divider-accent mx-auto mb-8" />
              <p className="text-foreground/70 mb-10 leading-relaxed">
                Please sign in to access AI Career Guidance. Create an account to start your personalized career journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/login">
                  <Button variant="hero">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="heroOutline">Sign Up</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      setIsProcessing(true);
      setCurrentStep(2);
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep(3);
      }, 3000);
    } else if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>AI Career Guidance Portal | Intelligent Career Roadmaps – TARK AI</title>
        <meta name="description" content="AI Career Guidance Portal for Future Careers. Get personalized AI-powered career roadmaps, intelligent skill mapping, and career path recommendations." />
        <meta name="keywords" content="AI Career Guidance Portal, AI Career Assessment, AI Career Roadmap, Intelligent Career Guidance, AI Skill Mapping, AI-Based Career Planning" />
        <link rel="canonical" href="https://tarkaiedtech.com/ai-career-guider" />
      </Helmet>
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="container-wide mx-auto space-y-16">
          {/* Hero */}
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <div data-reveal className="space-y-10">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/70 backdrop-blur-md text-sm uppercase tracking-[0.25em] text-accent shine-on-hover">
                <span className="size-2 rounded-full bg-accent" /> AI Career Guider
              </div>
              <div className="space-y-6">
                <h1 className="max-w-3xl text-balance text-4xl md:text-5xl">
                  Navigate your next career step with a calm, guided AI companion
                </h1>
                <p className="text-lg text-foreground/70 leading-relaxed max-w-2xl">
                  Share a quick snapshot of your background, explore skills in focus, and receive starting-point
                  recommendations you can fine-tune with mentors. Everything is designed to feel exploratory, not
                  prescriptive.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3" data-reveal>
                {highlightCards.map((card) => (
                  <div
                    key={card.title}
                    className="panel-glass panel-ambient rounded-2xl p-5 border border-white/60 bg-white/75 backdrop-blur-xl flex flex-col gap-3"
                  >
                    <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-foreground/50">
                      <card.icon className="w-4 h-4" />
                      {card.title}
                    </div>
                    <p className="text-sm text-foreground/65 leading-relaxed">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative" data-reveal>
              <div className="absolute -top-12 -right-10 w-44 h-44 bg-accent/20 blur-3xl" />
              <div className="absolute bottom-6 -left-12 w-40 h-40 bg-primary/15 blur-2xl" />

              <div className="relative overflow-hidden rounded-[36px] border border-white/40 shadow-[0_40px_100px_-60px_rgba(15,23,42,0.55)]">
                <img
                  src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80"
                  alt="Learner exploring AI guidance dashboard"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white space-y-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/70">Guidance Snapshot</p>
                  <h3 className="text-2xl font-semibold">Scenario-based prompts and evolving recommendation boards</h3>
                </div>
              </div>

              <div className="absolute -bottom-12 right-6 w-52">
                <div className="panel-glass panel-ambient rounded-3xl p-5 shadow-xl backdrop-blur-xl border border-white/60">
                  <p className="text-xs uppercase tracking-[0.3em] text-accent/80 mb-3">Planned Flow</p>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    Intake → Skills pulse → AI digest → Mentor review hooks
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-12 text-center" data-reveal>
              <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4">Guided Flow</p>
              <h2 className="text-3xl md:text-4xl text-balance">Complete a four-step snapshot at your own pace</h2>
            </div>

            {/* Progress */}
            <div className="mb-16" data-reveal>
              <div className="relative h-1 bg-border/60 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-accent transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-foreground/40">
                {steps.map((step, index) => (
                  <span key={step} className={currentStep >= index ? 'text-foreground' : ''}>
                    {step}
                  </span>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="min-h-[400px]">
              {currentStep === 0 && (
                <div className="space-y-8 animate-fade-in">
                  <h2 className="text-2xl md:text-3xl mb-8">Tell us about yourself</h2>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-foreground/40 mb-3">
                      Highest Education Level
                    </label>
                    <Input
                      name="education"
                      value={profileData.education}
                      onChange={handleProfileChange}
                      className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
                      placeholder="e.g., Bachelor's in Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-foreground/40 mb-3">
                      Current Role / Status
                    </label>
                    <Input
                      name="currentRole"
                      value={profileData.currentRole}
                      onChange={handleProfileChange}
                      className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground"
                      placeholder="e.g., Student, Software Developer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-foreground/40 mb-3">
                      Key Interests & Passions
                    </label>
                    <Textarea
                      name="interests"
                      value={profileData.interests}
                      onChange={handleProfileChange}
                      className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground resize-none"
                      placeholder="What topics excite you?"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-foreground/40 mb-3">
                      Career Goals
                    </label>
                    <Textarea
                      name="goals"
                      value={profileData.goals}
                      onChange={handleProfileChange}
                      className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground resize-none"
                      placeholder="Where do you see yourself in 5 years?"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-8 animate-fade-in">
                  <h2 className="text-2xl md:text-3xl mb-8">Skills Assessment</h2>
                  <p className="text-foreground/60 mb-8">Rate your proficiency (1-5)</p>
                  {['Analytical Thinking', 'Communication', 'Technical Skills', 'Creativity', 'Leadership'].map((skill) => (
                    <div key={skill} className="flex items-center justify-between py-4 border-b border-border">
                      <span>{skill}</span>
                      <div className="flex gap-3">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            className="w-10 h-10 border border-border hover:border-accent hover:text-accent transition-colors text-sm"
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {currentStep === 2 && (
                <div className="text-center py-20 animate-fade-in">
                  <div className="mb-8">
                    <div className="w-1 h-16 bg-accent mx-auto animate-pulse" />
                  </div>
                  <h2 className="text-2xl md:text-3xl mb-4">Analyzing Your Profile</h2>
                  <p className="text-foreground/60">
                    Our AI is processing your information...
                  </p>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl mb-4">Your Career Recommendations</h2>
                    <p className="text-foreground/60">Based on your profile and assessment</p>
                  </div>

                  <div className="space-y-6">
                    {[
                      { title: 'AI/ML Engineer', match: 92, description: 'High alignment with technical skills and interests' },
                      { title: 'Data Scientist', match: 87, description: 'Strong analytical foundation' },
                      { title: 'Product Manager (Tech)', match: 78, description: 'Good balance of technical and communication skills' },
                    ].map((career) => (
                      <div key={career.title} className="py-6 border-b border-border group">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl group-hover:text-accent transition-colors">{career.title}</h3>
                          <span className="text-accent font-medium">{career.match}%</span>
                        </div>
                        <p className="text-foreground/60 text-sm">{career.description}</p>
                        <div className="mt-4 h-px bg-border">
                          <div className="h-full bg-accent transition-all duration-500" style={{ width: `${career.match}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-8">
                    <Link to="/programs">
                      <Button variant="hero">
                        Explore Learning Paths
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            {currentStep < 2 && (
              <div className="flex justify-between mt-12 pt-8 border-t border-border">
                <Button
                  variant="minimal"
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                  className={currentStep === 0 ? 'opacity-0' : ''}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button variant="hero" onClick={handleNextStep}>
                  {currentStep === 1 ? 'Analyze' : 'Next'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Disclaimer */}
            <p className="text-xs text-foreground/40 text-center mt-16">
              AI recommendations are guidance-based and should be used as decision support, not absolute advice.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AICareerGuider;
