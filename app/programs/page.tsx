"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { programs } from '@/data/programsData';
import GeometricShapes from '../components/GeometricShapes';
import BackgroundText from '../components/BackgroundText';
import { FaTimes, FaArrowRight, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { validateFullName, validateEmailAddress, validateMobileNumber } from '@/lib/securityValidation';

export default function ProgramsPage() {
    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'brochure' | 'enroll'>('brochure');
    const [activeProgramTitle, setActiveProgramTitle] = useState('');
    
    // Form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    
    // Status states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleOpenModal = (type: 'brochure' | 'enroll', programTitle: string) => {
        setModalType(type);
        setActiveProgramTitle(programTitle);
        setName('');
        setEmail('');
        setPhone('');
        setToastMessage(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Strict Security Validations
        const nameVal = validateFullName(name);
        if (!nameVal.isValid) {
            setToastMessage({ type: 'error', text: nameVal.error || 'Please enter a valid full name.' });
            return;
        }

        const emailVal = validateEmailAddress(email);
        if (!emailVal.isValid) {
            setToastMessage({ type: 'error', text: emailVal.error || 'Please enter a valid email address.' });
            return;
        }

        const phoneVal = validateMobileNumber(phone);
        if (!phoneVal.isValid) {
            setToastMessage({ type: 'error', text: phoneVal.error || 'Please enter a valid 10-digit mobile number.' });
            return;
        }

        setIsSubmitting(true);
        setToastMessage(null);

        try {
            const res = await fetch('/api/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim().toLowerCase(),
                    phone: phone.replace(/\D/g, ''),
                    branch: 'N/A',
                    program: activeProgramTitle,
                    type: modalType,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to submit enquiry.');
            }

            // Success case
            setToastMessage({
                type: 'success',
                text: modalType === 'brochure' 
                    ? 'Thank you! Your brochure download will start automatically.' 
                    : 'Enrolment request submitted! Our team will contact you shortly.'
            });

            // If it was a brochure request, trigger the download automatically
            if (modalType === 'brochure') {
                const link = document.createElement('a');
                link.href = '/TarkAI Edtech Brochure.pdf';
                link.download = 'TarkAI Edtech Brochure.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            // Reset form
            setName('');
            setEmail('');
            setPhone('');

            // Automatically close modal after 3 seconds on success
            setTimeout(() => {
                setIsModalOpen(false);
            }, 3000);

        } catch (error: any) {
            console.error('Submission error:', error);
            setToastMessage({ type: 'error', text: error.message || 'Something went wrong. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white min-h-screen pt-28 relative overflow-hidden">
            <GeometricShapes />
            <div className="bg-brand-lightest py-20 relative overflow-hidden">
                <BackgroundText text="PROGRAMS" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-darkest mb-6 gsap-fade-up">AI Education Programs for Career Growth</h1>
                    <p className="text-xl text-brand-dark max-w-3xl mx-auto gsap-fade-up">
                        Choose from a wide range of industry-aligned courses designed to launch your career.
                    </p>
                </div>
            </div>

            {/* Program Quick Comparison Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
                <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100/50 p-6 md:p-8">
                    <h2 className="text-2xl font-extrabold text-brand-darkest mb-6">Program Overview at a Glance</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="py-4 px-4 text-sm font-bold uppercase tracking-wider text-brand-accent">Program</th>
                                    <th className="py-4 px-4 text-sm font-bold uppercase tracking-wider text-brand-accent">Main Focus</th>
                                    <th className="py-4 px-4 text-sm font-bold uppercase tracking-wider text-brand-accent">Duration</th>
                                    <th className="py-4 px-4 text-sm font-bold uppercase tracking-wider text-brand-accent">Modules</th>
                                    <th className="py-4 px-4 text-sm font-bold uppercase tracking-wider text-brand-accent">Mentorship</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {programs.map((prog, idx) => (
                                    <tr key={idx} className="hover:bg-brand-lightest/30 transition-colors">
                                        <td className="py-4 px-4 font-bold text-brand-darkest text-base">{prog.title}</td>
                                        <td className="py-4 px-4 text-gray-600 text-sm">{prog.subtitle}</td>
                                        <td className="py-4 px-4 text-gray-700 font-semibold text-sm">
                                            {prog.slug === 'ai-ml-architect-program' || prog.slug === 'data-science-strategic-analytics' ? '6 Months' : '3 Months'}
                                        </td>
                                        <td className="py-4 px-4 text-gray-600 text-sm">{prog.roadmap.length} Modules</td>
                                        <td className="py-4 px-4 text-brand-accent font-bold text-sm">Included (Founder-led)</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-20 lg:space-y-32">
                {programs.map((program, index) => (
                    <div
                        key={index}
                        id={program.slug}
                        className={`flex flex-col lg:flex-row gap-8 lg:gap-20 relative scroll-mt-32 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                    >
                        {/* Content Side */}
                        <div className="flex-1 space-y-8">
                            <div className="gsap-fade-up">
                                <span className={`inline-block px-4 py-1 rounded-full text-white text-sm font-bold tracking-wider mb-4 ${program.color}`}>
                                    {program.duration}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-brand-darkest mb-2">{program.title}</h2>
                                <h3 className="text-xl text-brand-accent font-medium mb-6">{program.subtitle}</h3>
                                <div className="space-y-4">
                                    {program.description.slice(0, 2).map((desc, i) => (
                                        <p key={i} className="text-gray-600 text-lg leading-relaxed border-l-4 border-gray-100 pl-4">
                                            {desc}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            {/* CTAs row */}
                            <div className="flex flex-wrap gap-3 items-center">
                                <Link
                                    href={`/programs/${program.slug}`}
                                    className="inline-flex items-center text-brand-accent font-bold text-base hover:text-brand-dark transition-colors group mr-2"
                                >
                                    View Detailed
                                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                </Link>

                                <button
                                    onClick={() => handleOpenModal('brochure', program.title)}
                                    className="px-5 py-2.5 bg-white border border-brand-accent text-brand-accent font-semibold rounded-lg hover:bg-brand-lightest/45 transition-all duration-300 shadow-xs flex items-center gap-2 cursor-pointer text-sm"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                    Download Brochure
                                </button>

                                <button
                                    onClick={() => handleOpenModal('enroll', program.title)}
                                    className="px-5 py-2.5 bg-brand-accent text-white font-semibold rounded-lg hover:bg-brand-dark transition-all duration-300 shadow-sm cursor-pointer text-sm"
                                >
                                    Enroll Now
                                </button>
                            </div>
                        </div>

                        {/* Sticky Image Side */}
                        <div className="hidden lg:block lg:w-5/12 relative">
                            <div className="sticky top-32 h-[400px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
                                <Link href={`/programs/${program.slug}`}>
                                    {/* Visual Representation */}
                                    <div className={`absolute inset-0 ${program.color} opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-90 z-10`}></div>
                                    <div className="absolute inset-0 bg-linear-to-br from-brand-darkest/70 via-brand-darkest/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="absolute inset-0 bg-black/10 z-10 opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>

                                    {(program as any).image && (
                                        <Image
                                            src={(program as any).image}
                                            alt={program.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            draggable={false}
                                        />
                                    )}

                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center text-white z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-7xl mb-8 border border-white/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                            {program.icon}
                                        </div>
                                        <h2 className="text-2xl font-black mb-4 leading-tight">{program.title}</h2>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Popup Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300">
                    <div 
                        className="relative bg-[#FAF8F5] max-w-md w-full rounded-[32px] p-8 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button 
                            onClick={handleCloseModal}
                            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            <FaTimes size={20} />
                        </button>

                        {/* Title Header */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                                {modalType === 'brochure' ? 'Download Brochure' : 'Enroll Now'}
                            </h2>
                            <p className="text-sm font-semibold text-brand-accent mt-1">
                                {activeProgramTitle}
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name Input */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                                    Name
                                </label>
                                <input 
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full h-12 px-4 rounded-xl border border-gray-200/80 bg-white placeholder-gray-400 text-gray-900 focus:outline-hidden focus:border-brand-accent transition-all text-sm shadow-xs"
                                />
                            </div>

                            {/* Email Input */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                                    Email
                                </label>
                                <input 
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full h-12 px-4 rounded-xl border border-gray-200/80 bg-white placeholder-gray-400 text-gray-900 focus:outline-hidden focus:border-brand-accent transition-all text-sm shadow-xs"
                                />
                            </div>

                            {/* Phone Number Input */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                                    Phone Number
                                </label>
                                <input 
                                    type="tel"
                                    placeholder="10-digit mobile number"
                                    value={phone}
                                    maxLength={10}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    required
                                    className="w-full h-12 px-4 rounded-xl border border-gray-200/80 bg-white placeholder-gray-400 text-gray-900 focus:outline-hidden focus:border-brand-accent transition-all text-sm shadow-xs"
                                />
                            </div>

                            {/* Feedback Toast */}
                            {toastMessage && (
                                <div className={`flex items-center gap-2 p-3.5 rounded-xl border text-sm ${
                                    toastMessage.type === 'success' 
                                        ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                                        : 'bg-rose-50 border-rose-100 text-rose-800'
                                }`}>
                                    {toastMessage.type === 'success' ? <FaCheckCircle className="shrink-0" /> : <FaExclamationCircle className="shrink-0" />}
                                    <span>{toastMessage.text}</span>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-between pl-6 pr-3.5 h-12 rounded-full bg-brand-accent hover:bg-brand-dark border border-black/10 text-white font-bold transition-all shadow-md group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="text-base text-white font-extrabold tracking-wide">
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </span>
                                <div className="w-8 h-8 rounded-full bg-white text-brand-accent flex items-center justify-center shadow-xs shrink-0 group-hover:translate-x-0.5 transition-transform duration-300">
                                    {isSubmitting ? (
                                        <FaSpinner className="animate-spin text-sm" />
                                    ) : (
                                        <FaArrowRight className="text-sm text-brand-accent" />
                                    )}
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
