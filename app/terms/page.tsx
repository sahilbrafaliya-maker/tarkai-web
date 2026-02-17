import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsPage = () => {
    return (
        <main className="bg-brand-lightest min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
                <h1 className="text-4xl font-bold text-brand-darkest mb-8">Terms of Service</h1>
                <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6 text-gray-700">
                    <p>Welcome to TarkAI. By accessing or using our website, you agree to be bound by these Terms of Service.</p>

                    <h2 className="text-2xl font-bold text-brand-dark mt-6">1. Acceptance of Terms</h2>
                    <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>

                    <h2 className="text-2xl font-bold text-brand-dark mt-6">2. Use of Services</h2>
                    <p>You agree to use our services only for lawful purposes and in accordance with these Terms.</p>

                    <h2 className="text-2xl font-bold text-brand-dark mt-6">3. Changes to Terms</h2>
                    <p>We reserve the right to modify these terms at any time. Please review these terms periodically for changes.</p>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default TermsPage;
