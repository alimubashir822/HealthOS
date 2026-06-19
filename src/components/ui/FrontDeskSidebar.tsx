'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  MessageSquare, 
  X, 
  Send, 
  Calendar, 
  MapPin, 
  Loader2, 
  HelpCircle, 
  UserCheck,
  CheckCircle,
  PhoneCall
} from 'lucide-react';
import { Specialty } from '@/lib/types';
import { SPECIALTY_CONFIGS, DemoStateManager } from '@/lib/mockData';
import Link from 'next/link';

interface FrontDeskSidebarProps {
  specialty: Specialty;
}

export default function FrontDeskSidebar({ specialty }: FrontDeskSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    {
      id: 'init-1',
      sender: 'ai',
      content: `Hello! I am your AI Front Desk Coordinator. Need help booking a consultation, finding our locations, or checking pricing? Just let me know.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // AI Front Desk responses
    setTimeout(() => {
      let response = '';
      const lowercase = text.toLowerCase();

      if (lowercase.includes('book') || lowercase.includes('appointment') || lowercase.includes('schedule') || lowercase.includes('consultation')) {
        response = `I can definitely help you schedule a consultation! You can book an appointment slot instantly by visiting our online scheduler: \n\n👉 [Book Consultation](/book?specialty=${specialty})\n\nWould you like me to tell you about our clinic locations or hours?`;
      } 
      else if (lowercase.includes('location') || lowercase.includes('where') || lowercase.includes('address') || lowercase.includes('directions')) {
        response = `We have three convenient clinical locations:
📍 New York Clinic: 120 Park Ave, New York, NY
📍 Miami Clinic: 300 Brickell Ave, Miami, FL
📍 Dallas Clinic: 2100 Ross Ave, Dallas, TX

All locations are open Mon-Fri, 8:00 AM to 6:00 PM.`;
      } 
      else if (lowercase.includes('qualify') || lowercase.includes('eligibility') || lowercase.includes('qualification')) {
        response = `We have an AI Qualifier tool on our homepage that checks your treatment candidacy in under 2 minutes! \n\nScroll up to the top of our page and click 'Begin AI Assessment' in the assessment widget to get started.`;
      } 
      else if (lowercase.includes('price') || lowercase.includes('cost') || lowercase.includes('payment') || lowercase.includes('installment')) {
        response = `We believe in transparent pricing. For detailed package costs and zero-interest monthly installment calculators, please visit our calculator page: \n\n👉 [Financing Calculator](/calculator?specialty=${specialty})`;
      } 
      else {
        const specName = SPECIALTY_CONFIGS[specialty].name;
        response = `I'm happy to help. For specific clinical questions regarding ${specName} or details about doctor availability, it's best to schedule an initial consult. \n\nYou can call our patient line at +1 (800) 555-CARE, or book an appointment online: [Book Now](/book?specialty=${specialty}).`;
      }

      setMessages(prev => [...prev, {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        content: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-teal-500 text-white shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer hover:bg-teal-600 pulse-glow"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {/* Expanded Sidebar Drawer */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight">AI Front Desk</h4>
                <p className="text-[10px] text-teal-100 font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span>24/7 Coordinator Employee</span>
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 hover:bg-white/10 text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Info Bar */}
          <div className="bg-slate-50 dark:bg-slate-950 px-4 py-2 border-b border-slate-200/50 dark:border-slate-800 flex justify-between text-[10px] font-semibold text-slate-400">
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />3 Locations (NY, MI, TX)</span>
            <span className="flex items-center gap-1"><PhoneCall className="w-3.5 h-3.5" />(800) 555-CARE</span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`h-6 w-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0 ${
                  msg.sender === 'ai' ? 'bg-teal-500' : 'bg-pink-500'
                }`}>
                  {msg.sender === 'ai' ? 'AI' : 'U'}
                </div>

                <div className={`rounded-2xl px-3.5 py-2 text-xs leading-relaxed max-w-[80%] ${
                  msg.sender === 'user'
                    ? 'bg-teal-500 text-white rounded-tr-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-350 rounded-tl-none'
                }`}>
                  {/* Handle newlines / markdown links */}
                  {msg.content.split('\n').map((para: string, idx: number) => {
                    if (para.includes('[Book Consultation]')) {
                      return (
                        <p key={idx} className="mt-1">
                          <Link href={`/book?specialty=${specialty}`} onClick={() => setIsOpen(false)} className="text-teal-500 font-bold hover:underline">
                            👉 Click Here to Schedule Consultation
                          </Link>
                        </p>
                      );
                    }
                    if (para.includes('[Financing Calculator]')) {
                      return (
                        <p key={idx} className="mt-1">
                          <Link href={`/calculator?specialty=${specialty}`} onClick={() => setIsOpen(false)} className="text-teal-500 font-bold hover:underline">
                            👉 Open Installment Calculator
                          </Link>
                        </p>
                      );
                    }
                    return <p key={idx} className={idx > 0 ? 'mt-1.5' : ''}>{para}</p>;
                  })}
                  <span className="text-[8px] text-slate-400 block text-right mt-1.5">{msg.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-2.5">
                <div className="h-6 w-6 rounded-full bg-teal-500 flex items-center justify-center text-white text-[9px] font-bold">
                  AI
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-none px-4 py-2.5">
                  <Loader2 className="w-4 h-4 text-teal-500 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800/50 space-y-1.5">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
              Quick Questions
            </span>
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => handleSendMessage('How do I book a consultation?')}
                className="rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2 py-0.5 text-[10px] text-slate-600 dark:text-slate-400 hover:border-teal-500 hover:text-teal-600 cursor-pointer font-medium"
              >
                Book Appointment
              </button>
              <button
                onClick={() => handleSendMessage('Where are your clinics located?')}
                className="rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2 py-0.5 text-[10px] text-slate-600 dark:text-slate-400 hover:border-teal-500 hover:text-teal-600 cursor-pointer font-medium"
              >
                Clinic Locations
              </button>
              <button
                onClick={() => handleSendMessage('What financing rates are offered?')}
                className="rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2 py-0.5 text-[10px] text-slate-600 dark:text-slate-400 hover:border-teal-500 hover:text-teal-600 cursor-pointer font-medium"
              >
                Financing/APR Rates
              </button>
            </div>
          </div>

          {/* Message Input */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex gap-2">
            <input
              type="text"
              placeholder="Ask anything about scheduling/costs..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3.5 py-2 text-xs focus:outline-none focus:border-teal-500 text-slate-800 dark:text-slate-200"
            />
            <button
              onClick={() => handleSendMessage(inputValue)}
              className="rounded-xl bg-teal-500 p-2 text-white hover:bg-teal-600 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
