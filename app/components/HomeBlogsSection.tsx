'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';

interface BlogPost {
  _id?: string;
  id?: number;
  slug?: string;
  title: string;
  tag?: string;
  category?: string;
  date?: string;
  coverImage?: string;
  image?: string;
  description: string;
}

const fallbackBlogs: BlogPost[] = [
  {
    slug: 'future-of-agentic-ai-2026',
    title: 'The Rise of Agentic AI: Why Multi-Agent Systems are Replacing Simple Prompting',
    tag: 'Artificial Intelligence',
    date: '2026-08-01',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80',
    description: 'Discover how Autonomous AI Agents and RAG architectures are redefining enterprise software development and why AI architects are in high demand.',
  },
  {
    slug: 'ai-career-roadmap-surat',
    title: 'How to Build a High-Paying AI & Data Science Career in Surat in 2026',
    tag: 'Career Advice',
    date: '2026-07-20',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
    description: 'A step-by-step roadmap covering core linear algebra, Python ML libraries, model deployment, and how to create an ATS-friendly placement portfolio.',
  },
  {
    slug: 'climate-analytics-green-ai',
    title: 'Green Intelligence: How Machine Learning is Driving Carbon Market Decisions',
    tag: 'Climate Analytics',
    date: '2026-07-10',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    description: 'Explore the intersection of Data Science and Environmental Sustainability, featuring insights from IIIT Lucknow M.Sc. climate researchers.',
  },
  {
    slug: 'fine-tuning-llms-vs-rag',
    title: 'Fine-Tuning LLMs vs RAG: Choosing the Right AI Architecture for Enterprise',
    tag: 'Generative AI',
    date: '2026-06-28',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    description: 'A comprehensive technical comparison between retrieval-augmented generation and domain fine-tuning for scalable LLM deployments.',
  },
  {
    slug: 'mastering-pytorch-mlops',
    title: 'Mastering PyTorch & MLOps: From Jupyter Notebooks to Production Pipelines',
    tag: 'Machine Learning',
    date: '2026-06-15',
    coverImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=80',
    description: 'Learn how to transition from offline model training to automated CI/CD pipelines, Docker containerization, and real-time inference monitoring.',
  },
  {
    slug: 'future-founders-teen-ai',
    title: 'Future Founders: Empowering the Next Generation of AI Entrepreneurs',
    tag: 'EdTech & Youth',
    date: '2026-06-01',
    coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    description: 'How early exposure to Python, AI ethics, and prototype pitching builds confidence and problem-solving mindsets for young founders.',
  },
];

export default function HomeBlogsSection() {
  const [blogs, setBlogs] = useState<BlogPost[]>(fallbackBlogs);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/blogs');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setBlogs(data.slice(0, 6));
          }
        }
      } catch (err) {
        console.error('Failed to fetch latest blogs for home page:', err);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <section className="py-18 bg-white relative overflow-hidden" id="blog-highlights">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-darkest tracking-tight">
              From our <span className="text-brand-accent">blog</span>
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-brand-accent font-bold text-base hover:text-brand-dark transition-colors group shrink-0"
          >
            <span>Explore All Articles</span>
            <FaArrowRight className="group-hover:translate-x-1 transition-transform text-xs" />
          </Link>
        </div>

        {/* Continuous Animated Marquee Image-Only Blog Track */}
        <div className="overflow-hidden relative w-full">
          <div className="animate-continuous-marquee-reverse flex gap-6 py-2 hover:[animation-play-state:paused]">
            {[...blogs, ...blogs].map((blog, idx) => {
              const blogSlug = blog.slug || `post-${idx}`;
              const imageSrc = blog.coverImage || blog.image || 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80';

              return (
                <Link
                  key={idx}
                  href={`/blog/${blogSlug}`}
                  className="group relative block min-w-[320px] max-w-[320px] sm:min-w-[380px] sm:max-w-[380px] aspect-[16/10] rounded-[28px] overflow-hidden bg-brand-dark shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-200/80 hover:border-brand-accent/50 hover:-translate-y-1.5 shrink-0 cursor-pointer"
                >
                  <Image
                    src={imageSrc}
                    alt={blog.title || 'TarkAI Blog Post'}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-700"
                  />

                  {/* Hover Overlay with Read Article Badge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-darkest/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md text-brand-darkest font-extrabold text-xs shadow-xl border border-white flex items-center gap-2 group-hover:scale-105 transition-transform">
                      <span>Read Article</span>
                      <FaArrowRight className="text-xs text-brand-accent" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
