"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
    children?: React.ReactNode;
}

const iconContainerVariants: any = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { 
        scale: 1, 
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.1 }
    }
};

const checkmarkVariants: any = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
        pathLength: 1, 
        opacity: 1,
        transition: { duration: 0.4, ease: "easeOut", delay: 0.25 }
    }
};

const textVariants: any = {
    hidden: { y: 15, opacity: 0 },
    visible: { 
        y: 0, 
        opacity: 1,
        transition: { duration: 0.4, ease: "easeOut", delay: 0.3 }
    }
};

const buttonVariants: any = {
    hidden: { y: 15, opacity: 0 },
    visible: { 
        y: 0, 
        opacity: 1,
        transition: { duration: 0.4, ease: "easeOut", delay: 0.4 }
    }
};

export default function SuccessModal({ 
    isOpen, 
    onClose, 
    title = "Success!", 
    message = "Your submission has been received successfully. We will get back to you shortly.",
    children
}: SuccessModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Auto-close after 5 seconds if there are no complex children (like the Admission Form)
    useEffect(() => {
        if (isOpen && !children) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, children, onClose]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center px-4 sm:px-6 pointer-events-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#0F1C1E]/40 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                        className="relative w-full max-w-105 bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(32,166,168,0.2)] border border-[#20A6A8]/15 overflow-hidden z-10 flex flex-col"
                    >
                        {/* Decorative subtle border glow */}
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#20A6A8]/10 pointer-events-none" />

                        {/* Close Button */}
                        <button 
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-50 z-20 cursor-pointer"
                            aria-label="Close modal"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="p-8 sm:p-10 flex flex-col items-center text-center">
                            
                            {/* Success Icon */}
                            <motion.div 
                                variants={iconContainerVariants}
                                initial="hidden"
                                animate="visible"
                                className="relative w-20 h-20 mb-6 flex items-center justify-center"
                            >
                                {/* Subtle background glow */}
                                <div className="absolute inset-0 bg-[#20A6A8]/15 blur-xl rounded-full" />
                                {/* Icon background */}
                                <div className="relative w-full h-full bg-[#E8F6F6] border border-[#20A6A8]/20 rounded-full flex items-center justify-center shadow-inner">
                                    <svg className="w-10 h-10 text-[#20A6A8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <motion.path 
                                            variants={checkmarkVariants}
                                            d="M20 6L9 17l-5-5"
                                        />
                                    </svg>
                                </div>
                            </motion.div>
                            
                            {/* Heading */}
                            <motion.h3 
                                variants={textVariants}
                                initial="hidden"
                                animate="visible"
                                className="text-2xl sm:text-[26px] font-bold text-slate-900 mb-3 tracking-tight"
                            >
                                {title}
                            </motion.h3>

                            {/* Message / Children */}
                            <motion.div
                                variants={textVariants}
                                initial="hidden"
                                animate="visible"
                                className="w-full"
                            >
                                {!children ? (
                                    <p className="text-slate-500 text-[15px] leading-relaxed mb-8">
                                        {message}
                                    </p>
                                ) : (
                                    <div className="mt-2 w-full">
                                        {children}
                                    </div>
                                )}
                            </motion.div>

                            {/* Default CTA Action Button (Only if no children injected) */}
                            {!children && (
                                <motion.button
                                    variants={buttonVariants}
                                    initial="hidden"
                                    animate="visible"
                                    onClick={onClose}
                                    className="w-full bg-[#20A6A8] hover:bg-[#1D9C9A] text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-[0_8px_20px_-8px_rgba(32,166,168,0.6)] hover:shadow-[0_12px_25px_-10px_rgba(32,166,168,0.8)] hover:-translate-y-0.5 cursor-pointer"
                                >
                                    Continue
                                </motion.button>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
