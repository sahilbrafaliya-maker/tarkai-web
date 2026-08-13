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

const blogContent = `## Why Surat Is Becoming a Serious AI Education Hub

Surat's tech ecosystem has been shifting fast. Institutions like SVNIT have set up dedicated AI departments in recent years, local businesses across textiles, diamonds, and logistics are adopting AI-driven tools, and a wave of private institutes has opened up to meet growing student demand. That's good news for learners — but it also means more options to sort through, and not all of them are built the same way.

That's exactly why a structured checklist matters more than a Google ranking or a flashy homepage.

## The 8-Point Checklist

### 1. Faculty Credentials and Real Industry Experience

Ask directly: who is teaching the course, and what's their actual background? A good AI institute should be transparent about instructor qualifications — degrees, research background, and hands-on industry experience — not just "expert faculty" written on a landing page. If instructors hold advanced degrees from recognized technical institutes and have applied AI/ML work behind them, that's a strong signal.

### 2. Curriculum Depth — Concept Before Code

A lot of short courses jump straight into copy-pasting code without explaining why it works. Look for programs that teach the underlying concept first, then the implementation, then apply it to real case studies. This "why → how → build" sequence is what separates someone who can explain their work in an interview from someone who can only follow a tutorial.

### 3. Batch Size and Mentorship Ratio

AI and Data Science are skills you learn by doing, with feedback. Large lecture-hall-style batches make it hard to get your code reviewed or your doubts resolved. Ask how many students are in each batch and how much direct mentor interaction you'll actually get.

### 4. Hands-On Projects, Not Just Theory

By the end of the program, you should have a portfolio you can show — not just a certificate. Ask what specific projects you'll build, whether they reflect real industry problems (not toy datasets), and whether you'll walk away with something deployable, like a GitHub repo or a live demo.

### 5. Placement and Career Support

A genuinely good institute treats placement as part of the curriculum, not an afterthought. Look for structured support: resume building (ideally ATS-friendly), LinkedIn profile optimization, mock technical and HR interviews, and portfolio/GitHub reviews. Ask exactly what's included and for how long after the course ends.

### 6. Specialization Options

"AI" is broad. Some learners want core Machine Learning, others want agentic AI and LLM-based systems, others are drawn to Data Science, and a growing number are interested in Climate Tech and ESG-related data work. Check whether the institute offers focused tracks instead of a generic one-size-fits-all course.

### 7. Flexibility for Your Situation

Are you a student, a working professional, or a career switcher? Your available time is different in each case. Ask about batch timing options (weekday/weekend), and whether the pace is designed for beginners or assumes prior coding experience.

### 8. Genuine Reviews and Outcomes

Read Google reviews carefully — not just the star rating, but what specific students say about the teaching quality, mentor availability, and post-course support. Reach out to alumni directly on LinkedIn if you can; it's the fastest way to get an unfiltered opinion.

## How TARK AI Approaches This

TARK AI EdTech, headquartered in Surat, was built around this exact checklist rather than against it:

- **Faculty:** Courses are designed and taught by co-founders and instructors holding M.Sc. degrees in Artificial Intelligence, Machine Learning, and Climate Analytics from IIIT Lucknow.
- **Curriculum philosophy:** "Why first, then How" — moving from concept → code → case studies, so learners understand the reasoning, not just the syntax.
- **Batch structure:** Small batches by design, so mentorship stays hands-on rather than lecture-style.
- **Projects:** Hands-on, project-based learning across every track, aimed at building a real portfolio.
- **Career support:** Every major program includes a 1-Month Placement Ready Program — ATS-friendly resume creation, LinkedIn optimization, mock technical and HR interviews, and GitHub/portfolio review.
- **Specializations:** AI/ML, Data Science, Climate Analytics, and a Foundation track for teens and first-time builders.

## Frequently Asked Questions

**Q: What makes an AI institute in Surat "the best" one for me specifically?**
A: It depends on your starting point and goal. A working professional switching careers needs different pacing and support than a college student or a teen just starting out. Match the institute's batch flexibility and specialization tracks to your situation rather than going by rankings alone.

**Q: Do I need a coding background to join an AI course in Surat?**
A: Not necessarily. Many institutes, including TARK AI's Foundation track, are built for first-time learners and teach programming fundamentals alongside AI concepts from the ground up.

**Q: How important is placement support when choosing an institute?**
A: Very. A certificate alone doesn't get you a job — a well-prepared resume, portfolio, and interview practice do. Prioritize institutes that treat this as a structured part of the program, not a vague promise.

**Q: Is it better to learn AI online or at a local institute in Surat?**
A: Both have merits, but in-person or hybrid learning in Surat gives you direct mentor access, peer accountability, and local networking — which matters a lot for interview readiness and staying motivated.

**Q: How long does it typically take to become job-ready in AI/Data Science?**
A: It varies by program depth and your prior background, but most structured, project-based programs are designed to take you from foundational concepts to a placement-ready portfolio within a few months rather than years. Ask any institute you're considering for their specific program timeline before enrolling.

---

**Ready to see if TARK AI is the right fit for you?** [Book a free demo class](https://wa.me/919712358689?text=Hi%20TARK%20AI!%20I%27d%20like%20to%20book%20a%20free%20demo%20class.) or [WhatsApp us](https://wa.me/919712358689) to get your questions answered directly.`;

const blogData = {
    id: 1,
    slug: 'best-ai-institute-in-surat-checklist',
    title: 'Best AI Institute in Surat: 8 Things to Check Before You Enroll (2026 Guide)',
    description: "Looking for the best AI institute in Surat? Here's a practical 8-point checklist covering faculty, curriculum, and placement support before you enroll in 2026.",
    date: '2026-07-02',
    tag: 'AI Education',
    coverImage: '/blog-1-cover.png',
    paragraph: blogContent,
    instagram: '',
    linkedin: 'https://www.linkedin.com/company/tarkai-edtech-pvt-ltd',
    twitter: '',
    images: ['/blog-1-cover.png'],
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

        // Check if blog already exists
        const existing = await Blog.findOne({ slug: blogData.slug });
        if (existing) {
            console.log(`Blog with slug "${blogData.slug}" already exists. Updating...`);
            await Blog.updateOne({ slug: blogData.slug }, { $set: blogData });
            console.log('Blog updated successfully!');
        } else {
            await Blog.create(blogData);
            console.log('Blog created successfully!');
        }

        console.log(`\n✅ Blog is live at: /blog/${blogData.slug}`);
    } catch (err) {
        console.error('Error seeding blog:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
    }
}

seed();
