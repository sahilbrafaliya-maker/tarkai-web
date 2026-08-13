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

const blogContent = `AI course fees in Surat and across Gujarat vary widely depending on program depth, faculty credentials, batch size, and whether placement support is included. Rather than comparing institutes on price alone, the smarter approach is understanding exactly what drives cost — so you can judge whether a given fee actually represents good value.

## Why AI Course Fees Vary So Much

If you've been comparing institutes, you've probably noticed the fee range is huge — some short workshops cost very little, while comprehensive, mentor-led programs cost significantly more. That gap usually comes down to a few real factors, not random pricing.

### 1. Program Depth and Duration

A 2-week crash course and a multi-month, project-based program are fundamentally different products, even if both are labeled "AI course." Longer, deeper programs cost more because they involve more instructor time, more project reviews, and more structured mentorship — not because they're artificially marked up.

### 2. Faculty Credentials

Programs taught by instructors with genuine advanced qualifications and applied AI/ML experience (for example, postgraduate degrees from recognized technical institutes) typically command higher fees than programs run by junior trainers reading from slides. This is a fair trade-off if the credential translates into better teaching quality.

### 3. Batch Size

Smaller batches mean more one-on-one mentorship — code reviews, doubt-clearing, personalized feedback — which costs more to deliver than a large lecture-hall model. If a course is very cheap, ask directly how many students are in each batch.

### 4. What's Included Beyond "Teaching"

This is the factor most students overlook. Two programs at similar price points can offer very different value if one includes:

- Structured placement support (resume building, LinkedIn optimization, mock interviews, portfolio review)
- Hands-on, reviewed projects rather than passive video content
- Ongoing mentor access after core teaching ends

A slightly higher fee that includes genuine placement support is often better value than a cheaper course that leaves you to figure out job-hunting alone.

## Questions to Ask Before You Pay

Before enrolling anywhere in Surat or Gujarat, ask directly:

1. What's the exact program duration, and how many hours per week does that require?
2. What are the faculty's actual qualifications and industry background?
3. How many students are typically in a batch?
4. Is placement support included in the fee, or sold as a separate add-on?
5. What projects will I actually build, and will they be reviewed individually?
6. Is there a free demo class or trial session before I commit?

Any credible institute should be able to answer all six clearly and specifically — vague answers are a red flag.

## Short Course vs. Comprehensive Program: Which Is Worth It?

- **Short/crash courses** make sense if you already have a technical background and just need to fill a specific skill gap (e.g., you know Python already and want a focused module on a specific model type).
- **Comprehensive, mentor-led programs** make more sense if you're building AI/Data Science skills from the ground up and want structured project work plus placement support baked in — this is where most career-switchers and students see the strongest outcomes.

## How TARK AI Structures Its Programs

TARK AI's programs — spanning AI/ML, Data Science, Climate Analytics, and a Foundation track for beginners — are built around small, mentor-driven batches and a "concept → code → case studies" teaching philosophy, with every major program including a 1-Month Placement Ready Program covering resume building, LinkedIn optimization, mock interviews, and portfolio review. Because fees depend on the specific program and current batch schedule, the most accurate way to get exact numbers is to reach out directly — our team will walk you through what's included for your chosen track.

## Frequently Asked Questions

**Q: What is the fee for an AI course at TARK AI in Surat?**
A: Fees depend on the specific program (AI/ML, Data Science, Climate Analytics, or Foundation) and current batch. Contact our team directly or book a free demo class to get the latest fee structure and what's included.

**Q: Is a more expensive AI course always better?**
A: Not necessarily — but a very cheap course that skips mentorship, real projects, or placement support often costs more in the long run through wasted time and a weak portfolio. Judge value by what's included, not price alone.

**Q: Are there part-time or weekend AI course options in Surat?**
A: Many institutes, including TARK AI, structure batches with working professionals and students in mind. Ask specifically about weekday vs. weekend timing when you inquire.

**Q: Does course fee usually include placement support, or is that extra?**
A: This varies significantly between institutes — some bundle it in, others charge separately or don't offer it at all. Always confirm this explicitly before enrolling, since placement support is often the difference between a certificate and an actual job offer.

**Q: How do I compare AI course value across different institutes in Gujarat?**
A: Build a simple comparison table across the factors in this article — duration, faculty credentials, batch size, project depth, and placement support — for each institute you're considering. The cheapest option on paper isn't always the best value once you account for what's actually included.

---

**Want a clear breakdown of program options and current fees?** [Book a free demo class](https://wa.me/919712358689?text=Hi%20TARK%20AI!%20I%27d%20like%20to%20book%20a%20free%20demo%20class.) or [WhatsApp us](https://wa.me/919712358689) and our team will walk you through exactly what fits your goals and budget.

**Related reading:** [Best AI Institute in Surat: 8 Things to Check Before You Enroll](/blog/best-ai-institute-in-surat-checklist) · [How to Become an AI Engineer in Surat](/blog/how-to-become-ai-engineer-surat) · [Explore AI/ML Programs](/programs)`;

const blogData = {
    id: 3,
    slug: 'ai-course-fees-duration-surat-gujarat',
    title: 'AI Course Fees & Duration in Surat: What to Know Before Enrolling (2026)',
    description: "Planning an AI course in Surat or Gujarat? Here's what affects fees and duration, and what should be included, so you can choose wisely in 2026.",
    date: '2026-07-02',
    tag: 'AI Education',
    coverImage: '/blog-3-cover.png',
    paragraph: blogContent,
    instagram: '',
    linkedin: 'https://www.linkedin.com/company/tarkai-edtech-pvt-ltd',
    twitter: '',
    images: ['/blog-3-cover.png'],
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

        // Find the highest existing id and use next to avoid duplicate key errors
        const lastBlog = await Blog.findOne({}).sort({ id: -1 }).select('id');
        const nextId = lastBlog ? lastBlog.id + 1 : 1;
        
        // Find if this slug already exists to update it or create it
        const existing = await Blog.findOne({ slug: blogData.slug });
        if (existing) {
            console.log(`Blog with slug "${blogData.slug}" already exists. Updating...`);
            // Keep the existing ID if it already exists
            blogData.id = existing.id;
        } else {
            blogData.id = nextId;
            console.log(`Using blog id: ${nextId}`);
        }

        // Upsert by slug
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
