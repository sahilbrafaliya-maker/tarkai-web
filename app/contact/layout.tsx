import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact TARK AI | AI-Powered Education & Program Inquiries",
    description: "Get in touch with TARK AI EdTech for AI education programs, partnership opportunities, or course inquiries. Expert support for AI, ML, Data Science, and Climate Tech learning.",
    keywords: ["Contact TARK AI", "AI EdTech Support", "AI Education Inquiries", "TARK AI Programs", "AI Learning Support"],
    alternates: {
        canonical: "https://tarkaiedtech.com/contact",
    },
};

export default function ContactLayout({
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
                        "@type": "ContactPage",
                        "name": "Contact TARK AI",
                        "description": "Get in touch with TARK AI regarding AI education programs.",
                        "url": "https://tarkaiedtech.com/contact",
                        "mainEntity": {
                            "@type": "Organization",
                            "name": "TARK AI EdTech Private Limited",
                            "telephone": "+91-9712358689",
                            "email": "info@tarkaiedtech.com",
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "Kyros Business Center, 404&405, beside Ashirwad Society, Sarthana Jakat Naka",
                                "addressLocality": "Surat",
                                "addressRegion": "Gujarat",
                                "postalCode": "395013",
                                "addressCountry": "IN"
                            }
                        }
                    })
                }}
            />
            {children}
        </>
    );
}
