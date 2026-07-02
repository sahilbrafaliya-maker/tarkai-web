import React from 'react';

const PrivacyPage = () => {
    return (
        <main className="bg-brand-lightest min-h-screen flex flex-col">
            <div className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
                <h1 className="text-4xl font-extrabold text-brand-darkest mb-8">Privacy Policy</h1>
                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm space-y-6 text-gray-700 leading-relaxed text-justify">
                    <p className="text-sm text-gray-500">Last Updated: July 2, 2026</p>
                    
                    <p>
                        Welcome to <strong>TARK AI EdTech Private Limited</strong> ("TARK AI", "we", "us", or "our"). 
                        We operate the website <a href="https://tarkaiedtech.com" className="text-brand-accent hover:underline font-semibold">https://tarkaiedtech.com</a> and provide industry-aligned educational programs in Artificial Intelligence, Machine Learning, Data Science, and Climate Analytics.
                    </p>
                    <p>
                        We take your privacy seriously and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and protect your information when you interact with our website, enroll in our programs, or communicate with our team.
                    </p>

                    <h2 className="text-2xl font-bold text-brand-darkest mt-8 border-b pb-2 border-gray-100">1. Information We Collect</h2>
                    <p>
                        We collect personal and technical information to deliver our services, process inquiries, and improve user experiences. This includes:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Identity &amp; Contact Data:</strong> Name, email address, mobile number, educational background, professional status, and selected course preferences.</li>
                        <li><strong>Inquiry Data:</strong> Information you submit when booking a free demo class, requesting a brochure, or using our AI Career Guidance Portal.</li>
                        <li><strong>Usage Data:</strong> Technical logs, IP address, browser type, device information, and pages visited, collected automatically through analytics tools.</li>
                        <li><strong>Communication Records:</strong> Chats, emails, or WhatsApp message logs when you consult with our academic mentors.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-brand-darkest mt-8 border-b pb-2 border-gray-100">2. How We Use Your Information</h2>
                    <p>
                        We process your personal information based on legitimate educational and business interests, including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Processing your course enrollment requests and facilitating batch coordinates.</li>
                        <li>Sending requested information, such as program brochures or free trial materials.</li>
                        <li>Answering inquiries via email, phone call, or WhatsApp, and conducting mentor counseling.</li>
                        <li>Delivering and personalizing curriculum content through our Career Navigator systems.</li>
                        <li>Managing job placement support, including resume reviews, mock interviews, and portfolio audits.</li>
                        <li>Analyzing website performance to optimize loading speeds, navigation layouts, and technical reliability.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-brand-darkest mt-8 border-b pb-2 border-gray-100">3. Data Sharing and Disclosures</h2>
                    <p>
                        We do not sell, rent, or trade your personal data to third parties. We only share information under the following circumstances:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Service Providers:</strong> With trusted platforms assisting in server hosting, database connectivity, email dispatch, or learning management distribution.</li>
                        <li><strong>Corporate Partners &amp; Employers:</strong> With your prior consent, sharing placement portfolios, Github links, and resumes with recruiters during our Placement Ready program.</li>
                        <li><strong>Legal Requirements:</strong> When compelled by law, court order, or regulatory authorities in Gujarat or India.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-brand-darkest mt-8 border-b pb-2 border-gray-100">4. Children's Privacy</h2>
                    <p>
                        TARK AI offers foundational educational programs (such as Future Founders) that may be attended by teens. 
                        We require verified parental or guardian consent before enrolling any student under the age of 18. 
                        If we discover that a minor has submitted personal data without guardian consent, we will delete it immediately.
                    </p>

                    <h2 className="text-2xl font-bold text-brand-darkest mt-8 border-b pb-2 border-gray-100">5. Data Security &amp; Retention</h2>
                    <p>
                        We employ appropriate security measures (such as SSL encryption, database access firewalls, and restricted administrative privileges) to prevent unauthorized access, alteration, or distribution of your personal data. 
                        We retain your data only as long as necessary to fulfill the purposes for which it was collected or to comply with administrative requirements.
                    </p>

                    <h2 className="text-2xl font-bold text-brand-darkest mt-8 border-b pb-2 border-gray-100">6. Your Rights</h2>
                    <p>
                        Depending on location, you have the right to access, correct, restrict, or delete your personal data. You may also opt out of promotional newsletters or WhatsApp broadcasts at any time by replying with &quot;STOP&quot; or sending an email request to our compliance desk.
                    </p>

                    <h2 className="text-2xl font-bold text-brand-darkest mt-8 border-b pb-2 border-gray-100">7. Contact Us</h2>
                    <p>
                        For questions, corrections, or requests regarding this Privacy Policy, please contact our data administrator at:
                    </p>
                    <div className="bg-brand-lightest/40 p-5 rounded-2xl border border-brand-accent/10 mt-4 space-y-2 text-sm">
                        <p><strong>TARK AI EdTech Private Limited</strong></p>
                        <p>📍 Kyros Business Center, 404 &amp; 405, Sarthana Jakat Naka, Surat, Gujarat 395013</p>
                        <p>📧 Email: <a href="mailto:info@tarkaiedtech.com" className="text-brand-accent hover:underline">info@tarkaiedtech.com</a></p>
                        <p>📞 Phone: +91 97123 58689</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PrivacyPage;
