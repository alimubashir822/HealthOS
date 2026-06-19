'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { 
  Activity, 
  Baby, 
  Sparkles, 
  Smile, 
  Eye, 
  ChevronDown, 
  Calendar, 
  Menu, 
  X, 
  User, 
  Layers
} from 'lucide-react';
import { Specialty } from '@/lib/types';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [specialtyOpen, setSpecialtyOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);

  // Active specialty state
  const [activeSpecialty, setActiveSpecialty] = useState<Specialty>('IVF');

  useEffect(() => {
    const spec = searchParams.get('specialty') as Specialty;
    if (spec && ['IVF', 'DERMATOLOGY', 'DENTAL_IMPLANT', 'EYE_CARE'].includes(spec)) {
      setActiveSpecialty(spec);
    }
  }, [searchParams]);

  const handleSpecialtyChange = (spec: Specialty) => {
    setSpecialtyOpen(false);
    setActiveSpecialty(spec);
    
    // Maintain current route but update search query
    const params = new URLSearchParams(searchParams.toString());
    params.set('specialty', spec);
    router.push(`${pathname}?${params.toString()}`);
  };

  const getSpecialtyDetails = (spec: Specialty) => {
    switch (spec) {
      case 'IVF':
        return { label: 'IVF & Fertility', icon: <Baby className="w-4 h-4 text-pink-500" /> };
      case 'DERMATOLOGY':
        return { label: 'Skin & Laser', icon: <Sparkles className="w-4 h-4 text-emerald-500" /> };
      case 'DENTAL_IMPLANT':
        return { label: 'Dental Implants', icon: <Smile className="w-4 h-4 text-blue-500" /> };
      case 'EYE_CARE':
        return { label: 'Advanced Eye Care', icon: <Eye className="w-4 h-4 text-purple-500" /> };
    }
  };

  const specDetails = getSpecialtyDetails(activeSpecialty);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link href={`/?specialty=${activeSpecialty}`} className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg leading-none block text-slate-800 dark:text-slate-100">
                Health<span className="text-teal-500">OS</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
                Growth OS
              </span>
            </div>
          </Link>

          {/* Specialty Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSpecialtyOpen(!specialtyOpen)}
              className="flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
            >
              {specDetails.icon}
              <span>{specDetails.label}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${specialtyOpen ? 'rotate-180' : ''}`} />
            </button>

            {specialtyOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setSpecialtyOpen(false)} />
                <div className="absolute left-0 mt-2 z-20 w-56 origin-top-left rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1.5 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-2 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Select Specialty
                  </div>
                  {(['IVF', 'DERMATOLOGY', 'DENTAL_IMPLANT', 'EYE_CARE'] as Specialty[]).map((spec) => {
                    const details = getSpecialtyDetails(spec);
                    const isSelected = activeSpecialty === spec;
                    return (
                      <button
                        key={spec}
                        onClick={() => handleSpecialtyChange(spec)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors cursor-pointer ${
                          isSelected 
                            ? 'bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400' 
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                      >
                        {details.icon}
                        <span className="flex-1">{details.label}</span>
                        {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href={`/treatments?specialty=${activeSpecialty}`} 
            className={`text-sm font-medium transition-colors hover:text-teal-500 ${pathname.startsWith('/treatments') ? 'text-teal-500 font-semibold' : 'text-slate-600 dark:text-slate-300'}`}
          >
            Treatments
          </Link>
          <Link 
            href={`/before-after?specialty=${activeSpecialty}`} 
            className={`text-sm font-medium transition-colors hover:text-teal-500 ${pathname.startsWith('/before-after') ? 'text-teal-500 font-semibold' : 'text-slate-600 dark:text-slate-300'}`}
          >
            Before & After
          </Link>
          <Link 
            href={`/calculator?specialty=${activeSpecialty}`} 
            className={`text-sm font-medium transition-colors hover:text-teal-500 ${pathname.startsWith('/calculator') ? 'text-teal-500 font-semibold' : 'text-slate-600 dark:text-slate-300'}`}
          >
            Financing Calculator
          </Link>
          <Link 
            href={`/doctors?specialty=${activeSpecialty}`} 
            className={`text-sm font-medium transition-colors hover:text-teal-500 ${pathname.startsWith('/doctors') ? 'text-teal-500 font-semibold' : 'text-slate-600 dark:text-slate-300'}`}
          >
            Doctors
          </Link>
        </nav>

        {/* Desktop CTA & Dashboards Access */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Quick Dashboard Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleOpen(!roleOpen)}
              className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>Simulated Login</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {roleOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setRoleOpen(false)} />
                <div className="absolute right-0 mt-2 z-20 w-52 origin-top-right rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1.5 shadow-xl ring-1 ring-black/5">
                  <div className="px-2 py-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Quick-Access Dashboards
                  </div>
                  <Link
                    href={`/patient/dashboard?specialty=${activeSpecialty}`}
                    onClick={() => setRoleOpen(false)}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <User className="w-3.5 h-3.5 text-pink-500" />
                    <span>Patient Portal (Sarah)</span>
                  </Link>
                  <Link
                    href={`/doctor/dashboard?specialty=${activeSpecialty}`}
                    onClick={() => setRoleOpen(false)}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <User className="w-3.5 h-3.5 text-blue-500" />
                    <span>Doctor Portal (Dr. Ahmed)</span>
                  </Link>
                  <Link
                    href={`/admin/dashboard?specialty=${activeSpecialty}`}
                    onClick={() => setRoleOpen(false)}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <User className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Admin Growth OS</span>
                  </Link>
                </div>
              </>
            )}
          </div>

          <Link
            href={`/book?specialty=${activeSpecialty}`}
            className="flex items-center gap-2 rounded-lg bg-teal-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-teal-600 hover:scale-[1.02] active:scale-95 transition-all shadow-sm cursor-pointer shadow-teal-500/10"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center md:hidden gap-2">
          {/* Quick dashboard for mobile */}
          <Link
            href={`/login?specialty=${activeSpecialty}`}
            className="p-2 text-slate-500 hover:text-teal-500"
            title="Log In"
          >
            <User className="w-5 h-5" />
          </Link>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 focus:outline-none dark:hover:bg-slate-800 dark:hover:text-slate-100 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 space-y-3 shadow-lg">
          <nav className="flex flex-col gap-2">
            <Link
              href={`/treatments?specialty=${activeSpecialty}`}
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-teal-500"
            >
              Treatments
            </Link>
            <Link
              href={`/before-after?specialty=${activeSpecialty}`}
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-teal-500"
            >
              Before & After
            </Link>
            <Link
              href={`/calculator?specialty=${activeSpecialty}`}
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-teal-500"
            >
              Financing Calculator
            </Link>
            <Link
              href={`/doctors?specialty=${activeSpecialty}`}
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-teal-500"
            >
              Doctors
            </Link>
          </nav>
          
          <div className="h-px bg-slate-200 dark:bg-slate-800 my-2" />

          {/* Mobile Login Quick Shortcuts */}
          <div className="grid grid-cols-3 gap-2">
            <Link
              href={`/patient/dashboard?specialty=${activeSpecialty}`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-col items-center justify-center rounded-lg border border-slate-100 dark:border-slate-800 p-2 text-center text-[10px] font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50"
            >
              <User className="w-4 h-4 text-pink-500 mb-1" />
              Patient
            </Link>
            <Link
              href={`/doctor/dashboard?specialty=${activeSpecialty}`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-col items-center justify-center rounded-lg border border-slate-100 dark:border-slate-800 p-2 text-center text-[10px] font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50"
            >
              <User className="w-4 h-4 text-blue-500 mb-1" />
              Doctor
            </Link>
            <Link
              href={`/admin/dashboard?specialty=${activeSpecialty}`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-col items-center justify-center rounded-lg border border-slate-100 dark:border-slate-800 p-2 text-center text-[10px] font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50"
            >
              <User className="w-4 h-4 text-emerald-500 mb-1" />
              Admin
            </Link>
          </div>

          <Link
            href={`/book?specialty=${activeSpecialty}`}
            onClick={() => setMobileMenuOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-500 py-2.5 text-center text-sm font-semibold text-white hover:bg-teal-600"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation</span>
          </Link>
        </div>
      )}
    </header>
  );
}
