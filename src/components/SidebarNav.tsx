'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { 
  Activity, 
  User, 
  Shield, 
  Stethoscope, 
  LogOut, 
  Compass, 
  FileText, 
  CreditCard,
  Settings,
  Cpu,
  Bookmark,
  Layers3,
  Bot,
  X
} from 'lucide-react';
import { Specialty } from '@/lib/types';

interface SidebarNavProps {
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
  userName: string;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export default function SidebarNav({ role, userName, isOpenMobile, onCloseMobile }: SidebarNavProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const specialty = searchParams.get('specialty') || 'IVF';

  const getMenuLinks = (r: typeof role) => {
    switch (r) {
      case 'PATIENT':
        return [
          { label: 'My Clinical Chart', icon: <Compass className="w-4 h-4" />, href: `/patient/dashboard?specialty=${specialty}` },
          { label: 'Financing Calculator', icon: <CreditCard className="w-4 h-4" />, href: `/calculator?specialty=${specialty}` },
          { label: 'Clinical Timeline', icon: <Activity className="w-4 h-4" />, href: `/treatments?specialty=${specialty}` },
          { label: 'Specialist Doctors', icon: <Stethoscope className="w-4 h-4" />, href: `/doctors?specialty=${specialty}` }
        ];
      case 'DOCTOR':
        return [
          { label: 'Caseload & Staging', icon: <Stethoscope className="w-4 h-4" />, href: `/doctor/dashboard?specialty=${specialty}` },
          { label: 'Diagnostic Library', icon: <FileText className="w-4 h-4" />, href: `/treatments?specialty=${specialty}` },
          { label: 'Specialty Configs', icon: <Layers3 className="w-4 h-4" />, href: `/?specialty=${specialty}` }
        ];
      case 'ADMIN':
        return [
          { label: 'Growth Dashboard', icon: <Shield className="w-4 h-4" />, href: `/admin/dashboard?specialty=${specialty}` },
          { label: 'Marketing Campaigns', icon: <Bookmark className="w-4 h-4" />, href: `/?specialty=${specialty}` },
          { label: 'n8n Automations', icon: <Cpu className="w-4 h-4" />, href: `/admin/dashboard?specialty=${specialty}` }
        ];
    }
  };

  const menuLinks = getMenuLinks(role);

  const renderSidebarContent = (isMobile: boolean = false) => {
    return (
      <div className="flex flex-col justify-between h-full">
        <div>
          {/* Brand logo */}
          <div className="p-6 border-b border-slate-250/20 flex items-center justify-between">
            <Link 
              href={`/?specialty=${specialty}`} 
              className="flex items-center gap-2 group"
              onClick={isMobile ? onCloseMobile : undefined}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500 text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200">
                <Activity className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="font-extrabold text-sm block text-slate-800 dark:text-slate-100">
                  Health<span className="text-teal-500">OS</span>
                </span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">
                  Specialty Clinic OS
                </span>
              </div>
            </Link>
            
            {isMobile && onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-150 dark:hover:bg-slate-800 text-slate-650 cursor-pointer lg:hidden"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-1.5">
            <div className="px-2.5 py-1 text-[9px] font-black text-slate-450 uppercase tracking-wider block mb-2">
              Dashboard Controls
            </div>
            
            {menuLinks.map((link) => {
              const isActive = pathname === link.href.split('?')[0];
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={isMobile ? onCloseMobile : undefined}
                  className={`flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-teal-50 dark:bg-teal-950/20 text-teal-650 dark:text-teal-400 border border-teal-200/40 dark:border-teal-900/30'
                      : 'text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-850 dark:text-slate-400'
                  }`}
                >
                  <span className={`shrink-0 ${isActive ? 'text-teal-500' : 'text-slate-400'}`}>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Operator Info */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5 bg-slate-50/50 dark:bg-slate-950/20">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-teal-500/10 text-teal-600 flex items-center justify-center font-black text-xs shrink-0 uppercase border border-teal-200/50">
              {userName.charAt(0)}
            </div>
            <div className="min-w-0">
              <span className="text-[9px] text-slate-400 font-bold uppercase block leading-none">{role} Console</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-205 truncate block mt-0.5">{userName}</span>
            </div>
          </div>

          <Link
            href={`/?specialty=${specialty}`}
            onClick={isMobile ? onCloseMobile : undefined}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 py-1.5 text-center text-[10px] font-bold text-slate-500 hover:text-red-500 dark:hover:text-red-400 flex items-center justify-center gap-1.5 hover:bg-red-50/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Exit Platform</span>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Sidebar (visible on large screens only) */}
      <aside className="hidden lg:flex w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex-col justify-between h-screen sticky top-0 shrink-0 select-none">
        {renderSidebarContent(false)}
      </aside>

      {/* Mobile Drawer (visible only when open on mobile/tablets) */}
      {isOpenMobile && (
        <>
          <div 
            className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs lg:hidden"
            onClick={onCloseMobile}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-250/20 bg-white dark:bg-slate-900 flex flex-col justify-between h-screen select-none animate-in slide-in-from-left duration-200 lg:hidden">
            {renderSidebarContent(true)}
          </aside>
        </>
      )}
    </>
  );
}
