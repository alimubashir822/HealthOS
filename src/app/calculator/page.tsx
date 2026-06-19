'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import InteractiveCalculator from '@/components/ui/InteractiveCalculator';
import { Specialty } from '@/lib/types';
import { SPECIALTY_CONFIGS } from '@/lib/mockData';
import { CreditCard, Landmark, CheckSquare, Loader2, Sparkles } from 'lucide-react';

function CalculatorContent() {
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
          <CreditCard className="w-3.5 h-3.5" />
          <span>Transparent Fees</span>
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Financing & Cost Calculator
        </h2>
        <p className="text-xs text-slate-500">
          Determine your monthly payment splits for {config.name} treatments.
        </p>
      </div>

      {/* Embed Calculator Component */}
      <InteractiveCalculator specialty={specialty} />

      {/* Trust Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-6">
        
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600">
            <Landmark className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100">
            0% APR Financing Options
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
            Choose a 12-month payment period to clear your clinical balance completely interest-free. No extra processing fees applied.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600">
            <CheckSquare className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100">
            No Impact on Credit Score
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
            Pre-qualification uses a soft pull mechanism to verify credit rating, meaning your score remains completely untouched during application.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600">
            <Sparkles className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100">
            Instant Credit Approvals
          </h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
            Our qualification engine integrates directly with underwriting APIs to confirm financing terms in under 3 minutes.
          </p>
        </div>

      </div>

    </div>
  );
}

export default function CalculatorPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center bg-slate-50 py-20">
        <div className="text-center space-y-2">
          <Loader2 className="w-8 h-8 text-teal-500 animate-spin mx-auto" />
          <span className="text-xs font-bold text-slate-400">Loading Calculator...</span>
        </div>
      </div>
    }>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <CalculatorContent />
        <Footer />
      </div>
    </Suspense>
  );
}
