'use client';

import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  Calendar, 
  Loader2,
  RefreshCw
} from 'lucide-react';
import { Specialty } from '@/lib/types';
import { DemoStateManager } from '@/lib/mockData';

interface LeadQualifierWidgetProps {
  specialty: Specialty;
  onLeadQualified?: (lead: any) => void;
}

interface Question {
  id: string;
  field: string;
  question: string;
  options: string[];
}

export default function LeadQualifierWidget({ specialty, onLeadQualified }: LeadQualifierWidgetProps) {
  // Conversational workflow state
  const [step, setStep] = useState<'intro' | 'questioning' | 'scoring' | 'result'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Lead info inputs
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scoringResults, setScoringResults] = useState<any>(null);

  const getQuestionsForSpecialty = (spec: Specialty): Question[] => {
    const common = [
      {
        id: 'timeline',
        field: 'How soon are you looking for treatment?',
        question: 'When would you like to start your treatment?',
        options: ['Immediately (Within 1 month)', 'In 2-3 months', 'Just researching / 6+ months']
      },
      {
        id: 'prior_visit',
        field: 'Have you visited another clinic?',
        question: 'Have you consulted another specialist for this before?',
        options: ['Yes, seeking a second opinion', 'No, this is my first consultation']
      },
      {
        id: 'location',
        field: 'What is your preferred location?',
        question: 'Which of our clinics is most convenient for you?',
        options: ['New York Clinic', 'Miami Clinic', 'Dallas Clinic']
      }
    ];

    switch (spec) {
      case 'IVF':
        return [
          {
            id: 'treatment',
            field: 'What treatment are you interested in?',
            question: 'What specific fertility service are you interested in exploring?',
            options: ['IVF Cycle', 'Egg Freezing', 'Intracytoplasmic Sperm Injection (ICSI)', 'Not sure / General Consultation']
          },
          ...common
        ];
      case 'DERMATOLOGY':
        return [
          {
            id: 'treatment',
            field: 'What treatment are you interested in?',
            question: 'What skincare area would you like to address?',
            options: ['Acne Scar Revision', 'Anti-aging & Laser Resurfacing', 'Pigmentation / Melasma', 'General Assessment']
          },
          ...common
        ];
      case 'DENTAL_IMPLANT':
        return [
          {
            id: 'treatment',
            field: 'What treatment are you interested in?',
            question: 'What is the scale of the dental restoration you need?',
            options: ['Single Tooth Implant', 'All-On-4 Full Arch Restoration', 'Multiple Implants', 'Initial Scan & Pricing Consult']
          },
          ...common
        ];
      case 'EYE_CARE':
        return [
          {
            id: 'treatment',
            field: 'What treatment are you interested in?',
            question: 'What vision correction options are you interested in?',
            options: ['LASIK Laser Eye Surgery', 'Cataract Lens Replacement', 'EVO+ ICL Implantable Lens', 'Dry Eye Therapy']
          },
          ...common
        ];
    }
  };

  const questions = getQuestionsForSpecialty(specialty);

  const startAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail || !leadPhone) return;
    setStep('questioning');
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const selectOption = (opt: string) => {
    const q = questions[currentQuestionIndex];
    const newAnswers = { ...answers, [q.field]: opt };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Last question answered - calculate score
      runAIScoring(newAnswers);
    }
  };

  const runAIScoring = (finalAnswers: Record<string, string>) => {
    setStep('scoring');

    // Simulate AI scoring logic
    setTimeout(() => {
      const timelineAns = finalAnswers['How soon are you looking for treatment?'];
      const priorAns = finalAnswers['Have you visited another clinic?'];
      
      let score: 'HIGH' | 'MEDIUM' | 'LOW' = 'MEDIUM';
      let scoreReason = '';

      if (timelineAns.includes('Immediately')) {
        score = 'HIGH';
        scoreReason = 'High conversion potential: Patient seeks treatment immediately.';
      } else if (timelineAns.includes('2-3 months')) {
        score = 'MEDIUM';
        scoreReason = 'Medium conversion potential: Patient plans to start within a quarter.';
      } else {
        score = 'LOW';
        scoreReason = 'Nurture candidate: Patient is in initial research phase.';
      }

      if (priorAns.includes('second opinion')) {
        scoreReason += ' Seeking second opinion (high urgency).';
      }

      const newLead = {
        id: `lead-${Date.now()}`,
        name: leadName,
        email: leadEmail,
        phone: leadPhone,
        specialty,
        status: score === 'HIGH' ? 'QUALIFIED' : 'QUALIFYING',
        score,
        scoreReason,
        answers: JSON.stringify(
          Object.keys(finalAnswers).map(k => ({ question: k, answer: finalAnswers[k] }))
        ),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Save to memory storage
      DemoStateManager.saveLead(newLead);
      
      // Log automation steps
      DemoStateManager.addAutomationLog(
        `Scored lead ${leadName} as ${score}. Triggered automation rule: UPDATE_SCORE.`,
        'Score Lead'
      );
      if (score === 'HIGH') {
        DemoStateManager.addAutomationLog(
          `Sent auto-SMS to ${leadName} (${leadPhone}) for immediate priority booking.`,
          'Send Qualified SMS'
        );
      }

      setScoringResults(newLead);
      setStep('result');
      if (onLeadQualified) onLeadQualified(newLead);
    }, 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-4 text-white flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm shrink-0">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-bold leading-tight">AI Care Advisor</h3>
          <p className="text-[10px] text-teal-100 flex items-center gap-1 mt-0.5">
            <Sparkles className="w-3 h-3 text-teal-200" />
            <span>Interactive Lead Qualification</span>
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 min-h-[300px] flex flex-col justify-between">
        
        {/* STEP 1: INTRO FORM */}
        {step === 'intro' && (
          <form onSubmit={startAssessment} className="space-y-4 my-auto">
            <div className="text-center space-y-1.5 mb-2">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200">
                Qualify For Treatment Instantly
              </h4>
              <p className="text-[10px] text-slate-400">
                Let our AI Care Assistant check your eligibility and custom options.
              </p>
            </div>
            
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Your Full Name"
                required
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-teal-500 py-2.5 text-xs font-bold text-white shadow-md hover:bg-teal-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Begin AI Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* STEP 2: CONVERSATIONAL QUESTIONS */}
        {step === 'questioning' && (
          <div className="space-y-4 my-auto">
            {/* Progress indicators */}
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold mb-1">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
            </div>
            
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-teal-500 transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl p-3.5">
                <Bot className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {questions[currentQuestionIndex].question}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {questions[currentQuestionIndex].options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => selectOption(opt)}
                    className="w-full text-left rounded-xl border border-slate-200 dark:border-slate-800 p-3 text-xs text-slate-700 dark:text-slate-300 hover:border-teal-500 hover:bg-teal-50/20 dark:hover:bg-teal-950/10 cursor-pointer font-medium transition-all"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: SCORING STATE */}
        {step === 'scoring' && (
          <div className="my-auto text-center space-y-3">
            <Loader2 className="w-8 h-8 text-teal-500 animate-spin mx-auto" />
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200">
                AI Growth Engine Qualifying...
              </h4>
              <p className="text-[10px] text-slate-400 mt-1">
                Analyzing answers, scoring urgency, and querying doctor schedules.
              </p>
            </div>
          </div>
        )}

        {/* STEP 4: RESULTS DISPLAY */}
        {step === 'result' && scoringResults && (
          <div className="space-y-4 my-auto">
            <div className="text-center space-y-2">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-100">
                  Assessment Complete!
                </h4>
                <p className="text-[10px] text-slate-400">
                  We have mapped your journey structure.
                </p>
              </div>
            </div>

            {/* Score box */}
            <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 space-y-3.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-500">Lead Score:</span>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  scoringResults.score === 'HIGH' 
                    ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700' 
                    : scoringResults.score === 'MEDIUM' 
                    ? 'bg-blue-100 dark:bg-blue-950/50 text-blue-700' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                }`}>
                  {scoringResults.score} PRIORITY
                </span>
              </div>
              <div className="h-px bg-slate-200 dark:bg-slate-800" />
              <div className="text-xs text-slate-600 dark:text-slate-400">
                <span className="font-bold text-slate-800 dark:text-slate-200 block mb-0.5">Next Recommended Action:</span>
                {scoringResults.score === 'HIGH' ? (
                  <span>Book your initial consultation. You qualify for an expedited appointment slot with our specialists.</span>
                ) : (
                  <span>Book a brief pre-consultation call to answer generic medical planning questions.</span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <a
                href={`/book?specialty=${specialty}`}
                className="w-full rounded-xl bg-teal-500 py-2.5 text-xs font-bold text-white shadow-md hover:bg-teal-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Instant Consultation</span>
              </a>

              <button
                onClick={() => {
                  setStep('intro');
                  setLeadName('');
                  setLeadEmail('');
                  setLeadPhone('');
                }}
                className="w-full text-center text-[10px] font-bold text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Test Again</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
