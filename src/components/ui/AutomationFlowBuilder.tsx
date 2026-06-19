'use client';

import React, { useState } from 'react';
import { Cpu, Play, Settings, Plus, Sparkles, CheckCircle2, Server, Trash } from 'lucide-react';
import { DemoStateManager } from '@/lib/mockData';

interface Node {
  id: string;
  label: string;
  type: 'trigger' | 'action';
  details: string;
  active: boolean;
}

export default function AutomationFlowBuilder() {
  const [nodes, setNodes] = useState<Node[]>([
    { id: '1', label: 'New Patient Registered', type: 'trigger', details: 'Triggers on patient login onboarding completion', active: true },
    { id: '2', label: 'Assign Primary Doctor', type: 'action', details: 'Auto-maps doctor based on caseload balance', active: true },
    { id: '3', label: 'Generate Conversion Package', type: 'action', details: 'Simulates AI treatment plan draft guides', active: true },
    { id: '4', label: 'Send SMS Welcome Package', type: 'action', details: 'Auto-SMS to patient via Twilio integrations', active: false }
  ]);

  const toggleNodeActive = (id: string) => {
    const updated = nodes.map(n => 
      n.id === id ? { ...n, active: !n.active } : n
    );
    setNodes(updated);

    const node = nodes.find(n => n.id === id);
    if (node) {
      DemoStateManager.addAutomationLog(
        `Admin toggled workflow node "${node.label}" state to: ${!node.active ? 'ENABLED' : 'DISABLED'}.`,
        'Workflow Builder'
      );
    }
  };

  const triggerTestRun = () => {
    DemoStateManager.addAutomationLog(
      `Executing workflow dry-run for: "New Patient Registered". Active nodes traversed: ${nodes.filter(n => n.active).map(n => n.label).join(' ➔ ')}.`,
      'Workflow Dry Run'
    );
    alert('Dry-run completed successfully! Check the Automation logs timeline below to see the results.');
  };

  return (
    <div className="w-full rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-extrabold text-sm text-slate-850 dark:text-slate-200 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-teal-500" />
            <span>n8n Clinical Automation Builder</span>
          </h4>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Configure automated pathways for acquisition, document alerts, and retention logs.
          </p>
        </div>
        
        <button
          onClick={triggerTestRun}
          className="rounded-xl bg-teal-500 py-1.5 px-3 text-[10px] font-bold text-white shadow-md hover:bg-teal-650 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 shrink-0" />
          <span>Dry Run</span>
        </button>
      </div>

      <div className="h-px bg-slate-100 dark:bg-slate-800" />

      {/* Visual flowchart graph node grid */}
      <div className="space-y-4 pt-1">
        {nodes.map((node, index) => (
          <div key={node.id} className="relative">
            {/* Connection Arrow line */}
            {index < nodes.length - 1 && (
              <div className="absolute left-[24px] top-12 bottom-[-16px] w-0.5 bg-slate-200 dark:bg-slate-800 z-0">
                <div className="absolute bottom-1 left-[-2.5px] border-t-4 border-t-slate-300 dark:border-t-slate-700 border-x-4 border-x-transparent" />
              </div>
            )}

            {/* Node Card */}
            <div className={`relative z-10 flex items-start justify-between gap-4 rounded-2xl border p-4 bg-slate-50/40 dark:bg-slate-950/20 transition-all ${
              node.active 
                ? 'border-teal-500/20 ring-1 ring-teal-500/10' 
                : 'border-slate-100 dark:border-slate-800/80 opacity-60'
            }`}>
              <div className="flex items-start gap-3">
                {/* Node type icon */}
                <div className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${
                  node.type === 'trigger'
                    ? 'bg-amber-100 text-amber-600 dark:bg-amber-950/50'
                    : 'bg-blue-100 text-blue-600 dark:bg-blue-950/50'
                }`}>
                  {node.type === 'trigger' ? <Server className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-slate-800 dark:text-slate-250">
                      {node.label}
                    </span>
                    <span className={`text-[8px] uppercase px-1.5 py-0.2 rounded font-extrabold tracking-wider ${
                      node.type === 'trigger' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {node.type}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    {node.details}
                  </p>
                </div>
              </div>

              {/* Toggle rule state */}
              <button
                onClick={() => toggleNodeActive(node.id)}
                className={`rounded-xl px-2.5 py-1 text-[9px] font-bold cursor-pointer transition-colors ${
                  node.active
                    ? 'bg-teal-500/10 text-teal-600 hover:bg-teal-500/20'
                    : 'bg-slate-200 text-slate-400 hover:bg-slate-300'
                }`}
              >
                {node.active ? 'ACTIVE' : 'MUTED'}
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
