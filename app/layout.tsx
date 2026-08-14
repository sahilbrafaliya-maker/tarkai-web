
import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollProgressBar from "./components/ScrollProgressBar";
import Preloader from "./components/Preloader";
import ChunkLoadHandler from "./components/ChunkLoadHandler";

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
        "caption": "TARK AI EdTech Private Limited — Best AI Institute in Surat"
      },
      "image": "https://tarkaiedtech.com/Logo.png",
      "foundingDate": "2026",
      "telephone": "+91-9712358689",
      "email": "info@tarkaiedtech.com",
      "priceRange": "₹₹",
      "currenciesAccepted": "INR",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer, UPI",
      "hasMap": "https://maps.google.com/?q=Kyros+Business+Center+Sarthana+Jakat+Naka+Surat+Gujarat",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+91-9712358689",
          "email": "info@tarkaiedtech.com",
          "contactType": "admissions",
          "availableLanguage": ["English", "Gujarati", "Hindi"],
          "areaServed": ["Surat", "Gujarat", "India"]
        },
        {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "url": "https://wa.me/919712358689",
          "availableLanguage": ["English", "Gujarati", "Hindi"]
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kyros Business Center, 404 & 405, beside Ashirwad Society, Sarthana Jakat Naka",
        "addressLocality": "Surat",
        "addressRegion": "Gujarat",
        "postalCode": "395013",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "21.2095",
        "longitude": "72.8398"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "19:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "10:00",
          "closes": "17:00"
        }
      ],
      "knowsAbout": [
        "Artificial Intelligence",
        "Machine Learning",
        "Agentic AI Systems",
        "Large Language Models",
        "Data Science",
        "Python Programming",
        "Climate Technology",
        "Climate Analytics",
        "Carbon Markets",
        "ESG Analytics",
        "Career Guidance",
        "EdTech"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "AI & Data Science Programs — Surat",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Course",
              "name": "AI / ML Architect Program",
              "url": "https://tarkaiedtech.com/programs/ai-ml-architect-program"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Course",
              "name": "Data Science & Strategic Analytics",
              "url": "https://tarkaiedtech.com/programs/data-science-strategic-analytics"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Course",
              "name": "Green Intelligence – Climate Analytics",
              "url": "https://tarkaiedtech.com/programs/green-intelligence-climate-analytics"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Course",
              "name": "Future Founders – AI Foundation",
              "url": "https://tarkaiedtech.com/programs/future-founders-ai-foundation"
            }
          }
        ]
      },
      "sameAs": [
        "https://www.linkedin.com/company/111475196/",
        "https://www.instagram.com/tarkaiedtech/",
        "https://www.facebook.com/tarkaiedtech/",
        "https://wa.me/919712358689"
      ]
    },
    // ─── WebSite with SearchAction ──────────────────────────────────────
    {
      "@type": "WebSite",
      "@id": "https://tarkaiedtech.com/#website",
      "name": "TARK AI EdTech",
      "alternateName": "Best AI Institute in Surat",
      "url": "https://tarkaiedtech.com",
      "inLanguage": "en-IN",
      "publisher": {
        "@id": "https://tarkaiedtech.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://tarkaiedtech.com/blog?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    // ─── WebPage (Homepage) ─────────────────────────────────────────────
    {
      "@type": "WebPage",
      "@id": "https://tarkaiedtech.com/#webpage",
      "url": "https://tarkaiedtech.com",
      "name": "Best AI Institute in Surat | TARK AI EdTech",
      "description": "TARK AI is Surat's top-rated AI & ML institute — IIIT Lucknow faculty, small batches, 1-Month Placement Ready Program.",
      "isPartOf": { "@id": "https://tarkaiedtech.com/#website" },
      "about": { "@id": "https://tarkaiedtech.com/#organization" },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://tarkaiedtech.com"
          }
        ]
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
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Lexend:wght@100..900&display=swap" rel="stylesheet" />
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1750221586166366');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1750221586166366&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body
        suppressHydrationWarning
        className={`antialiased bg-background text-foreground`}
      >
        <ChunkLoadHandler />
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
