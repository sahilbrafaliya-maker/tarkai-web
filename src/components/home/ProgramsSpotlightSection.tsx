import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const programs = [
  {
    id: 'ai-ml-architect',
    title: 'AI / ML Architect Program',
    duration: '7 Months · Placement Mentorship',
    summary:
      'From intelligent databases to agentic systems—craft full-stack AI experiences that are production ready.',
    highlights: ['Full-stack ML systems', 'LLM fine-tuning & agent orchestration'],
  },
  {
    id: 'data-science',
    title: 'Data Science & Strategic Analytics',
    duration: '7 Months · Placement Mentorship',
    summary:
      'Transform noisy data into boardroom narratives and predictive models leaders can act on instantly.',
    highlights: ['Analytics storytelling', 'Spark-powered ML pipelines'],
  },
  {
    id: 'future-founders',
    title: 'Future Founders – AI Foundation',
    duration: '2 Months',
    summary:
      'A playful launchpad for teens and first-time builders to code, analyze, and present their first AI ideas.',
    highlights: ['Creative coding sprints', 'Responsible AI mindset'],
  },
  {
    id: 'green-intelligence',
    title: 'Green Intelligence – Climate Analytics',
    duration: '2 Months',
    summary:
      'Decode carbon markets, architect ESG dashboards, and advise on climate-positive strategies with data.',
    highlights: ['Emission analytics', 'Carbon market storytelling'],
  },
];

const ProgramsSpotlightSection = () => {
  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 border-t border-border">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-12 left-1/4 w-64 h-64 bg-accent/10 blur-[110px] animate-blob" />
        <div className="absolute bottom-12 right-1/5 w-56 h-56 bg-primary/10 blur-[120px] animate-blob" style={{ animationDelay: '6s' }} />
      </div>

      <div className="container-wide mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16" data-reveal>
          <div className="space-y-5 max-w-2xl">
            <p className="text-sm uppercase tracking-[0.2em] text-accent">Signature Programs</p>
            <h2 className="text-balance">Industry-Aligned AI Education Programs</h2>
            <p className="text-foreground/65 leading-relaxed">
              Each cohort blends studio-like projects, cinematic lessons, and embedded mentorship. Start with our{' '}
              <Link to="/ai-career-guider" className="text-accent hover:text-accent/80 underline">AI career guidance platform</Link>
              {' '}and when you are ready, drop into a program that keeps the momentum flowing.
            </p>
          </div>

          <Link to="/programs">
            <Button variant="heroOutline" size="lg" className="shine-on-hover">
              View Detailed Roadmaps
              <ArrowRight className="w-4 h-4 ml-3" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2" data-reveal>
          {programs.map((program, index) => (
            <div
              key={program.id}
              className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/60 backdrop-blur-xl shadow-[0_40px_90px_-40px_rgba(15,23,42,0.45)] transition-transform duration-500 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent" />

              <div className="relative p-8 lg:p-10 space-y-6">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-foreground/50">
                  <Calendar className="w-4 h-4" />
                  {program.duration}
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl md:text-3xl text-balance">{program.title}</h3>
                  <p className="text-sm md:text-base text-foreground/70 leading-relaxed">{program.summary}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-foreground/50">
                  {program.highlights.map((highlight) => (
                    <span key={highlight} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-white/80">
                      <Target className="w-3.5 h-3.5" />
                      {highlight}
                    </span>
                  ))}
                </div>

                <Link to={`/programs#${program.id}`} className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors">
                  Explore syllabus
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSpotlightSection;
