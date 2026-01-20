import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact TARK AI | AI Career Counseling Platform",
    description: "Contact TARK AI EdTech for AI career guidance, program inquiries, or partnership opportunities.",
    keywords: ["AI Career Counseling Platform", "Contact AI Career Guidance"],
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
