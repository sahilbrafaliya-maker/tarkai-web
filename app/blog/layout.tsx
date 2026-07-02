import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        default: 'AI Career Insights & Blog | TARK AI EdTech Surat',
        template: '%s | TARK AI Blog'
    },
    description: 'AI career guides, Data Science tutorials, and industry insights from TARK AI EdTech — Surat\'s leading AI institute. Tips for students & professionals in Gujarat.',
    keywords: [
        "AI blog India", "Data Science career tips", "AI career guide Surat",
        "Machine Learning tutorials Gujarat", "AI course advice India",
        "TARK AI blog", "AI insights EdTech", "Data Science blog India"
    ],
    alternates: {
        canonical: 'https://tarkaiedtech.com/blog',
    },
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        siteName: 'TARK AI EdTech',
        title: 'AI Career Insights & Blog | TARK AI EdTech Surat',
        description: 'AI career guides, Data Science tutorials, and industry insights from TARK AI EdTech — Surat\'s leading AI institute.',
        url: 'https://tarkaiedtech.com/blog',
        images: [
            {
                url: 'https://tarkaiedtech.com/favicon-96x96.png',
                width: 1600,
                height: 1600,
                alt: 'TARK AI EdTech Blog — AI Insights from Surat',
            }
        ],
    },
};

const blogListingJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": "https://tarkaiedtech.com/blog/#webpage",
            "url": "https://tarkaiedtech.com/blog",
            "name": "AI Career Insights & Blog — TARK AI EdTech Surat",
            "description": "AI career guides, Data Science tutorials, and industry insights from TARK AI EdTech, Surat's premier AI institute.",
            "isPartOf": { "@id": "https://tarkaiedtech.com/#website" },
            "about": { "@id": "https://tarkaiedtech.com/#organization" },
            "inLanguage": "en-IN",
            "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tarkaiedtech.com" },
                    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://tarkaiedtech.com/blog" }
                ]
            }
        }
    ]
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListingJsonLd) }}
            />
            {children}
        </>
    );
}
