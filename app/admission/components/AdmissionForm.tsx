'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'motion/react';

// ─── Validation Schema ────────────────────────────────────────────────────────
const FormSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100, 'Name too long'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Enter a valid email address'),
  currentStatus: z.enum(
    ['School Student', 'College Student', 'Graduate', 'Working Professional'] as const,
    { message: 'Please select your current status' }
  ),
  courseInterested: z.enum(
    ['AI/ML Architect Program', 'Data Science & Analytics'] as const,
    { message: 'Please select a course' }
  ),
  demoSession: z.enum(
    ['AI/ML Architect Program', 'Data Science & Analytics'] as const,
    { message: 'Please select a demo session' }
  ),
});

type FormData = z.infer<typeof FormSchema>;

// ─── Step Config ──────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, title: 'Personal Info', subtitle: 'Tell us about yourself' },
  { id: 2, title: 'Education', subtitle: 'Your current status' },
  { id: 3, title: 'Career Goals', subtitle: 'Your learning preferences' },
  { id: 4, title: 'Confirmation', subtitle: 'Review & submit' },
];

const STORAGE_KEY = 'tarkai_admission_draft';

// ─── Sub-components ───────────────────────────────────────────────────────────
function FloatingInput({
  label, id, type = 'text', error, register, placeholder, ...rest
}: {
  label: string; id: string; type?: string; error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any; placeholder?: string; [key: string]: unknown;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        placeholder=" "
        className={`
          peer w-full px-4 pt-6 pb-2.5 rounded-xl border-2 bg-white
          text-slate-900 font-semibold outline-none transition-all duration-200
          placeholder-transparent shadow-xs
          ${error
            ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10'
            : 'border-slate-200 focus:border-brand-accent hover:border-slate-300 focus:ring-4 focus:ring-brand-accent/10'
          }
        `}
        {...register}
        {...rest}
      />
      <label
        htmlFor={id}
        className={`
          absolute left-4 transition-all duration-200 pointer-events-none font-medium
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400
          peer-focus:top-2 peer-focus:text-xs peer-focus:text-brand-accent peer-focus:font-bold
          ${error ? 'text-red-500 font-bold' : 'top-2 text-xs text-brand-accent font-bold'}
        `}
      >
        {label}
      </label>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-xs text-red-500 font-semibold flex items-center gap-1"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.p>
      )}
    </div>
  );
}

