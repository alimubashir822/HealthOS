'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import LeadQualifierWidget from '@/components/ui/LeadQualifierWidget';
import FrontDeskSidebar from '@/components/ui/FrontDeskSidebar';
import { Specialty } from '@/lib/types';
import { SPECIALTY_CONFIGS } from '@/lib/mockData';
import { 
  CheckCircle, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Star, 
  Stethoscope, 
  MessageSquare,
  HelpCircle,
  Clock,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

function HomeContent() {
  const searchParams = useSearchParams();
  const [specialty, setSpecialty] = useState<Specialty>('IVF');

  useEffect(() => {
    const spec = searchParams.get('specialty') as Specialty;
    if (spec && ['IVF', 'DERMATOLOGY', 'DENTAL_IMPLANT', 'EYE_CARE'].includes(spec)) {
      setSpecialty(spec);
    }
  }, [searchParams]);

  const config = SPECIALTY_CONFIGS[specialty];

  // Map active color codes
  const getThemeColors = (spec: Specialty) => {
    switch (spec) {
      case 'IVF':
        return { text: 'text-pink-500', bg: 'bg-pink-500', hoverBg: 'hover:bg-pink-600', border: 'border-pink-200', textLight: 'text-pink-600', ring: 'focus:ring-pink-500', bgLight: 'bg-pink-50/50' };
      case 'DERMATOLOGY':
        return { text: 'text-emerald-500', bg: 'bg-emerald-500', hoverBg: 'hover:bg-emerald-600', border: 'border-emerald-200', textLight: 'text-emerald-600', ring: 'focus:ring-emerald-500', bgLight: 'bg-emerald-50/50' };
      case 'DENTAL_IMPLANT':
        return { text: 'text-blue-500', bg: 'bg-blue-500', hoverBg: 'hover:bg-blue-600', border: 'border-blue-200', textLight: 'text-blue-600', ring: 'focus:ring-blue-500', bgLight: 'bg-blue-50/50' };
      case 'EYE_CARE':
        return { text: 'text-purple-500', bg: 'bg-purple-500', hoverBg: 'hover:bg-purple-600', border: 'border-purple-200', textLight: 'text-purple-600', ring: 'focus:ring-purple-500', bgLight: 'bg-purple-50/50' };
    }
  };

  const theme = getThemeColors(specialty);

  return (
    <div className="flex-1 flex flex-col">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/30 to-white pt-12 pb-20 dark:from-slate-900/10 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${theme.bgLight} ${theme.textLight} border border-teal-200/50`}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI-Powered Care Journeys</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                {config.heroTitle}
              </h2>

              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                {config.heroSub} HealthOS guides you through every milestone of your specialty clinical care with complete price transparency, digital progress tracking, and 24/7 AI-guided preparation.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/book?specialty=${specialty}`}
                  className={`rounded-xl px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-teal-500/15 ${theme.bg} ${theme.hoverBg} transition-all text-center flex items-center justify-center gap-1.5 hover:scale-[1.02] cursor-pointer`}
                >
                  <span>{config.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/calculator?specialty=${specialty}`}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all text-center cursor-pointer"
                >
                  Calculate Monthly Installments
                </Link>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-4 flex-wrap pt-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>HIPAA Secure Data</span>
                </div>
                <div className="hidden sm:block h-4 w-px bg-slate-200" />
                <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <span>4.9/5 Rating (8,000+ Cases)</span>
                </div>
              </div>

            </div>

            {/* Right Column: AI Lead Qualifier widget */}
            <div className="lg:col-span-5 flex justify-center">
              <LeadQualifierWidget specialty={specialty} />
            </div>

          </div>
        </div>
      </section>

      {/* 2. DYNAMIC BEFORE & AFTER RESULTS */}
      <section className="bg-slate-50 dark:bg-slate-900/30 py-16 border-y border-slate-200/60 dark:border-slate-800/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Visual Treatment Outcomes
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Drag the interactive slider below to see clinical progress from initial diagnostics to final restoration.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-md max-w-3xl mx-auto">
            {config.beforeAfter.map((item, index) => (
              <BeforeAfterSlider
                key={index}
                beforeImage={item.before}
                afterImage={item.after}
                caption={item.caption}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. CLINICAL JOURNEY STAGES VISUALIZER */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Your Guided Treatment Stages
            </h3>
            <p className="text-xs text-slate-500">
              Every step is structured, recorded, and optimized for clinical success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {config.stages.map((stage, idx) => (
              <div 
                key={stage.name}
                className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3 relative overflow-hidden group hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <span className={`inline-flex h-8 w-8 items-center justify-center rounded-xl bg-teal-500/10 text-xs font-bold text-teal-600`}>
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Stage {idx + 1}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">
                    {stage.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DOCTORS / SPECIALISTS */}
      <section className="bg-slate-50 dark:bg-slate-900/30 py-16 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Meet Our Specialist Team
            </h3>
            <p className="text-xs text-slate-500">
              Board-certified practitioners specialized in high-value clinical restorations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {config.doctors.map((doc) => (
              <div 
                key={doc.name} 
                className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm"
              >
                <img 
                  src={doc.image} 
                  alt={doc.name} 
                  className="h-28 w-28 rounded-2xl object-cover shadow-inner shrink-0" 
                />
                <div className="space-y-2 text-center sm:text-left">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-1.5 justify-center sm:justify-start">
                      <Stethoscope className="w-4 h-4 text-teal-500" />
                      <span>{doc.name}</span>
                    </h4>
                    <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider block mt-0.5">
                      {doc.role}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                    {doc.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PATIENT REVIEWS */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Trusted by Patients Worldwide
            </h3>
            <p className="text-xs text-slate-500">
              Read real patient transformations and clinical care reviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { text: "The transparency is incredible. I saw my exact implant roadmap and cost layout before ever stepping foot in the clinic. Exceptional care!", author: "David K.", rating: 5, date: "2 weeks ago" },
              { text: "Managing IVF medication scheduling was so stressful until I got the care timeline. The AI Care Assistant answered my late-night questions perfectly.", author: "Sarah M.", rating: 5, date: "1 month ago" },
              { text: "My skin revision has been amazing. The photos speak for themselves. The pricing calculator made the monthly installment breakdown clear.", author: "Elena R.", rating: 5, date: "3 weeks ago" }
            ].map((rev, i) => (
              <div 
                key={i} 
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: rev.rating }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400 mt-4 font-semibold">
                  <span>- {rev.author}</span>
                  <span>{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQS */}
      <section className="bg-slate-50 dark:bg-slate-900/30 py-16 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 max-w-3xl space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-teal-500" />
              <span>Frequently Asked Questions</span>
            </h3>
            <p className="text-xs text-slate-500">
              Clear answers regarding clinical tracks, bookings, and installment options.
            </p>
          </div>

          <div className="space-y-4">
            {config.faqs.map((faq, i) => (
              <div 
                key={i}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2 shadow-sm"
              >
                <h4 className="font-bold text-xs text-slate-850 dark:text-slate-200">
                  {faq.q}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FrontDeskSidebar specialty={specialty} />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center bg-slate-50 py-20">
        <div className="text-center space-y-2">
          <Loader2 className="w-8 h-8 text-teal-500 animate-spin mx-auto" />
          <span className="text-xs font-bold text-slate-400">Loading Specialty Configs...</span>
        </div>
      </div>
    }>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <HomeContent />
        <Footer />
      </div>
    </Suspense>
  );
}
