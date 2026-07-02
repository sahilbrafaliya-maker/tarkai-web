import React from 'react';

const TermsPage = () => {
    return (
        <main className="bg-brand-lightest min-h-screen flex flex-col">
            <div className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
                <h1 className="text-4xl font-extrabold text-brand-darkest mb-8">Terms of Service</h1>
                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm space-y-6 text-gray-700 leading-relaxed text-justify">
                    <p className="text-sm text-gray-500">Last Updated: July 2, 2026</p>
                    
                    <p>
                        Welcome to <strong>TARK AI EdTech Private Limited</strong> ("TARK AI", "we", "us", or "our"). 
                        By accessing our website (<a href="https://tarkaiedtech.com" className="text-brand-accent hover:underline font-semibold">https://tarkaiedtech.com</a>), booking a free demo class, or enrolling in our AI, Data Science, and Climate Analytics programs, you agree to comply with and be bound by the following Terms of Service.
                    </p>
                    <p>
                        Please read these terms carefully. If you do not agree to these terms, you must not access our website or enroll in our training programs.
                    </p>

                    <h2 className="text-2xl font-bold text-brand-darkest mt-8 border-b pb-2 border-gray-100">1. Acceptable Use and Age Limits</h2>
                    <p>
                        By accepting these Terms, you represent that you are at least 18 years of age and are fully competent to enter into binding agreements. 
                        If you are under 18, you may only access our site and enroll in our programs (like our Future Founders track) with the explicit involvement, consent, and supervision of a parent or legal guardian.
                    </p>

                    <h2 className="text-2xl font-bold text-brand-darkest mt-8 border-b pb-2 border-gray-100">2. Admissions, Batch Allocations &amp; Registrations</h2>
                    <p>
                        To enroll in a program, you must provide complete, accurate, and truthful contact and academic details. 
                        Batch slots are limited by design to ensure quality student-to-mentor interaction ratios. 
                        TARK AI reserves the right to deny admission or cancel registrations in the event of fraudulent documentation or computational integrity breaches.
                    </p>

                    <h2 className="text-2xl font-bold text-brand-darkest mt-8 border-b pb-2 border-gray-100">3. Fee Structures, Refund &amp; Cancellation Policy</h2>
                    <p>
                        All program fee structures are communicated explicitly by our admissions team before enrollment. 
                        Fees must be paid according to the selected schedule (lump sum or installment plans). 
                        TARK AI offers a free demo class so students can experience our instructional quality before making financial commitments. 
                        Refunds and cancellations are subject to our specific refund window timelines which are provided during the enrollment validation phase.
                    </p>

                    <h2 className="text-2xl font-bold text-brand-darkest mt-8 border-b pb-2 border-gray-100">4. Code of Conduct &amp; Classroom Ethics</h2>
                    <p>
                        TARK AI cultivates a supportive, professional, and concept-driven learning environment. All students are expected to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Maintain academic honesty. Copy-pasting model code or project code from third-party repos without understanding or credits is discouraged.</li>
                        <li>Respect fellow cohort members and academic mentors during live virtual sessions, offline lab classes, and group chats.</li>
                        <li>Refrain from copying, scraping, recording, or distributing TARK AI curriculum videos, slides, or custom codebase templates without written permission.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-brand-darkest mt-8 border-b pb-2 border-gray-100">5. Intellectual Property Rights</h2>
                    <p>
                        The curriculum, design system, illustrations, code snippets, project briefs, slides, video recordings, and trademark logos displayed on this site and throughout our training portals are the sole property of <strong>TARK AI EdTech Private Limited</strong>. 
                        You are granted a limited, personal, non-transferable license to access these resources for your own educational upskilling. You may not repurpose them for commercial training uses.
                    </p>

                    <h2 className="text-2xl font-bold text-brand-darkest mt-8 border-b pb-2 border-gray-100">6. Educational Outcomes &amp; Placement Disclaimer</h2>
                    <p>
                        We teach concepts systematically from Concept to Code to Case Study, led by IIIT Lucknow M.Sc. graduates, and provide a 1-Month Placement Ready Program. 
                        However, career transitions and employment outcomes depend heavily on the student's individual project performance, portfolio preparation, and interview delivery. 
                        TARK AI does not guarantee a specific salary, employment offer, or job landing as a condition of enrollment.
                    </p>

                    <h2 className="text-2xl font-bold text-brand-darkest mt-8 border-b pb-2 border-gray-100">7. Governing Law and Jurisdiction</h2>
                    <p>
                        These Terms of Service shall be governed by and construed in accordance with the laws of India. 
                        Any disputes arising out of or in connection with these terms, website access, or educational service delivery shall be subject to the exclusive jurisdiction of the competent courts in <strong>Surat, Gujarat, India</strong>.
                    </p>

                    <h2 className="text-2xl font-bold text-brand-darkest mt-8 border-b pb-2 border-gray-100">8. Contact Information</h2>
                    <p>
                        For inquiries, complaints, or policy clarifications regarding our Terms of Service, please write to:
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

export default TermsPage;
