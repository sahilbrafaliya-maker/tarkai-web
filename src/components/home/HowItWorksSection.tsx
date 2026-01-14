const steps = [
  {
    step: '01',
    title: 'Spark the Portal',
    description: 'Drop your goals, skills, and sparks of curiosity. The intake animates a live skill graph in seconds.',
    image: 'photo-1522202176988-66273c2fd55f',
  },
  {
    step: '02',
    title: 'See the Pathway',
    description: 'TarkAI stitches a tailored roadmap, matching you to modules, mentors, and milestone timelines.',
    image: 'photo-1523475472560-d2df97ec485c',
  },
  {
    step: '03',
    title: 'Move With Mentors',
    description: 'Industry coaches review your progress, upgrade recommendations, and sync you with the right program cohort.',
    image: 'photo-1504384308090-c894fdcc538d',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="section-padding bg-secondary/40 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[22rem] h-[22rem] bg-primary/10 blur-3xl animate-blob" />
        <div className="absolute bottom-[-6rem] right-[-4rem] w-[20rem] h-[20rem] bg-accent/15 blur-2xl animate-blob" style={{ animationDelay: '10s' }} />
      </div>

      <div className="container-wide mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-16" data-reveal>
          <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4">How It Unfolds</p>
          <h2 className="text-balance">Three beats from clarity to momentum</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3" data-reveal>
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative rounded-[28px] border border-white/50 bg-white/70 backdrop-blur-xl p-8 md:p-10 flex flex-col gap-6 shine-on-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-accent/80">
                <span className="w-10 h-10 rounded-full border border-accent/30 flex items-center justify-center text-sm font-semibold text-accent">
                  {step.step}
                </span>
                Portal Sequence
              </div>

              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl text-balance">{step.title}</h3>
                <p className="text-sm md:text-base text-foreground/65 leading-relaxed">{step.description}</p>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-lg border border-white/60">
                <img
                  src={`https://images.unsplash.com/${step.image}?auto=format&fit=crop&w=900&q=80`}
                  alt={step.title}
                  className="w-full h-36 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
