import React from 'react';

const CookiesPage = () => {
    return (
        <main className="bg-brand-lightest min-h-screen flex flex-col">
            <div className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
                <h1 className="text-4xl font-extrabold text-brand-darkest mb-8">Cookie Policy</h1>
                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm space-y-6 text-gray-700 leading-relaxed text-justify">
                    <p className="text-sm text-gray-500">Last Updated: July 2, 2026</p>
                    
                    <p>
                        This Cookie Policy explains how <strong>TARK AI EdTech Private Limited</strong> ("TARK AI", "we", "us", or "our") uses cookies and similar tracking technologies when you visit our website (<a href="https://tarkaiedtech.com" className="text-brand-accent hover:underline font-semibold">https://tarkaiedtech.com</a>). 
                        It outlines what these technologies are, why we use them, and your rights to control our usage.
                    </p>

                    <h2 className="text-2xl font-bold text-brand-darkest mt-8 border-b pb-2 border-gray-100">1. What are Cookies?</h2>
                    <p>
                        Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
                        They are widely used by website operators to make websites work, or work more efficiently, as well as to provide reporting information.
                    </p>
                    <p>
                        Cookies set by the website owner are called &quot;first-party cookies&quot;. Cookies set by parties other than the website owner are called &quot;third-party cookies&quot;. 
                        Third-party cookies enable third-party features or functionality to be provided on or through the website (such as analytics or contact forms).
                    </p>

                    <h2 className="text-2xl font-bold text-brand-darkest mt-8 border-b pb-2 border-gray-100">2. Why We Use Cookies</h2>
                    <p>
                        We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as &quot;essential&quot; or &quot;strictly necessary&quot; cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our online properties.
                    </p>

                    <h2 className="text-2xl font-bold text-brand-darkest mt-8 border-b pb-2 border-gray-100">3. Types of Cookies We Use</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-brand-dark">A. Essential Website Cookies</h3>
                            <p className="text-sm text-gray-600 mt-1">
                                These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as secure forms or inquiry submissions. Because these cookies are necessary, you cannot refuse them without impacting how our site functions.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-brand-dark">B. Performance and Analytics Cookies</h3>
                            <p className="text-sm text-gray-600 mt-1">
                                These cookies collect information that is used in aggregate form to help us understand how our website is being used, how effective our marketing campaigns are, or to help us customize our website for you (for example, analyzing which AI program page is read most frequently).
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-brand-dark">C. Functionality Cookies</h3>
                            <p className="text-sm text-gray-600 mt-1">
                                These cookies are used to recognize you when you return to our website. This enables us to personalize our content for you and remember your preferences (such as your choice of region or language).
                            </p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-brand-darkest mt-8 border-b pb-2 border-gray-100">4. How You Can Control Cookies</h2>
                    <p>
                        You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. 
                        If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted. 
                        Since the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser&apos;s help menu for more information.
                    </p>

                    <h2 className="text-2xl font-bold text-brand-darkest mt-8 border-b pb-2 border-gray-100">5. Changes to This Cookie Policy</h2>
                    <p>
                        We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. 
                        Please re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
                    </p>

                    <h2 className="text-2xl font-bold text-brand-darkest mt-8 border-b pb-2 border-gray-100">6. More Information and Contact</h2>
                    <p>
                        If you have any questions about our use of cookies or other technologies, please contact our support desk:
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

export default CookiesPage;
