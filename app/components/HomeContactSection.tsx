"use client";

import React from "react";
import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt";
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";
import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt";
import GeometricShapes from "./GeometricShapes";
import dynamic from "next/dynamic";

const HomeContactForm = dynamic(() => import("./HomeContactForm"), { ssr: false });

export default function HomeContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-white relative overflow-hidden">
      <GeometricShapes />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          <div className="max-w-2xl gsap-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#20A6A8]/10 border border-[#20A6A8]/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#20A6A8] animate-pulse"></div>
              <span className="text-[13px] font-semibold text-[#20A6A8] tracking-wide uppercase">Get In Touch</span>
            </div>
            
            <h2 className="text-[32px] md:text-[45px] lg:text-[54px] font-bold text-[#0F1C1E] leading-[1.1] mb-6 tracking-tight">
              Let's Build Your <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#20A6A8] to-[#157173]">AI Future</span> Together
            </h2>
            
            <p className="text-[16px] md:text-[18px] font-normal leading-[1.7] text-slate-500 mb-10 md:mb-12">
              Whether you're looking to start your AI journey, hire our graduates, or explore corporate training, our team is here to help you navigate the future of technology.
            </p>

            <div className="space-y-4">
              {/* Info Item 1 */}
              <div className="flex items-start gap-5 p-5 md:p-6 bg-[#20A6A8]/5 rounded-3xl border border-[#20A6A8]/10 transition-colors duration-300 hover:bg-[#20A6A8]/10">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#20A6A8] text-xl shrink-0 shadow-sm border border-[#20A6A8]/10">
                  <FaMapMarkerAlt aria-hidden="true" focusable="false" />
                </div>
                <div>
                  <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#0F1C1E] mb-1">Our Office</h3>
                  <p className="text-[14px] sm:text-[15px] font-normal leading-[1.6] text-slate-500">
                    Kyros Business Center, 404 & 405,<br />
                    Sarthana Jakat Naka,<br />
                    Surat, Gujarat 395013
                  </p>
                </div>
              </div>

              {/* Info Item 2 */}
              <div className="flex items-start gap-5 p-5 md:p-6 bg-[#20A6A8]/5 rounded-3xl border border-[#20A6A8]/10 transition-colors duration-300 hover:bg-[#20A6A8]/10">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#20A6A8] text-xl shrink-0 shadow-sm border border-[#20A6A8]/10">
                  <FaEnvelope aria-hidden="true" focusable="false" />
                </div>
                <div>
                  <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#0F1C1E] mb-1">Email Us</h3>
                  <p className="text-[14px] sm:text-[15px] font-normal leading-[1.6] text-slate-500">
                    info@tarkaiedtech.com
                  </p>
                </div>
              </div>

              {/* Info Item 3 */}
              <div className="flex items-start gap-5 p-5 md:p-6 bg-[#20A6A8]/5 rounded-3xl border border-[#20A6A8]/10 transition-colors duration-300 hover:bg-[#20A6A8]/10">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#20A6A8] text-xl shrink-0 shadow-sm border border-[#20A6A8]/10">
                  <FaPhoneAlt aria-hidden="true" focusable="false" />
                </div>
                <div>
                  <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#0F1C1E] mb-1">Call Us</h3>
                  <p className="text-[14px] sm:text-[15px] font-normal leading-[1.6] text-slate-500">
                    +91 97123 58689
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-4xl p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(45,165,163,0.15)] border border-[#E8F8F8] lg:mt-12 gsap-fade-up">
            <HomeContactForm />
          </div>

        </div>
      </div>
    </section>
  );
}
