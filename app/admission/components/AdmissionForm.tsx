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
    message: 'Please enter a valid email address (disposable domains not allowed)',
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
  { id: 1, title: 'Personal Info', subtitle: 'Basic details so we can reach you' },
  { id: 2, title: 'Education', subtitle: 'Select your current status' },
  { id: 3, title: 'Program & Demo', subtitle: 'Choose your course interest & free demo' },
  { id: 4, title: 'Confirmation', subtitle: 'Review & submit application' },
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
          <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`
            w-full ${icon ? 'pl-10 pr-3.5' : 'px-3.5'} py-2.5 rounded-xl border bg-slate-50/60
            text-slate-900 font-semibold text-sm outline-none transition-all duration-200
            placeholder:text-slate-400 placeholder:font-normal focus:bg-white shadow-xs
            ${error
              ? 'border-red-400 focus:border-red-500 focus:ring-3 focus:ring-red-500/10'
              : 'border-slate-200 focus:border-brand-accent hover:border-slate-300 focus:ring-3 focus:ring-brand-accent/15'
            }
          `}
          {...register}
          {...rest}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 font-semibold mt-1 flex items-center gap-1">
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
        relative flex items-center p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-200 select-none
        ${isSelected
          ? 'border-brand-accent bg-brand-accent/5 shadow-md shadow-brand-accent/5 scale-[1.01]'
          : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/50'
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
      <div className="flex items-center gap-3 w-full">
        {/* Custom radio circle */}
        <div
          className={`
            w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors
            ${isSelected ? 'border-brand-accent bg-brand-accent' : 'border-slate-300'}
          `}
        >
          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
        </div>
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm leading-snug font-bold ${isSelected ? 'text-brand-darkest' : 'text-slate-800'
              }`}
          >
            {label}
          </p>
          {description && (
            <p className="text-xs text-slate-500 font-medium leading-normal mt-0.5">{description}</p>
          )}
        </div>
      </div>
    </label>
  );
}

// ─── Main AdmissionForm Component ──────────────────────────────────────────────
export default function AdmissionForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      mobile: '',
      email: '',
      currentStatus: undefined,
      courseInterested: undefined,
      demoSession: undefined,
    },
  });

  const formValues = watch();

  // Save draft to localStorage
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
        // ignore draft parse error
      }
    }
  }, [setValue]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
  }, [formValues]);

  // Step validation
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
      window.scrollTo({
        top: (document.getElementById('admission-form-section')?.offsetTop ?? 0) - 80,
        behavior: 'smooth',
      });
    }
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  // Load Google reCAPTCHA v3 script dynamically
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

  // Form submit handler
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      let recaptchaToken = '';
      if (recaptchaSiteKey && typeof window !== 'undefined' && 'grecaptcha' in window) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          recaptchaToken = await (window as any).grecaptcha.execute(recaptchaSiteKey, {
            action: 'admission_submit',
          });
        } catch (tokenErr) {
          console.warn('reCAPTCHA execution error:', tokenErr);
        }
      }

      const searchParams = new URLSearchParams(window.location.search);
      const payload = {
        ...data,
        recaptchaToken,
        utmSource: searchParams.get('utm_source') || '',
        utmMedium: searchParams.get('utm_medium') || '',
        utmCampaign: searchParams.get('utm_campaign') || '',
        referralUrl: document.referrer || '',
        browser: navigator.userAgent.includes('Chrome')
          ? 'Chrome'
          : navigator.userAgent.includes('Firefox')
            ? 'Firefox'
            : navigator.userAgent.includes('Safari')
              ? 'Safari'
              : 'Other',
        device: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
      };

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
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  };

  return (
    <section
      id="admission-form-section"
      className="pt-14 sm:pt-18 pb-16 sm:pb-20 bg-slate-50/60 relative overflow-hidden scroll-mt-24"
    >
      {/* Background ambient accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-brand-dark/5 rounded-full blur-2xl" />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <div className="text-center mb-5 sm:mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-black uppercase tracking-wider mb-2 shadow-xs">
            <span>🔥 FREE 3-DAY DEMO SEAT</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-darkest tracking-tight">
            Start Your <span className="text-brand-accent">AI Journey</span>
          </h2>
          <p className="text-brand-dark/70 text-xs sm:text-sm mt-1 font-medium">
            Fill out the form below to reserve your complimentary seat.
          </p>
        </div>

        {/* Compact Form Card */}
        <div className="relative rounded-2xl border border-slate-200/90 bg-white shadow-2xl shadow-slate-200/70 overflow-hidden">
          {!isSuccess ? (
            <>
              {/* Top Gradient Accent Bar */}
              <div className="h-1 w-full bg-gradient-to-r from-brand-accent via-emerald-400 to-teal-300" />

              {/* Sleek Compact Progress Bar Header */}
              <div className="px-4 sm:px-6 py-3 bg-[#0F1C1E] border-b border-brand-accent/20 text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-brand-accent to-emerald-400 text-white font-black text-xs flex items-center justify-center shadow-md">
                    {currentStep}
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-extrabold leading-none text-white tracking-tight">
                      {STEPS[currentStep - 1].title}
                    </p>
                    <p className="text-[11px] text-emerald-400/90 font-semibold mt-0.5 hidden sm:block">
                      {STEPS[currentStep - 1].subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-slate-300">
                    Step {currentStep} of 4
                  </span>
                  <div className="w-16 sm:w-24 h-2 rounded-full bg-white/15 overflow-hidden">
                    <motion.div
                      animate={{ width: `${(currentStep / 4) * 100}%` }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="h-full bg-gradient-to-r from-brand-accent to-emerald-400"
                    />
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-4 sm:p-6">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentStep}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      {/* ── Step 1: Personal Info ───────────────── */}
                      {currentStep === 1 && (
                        <div className="space-y-3.5">
                          <CompactInput
                            label="Full Name *"
                            id="fullName"
                            register={register('fullName')}
                            error={errors.fullName?.message}
                            placeholder="Enter your full name"
                            autoComplete="name"
                            icon={
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            }
                          />

                          <CompactInput
                            label="Mobile Number *"
                            id="mobile"
                            type="tel"
                            register={register('mobile')}
                            error={errors.mobile?.message}
                            placeholder="10-digit mobile number"
                            maxLength={10}
                            autoComplete="tel"
                            icon={
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            }
                          />

                          <CompactInput
                            label="Email ID *"
                            id="email"
                            type="email"
                            register={register('email')}
                            error={errors.email?.message}
                            placeholder="you@email.com"
                            autoComplete="email"
                            icon={
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            }
                          />

                          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium pt-1">
                            <svg className="w-3.5 h-3.5 text-brand-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span>Your details are 100% confidential. No spam guaranteed.</span>
                          </div>
                        </div>
                      )}

                      {/* ── Step 2: Education ───────────────────── */}
                      {currentStep === 2 && (
                        <div className="space-y-3">
                          <p className="text-xs font-bold text-slate-700 mb-1">
                            Select your current status:
                          </p>
                          <Controller
                            name="currentStatus"
                            control={control}
                            render={({ field }) => (
                              <div className="space-y-2.5">
                                {[
                                  { value: 'School Student', desc: 'Class 9–12 | Future Founders track' },
                                  { value: 'College Student', desc: 'B.Tech / B.Sc / BCA | AI Foundation' },
                                  { value: 'Graduate', desc: 'Degree holder | Full professional track' },
                                  { value: 'Working Professional', desc: 'Employed | Flexible evening & weekend batches' },
                                ].map(({ value, desc }) => (
                                  <CompactRadioCard
                                    key={value}
                                    id={`status-${value.replace(/\s+/g, '-')}`}
                                    value={value}
                                    label={value}
                                    description={desc}
                                    selectedValue={field.value ?? ''}
                                    onChange={field.onChange}
                                  />
                                ))}
                                {errors.currentStatus && (
                                  <p className="text-xs text-red-500 font-semibold mt-1">
                                    {errors.currentStatus.message}
                                  </p>
                                )}
                              </div>
                            )}
                          />
                        </div>
                      )}

                      {/* ── Step 3: Program & Demo ───────────────── */}
                      {currentStep === 3 && (
                        <div className="space-y-4">
                          {/* Course Interest */}
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">
                              Which program interests you most?
                            </label>
                            <Controller
                              name="courseInterested"
                              control={control}
                              render={({ field }) => (
                                <div className="space-y-2">
                                  {[
                                    { value: 'AI/ML Architect Program', desc: '7 Months | LLMs, Agentic AI, RAG & Placement support' },
                                    { value: 'Data Science & Analytics', desc: '7 Months | Python, SQL, ML Models & Dashboarding' },
                                  ].map(({ value, desc }) => (
                                    <CompactRadioCard
                                      key={value}
                                      id={`course-${value.replace(/[\s/&]+/g, '-')}`}
                                      value={value}
                                      label={value}
                                      description={desc}
                                      selectedValue={field.value ?? ''}
                                      onChange={field.onChange}
                                    />
                                  ))}
                                  {errors.courseInterested && (
                                    <p className="text-xs text-red-500 font-semibold mt-1">
                                      {errors.courseInterested.message}
                                    </p>
                                  )}
                                </div>
                              )}
                            />
                          </div>

                          {/* Demo Session */}
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">
                              Select your free 3-day demo batch:
                            </label>
                            <Controller
                              name="demoSession"
                              control={control}
                              render={({ field }) => (
                                <div className="space-y-2">
                                  {[
                                    { value: 'AI/ML Architect Program', desc: '3-Day AI/ML Demo | Python, Neural Networks & Live Project' },
                                    { value: 'Data Science & Analytics', desc: '3-Day Data Science Demo | EDA, Analytics & Visualization' },
                                  ].map(({ value, desc }) => (
                                    <CompactRadioCard
                                      key={value}
                                      id={`demo-${value.replace(/[\s/&]+/g, '-')}`}
                                      value={value}
                                      label={value}
                                      description={desc}
                                      selectedValue={field.value ?? ''}
                                      onChange={field.onChange}
                                    />
                                  ))}
                                  {errors.demoSession && (
                                    <p className="text-xs text-red-500 font-semibold mt-1">
                                      {errors.demoSession.message}
                                    </p>
                                  )}
                                </div>
                              )}
                            />
                          </div>
                        </div>
                      )}

                      {/* ── Step 4: Confirmation ─────────────────── */}
                      {currentStep === 4 && (
                        <div className="space-y-4">
                          <div className="rounded-xl border border-brand-accent/20 bg-slate-50/70 overflow-hidden shadow-xs">
                            <div className="px-4 py-2.5 bg-brand-darkest text-white flex items-center justify-between">
                              <p className="font-extrabold text-xs tracking-tight">Application Summary</p>
                              <span className="text-[10px] text-brand-accent font-bold uppercase">Ready to Submit</span>
                            </div>
                            <div className="divide-y divide-slate-200/70">
                              {[
                                { label: 'Full Name', value: formValues.fullName },
                                { label: 'Mobile Number', value: formValues.mobile },
                                { label: 'Email Address', value: formValues.email },
                                { label: 'Current Status', value: formValues.currentStatus },
                                { label: 'Course Interested', value: formValues.courseInterested },
                                { label: 'Demo Session', value: formValues.demoSession },
                              ].map(({ label, value }) => (
                                <div key={label} className="flex items-center justify-between px-4 py-2 gap-3">
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

                  {/* Sleek Action Footer */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-4 sm:px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-all active:scale-95 flex items-center gap-1.5"
                      >
                        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Back</span>
                      </button>
                    ) : (
                      <div />
                    )}

                    {currentStep < 4 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        id="admission-next-step-btn"
                        className="px-6 sm:px-7 py-2.5 rounded-xl bg-gradient-to-r from-brand-accent via-[#186474] to-brand-dark text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-brand-accent/30 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
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
                        className="px-6 sm:px-8 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-brand-accent to-brand-dark text-white font-black text-xs sm:text-sm shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Application</span>
                            <span className="text-sm">🚀</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </>
          ) : (
            /* ── Success Screen ─────────────────── */
            <div className="p-8 sm:p-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-brand-darkest">Application Submitted!</h3>
              <p className="text-slate-600 text-sm max-w-sm mx-auto font-medium">
                Thank you for applying to TARK AI EdTech. Our academic counselor will contact you within 24 hours.
              </p>
              {applicationId && (
                <div className="inline-block px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-bold">
                  Application ID: {applicationId}
                </div>
              )}
              <div className="pt-2">
                <a
                  href="/"
                  className="inline-block px-6 py-2.5 rounded-xl bg-brand-darkest text-white font-extrabold text-xs hover:bg-brand-dark transition-all"
                >
                  Return to Home
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
