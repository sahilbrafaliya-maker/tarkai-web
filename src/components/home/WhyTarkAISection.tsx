const reasons = [
  {
    title: 'AI transforms every workflow',
    description: 'Companies now ship AI copilots and agentic tools across finance, healthcare, and design. Teams need builders who can translate business queries into intelligent systems.',
    image: 'photo-1545239351-1141bd82e8a6',
  },
  {
    title: 'Data literacy is the new baseline',
    description: 'Leaders demand professionals who can clean, analyze, and narrate data fluidly. Those skills turn dashboards into decisions and experiments into revenue.',
    image: 'photo-1523475472560-d2df97ec485c',
  },
  {
    title: 'Talent gaps are widening fast',
    description: 'Over 70% of employers report difficulty hiring AI & analytics talent. Programmatic upskilling with mentorship is the quickest route to the front of the queue.',
    image: 'photo-1529333166437-7750a6dd5a70',
  },
];

const WhyTarkAISection = () => {
  return (
    <section className="section-padding border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-12 right-1/3 w-40 h-40 bg-primary/10 blur-3xl animate-blob" />
        <div className="absolute bottom-0 left-16 w-48 h-48 bg-accent/15 blur-[100px] animate-blob" style={{ animationDelay: '14s' }} />
      </div>

      <div className="container-wide mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column - Header */}
          <div className="lg:col-span-4 space-y-8" data-reveal>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4">Why Now</p>
              <h2 className="mb-6 text-balance">The Need for AI & Data Science Fluency</h2>
              <div className="divider-accent" />
            </div>

            <p className="text-foreground/65 leading-relaxed">
              Industries, governments, and startups are racing to operationalize intelligence. TarkAI helps you ride
              this wave strategically—starting with guidance inside the Compass portal and culminating in targeted
              programs that build hire-ready talent.
            </p>
          </div>

          {/* Right Column - Reasons */}
          <div className="lg:col-span-8 grid gap-10" data-reveal>
            {reasons.map((reason, index) => (
              <div
                key={reason.title}
                className="panel-glass panel-ambient rounded-[32px] p-6 md:p-8 lg:p-10 shine-on-hover relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-white/30 blur-3xl" />

                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white/70 border border-white/80 shadow-md flex items-center justify-center text-sm font-semibold text-accent">
                    0{index + 1}
                  </div>

                  <div className="flex-1 space-y-4">
                    <h3 className="text-xl md:text-2xl text-balance">{reason.title}</h3>
                    <p className="text-foreground/65 leading-relaxed">{reason.description}</p>

                    <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-foreground/50">
                      <span className="px-3 py-1 rounded-full bg-white/60 border border-white/80">AI Surge</span>
                      <span className="px-3 py-1 rounded-full bg-white/60 border border-white/80">Data-Driven</span>
                      <span className="px-3 py-1 rounded-full bg-white/60 border border-white/80">Mentored</span>
                    </div>
                  </div>

                  <div className="w-full md:w-48 lg:w-56 rounded-3xl overflow-hidden shadow-xl border border-white/60 animate-float-medium" style={{ animationDelay: `${index * 0.4 + 1}s` }}>
                    <img
                      src={`https://images.unsplash.com/${reason.image}?auto=format&fit=crop&w=900&q=80`}
                      alt={reason.title}
                      className="w-full h-40 object-cover"
                      loading="lazy"
                    />
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

export default WhyTarkAISection;
