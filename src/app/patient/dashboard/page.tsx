'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardHeader from '@/components/ui/DashboardHeader';
import SidebarNav from '@/components/SidebarNav';
import JourneyVisualizer from '@/components/ui/JourneyVisualizer';
import AIChatWidget from '@/components/ui/AIChatWidget';
import { Specialty } from '@/lib/types';
import { SPECIALTY_CONFIGS, DemoStateManager } from '@/lib/mockData';
import { 
  Calendar, 
  FileText, 
  CreditCard, 
  Clock, 
  Download, 
  Sparkles,
  Loader2,
  Compass,
  Users,
  CheckCircle,
  HelpCircle,
  Lightbulb
} from 'lucide-react';

function PatientDashboardContent() {
  const searchParams = useSearchParams();
  const [specialty, setSpecialty] = useState<Specialty>('IVF');

  useEffect(() => {
    const spec = searchParams.get('specialty') as Specialty;
    if (spec && ['IVF', 'DERMATOLOGY', 'DENTAL_IMPLANT', 'EYE_CARE'].includes(spec)) {
      setSpecialty(spec);
    }
  }, [searchParams]);

  const config = SPECIALTY_CONFIGS[specialty];
  
  // Load patient from our memory store (or defaults)
  const patients = DemoStateManager.getPatients();
  const patient = patients.find((p: any) => p.specialty === specialty) || patients[0];

  const getJourneyStatusIcon = (status: 'completed' | 'pending' | 'upcoming' | 'future') => {
    switch (status) {
      case 'completed':
        return <span className="h-5 w-5 rounded-full bg-teal-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>;
      case 'pending':
        return <span className="h-5 w-5 rounded-full bg-amber-400 text-white flex items-center justify-center text-[10px] font-bold shrink-0 animate-pulse">⏳</span>;
      case 'upcoming':
        return <span className="h-5 w-5 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center text-[10px] font-bold shrink-0">○</span>;
      case 'future':
        return <span className="h-5 w-5 rounded-full bg-slate-105 text-slate-350 flex items-center justify-center text-[10px] font-bold shrink-0">○</span>;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      
      {/* Overview Dashboard Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Progress, Journey Engine, Treatment Conversion, Billing (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* AI PATIENT JOURNEY ENGINE ⭐ */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-850 dark:text-slate-100 flex items-center gap-2">
                <Compass className="w-5 h-5 text-teal-500" />
                <span>AI Patient Journey Intelligence</span>
              </h3>
              <span className="text-[10px] bg-teal-55 dark:bg-teal-950/30 px-2 py-0.5 rounded-full border border-teal-200/50 text-teal-600 font-bold">
                Engagement Score: {patient.experienceScore?.overallScore}%
              </span>
            </div>

            {/* Journey milestones checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { name: 'Discovery', status: 'completed' as const, label: 'Website Visit' },
                { name: 'Consultation', status: 'completed' as const, label: 'Booked & Met' },
                { name: 'Testing', status: 'pending' as const, label: 'Pending Scans' },
                { name: 'Treatment', status: 'upcoming' as const, label: 'Active Plan' },
                { name: 'Follow-up', status: 'future' as const, label: 'Future check' }
              ].map((step) => (
                <div 
                  key={step.name}
                  className={`rounded-2xl border p-3 text-center space-y-1.5 ${
                    step.status === 'completed' 
                      ? 'border-teal-100 bg-teal-50/20 dark:bg-teal-950/10' 
                      : step.status === 'pending'
                      ? 'border-amber-100 bg-amber-50/10 dark:bg-amber-950/10'
                      : 'border-slate-100 dark:border-slate-800/80 bg-slate-50/30'
                  }`}
                >
                  <div className="flex justify-center">{getJourneyStatusIcon(step.status)}</div>
                  <div className="font-bold text-xs text-slate-850 dark:text-slate-200">{step.name}</div>
                  <div className="text-[9px] text-slate-400 font-semibold">{step.label}</div>
                </div>
              ))}
            </div>

            {/* AI Patient Journey Recommendation Alert Box */}
            <div className="rounded-2xl bg-teal-500/5 dark:bg-slate-950 border border-teal-500/10 p-4 flex gap-3">
              <Lightbulb className="w-6 h-6 text-teal-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-teal-650 uppercase tracking-wider block">AI Care Recommendation</span>
                <p className="text-xs text-slate-505 dark:text-slate-400 leading-normal">
                  {patient.name} has completed initial Discovery and consultation steps. The **Testing Phase** is pending diagnostic scans. Complete the baseline scan checklist before your visit tomorrow to advance progress to the **Treatment Plan** stage.
                </p>
              </div>
            </div>
          </div>

          {/* AI TREATMENT CONVERSION ASSISTANT Guide Panel */}
          {patient.conversionPackage && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
              <div>
                <h3 className="text-sm font-bold text-slate-850 dark:text-slate-100 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-teal-500 animate-pulse" />
                  <span>My Personalized Treatment Guide (AI-Generated)</span>
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Doctor-generated clinical protocol simplified for patient clarity.
                </p>
              </div>

              <div className="h-px bg-slate-100 dark:bg-slate-800" />

              <div className="space-y-4">
                {/* Explanation */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Treatment Plan Overview:</span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {patient.conversionPackage.explanation}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Benefits */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200 block">Expected Outcomes:</span>
                    <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                      {patient.conversionPackage.benefits.map((b: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200 block">Milestones & Timeline:</span>
                    <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                      {patient.conversionPackage.timeline.map((t: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <Clock className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="h-px bg-slate-100 dark:bg-slate-800" />

                {/* Pre-visit prep & faqs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200 block">Preparation Guidelines:</span>
                    <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80">
                      {patient.conversionPackage.prepGuide}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200 block flex items-center gap-1">
                      <HelpCircle className="w-4 h-4 text-slate-400" />
                      <span>Treatment FAQs</span>
                    </span>
                    <div className="space-y-2 max-h-28 overflow-y-auto">
                      {patient.conversionPackage.faqs.map((faq: any, i: number) => (
                        <div key={i} className="text-xs bg-slate-50/50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/50">
                          <div className="font-bold text-slate-805 dark:text-slate-202">{faq.q}</div>
                          <div className="text-slate-500 dark:text-slate-450 mt-1 leading-normal">{faq.a}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Standard roadmap display */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-1.5 mb-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-teal-500" />
              <span>Stages Checklists (Dr. Sofia Ahmed)</span>
            </div>
            
            {/* Visualizer showing active path */}
            <JourneyVisualizer 
              stages={config.stages} 
              currentStageName={patient.currentStage} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Upcoming Appointment */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-full border border-emerald-200/50">
                    CONFIRMED
                  </span>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-850 dark:text-slate-200">
                    Upcoming Visit
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Tomorrow at 10:30 AM ({patient.upcomingAppointment.doctorName})</span>
                  </p>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
                  {patient.upcomingAppointment.notes}
                </p>
              </div>

              <div className="pt-2">
                <button className="w-full rounded-xl border border-slate-200 dark:border-slate-800 py-2 text-center text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer">
                  Request Reschedule
                </button>
              </div>
            </div>

            {/* Medical Files & Documents */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold">
                    {patient.documents.length} Loaded Files
                  </span>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-850 dark:text-slate-200">
                    Medical Documents
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Consent sheets, imaging results, and laboratory panels.
                  </p>
                </div>

                <div className="space-y-1.5 max-h-32 overflow-y-auto">
                  {patient.documents.map((doc: any) => (
                    <div 
                      key={doc.id} 
                      className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/50 hover:bg-slate-100/50 transition-colors"
                    >
                      <div className="truncate pr-4 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate font-semibold text-slate-750 dark:text-slate-300">{doc.name}</span>
                      </div>
                      <button className="text-teal-500 hover:text-teal-600 shrink-0 cursor-pointer">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button className="w-full rounded-xl border border-slate-200 dark:border-slate-800 py-2 text-center text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer">
                  Upload Consent Forms
                </button>
              </div>
            </div>

          </div>

          {/* Family Care Network panel */}
          {patient.familyNetwork && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-855 dark:text-slate-200 flex items-center gap-2">
                <Users className="w-5 h-5 text-teal-500" />
                <span>Family Care Network Connections</span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Grant relatives credentials to view appointment dates, timelines, and bills.
              </p>
              
              <div className="h-px bg-slate-105 dark:bg-slate-800" />
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 rounded-2xl text-xs">
                <div>
                  <div className="font-extrabold text-slate-800 dark:text-slate-205">{patient.familyNetwork.name}</div>
                  <div className="text-[10px] text-teal-650 font-semibold">{patient.familyNetwork.relationship}</div>
                  <div className="text-[9px] text-slate-400 font-semibold mt-1">Access Type: Operational timeline, scheduling details</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">ALERTS</div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                    <CheckCircle className="w-3.5 h-3.5" />
                    SMS Alerts Enabled
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Billing & Installments */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-850 dark:text-slate-200 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-teal-500" />
                <span>Active Installment Schedule</span>
              </h3>
              <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-55 dark:bg-teal-950/20 px-2 py-0.5 rounded-full border border-teal-200/50">
                12-Month Financing Plan (0% APR)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {patient.payments.map((pay: any, idx: number) => (
                <div 
                  key={pay.id} 
                  className={`rounded-2xl border p-4 space-y-2 relative overflow-hidden bg-slate-50/40 dark:bg-slate-950/20 ${
                    pay.status === 'PAID' 
                      ? 'border-emerald-100 dark:border-emerald-950/30' 
                      : 'border-slate-100 dark:border-slate-800/80'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-slate-400">Installment {idx + 1}</span>
                    <span className={pay.status === 'PAID' ? 'text-emerald-600' : 'text-amber-600'}>
                      {pay.status}
                    </span>
                  </div>
                  <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                    ${pay.amount.toLocaleString()}
                  </div>
                  <div className="text-[9px] text-slate-400 flex items-center gap-1 font-semibold">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>Due: {pay.dueDate}</span>
                  </div>
                  {pay.status === 'PAID' && (
                    <div className="absolute top-1 right-2 opacity-5">
                      <CheckCircle className="w-12 h-12 text-emerald-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: AI Care Assistant drawer (4 Cols) */}
        <div className="lg:col-span-4 h-full flex flex-col min-h-[500px]">
          <AIChatWidget 
            specialty={specialty} 
            patientName={patient.name} 
            isPortalView={true} 
          />
        </div>

      </div>

    </div>
  );
}

function PatientDashboardInner() {
  const searchParams = useSearchParams();
  const specialty = searchParams.get('specialty') || 'IVF';
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex bg-slate-50 dark:bg-slate-950 min-h-screen">
      <SidebarNav 
        role="PATIENT" 
        userName="Sarah Miller" 
        isOpenMobile={mobileSidebarOpen} 
        onCloseMobile={() => setMobileSidebarOpen(false)} 
      />
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        <DashboardHeader 
          title="My Clinical Chart" 
          subtitle="View active treatments, schedule visits, and access 24/7 care logs."
          role="PATIENT"
          userName="Sarah Miller"
          onMenuClick={() => setMobileSidebarOpen(true)}
        />
        <PatientDashboardContent />
      </div>
    </div>
  );
}

export default function PatientDashboard() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center bg-slate-50 py-20">
        <div className="text-center space-y-2">
          <Loader2 className="w-8 h-8 text-teal-500 animate-spin mx-auto" />
          <span className="text-xs font-bold text-slate-400">Loading Patient Console...</span>
        </div>
      </div>
    }>
      <PatientDashboardInner />
    </Suspense>
  );
}
