import { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Education Programs | Machine Learning & Data Science Courses",
    description: "Explore TARK AI's industry-aligned programs in AI/ML, Data Science, Climate Analytics, and Foundation Learning. Concept-driven education with hands-on projects and expert mentorship.",
    keywords: ["AI Education Programs", "Machine Learning Courses", "Data Science Training", "AI ML Programs", "Climate Tech Courses", "AI Foundation Learning"],
    alternates: {
        canonical: "https://tarkaiedtech.com/programs",
    },
};

export default function ProgramsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
