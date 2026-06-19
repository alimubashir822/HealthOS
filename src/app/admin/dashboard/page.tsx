'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardHeader from '@/components/ui/DashboardHeader';
import SidebarNav from '@/components/SidebarNav';
import AnalyticsChart from '@/components/ui/AnalyticsChart';
import AutomationFlowBuilder from '@/components/ui/AutomationFlowBuilder';
import IntegrationSettings from '@/components/ui/IntegrationSettings';
import { Specialty } from '@/lib/types';
import { SPECIALTY_CONFIGS, DemoStateManager } from '@/lib/mockData';
import { 
  BarChart3, 
  Users, 
  CalendarCheck, 
  DollarSign, 
  Sparkles, 
  Layers, 
  Bot, 
  Cpu, 
  Clock, 
  Phone, 
  Mail, 
  MapPin,
  Loader2,
  RefreshCw,
  TrendingUp,
  AlertTriangle,
  Play,
  ArrowRight,
  Send,
  Calendar,
  Layers3,
  Bookmark,
  Shield
} from 'lucide-react';

function AdminDashboardContent() {
  const searchParams = useSearchParams();
  const [specialty, setSpecialty] = useState<Specialty>('IVF');
  
  // Active clinic view (New York, Miami, Dallas)
  const [activeClinic, setActiveClinic] = useState('New York Clinic');

  // Leads list
  const [leads, setLeads] = useState<any[]>([]);
  const [selectedLeadIndex, setSelectedLeadIndex] = useState(0);

  // Intent Tab Filter
  const [activeIntentTab, setActiveIntentTab] = useState<'HIGH_INTENT' | 'FOLLOW_UP' | 'LOST'>('HIGH_INTENT');

  // Retention Alerts state
  const [retentionAlerts, setRetentionAlerts] = useState<any[]>([]);

  // Automation rules toggles
  const [automationRules, setAutomationRules] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  // Campaign Generator state
  const [campaignTopic, setCampaignTopic] = useState('Explain IVF Egg Freezing Benefits');
  const [campaignOutputs, setCampaignOutputs] = useState<any>(null);
  const [generatingCampaign, setGeneratingCampaign] = useState(false);

  // Mock data for ROI charts
  const monthlyRevenueData = [
    { label: 'Jan', value: 45000 },
    { label: 'Feb', value: 52000 },
    { label: 'Mar', value: 61000 },
    { label: 'Apr', value: 58000 },
    { label: 'May', value: 74000 },
    { label: 'Jun', value: 92000 },
  ];

  const leadChannelData = [
    { label: 'Google Search', value: 140 },
    { label: 'Instagram Ads', value: 95 },
    { label: 'Organic SEO', value: 50 },
    { label: 'Referrals', value: 35 },
  ];

  // Load leads, logs, and rules
  const reloadData = () => {
    setLeads(DemoStateManager.getLeads());
    setLogs(DemoStateManager.getAutomationLogs());
    setRetentionAlerts(DemoStateManager.getRetentionAlerts());
    setAuditLogs(DemoStateManager.getAuditLogs());
    setAutomationRules([
      { name: 'Lead Auto-Scoring', trigger: 'NEW_LEAD', action: 'UPDATE_SCORE', active: true },
      { name: 'Priority Booking SMS', trigger: 'LEAD_QUALIFIED', action: 'SEND_SMS', active: true },
      { name: 'Pre-visit Prep Guide Email', trigger: 'APPOINTMENT_BOOKED', action: 'SEND_EMAIL', active: true }
    ]);
  };

  useEffect(() => {
    reloadData();
  }, [specialty]);

  useEffect(() => {
    const spec = searchParams.get('specialty') as Specialty;
    if (spec && ['IVF', 'DERMATOLOGY', 'DENTAL_IMPLANT', 'EYE_CARE'].includes(spec)) {
      setSpecialty(spec);
    }
  }, [searchParams]);

  // Filter leads based on Smart Intent categorization
  const filteredLeads = leads.filter((l: any) => {
    if (activeIntentTab === 'HIGH_INTENT') {
      return l.score === 'HIGH';
    }
    if (activeIntentTab === 'FOLLOW_UP') {
      return l.status === 'QUALIFYING' || l.score === 'MEDIUM';
    }
    return l.status === 'UNQUALIFIED' || l.score === 'LOW';
  });

  const activeLead = filteredLeads[selectedLeadIndex] || filteredLeads[0];

  const handleOutreach = (patientId: string) => {
    DemoStateManager.triggerRetentionOutreach(patientId);
    reloadData();
    alert('AI Retention outreach completed. Sent educational packets and monthly installment schedules!');
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneratingCampaign(true);

    setTimeout(() => {
      setGeneratingCampaign(false);
      
      let copy = '';
      let faqs = [{ q: '', a: '' }];
      let blogs = [''];
      let email = '';
      let social = '';

      if (campaignTopic.includes('Egg Freezing')) {
        copy = 'Freeze Your Fertility: Lock In Your Choices For Tomorrow. Vitrification offers high survival rates.';
        faqs = [
          { q: 'What is the optimal age?', a: 'Eggs frozen before 35 offer the highest success rates.' },
          { q: 'How long can they be stored?', a: 'Viable indefinitely when stored in liquid nitrogen.' }
        ];
        blogs = ['The Science of Cryopreservation', 'Why vitrification changes women choices'];
        email = 'Subject: Take control of your timeline, Sarah.\nDear Sarah, explore our zero-interest vitrification plans...';
        social = '❄️ Cryopreserve oocytes at HealthOS. Free guides inside. #EggFreezing';
      } else if (campaignTopic.includes('Implant')) {
        copy = 'Premium Guided Dental Implants: Restoring Bite & Smile functionality in one day.';
        faqs = [
          { q: 'Is guided surgery painful?', a: 'Conducted under local anesthesia or light IV sedation, ensuring zero discomfort.' },
          { q: 'What is the recovery period?', a: 'Soft foods for 48 hours, fully healed in weeks.' }
        ];
        blogs = ['Zirconia vs Titanium implants', 'How surgical templates speed up smile recovery'];
        email = 'Subject: Complete your restoration path.\nDear James, lock in dental implant financing plans...';
        social = '🦷 Smile confidently. Guided digital implants are 98% successful. #DentalImplants';
      } else {
        copy = 'Laser Acne Scar Revision: Clear skin and smooth contours using Morpheus8 RF Microneedling.';
        faqs = [
          { q: 'How much downtime is expected?', a: 'Redness fades in 24-48 hours. Protect skin with mineral block.' }
        ];
        blogs = ['Collagen remodeling science', 'peels vs laser for pigment reduction'];
        email = 'Subject: Reveal fresh, clear skin.\nDear Elena, schedule acne revision sessions...';
        social = '✨ Remodel skin texture. Clear scars with CO2 Fractional lasers. #Dermatology';
      }

      const generated = {
        id: `camp-${Date.now()}`,
        topic: campaignTopic,
        landingCopy: copy,
        faqs,
        blogIdeas: blogs,
        emailSequence: email,
        socialPosts: social
      };

      DemoStateManager.saveCampaign(generated);
      setCampaignOutputs(generated);

      // Log automation trace
      DemoStateManager.addAutomationLog(
        `AI Marketing Engine generated multi-channel campaign copy for topic: "${campaignTopic}".`,
        'Create Marketing Campaign'
      );
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      
      {/* Clinic Selector & Top Metrics */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
            Clinic Group Organization
          </span>
          <div className="flex items-center gap-2">
            <select
              value={activeClinic}
              onChange={(e) => setActiveClinic(e.target.value)}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3.5 py-1.5 text-xs font-bold text-slate-805 dark:text-slate-200 focus:outline-none focus:border-teal-500 cursor-pointer"
            >
              <option value="New York Clinic">New York Clinic (HQ)</option>
              <option value="Miami Clinic">Miami Clinic</option>
              <option value="Dallas Clinic">Dallas Clinic</option>
            </select>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        <button
          onClick={reloadData}
          className="rounded-xl border border-slate-200 dark:border-slate-800 py-1.5 px-3 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer ml-auto sm:ml-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh telemetry</span>
        </button>
      </div>

      {/* 1. TREATMENT ROI DASHBOARD ⭐ */}
      <div>
        <div className="flex items-center gap-1.5 mb-4">
          <BarChart3 className="w-5 h-5 text-teal-500" />
          <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
            Treatment ROI Dashboard (Google Adwords & Lead Sources)
          </h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Google Leads</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">320</span>
              <span className="text-[9px] text-blue-500 font-semibold flex items-center gap-0.5 mt-1 leading-none">
                <TrendingUp className="w-3 h-3" />
                <span>+18% this month</span>
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center shrink-0">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Consultations</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">120</span>
              <span className="text-[9px] text-teal-650 font-semibold flex items-center gap-0.5 mt-1 leading-none">
                <TrendingUp className="w-3 h-3" />
                <span>+12% conversion</span>
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-pink-500/10 text-pink-600 flex items-center justify-center shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Treatments Started</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">45</span>
              <span className="text-[9px] text-pink-500 font-semibold flex items-center gap-0.5 mt-1 leading-none">
                <TrendingUp className="w-3 h-3" />
                <span>94% financing rate</span>
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">ROI Revenue</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">$120,000</span>
              <span className="text-[9px] text-emerald-655 font-semibold flex items-center gap-0.5 mt-1 leading-none">
                <TrendingUp className="w-3 h-3" />
                <span>+24% YoY growth</span>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="space-y-2">
            <span className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Monthly Treatment Revenue (USD)
            </span>
            <AnalyticsChart data={monthlyRevenueData} type="line" color="#14b8a6" prefix="$" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Lead Acquisition by Marketing Channel
            </span>
            <AnalyticsChart data={leadChannelData} type="bar" color="#3b82f6" />
          </div>
        </div>
      </div>

      {/* 2. SMART LEAD INTENT TABS ⭐ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Section: Leads qualifying feed (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <h3 className="text-sm font-bold text-slate-850 dark:text-slate-200 flex items-center gap-2">
                <Users className="w-5 h-5 text-teal-500" />
                <span>Smart Lead Intelligence Feed</span>
              </h3>
              
              {/* Tab Filters */}
              <div className="flex rounded-xl bg-slate-100 dark:bg-slate-950 p-1 text-[10px] font-bold">
                <button
                  onClick={() => { setActiveIntentTab('HIGH_INTENT'); setSelectedLeadIndex(0); }}
                  className={`rounded-lg px-2.5 py-1.5 cursor-pointer ${
                    activeIntentTab === 'HIGH_INTENT' 
                      ? 'bg-white dark:bg-slate-900 text-teal-650' 
                      : 'text-slate-400'
                  }`}
                >
                  High Intent
                </button>
                <button
                  onClick={() => { setActiveIntentTab('FOLLOW_UP'); setSelectedLeadIndex(0); }}
                  className={`rounded-lg px-2.5 py-1.5 cursor-pointer ${
                    activeIntentTab === 'FOLLOW_UP' 
                      ? 'bg-white dark:bg-slate-900 text-teal-650' 
                      : 'text-slate-400'
                  }`}
                >
                  Needs Follow-up
                </button>
                <button
                  onClick={() => { setActiveIntentTab('LOST'); setSelectedLeadIndex(0); }}
                  className={`rounded-lg px-2.5 py-1.5 cursor-pointer ${
                    activeIntentTab === 'LOST' 
                      ? 'bg-white dark:bg-slate-900 text-teal-650' 
                      : 'text-slate-400'
                  }`}
                >
                  Lost Opportunity
                </button>
              </div>
            </div>

            {/* Leads List */}
            <div className="grid grid-cols-1 gap-2.5">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((l: any, index: number) => {
                  const isSelected = selectedLeadIndex === index;
                  return (
                    <button
                      key={l.id}
                      onClick={() => setSelectedLeadIndex(index)}
                      className={`w-full text-left rounded-2xl border p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-teal-500 bg-teal-50/20 dark:bg-teal-950/20 ring-1 ring-teal-500'
                          : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="font-bold text-xs text-slate-850 dark:text-slate-200 flex items-center gap-2">
                          <span>{l.name}</span>
                          <span className={`inline-flex items-center rounded-full px-1.5 py-0.2 text-[8px] font-bold ${
                            l.score === 'HIGH' 
                              ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700' 
                              : l.score === 'MEDIUM' 
                              ? 'bg-blue-100 dark:bg-blue-950/50 text-blue-700' 
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          }`}>
                            {l.score}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-semibold">
                          Interested: {l.specialty} treatment
                        </div>
                        <div className="flex gap-4 text-[9px] text-slate-400 font-medium pt-1">
                          <span className="flex items-center gap-1"><Phone className="w-2.5 h-2.5" />{l.phone}</span>
                          <span className="flex items-center gap-1"><Mail className="w-2.5 h-2.5" />{l.email}</span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          STATUS
                        </span>
                        <span className={`text-[10px] font-extrabold ${
                          l.status === 'CONVERTED' 
                            ? 'text-teal-500' 
                            : l.status === 'QUALIFIED' 
                            ? 'text-emerald-500' 
                            : 'text-amber-500'
                        }`}>
                          {l.status}
                        </span>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-6 text-xs text-slate-400 font-semibold">
                  No leads in this intent category.
                </div>
              )}
            </div>

            {/* Display active lead answers detailed breakdown */}
            {activeLead && (
              <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 space-y-3.5">
                <div>
                  <h4 className="font-extrabold text-xs text-slate-850 dark:text-slate-200">
                    Lead Qualification Details ({activeLead.name})
                  </h4>
                  <p className="text-[9px] text-slate-400 mt-0.5">
                    Real-time inputs analyzed by our AI Onboarding Engine.
                  </p>
                </div>
                
                <div className="h-px bg-slate-200 dark:bg-slate-800" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
                  <div className="space-y-1">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">AI Evaluation Reasoning:</span>
                    <p className="text-slate-500 dark:text-slate-400 italic">"{activeLead.scoreReason || 'Qualifying answers...'}"</p>
                  </div>

                  <div className="space-y-2 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 md:pl-4 pt-2 md:pt-0">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block">Lead Responses:</span>
                    <div className="space-y-1.5 max-h-24 overflow-y-auto text-[10px]">
                      {JSON.parse(activeLead.answers || '[]').map((ans: any, idx: number) => (
                        <div key={idx} className="flex justify-between bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50 p-1.5 rounded-lg">
                          <span className="text-slate-400 truncate pr-4 max-w-[60%]">{ans.question}</span>
                          <span className="font-bold text-slate-700 dark:text-slate-350">{ans.answer}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Section: Automation rules (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* AI PATIENT RETENTION ENGINE ⭐ */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-850 dark:text-slate-200 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500 animate-bounce" />
                <span>AI Patient Retention Engine</span>
              </h3>
              <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 px-2 py-0.5 rounded-full border border-amber-250/50">
                At Risk: {retentionAlerts.filter((a: any) => a.status === 'AT_RISK').length}
              </span>
            </div>
            
            <p className="text-[11px] text-slate-500">
              Patients who completed consultation but have not booked treatment for 14+ days.
            </p>
            <div className="h-px bg-slate-100 dark:bg-slate-800" />

            <div className="space-y-2.5">
              {retentionAlerts.map((alert: any) => (
                <div 
                  key={alert.id}
                  className="rounded-2xl border border-slate-100 dark:border-slate-800 p-4 space-y-3 bg-slate-50/40 dark:bg-slate-950/20"
                >
                  <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                    <span>{alert.name} ({alert.specialty})</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                      alert.status === 'AT_RISK' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {alert.status === 'AT_RISK' ? '14 Days Dormant' : 'Outreach Sent'}
                    </span>
                  </div>
                  
                  {alert.status === 'AT_RISK' ? (
                    <button
                      onClick={() => handleOutreach(alert.patientId)}
                      className="w-full rounded-xl bg-teal-500 py-2 text-center text-xs font-bold text-white shadow-sm hover:bg-teal-600 cursor-pointer transition-colors"
                    >
                      Trigger Retention Outreach
                    </button>
                  ) : (
                    <div className="text-[10px] text-slate-400 font-semibold text-center italic">
                      Outreach completed. Reminders and financing options sent.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CLINIC AUTOMATION BUILDER ⭐ */}
          <AutomationFlowBuilder />

          {/* INTEGRATION SETTINGS ⭐ */}
          <IntegrationSettings />

          {/* Automation rule logs timeline */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-850 dark:text-slate-250 flex items-center gap-2">
              <Layers3 className="w-5 h-5 text-teal-500" />
              <span>Automation Logs History</span>
            </h3>
            
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {logs.map((log) => (
                <div 
                  key={log.id} 
                  className="rounded-xl border border-slate-100 dark:border-slate-800/80 p-3 bg-slate-50/40 dark:bg-slate-950/20 text-xs leading-relaxed space-y-1.5"
                >
                  <div className="flex justify-between items-center text-[9px] font-bold">
                    <span className="text-teal-600 uppercase tracking-wider flex items-center gap-1">
                      <Bot className="w-3.5 h-3.5" />
                      {log.rule}
                    </span>
                    <span className="text-slate-400 font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-650 dark:text-slate-450">{log.message}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 3. AI MARKETING CAMPAIGN GENERATOR ⭐ */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
        <h3 className="text-sm font-bold text-slate-850 dark:text-slate-250 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-teal-500 animate-pulse" />
          <span>AI Marketing Campaign & Copy Generator</span>
        </h3>
        <p className="text-[11px] text-slate-550">
          Design landing page copy, FAQs, blog structures, email drip flows, and social media promotions with one click.
        </p>

        <div className="h-px bg-slate-100 dark:bg-slate-800" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left panel: configure campaign */}
          <form onSubmit={handleCreateCampaign} className="lg:col-span-4 space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 block uppercase">Campaign Topic</label>
              <select
                value={campaignTopic}
                onChange={(e) => setCampaignTopic(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-850 focus:outline-none focus:border-teal-500"
              >
                <option value="Explain IVF Egg Freezing Benefits">Explain IVF Egg Freezing Benefits</option>
                <option value="Explain Dental Implant Recovery">Explain Dental Implant Recovery</option>
                <option value="Explain Clear Acne Scars laser resurfacing">Explain Clear Acne Scars laser resurfacing</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={generatingCampaign}
              className="w-full rounded-xl bg-teal-500 py-3 text-center text-xs font-bold text-white shadow-md hover:bg-teal-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {generatingCampaign ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                  <span>Synthesizing Copy...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 shrink-0" />
                  <span>Create AI Campaign Copy</span>
                </>
              )}
            </button>
          </form>

          {/* Right panel: generated output */}
          <div className="lg:col-span-8 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl">
            {campaignOutputs ? (
              <div className="space-y-4 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-extrabold text-teal-700 dark:text-teal-400">Multi-Channel Copy Package</span>
                  <span className="text-[9px] text-slate-400 font-semibold">Copy Generated</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Landing page copy */}
                  <div className="space-y-1 bg-white dark:bg-slate-900 border border-slate-100 p-3 rounded-xl">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block text-[10px] uppercase">Landing Page Copy</span>
                    <p className="text-slate-500 dark:text-slate-400 leading-normal italic">"{campaignOutputs.landingCopy}"</p>
                  </div>

                  {/* Email drip */}
                  <div className="space-y-1 bg-white dark:bg-slate-900 border border-slate-100 p-3 rounded-xl">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block text-[10px] uppercase">Email Sequence</span>
                    <p className="text-slate-550 dark:text-slate-400 leading-normal whitespace-pre-line">{campaignOutputs.emailSequence}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Blog ideas */}
                  <div className="space-y-1.5 bg-white dark:bg-slate-900 border border-slate-100 p-3 rounded-xl">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block text-[10px] uppercase">Blog Topics</span>
                    <ul className="list-disc pl-4 space-y-1 text-slate-500">
                      {campaignOutputs.blogIdeas.map((b: string, i: number) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Social posts */}
                  <div className="space-y-1 bg-white dark:bg-slate-900 border border-slate-100 p-3 rounded-xl">
                    <span className="font-bold text-slate-800 dark:text-slate-200 block text-[10px] uppercase">Social Promo</span>
                    <p className="text-slate-500 dark:text-slate-400 leading-normal">{campaignOutputs.socialPosts}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-center py-10 space-y-2 text-slate-400">
                <Sparkles className="w-8 h-8 text-slate-350" />
                <span className="text-xs font-semibold">Select a topic and click generate to launch copy blocks.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. HIPAA COMPLIANCE AUDIT LOGS ⭐ */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <div>
            <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-5 h-5 text-teal-500" />
              <span>HIPAA-Compliant Access & Operations Audit Logs</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">
              Real-time trace logging all PHI accesses, clinical updates, and administrative outreach executions.
            </p>
          </div>
          <span className="self-start sm:self-center text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
            Active HIPAA Session
          </span>
        </div>
        <div className="h-px bg-slate-100 dark:bg-slate-800" />
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Operator</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
              {auditLogs.map((log: any) => (
                <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                  <td className="py-3 px-4 text-slate-400 font-medium whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">
                    {log.operatorName}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold ${
                      log.role === 'DOCTOR' 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400' 
                        : log.role === 'ADMIN' 
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400' 
                        : log.role === 'NURSE'
                        ? 'bg-teal-100 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400'
                        : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {log.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-350">
                    {log.action}
                  </td>
                  <td className="py-3 px-4 text-slate-500 dark:text-slate-400 leading-normal">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

function AdminDashboardInner() {
  const searchParams = useSearchParams();
  const specialty = searchParams.get('specialty') || 'IVF';
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex bg-slate-50 dark:bg-slate-950 min-h-screen">
      <SidebarNav 
        role="ADMIN" 
        userName="Clinic Owner" 
        isOpenMobile={mobileSidebarOpen} 
        onCloseMobile={() => setMobileSidebarOpen(false)} 
      />
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        <DashboardHeader 
          title="Group Growth Dashboard" 
          subtitle="Operational telemetry, lead qualifying ratios, and automated notification sequences."
          role="ADMIN"
          userName="Clinic Owner"
          onMenuClick={() => setMobileSidebarOpen(true)}
        />
        <AdminDashboardContent />
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center bg-slate-50 py-20">
        <div className="text-center space-y-2">
          <Loader2 className="w-8 h-8 text-teal-500 animate-spin mx-auto" />
          <span className="text-xs font-bold text-slate-400">Loading Clinic Console...</span>
        </div>
      </div>
    }>
      <AdminDashboardInner />
    </Suspense>
  );
}
