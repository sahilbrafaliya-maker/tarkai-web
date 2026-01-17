import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';

const programs = [
  {
    id: 'ai-ml-architect',
    title: 'AI / ML Architect Program',
    subtitle: 'Full-Stack Artificial Intelligence Engineering',
    duration: '7 Months',
    overview:
      'A flagship 6-month immersion that builds rock-solid data foundations, levels up your model intuition, and ends with production-ready LLM and agentic systems.',
    coverImage: 'photo-1526374965328-7f61d4dc18c5',
    takeaways: [
      'Design resilient data backbones with relational, NoSQL, and optimized SQL workflows.',
      'Build, evaluate, and tune machine learning systems that hold up in real-world product sprints.',
      'Fine-tune large language models and orchestrate agentic AI experiences ready for deployment.',
    ],
    timeline: [
      {
        label: 'Months 1 — 2',
        title: 'Architect your data core',
        description:
          'Model complex domains, normalize data, and write blazing-fast SQL while mastering Python, NumPy, and Pandas for intelligent data flows.',
        topics: ['DBMS & Data Models', 'SQL Mastery', 'Python Foundations', 'Math & Statistics'],
      },
      {
        label: 'Months 3 — 4',
        title: 'Ship applied machine learning',
        description:
          'Crack supervised and unsupervised learning, manage bias-variance tradeoffs, and build pipelines that deliver measurable lift.',
        topics: ['Regression & Classification', 'Model Evaluation', 'Feature Engineering'],
      },
      {
        label: 'Months 5 — 6',
        title: 'LLMs, agents & MLOps readiness',
        description:
          'Engineer neural architectures, fine-tune LLMs with PEFT, orchestrate agentic systems, and prep deployments with modern MLOps.',
        topics: ['CNN & RNN Architectures', 'Transformers & GPT', 'Fine-Tuning & LoRA', 'Agentic AI', 'Cloud & MLOps'],
      },
      {
        label: 'Month 7',
        title: 'Placement-ready mentorship',
        description:
          'Pair with working professionals for mock interviews, portfolio audits, and on-the-job shadowing that translates projects into offers.',
        topics: ['Mock Interviews', 'Portfolio Reviews', 'Career Strategy', 'Industry Shadowing'],
      },
    ],
  },
  {
    id: 'data-science',
    title: 'Data Science & Strategic Analytics',
    subtitle: 'From Raw Data to Business Intelligence',
    duration: '7 Months',
    overview:
      'Transform into the data partner every leadership team craves—tell compelling stories with data, automate insight pipelines, and launch ML-powered decisions.',
    coverImage: 'photo-1556740749-887f6717d7e4',
    takeaways: [
      'Command Python, SQL, and data tooling to cleanse, enrich, and activate information fast.',
      'Explain statistical evidence with clarity so stakeholders trust every recommendation.',
      'Ship dashboards and predictive models that move business metrics and answer “what happens next?”.',
    ],
    timeline: [
      {
        label: 'Months 1 — 2',
        title: 'Programming & data fluency',
        description:
          'Move from syntax to shipping scripts—master Python, versioned notebooks, and SQL joins while automating messy data workflows.',
        topics: ['Python Foundations', 'NumPy & Pandas', 'SQL Queries', 'Data Cleaning'],
      },
      {
        label: 'Months 3 — 4',
        title: 'Analytical intuition & storytelling',
        description:
          'Build quantitative intuition for experiments, AB tests, and forecasting, then translate raw datasets into boardroom-ready narratives.',
        topics: ['Linear Algebra', 'Probability & Distributions', 'Hypothesis Testing', 'EDA Playbooks', 'Visualization Craft'],
      },
      {
        label: 'Months 5 — 6',
        title: 'Predictive modeling & capstone launch',
        description:
          'Prototype predictive models, tune them with cross-validation, scale analytics with Spark, and present a stakeholder-ready capstone.',
        topics: ['ML Workflow', 'Tree-Based Models', 'Gradient Boosting', 'Spark Basics', 'Capstone Presentation'],
      },
      {
        label: 'Month 7',
        title: 'Placement-ready mentorship',
        description:
          'Work with analytics leaders on interview drills, case study storytelling, and employer-aligned project packaging.',
        topics: ['Mock Interviews', 'Case Study Narratives', 'Resume & Portfolio', 'Career Coaching'],
      },
    ],
  },
  {
    id: 'future-founders',
    title: 'Future Founders – AI Foundation',
    subtitle: 'Digital Literacy & Coding',
    duration: '2 Months',
    overview:
      'A playful-yet-powerful launchpad for teens and first-time builders—learn digital fluency, code creatively, and demo AI ideas with confidence.',
    coverImage: 'photo-1523580846011-d3a5bc25702b',
    takeaways: [
      'Think like a problem solver using algorithms, flowcharts, and structured creativity.',
      'Code in Scratch and Python to turn ideas into interactive projects and data explorations.',
      'Understand AI ethics, real-world careers, and present a mini product with flair.',
    ],
    timeline: [
      {
        label: 'Month 1',
        title: 'Digital literacy & first builds',
        description:
          'Discover how data powers everything, storyboard ideas with flowcharts, and launch interactive Scratch creations.',
        topics: ['Data Types & Sources', 'Everyday AI', 'Algorithms & Flowcharts', 'Scratch Logic'],
      },
      {
        label: 'Month 2',
        title: 'Python sparks & AI showcase',
        description:
          'Explore Python notebooks, wrangle simple datasets, debate responsible AI, and present a mini project with confidence.',
        topics: ['Python Basics', 'List Handling', 'Responsible AI', 'Mini Project Presentation'],
      },
    ],
  },
  {
    id: 'green-intelligence',
    title: 'Green Intelligence – Climate Analytics',
    subtitle: 'Carbon Markets & ESG',
    duration: '2 Months',
    overview:
      'Blend climate science with data craftsmanship to decode carbon markets, verify emissions, and advise on ESG action plans.',
    coverImage: 'photo-1522202176988-66273c2fd55f',
    takeaways: [
      'Interpret climate indicators and emission datasets to surface risk and opportunity signals.',
      'Model carbon accounting scenarios and simplify complex regulatory frameworks for stakeholders.',
      'Deliver analytics and dashboards that guide climate-positive investments and policy.',
    ],
    timeline: [
      {
        label: 'Month 1',
        title: 'Climate data mastery',
        description:
          'Study the climate system, source emissions datasets, and engineer clean time-series ready for analysis.',
        topics: ['Climate Science Essentials', 'Global Data Sources', 'Data Cleaning & Normalization'],
      },
      {
        label: 'Month 2',
        title: 'Carbon markets & ESG analytics',
        description:
          'Break down carbon markets, build GHG inventories, and deliver executive-ready ESG dashboards and capstone insights.',
        topics: ['Carbon Credits & Offsets', 'Scope 1-3 Accounting', 'MRV Systems', 'ESG Storytelling'],
      },
    ],
  },
];

