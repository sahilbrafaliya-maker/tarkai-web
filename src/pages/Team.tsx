import Layout from '@/components/layout/Layout';

const leadership = [
  {
    role: 'Chief Executive Officer (CEO)',
    name: 'Sahil Rafaliya',
    credentials: [
      'M.Sc. Data Science (Climate Data Analytics)',
      'Indian Institute of Information Technology, Lucknow',
    ],
    bio: 'Sahil leads TarkAI EdTech with a strong foundation in data science, climate analytics, and AI systems. He drives vision, strategy, and product direction while scaling impact-driven AI education.',
    image: '/images/team/sahil-rafaliya.jpg',
  },
  {
    role: 'Executive Vice President (EVP)',
    name: 'Kashish Nagar',
    credentials: [
      'M.Sc. Artificial Intelligence & Machine Learning',
      'Indian Institute of Information Technology, Lucknow',
    ],
    bio: 'Kashish oversees strategic execution, partnerships, and cross-functional alignment. He converts AI/ML innovation into structured academic and industry-ready programs.',
    image: '/images/team/kashish-nagar.jpg',
  },
  {
    role: 'Chief Technology Officer (CTO)',
    name: 'Gautam Hadiya',
    credentials: ['Technology Leadership', 'Product Architecture & AI Systems'],
    bio: 'Gautam heads the technology roadmap—platform architecture, AI system design, scalability, and ensuring robust, secure, future-ready infrastructure.',
    image: '/images/team/gautam-hadiya.jpg',
  },
  {
    role: 'Chief Financial Officer (CFO)',
    name: 'Smit Bokha',
    credentials: ['Strategic Finance', 'Compliance & Data-driven Insights'],
    bio: 'Smit manages financial planning, budgeting, and compliance. He provides transparent operations and strategic, data-backed decision support.',
    image: '/images/team/smit-bokha.jpg',
  },
  {
    role: 'Chief Operating Officer (COO)',
    name: 'Harshil Mangroliya',
    credentials: ['Operations Leadership', 'Process Optimization'],
    bio: 'Harshil oversees daily operations, process optimization, and execution efficiency—aligning teams and ensuring high-quality delivery across verticals.',
    // image: '/images/team/harshil-mangroliya.jpg',
  },
];

const cultureHighlights = [
  {
    title: 'Mentor-powered learning',
    description: 'Industry mentors host critiques and alumni circles so the journey stays human-backed.',
    image: 'photo-1529333166437-7750a6dd5a70',
  },
  {
    title: 'Applied research labs',
    description: 'We prototype with LLMs, climate intelligence, and human-centered design to explore what is next.',
    image: 'photo-1523475472560-d2df97ec485c',
  },
  {
    title: 'Career outcomes obsessed',
    description: 'Placement mentorship, storytelling workshops, and employer showcases are woven into each cohort.',
    image: 'photo-1522071820081-009f0129c71c',
  },
];

const Team = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="container-wide mx-auto">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <div data-reveal className="space-y-8">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/70 backdrop-blur-md text-sm uppercase tracking-[0.25em] text-accent shine-on-hover">
                <span className="size-2 rounded-full bg-accent" /> Our People
              </div>
              <div className="space-y-6">
                <h1 className="max-w-3xl text-balance">The leadership building TarkAI’s intelligent education future</h1>
                <p className="text-lg text-foreground/75 leading-relaxed max-w-2xl">
                  Meet the founders, technologists, and operators steering TarkAI. Each brings deep expertise across AI,
                  data science, finance, and operations to craft learning journeys that feel human, cinematic, and the
                  opposite of generic.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.3em] text-foreground/50" data-reveal>
                <span className="px-4 py-2 rounded-full bg-secondary/50 border border-secondary/70">AI Strategy</span>
                <span className="px-4 py-2 rounded-full bg-secondary/50 border border-secondary/70">Product & Ops</span>
                <span className="px-4 py-2 rounded-full bg-secondary/50 border border-secondary/70">Financial Stewardship</span>
              </div>
            </div>

            <div className="relative" data-reveal>
              <div className="absolute -top-12 -right-10 w-44 h-44 bg-accent/20 blur-3xl" />
              <div className="absolute bottom-6 -left-12 w-40 h-40 bg-primary/15 blur-2xl" />

              <div className="relative overflow-hidden rounded-[36px] border border-white/40 shadow-[0_40px_100px_-60px_rgba(15,23,42,0.55)]">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                  alt="TarkAI leadership collab"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/65 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white space-y-3">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/70">Leadership Studio</p>
                  <h3 className="text-2xl font-semibold">Weekly strategy sprints · Product demos · Mentor councils</h3>
                </div>
              </div>

              <div className="absolute -bottom-12 right-6 w-48">
                <div className="panel-glass panel-ambient rounded-3xl p-5 shadow-xl backdrop-blur-xl border border-white/50">
                  <p className="text-xs uppercase tracking-[0.3em] text-accent/80 mb-3">Snapshot</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    HQ in Ahmedabad · Remote-first teams · Learners supported across regions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Grid */}
      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="container-wide mx-auto">
          <div className="mb-16" data-reveal>
            <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4">Core Leadership</p>
            <h2 className="text-balance max-w-3xl">People who blend AI intelligence with real-world execution</h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-2" data-reveal>
            {leadership.map((leader, index) => (
              <div
                key={leader.name}
                className="relative overflow-hidden rounded-[32px] border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_30px_70px_-50px_rgba(15,23,42,0.6)]"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent" />

                <div className="relative grid gap-8 p-8 md:grid-cols-[0.8fr_1.2fr] items-start">
                  <div className="space-y-6">
                    <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden border border-white/60 shadow-xl">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white text-xs uppercase tracking-[0.3em]">
                        {/* Replace the image path above with your team member photos */}
                        Portrait Ready
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-xs uppercase tracking-[0.3em] text-foreground/60">
                      {leader.role}
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <h3 className="text-2xl md:text-3xl mb-2 text-balance">{leader.name}</h3>
                      <ul className="space-y-1 text-sm text-foreground/50">
                        {leader.credentials.map((credential) => (
                          <li key={credential}>{credential}</li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-sm md:text-base text-foreground/70 leading-relaxed">{leader.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Highlights */}
      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="container-wide mx-auto">
          <div className="mb-14" data-reveal>
            <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4">How We Operate</p>
            <h2 className="text-balance max-w-3xl">Culture crafted around mentorship, research, and outcomes</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3" data-reveal>
            {cultureHighlights.map((highlight, index) => (
              <div
                key={highlight.title}
                className="relative overflow-hidden rounded-[28px] border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_20px_60px_-45px_rgba(15,23,42,0.5)]"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                <img
                  src={`https://images.unsplash.com/${highlight.image}?auto=format&fit=crop&w=900&q=80`}
                  alt={highlight.title}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white space-y-3">
                  <h3 className="text-lg font-semibold text-balance">{highlight.title}</h3>
                  <p className="text-sm text-white/80 leading-relaxed">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Team;
