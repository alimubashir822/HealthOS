'use client';

import React, { useState } from 'react';
import { FileText, Loader2, Search, CheckCircle, ShieldAlert, AlertTriangle, ArrowRight } from 'lucide-react';
import { MOCK_REPORT_EXTRACTION } from '@/lib/mockData';

export default function DocumentIntelligence() {
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);

  const handleScanFile = (filename: string) => {
    setSelectedFile(filename);
    setIsScanning(true);
    setResults(null);

    // Simulate clinical OCR / NLP report parsing
    setTimeout(() => {
      setIsScanning(false);
      setResults(MOCK_REPORT_EXTRACTION[filename] || {
        patientName: 'Sarah Miller',
        abnormalities: ['Unregistered report format'],
        highlights: 'Parsed file format complete. No parameters mapped.',
        extractedValues: []
      });
    }, 1800);
  };

  const resetScanner = () => {
    setSelectedFile('');
    setResults(null);
  };

  return (
    <div className="w-full rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
      <div>
        <h4 className="font-extrabold text-sm text-slate-850 dark:text-slate-200 flex items-center gap-2">
          <FileText className="w-5 h-5 text-teal-500" />
          <span>AI Clinical Document Intelligence</span>
        </h4>
        <p className="text-[10px] text-slate-400 mt-0.5">
          HIPAA-compliant document parsing. Extracts biomarkers and highlights abnormalities.
        </p>
      </div>

      <div className="h-px bg-slate-100 dark:bg-slate-800" />

      {/* Select Report to Scan */}
      {!selectedFile && (
        <div className="space-y-3">
          <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center space-y-2.5">
            <FileText className="w-10 h-10 text-slate-300 mx-auto" />
            <div className="text-xs font-semibold text-slate-650 dark:text-slate-400">
              Drag reports here or select pre-loaded templates to test OCR:
            </div>
            <div className="flex justify-center gap-2 flex-wrap">
              <button
                onClick={() => handleScanFile('Hormone Panel Lab Report.pdf')}
                className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-2.5 py-1 text-[10px] text-slate-600 dark:text-slate-450 hover:border-teal-500 hover:text-teal-600 cursor-pointer font-bold"
              >
                Hormone Panel Lab Report.pdf
              </button>
              <button
                onClick={() => handleScanFile('Baseline Ultrasound Imaging.png')}
                className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-2.5 py-1 text-[10px] text-slate-600 dark:text-slate-450 hover:border-teal-500 hover:text-teal-600 cursor-pointer font-bold"
              >
                Baseline Ultrasound Imaging.png
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scanner Loading State */}
      {isScanning && (
        <div className="py-8 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-teal-500 animate-spin mx-auto" />
          <div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-250 block">Parsing PDF & Extracting Key Biomarkers</span>
            <span className="text-[10px] text-slate-400 mt-1 block">OCR engines scan matching records...</span>
          </div>
        </div>
      )}

      {/* Scanning Outcomes */}
      {results && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex justify-between items-center text-xs pb-1.5 border-b border-slate-100 dark:border-slate-800">
            <span className="font-bold text-slate-500">Target Patient: {results.patientName}</span>
            <button 
              onClick={resetScanner}
              className="text-[10px] font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Scan Another File
            </button>
          </div>

          {/* Highlights */}
          <div className="rounded-xl bg-teal-500/5 dark:bg-slate-950 border border-teal-500/10 p-3 flex gap-2.5">
            <CheckCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider block">AI Summary Brief</span>
              <p className="text-xs text-slate-500 leading-normal">{results.highlights}</p>
            </div>
          </div>

          {/* Warnings / Abnormalities */}
          {results.abnormalities.length > 0 && (
            <div className="rounded-xl bg-red-500/5 dark:bg-slate-950 border border-red-500/10 p-3 flex gap-2.5">
              <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-red-650 uppercase tracking-wider block">Abnormalities Detected</span>
                <ul className="list-disc pl-4 space-y-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {results.abnormalities.map((abn: string, i: number) => (
                    <li key={i} className="font-semibold text-red-650">{abn}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Extracted Values Table */}
          {results.extractedValues.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Extracted Biomarkers Table</span>
              <div className="rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden bg-slate-50/40 dark:bg-slate-950/20">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase">
                    <tr>
                      <th className="px-3 py-1.5">Biomarker</th>
                      <th className="px-3 py-1.5 text-right">Value</th>
                      <th className="px-3 py-1.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.extractedValues.map((val: any, idx: number) => (
                      <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-white/50">
                        <td className="px-3 py-2 font-semibold text-slate-700">{val.key}</td>
                        <td className="px-3 py-2 text-right font-bold text-slate-800">{val.value}</td>
                        <td className="px-3 py-2 text-center">
                          <span className={`inline-flex items-center rounded-full px-1.5 py-0.2 text-[8px] font-bold ${
                            val.status === 'NORMAL' 
                              ? 'bg-emerald-50 text-emerald-600' 
                              : val.status === 'LOW' || val.status === 'HIGH' || val.status === 'WARNING'
                              ? 'bg-red-50 text-red-600'
                              : 'bg-slate-100 text-slate-500'
                          }`}>
                            {val.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
