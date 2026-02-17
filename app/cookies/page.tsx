import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CookiesPage = () => {
    return (
        <main className="bg-brand-lightest min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
                <h1 className="text-4xl font-bold text-brand-darkest mb-8">Cookie Policy</h1>
                <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6 text-gray-700">
                    <p>This Cookie Policy explains how TarkAI uses cookies and similar technologies to recognize you when you visit our website.</p>

                    <h2 className="text-2xl font-bold text-brand-dark mt-6">1. What are cookies?</h2>
                    <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website.</p>

                    <h2 className="text-2xl font-bold text-brand-dark mt-6">2. Why do we use cookies?</h2>
                    <p>We use cookies to improve your experience on our website, understand how you interact with our content, and personalize your experience.</p>

                    <h2 className="text-2xl font-bold text-brand-dark mt-6">3. Managing cookies</h2>
                    <p>You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.</p>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default CookiesPage;
