'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JourneyVisualizer from '@/components/ui/JourneyVisualizer';
import { Specialty } from '@/lib/types';
import { SPECIALTY_CONFIGS } from '@/lib/mockData';
import { 
  Stethoscope, 
  Layers, 
  HelpCircle, 
  ArrowRight, 
  Sparkles,
  Calendar,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

function TreatmentsContent() {
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
      
      {/* Page Title */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1 rounded-full bg-teal-100/60 dark:bg-teal-950/40 text-teal-700 px-2.5 py-0.5 text-[10px] font-bold">
          <Layers className="w-3.5 h-3.5" />
          <span>Stage Roadmap</span>
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Clinical Treatment Journey: {config.name}
        </h2>
        <p className="text-xs text-slate-500">
          Explore our structured multi-stage medical tracks and transparent cost options.
        </p>
      </div>

      {/* Visualizer Step Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-500" />
          <span>Workflow Milestones Tracker (Simulated Stage 3)</span>
        </h3>
        {/* Pass active stages and mock the active stage index to let them visualize the journey */}
        <JourneyVisualizer 
          stages={config.stages} 
          currentStageName={config.stages[2]?.name || config.stages[0]?.name} 
        />
      </div>

      {/* Procedure List & Pricing Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Stages Detailed explanations */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-150 uppercase tracking-wider mb-2">
            Detailed Journey Steps
          </h3>
          <div className="space-y-4">
            {config.stages.map((stage, idx) => (
              <div 
                key={stage.name}
                className="flex items-start gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-500 text-white font-bold text-xs shrink-0">
                  {idx + 1}
                </span>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-slate-850 dark:text-slate-200">
                    {stage.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Treatment list and pricing */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-150 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-teal-500" />
              <span>Available Packages & Pricing</span>
            </h3>
            <p className="text-xs text-slate-500">
              Clear itemized list of high-value services. No hidden clinical fees.
            </p>
            <div className="h-px bg-slate-100 dark:bg-slate-800" />
            
            <div className="space-y-3">
              {config.treatments.map((tr) => (
                <div 
                  key={tr.name} 
                  className="rounded-xl border border-slate-100 dark:border-slate-800 p-3 bg-slate-50/40 dark:bg-slate-950/20 space-y-1"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-xs text-slate-850 dark:text-slate-200">
                      {tr.name}
                    </span>
                    <span className="font-black text-xs text-slate-900 dark:text-white shrink-0 ml-4">
                      ${tr.cost.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    {tr.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href={`/book?specialty=${specialty}`}
                className="w-full rounded-xl bg-teal-500 py-3 text-center text-xs font-bold text-white shadow-md hover:bg-teal-600 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Package Consultation</span>
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default function TreatmentsPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center bg-slate-50 py-20">
        <div className="text-center space-y-2">
          <Loader2 className="w-8 h-8 text-teal-500 animate-spin mx-auto" />
          <span className="text-xs font-bold text-slate-400">Loading Treatments...</span>
        </div>
      </div>
    }>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <TreatmentsContent />
        <Footer />
      </div>
    </Suspense>
  );
}
