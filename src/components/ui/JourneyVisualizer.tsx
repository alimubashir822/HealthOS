'use client';

import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface Stage {
  name: string;
  description: string;
}

interface JourneyVisualizerProps {
  stages: Stage[];
  currentStageName: string;
}

export default function JourneyVisualizer({ stages, currentStageName }: JourneyVisualizerProps) {
  // Find current stage index
  const activeIndex = stages.findIndex(s => s.name.toLowerCase() === currentStageName.toLowerCase());
  const currentIndex = activeIndex === -1 ? 0 : activeIndex;

  // Calculate percentage progress
  const progressPercent = Math.round(((currentIndex + 1) / stages.length) * 100);

  return (
    <div className="w-full space-y-6">
      
      {/* Percentage Tracker Header */}
      <div className="flex justify-between items-center bg-teal-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-4">
        <div>
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
            Overall Treatment Progress
          </span>
          <span className="text-xl font-bold text-slate-800 dark:text-slate-200">
            {currentStageName}
          </span>
        </div>
        <div className="text-right shrink-0">
          <span className="text-2xl font-black text-teal-500">{progressPercent}%</span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-semibold">Completed</span>
        </div>
      </div>

      {/* Progress Bar (Interactive look) */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden relative shadow-inner">
        <div 
          className="bg-teal-500 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(20,184,166,0.5)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Horizontal Steps (Desktop) */}
      <div className="hidden lg:grid grid-cols-6 gap-4 relative pt-2">
        {stages.map((stage, index) => {
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;
          const isPending = index > currentIndex;

          return (
            <div key={stage.name} className="flex flex-col items-center text-center space-y-2 relative">
              
              {/* Connector Line */}
              {index < stages.length - 1 && (
                <div 
                  className={`absolute top-4 left-[calc(50%+16px)] right-[calc(-50%+16px)] h-0.5 z-0 transition-colors duration-500 ${
                    index < currentIndex ? 'bg-teal-500' : 'bg-slate-200 dark:bg-slate-800'
                  }`}
                />
              )}

              {/* Status Icon */}
              <div className="relative z-10">
                {isCompleted ? (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-white shadow-md shadow-teal-500/20">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                ) : isActive ? (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-slate-900 border-2 border-teal-500 text-teal-500 shadow-lg pulse-glow">
                    <div className="h-2 w-2 rounded-full bg-teal-500" />
                  </div>
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-300">
                    <Circle className="w-3.5 h-3.5 fill-current opacity-20" />
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <div className="space-y-0.5">
                <div className={`text-xs font-bold ${isActive ? 'text-teal-600 dark:text-teal-400' : isCompleted ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'}`}>
                  {stage.name}
                </div>
                <p className="text-[10px] text-slate-400 leading-normal line-clamp-2 px-1">
                  {stage.description}
                </p>
              </div>

            </div>
          );
        })}
      </div>

      {/* Vertical Steps (Mobile & Tablet) */}
      <div className="lg:hidden space-y-4 relative pl-4 before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
        {stages.map((stage, index) => {
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;

          return (
            <div key={stage.name} className="flex gap-4 relative">
              {/* Connector line overlay for completed path */}
              {isCompleted && (
                <div className="absolute left-[1px] top-4 bottom-[-16px] w-0.5 bg-teal-500 z-0" />
              )}

              {/* Status Circle */}
              <div className="relative z-10 shrink-0">
                {isCompleted ? (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-white shadow-md">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                ) : isActive ? (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-slate-900 border-2 border-teal-500 text-teal-500 shadow-md pulse-glow">
                    <div className="h-2 w-2 rounded-full bg-teal-500" />
                  </div>
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-300">
                    <Circle className="w-3.5 h-3.5 fill-current opacity-20" />
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="py-0.5">
                <h4 className={`text-xs font-bold ${isActive ? 'text-teal-600 dark:text-teal-400' : isCompleted ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'}`}>
                  {stage.name}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {stage.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
