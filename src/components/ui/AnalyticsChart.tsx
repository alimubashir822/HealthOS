'use client';

import React, { useState } from 'react';
import { Clock } from 'lucide-react';

interface ChartDataPoint {
  label: string;
  value: number;
}

interface AnalyticsChartProps {
  data: ChartDataPoint[];
  type: 'line' | 'bar';
  color?: string;
  prefix?: string;
}

export default function AnalyticsChart({ data, type, color = '#14b8a6', prefix = '' }: AnalyticsChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Compute boundaries
  const maxVal = Math.max(...data.map(d => d.value)) * 1.1 || 100;
  
  // Width & height parameters
  const width = 500;
  const height = 200;
  const paddingLeft = 40;
  const paddingRight = 10;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Grid coordinates helper
  const getCoordinates = (index: number, value: number) => {
    const x = paddingLeft + (index / (data.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - (value / maxVal) * chartHeight;
    return { x, y };
  };

  // Line coordinates path builder
  const points = data.map((d, idx) => getCoordinates(idx, d.value));
  const pathD = points.reduce((acc, p, idx) => {
    if (idx === 0) return `M ${p.x} ${p.y}`;
    return `${acc} L ${p.x} ${p.y}`;
  }, '');

  // Closed area coordinates path builder
  const areaD = pathD ? `${pathD} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z` : '';

  return (
    <div className="relative w-full rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4">
      {/* SVG Canvas */}
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
        
        {/* Y Axis Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const val = maxVal * ratio;
          const y = paddingTop + chartHeight * (1 - ratio);
          return (
            <g key={ratio} className="opacity-15">
              <line 
                x1={paddingLeft} 
                y1={y} 
                x2={width - paddingRight} 
                y2={y} 
                stroke="currentColor" 
                strokeWidth={1}
                strokeDasharray="4"
              />
              <text 
                x={paddingLeft - 8} 
                y={y + 3} 
                textAnchor="end" 
                fontSize={8} 
                fontWeight="bold"
                className="fill-slate-400 font-sans"
              >
                {prefix}{Math.round(val).toLocaleString()}
              </text>
            </g>
          );
        })}

        {/* X Axis Labels */}
        {data.map((d, idx) => {
          const x = paddingLeft + (idx / (data.length - 1)) * chartWidth;
          return (
            <text
              key={idx}
              x={x}
              y={height - 10}
              textAnchor="middle"
              fontSize={8}
              fontWeight="bold"
              className="fill-slate-400 font-sans opacity-80"
            >
              {d.label}
            </text>
          );
        })}

        {/* LINE CHART GRAPHICS */}
        {type === 'line' && pathD && (
          <>
            {/* Shaded Area */}
            <path 
              d={areaD} 
              fill={`url(#area-gradient)`}
              className="transition-all duration-300"
            />
            {/* Colored Line */}
            <path 
              d={pathD} 
              fill="none" 
              stroke={color} 
              strokeWidth={2.5}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
            {/* Linear Gradient definition */}
            <defs>
              <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0.25"/>
                <stop offset="100%" stopColor={color} stopOpacity="0.0"/>
              </linearGradient>
            </defs>

            {/* Hover checkpoints dots */}
            {points.map((p, idx) => (
              <g 
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer"
              >
                <circle 
                  cx={p.x} 
                  cy={p.y} 
                  r={hoveredIdx === idx ? 6 : 4} 
                  fill={color} 
                  stroke="#fff" 
                  strokeWidth={2}
                  className="transition-all"
                />
                <circle 
                  cx={p.x} 
                  cy={p.y} 
                  r={12} 
                  fill="transparent" 
                />
              </g>
            ))}
          </>
        )}

        {/* BAR CHART GRAPHICS */}
        {type === 'bar' && data.map((d, idx) => {
          const barSpacing = chartWidth / data.length;
          const x = paddingLeft + idx * barSpacing + barSpacing * 0.15;
          const barWidth = barSpacing * 0.7;
          const y = paddingTop + chartHeight - (d.value / maxVal) * chartHeight;
          const barHeight = chartHeight - (d.value / maxVal) * chartHeight;

          return (
            <g 
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="cursor-pointer transition-opacity hover:opacity-90"
            >
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={chartHeight - (y - paddingTop)}
                rx={4}
                fill={color}
                opacity={hoveredIdx === idx ? 0.9 : 0.7}
              />
            </g>
          );
        })}

      </svg>

      {/* Floating Tooltip Box */}
      {hoveredIdx !== null && data[hoveredIdx] && (
        <div className="absolute top-2 right-4 rounded-lg bg-slate-950 px-2.5 py-1 text-[10px] font-bold text-white shadow-md flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-100">
          <Clock className="w-3.5 h-3.5 text-teal-400" />
          <span>{data[hoveredIdx].label}:</span>
          <span className="text-teal-400">{prefix}{data[hoveredIdx].value.toLocaleString()}</span>
        </div>
      )}
    </div>
  );
}
