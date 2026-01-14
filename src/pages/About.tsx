import Layout from '@/components/layout/Layout';

const pillars = [
  {
    number: '01',
    title: 'Our Purpose',
    description: 'To democratize access to intelligent career guidance and prepare learners for the rapidly evolving job market through AI-powered education.',
    image: 'photo-1521737604893-d14cc237f11d',
  },
  {
    number: '02',
    title: 'The Problem We Solve',
    description: 'Traditional career counseling is generic, expensive, and often disconnected from industry needs. We bridge this gap with personalized, data-driven guidance.',
    image: 'photo-1545239351-1141bd82e8a6',
  },
  {
    number: '03',
    title: 'Our AI-Driven Approach',
    description: 'We leverage explainable, ethical AI to analyze individual profiles and match them with optimal career paths, ensuring transparency in every recommendation.',
    image: 'photo-1523475472560-d2df97ec485c',
  },
  {
    number: '04',
    title: 'Long-Term Vision',
    description: 'To become the global standard in AI-powered career guidance, enabling millions of learners to achieve their full potential.',
    image: 'photo-1529333166437-7750a6dd5a70',
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="container-wide mx-auto">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <div data-reveal className="space-y-8">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/70 backdrop-blur-md text-sm uppercase tracking-[0.25em] text-accent shine-on-hover">
                <span className="size-2 rounded-full bg-accent" /> About Us
              </div>
              <div className="space-y-6">
                <h1 className="max-w-4xl text-balance">Where intelligence, storytelling, and mentorship converge</h1>
                <p className="text-lg text-foreground/75 max-w-2xl leading-relaxed">
                  TarkAI EdTech experiments with language models, mentor insight, and cinematic learning design. Our
                  work is oriented toward supporting learners with clarity and confidence as they navigate new career
                  possibilities.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-foreground/50" data-reveal>
                <span className="px-4 py-2 rounded-full bg-secondary/50 border border-secondary/70">AI-Driven Insights</span>
                <span className="px-4 py-2 rounded-full bg-secondary/50 border border-secondary/70">Mentor Network</span>
                <span className="px-4 py-2 rounded-full bg-secondary/50 border border-secondary/70">Global Vision</span>
              </div>
            </div>

            <div className="relative" data-reveal>
              <div className="absolute -top-12 -right-10 w-44 h-44 bg-accent/20 blur-3xl" />
              <div className="absolute bottom-6 -left-12 w-40 h-40 bg-primary/15 blur-2xl" />

              <div className="relative overflow-hidden rounded-[36px] border border-white/40 shadow-[0_40px_100px_-60px_rgba(15,23,42,0.55)]">
                <img
                  src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=80"
                  alt="TarkAI leadership collaborating"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white space-y-3">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/70">Inside TarkAI</p>
                  <h3 className="text-2xl font-semibold">Research sprints, storyboarding labs, and mentor roundtables</h3>
                </div>
              </div>

              <div className="absolute -bottom-12 right-6 w-48">
                <div className="panel-glass panel-ambient rounded-3xl p-5 shadow-xl backdrop-blur-xl border border-white/50">
                  <p className="text-xs uppercase tracking-[0.3em] text-accent/80 mb-3">Snapshot</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Community workshops · Mentor circles · Learners across multiple regions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="container-wide mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="relative overflow-hidden rounded-[32px] border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_30px_70px_-50px_rgba(15,23,42,0.6)] group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent" />

                <div className="relative grid gap-6 p-8 md:grid-cols-[0.7fr_1.3fr] items-center">
                  <div className="rounded-[26px] overflow-hidden shadow-xl border border-white/60">
                    <img
                      src={`https://images.unsplash.com/${pillar.image}?auto=format&fit=crop&w=900&q=80`}
                      alt={pillar.title}
                      className="w-full h-44 object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="space-y-4">
                    <span className="text-xs uppercase tracking-[0.3em] text-accent/80">0{pillar.number}</span>
                    <h3 className="text-2xl md:text-3xl text-balance group-hover:text-accent transition-colors duration-300">
                      {pillar.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative px-6 md:px-12 lg:px-20 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
            alt="Mission backdrop"
            className="w-full h-full object-cover opacity-40"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/70" />
        </div>

        <div className="container-wide mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-accent mb-6">Our Mission</p>
            <p className="text-2xl md:text-3xl leading-relaxed text-foreground" style={{ fontFamily: 'Instrument Serif, serif' }}>
              "To empower every learner with AI-driven insights that illuminate their unique path to success, making world-class career guidance accessible, personalized, and actionable."
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
