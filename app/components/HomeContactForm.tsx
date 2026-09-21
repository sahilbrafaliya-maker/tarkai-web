"use client";

import React, { useState } from "react";
import { FaPaperPlane } from "@react-icons/all-files/fa/FaPaperPlane";
import { FaExclamationCircle } from "@react-icons/all-files/fa/FaExclamationCircle";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SuccessModal from "./SuccessModal";

const ContactSchema = z.object({
  name: z.string().min(1, "This field is required."),
  email: z.string().min(1, "This field is required.").email("Please enter a valid email address"),
  message: z.string().min(1, "This field is required."),
});

type ContactFormData = z.infer<typeof ContactSchema>;

export default function HomeContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');
    setFeedback('');

    try {
      const res = await fetch('/api/home-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (res.ok) {
        setStatus('success');
        setFeedback(resData.message || 'Message sent successfully!');
        reset();
        setTimeout(() => {
          setFeedback('');
          setStatus('idle');
        }, 5000);
      } else {
        setStatus('error');
        setFeedback(resData.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setFeedback('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {feedback && status === 'error' && (
          <div className="flex items-start gap-2 p-3 rounded-xl text-[14px] font-normal border bg-white text-red-500 border-red-500 transition-all duration-500">
            <FaExclamationCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <div className="flex-1 leading-relaxed">
              {feedback}
            </div>
          </div>
        )}

        <div>
          <label className="block text-[14px] sm:text-[15px] font-semibold text-[#0D1C2E] mb-2">Full Name</label>
          <input
            suppressHydrationWarning
            type="text"
            placeholder="Enter Your Full Name"
            {...register('name')}
            className={`w-full bg-[#F8FAFC] border rounded-xl px-4 py-3.5 text-[15px] placeholder:tracking-[1px] focus:outline-none focus:ring-1 transition-all ${
              errors.name ? 'border-red-500 text-red-500 focus:border-red-500 focus:ring-red-500' : 'text-[#0D1C2E] border-[#E2E8F0] focus:border-[#1D9C9A] focus:ring-[#1D9C9A]'
            }`}
          />
          {errors.name && (
            <p className="text-[12px] text-red-500 font-normal mt-1 flex items-center gap-1">
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{errors.name.message}</span>
            </p>
          )}
        </div>

        <div>
          <label className="block text-[14px] sm:text-[15px] font-semibold text-[#0D1C2E] mb-2">Email Address</label>
          <input
            suppressHydrationWarning
            type="email"
            placeholder="Enter Your Email Address"
            {...register('email')}
            className={`w-full bg-[#F8FAFC] border rounded-xl px-4 py-3.5 text-[15px] placeholder:tracking-[1px] focus:outline-none focus:ring-1 transition-all ${
              errors.email ? 'border-red-500 text-red-500 focus:border-red-500 focus:ring-red-500' : 'text-[#0D1C2E] border-[#E2E8F0] focus:border-[#1D9C9A] focus:ring-[#1D9C9A]'
            }`}
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

        <div>
          <label className="block text-[14px] sm:text-[15px] font-semibold text-[#0D1C2E] mb-2">Your Message</label>
          <textarea
            suppressHydrationWarning
            placeholder="Write it here..."
            rows={4}
            {...register('message')}
            className={`w-full bg-[#F8FAFC] border rounded-xl px-4 py-3.5 text-[15px] placeholder:tracking-[1px] focus:outline-none focus:ring-1 transition-all resize-none ${
              errors.message ? 'border-red-500 text-red-500 focus:border-red-500 focus:ring-red-500' : 'text-[#0D1C2E] border-[#E2E8F0] focus:border-[#1D9C9A] focus:ring-[#1D9C9A]'
            }`}
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

        <button
          suppressHydrationWarning
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-[#20A6A8] hover:bg-[#188183] text-white font-semibold text-[15px] sm:text-[16px] leading-[1.2] rounded-xl px-4 py-4 transition-colors duration-300 flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_8px_20px_-10px_rgba(32,166,168,0.5)]"
        >
          {status === 'loading' ? 'Sending...' : (
            <>Send Message <FaPaperPlane className="text-sm" /></>
          )}
        </button>
      </form>
      <SuccessModal 
        isOpen={status === 'success'} 
        onClose={() => { setFeedback(''); setStatus('idle'); }} 
        message={feedback}
      />
    </>
  );
}
