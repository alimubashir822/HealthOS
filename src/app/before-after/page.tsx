'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider';
import { Specialty } from '@/lib/types';
import { SPECIALTY_CONFIGS } from '@/lib/mockData';
import { Sparkles, Eye, ShieldCheck, HelpCircle, Loader2 } from 'lucide-react';

function BeforeAfterContent() {
  const searchParams = useSearchParams();
  const [specialty, setSpecialty] = useState<Specialty>('IVF');

  useEffect(() => {
    const spec = searchParams.get('specialty') as Specialty;
    if (spec && ['IVF', 'DERMATOLOGY', 'DENTAL_IMPLANT', 'EYE_CARE'].includes(spec)) {
      setSpecialty(spec);
    }
  }, [searchParams]);

  const config = SPECIALTY_CONFIGS[specialty];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      
      {/* Title */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1 rounded-full bg-teal-100/60 dark:bg-teal-950/40 text-teal-700 px-2.5 py-0.5 text-[10px] font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Case Studies</span>
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Before & After Gallery: {config.name}
        </h2>
        <p className="text-xs text-slate-500">
          Unretouched clinical progression records showing true recovery milestones.
        </p>
      </div>

      {/* Main Slider Display */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-sm max-w-4xl mx-auto">
        <div className="space-y-8">
          {config.beforeAfter.map((item, index) => (
            <div key={index} className="space-y-4">
              <BeforeAfterSlider
                beforeImage={item.before}
                afterImage={item.after}
                caption={item.caption}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Privacy and Trust */}
      <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800 rounded-2xl p-6 max-w-3xl mx-auto flex items-start gap-4">
        <ShieldCheck className="w-8 h-8 text-emerald-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-xs text-slate-850 dark:text-slate-200">
            Strict Clinical Consent & HIPAA Compliance
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
            All photos are published with explicit, signed patient consent forms matching federal healthcare guidelines. Case photos remain strict medical property and are displayed for educational planning purposes only.
          </p>
        </div>
      </div>

    </div>
  );
}

export default function BeforeAfterPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center bg-slate-50 py-20">
        <div className="text-center space-y-2">
          <Loader2 className="w-8 h-8 text-teal-500 animate-spin mx-auto" />
          <span className="text-xs font-bold text-slate-400">Loading Gallery...</span>
        </div>
      </div>
    }>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <BeforeAfterContent />
        <Footer />
      </div>
    </Suspense>
  );
}
