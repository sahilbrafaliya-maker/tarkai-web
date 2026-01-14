const features = [
  {
    number: '01',
    title: '360° Career Diagnosis',
    description: 'Answer a cinematic intake that blends psychometrics, aptitude, and ambition into a living profile.',
    image: 'photo-1521737604893-d14cc237f11d',
  },
  {
    number: '02',
    title: 'Adaptive AI Roadmaps',
    description: 'Watch the portal stitch together modules, mentors, and milestones that flex with every new data point.',
    image: 'photo-1523475472560-d2df97ec485c',
  },
  {
    number: '03',
    title: 'Human-in-the-loop Mentoring',
    description: 'Industry coaches review your plan, annotate next moves, and track your momentum inside the portal.',
    image: 'photo-1504384308090-c894fdcc538d',
  },
];

const FeaturesSection = () => {
  return (
    <section className="section-padding border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/3 w-52 h-52 bg-accent/10 blur-3xl animate-blob" />
        <div className="absolute bottom-10 right-1/4 w-60 h-60 bg-primary/10 blur-[90px] animate-blob" style={{ animationDelay: '8s' }} />
      </div>

      <div className="container-wide mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-20" data-reveal>
          <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4">Career Guidance Portal</p>
          <h2 className="text-balance">Step Inside TarkAI Compass</h2>
        </div>

        {/* Feature Timeline */}
        <div className="relative">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/0 via-accent/40 to-accent/0" />

          <div className="space-y-12 md:space-y-16">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="relative flex flex-col md:flex-row md:items-center gap-8 md:gap-12 px-4 md:px-8"
                data-reveal
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute left-2 md:left-6 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-accent shadow-[0_0_0_6px_rgba(255,255,255,0.6)]" />

                <div className="md:w-1/3 lg:w-[30%]">
                  <div className="rounded-3xl overflow-hidden shadow-xl border border-white/50 bg-white/70 backdrop-blur-md animate-float-medium" style={{ animationDelay: `${1 + index * 0.5}s` }}>
                    <img
                      src={`https://images.unsplash.com/${feature.image}?auto=format&fit=crop&w=900&q=80`}
                      alt={feature.title}
                      className="w-full h-48 md:h-56 object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="flex-1 panel-glass panel-ambient rounded-3xl p-8 md:p-10 lg:p-12 shine-on-hover">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-sm uppercase tracking-[0.3em] text-accent/80">{feature.number}</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-accent/60 via-accent/20 to-transparent" />
                  </div>
                  <h3 className="text-2xl md:text-3xl mb-4 text-balance">{feature.title}</h3>
                  <p className="text-foreground/60 max-w-xl leading-relaxed">{feature.description}</p>

                  <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-foreground/50">
                    <span className="px-4 py-1 rounded-full bg-white/60 border border-white/70">AI Enhanced</span>
                    <span className="px-4 py-1 rounded-full bg-white/60 border border-white/70">Mentor Backed</span>
                    <span className="px-4 py-1 rounded-full bg-white/60 border border-white/70">Immersive</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
