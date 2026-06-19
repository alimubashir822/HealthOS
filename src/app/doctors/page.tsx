'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Specialty } from '@/lib/types';
import { SPECIALTY_CONFIGS } from '@/lib/mockData';
import { Stethoscope, Calendar, Award, Star, Loader2 } from 'lucide-react';
import Link from 'next/link';

function DoctorsContent() {
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
          <Stethoscope className="w-3.5 h-3.5" />
          <span>Our Specialists</span>
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Meet the Medical Practitioners
        </h2>
        <p className="text-xs text-slate-500">
          Board-certified clinicians leading your personalized {config.name} care journey.
        </p>
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {config.doctors.map((doc) => (
          <div 
            key={doc.name} 
            className="flex flex-col rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md overflow-hidden hover:scale-[1.01] transition-transform"
          >
            {/* Header image */}
            <div className="h-48 w-full overflow-hidden relative bg-slate-100">
              <img 
                src={doc.image} 
                alt={doc.name} 
                className="h-full w-full object-cover" 
              />
              <div className="absolute top-4 right-4 rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-sm flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-current" />
                <span>4.9 Board Score</span>
              </div>
            </div>

            {/* Profile body */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div>
                  <h3 className="font-extrabold text-base text-slate-850 dark:text-slate-100">
                    {doc.name}
                  </h3>
                  <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider block mt-0.5">
                    {doc.role}
                  </span>
                </div>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {doc.bio}
                </p>

                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">
                  <Award className="w-3.5 h-3.5 text-teal-500" />
                  <span>Licensed in NY, FL, & TX Networks</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                <Link
                  href={`/book?specialty=${specialty}`}
                  className="w-full rounded-xl bg-teal-50/50 py-2.5 text-center text-xs font-bold text-teal-600 dark:text-teal-400 border border-teal-200/50 dark:border-teal-800 hover:bg-teal-50 dark:hover:bg-teal-900/40 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Consultation</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default function DoctorsPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center bg-slate-50 py-20">
        <div className="text-center space-y-2">
          <Loader2 className="w-8 h-8 text-teal-500 animate-spin mx-auto" />
          <span className="text-xs font-bold text-slate-400">Loading Doctor Profiles...</span>
        </div>
      </div>
    }>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <DoctorsContent />
        <Footer />
      </div>
    </Suspense>
  );
}
