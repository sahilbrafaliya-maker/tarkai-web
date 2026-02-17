import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPage = () => {
    return (
        <main className="bg-brand-lightest min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
                <h1 className="text-4xl font-bold text-brand-darkest mb-8">Privacy Policy</h1>
                <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6 text-gray-700">
                    <p>At TarkAI, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.</p>

                    <h2 className="text-2xl font-bold text-brand-dark mt-6">1. Information We Collect</h2>
                    <p>We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support.</p>

                    <h2 className="text-2xl font-bold text-brand-dark mt-6">2. How We Use Your Information</h2>
                    <p>We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect TarkAI and our users.</p>

                    <h2 className="text-2xl font-bold text-brand-dark mt-6">3. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us at info@tarkaiedtech.com.</p>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default PrivacyPage;
