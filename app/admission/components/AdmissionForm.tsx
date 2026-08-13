'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { validateFullName, validateEmailAddress, validateMobileNumber } from '@/lib/securityValidation';

// ─── Validation Schema ────────────────────────────────────────────────────────
const FormSchema = z.object({
  fullName: z.string().refine((val) => validateFullName(val).isValid, {
    message: 'Please enter a valid full name',
  }),
  mobile: z.string().refine((val) => validateMobileNumber(val).isValid, {
    message: 'Please enter a genuine 10-digit Indian mobile number',
  }),
  email: z.string().refine((val) => validateEmailAddress(val).isValid, {
    message: 'Please enter a valid email address',
  }),
  currentStatus: z.enum(
    ['School Student', 'College Student', 'Graduate', 'Working Professional'] as const
  ),
  courseInterested: z.enum(
    ['AI/ML Architect Program', 'Data Science & Analytics'] as const
  ),
  demoSession: z.enum(
    ['AI/ML Architect Program', 'Data Science & Analytics'] as const
  ),
});

type FormData = z.infer<typeof FormSchema>;

// ─── Step Config ──────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, title: 'Personal Info', subtitle: 'Basic contact details' },
  { id: 2, title: 'Current Status', subtitle: 'Your background level' },
  { id: 3, title: 'Program & Demo', subtitle: 'Track selection' },
  { id: 4, title: 'Review & Submit', subtitle: 'Final verification' },
];

const STORAGE_KEY = 'tarkai_admission_draft';

