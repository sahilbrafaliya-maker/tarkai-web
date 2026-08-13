import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI environment variable is missing.');
    process.exit(1);
}

const BlogSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    slug: { type: String, unique: true, sparse: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    date: { type: String, default: '' },
    tag: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    paragraph: { type: String, default: '' },
    instagram: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    images: { type: [String], default: [] },
}, { timestamps: true });

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

const blogContent = `Becoming an AI engineer in Surat follows a clear path: build a strong foundation in programming and math, learn core machine learning concepts, work on real projects to build a portfolio, specialize in an in-demand area like agentic AI or data science, and get placement-ready with interview and resume support. Here's how to actually execute each step.

## Step 1: Build Your Foundation

Before touching machine learning, you need comfort with:

- **Python** — the primary language for AI/ML work
- **Basic statistics and math** — probability, linear algebra basics, and how they connect to model behavior (you don't need to be a math expert, but you need to understand what's happening under the hood)
- **Logical thinking and problem-solving** — algorithms, flowcharts, and structured reasoning

If you're coming from a non-technical background, don't skip this step. It's the single biggest reason people quit AI courses halfway — jumping into model-building without foundational comfort in code and logic.

## Step 2: Learn Core AI and Machine Learning Concepts

Once your foundation is solid, move into:

- Supervised and unsupervised learning
- Data cleaning, preprocessing, and feature engineering
- Core ML algorithms (regression, classification, clustering)
- An introduction to neural networks and deep learning basics

The key at this stage is understanding *why* an algorithm works for a given problem — not just running pre-written code. A good instructor will connect the concept to the implementation, not skip straight to the code.

## Step 3: Build Real, Portfolio-Worthy Projects

This is where most self-taught learners fall short — they finish tutorials but never build anything original. Aim for 3–5 projects that:

- Solve a real (even if small) problem, not a generic toy dataset
- Are deployed or demoable, not just code sitting in a notebook
- Are documented clearly on GitHub with a README explaining your approach

Recruiters and interviewers care far more about what you built and why than which certificates you hold.

## Step 4: Specialize

"AI" today spans several distinct career paths. Pick a direction based on your interests:

- **AI/ML Engineering** — building and deploying models, increasingly including agentic AI and LLM-based systems
- **Data Science** — Python, SQL, data analysis, and business-facing insight generation
- **Climate Analytics / Climate Tech** — an emerging, high-demand niche combining data skills with climate science, carbon markets, and ESG reporting
- **Full-Stack AI** — combining application development with AI model integration, for those who want to build production-ready AI products

Specializing doesn't mean ignoring the fundamentals — it means going deeper in the direction that matches where you want to work.

## Step 5: Get Genuinely Placement-Ready

A portfolio alone doesn't land interviews. You also need:

- An ATS-friendly resume that survives automated screening
- A polished, keyword-optimized LinkedIn profile
- Practice with mock technical and HR interviews
- A GitHub profile that's easy for a recruiter to skim

This is exactly why structured programs build a placement-readiness phase into the course rather than leaving it to the student to figure out alone.

## Step 6: Network and Apply — Locally and Remotely

Surat's own tech and AI ecosystem is growing (SVNIT's dedicated AI department is one signal of this), but don't limit yourself geographically — most AI/ML and data roles today are remote-friendly. Attend local meetups if available, engage with the AI community on LinkedIn, and apply broadly once your portfolio and resume are ready.

## Realistic Timeline

Every learner's pace differs based on prior background, but as a general guide:

- **Foundation + core concepts:** a few weeks to a couple of months of consistent, structured learning
- **Projects + specialization:** overlaps with the above, ongoing as skills deepen
- **Placement readiness:** typically a focused final phase, e.g., a dedicated 1-month placement-prep track

Ask any institute you're evaluating for their specific program length so you can plan realistically — timelines vary by program depth and specialization.

## Common Mistakes to Avoid

- **Skipping fundamentals** to rush into "cool" projects like chatbots or image generators
- **Copy-pasting code** from tutorials without understanding why it works — this shows up immediately in interviews
- **Learning in isolation**, without mentor feedback on your code or projects
- **Ignoring placement prep** until after the course ends, instead of building it in from day one
- **Choosing a course based on price alone**, without checking faculty background, batch size, or actual project depth

## Frequently Asked Questions

**Q: Can I become an AI engineer without a computer science degree?**
A: Yes. Many successful AI/ML professionals come from other backgrounds (statistics, engineering, even non-technical fields) and build skills through structured, project-based courses. What matters most to employers is demonstrated ability — your projects, your portfolio, and how well you can explain your work.

**Q: Do I need to learn math deeply before starting AI?**
A: You need working comfort with core concepts (probability, basic linear algebra), not a math degree. Most well-structured courses teach the math alongside the AI concepts as they become relevant, rather than requiring it all upfront.

**Q: What's the difference between AI, Machine Learning, and Data Science as career paths?**
A: Broadly: Data Science focuses on extracting insights from data (often for business decisions); Machine Learning focuses on building predictive models; AI Engineering (including agentic AI/LLM work) focuses on building and deploying intelligent systems and applications. They overlap significantly, and many professionals work across all three.

**Q: How do I know if an AI course in Surat will actually get me job-ready?**
A: Check for three things: a curriculum that teaches concepts before code, hands-on projects you'll actually build (not just watch), and structured placement support (resume, interview prep, portfolio review) included in the program — not sold separately.

**Q: Is Climate Tech a real career path, or a niche add-on?**
A: It's a genuinely growing field. As companies face increasing ESG reporting requirements and climate-related regulation, demand is rising for professionals who can combine data skills with climate/carbon market knowledge — making it a strong specialization for learners entering early.

---

**Want a personalized roadmap based on your background?** [Book a free demo class](https://wa.me/919712358689?text=Hi%20TARK%20AI!%20I%27d%20like%20to%20book%20a%20free%20demo%20class.) with TARK AI's mentors in Surat, or [WhatsApp us](https://wa.me/919712358689) your questions directly.

**Related reading:** [Best AI Institute in Surat: 8 Things to Check Before You Enroll](/blog/best-ai-institute-in-surat-checklist) · [Explore AI/ML Programs](/programs) · [Contact TARK AI](/contact)`;

