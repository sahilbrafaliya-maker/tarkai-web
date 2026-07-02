import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About TARK AI | AI Institute in Surat, Gujarat – IIIT Lucknow Faculty",
    description: "TARK AI EdTech Surat — co-founders hold M.Sc. in AI & ML from IIIT Lucknow. Small-batch, mentor-led AI programs with real-world projects & placement support.",
    keywords: [
        "About TARK AI Surat", "AI EdTech Company Surat Gujarat",
        "IIIT Lucknow AI faculty", "AI institute founders Surat",
        "AI Education Platform India", "Machine Learning Education Surat",
        "Data Science Training Surat", "mentor-led AI institute Gujarat"
    ],
    alternates: {
        canonical: "https://tarkaiedtech.com/about",
    },
    openGraph: {
        title: "About TARK AI | AI Institute in Surat, Gujarat – IIIT Lucknow Faculty",
        description: "TARK AI EdTech Surat — co-founders hold M.Sc. in AI & ML from IIIT Lucknow. Small-batch, mentor-led AI programs with real-world projects & placement support.",
        url: "https://tarkaiedtech.com/about",
        type: "website",
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const aboutJsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "AboutPage",
                "@id": "https://tarkaiedtech.com/about/#webpage",
                "name": "About TARK AI EdTech — Surat's Premier AI Institute",
                "description": "TARK AI EdTech Private Limited is Surat's leading AI & ML training institute, founded by IIIT Lucknow M.Sc. graduates.",
                "url": "https://tarkaiedtech.com/about",
                "isPartOf": { "@id": "https://tarkaiedtech.com/#website" },
                "about": { "@id": "https://tarkaiedtech.com/#organization" },
                "breadcrumb": {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tarkaiedtech.com" },
                        { "@type": "ListItem", "position": 2, "name": "About", "item": "https://tarkaiedtech.com/about" }
                    ]
                }
            },
            {
                "@type": "EducationalOrganization",
                "@id": "https://tarkaiedtech.com/#organization",
                "name": "TARK AI EdTech Private Limited",
                "alternateName": "TARK AI",
                "description": "Surat's premier AI & ML training institute. Founded in 2026 by IIIT Lucknow M.Sc. graduates. Offering AI/ML, Data Science, Climate Analytics, and Foundation programs with mentor-led learning and a 1-Month Placement Ready Program.",
                "url": "https://tarkaiedtech.com",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://tarkaiedtech.com/Logo.png"
                },
                "foundingDate": "2026",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Kyros Business Center, 404 & 405, beside Ashirwad Society, Sarthana Jakat Naka",
                    "addressLocality": "Surat",
                    "addressRegion": "Gujarat",
                    "postalCode": "395013",
                    "addressCountry": "IN"
                },
                "telephone": "+91-9712358689",
                "email": "info@tarkaiedtech.com",
                "employee": [
                    {
                        "@type": "Person",
                        "name": "Co-founder & Lead Instructor",
                        "hasCredential": {
                            "@type": "EducationalOccupationalCredential",
                            "credentialCategory": "degree",
                            "educationalLevel": "M.Sc.",
                            "about": "Artificial Intelligence and Machine Learning",
                            "recognizedBy": {
                                "@type": "EducationalOrganization",
                                "name": "Indian Institute of Information Technology (IIIT) Lucknow"
                            }
                        }
                    }
                ],
                "educationalCredentialAwarded": [
                    "Certificate of Completion in AI/ML Systems Architecture",
                    "Certificate of Completion in Data Science & Business Intelligence",
                    "Certificate of Completion in Climate Analytics & ESG Carbon Markets",
                    "Certificate of Completion in Digital Fluency & AI Foundations"
                ],
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "AI & Data Science Programs in Surat",
                    "itemListElement": [
                        { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "AI / ML Architect Program", "url": "https://tarkaiedtech.com/programs/ai-ml-architect-program" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "Data Science & Strategic Analytics", "url": "https://tarkaiedtech.com/programs/data-science-strategic-analytics" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "Green Intelligence – Climate Analytics", "url": "https://tarkaiedtech.com/programs/green-intelligence-climate-analytics" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "Future Founders – AI Foundation", "url": "https://tarkaiedtech.com/programs/future-founders-ai-foundation" } }
                    ]
                },
                "sameAs": [
                    "https://www.linkedin.com/company/111475196/",
                    "https://www.instagram.com/tarkaiedtech/",
                    "https://www.facebook.com/tarkaiedtech/"
                ]
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
            />
            {children}
        </>
    );
}