const Programs = () => {
  return (
    <Layout>
      <Helmet>
        <title>AI Education Programs | Industry-Aligned AI Training – TARK AI</title>
        <meta name="description" content="Industry-aligned AI Education Programs. Master AI/ML Architecture, Data Science, and strategic analytics with mentor-led training and production-ready projects." />
        <meta name="keywords" content="AI Education Programs, AI Training Programs, Machine Learning Courses, Data Science Programs, AI Career Training, AI Certification" />
        <link rel="canonical" href="https://tarkaiedtech.com/programs" />
      </Helmet>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="container-wide mx-auto">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <div data-reveal className="space-y-8">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/70 backdrop-blur-md text-sm uppercase tracking-[0.25em] text-accent shine-on-hover">
                <span className="size-2 rounded-full bg-accent" /> Cohort Experiences
              </div>
              <div className="space-y-6">
                <h1 className="max-w-3xl text-balance">Explore mentor-supported programs for AI and data journeys</h1>
                <p className="text-lg text-foreground/75 leading-relaxed max-w-2xl">
                  Start within TarkAI Compass, then choose a program aligned with your pace. Each pathway combines curated
                  content, guided practice, and community check-ins to help you grow with steady support.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.25em] text-foreground/50" data-reveal>
                <span className="px-4 py-2 rounded-full bg-secondary/50 border border-secondary/70">AI / ML Architect · 7 Months</span>
                <span className="px-4 py-2 rounded-full bg-secondary/50 border border-secondary/70">Data Science & Analytics · 7 Months</span>
                <span className="px-4 py-2 rounded-full bg-secondary/50 border border-secondary/70">Foundation & Climate Labs · 2 Months</span>
              </div>
            </div>

            <div className="relative" data-reveal>
              <div className="absolute -top-12 -right-10 w-44 h-44 bg-accent/20 blur-3xl" />
              <div className="absolute bottom-6 -left-12 w-40 h-40 bg-primary/15 blur-2xl" />

              <div className="relative overflow-hidden rounded-[36px] border border-white/40 shadow-[0_40px_100px_-60px_rgba(15,23,42,0.55)]">
                <img
                  src="https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=1200&q=80"
                  alt="Learners collaborating in an immersive program"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white space-y-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/70">Inside the studio</p>
                  <h3 className="text-2xl font-semibold">Co-learning sessions, mentor feedback circles, and demo days</h3>
                </div>
              </div>

              <div className="absolute -bottom-10 right-6 w-48">
                <div className="panel-glass panel-ambient rounded-3xl p-5 shadow-xl backdrop-blur-xl border border-white/50">
                  <p className="text-xs uppercase tracking-[0.3em] text-accent/80 mb-3">Snapshot</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Guided labs · Mentor sync-ups · Project showcases planned for each cohort
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs List */}
      <section className="px-6 md:px-12 lg:px-20 pb-20">
        <div className="container-wide mx-auto">
          {programs.map((program) => (
            <div
              key={program.id}
              className="py-12 md:py-16 border-t border-border group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left */}
                <div className="lg:col-span-5">
                  <span className="text-sm text-accent mb-4 block">{program.duration}</span>
                  <h2 className="text-3xl md:text-4xl mb-3 group-hover:text-accent transition-colors duration-300">
                    {program.title}
                  </h2>
                  <p className="text-foreground/60 mb-6">{program.subtitle}</p>
                  <p className="text-sm md:text-base text-foreground/70 leading-relaxed mb-6">
                    {program.overview}
                  </p>
                  <div className="space-y-3 mb-8">
                    {program.takeaways.map((takeaway) => (
                      <div key={takeaway} className="flex items-start gap-3 text-sm text-foreground/70">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent/80" />
                        <p>{takeaway}</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/contact">
                    <Button variant="minimal" className="group/btn">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                {/* Right - Modules */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="relative rounded-[30px] overflow-hidden border border-white/40 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.6)]">
                    <img
                      src={`https://images.unsplash.com/${program.coverImage}?auto=format&fit=crop&w=1200&q=80`}
                      alt={`${program.title} visual`}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/70" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between text-white">
                      <span className="text-xs uppercase tracking-[0.35em] text-white/70">Program Atmosphere</span>
                      <span className="text-sm font-semibold text-white/80">Immersive • Mentor-supported • Project Focused</span>
                    </div>
                  </div>

                  <p className="text-xs uppercase tracking-widest text-foreground/40">Roadmap</p>
                  <div className="space-y-5">
                    {program.timeline.map((milestone) => (
                      <div
                        key={`${program.id}-${milestone.label}`}
                        className="rounded-2xl border border-border/60 bg-background/40 p-5 hover:border-accent/60 transition-colors duration-300"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent/80">
                            {milestone.label}
                          </span>
                          <h3 className="text-lg font-semibold text-foreground">{milestone.title}</h3>
                        </div>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          {milestone.description}
                        </p>
                        {milestone.topics && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {milestone.topics.map((topic) => (
                              <span
                                key={topic}
                                className="text-[11px] tracking-widest uppercase border border-border/60 text-foreground/60 rounded-full px-3 py-1"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Programs;