function RadioCard({
  value, selectedValue, onChange, label, description, id,
}: {
  value: string; selectedValue: string; onChange: (v: string) => void;
  label: string; description?: string; id: string;
}) {
  const isSelected = value === selectedValue;
  return (
    <label
      htmlFor={id}
      className={`
        relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer
        transition-all duration-200
        ${isSelected
          ? 'border-brand-accent bg-brand-accent/5 shadow-md shadow-brand-accent/10'
          : 'border-slate-200 bg-white hover:border-brand-accent/40 hover:bg-slate-50/80 shadow-xs'
        }
      `}
    >
      <input
        id={id}
        type="radio"
        value={value}
        checked={isSelected}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      {/* Custom radio */}
      <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
        isSelected ? 'border-brand-accent bg-brand-accent/10' : 'border-slate-300'
      }`}>
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-2.5 h-2.5 rounded-full bg-brand-accent"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <span className={`font-extrabold text-sm block ${isSelected ? 'text-brand-accent' : 'text-brand-darkest'}`}>
          {label}
        </span>
        {description && (
          <span className="text-xs text-slate-600 font-medium mt-0.5 block">{description}</span>
        )}
      </div>
    </label>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────
function SuccessScreen({ applicationId, name }: { applicationId: string; name: string }) {
  useEffect(() => {
    // Confetti
    import('canvas-confetti').then(({ default: confetti }) => {
      const end = Date.now() + 3000;
      const interval = setInterval(() => {
        if (Date.now() > end) { clearInterval(interval); return; }
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#2DA5A3', '#186474', '#9FEFFF'],
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#2DA5A3', '#186474', '#9FEFFF'],
        });
      }, 250);
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
      className="text-center py-12 px-6"
    >
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 150 }}
        className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-brand-accent to-brand-dark flex items-center justify-center shadow-2xl shadow-brand-accent/30"
      >
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h3 className="text-3xl font-extrabold text-brand-darkest mb-3">
          You&apos;re In, {name.split(' ')[0]}!
        </h3>
        <p className="text-brand-dark/70 text-lg mb-2">Your application has been received successfully.</p>
        <p className="text-brand-dark/70 mb-8">
          Our Admission Team will contact you within <strong className="text-brand-accent">24 hours</strong>.
        </p>

        {/* Application ID */}
        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-brand-lightest border border-brand-accent/20 mb-8">
          <svg className="w-5 h-5 text-brand-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <div className="text-left">
            <p className="text-xs text-brand-dark/50">Application ID</p>
            <p className="font-mono font-bold text-brand-darkest text-sm">{applicationId}</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/"
            className="px-8 py-3 rounded-xl border-2 border-brand-darkest/20 text-brand-darkest font-bold hover:bg-brand-darkest hover:text-white transition-all duration-200"
          >
            Go Home
          </a>
          <a
            href="https://wa.me/919712358689?text=Hi%20TARK%20AI!%20I%20just%20submitted%20my%20application."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-xl bg-green-500 text-white font-bold hover:bg-green-400 transition-colors flex items-center gap-2"
          >
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp Us
          </a>
          <a
            href="/programs"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-brand-accent to-brand-dark text-white font-bold hover:opacity-90 transition-opacity"
          >
            View Programs
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Form Component ──────────────────────────────────────────────────────
export default function AdmissionForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [direction, setDirection] = useState(1);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
  });

  const watchedValues = watch();

  // Auto-save to localStorage
  useEffect(() => {
    const values = getValues();
    if (Object.values(values).some(Boolean)) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
      } catch { /* ignore */ }
    }
  }, [watchedValues, getValues]);

  const validateStep = useCallback(async (step: number): Promise<boolean> => {
    switch (step) {
      case 1:
        return trigger(['fullName', 'mobile', 'email']);
      case 2:
        return trigger(['currentStatus']);
      case 3:
        return trigger(['courseInterested', 'demoSession']);
      default:
        return true;
    }
  }, [trigger]);

  const nextStep = async () => {
    const valid = await validateStep(currentStep);
    if (valid) {
      setDirection(1);
      setCurrentStep(s => Math.min(s + 1, 4));
      window.scrollTo({ top: document.getElementById('admission-form-section')?.offsetTop ?? 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep(s => Math.max(s - 1, 1));
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

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError('');
    try {
      let recaptchaToken = '';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (recaptchaSiteKey && typeof window !== 'undefined' && (window as any).grecaptcha) {
        try {
          recaptchaToken = await new Promise<string>((resolve) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (window as any).grecaptcha.ready(async () => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const token = await (window as any).grecaptcha.execute(recaptchaSiteKey, { action: 'submit_admission' });
              resolve(token);
            });
          });
        } catch (e) {
          console.warn('reCAPTCHA execution failed:', e);
        }
      }

      const utmParams = new URLSearchParams(window.location.search);
      const payload = {
        ...data,
        recaptchaToken,
        utmSource: utmParams.get('utm_source') || '',
        utmMedium: utmParams.get('utm_medium') || '',
        utmCampaign: utmParams.get('utm_campaign') || '',
        referralUrl: document.referrer || '',
        browser: navigator.userAgent.includes('Chrome') ? 'Chrome'
          : navigator.userAgent.includes('Firefox') ? 'Firefox'
          : navigator.userAgent.includes('Safari') ? 'Safari' : 'Other',
        device: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
      };

      // Direct Google Form fail-safe submission
      const googleFormUrl = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSedoPaZ3GJrjq15-sS7qdHp9ij0yEqWgQjaONDgh9x3Pokizg/formResponse';
      try {
        const formParams = new URLSearchParams();
        formParams.append('entry.863474013', payload.fullName);
        formParams.append('entry.1004421340', payload.mobile);
        formParams.append('entry.870850154', payload.email);
        formParams.append('entry.1211601395', payload.currentStatus);
        formParams.append('entry.1367535186', payload.courseInterested);
        formParams.append('entry.870638862', payload.demoSession);

        fetch(googleFormUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formParams.toString(),
        }).catch(() => {});
      } catch { /* ignore fallback error */ }

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
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  const formValues = getValues();

  return (
    <section
      id="admission-form-section"
      className="pt-24 sm:pt-28 pb-32 sm:pb-32 bg-slate-50/50 relative overflow-hidden scroll-mt-24"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-brand-dark/5 rounded-full blur-2xl" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <p className="text-brand-accent font-bold uppercase tracking-widest text-xs sm:text-sm mb-1 sm:mb-2">Apply Now</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-darkest mb-2 sm:mb-3 tracking-tight">
            Start Your{' '}
            <span className="text-brand-accent">AI Journey</span>
          </h2>
          <p className="text-brand-dark/70 text-sm sm:text-lg">
            Apply for a free 3-day demo session — no payment required.
          </p>
        </div>

        {/* Form Card */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
          {!isSuccess && (
            <>
              {/* Progress Steps */}
              <div className="px-4 sm:px-8 pt-5 sm:pt-7 pb-4 sm:pb-5 bg-slate-50/70 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  {STEPS.map((step, i) => (
                    <div key={step.id} className="flex items-center flex-1 last:flex-none">
                      {/* Step circle */}
                      <div className="flex flex-col items-center gap-1 sm:gap-1.5 relative">
                        <motion.div
                          animate={{
                            backgroundColor: currentStep > step.id ? '#2DA5A3'
                              : currentStep === step.id ? '#0F1C1E' : '#ffffff',
                            borderColor: currentStep >= step.id ? '#2DA5A3' : '#cbd5e1',
                            scale: currentStep === step.id ? 1.08 : 1,
                          }}
                          transition={{ duration: 0.3 }}
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center text-xs sm:text-sm font-bold shadow-xs ${
                            currentStep === step.id
                              ? 'ring-4 ring-brand-accent/20 text-white font-extrabold shadow-md'
                              : currentStep > step.id
                              ? 'text-white font-bold'
                              : 'text-slate-500 font-bold border-slate-300'
                          }`}
                        >
                          {currentStep > step.id ? (
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span>{step.id}</span>
                          )}
                        </motion.div>
                        <span className={`text-xs hidden sm:block whitespace-nowrap ${
                          currentStep === step.id
                            ? 'text-brand-darkest font-extrabold'
                            : currentStep > step.id
                            ? 'text-brand-accent font-bold'
                            : 'text-slate-500 font-medium'
                        }`}>
                          {step.title}
                        </span>
                      </div>
                      {/* Connector */}
                      {i < STEPS.length - 1 && (
                        <div className="flex-1 mx-1 sm:mx-2 h-1 rounded-full overflow-hidden bg-slate-200">
                          <motion.div
                            animate={{ width: currentStep > step.id ? '100%' : '0%' }}
                            transition={{ duration: 0.4 }}
                            className="h-full bg-brand-accent"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Step subtitle */}
                <div className="mt-3 sm:mt-4 text-center">
                  <p className="text-brand-dark/80 font-semibold text-xs sm:text-sm">
                    Step {currentStep} of {STEPS.length} — {STEPS[currentStep - 1].subtitle}
                  </p>
                </div>
              </div>

              <div className="px-4 sm:px-8 pb-6 sm:pb-8">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentStep}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      {/* ─── Step 1: Personal Info ─────────────────── */}
                      {currentStep === 1 && (
                        <div className="space-y-5">
                          <div className="mb-6">
                            <h3 className="text-xl font-bold text-brand-darkest">Personal Information</h3>
                            <p className="text-sm text-brand-dark/60 mt-1">Basic details so we can reach you.</p>
                          </div>

                          <FloatingInput
                            label="Full Name *"
                            id="fullName"
                            register={register('fullName')}
                            error={errors.fullName?.message}
                            placeholder="Your full name"
                            autoComplete="name"
                          />

                          <FloatingInput
                            label="Mobile Number *"
                            id="mobile"
                            type="tel"
                            register={register('mobile')}
                            error={errors.mobile?.message}
                            placeholder="10-digit mobile"
                            maxLength={10}
                            autoComplete="tel"
                          />

                          <FloatingInput
                            label="Email ID *"
                            id="email"
                            type="email"
                            register={register('email')}
                            error={errors.email?.message}
                            placeholder="you@email.com"
                            autoComplete="email"
                          />

                          {/* Trust indicator */}
                          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium pt-2">
                            <svg className="w-4 h-4 text-brand-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Your information is secure and will never be shared.
                          </div>
                        </div>
                      )}

                      {/* ─── Step 2: Education ─────────────────────── */}
                      {currentStep === 2 && (
                        <div className="space-y-5">
                          <div className="mb-6">
                            <h3 className="text-xl font-bold text-brand-darkest">Your Current Status</h3>
                            <p className="text-sm text-brand-dark/60 mt-1">This helps us recommend the right program for you.</p>
                          </div>

                          <Controller
                            name="currentStatus"
                            control={control}
                            render={({ field }) => (
                              <div className="space-y-3">
                                {[
                                  { value: 'School Student', desc: 'Class 9–12 | Future Founders track recommended' },
                                  { value: 'College Student', desc: 'B.Tech / B.Sc / BCA | AI Foundation + Architect' },
                                  { value: 'Graduate', desc: 'Degree holder | Any program available' },
                                  { value: 'Working Professional', desc: 'Employed | Weekend batches available' },
                                ].map(({ value, desc }) => (
                                  <RadioCard
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
                                  <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.currentStatus.message}
                                  </p>
                                )}
                              </div>
                            )}
                          />
                        </div>
                      )}

                      {/* ─── Step 3: Career Goals ─────────────────── */}
                      {currentStep === 3 && (
                        <div className="space-y-8">
                          {/* Course Interest */}
                          <div>
                            <div className="mb-5">
                              <h3 className="text-xl font-bold text-brand-darkest">Which course are you interested in?</h3>
                              <p className="text-sm text-brand-dark/60 mt-1">Select the program that matches your goals.</p>
                            </div>
                            <Controller
                              name="courseInterested"
                              control={control}
                              render={({ field }) => (
                                <div className="space-y-3">
                                  {[
                                    { value: 'AI/ML Architect Program', desc: '6 months | Full-stack AI + Placement support' },
                                    { value: 'Data Science & Analytics', desc: '5 months | Python, SQL, Statistics, BI tools' },
                                  ].map(({ value, desc }) => (
                                    <RadioCard
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
                                    <p className="text-xs text-red-500 flex items-center gap-1">
                                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                      </svg>
                                      {errors.courseInterested.message}
                                    </p>
                                  )}
                                </div>
                              )}
                            />
                          </div>

                          {/* Demo Session */}
                          <div>
                            <div className="mb-5">
                              <h3 className="text-xl font-bold text-brand-darkest">Select your free demo session</h3>
                              <p className="text-sm text-brand-dark/60 mt-1">Experience 3 days of world-class AI education, free.</p>
                            </div>
                            <Controller
                              name="demoSession"
                              control={control}
                              render={({ field }) => (
                                <div className="space-y-3">
                                  {[
                                    { value: 'AI/ML Architect Program', desc: '3-day AI/ML demo | Python, ML fundamentals, project' },
                                    { value: 'Data Science & Analytics', desc: '3-day Data Science demo | EDA, statistics, visualization' },
                                  ].map(({ value, desc }) => (
                                    <RadioCard
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
                                    <p className="text-xs text-red-500 flex items-center gap-1">
                                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                      </svg>
                                      {errors.demoSession.message}
                                    </p>
                                  )}
                                </div>
                              )}
                            />
                          </div>
                        </div>
                      )}

                      {/* ─── Step 4: Confirmation ─────────────────── */}
                      {currentStep === 4 && (
                        <div className="space-y-6">
                          <div className="mb-2">
                            <h3 className="text-xl font-bold text-brand-darkest">Review Your Application</h3>
                            <p className="text-sm text-brand-dark/60 mt-1">Please verify all details before submitting.</p>
                          </div>

                          {/* Summary card */}
                          <div className="rounded-2xl border border-brand-accent/20 bg-brand-lightest/50 overflow-hidden">
                            <div className="px-5 py-3 bg-brand-accent/10 border-b border-brand-accent/15">
                              <p className="text-brand-accent font-semibold text-sm">Application Summary</p>
                            </div>
                            <div className="divide-y divide-brand-darkest/5">
                              {[
                                { label: 'Full Name', value: formValues.fullName },
                                { label: 'Mobile', value: formValues.mobile },
                                { label: 'Email', value: formValues.email },
                                { label: 'Current Status', value: formValues.currentStatus },
                                { label: 'Course Interested', value: formValues.courseInterested },
                                { label: 'Demo Session', value: formValues.demoSession },
                              ].map(({ label, value }) => (
                                <div key={label} className="flex items-start justify-between px-5 py-3 gap-4">
                                  <span className="text-brand-dark/60 text-sm flex-shrink-0">{label}</span>
                                  <span className={`text-brand-darkest font-semibold text-sm text-right ${!value ? 'text-red-400 italic' : ''}`}>
                                    {value || 'Not filled'}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Disclaimer */}
                          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
                            <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <p className="text-amber-700 text-xs leading-relaxed">
                              By submitting this form, you agree to be contacted by TARK AI EdTech via phone, WhatsApp, and email. We respect your privacy and will never spam you.
                            </p>
                          </div>

                          {/* Error message */}
                          {submitError && (
                            <motion.div
                              initial={{ opacity: 0, y: -8 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2"
                            >
                              <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              {submitError}
                            </motion.div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between mt-10 pt-6 border-t border-brand-darkest/5">
                    {/* Back */}
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className={`
                        flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200
                        ${currentStep === 1
                          ? 'opacity-0 pointer-events-none'
                          : 'text-brand-dark/70 hover:text-brand-darkest hover:bg-brand-lightest'
                        }
                      `}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back
                    </button>

                    {/* Auto-save indicator */}
                    <span className="text-xs text-slate-500 font-semibold hidden sm:flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Auto-saved
                    </span>

                    {/* Next / Submit */}
                    {currentStep < 4 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        id={`form-next-step-${currentStep}`}
                        className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-brand-accent to-brand-dark text-white font-bold text-sm hover:opacity-90 hover:shadow-lg hover:shadow-brand-accent/20 transition-all duration-200 active:scale-95"
                      >
                        Continue
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        id="form-submit-button"
                        disabled={isSubmitting}
                        className={`
                          flex items-center gap-2 px-8 py-3 rounded-xl text-white font-bold text-sm
                          transition-all duration-200 active:scale-95
                          ${isSubmitting
                            ? 'bg-brand-accent/50 cursor-not-allowed'
                            : 'bg-gradient-to-r from-brand-accent to-brand-dark hover:opacity-90 hover:shadow-xl hover:shadow-brand-accent/30'
                          }
                        `}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <span>Submit Application</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </>
          )}

          {/* Success Screen */}
          {isSuccess && (
            <SuccessScreen applicationId={applicationId} name={formValues.fullName || 'Student'} />
          )}
        </div>
      </div>
    </section>
  );
}
