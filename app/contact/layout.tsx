import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact TARK AI Surat | Book a Free AI Demo Class | Enroll Now",
    description: "Book a free demo class or inquire about AI & Data Science courses at TARK AI Surat. Call or WhatsApp +91-9712358689. Kyros Business Center, Sarthana Jakat Naka.",
    keywords: [
        "Contact TARK AI Surat", "Book AI demo class Surat",
        "AI course inquiry Surat Gujarat", "TARK AI enrollment",
        "AI class registration Surat", "AI institute contact Surat",
        "WhatsApp TARK AI", "Data Science course inquiry Gujarat"
    ],
    alternates: {
        canonical: "https://tarkaiedtech.com/contact",
    },
    openGraph: {
        title: "Contact TARK AI Surat | Book a Free AI Demo Class | Enroll Now",
        description: "Book a free demo class or inquire about AI & Data Science courses at TARK AI Surat. Call or WhatsApp +91-9712358689.",
        url: "https://tarkaiedtech.com/contact",
        type: "website",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const contactJsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "ContactPage",
                "@id": "https://tarkaiedtech.com/contact/#webpage",
                "name": "Contact TARK AI EdTech Surat — Book a Free Demo Class",
                "description": "Get in touch with TARK AI EdTech, Surat's premier AI institute. Book a free demo class, inquire about programs, or visit us at Kyros Business Center, Sarthana Jakat Naka.",
                "url": "https://tarkaiedtech.com/contact",
                "isPartOf": { "@id": "https://tarkaiedtech.com/#website" },
                "breadcrumb": {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tarkaiedtech.com" },
                        { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://tarkaiedtech.com/contact" }
                    ]
                }
            },
            {
                "@type": ["LocalBusiness", "EducationalOrganization"],
                "@id": "https://tarkaiedtech.com/#organization",
                "name": "TARK AI EdTech Private Limited",
                "alternateName": "TARK AI",
                "description": "Surat's premier AI & ML training institute. Book a free demo class today.",
                "url": "https://tarkaiedtech.com",
                "telephone": "+91-9712358689",
                "email": "info@tarkaiedtech.com",
                "priceRange": "₹₹",
                "currenciesAccepted": "INR",
                "hasMap": "https://maps.google.com/?q=Kyros+Business+Center+Sarthana+Jakat+Naka+Surat+Gujarat",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Kyros Business Center, 404 & 405, beside Ashirwad Society, Sarthana Jakat Naka",
                    "addressLocality": "Surat",
                    "addressRegion": "Gujarat",
                    "postalCode": "395013",
                    "addressCountry": "IN"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "21.2095",
                    "longitude": "72.8398"
                },
                "openingHoursSpecification": [
                    {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                        "opens": "09:00",
                        "closes": "19:00"
                    },
                    {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": "Saturday",
                        "opens": "10:00",
                        "closes": "17:00"
                    }
                ],
                "contactPoint": [
                    {
                        "@type": "ContactPoint",
                        "telephone": "+91-9712358689",
                        "email": "info@tarkaiedtech.com",
                        "contactType": "admissions",
                        "availableLanguage": ["English", "Gujarati", "Hindi"],
                        "areaServed": ["Surat", "Gujarat", "India"]
                    },
                    {
                        "@type": "ContactPoint",
                        "contactType": "customer service",
                        "url": "https://wa.me/919712358689",
                        "availableLanguage": ["English", "Gujarati", "Hindi"]
                    }
                ],
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
            />
            {children}
        </>
    );
}
