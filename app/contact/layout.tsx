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
    return <>{children}</>;
}
