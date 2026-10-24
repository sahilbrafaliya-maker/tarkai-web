import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Meet Our Team & Leadership",
    description: "Meet the TARK AI EdTech leadership team. Experts in AI/ML, Data Science, and Climate Analytics from IIIT Lucknow.",
    keywords: [
        "TARK AI Team",
        "AI EdTech Leadership Surat",
        "AI Education Experts Gujarat",
        "IIIT Lucknow AI Alumni",
        "TarkAI Founders"
    ],
    alternates: {
        canonical: "https://tarkaiedtech.com/team",
    },
    openGraph: {
        title: "Meet Our Team | TARK AI EdTech Leadership",
        description: "Meet the TARK AI EdTech leadership team. Experts in AI/ML, Data Science, and Climate Analytics from IIIT Lucknow.",
        url: "https://tarkaiedtech.com/team",
        siteName: "TARK AI EdTech",
        images: [
            {
                url: "https://tarkaiedtech.com/Logo.png",
                width: 1200,
                height: 630,
                alt: "TARK AI EdTech Leadership Team",
            },
        ],
        type: "website",
        locale: "en_IN",
    },
    twitter: {
        card: "summary_large_image",
        title: "Meet Our Team | TARK AI EdTech Leadership",
        description: "Meet the TARK AI EdTech leadership team. Experts in AI/ML, Data Science, and Climate Analytics from IIIT Lucknow.",
        images: ["https://tarkaiedtech.com/Logo.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

const teamJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://tarkaiedtech.com/team/#webpage",
      "url": "https://tarkaiedtech.com/team",
      "name": "Meet Our Team | TARK AI EdTech Leadership",
      "description": "Meet the TARK AI EdTech leadership team. Experts in AI/ML, Data Science, and Climate Analytics.",
      "isPartOf": {
        "@id": "https://tarkaiedtech.com/#website"
      },
      "about": {
        "@id": "https://tarkaiedtech.com/#organization"
      },
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
      },
      "mainEntity": {
        "@type": "ItemList",
        "name": "TARK AI EdTech Leadership Team",
        "description": "Founders, leadership team, and educators at TARK AI EdTech Private Limited",
        "numberOfItems": 6,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "Person",
              "name": "Sahil Rafaliya",
              "jobTitle": "Founder & CEO",
              "worksFor": {
                "@type": "EducationalOrganization",
                "@id": "https://tarkaiedtech.com/#organization",
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
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "Person",
              "name": "Kashish Nagar",
              "jobTitle": "Co-Founder & EVP",
              "worksFor": {
                "@type": "EducationalOrganization",
                "@id": "https://tarkaiedtech.com/#organization",
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
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "Person",
              "name": "Smit Bokha",
              "jobTitle": "Co-Founder",
              "worksFor": {
                "@type": "EducationalOrganization",
                "@id": "https://tarkaiedtech.com/#organization",
                "name": "TARK AI EdTech Private Limited",
                "url": "https://tarkaiedtech.com"
              },
              "knowsAbout": ["Strategic Finance", "Compliance", "Data-driven Insights", "Web Development"]
            }
          },
          {
            "@type": "ListItem",
            "position": 4,
            "item": {
              "@type": "Person",
              "name": "Gautam Hadiya",
              "jobTitle": "Co-Founder",
              "worksFor": {
                "@type": "EducationalOrganization",
                "@id": "https://tarkaiedtech.com/#organization",
                "name": "TARK AI EdTech Private Limited",
                "url": "https://tarkaiedtech.com"
              },
              "knowsAbout": ["Technology Leadership", "Product Architecture", "AI Systems", "Web Development"]
            }
          },
          {
            "@type": "ListItem",
            "position": 5,
            "item": {
              "@type": "Person",
              "name": "Harshil Mangroliya",
              "jobTitle": "Co-Founder",
              "worksFor": {
                "@type": "EducationalOrganization",
                "@id": "https://tarkaiedtech.com/#organization",
                "name": "TARK AI EdTech Private Limited",
                "url": "https://tarkaiedtech.com"
              },
              "knowsAbout": ["Operations Leadership", "Process Optimization", "Web Development"]
            }
          },
          {
            "@type": "ListItem",
            "position": 6,
            "item": {
              "@type": "Person",
              "name": "Sneh Anghan",
              "jobTitle": "Operations Leadership",
              "worksFor": {
                "@type": "EducationalOrganization",
                "@id": "https://tarkaiedtech.com/#organization",
                "name": "TARK AI EdTech Private Limited",
                "url": "https://tarkaiedtech.com"
              },
              "knowsAbout": ["Process Optimization", "Execution Efficiency", "Web Solutions"]
            }
          }
        ]
      }
    },
    {
      "@type": "EducationalOrganization",
      "@id": "https://tarkaiedtech.com/#organization",
      "name": "TARK AI EdTech Private Limited",
      "alternateName": "TARK AI",
      "url": "https://tarkaiedtech.com",
      "logo": "https://tarkaiedtech.com/Logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kyros Business Center, 404 & 405, beside Ashirwad Society, Sarthana Jakat Naka",
        "addressLocality": "Surat",
        "addressRegion": "Gujarat",
        "postalCode": "395013",
        "addressCountry": "IN"
      },
      "telephone": "+91-9712358689",
      "email": "info@tarkaiedtech.com"
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
