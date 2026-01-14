import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Rocket, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const heroVisuals = {
  main: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80',
  detail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80',
  mentor: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
};

const HeroSection = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCTAClick = () => {
    if (isAuthenticated) {
      navigate('/ai-career-guider');
    } else {
      navigate('/login', { state: { from: '/ai-career-guider' } });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden px-6 md:px-12 lg:px-20 pt-24 pb-16 bg-gradient-to-br from-background via-background to-slate-100/60">
      <div className="absolute inset-y-0 right-0 hidden lg:block lg:w-1/2">
        <img
          src={heroVisuals.main}
          alt="Learners collaborating"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-background via-background/70 to-transparent" />
      </div>

      <div className="container-wide mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-center">
          <div className="space-y-10" data-reveal>
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/70 backdrop-blur-md text-sm uppercase tracking-[0.25em] text-accent shine-on-hover">
              <Sparkles className="w-4 h-4" /> AI-Powered Education
            </div>

            <div className="space-y-6">
              <h1 className="text-balance">Step Into TarkAI Compass — Your Living Career Navigator</h1>
              <p className="text-lg md:text-xl text-foreground/75 leading-relaxed max-w-2xl">
                Begin inside our AI career guidance portal where every answer, aptitude score, and ambition fuels a responsive storyline. From the first diagnostic pulse to mentor-approved roadmaps, TarkAI keeps you moving with clarity and cinematic energy.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" onClick={handleCTAClick} className="shine-on-hover">
                Launch Career Portal
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Link to="/programs" className="group">
                <Button variant="heroOutline" size="lg" className="shine-on-hover group-hover:border-accent/70">
                  Explore Programs
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" data-reveal>
              {[{
                icon: <Brain className="w-5 h-5" />, label: 'Intelligent Intake', caption: 'Adaptive profile builder'
              }, {
                icon: <Rocket className="w-5 h-5" />, label: 'Portal → Programs', caption: 'Instant course matching'
              }, {
                icon: <Sparkles className="w-5 h-5" />, label: 'Mentors On-Demand', caption: 'Industry feedback loops'
              }].map((item) => (
                <div key={item.label} className="panel-glass panel-ambient px-5 py-4 rounded-2xl flex flex-col gap-1 border border-white/40 shadow-sm" data-reveal>
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    {item.icon}
                    {item.label}
                  </div>
                  <p className="text-xs text-foreground/60 tracking-wide uppercase">{item.caption}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative" data-reveal>
            <div className="rounded-[28px] overflow-hidden shadow-xl border border-white/60 bg-white">
              <img
                src={heroVisuals.detail}
                alt="Immersive learning interface"
                className="w-full h-64 object-cover"
                loading="lazy"
              />
              <div className="p-6 space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-foreground/50">Mentor Perspective</p>
                <p className="text-base text-foreground/70 leading-relaxed">
                  “We remix AI insights with studio-style critiques so every learner can iterate on their next step.”
                </p>
                {/* <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-border">
                    <img src={heroVisuals.mentor} alt="Mentor portrait" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Aisha Fernandes</p>
                    <p className="text-xs text-foreground/50 uppercase tracking-widest">Program Mentor</p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
