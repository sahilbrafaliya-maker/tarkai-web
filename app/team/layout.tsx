import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Meet Our Team | TARK AI EdTech Leadership",
    description: "Meet the TARK AI EdTech leadership team. Experts in AI/ML, Data Science, and Climate Analytics.",
    keywords: ["TARK AI Team", "AI EdTech Leadership", "AI Education Experts"],
    alternates: {
        canonical: "https://tarkaiedtech.com/team",
    },
};

const teamJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://tarkaiedtech.com/team/#webpage",
      "url": "https://tarkaiedtech.com/team",
      "name": "Meet Our Team | TARK AI EdTech Leadership",
      "description": "Meet the TARK AI EdTech leadership team. Experts in AI/ML, Data Science, and Climate Analytics.",
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
            "name": "Team",
            "item": "https://tarkaiedtech.com/team"
          }
        ]
      }
    },
    {
      "@type": "ProfilePage",
      "@id": "https://tarkaiedtech.com/team/#profilepage",
      "mainEntity": {
        "@type": "ItemList",
        "name": "TARK AI EdTech Leadership Team",
        "numberOfItems": 6,
        "itemListElement": [
          {
            "@type": "Person",
            "name": "Sahil Rafaliya",
            "jobTitle": "Founder & CEO",
            "worksFor": {
              "@type": "Organization",
              "name": "TARK AI EdTech Private Limited",
              "url": "https://tarkaiedtech.com"
            },
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "Indian Institute of Information Technology, Lucknow",
              "alternateName": "IIIT Lucknow",
              "url": "https://iiitl.ac.in"
            },
            "knowsAbout": ["Data Science", "Climate Technology", "AI-driven Analytics", "Entrepreneurship"],
            "sameAs": [
              "https://www.linkedin.com/company/tark-ai"
            ]
          },
          {
            "@type": "Person",
            "name": "Kashish Nagar",
            "jobTitle": "Co-Founder & EVP",
            "worksFor": {
              "@type": "Organization",
              "name": "TARK AI EdTech Private Limited",
              "url": "https://tarkaiedtech.com"
            },
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "Indian Institute of Information Technology, Lucknow",
              "alternateName": "IIIT Lucknow",
              "url": "https://iiitl.ac.in"
            },
            "knowsAbout": ["Artificial Intelligence", "Machine Learning", "MLOps", "Data Science", "Mentorship"],
            "sameAs": [
              "https://www.linkedin.com/company/tark-ai"
            ]
          },
          {
            "@type": "Person",
            "name": "Smit Bokha",
            "jobTitle": "Co-Founder",
            "worksFor": {
              "@type": "Organization",
              "name": "TARK AI EdTech Private Limited",
              "url": "https://tarkaiedtech.com"
            },
            "knowsAbout": ["Strategic Finance", "Compliance", "Data-driven Insights", "Web Development"]
          },
          {
            "@type": "Person",
            "name": "Gautam Hadiya",
            "jobTitle": "Co-Founder",
            "worksFor": {
              "@type": "Organization",
              "name": "TARK AI EdTech Private Limited",
              "url": "https://tarkaiedtech.com"
            },
            "knowsAbout": ["Technology Leadership", "Product Architecture", "AI Systems", "Web Development"]
          },
          {
            "@type": "Person",
            "name": "Harshil Mangroliya",
            "jobTitle": "Co-Founder",
            "worksFor": {
              "@type": "Organization",
              "name": "TARK AI EdTech Private Limited",
              "url": "https://tarkaiedtech.com"
            },
            "knowsAbout": ["Operations Leadership", "Process Optimization", "Web Development"]
          },
          {
            "@type": "Person",
            "name": "Sneh Anghan",
            "jobTitle": "Operations Leadership",
            "worksFor": {
              "@type": "Organization",
              "name": "TARK AI EdTech Private Limited",
              "url": "https://tarkaiedtech.com"
            },
            "knowsAbout": ["Process Optimization", "Execution Efficiency", "Web Solutions"]
          }
        ]
      }
    }
  ]
};

export default function TeamLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(teamJsonLd) }}
            />
            {children}
        </>
    );
}
