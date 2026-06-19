'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Specialty } from '@/lib/types';
import { Activity, User, Shield, Stethoscope, ArrowRight, Loader2 } from 'lucide-react';

function LoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [specialty, setSpecialty] = useState<Specialty>('IVF');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingRole, setLoadingRole] = useState<'PATIENT' | 'DOCTOR' | 'ADMIN' | null>(null);

  useEffect(() => {
    const spec = searchParams.get('specialty') as Specialty;
    if (spec && ['IVF', 'DERMATOLOGY', 'DENTAL_IMPLANT', 'EYE_CARE'].includes(spec)) {
      setSpecialty(spec);
    }
  }, [searchParams]);

  const handleRoleQuickLogin = (role: 'PATIENT' | 'DOCTOR' | 'ADMIN') => {
    setLoadingRole(role);
    
    // Simulate auth token signing
    setTimeout(() => {
      setLoadingRole(null);
      if (role === 'PATIENT') {
        router.push(`/patient/dashboard?specialty=${specialty}`);
      } else if (role === 'DOCTOR') {
        router.push(`/doctor/dashboard?specialty=${specialty}`);
      } else {
        router.push(`/admin/dashboard?specialty=${specialty}`);
      }
    }, 1000);
  };

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Check basic email checks for demo convenience
    const lowerEmail = email.toLowerCase();
    if (lowerEmail.includes('doctor') || lowerEmail.includes('ahmed') || lowerEmail.includes('vance')) {
      handleRoleQuickLogin('DOCTOR');
    } else if (lowerEmail.includes('admin') || lowerEmail.includes('owner')) {
      handleRoleQuickLogin('ADMIN');
    } else {
      handleRoleQuickLogin('PATIENT');
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[70vh]">
      
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500 text-white shadow-md shadow-teal-500/25">
            <Activity className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white pt-2">
            Log in to HealthOS
          </h2>
          <p className="text-xs text-slate-400">
            Access your patient charts, operational tools, and growth logs.
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleCredentialsSubmit} className="space-y-4">
          <div className="space-y-2">
            <input
              type="email"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3.5 py-2 text-xs focus:outline-none focus:border-teal-500 text-slate-800 dark:text-slate-200"
            />
            <input
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3.5 py-2 text-xs focus:outline-none focus:border-teal-500 text-slate-800 dark:text-slate-200"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-teal-500 py-3 text-center text-xs font-bold text-white shadow-md hover:bg-teal-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Sign In</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          <span className="flex-shrink mx-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Evaluation Quick-Access
          </span>
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
        </div>

        {/* Quick Role-Select Cards */}
        <div className="grid grid-cols-1 gap-2.5">
          
          <button
            onClick={() => handleRoleQuickLogin('PATIENT')}
            disabled={loadingRole !== null}
            className="w-full rounded-2xl border border-pink-100 dark:border-pink-950/40 p-3 bg-pink-50/10 hover:bg-pink-50/20 text-left flex items-center gap-3 transition-colors cursor-pointer disabled:opacity-50"
          >
            <div className="h-9 w-9 rounded-xl bg-pink-100 dark:bg-pink-950/50 text-pink-600 flex items-center justify-center shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-xs text-slate-850 dark:text-slate-200 flex justify-between items-center">
                <span>Patient Portal</span>
                {loadingRole === 'PATIENT' && <Loader2 className="w-3 h-3 animate-spin text-pink-500" />}
              </div>
              <div className="text-[10px] text-slate-400 font-medium">Log in as Sarah Miller (IVF Stim stages)</div>
            </div>
          </button>

          <button
            onClick={() => handleRoleQuickLogin('DOCTOR')}
            disabled={loadingRole !== null}
            className="w-full rounded-2xl border border-blue-100 dark:border-blue-950/40 p-3 bg-blue-50/10 hover:bg-blue-50/20 text-left flex items-center gap-3 transition-colors cursor-pointer disabled:opacity-50"
          >
            <div className="h-9 w-9 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center shrink-0">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-xs text-slate-850 dark:text-slate-200 flex justify-between items-center">
                <span>Doctor Console</span>
                {loadingRole === 'DOCTOR' && <Loader2 className="w-3 h-3 animate-spin text-blue-500" />}
              </div>
              <div className="text-[10px] text-slate-400 font-medium">Log in as Dr. Sofia Ahmed (Update stages, AI summary)</div>
            </div>
          </button>

          <button
            onClick={() => handleRoleQuickLogin('ADMIN')}
            disabled={loadingRole !== null}
            className="w-full rounded-2xl border border-emerald-100 dark:border-emerald-950/40 p-3 bg-emerald-50/10 hover:bg-emerald-50/20 text-left flex items-center gap-3 transition-colors cursor-pointer disabled:opacity-50"
          >
            <div className="h-9 w-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-xs text-slate-850 dark:text-slate-200 flex justify-between items-center">
                <span>Clinic Admin Dashboard</span>
                {loadingRole === 'ADMIN' && <Loader2 className="w-3 h-3 animate-spin text-emerald-500" />}
              </div>
              <div className="text-[10px] text-slate-400 font-medium">Log in as System Admin (Operational leads, logs)</div>
            </div>
          </button>

        </div>

      </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center bg-slate-50 py-20">
        <div className="text-center space-y-2">
          <Loader2 className="w-8 h-8 text-teal-500 animate-spin mx-auto" />
          <span className="text-xs font-bold text-slate-400">Loading Auth Module...</span>
        </div>
      </div>
    }>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <LoginContent />
        <Footer />
      </div>
    </Suspense>
  );
}
