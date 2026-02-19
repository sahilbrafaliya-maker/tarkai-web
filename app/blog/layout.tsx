import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        default: 'Insights & Blog | TARK AI EdTech',
        template: '%s | TARK AI Blog'
    },
    description: 'Explore the latest insights on Artificial Intelligence, Data Science, and Career Development from TARK AI Industry Experts.',
    openGraph: {
        type: 'website',
        title: 'TARK AI Insights & Blog',
        description: 'Expert articles on AI, ML, Data Science, and the future of work.',
    },
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
