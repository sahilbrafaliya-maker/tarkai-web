"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { FaTimes } from "@react-icons/all-files/fa/FaTimes";
import { FaSpinner } from "@react-icons/all-files/fa/FaSpinner";
import { FaArrowRight } from "@react-icons/all-files/fa/FaArrowRight";
import { FaExclamationCircle } from "@react-icons/all-files/fa/FaExclamationCircle";
import { FaLaptopCode } from "@react-icons/all-files/fa/FaLaptopCode";
import { FaUserTie } from "@react-icons/all-files/fa/FaUserTie";
import { FaBriefcase } from "@react-icons/all-files/fa/FaBriefcase";
import SuccessModal from '@/app/components/SuccessModal';

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ProgramSchema = z.object({
    name: z.string().min(1, "This field is required."),
    email: z.string().min(1, "This field is required.").email("Please enter a valid email address"),
    phone: z.string().min(1, "This field is required.").regex(/^[6-9]\d{9}$/, "Invalid number"),
});
type ProgramFormData = z.infer<typeof ProgramSchema>;

interface ProgramModalProps {
    isOpen: boolean;
    onClose: () => void;
    modalType: 'brochure' | 'enroll';
    activeProgramTitle: string;
}

export default function ProgramModal({ isOpen, onClose, modalType, activeProgramTitle }: ProgramModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProgramFormData>({
        resolver: zodResolver(ProgramSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            phone: ""
        }
    });

    const onSubmit = async (data: ProgramFormData) => {
        setIsSubmitting(true);
        setToastMessage(null);

        try {
            const res = await fetch('/api/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name.trim(),
                    email: data.email.trim().toLowerCase(),
                    phone: data.phone.replace(/\D/g, ''),
                    branch: 'N/A',
                    program: activeProgramTitle,
                    type: modalType,
                }),
            });

            const resData = await res.json();

            if (!res.ok) {
                throw new Error(resData.error || 'Failed to submit enquiry.');
            }

            // Success case
            setToastMessage({
                type: 'success',
                text: modalType === 'brochure'
                    ? `Brochure sent successfully! Please check your email (${data.email.trim().toLowerCase()}) for the PDF.`
                    : 'Enrolment request submitted! Our team will contact you shortly.'
            });

            // Reset form
            reset();

            setTimeout(() => {
                onClose();
            }, 3000);

        } catch (error: unknown) {
            const err = error as Error;
            setToastMessage({ type: 'error', text: err.message || 'Something went wrong. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-4xl w-full mx-4 rounded-[2.5rem] p-px bg-linear-to-br from-[#20A6A8]/60 via-white/40 to-[#20A6A8]/30 shadow-[0_0_80px_-15px_rgba(32,166,168,0.4)]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="bg-white/95 backdrop-blur-3xl rounded-[calc(2.5rem-1px)] relative overflow-hidden flex flex-col md:flex-row">
                    {/* Decorative Background Glow for Mobile */}
                    <div className="md:hidden absolute top-0 right-0 w-32 h-32 bg-[#20A6A8]/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-[#0F1C1E] hover:bg-gray-100 border border-gray-100 transition-all cursor-pointer z-20"
                    >
                        <FaTimes size={14} />
                    </button>

                    {/* Left Content Panel */}
                    <div className="hidden md:block w-1/2 relative bg-[#0F1C1E] overflow-hidden group">
                        <Image
                            src="/images/enroll-form-bg-v4.jpg"
                            alt="Enroll in AI Program"
                            fill
                            className="object-cover opacity-60"
                            priority
                        />
                        {/* Gradient Overlay for text readability */}
                        <div className="absolute inset-0 bg-linear-to-t from-[#0F1C1E] via-[#0F1C1E]/60 to-transparent z-10"></div>

                        {/* Text Content */}
                        <div className="absolute inset-0 z-20 flex flex-col justify-end p-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#20A6A8]/20 backdrop-blur-md border border-[#20A6A8]/30 mb-6 self-start shadow-[0_0_15px_rgba(32,166,168,0.3)]">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-white drop-shadow-md">Admissions Open</span>
                            </div>
                            <h3 className="text-[32px] font-bold leading-tight mb-3 text-white drop-shadow-lg">
                                Build Your <span className="text-[#20A6A8]">AI Career</span>
                            </h3>
                            <p className="text-gray-200 text-[15px] leading-relaxed mb-8 drop-shadow-md pr-4">
                                Gain hands-on experience and learn from industry experts with our premium AI programs.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { icon: FaLaptopCode, title: "Industry Projects", desc: "Work on real-world projects" },
                                    { icon: FaUserTie, title: "Expert Mentorship", desc: "Learn from AI leaders" },
                                    { icon: FaBriefcase, title: "Career Support", desc: "Placement assistance" }
                                ].map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-4 group/feature bg-black/40 border border-white/10 hover:border-[#20A6A8]/50 hover:bg-black/60 p-4 rounded-2xl backdrop-blur-md transition-all duration-300">
                                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#20A6A8]/30 to-[#20A6A8]/10 border border-[#20A6A8]/30 flex items-center justify-center shrink-0 group-hover/feature:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(32,166,168,0.2)]">
                                            <feature.icon className="text-white text-sm drop-shadow-md" />
                                        </div>
                                        <div>
                                            <h4 className="text-[15px] font-bold text-white mb-0.5 tracking-wide drop-shadow-md">{feature.title}</h4>
                                            <p className="text-[13px] text-gray-300 leading-snug drop-shadow-sm">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Form Panel */}
                    <div className="w-full md:w-1/2 p-8 md:p-10 relative z-10">
                        {/* Title Header */}
                        <div className="mb-8 relative z-10">
                            <div className="inline-block px-3 py-1.5 rounded-full bg-[#E8F8F8] border border-[#20A6A8]/20 mb-4 md:hidden">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#20A6A8]">
                                    {modalType === 'brochure' ? 'Download' : 'Join Now'}
                                </span>
                            </div>
                            <h2 className="text-[26px] font-bold leading-tight tracking-[-0.03em] text-[#0F1C1E]">
                                {modalType === 'brochure' ? 'Get Brochure' : 'Enroll Now'}
                            </h2>
                            <p className="text-[14px] font-medium text-gray-500 mt-2 leading-relaxed">
                                You&apos;re applying for <span className="font-bold text-[#20A6A8]">{activeProgramTitle}</span>
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="group">
                                <label className="block text-[13px] font-semibold text-slate-700 mb-2 ml-1 transition-colors group-focus-within:text-[#20A6A8]">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    {...register("name")}
                                    className={`w-full h-14 px-5 rounded-xl border bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] placeholder-slate-400 focus:outline-none focus:ring-4 transition-all duration-300 text-[15px] font-medium ${errors.name ? 'border-red-400 text-red-600 focus:border-red-400 focus:ring-red-400/20' : 'text-slate-800 border-slate-200 hover:border-[#20A6A8]/40 focus:border-[#20A6A8] focus:ring-[#20A6A8]/15'
                                        }`}
                                />
                                {errors.name && (
                                    <p className="text-[13px] text-red-500 font-medium mt-1.5 ml-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div className="group">
                                <label className="block text-[13px] font-semibold text-slate-700 mb-2 ml-1 transition-colors group-focus-within:text-[#20A6A8]">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    {...register("email")}
                                    className={`w-full h-14 px-5 rounded-xl border bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] placeholder-slate-400 focus:outline-none focus:ring-4 transition-all duration-300 text-[15px] font-medium ${errors.email ? 'border-red-400 text-red-600 focus:border-red-400 focus:ring-red-400/20' : 'text-slate-800 border-slate-200 hover:border-[#20A6A8]/40 focus:border-[#20A6A8] focus:ring-[#20A6A8]/15'
                                        }`}
                                />
                                {errors.email && (
                                    <p className="text-[13px] text-red-500 font-medium mt-1.5 ml-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div className="group">
                                <label className="block text-[13px] font-semibold text-slate-700 mb-2 ml-1 transition-colors group-focus-within:text-[#20A6A8]">
                                    Mobile Number
                                </label>
                                <input
                                    type="tel"
                                    placeholder="Enter your 10-digit mobile number"
                                    {...register("phone")}
                                    maxLength={10}
                                    onInput={(e) => {
                                        e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '').slice(0, 10);
                                    }}
                                    className={`w-full h-14 px-5 rounded-xl border bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] placeholder-slate-400 focus:outline-none focus:ring-4 transition-all duration-300 text-[15px] font-medium tracking-wide ${errors.phone ? 'border-red-400 text-red-600 focus:border-red-400 focus:ring-red-400/20' : 'text-slate-800 border-slate-200 hover:border-[#20A6A8]/40 focus:border-[#20A6A8] focus:ring-[#20A6A8]/15'
                                        }`}
                                />
                                {errors.phone && (
                                    <p className="text-[13px] text-red-500 font-medium mt-1.5 ml-1">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>

                            {/* Feedback Toast */}
                            {toastMessage && toastMessage.type === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-start gap-2 p-3 rounded-xl text-[14px] font-normal border bg-white text-red-500 border-red-500 transition-all duration-500"
                                >
                                    <FaExclamationCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                    <div className="flex-1 leading-relaxed">
                                        {toastMessage.text}
                                    </div>
                                </motion.div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-14 mt-6 relative overflow-hidden rounded-xl bg-[#20A6A8] text-white font-bold transition-all shadow-[0_8px_25px_-8px_rgba(32,166,168,0.5)] hover:shadow-[0_12px_30px_-10px_rgba(32,166,168,0.7)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100"
                            >
                                <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                                <div className="relative z-10 flex items-center justify-center gap-3 px-6 h-full">
                                    <span className="text-[15px] tracking-wide">
                                        {isSubmitting ? 'Processing Request...' : 'Confirm & Submit'}
                                    </span>
                                    {isSubmitting ? (
                                        <FaSpinner className="animate-spin text-sm" />
                                    ) : (
                                        <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                                    )}
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            </motion.div>
            <SuccessModal
                isOpen={toastMessage?.type === 'success'}
                onClose={() => setToastMessage(null)}
                message={toastMessage?.text}
            />
        </div>
    );
}
