import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About TARK AI | Leading AI EdTech Company in India",
    description: "TARK AI EdTech Private Limited democratizes intelligent education through AI, ML, Data Science, and Climate Tech programs. Learn about our founder-led, mentor-driven approach to future-ready learning.",
    keywords: ["AI EdTech Company India", "About TARK AI", "AI Education Platform", "Machine Learning Education", "Data Science Training India"],
    alternates: {
        canonical: "https://tarkaiedtech.com/about",
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "AboutPage",
                        "name": "About TARK AI",
                        "description": "TARK AI EdTech Private Limited is India's leading AI-powered career guidance platform.",
                        "url": "https://tarkaiedtech.com/about",
                        "publisher": {
                            "@type": "Organization",
                            "name": "TARK AI EdTech Private Limited",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://tarkaiedtech.com/Logo.png"
                            }
                        }
                    })
                }}
            />
            {children}
        </>
    );
}
