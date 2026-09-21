"use client";

import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useRef, useEffect } from "react";
import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt";
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";
import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt";
import { FaPaperPlane } from "@react-icons/all-files/fa/FaPaperPlane";
import { FaUserGraduate } from "@react-icons/all-files/fa/FaUserGraduate";
import { FaLightbulb } from "@react-icons/all-files/fa/FaLightbulb";
import { FaBriefcase } from "@react-icons/all-files/fa/FaBriefcase";
import { FaGraduationCap } from "@react-icons/all-files/fa/FaGraduationCap";
import { FaChalkboardTeacher } from "@react-icons/all-files/fa/FaChalkboardTeacher";
import { FaCheckCircle } from "@react-icons/all-files/fa/FaCheckCircle";
import { FaExclamationCircle } from "@react-icons/all-files/fa/FaExclamationCircle";
import { FaChevronDown } from "@react-icons/all-files/fa/FaChevronDown";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import { FaSpinner } from "@react-icons/all-files/fa/FaSpinner";
import { FaPhone } from "@react-icons/all-files/fa/FaPhone";
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp";
import SuccessModal from '../components/SuccessModal';
import GeometricShapes from "../components/GeometricShapes";
import BackgroundText from "../components/BackgroundText";
import PageHeader from "../components/PageHeader";

const ContactSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().min(1, "This field is required.").email("Please enter a valid email address"),
    mobile: z.string().min(1, "This field is required.").regex(/^[6-9]\d{9}$/, "Invalid number"),
    program: z.string().optional(),
    message: z.string().min(1, "This field is required.")
});
type ContactFormData = z.infer<typeof ContactSchema>;

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

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: "" });
    const [iframeLoaded, setIframeLoaded] = useState(false);
    
    // Custom Map Overlay States
    const [showZoomMessage, setShowZoomMessage] = useState(false);
    const [isCtrlPressed, setIsCtrlPressed] = useState(false);
    const [isMapActive, setIsMapActive] = useState(false);
    const zoomTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Control' || e.ctrlKey) setIsCtrlPressed(true);
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === 'Control' || !e.ctrlKey) setIsCtrlPressed(false);
        };
        
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const handleMapWheel = (e: React.WheelEvent) => {
        if (!e.ctrlKey && !isMapActive) {
            setShowZoomMessage(true);
            if (zoomTimeoutRef.current) clearTimeout(zoomTimeoutRef.current);
            zoomTimeoutRef.current = setTimeout(() => {
                setShowZoomMessage(false);
            }, 1200);
        }
    };

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(ContactSchema),
        mode: "onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            program: "",
            message: ""
        }
    });

    // Keep selected program synced with react-hook-form manually or watch it
    // Actually, we can just use `setValue` when `selectedProgram` changes, 
    // but the original code sent it manually. Let's stick to manually injecting it or using the state directly.

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

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: "" });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    program: programs.find(p => p.id === selectedProgram)?.name || selectedProgram
                }),
            });

            const resData = await response.json();

            if (response.ok) {
                setSubmitStatus({ type: 'success', message: "Message sent! We'll get back to you shortly." });
                reset();
                setSelectedProgram("");
            } else {
                setSubmitStatus({ type: 'error', message: resData.error || "Failed to send message. Please try again." });
            }
        } catch (error) {
            setSubmitStatus({ type: 'error', message: "Something went wrong. Please check your connection." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white min-h-screen relative overflow-hidden">
            <GeometricShapes hideTopLeftHexagon={true} hideTriangle={true} variant="contact" />
            <PageHeader 
              badge="CONTACT US"
              title={<>Get in Touch <span className="text-[#20A6A8]">With Us</span></>}
              description={<span className="inline-block max-w-2xl mx-auto">Have questions about our programs or want to partner with us? We'd love to hear from you and guide you on your AI learning journey.</span>}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* Left Column: Info Content */}
                    <div className="lg:col-span-5 space-y-8 lg:pt-8 relative z-10">
                        <div>
                            <div className="inline-block px-4 py-2 rounded-full bg-brand-lightest/80 border border-brand-accent/30 mb-6 shadow-sm">
                                <span className="text-[12px] font-bold uppercase tracking-widest text-brand-accent flex items-center gap-2">
                                    <FaEnvelope className="w-3.5 h-3.5" />
                                    Send a Message
                                </span>
                            </div>
                            <h2 className="text-[36px] sm:text-[42px] md:text-[48px] font-bold leading-[1.1] tracking-tight text-brand-darkest mb-6">
                                How can we <span className="text-brand-accent">help?</span>
                            </h2>
                            <p className="text-[17px] md:text-[19px] font-medium text-gray-600 leading-relaxed max-w-lg">
                                Fill out the form below and our team will respond within 24 hours to help you on your AI learning journey. We're here to accelerate your career!
                            </p>
                        </div>
                        
                        <div className="space-y-5 pt-4 hidden md:block">
                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-brand-lightest flex items-center justify-center text-brand-accent border border-brand-accent/20 group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                                    <FaCheck className="text-sm" />
                                </div>
                                <p className="text-[16px] md:text-[17px] font-semibold text-gray-700">Expert career counseling</p>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-brand-lightest flex items-center justify-center text-brand-accent border border-brand-accent/20 group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                                    <FaCheck className="text-sm" />
                                </div>
                                <p className="text-[16px] md:text-[17px] font-semibold text-gray-700">Detailed curriculum walk-through</p>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-full bg-brand-lightest flex items-center justify-center text-brand-accent border border-brand-accent/20 group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                                    <FaCheck className="text-sm" />
                                </div>
                                <p className="text-[16px] md:text-[17px] font-semibold text-gray-700">Exclusive founder-led mentorship</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="lg:col-span-7 relative">
                        {/* Decorative Background for Form */}
                        <div className="absolute inset-0 bg-linear-to-br from-brand-accent/20 via-brand-lightest to-transparent rounded-[2.5rem] transform rotate-1 scale-[1.02] -z-10 blur-[2px] opacity-70"></div>
                        
                        <div className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 relative overflow-hidden group">
                            {/* Inside decor */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-brand-lightest to-transparent rounded-full -mr-20 -mt-20 blur-3xl transition-transform duration-700 group-hover:scale-110"></div>
                            
                            <div className="relative z-10">
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="text-sm font-semibold text-gray-700 ml-1">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        {...register("firstName")}
                                        className={`w-full px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-gray-300 outline-none transition-all duration-300 text-[14px] sm:text-[15px] placeholder-gray-400 ${
                                            errors.firstName ? 'border-red-500 text-red-500 font-normal focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10' : 'font-medium border-transparent focus:bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10'
                                        }`}
                                        placeholder="Enter First Name"
                                    />
                                    {errors.firstName && (
                                        <p className="text-[12px] text-red-500 font-normal mt-1 flex items-center gap-1">
                                            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <span>{errors.firstName.message}</span>
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="text-sm font-semibold text-gray-700 ml-1">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        {...register("lastName")}
                                        className={`w-full px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-gray-300 outline-none transition-all duration-300 text-[14px] sm:text-[15px] placeholder-gray-400 ${
                                            errors.lastName ? 'border-red-500 text-red-500 font-normal focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10' : 'font-medium border-transparent focus:bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10'
                                        }`}
                                        placeholder="Enter Last Name"
                                    />
                                    {errors.lastName && (
                                        <p className="text-[12px] text-red-500 font-normal mt-1 flex items-center gap-1">
                                            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <span>{errors.lastName.message}</span>
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        {...register("email")}
                                        className={`w-full px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-gray-300 outline-none transition-all duration-300 text-[14px] sm:text-[15px] placeholder-gray-400 ${
                                            errors.email ? 'border-red-500 text-red-500 font-normal focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10' : 'font-medium border-transparent focus:bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10'
                                        }`}
                                        placeholder="Enter Your Email Address"
                                    />
                                    {errors.email && (
                                        <p className="text-[12px] text-red-500 font-normal mt-1 flex items-center gap-1">
                                            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <span>{errors.email.message}</span>
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="mobile" className="text-sm font-semibold text-gray-700 ml-1">Mobile Number</label>
                                    <input
                                        type="tel"
                                        id="mobile"
                                        {...register("mobile")}
                                        maxLength={10}
                                        inputMode="numeric"
                                        onInput={(e) => {
                                            e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '').slice(0, 10);
                                        }}
                                        className={`w-full px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-gray-300 outline-none transition-all duration-300 text-[14px] sm:text-[15px] placeholder-gray-400 ${
                                            errors.mobile ? 'border-red-500 text-red-500 font-normal focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10' : 'font-medium border-transparent focus:bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10'
                                        }`}
                                        placeholder="Enter Your Phone Number"
                                    />
                                    {errors.mobile && (
                                        <p className="text-[12px] text-red-500 font-normal mt-1 flex items-center gap-1">
                                            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <span>{errors.mobile.message}</span>
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2" ref={dropdownRef}>
                                <label className="text-sm font-semibold text-gray-700 ml-1">Interested Program</label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(!isOpen)}
                                        className={`w-full px-4 py-3 rounded-xl bg-gray-50 border-2 flex items-center justify-between outline-none transition-all duration-300 text-[14px] sm:text-[15px] font-medium text-left ${isOpen ? 'border-brand-accent ring-4 ring-brand-accent/10 bg-white' : 'border-transparent hover:bg-white hover:shadow-md'}`}
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
                                                    {selectedProgram === program.id && <FaCheck className="text-[13px] sm:text-[14px]" />}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-semibold text-gray-700 ml-1">Message</label>
                                <textarea
                                    id="message"
                                    rows={3}
                                    {...register("message")}
                                    className={`w-full px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm hover:border-gray-300 outline-none transition-all duration-300 text-[14px] sm:text-[15px] placeholder-gray-400 resize-none ${
                                        errors.message ? 'border-red-500 text-red-500 font-normal focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10' : 'font-medium border-transparent focus:bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10'
                                    }`}
                                    placeholder="How can we help you?"
                                ></textarea>
                                {errors.message && (
                                    <p className="text-[12px] text-red-500 font-normal mt-1 flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <span>{errors.message.message}</span>
                                    </p>
                                )}
                            </div>

                            {/* Status Message */}
                            {submitStatus.message && submitStatus.type === 'error' && (
                                <div className="flex items-start gap-2 p-3 rounded-xl text-[14px] font-normal border bg-white text-red-500 border-red-500 transition-all duration-500">
                                    <FaExclamationCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                    <div className="flex-1 leading-relaxed">
                                        {submitStatus.message}
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full text-[15px] sm:text-[16px] bg-brand-accent text-white font-bold py-4 rounded-xl hover:bg-[#1b8f91] hover:shadow-brand-accent/30 transition-all duration-300 transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0 cursor-pointer"
                            >
                                {isSubmitting ? (
                                    <>
                                        <FaSpinner className="animate-spin" />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Send Message</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </>
                                )}
                            </button>
                        </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Location & Map Section */}
            <div className="bg-brand-lightest/20 py-16 mt-20 relative border-t border-brand-accent/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-bold text-brand-darkest flex items-center justify-center gap-2 mb-4">
                            Our <span className="text-brand-accent">Location</span>
                        </h2>
                        <p className="text-[16px] md:text-[18px] font-medium text-gray-600 max-w-2xl mx-auto">
                            Reach out to us directly or visit our headquarters. We're always excited to meet our students and partners in person!
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
                        {/* Left: Location Details */}
                        <div className="space-y-6 flex flex-col justify-center">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-5 items-start transition-transform hover:-translate-y-1 duration-300">
                                <div className="w-12 h-12 shrink-0 rounded-full bg-brand-lightest flex items-center justify-center text-brand-accent text-xl border border-brand-accent/20">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <h3 className="text-[18px] font-bold text-brand-darkest mb-1">Our Location</h3>
                                    <p className="text-[15px] text-gray-600 font-medium leading-relaxed">
                                        Kyros Business Center, 404 & 405,<br />
                                        beside Ashirwad Society,<br />
                                        Sarthana Jakat Naka, Surat, Gujarat 395013
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-5 items-start transition-transform hover:-translate-y-1 duration-300">
                                <div className="w-12 h-12 shrink-0 rounded-full bg-brand-lightest flex items-center justify-center text-brand-accent text-xl border border-brand-accent/20">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <h3 className="text-[18px] font-bold text-brand-darkest mb-1">Chat with us</h3>
                                    <p className="text-[15px] text-gray-600 font-medium">
                                        <a href="mailto:info@tarkaiedtech.com" className="hover:text-brand-accent transition-colors">info@tarkaiedtech.com</a>
                                    </p>
                                </div>
                            </div>
                            
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-5 items-start transition-transform hover:-translate-y-1 duration-300">
                                <div className="w-12 h-12 shrink-0 rounded-full bg-brand-lightest flex items-center justify-center text-brand-accent text-xl border border-brand-accent/20">
                                    <FaPhoneAlt />
                                </div>
                                <div>
                                    <h3 className="text-[18px] font-bold text-brand-darkest mb-1">Office Hours</h3>
                                    <p className="text-[15px] text-gray-600 font-medium mb-1">Monday to Saturday: <span className="font-bold text-gray-800">10:00 AM - 6:00 PM</span></p>
                                    <p className="text-[15px] text-gray-600 font-medium">
                                        Phone: <a href="tel:+919712358689" className="font-bold text-brand-darkest hover:text-brand-accent transition-colors">+91 97123 58689</a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Map */}
                        <div 
                            className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden h-100 lg:h-120 w-full relative"
                            onMouseLeave={() => setIsMapActive(false)}
                        >
                            {/* Custom Map Interaction Overlay */}
                            <div 
                                className={`absolute inset-0 z-20 transition-colors duration-300 flex items-center justify-center rounded-[1.25rem]
                                    ${showZoomMessage ? 'bg-black/60' : 'bg-transparent'}
                                    ${isCtrlPressed || isMapActive ? 'pointer-events-none' : 'pointer-events-auto'}
                                `}
                                onWheel={handleMapWheel}
                                onClick={() => setIsMapActive(true)}
                            >
                                <div className={`text-white text-[18px] font-medium tracking-wide transition-opacity duration-300 ${showZoomMessage ? 'opacity-100' : 'opacity-0'}`}>
                                    Use ctrl + scroll to zoom the map
                                </div>
                            </div>

                            {/* Persistent Loading Spinner until iframe fully loads */}
                            {!iframeLoaded && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 font-medium z-0 bg-slate-50 rounded-[1.25rem]">
                                    <div className="w-8 h-8 border-3 border-slate-200 border-t-brand-accent rounded-full animate-spin mb-3"></div>
                                    Loading Map...
                                </div>
                            )}
                            
                            <iframe
                                src="https://maps.google.com/maps?q=TarkAI+Edtech+Pvt.+Ltd.+Surat&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                style={{ border: 0, width: '100%', height: '100%' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className={`relative z-10 transition-opacity duration-500 rounded-[1.25rem] ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
                                onLoad={() => setIframeLoaded(true)}
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-brand-lightest/40 py-16 relative border-t border-brand-accent/10 overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-bold text-brand-darkest mb-4">
                        Ready to Start Your AI Career in Surat?
                    </h2>
                    <p className="text-[16px] md:text-[18px] text-[#20A6A8] font-medium mb-3">
                        Talk to our mentors. Ask about programs, fees, batch dates, and placement support.
                    </p>
                    <p className="text-[14px] md:text-[15px] text-gray-500 mb-8">
                        TarkAI EdTech · Kyros Business Center, Sarthana Jakat Naka, Surat 395013
                    </p>
                    <a
                        href="https://wa.me/919712358689?text=Hi%20TarkAI!%20I%27d%20like%20to%20book%20a%20free%20demo%20class."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#111827] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                        <FaWhatsapp className="text-[20px]" />
                        Book a Free Demo Class
                    </a>
                </div>
                {/* Decorative background elements similar to image */}
                <div className="absolute top-8 left-[10%] w-24 h-24 border border-[#20A6A8]/30 rounded-full opacity-50 hidden lg:block -z-10"></div>
                <div className="absolute bottom-10 right-[15%] w-32 h-32 border border-[#20A6A8]/30 rounded-full opacity-50 hidden lg:block -z-10"></div>
            </div>

            <SuccessModal 
                isOpen={submitStatus.type === 'success'} 
                onClose={() => setSubmitStatus({ type: null, message: "" })} 
                message={submitStatus.message}
            />
        </div>
    );
}
