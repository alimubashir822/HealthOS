'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardHeader from '@/components/ui/DashboardHeader';
import SidebarNav from '@/components/SidebarNav';
import DocumentIntelligence from '@/components/ui/DocumentIntelligence';
import { Specialty } from '@/lib/types';
import { SPECIALTY_CONFIGS, DemoStateManager } from '@/lib/mockData';
import { 
  Users, 
  FileText, 
  ClipboardList, 
  Bot, 
  ChevronRight,
  Clock,
  Plus,
  Sparkles,
  Loader2,
  CheckCircle2,
  BrainCircuit,
  PiggyBank
} from 'lucide-react';

function DoctorDashboardContent() {
  const searchParams = useSearchParams();
  const [specialty, setSpecialty] = useState<Specialty>('IVF');

  useEffect(() => {
    const spec = searchParams.get('specialty') as Specialty;
    if (spec && ['IVF', 'DERMATOLOGY', 'DENTAL_IMPLANT', 'EYE_CARE'].includes(spec)) {
      setSpecialty(spec);
    }
  }, [searchParams]);

  const config = SPECIALTY_CONFIGS[specialty];

  // Caseload patients
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatientIndex, setSelectedPatientIndex] = useState(0);
  
  // Custom stage select
  const [selectedStageName, setSelectedStageName] = useState('');
  
  // Custom notes input
  const [newNote, setNewNote] = useState('');
  const [clinicalNotes, setClinicalNotes] = useState<string[]>([
    'Patient has completed hormone stimulation panels.',
    'Follicle counts: Left ovary (8, sizes 12-16mm), Right ovary (9, sizes 11-15mm).',
    'Trigger shot timing scheduled for Day 10 evening.'
  ]);

  // Conversion Package Form State
  const [procName, setProcName] = useState('');
  const [procCost, setProcCost] = useState(5000);
  const [procExplanation, setProcExplanation] = useState('Personalized stim cycle/restoration to optimize follicle/implant counts.');
  const [procBenefits, setProcBenefits] = useState('Optimized clinical counts\nLab supervision\nEnhanced success rates');
  const [procTimeline, setProcTimeline] = useState('Day 1-10: Stimulation\nDay 12: In-office procedure\nDay 17: Follow-up check');
  const [procPrep, setProcPrep] = useState('Avoid NSAIDs. Drink electrolyte formulas.');

  // Load patients on mount
  useEffect(() => {
    const list = DemoStateManager.getPatients();
    setPatients(list);
    
    // Default current stage select to the active patient's stage
    const activePat = list[selectedPatientIndex] || list[0];
    if (activePat) {
      setSelectedStageName(activePat.currentStage);
      setProcName(config.treatments[0]?.name || '');
      setProcCost(config.treatments[0]?.cost || 5000);
    }
  }, [specialty, selectedPatientIndex]);

  const activePatient = patients[selectedPatientIndex] || patients[0];

  const handleUpdateStage = () => {
    if (!activePatient || !selectedStageName) return;
    
    // Find stage order index to determine progress %
    const stageIdx = config.stages.findIndex(s => s.name === selectedStageName);
    const newProgress = Math.round(((stageIdx + 1) / config.stages.length) * 100);

    const updated = {
      ...activePatient,
      currentStage: selectedStageName,
      progress: newProgress,
      experienceScore: {
        ...activePatient.experienceScore,
        progressRatio: newProgress
      }
    };

    DemoStateManager.savePatient(updated);
    
    // Reload state
    const refreshed = DemoStateManager.getPatients();
    setPatients(refreshed);

    // Log automation trace
    DemoStateManager.addAutomationLog(
      `Doctor updated patient ${activePatient.name} stage to: "${selectedStageName}" (${newProgress}% complete).`,
      'Stage Update rule'
    );

    alert(`Stage updated successfully to: ${selectedStageName}`);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const notes = [newNote, ...clinicalNotes];
    setClinicalNotes(notes);

    // Save notes to active patient medical history simulator
    const updatedHistory = activePatient.medicalHistory + ` \n[Clinical Note - ${new Date().toLocaleDateString()}]: ${newNote}`;
    const updated = {
      ...activePatient,
      medicalHistory: updatedHistory
    };
    DemoStateManager.savePatient(updated);
    
    // Log trace
    DemoStateManager.addAutomationLog(
      `Doctor added clinical chart note for ${activePatient.name}: "${newNote}".`,
      'Log Medical Note'
    );

    setNewNote('');
  };

  const handleGeneratePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePatient) return;

    const newPackage = {
      procedure: procName,
      cost: Number(procCost),
      explanation: procExplanation,
      benefits: procBenefits.split('\n').filter(Boolean),
      timeline: procTimeline.split('\n').filter(Boolean),
      faqs: [
        { q: 'What is the recovery period?', a: 'Downtime is minimal, typically 24-48 hours of light rest.' },
        { q: 'Can this package be financed?', a: 'Yes! Bundles can be cleared in interest-free monthly installments.' }
      ],
      prepGuide: procPrep
    };

    const updated = {
      ...activePatient,
      conversionPackage: newPackage
    };

    DemoStateManager.savePatient(updated);

    // Refresh state
    const refreshed = DemoStateManager.getPatients();
    setPatients(refreshed);

    // Log automation trace
    DemoStateManager.addAutomationLog(
      `AI Treatment Conversion Assistant generated personalized package for ${activePatient.name} ($${Number(procCost).toLocaleString()}).`,
      'Generate Treatment Guide'
    );

    alert(`AI Conversion Guide successfully generated and sent to ${activePatient.name}'s portal!`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Caseload Feed (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-855 dark:text-slate-200 flex items-center gap-2">
                <Users className="w-5 h-5 text-teal-500" />
                <span>My Active Caseload</span>
              </h3>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full font-bold text-slate-500">
                {patients.length} patients
              </span>
            </div>

            <div className="space-y-2">
              {patients.map((pat: any, idx: number) => {
                const isSelected = selectedPatientIndex === idx;
                return (
                  <button
                    key={pat.id}
                    onClick={() => setSelectedPatientIndex(idx)}
                    className={`w-full text-left rounded-2xl border p-4 flex items-center gap-3.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-teal-500 bg-teal-50/30 dark:bg-teal-950/20 ring-1 ring-teal-500'
                        : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-teal-600 font-extrabold text-sm shrink-0">
                      {pat.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs text-slate-850 dark:text-slate-200 truncate flex justify-between items-center">
                        <span className="truncate">{pat.name}</span>
                        <span className="text-[9px] font-bold text-slate-400 shrink-0">{pat.progress}%</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                        Active stage: {pat.currentStage}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        {/* Right Column: Medical Record & Update panel (8 Cols) */}
        {activePatient && (
          <div className="lg:col-span-8 space-y-6">
            
            {/* DOCTOR AI BRIEF CARD ⭐ */}
            <div className="bg-gradient-to-r from-teal-500/10 via-indigo-500/5 to-transparent border border-teal-500/25 dark:border-slate-800 rounded-3xl p-6 space-y-3.5 shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2 uppercase tracking-wider">
                  <BrainCircuit className="w-5 h-5 text-teal-500" />
                  <span>Doctor AI Pre-visit Briefing</span>
                </h3>
                <span className="text-[9px] font-bold text-slate-450 uppercase">Pre-visit Summary</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="bg-white/50 dark:bg-slate-950 p-2.5 rounded-xl border border-teal-500/5">
                  <span className="text-[9px] text-slate-400 font-bold block mb-0.5">PROCEDURE</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{activePatient.specialty} Stims</span>
                </div>
                <div className="bg-white/50 dark:bg-slate-950 p-2.5 rounded-xl border border-teal-500/5">
                  <span className="text-[9px] text-slate-400 font-bold block mb-0.5">PREVIOUS CONTACT</span>
                  <span className="font-bold text-slate-805 dark:text-slate-202">3 Touchpoints</span>
                </div>
                <div className="bg-white/50 dark:bg-slate-950 p-2.5 rounded-xl border border-teal-500/5">
                  <span className="text-[9px] text-slate-400 font-bold block mb-0.5">MAIN CONCERN</span>
                  <span className="font-bold text-pink-650 dark:text-pink-400">Cost Transparency</span>
                </div>
                <div className="bg-white/50 dark:bg-slate-950 p-2.5 rounded-xl border border-teal-500/5">
                  <span className="text-[9px] text-slate-400 font-bold block mb-0.5">SUGGESTED DISCUSSION</span>
                  <span className="font-bold text-teal-650 dark:text-teal-400 flex items-center gap-0.5">
                    <PiggyBank className="w-3.5 h-3.5" />
                    Financing Options
                  </span>
                </div>
              </div>
            </div>

            {/* AI Medical Summaries Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold text-slate-450 uppercase tracking-wider flex items-center gap-2">
                  <Bot className="w-5 h-5 text-teal-500" />
                  <span>Clinical Synthesized Summary</span>
                </h3>
                <span className="text-[9px] font-bold text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-950/30 px-2 py-0.5 rounded-full border border-teal-200/50">
                  Synced Live
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-655 dark:text-slate-400">
                <div className="space-y-1.5">
                  <span className="font-bold text-slate-800 dark:text-slate-250 block">Diagnostic Roadmap:</span>
                  <p>Previous consultation successfully completed. Ovarian panels show baseline stability. Patient is progressing on Day 6 of hormone stims. No critical safety warnings flagged.</p>
                </div>
                <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 md:pl-6 pt-3 md:pt-0">
                  <span className="font-bold text-slate-850 dark:text-slate-250 block">Engagement Intelligence:</span>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Downpayment financing plan locked (PAID).</li>
                    <li>Timeline compliance: HIGH (visits kept).</li>
                    <li>Post-visit care assistant queries: 3 logs.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Central panels: Updates & Medical History */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Advance Treatment Stage Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-850 dark:text-slate-200 flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-teal-500" />
                  <span>Update Treatment Stage</span>
                </h3>
                <p className="text-[11px] text-slate-505">
                  Advance the active patient along the structured {config.name} stages.
                </p>
                <div className="h-px bg-slate-100 dark:bg-slate-800" />

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block">Select Active Stage</label>
                    <select
                      value={selectedStageName}
                      onChange={(e) => setSelectedStageName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs focus:outline-none focus:border-teal-500 text-slate-855 dark:text-slate-250"
                    >
                      {config.stages.map((st) => (
                        <option key={st.name} value={st.name}>{st.name}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleUpdateStage}
                    className="w-full rounded-xl bg-teal-500 py-2.5 text-center text-xs font-bold text-white shadow-md hover:bg-teal-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm Stage Update</span>
                  </button>
                </div>
              </div>

              {/* Patient Notes */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-805 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-850 dark:text-slate-200 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-500" />
                  <span>Clinical Charts & Notes</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  Append custom practitioner diagnostic notes.
                </p>
                
                <form onSubmit={handleAddNote} className="space-y-3">
                  <input
                    type="text"
                    placeholder="E.g., Day-6 follicles check size..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs focus:outline-none focus:border-teal-500 text-slate-800 dark:text-slate-205"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-xl border border-teal-200 dark:border-teal-850 py-2 text-center text-xs font-bold text-teal-600 dark:text-teal-400 hover:bg-teal-55 dark:hover:bg-teal-950/20 transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Append Chart Note</span>
                  </button>
                </form>
              </div>

            </div>

            {/* AI CLINICAL DOCUMENT SCANNER ⭐ */}
            <DocumentIntelligence />

            {/* AI TREATMENT PLAN & CONVERSION PACKAGE GENERATOR ⭐ */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-855 dark:text-slate-200 flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-teal-500 animate-pulse" />
                <span>AI Treatment Conversion Plan Generator</span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Generate a patient-friendly breakdown, benefits list, custom timeline, and preparation checklist to help patients accept the plan.
              </p>
              
              <div className="h-px bg-slate-100 dark:bg-slate-800" />
              
              <form onSubmit={handleGeneratePackage} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 block uppercase">Procedure Name</label>
                    <input
                      type="text"
                      value={procName}
                      onChange={(e) => setProcName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 block uppercase">Estimated Cost ($)</label>
                    <input
                      type="number"
                      value={procCost}
                      onChange={(e) => setProcCost(Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-805 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 block uppercase">Patient-Friendly Explanation</label>
                  <textarea
                    rows={2}
                    value={procExplanation}
                    onChange={(e) => setProcExplanation(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-955 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 block uppercase">Key Benefits (1 per line)</label>
                    <textarea
                      rows={3}
                      value={procBenefits}
                      onChange={(e) => setProcBenefits(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 block uppercase">Timeline steps (1 per line)</label>
                    <textarea
                      rows={3}
                      value={procTimeline}
                      onChange={(e) => setProcTimeline(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 block uppercase">Preparation guidelines</label>
                  <input
                    type="text"
                    value={procPrep}
                    onChange={(e) => setProcPrep(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-teal-500 py-3 text-center text-xs font-bold text-white shadow-md hover:bg-teal-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 animate-pulse shrink-0" />
                  <span>Generate & Send Conversion Package</span>
                </button>
              </form>
            </div>

            {/* Medical History Details and Clinical Feed */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
              <div>
                <h4 className="font-extrabold text-sm text-slate-850 dark:text-slate-200">
                  Medical Profile & History
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Static records and historical charts for {activePatient.name}.
                </p>
              </div>
              
              <div className="text-xs text-slate-550 dark:text-slate-400 leading-normal bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                {activePatient.medicalHistory}
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-850 dark:text-slate-200 block uppercase tracking-wider">
                  Practitioner Logs Timeline
                </span>
                <div className="space-y-2.5 max-h-48 overflow-y-auto">
                  {clinicalNotes.map((note, index) => (
                    <div 
                      key={index}
                      className="border-l-2 border-teal-500 pl-3.5 py-1 text-xs text-slate-655 dark:text-slate-400 leading-relaxed bg-slate-50/50 dark:bg-slate-900/50 p-2 rounded-r-xl border border-l-0 border-slate-100 dark:border-slate-800/30"
                    >
                      <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 mb-0.5">
                        <span>Clinical Entry</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date().toLocaleDateString()}
                        </span>
                      </div>
                      <p>{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

function DoctorDashboardInner() {
  const searchParams = useSearchParams();
  const specialty = searchParams.get('specialty') || 'IVF';
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex bg-slate-50 dark:bg-slate-950 min-h-screen">
      <SidebarNav 
        role="DOCTOR" 
        userName="Dr. Sofia Ahmed" 
        isOpenMobile={mobileSidebarOpen} 
        onCloseMobile={() => setMobileSidebarOpen(false)} 
      />
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        <DashboardHeader 
          title="Practitioner Portal" 
          subtitle="Manage active treatments, review medical histories, and update patient stages."
          role="DOCTOR"
          userName="Dr. Sofia Ahmed"
          onMenuClick={() => setMobileSidebarOpen(true)}
        />
        <DoctorDashboardContent />
      </div>
    </div>
  );
}

export default function DoctorDashboard() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center bg-slate-50 py-20">
        <div className="text-center space-y-2">
          <Loader2 className="w-8 h-8 text-teal-500 animate-spin mx-auto" />
          <span className="text-xs font-bold text-slate-400">Loading Doctor Dashboard...</span>
        </div>
      </div>
    }>
      <DoctorDashboardInner />
    </Suspense>
  );
}
