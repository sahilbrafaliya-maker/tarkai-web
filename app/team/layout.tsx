import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Meet Our Team | TARK AI EdTech Leadership",
    description: "Meet the TARK AI EdTech leadership team. Experts in AI/ML, Data Science, and Climate Analytics.",
    keywords: ["TARK AI Team", "AI EdTech Leadership", "AI Education Experts"],
    alternates: {
        canonical: "https://tarkaiedtech.com/team",
    },
};

export default function TeamLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
