import type { Metadata } from 'next';
import AdmissionPageClient from '@/app/admission/AdmissionPageClient';

export const metadata: Metadata = {
  title: 'AI & Data Science Admission 2026-27 | Apply Free 3-Day Demo | TARK AI EdTech',
  description:
    'Apply to TARK AI EdTech\'s flagship AI/ML Architect & Data Science programs in Surat, Gujarat. Learn LLMs, Agentic AI & RAG from IIIT Lucknow mentors. 95% placement support. Reserve your free 3-day demo seat today!',
  keywords: [
    'AI admission Surat',
    'ML course apply Surat',
    'AI/ML Architect Program admission',
    'Best AI institute Surat Gujarat',
    'TARK AI EdTech admission 2026',
    'Data Science course Surat',
    'Python AI training Surat',
    'IIIT Lucknow AI mentorship',
    'Free AI demo class Surat',
    'Agentic AI course India',
  ],
  authors: [{ name: 'TARK AI EdTech Private Limited', url: 'https://tarkaiedtech.com' }],
  creator: 'TARK AI EdTech Private Limited',
  publisher: 'TARK AI EdTech Private Limited',
  openGraph: {
    title: 'AI & Data Science Admission 2026-27 | TARK AI EdTech Surat',
    description:
      'Join 1000+ students building future-ready AI careers. Apply for AI/ML Architect Program or Data Science & Strategic Analytics. IIIT Lucknow alumni mentors. 95% placement record.',
    url: 'https://tarkaiedtech.com/admission',
    siteName: 'TARK AI EdTech',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://tarkaiedtech.com/AI_ML_Architect_Program.jfif',
        width: 1200,
        height: 630,
        alt: 'TARK AI Admission & Free 3-Day Demo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI & Data Science Admission 2026-27 | TARK AI EdTech',
    description:
      'Apply to India\'s premier AI institute in Surat. IIIT Lucknow mentors, live LLM projects, free 3-day demo.',
    images: ['https://tarkaiedtech.com/AI_ML_Architect_Program.jfif'],
  },
  alternates: {
    canonical: 'https://tarkaiedtech.com/admission',
  },
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
};

// ── Master-Level JSON-LD Schemas ──────────────────────────────────────────────
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['EducationalOrganization', 'LocalBusiness'],
  name: 'TARK AI EdTech Private Limited',
  url: 'https://tarkaiedtech.com',
  logo: 'https://tarkaiedtech.com/Logo.png',
  image: 'https://tarkaiedtech.com/AI_ML_Architect_Program.jfif',
  description:
    'India\'s premier AI-powered EdTech institute in Surat, providing industry-leading AI, ML, and Data Science education taught by IIIT Lucknow graduates.',
  telephone: '+919712358689',
  email: 'info@tarkaiedtech.com',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Kyros Business Center, 404 & 405, Sarthana Jakat Naka',
    addressLocality: 'Surat',
    addressRegion: 'Gujarat',
    postalCode: '395013',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 21.229,
    longitude: 72.895,
  },
  sameAs: [
    'https://www.instagram.com/tarkaiedtech/',
    'https://www.linkedin.com/company/tark-ai/',
  ],
};

const courseSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'AI / ML Architect Program',
    description:
      'Master Deep Learning, Large Language Models (LLMs), RAG architectures, Agentic AI, and MLOps under IIIT Lucknow mentors.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'TARK AI EdTech Private Limited',
      sameAs: 'https://tarkaiedtech.com',
    },
    educationalCredentialAwarded: 'Certified AI / ML Architect Certificate',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended',
      location: 'TARK AI Campus Surat & Online',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Data Science & Strategic Analytics',
    description:
      'End-to-end data engineering, statistical modeling, machine learning, and BI dashboarding for data professionals.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'TARK AI EdTech Private Limited',
      sameAs: 'https://tarkaiedtech.com',
    },
    educationalCredentialAwarded: 'Certified Data Science & Strategic Analytics Certificate',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended',
      location: 'TARK AI Campus Surat & Online',
    },
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is included in the free 3-day demo session?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The 3-day demo includes live interactive AI classes, hands-on Python/ML exercises, direct Q&A with IIIT Lucknow mentors, and personalized career roadmap evaluation with no commitment required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who teaches the AI and Data Science programs at TARK AI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Programs are led directly by IIIT Lucknow alumni and senior AI research engineers with real-world production experience.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is placement support provided after completing the program?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! TARK AI provides 95% placement assistance including resume building, mock technical interviews, LinkedIn profile optimization, and direct job referrals to hiring partner companies.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are classes available offline in Surat and online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, TARK AI offers both offline classroom learning at our state-of-the-art Surat campus (Sarthana Jakat Naka) and live interactive online batches for remote students.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://tarkaiedtech.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Admission',
      item: 'https://tarkaiedtech.com/admission',
    },
  ],
};

export default function AdmissionPage() {
  return (
    <>
      {/* ── Google Rich Snippets JSON-LD Schemas ───────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {courseSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <AdmissionPageClient />
    </>
  );
}
