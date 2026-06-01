
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollProgressBar from "./components/ScrollProgressBar";
import Preloader from "./components/Preloader";

import "./globals.css";


export const metadata: Metadata = {
  metadataBase: new URL("https://tarkaiedtech.com"),
  title: {
    default: "TARK AI: Where Intelligence Meets Education",
    template: "%s | TARK AI"
  },
  description: "TARK AI EdTech Private Limited is an AI-powered EdTech platform delivering intelligent career guidance, personalized roadmaps, and future-ready AI programs.",
  keywords: ["AI EdTech Platform", "AI-Powered Education", "AI Career Navigator", "TARK AI"],
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
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tarkaiedtech.com",
    siteName: "TARK AI EdTech",
    title: "TARK AI: Where Intelligence Meets Education",
    description: "TARK AI EdTech Private Limited is an AI-powered EdTech platform delivering intelligent career guidance, personalized roadmaps, and future-ready AI programs.",
    images: [
      {
        url: "/favicon-96x96.png",
        width: 1600,
        height: 1600,
        alt: "TARK AI EdTech Private Limited",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TARK AI: Where Intelligence Meets Education",
    description: "TARK AI EdTech Private Limited is an AI-powered EdTech platform delivering intelligent career guidance, personalized roadmaps, and future-ready AI programs.",
    images: ["/favicon-96x96.png"],
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
      "@id": "https://tarkaiedtech.com/#organization",
      "name": "TARK AI EdTech Private Limited",
      "alternateName": "TARK AI",
      "legalName": "TARKAI EdTech Private Limited",
      "url": "https://tarkaiedtech.com",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://tarkaiedtech.com/#logo",
        "url": "https://tarkaiedtech.com/Logo.png",
        "caption": "TARK AI EdTech Private Limited Logo"
      },
      "foundingDate": "2026",
      "telephone": "+91-9712358689",
      "email": "info@tarkaiedtech.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9712358689",
        "email": "info@tarkaiedtech.com",
        "contactType": "customer service"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kyros Business Center, 404&405, beside Ashirwad Society, Sarthana Jakat Naka",
        "addressLocality": "Surat",
        "addressRegion": "Gujarat",
        "postalCode": "395013",
        "addressCountry": "IN"
      },
      "knowsAbout": [
        "Artificial Intelligence",
        "Machine Learning",
        "Data Science",
        "Climate Technology",
        "Green Intelligence",
        "Career Guidance",
        "EdTech"
      ],
      "sameAs": [
        "https://www.linkedin.com/company/111475196/",
        "https://www.instagram.com/tarkaiedtech/",
        "https://wa.me/919712358689"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://tarkaiedtech.com/#website",
      "name": "TARK AI EdTech",
      "url": "https://tarkaiedtech.com",
      "publisher": {
        "@id": "https://tarkaiedtech.com/#organization"
      },
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Playwrite+NZ+Basic:wght@100..400&display=swap" rel="stylesheet" />
      </head>
      <body
        suppressHydrationWarning
        className={`antialiased bg-background text-foreground`}
      >
        <Preloader />


        <Navbar />
        <ScrollProgressBar />
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