const blogData = {
    id: 2,
    slug: 'how-to-become-ai-engineer-surat',
    title: 'How to Become an AI Engineer in Surat: A Complete Career Roadmap (2026)',
    description: "Want to become an AI engineer in Surat? Follow this step-by-step roadmap covering skills, projects, and career paths to get job-ready in 2026.",
    date: '2026-07-02',
    tag: 'Career Roadmap',
    coverImage: '/blog-2-cover.png',
    paragraph: blogContent,
    instagram: '',
    linkedin: 'https://www.linkedin.com/company/tarkai-edtech-pvt-ltd',
    twitter: '',
    images: ['/blog-2-cover.png'],
};

async function seed() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
            serverSelectionTimeoutMS: 10000,
            family: 4,
        });
        console.log('Connected!');

        // Find the highest existing id and use next
        const lastBlog = await Blog.findOne({}).sort({ id: -1 }).select('id');
        const nextId = lastBlog ? lastBlog.id + 1 : 1;
        blogData.id = nextId;
        console.log(`Using blog id: ${nextId}`);

        // Upsert by slug — update if exists, create if not
        const result = await Blog.findOneAndUpdate(
            { slug: blogData.slug },
            { $set: blogData },
            { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
        );

        console.log(result ? 'Blog upserted successfully!' : 'No changes.');
        console.log(`\n✅ Blog is live at: /blog/${blogData.slug}`);
        console.log(`🔗 Full URL: https://tarkaiedtech.com/blog/${blogData.slug}`);
    } catch (err) {
        console.error('Error seeding blog:', err);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    }
}

seed();
