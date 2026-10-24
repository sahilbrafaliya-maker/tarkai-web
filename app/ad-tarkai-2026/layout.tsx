import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ad Manager Portal',
    robots: {
        index: false,
        follow: false,
    },
};

export default function AdTarkaiLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
