"use client";

import { useState, useRef, useEffect } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaChevronDown, FaCheck } from "react-icons/fa";

const programs = [
    { id: "ai-architect", name: "AI / ML Architect Program" },
    { id: "data-science", name: "Data Science & Strategic Analytics" },
    { id: "future-founders", name: "Future Founders – AI Foundation" },
    { id: "green-intelligence", name: "Green Intelligence – Climate Analytics" },
    { id: "other", name: "Other Inquiry" }
];

export default function ContactPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div className="bg-white min-h-screen pb-20 pt-28">
            <div className="bg-brand-lightest py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-darkest mb-6 animate-slide-up">Contact TARK AI for Career Guidance</h1>
                    <p className="text-xl text-brand-dark max-w-3xl mx-auto animate-slide-up animate-delay-200 opacity-0" style={{ animationFillMode: 'forwards' }}>
                        Have questions about our programs or want to partner with us? We'd love to hear from you.
                    </p>
                </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#186474 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-10">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up flex flex-col lg:flex-row">
                    {/* Contact Form Section */}
                    <div className="p-6 md:p-12 lg:w-3/5 bg-white relative">
                        <h2 className="text-3xl font-bold text-brand-darkest mb-2">Send us a Message</h2>
                        <p className="text-gray-500 mb-8">We usually respond within 24 hours.</p>

                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="text-sm font-semibold text-brand-darkest ml-1">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="w-full px-5 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 outline-none transition-all duration-300 font-medium placeholder-gray-400"
                                        placeholder="John"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="text-sm font-semibold text-brand-darkest ml-1">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        className="w-full px-5 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 outline-none transition-all duration-300 font-medium placeholder-gray-400"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-semibold text-brand-darkest ml-1">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 outline-none transition-all duration-300 font-medium placeholder-gray-400"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="space-y-2" ref={dropdownRef}>
                                <label className="text-sm font-semibold text-brand-darkest ml-1">Interested Program</label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(!isOpen)}
                                        className={`w-full px-5 py-4 rounded-xl bg-gray-50 border-2 flex items-center justify-between outline-none transition-all duration-300 font-medium text-left ${isOpen ? 'border-brand-accent ring-4 ring-brand-accent/10 bg-white' : 'border-transparent hover:bg-white hover:shadow-md'}`}
                                    >
                                        <span className={`${selectedProgram ? 'text-brand-darkest' : 'text-gray-400'}`}>
                                            {selectedProgram ? programs.find(p => p.id === selectedProgram)?.name : "Select a program..."}
                                        </span>
                                        <FaChevronDown className={`text-brand-accent transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Dropdown Menu */}
                                    <div className={`absolute z-50 left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 origin-top transform ${isOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'}`}>
                                        <div className="max-h-64 overflow-y-auto py-2 custom-scrollbar">
                                            {programs.map((program) => (
                                                <div
                                                    key={program.id}
                                                    onClick={() => {
                                                        setSelectedProgram(program.id);
                                                        setIsOpen(false);
                                                    }}
                                                    className={`px-5 py-3 cursor-pointer flex items-center justify-between transition-colors duration-200 ${selectedProgram === program.id ? 'bg-brand-accent/5 text-brand-accent font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                                                >
                                                    <span>{program.name}</span>
                                                    {selectedProgram === program.id && <FaCheck className="text-sm" />}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Hidden input for form submission if needed */}
                                    <input type="hidden" name="program" value={selectedProgram} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-semibold text-brand-darkest ml-1">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 outline-none transition-all duration-300 font-medium placeholder-gray-400 resize-none"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-brand-dark text-white font-bold py-4 rounded-xl hover:bg-brand-accent transition-all duration-300 transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2"
                            >
                                <span>Send Message</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </button>
                        </form>
                    </div>

                    {/* Contact Info Sidebar */}
                    <div className="lg:w-2/5 bg-brand-dark text-white p-6 md:p-12 relative overflow-hidden flex flex-col justify-between">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform duration-700 hover:scale-110"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-accent/20 rounded-full -ml-10 -mb-10 blur-3xl"></div>
                        <div className="absolute inset-0 bg-linear-to-br from-transparent to-black/20 pointer-events-none"></div>

                        <div className="relative z-10 mb-10">
                            <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
                            <p className="text-brand-light/80 text-lg">Reach out to us directly or visit our HQ.</p>
                        </div>

                        <div className="space-y-8 relative z-10 grow">
                            <div className="flex items-start group/item">
                                <div className="shrink-0 w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-brand-accent text-xl mr-5 border border-white/10 group-hover/item:bg-brand-accent group-hover/item:text-white transition-all duration-300">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Our Headquarters</h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        Surat, Gujarat
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start group/item">
                                <div className="shrink-0 w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-brand-accent text-xl mr-5 border border-white/10 group-hover/item:bg-brand-accent group-hover/item:text-white transition-all duration-300 delay-75">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Email Us</h3>
                                    <a href="mailto:info@tarkaiedtech.com" className="text-gray-300 hover:text-white transition-colors block leading-relaxed">info@tarkaiedtech.com</a>
                                    <a href="mailto:support@tarkaiedtech.com" className="text-gray-300 hover:text-white transition-colors block leading-relaxed">support@tarkaiedtech.com</a>
                                </div>
                            </div>

                            <div className="flex items-start group/item">
                                <div className="shrink-0 w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-brand-accent text-xl mr-5 border border-white/10 group-hover/item:bg-brand-accent group-hover/item:text-white transition-all duration-300 delay-150">
                                    <FaPhone />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Call Us</h3>
                                    <div className="group-hover/item:translate-x-2 transition-transform duration-300">
                                        <a href="tel:+919712358689" className="text-xl font-bold text-white block mb-1 hover:text-brand-accent transition-colors">+91 97123 58689</a>
                                        <p className="text-xs text-brand-accent font-medium tracking-wide">Mon-Fri, 9am - 6pm IST</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Graphics */}
                        <div className="relative z-10 mt-10 md:mt-0 opacity-30">
                            <div className="flex gap-4">
                                <div className="w-2 h-2 rounded-full bg-brand-accent"></div>
                                <div className="w-2 h-2 rounded-full bg-brand-accent"></div>
                                <div className="w-2 h-2 rounded-full bg-brand-accent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
