import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollAnimations from "./components/ScrollAnimations";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tarkaiedtech.com"),
  title: {
    default: "TARK AI: AI-Powered Career Guidance Platform",
    template: "%s | TARK AI"
  },
  description: "TARK AI EdTech Private Limited is an AI-powered EdTech platform delivering intelligent career guidance, personalized roadmaps, and future-ready AI programs.",
  keywords: ["AI Career Guidance Platform", "AI EdTech Platform", "AI-Powered Education", "AI Career Counseling", "AI Career Navigator", "TARK AI"],
  authors: [{ name: "TARK AI EdTech Private Limited" }],
  creator: "TARK AI EdTech Private Limited",
  publisher: "TARK AI EdTech Private Limited",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/Logo.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: [
      { url: '/favicon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tarkaiedtech.com",
    siteName: "TARK AI EdTech",
    title: "TARK AI: AI-Powered Career Guidance Platform",
    description: "TARK AI EdTech Private Limited is an AI-powered EdTech platform delivering intelligent career guidance, personalized roadmaps, and future-ready AI programs.",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "TARK AI EdTech Private Limited",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TARK AI: AI-Powered Career Guidance Platform",
    description: "TARK AI EdTech Private Limited is an AI-powered EdTech platform delivering intelligent career guidance, personalized roadmaps, and future-ready AI programs.",
    images: ["/Logo.png"],
    creator: "@TarkAI", // Assuming this handle based on docs
  },
  alternates: {
    canonical: "./",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "TARK AI EdTech Private Limited",
      "alternateName": "TARK AI",
      "url": "https://tarkaiedtech.com",
      "logo": "https://tarkaiedtech.com/Logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "tarkaiedtech@gmail.com",
        "contactType": "customer service"
      },
      "sameAs": [
        "https://www.linkedin.com/company/tark-ai", // Anticipating future link
        "https://twitter.com/TarkAI"
      ]
    },
    {
      "@type": "WebSite",
      "name": "TARK AI EdTech",
      "url": "https://tarkaiedtech.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://tarkaiedtech.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ScrollAnimations />
        <Navbar />
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
