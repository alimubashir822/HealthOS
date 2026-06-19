'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Activity, Shield, LogOut, HeartHandshake, Menu } from 'lucide-react';
import { Specialty } from '@/lib/types';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
  userName: string;
  onMenuClick?: () => void;
}

export default function DashboardHeader({ title, subtitle, role, userName, onMenuClick }: DashboardHeaderProps) {
  const searchParams = useSearchParams();
  const specialty = searchParams.get('specialty') || 'IVF';

  const getRoleBadge = (r: typeof role) => {
    switch (r) {
      case 'PATIENT':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-pink-50 dark:bg-pink-950/30 px-2.5 py-0.5 text-xs font-bold text-pink-600 dark:text-pink-400 border border-pink-200/50 dark:border-pink-850/50">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Patient Portal</span>
          </span>
        );
      case 'DOCTOR':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-950/30 px-2.5 py-0.5 text-xs font-bold text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-850/50">
            <Shield className="w-3.5 h-3.5" />
            <span>Doctor Console</span>
          </span>
        );
      case 'ADMIN':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-850/50">
            <Shield className="w-3.5 h-3.5" />
            <span>Clinic Admin OS</span>
          </span>
        );
    }
  };

  return (
    <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 backdrop-blur-sm sticky top-0 z-40 px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        {/* Left Side: Title & Badge */}
        <div className="flex items-center gap-3">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="lg:hidden rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 focus:outline-none cursor-pointer shrink-0 mr-1"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                {title}
              </h1>
              {getRoleBadge(role)}
            </div>
            {subtitle && (
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Identity & Exit */}
        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-bold block leading-none">
              Welcome back,
            </span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
              {userName}
            </span>
          </div>

          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

          <Link
            href={`/?specialty=${specialty}`}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-red-500 dark:hover:text-red-400 cursor-pointer transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Exit Portal</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
