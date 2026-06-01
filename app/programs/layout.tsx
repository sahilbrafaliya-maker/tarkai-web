import { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Education Programs | Machine Learning & Data Science Courses",
    description: "Explore TARK AI's industry-aligned programs in AI/ML, Data Science, Climate Analytics, and Foundation Learning. Concept-driven education with hands-on projects and expert mentorship.",
    keywords: ["AI Education Programs", "Machine Learning Courses", "Data Science Training", "AI ML Programs", "Climate Tech Courses", "AI Foundation Learning"],
    alternates: {
        canonical: "https://tarkaiedtech.com/programs",
    },
};

const programsJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://tarkaiedtech.com/programs/#webpage",
      "url": "https://tarkaiedtech.com/programs",
      "name": "AI Education Programs | Machine Learning & Data Science Courses",
      "description": "Explore TARK AI's industry-aligned programs in AI/ML, Data Science, Climate Analytics, and Foundation Learning. Concept-driven education with hands-on projects and expert mentorship.",
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
      "name": "AI Education Programs by TARK AI",
      "numberOfItems": 4,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "EducationalOccupationalProgram",
            "name": "AI / ML Architect Program",
            "description": "A flagship 6-month immersion that builds rock-solid data foundations, levels up your model intuition, and ends with production-ready LLM and agentic systems.",
            "url": "https://tarkaiedtech.com/programs/ai-ml-architect-program",
            "provider": {
              "@type": "Organization",
              "name": "TARK AI EdTech Private Limited",
              "url": "https://tarkaiedtech.com"
            },
            "programPrerequisites": "Basic understanding of programming (Python is a plus) and statistical logic.",
            "educationalCredentialAwarded": "Certificate of Completion in AI/ML Systems Architecture",
            "timeToComplete": "P6M"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "EducationalOccupationalProgram",
            "name": "Data Science & Strategic Analytics",
            "description": "Transform into the data partner every leadership team craves—tell compelling stories with data, automate insight pipelines, and launch ML-powered decisions.",
            "url": "https://tarkaiedtech.com/programs/data-science-strategic-analytics",
            "provider": {
              "@type": "Organization",
              "name": "TARK AI EdTech Private Limited",
              "url": "https://tarkaiedtech.com"
            },
            "programPrerequisites": "Basic arithmetic and curiosity about analytical patterns.",
            "educationalCredentialAwarded": "Certificate of Completion in Data Science & Business Intelligence",
            "timeToComplete": "P6M"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "EducationalOccupationalProgram",
            "name": "Future Founders – AI Foundation",
            "description": "A playful-yet-powerful launchpad for teens and first-time builders—learn digital fluency, code creatively, and demo AI ideas with confidence.",
            "url": "https://tarkaiedtech.com/programs/future-founders-ai-foundation",
            "provider": {
              "@type": "Organization",
              "name": "TARK AI EdTech Private Limited",
              "url": "https://tarkaiedtech.com"
            },
            "educationalCredentialAwarded": "Certificate of Completion in Digital Fluency & AI Foundations",
            "timeToComplete": "P3M"
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "@type": "EducationalOccupationalProgram",
            "name": "Green Intelligence – Climate Analytics",
            "description": "Blend climate science with data craftsmanship to decode carbon markets, verify emissions, and advise on ESG action plans.",
            "url": "https://tarkaiedtech.com/programs/green-intelligence-climate-analytics",
            "provider": {
              "@type": "Organization",
              "name": "TARK AI EdTech Private Limited",
              "url": "https://tarkaiedtech.com"
            },
            "programPrerequisites": "Basic math, coding concepts, and high interest in sustainability/climate analytics.",
            "educationalCredentialAwarded": "Certificate of Completion in Climate Analytics & ESG Carbon Markets",
            "timeToComplete": "P3M"
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
