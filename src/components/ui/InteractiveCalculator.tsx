'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, ShieldCheck, TrendingUp, Info } from 'lucide-react';
import { Specialty } from '@/lib/types';
import { SPECIALTY_CONFIGS } from '@/lib/mockData';

interface InteractiveCalculatorProps {
  specialty: Specialty;
}

export default function InteractiveCalculator({ specialty }: InteractiveCalculatorProps) {
  const config = SPECIALTY_CONFIGS[specialty];
  const treatments = config.treatments;

  // Selected treatment
  const [selectedTreatmentIndex, setSelectedTreatmentIndex] = useState(0);
  const activeTreatment = treatments[selectedTreatmentIndex] || treatments[0];

  // Downpayment slider (percentage)
  const [downpaymentPercent, setDownpaymentPercent] = useState(20);
  
  // Installment months (12, 24, 36)
  const [months, setMonths] = useState(12);

  const cost = activeTreatment.cost;
  const downpayment = Math.round((cost * downpaymentPercent) / 100);
  const remaining = cost - downpayment;

  // Interest rate calculation: 12 months is 0%, 24 months is 3.5%, 36 months is 5.5%
  const getInterestRate = (m: number) => {
    if (m === 12) return 0;
    if (m === 24) return 0.035;
    return 0.055;
  };

  const interestRate = getInterestRate(months);
  const totalWithInterest = remaining * (1 + interestRate);
  const monthlyPayment = Math.round(totalWithInterest / months);

  // If specialty changes, reset treatment selection
  useEffect(() => {
    setSelectedTreatmentIndex(0);
  }, [specialty]);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-5">
        
        {/* Left Section: Inputs */}
        <div className="p-6 md:p-8 md:col-span-3 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-teal-500" />
              <span>Configure Your Plan</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Select your procedure and choose a financing duration that fits your budget.
            </p>
          </div>

          {/* Treatment Select */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Select Procedure
            </label>
            <div className="grid grid-cols-1 gap-2">
              {treatments.map((tr, index) => (
                <button
                  key={tr.name}
                  onClick={() => setSelectedTreatmentIndex(index)}
                  className={`flex items-center justify-between rounded-xl border p-3.5 text-left text-xs transition-all cursor-pointer ${
                    selectedTreatmentIndex === index
                      ? 'border-teal-500 bg-teal-50/40 dark:bg-teal-950/20 ring-1 ring-teal-500'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">{tr.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1 max-w-md">{tr.description}</div>
                  </div>
                  <div className="font-bold text-slate-950 dark:text-white shrink-0 ml-4">
                    ${tr.cost.toLocaleString()}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Downpayment Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-400">Downpayment (Deposit)</span>
              <span className="font-bold text-teal-600">
                {downpaymentPercent}% (${downpayment.toLocaleString()})
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              step="5"
              value={downpaymentPercent}
              onChange={(e) => setDownpaymentPercent(Number(e.target.value))}
              className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-slate-200 dark:bg-slate-700 accent-teal-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>10% (Min)</span>
              <span>30%</span>
              <span>50% (Max)</span>
            </div>
          </div>

          {/* Installment Term Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block">
              Financing Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[12, 24, 36].map((m) => (
                <button
                  key={m}
                  onClick={() => setMonths(m)}
                  className={`rounded-xl border py-3 text-center text-xs font-bold transition-all cursor-pointer ${
                    months === m
                      ? 'border-teal-500 bg-teal-50/40 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400 ring-1 ring-teal-500'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div>{m} Months</div>
                  <div className="text-[10px] font-medium text-slate-400 mt-0.5">
                    {m === 12 ? '0% APR' : m === 24 ? '3.5% APR' : '5.5% APR'}
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Section: Calculation Result */}
        <div className="p-6 md:p-8 md:col-span-2 bg-slate-50 dark:bg-slate-900/50 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-100 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 px-2.5 py-0.5 text-[10px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Soft Credit Check Only</span>
            </div>

            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Estimated Monthly
              </div>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                  ${monthlyPayment}
                </span>
                <span className="text-xs text-slate-500 font-semibold">/ month</span>
              </div>
            </div>

            <div className="h-px bg-slate-200 dark:bg-slate-800 my-4" />

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Treatment Cost:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  ${cost.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Initial Downpayment:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  -${downpayment.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Financing Principal:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  ${remaining.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Financing Fees:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {months === 12 ? 'FREE (0% APR)' : `$${Math.round(remaining * interestRate).toLocaleString()}`}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full rounded-xl bg-teal-500 py-3 text-center text-xs font-bold text-white shadow-md shadow-teal-500/10 hover:bg-teal-600 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer">
              Pre-Qualify Now
            </button>
            <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400">
              <TrendingUp className="w-3 h-3 text-emerald-500" />
              <span>Over 94% approval rate for high-value treatments</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
