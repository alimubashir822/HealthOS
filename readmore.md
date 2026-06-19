# HealthOS: Specialty Clinic Growth & Patient Journey OS

HealthOS is an enterprise-grade Clinical Growth and Patient Journey Operating System designed specifically for high-value specialty medical clinics. 

Target specialisms include:
* **IVF & Fertility Clinics** (e.g. standard cycles, ICSI, vitrification)
* **Dermatology & Skin Clinics** (e.g. CO2 lasers, RF microneedling, scar revision)
* **Dental Implant Clinics** (e.g. All-on-4 full arch restorations, custom crowns)
* **Eye Care & Ophthalmology** (e.g. LASIK vision correction, IOL replacements)

Unlike standard EHR systems or basic booking tools, HealthOS is designed as a conversion-centric **acquisition and retention manager**, linking patient qualification journeys directly to clinic operational metrics and automation.

---

## 1. Product Architecture

### Public Patient Acquisition Engine
* **Specialty Config Switcher:** Allows simulating different clinical specialties, matching titles, treatments, cost details, and specialist profiles on the fly.
* **AI Care Advisor Qualification Widget:** A conversational multi-step candidate candidate assessment form that collects contact info, timeline, prior consults, and computes Candidate Urgency Scores (Hot/Warm/Cold).
* **Before & After interactive slider:** Seamless swipe slider showing unretouched clinical progress records.
* **Pricing & Treatments Directory:** High-transparency cost layouts for standard clinical procedures.
* **AI Front Desk Agent:** A persistent chat overlay receptionist addressing common queries, routing locations, financing parameters, and dispatching consultation schedulers.

### Patient Care Portal
* **Visual Journey Tracker:** Displays a linear pipeline checklist detailing stage milestones (Discovery ➔ Consultation ➔ Testing ➔ Treatment ➔ Recovery).
* **AI-Generated Personalized Treatment Guide:** Renders clear plain-English translations of doctors' diagnostic plans, outlining timeline stages, copay guides, and pre-op instructions.
* **Care Team Messaging Hub:** Seamless direct channels to active practitioners and AI support bots.
* **Copay Financing Planner:** Displays installment schedules and pre-qualification triggers.

### Practitioner & Doctor Console
* **Caseload Manager:** Detailed list of active patients categorized by their clinical stages.
* **Pre-visit AI Briefing Console:** Highlights AMH/FSH levels, count warning flags, and suggested clinical dialogues.
* **Success Predictor Console:** Displays real-time probability estimates for treatment continuation and cancellation risk indicators.
* **AI Clinical Document Scanner:** A simulated document OCR parser showing extracted lab values (FSH, AMH, follicle counts) and flagging high/low abnormalities.
* **Treatment Package Generator:** Form to create custom clinical plans, pricing, benefits, and timelines, syndicating them directly to the patient's portal.

### Clinic Admin Dashboard (Growth OS)
* **ROI Telemetry Grid:** Operational cards tracking Google ad conversions, consultations kept, and revenue streams.
* **Analytics Telemetry Graphics:** Interactive SVG line graphs displaying Monthly Treatment Revenue and bar charts tracing Lead Acquisition Channels.
* **Smart Lead Intent categorization:** Dynamic list filtering qualified leads (Hot, Warm, Cold) based on qualifier answers.
* **AI Patient Retention Dispatcher:** Scans for dormant consults (no activity in 14+ days) and dispatches automated SMS/Email outreach packets.
* **n8n Automation Flow Builder:** Interactive flowchart mapping trigger rules (e.g. new registration) to automated downstream actions.
* **Integration settings:** Dashboard toggles for Stripe Payment gateways, Twilio SMS message pipelines, and EHR exports.
* **HIPAA Compliance Audit logs:** Tabular trace feed tracking operator actions, role categories (Admin, Doctor, Nurse), and timestamps.

---

## 2. Technical Stack & Implementation Details

* **Core Framework:** Next.js App Router (React 19, TypeScript).
* **Styling & Theme:** Tailwind CSS with responsive layout grids, backdrop blurs, and glassmorphism.
* **State Manager:** HTML5 LocalStorage persistence simulated via `DemoStateManager` inside `src/lib/mockData.ts`.
* **Prisma Schema:** Integrated local database client (dev.db SQLite configuration).
* **Responsive Breakpoints:** Fully responsive across mobile (320px-480px), tablets (481px-1024px), laptops, and large desktop screens (1440px+).

---

## 3. Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Synchronize DB schema:**
   ```bash
   npx prisma db push
   ```
3. **Run Dev server:**
   ```bash
   npm run dev
   ```
4. **Compile Production Bundle:**
   ```bash
   npm run build
   ```
