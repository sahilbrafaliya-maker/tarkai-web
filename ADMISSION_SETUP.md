# TARK AI EdTech — Admission Page Setup Guide

## Overview

The admission landing page is live at `/admission`. It includes:
- Premium 7-section landing page (Hero, Benefits, Timeline, Testimonials, Programs, FAQ, Form)
- 4-step multi-step admission form with auto-save
- Google Sheets integration via Apps Script
- Email notifications (applicant + admission team)
- Success screen with confetti animation
- WhatsApp & Call floating buttons
- Exit intent popup

---

## 1. Google Apps Script Setup (Required for Google Sheets)

### Step 1: Create Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new spreadsheet named **"TARK AI Admissions"**
3. Copy the **Sheet ID** from the URL:
   `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`

### Step 2: Deploy Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Create a **New Project**
3. Delete all default code and paste the contents of `scripts/google-apps-script.js`
4. **Update** `var SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'` with your actual Sheet ID
5. Click **Deploy > New Deployment**
6. Select Type: **Web App**
7. Set **Execute as**: Me
8. Set **Who has access**: Anyone
9. Click **Deploy** and authorize permissions
10. Copy the **Web App URL** (looks like: `https://script.google.com/macros/s/AKfy.../exec`)

### Step 3: Add to Environment
```env
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### Google Sheet Columns (auto-created):
| Col | Field |
|-----|-------|
| A | Timestamp |
| B | Application ID |
| C | Full Name |
| D | Mobile |
| E | Email |
| F | Current Status |
| G | Course Interested |
| H | Demo Session |
| I | Browser |
| J | Device |
| K | UTM Source |
| L | UTM Medium |
| M | UTM Campaign |
| N | Referral URL |
| O | IP Address |

---

## 2. Google reCAPTCHA v3 Setup (Recommended)

1. Go to [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
2. Register a new site with **reCAPTCHA v3**
3. Add your domain (e.g., `tarkaiedtech.com` + `localhost`)
4. Copy Site Key and Secret Key:

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

---

## 3. Email Setup (Already Configured)

The email system uses your existing Gmail credentials in `.env.local`:

```env
EMAIL_USER=sahil.b.rafaliya@gmail.com
EMAIL_PASS=qliw qfww fupe hveb
```

**Two emails are sent per submission:**
1. **Admin email** → `info@tarkaiedtech.com` with full applicant details
2. **Applicant email** → Confirmation with Application ID and WhatsApp link

---

## 4. Full .env.local Reference

```env
EMAIL_USER=sahil.b.rafaliya@gmail.com
EMAIL_PASS=qliw qfww fupe hveb
MONGODB_URI=...your_mongodb_uri...

CLOUDINARY_NAME=dqogtelop
CLOUDINARY_KEY=546797728441645
CLOUDINARY_SECRET=...

# Admission Form
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

---

## 5. API Endpoint

```
POST /api/admission
Content-Type: application/json

{
  "fullName": "Rahul Patel",
  "mobile": "9876543210",
  "email": "rahul@email.com",
  "currentStatus": "College Student",
  "courseInterested": "AI/ML Architect Program",
  "demoSession": "AI/ML Architect Program",
  "utmSource": "google",
  "utmMedium": "cpc",
  "utmCampaign": "admission-2025"
}

Response:
{
  "success": true,
  "applicationId": "TRK-ABC123-XY9Z",
  "message": "Application submitted successfully!"
}
```

---

## 6. Rate Limiting

The API enforces **5 requests per minute per IP** (in-memory). For production, consider Redis-based rate limiting.

---

## 7. Testing the Form

1. Run `npm run dev`
2. Navigate to `http://localhost:5010/admission`
3. Fill out all 4 steps
4. Submit → verify:
   - Success screen with confetti
   - Email received at `info@tarkaiedtech.com`
   - Confirmation email at applicant email
   - New row in Google Sheet

---

## 8. Deployment

No additional config needed. The `/admission` route deploys automatically with your existing Next.js deployment pipeline.

```bash
npm run build
npm run start
```

---

## 9. Analytics Tracking

Add the following events to your Google Tag Manager:
- `form_start` — When user loads the form
- `form_step_complete` — After each step (trigger: button clicks with IDs `form-next-step-1`, `form-next-step-2`, `form-next-step-3`)
- `form_submit` — On final submit (trigger: `form-submit-button`)
- `whatsapp_click` — On WhatsApp CTA clicks

---

## File Structure

```
app/
  admission/
    page.tsx                    ← Server component (SEO metadata)
    AdmissionPageClient.tsx     ← Client orchestrator
    components/
      HeroSection.tsx           ← Hero with stats & animations
      BenefitsSection.tsx       ← 6 benefit cards
      AdmissionTimeline.tsx     ← 4-step process timeline
      TestimonialsSection.tsx   ← Auto-play slider
      ProgramsSection.tsx       ← 4 program cards
      FAQSection.tsx            ← Accordion FAQ
      AdmissionForm.tsx         ← 4-step form (MAIN)
      FloatingWidgets.tsx       ← WhatsApp, Call, Exit intent
  api/
    admission/
      route.ts                  ← POST handler, validation, email

scripts/
  google-apps-script.js         ← Deploy this in Google Apps Script

ADMISSION_SETUP.md              ← This file
```
