'use client';

import React, { useState } from 'react';
import { Settings, CreditCard, Mail, MessageSquare, Database, RefreshCw, CheckCircle } from 'lucide-react';
import { DemoStateManager } from '@/lib/mockData';

export default function IntegrationSettings() {
  const [stripeConnected, setStripeConnected] = useState(true);
  const [twilioConnected, setTwilioConnected] = useState(true);
  const [ehrConnected, setEhrConnected] = useState(false);

  const toggleConnection = (service: 'stripe' | 'twilio' | 'ehr') => {
    let state = false;
    let name = '';

    if (service === 'stripe') {
      state = !stripeConnected;
      setStripeConnected(state);
      name = 'Stripe Payments';
    } else if (service === 'twilio') {
      state = !twilioConnected;
      setTwilioConnected(state);
      name = 'Twilio SMS/WhatsApp';
    } else {
      state = !ehrConnected;
      setEhrConnected(state);
      name = 'Centralized EHR Export API';
    }

    DemoStateManager.addAutomationLog(
      `Integration "${name}" connection status toggled to: ${state ? 'CONNECTED' : 'DISCONNECTED'}.`,
      'Integration Manager'
    );
  };

  return (
    <div className="w-full rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
      <div>
        <h4 className="font-extrabold text-sm text-slate-850 dark:text-slate-200 flex items-center gap-2">
          <Settings className="w-5 h-5 text-teal-500" />
          <span>Integration Operations Layer</span>
        </h4>
        <p className="text-[10px] text-slate-400 mt-0.5">
          Map payment gateways, messaging APIs, and clinical database exports.
        </p>
      </div>

      <div className="h-px bg-slate-100 dark:bg-slate-800" />

      <div className="grid grid-cols-1 gap-2.5 pt-1">
        
        {/* Stripe */}
        <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-3.5 bg-slate-50/40 dark:bg-slate-950/20 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-teal-500/10 text-teal-650 flex items-center justify-center shrink-0">
              <CreditCard className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="font-bold text-slate-800 dark:text-slate-200">Stripe Integration</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Processes financing installments and copays.</div>
            </div>
          </div>
          <button
            onClick={() => toggleConnection('stripe')}
            className={`rounded-xl px-2.5 py-1 text-[9px] font-bold cursor-pointer ${
              stripeConnected 
                ? 'bg-emerald-50 text-emerald-600' 
                : 'bg-slate-200 text-slate-400'
            }`}
          >
            {stripeConnected ? 'CONNECTED' : 'DISCONNECT'}
          </button>
        </div>

        {/* Twilio */}
        <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-3.5 bg-slate-50/40 dark:bg-slate-950/20 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-teal-500/10 text-teal-650 flex items-center justify-center shrink-0">
              <MessageSquare className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="font-bold text-slate-800 dark:text-slate-200">Twilio Gateways</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Automates patient reminders via SMS/WhatsApp.</div>
            </div>
          </div>
          <button
            onClick={() => toggleConnection('twilio')}
            className={`rounded-xl px-2.5 py-1 text-[9px] font-bold cursor-pointer ${
              twilioConnected 
                ? 'bg-emerald-50 text-emerald-600' 
                : 'bg-slate-200 text-slate-400'
            }`}
          >
            {twilioConnected ? 'CONNECTED' : 'DISCONNECT'}
          </button>
        </div>

        {/* EHR Export */}
        <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-3.5 bg-slate-50/40 dark:bg-slate-950/20 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-teal-500/10 text-teal-650 flex items-center justify-center shrink-0">
              <Database className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="font-bold text-slate-800 dark:text-slate-200">EHR Export API</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Exports clinical documents to Epic Systems / Cerner.</div>
            </div>
          </div>
          <button
            onClick={() => toggleConnection('ehr')}
            className={`rounded-xl px-2.5 py-1 text-[9px] font-bold cursor-pointer ${
              ehrConnected 
                ? 'bg-emerald-50 text-emerald-600' 
                : 'bg-slate-205 text-slate-450 hover:bg-slate-300'
            }`}
          >
            {ehrConnected ? 'CONNECTED' : 'CONNECT'}
          </button>
        </div>

      </div>

    </div>
  );
}
