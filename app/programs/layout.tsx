import { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI & ML Courses in Surat | Best Data Science Programs – TARK AI",
    description: "Explore AI/ML, Data Science, Climate Analytics & Foundation programs in Surat. IIIT Lucknow faculty, small batches, placement support. Book a free demo today.",
    keywords: [
        // Tier 2 local program
        "AI ML course in Surat", "Best Data Science classes in Surat",
        "AI training institute Gujarat", "AI course with placement Surat",
        "Python ML classes Surat", "Climate tech course Surat",
        "Data Science program Gujarat", "Machine Learning course Surat",
        // Tier 4 long-tail
        "AI course for beginners Surat", "best AI program after graduation Gujarat",
        "AI course duration and fees Surat", "Data Science course fees Surat",
        // General
        "AI Education Programs", "Machine Learning Courses India",
        "Data Science Training Surat", "AI ML Programs TARK AI",
        "Climate Tech Courses India", "AI Foundation Learning Surat"
    ],
    alternates: {
        canonical: "https://tarkaiedtech.com/programs",
    },
    openGraph: {
        title: "AI & ML Courses in Surat | Best Data Science Programs – TARK AI",
        description: "Explore AI/ML, Data Science, Climate Analytics & Foundation programs in Surat. IIIT Lucknow faculty, small batches, placement support.",
        url: "https://tarkaiedtech.com/programs",
        type: "website",
    },
};

const programsJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://tarkaiedtech.com/programs/#webpage",
      "url": "https://tarkaiedtech.com/programs",
      "name": "AI & ML Courses in Surat | Best Data Science Programs – TARK AI",
      "description": "Explore AI/ML, Data Science, Climate Analytics & Foundation programs in Surat. IIIT Lucknow faculty, small batches, placement support.",
      "isPartOf": { "@id": "https://tarkaiedtech.com/#website" },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://tarkaiedtech.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Programs",
            "item": "https://tarkaiedtech.com/programs"
          }
        ]
      }
    },
    {
      "@type": "ItemList",
      "@id": "https://tarkaiedtech.com/programs/#itemlist",
      "name": "AI & Data Science Programs in Surat — TARK AI EdTech",
      "description": "TARK AI EdTech offers structured programs in AI/ML, Data Science, Climate Analytics, and Foundation Learning in Surat, Gujarat — taught by IIIT Lucknow M.Sc. faculty.",
      "numberOfItems": 4,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Course",
            "name": "AI / ML Architect Program",
            "description": "A flagship 6-month immersion in Surat that builds rock-solid data foundations, levels up your model intuition, and ends with production-ready LLM and agentic AI systems.",
            "url": "https://tarkaiedtech.com/programs/ai-ml-architect-program",
            "courseMode": "Blended",
            "inLanguage": "en-IN",
            "timeToComplete": "P6M",
            "teaches": ["Artificial Intelligence", "Machine Learning", "LLMs", "Agentic AI", "Python", "Deep Learning"],
            "educationalCredentialAwarded": "Certificate of Completion in AI/ML Systems Architecture",
            "programPrerequisites": "Basic understanding of programming or statistical logic",
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "courseMode": "Blended",
              "location": {
                "@type": "Place",
                "name": "TARK AI EdTech — Kyros Business Center",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Kyros Business Center, 404 & 405, Sarthana Jakat Naka",
                  "addressLocality": "Surat",
                  "addressRegion": "Gujarat",
                  "postalCode": "395013",
                  "addressCountry": "IN"
                }
              }
            },
            "provider": {
              "@type": "EducationalOrganization",
              "name": "TARK AI EdTech Private Limited",
              "url": "https://tarkaiedtech.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Surat",
                "addressRegion": "Gujarat",
                "addressCountry": "IN"
              }
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Course",
            "name": "Data Science & Strategic Analytics",
            "description": "A 6-month Data Science program in Surat — transform into the data partner every leadership team needs. Python, SQL, data tooling, ML-powered decisions, and business analytics.",
            "url": "https://tarkaiedtech.com/programs/data-science-strategic-analytics",
            "courseMode": "Blended",
            "inLanguage": "en-IN",
            "timeToComplete": "P6M",
            "teaches": ["Python", "SQL", "Data Analysis", "Machine Learning", "Business Intelligence", "Data Engineering"],
            "educationalCredentialAwarded": "Certificate of Completion in Data Science & Business Intelligence",
            "programPrerequisites": "Basic arithmetic and curiosity about analytical patterns",
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "courseMode": "Blended",
              "location": {
                "@type": "Place",
                "name": "TARK AI EdTech — Kyros Business Center",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Kyros Business Center, 404 & 405, Sarthana Jakat Naka",
                  "addressLocality": "Surat",
                  "addressRegion": "Gujarat",
                  "postalCode": "395013",
                  "addressCountry": "IN"
                }
              }
            },
            "provider": {
              "@type": "EducationalOrganization",
              "name": "TARK AI EdTech Private Limited",
              "url": "https://tarkaiedtech.com"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "Course",
            "name": "Future Founders – AI Foundation",
            "description": "A 3-month beginner AI program in Surat for teens and first-time builders. Learn digital fluency, code creatively, and demo AI ideas with confidence — no prior experience needed.",
            "url": "https://tarkaiedtech.com/programs/future-founders-ai-foundation",
            "courseMode": "Blended",
            "inLanguage": "en-IN",
            "timeToComplete": "P3M",
            "teaches": ["Python Basics", "AI Fundamentals", "Digital Literacy", "Creative Coding"],
            "educationalCredentialAwarded": "Certificate of Completion in Digital Fluency & AI Foundations",
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "courseMode": "Blended",
              "location": {
                "@type": "Place",
                "name": "TARK AI EdTech — Kyros Business Center",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Kyros Business Center, 404 & 405, Sarthana Jakat Naka",
                  "addressLocality": "Surat",
                  "addressRegion": "Gujarat",
                  "postalCode": "395013",
                  "addressCountry": "IN"
                }
              }
            },
            "provider": {
              "@type": "EducationalOrganization",
              "name": "TARK AI EdTech Private Limited",
              "url": "https://tarkaiedtech.com"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "@type": "Course",
            "name": "Green Intelligence – Climate Analytics",
            "description": "A 3-month Climate Analytics program in Surat — blend climate science with data craftsmanship to decode carbon markets, verify emissions, and advise on ESG action plans.",
            "url": "https://tarkaiedtech.com/programs/green-intelligence-climate-analytics",
            "courseMode": "Blended",
            "inLanguage": "en-IN",
            "timeToComplete": "P3M",
            "teaches": ["Carbon Markets", "ESG Analytics", "Climate Data", "Emissions Accounting", "Sustainability Strategy"],
            "educationalCredentialAwarded": "Certificate of Completion in Climate Analytics & ESG Carbon Markets",
            "programPrerequisites": "Basic math, coding concepts, and interest in sustainability or climate analytics",
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "courseMode": "Blended",
              "location": {
                "@type": "Place",
                "name": "TARK AI EdTech — Kyros Business Center",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Kyros Business Center, 404 & 405, Sarthana Jakat Naka",
                  "addressLocality": "Surat",
                  "addressRegion": "Gujarat",
                  "postalCode": "395013",
                  "addressCountry": "IN"
                }
              }
            },
            "provider": {
              "@type": "EducationalOrganization",
              "name": "TARK AI EdTech Private Limited",
              "url": "https://tarkaiedtech.com"
            }
          }
        }
      ]
    }
  ]
};

export default function ProgramsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(programsJsonLd) }}
            />
            {children}
        </>
    );
}