// ─── Sub-components ───────────────────────────────────────────────────────────
function CompactInput({
  label,
  id,
  type = 'text',
  error,
  register,
  placeholder,
  icon,
  ...rest
}: {
  label: string;
  id: string;
  type?: string;
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  placeholder?: string;
  icon?: React.ReactNode;
  [key: string]: unknown;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-bold text-slate-700 mb-1">
        {label}
      </label>
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 text-[#00737a] pointer-events-none flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`
            w-full ${icon ? 'pl-9 pr-3' : 'px-3'} py-2.5 sm:py-3 rounded-xl border bg-[#f8fafc]
            text-slate-900 font-semibold text-xs sm:text-sm outline-none transition-all duration-200
            placeholder:text-slate-400 placeholder:font-normal focus:bg-white shadow-2xs
            ${error
              ? 'border-red-400 focus:border-red-500 focus:ring-3 focus:ring-red-500/10'
              : 'border-slate-200 focus:border-[#00737a] hover:border-slate-300 focus:ring-3 focus:ring-[#00737a]/15'
            }
          `}
          {...register}
          {...rest}
        />
      </div>
      {error && (
        <p className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

function CompactRadioCard({
  id,
  value,
  label,
  description,
  selectedValue,
  onChange,
}: {
  id: string;
  value: string;
  label: string;
  description?: string;
  selectedValue: string;
  onChange: (val: string) => void;
}) {
  const isSelected = selectedValue === value;
  return (
    <label
      htmlFor={id}
      className={`
        relative flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border cursor-pointer
        transition-all duration-200 text-left select-none
        ${isSelected
          ? 'border-[#00737a] bg-[#e6f3f4]/50 shadow-xs'
          : 'border-slate-200 bg-[#f8fafc] hover:border-slate-300 hover:bg-white'
        }
      `}
    >
      <input
        type="radio"
        id={id}
        value={value}
        checked={isSelected}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <div
        className={`
          w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
          transition-colors ${isSelected ? 'border-[#00737a] bg-[#00737a]' : 'border-slate-300 bg-white'}
        `}
      >
        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
      </div>
      <div>
        <div className="text-xs sm:text-sm font-bold text-slate-900">{label}</div>
        {description && (
          <div className="text-[11px] text-slate-500 font-normal mt-0.5 leading-snug">{description}</div>
        )}
      </div>
    </label>
  );
}

// ─── Main AdmissionForm Component ─────────────────────────────────────────────
export default function AdmissionForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      mobile: '',
      email: '',
      currentStatus: 'College Student',
      courseInterested: 'AI/ML Architect Program',
      demoSession: 'AI/ML Architect Program',
    },
  });

  const formValues = watch();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const draft = localStorage.getItem(STORAGE_KEY);
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        if (parsed.fullName) setValue('fullName', parsed.fullName);
        if (parsed.mobile) setValue('mobile', parsed.mobile);
        if (parsed.email) setValue('email', parsed.email);
        if (parsed.currentStatus) setValue('currentStatus', parsed.currentStatus);
        if (parsed.courseInterested) setValue('courseInterested', parsed.courseInterested);
        if (parsed.demoSession) setValue('demoSession', parsed.demoSession);
      } catch {
        // ignore parse error
      }
    }
  }, [setValue]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
  }, [formValues]);

  const validateStep = useCallback(
    async (step: number) => {
      switch (step) {
        case 1:
          return await trigger(['fullName', 'mobile', 'email']);
        case 2:
          return await trigger(['currentStatus']);
        case 3:
          return await trigger(['courseInterested', 'demoSession']);
        default:
          return true;
      }
    },
    [trigger]
  );

  const nextStep = async () => {
    const valid = await validateStep(currentStep);
    if (valid) {
      setDirection(1);
      setCurrentStep((s) => Math.min(s + 1, 4));
    }
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  useEffect(() => {
    if (!recaptchaSiteKey) return;
    const scriptId = 'recaptcha-v3-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
      script.async = true;
      document.body.appendChild(script);
    }
  }, [recaptchaSiteKey]);

  const executeRecaptcha = async (): Promise<string | null> => {
    if (!recaptchaSiteKey || typeof window === 'undefined') return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const windowGrecaptcha = (window as any).grecaptcha;
    if (!windowGrecaptcha) return null;
    return new Promise((resolve) => {
      windowGrecaptcha.ready(() => {
        windowGrecaptcha
          .execute(recaptchaSiteKey, { action: 'admission_submit' })
          .then((token: string) => resolve(token))
          .catch(() => resolve(null));
      });
    });
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const recaptchaToken = await executeRecaptcha();
      const payload = {
        ...data,
        recaptchaToken: recaptchaToken || undefined,
      };

      // Direct client-side backup push to Google Apps Script (no-cors mode)
      const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbzlwDJuUJURJIZxzwZGteutxKL2fzKeXDxgITx5Nc4S1SzoXCAQwbTkj3VSxFL8AEI9/exec';
      if (googleScriptUrl) {
        try {
          fetch(googleScriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify({
              fullName: data.fullName,
              mobile: data.mobile,
              email: data.email,
              currentStatus: data.currentStatus,
              courseInterested: data.courseInterested,
              demoSession: data.demoSession || data.courseInterested,
              timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            }),
          }).catch((e) => console.log('Client Google Sheet sync warning:', e));
        } catch (e) {
          // Non-blocking fallback
        }
      }

      const res = await fetch('/api/admission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Submission failed');

      setApplicationId(result.applicationId);
      localStorage.removeItem(STORAGE_KEY);
      setIsSuccess(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 30 : -30, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -30 : 30, opacity: 0 }),
  };

  return (
    <div
      id="admission-form-card"
      className="bg-white rounded-3xl border border-[#00737a]/20 shadow-xl overflow-hidden transition-all duration-300 scroll-mt-28"
    >
      {!isSuccess ? (
        <div>
          {/* Form Card Header */}
          <div className="p-4 sm:p-8 pb-4 border-b border-slate-100 bg-[#f8fafc]">
            <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] tracking-tight mb-1">
              Apply for <span className="text-[#00737a]">Free Demo</span>
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm font-medium">
              Fill in your details below to reserve your 3-day demo seat.
            </p>
          </div>

          {/* Form Content */}
          <div className="p-4 sm:p-8">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                >
                  {/* Step 1: Personal Info */}
                  {currentStep === 1 && (
                    <div className="space-y-3.5 sm:space-y-4">
                      <CompactInput
                        label="Full Name *"
                        id="fullName"
                        register={register('fullName')}
                        error={errors.fullName?.message}
                        placeholder="e.g. Rahul Sharma"
                        autoComplete="name"
                        icon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        }
                      />

                      <CompactInput
                        label="Mobile Number (WhatsApp) *"
                        id="mobile"
                        type="tel"
                        register={register('mobile')}
                        error={errors.mobile?.message}
                        placeholder="10-digit Indian mobile number"
                        autoComplete="tel"
                        maxLength={10}
                        icon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        }
                      />

                      <CompactInput
                        label="Email Address *"
                        id="email"
                        type="email"
                        register={register('email')}
                        error={errors.email?.message}
                        placeholder="e.g. rahul@gmail.com"
                        autoComplete="email"
                        icon={
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        }
                      />
                    </div>
                  )}

                  {/* Step 2: Current Status */}
                  {currentStep === 2 && (
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        Select Your Current Educational / Career Status *
                      </label>
                      <Controller
                        name="currentStatus"
                        control={control}
                        render={({ field }) => (
                          <div className="space-y-2">
                            {[
                              {
                                value: 'School Student',
                                label: 'School Student',
                                desc: 'Class 9th – 12th exploring AI foundation',
                              },
                              {
                                value: 'College Student',
                                label: 'College Student',
                                desc: 'B.Tech, BCA, B.Sc, MCA undergraduate/postgraduate',
                              },
                              {
                                value: 'Graduate',
                                label: 'Recent Graduate',
                                desc: 'Seeking entry-level AI & Data Science roles',
                              },
                              {
                                value: 'Working Professional',
                                label: 'Working Professional',
                                desc: 'Software dev / analyst looking to upskill in AI',
                              },
                            ].map((opt) => (
                              <CompactRadioCard
                                key={opt.value}
                                id={`status-${opt.value}`}
                                value={opt.value}
                                label={opt.label}
                                description={opt.desc}
                                selectedValue={field.value}
                                onChange={field.onChange}
                              />
                            ))}
                          </div>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 3: Program & Demo */}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">
                          Select Specialization Track *
                        </label>
                        <Controller
                          name="courseInterested"
                          control={control}
                          render={({ field }) => (
                            <div className="space-y-2">
                              {[
                                {
                                  value: 'AI/ML Architect Program',
                                  label: 'AI / ML Architect Program (7 Months)',
                                  desc: 'LLMs, Autonomous AI Agents, RAG & MLOps',
                                },
                                {
                                  value: 'Data Science & Analytics',
                                  label: 'Data Science & Strategic Analytics (5 Months)',
                                  desc: 'Python, ML models, SQL & BI Executive Dashboards',
                                },
                              ].map((opt) => (
                                <CompactRadioCard
                                  key={opt.value}
                                  id={`course-${opt.value}`}
                                  value={opt.value}
                                  label={opt.label}
                                  description={opt.desc}
                                  selectedValue={field.value}
                                  onChange={(val) => {
                                    field.onChange(val);
                                    setValue('demoSession', val as FormData['demoSession']);
                                  }}
                                />
                              ))}
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 4: Review & Submit */}
                  {currentStep === 4 && (
                    <div className="space-y-4">
                      <div className="rounded-2xl border border-slate-200 bg-[#f8fafc] overflow-hidden text-left">
                        <div className="p-3 bg-slate-100/70 border-b border-slate-200 font-bold text-xs text-slate-700">
                          Application Summary
                        </div>
                        <div className="divide-y divide-slate-200">
                          {[
                            { label: 'Full Name', value: formValues.fullName },
                            { label: 'Mobile Number', value: formValues.mobile },
                            { label: 'Email Address', value: formValues.email },
                            { label: 'Current Status', value: formValues.currentStatus },
                            { label: 'Program Interest', value: formValues.courseInterested },
                            { label: 'Demo Batch', value: formValues.demoSession },
                          ].map(({ label, value }) => (
                            <div key={label} className="flex items-center justify-between px-4 py-2.5 gap-3">
                              <span className="text-xs font-semibold text-slate-500">{label}</span>
                              <span className={`text-xs font-bold text-slate-900 text-right ${!value ? 'text-red-500 italic' : ''}`}>
                                {value || 'Not provided'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {submitError && (
                        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                          <span>⚠️</span>
                          <span>{submitError}</span>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 sm:px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-all flex items-center justify-center gap-1.5 shrink-0 min-h-[46px] cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Back</span>
                  </button>
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    id="admission-next-step-btn"
                    className="flex-1 py-3.5 px-6 rounded-xl bg-[#00737a] hover:bg-[#005a60] text-white font-bold text-sm shadow-md shadow-[#00737a]/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 min-h-[46px] cursor-pointer"
                  >
                    <span>Continue</span>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="admission-submit-btn"
                    className="flex-1 py-3.5 px-6 rounded-xl bg-[#00737a] hover:bg-[#005a60] text-white font-bold text-sm sm:text-base shadow-md shadow-[#00737a]/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 min-h-[46px] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* Success State */
        <div className="p-8 sm:p-12 text-center bg-white">
          <div className="w-16 h-16 rounded-full bg-[#e6f3f4] text-[#00737a] flex items-center justify-center mx-auto mb-4 border border-[#00737a]/30">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] mb-2">
            Application Submitted!
          </h3>
          <p className="text-slate-600 text-sm mb-6 max-w-sm mx-auto font-medium">
            Thank you, <strong className="text-slate-900">{formValues.fullName}</strong>. Your 3-day demo seat reservation has been recorded.
          </p>

          {applicationId && (
            <div className="inline-block px-4 py-2 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs font-mono font-bold text-[#00737a] mb-6">
              Application ID: {applicationId}
            </div>
          )}

          <div className="p-4 rounded-2xl bg-[#e6f3f4]/60 border border-[#00737a]/20 text-left mb-6 text-xs text-slate-700 space-y-1.5">
            <p className="font-bold text-[#00737a]">Next Steps:</p>
            <p>1. Our admissions team will WhatsApp / call you within 24 hours.</p>
            <p>2. You will receive Google Meet / Surat Campus directions for your batch.</p>
          </div>

          <a
            href="https://wa.me/919712358689?text=Hi%20TarkAI!%20I%20just%20submitted%20my%20admission%20application."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-md transition-all w-full sm:w-auto"
          >
            <span>Confirm Instantly via WhatsApp</span>
          </a>
        </div>
      )}
    </div>
  );
}
