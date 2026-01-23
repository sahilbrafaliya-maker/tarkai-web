import { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Education Programs | Industry-Aligned AI Training – TARK AI",
    description: "Industry-aligned AI Education Programs. Master AI/ML Architecture, Data Science, and strategic analytics with mentor-led training.",
    keywords: ["AI Education Programs", "AI Training Programs", "Machine Learning Courses", "Data Science Programs"],
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
