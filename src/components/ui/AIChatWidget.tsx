'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldAlert, 
  HelpCircle, 
  Plus, 
  Loader2, 
  CheckCircle,
  Clock
} from 'lucide-react';
import { Specialty } from '@/lib/types';
import { SPECIALTY_CONFIGS } from '@/lib/mockData';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: string;
}

interface AIChatWidgetProps {
  specialty: Specialty;
  patientName?: string;
  isPortalView?: boolean;
}

export default function AIChatWidget({ specialty, patientName = 'Guest', isPortalView = false }: AIChatWidgetProps) {
  const config = SPECIALTY_CONFIGS[specialty];
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'ai',
      content: `Hello ${patientName}! I am your AI Care Assistant for ${config.name}. I can help explain our treatments, preparation guidelines, and recovery protocols. What can I answer for you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Preset query suggestions
  const getPresetQueries = (spec: Specialty) => {
    switch (spec) {
      case 'IVF':
        return [
          'What happens during egg retrieval?',
          'What are the pre-treatment stim instructions?',
          'List typical questions to ask my doctor.'
        ];
      case 'DERMATOLOGY':
        return [
          'How do I prepare for laser resurfacing?',
          'What is the Morpheus8 RF aftercare?',
          'List typical questions to ask my dermatologist.'
        ];
      case 'DENTAL_IMPLANT':
        return [
          'What is the recovery time for an implant?',
          'What should I eat after surgical post placement?',
          'List typical questions to ask my prosthodontist.'
        ];
      case 'EYE_CARE':
        return [
          'How do I prepare for Contoura LASIK?',
          'What eye drop schedule is needed after surgery?',
          'List typical questions to ask my ophthalmologist.'
        ];
    }
  };

  const presets = getPresetQueries(specialty);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response based on specialty matching keywords
    setTimeout(() => {
      let replyContent = '';
      const lowercaseText = text.toLowerCase();

      // Check keywords
      if (lowercaseText.includes('retrieval') || lowercaseText.includes('procedure') || lowercaseText.includes('happen')) {
        if (specialty === 'IVF') {
          replyContent = `During Egg Retrieval, you will receive light sedation. Dr. Ahmed uses ultrasound guidance to aspirate fluid from mature follicles to collect eggs. It takes about 20-30 minutes. You will need a partner to drive you home.`;
        } else if (specialty === 'DENTAL_IMPLANT') {
          replyContent = `The implant post placement is performed under local anesthesia or sedation. Dr. Vance places the titanium post into the jaw bone. You'll feel pressure but no pain. The procedure takes about 45-60 minutes.`;
        } else {
          replyContent = `The procedure is performed in-clinic by our specialists. It is highly controlled and structured to minimize downtime. Most treatments take between 15 to 45 minutes.`;
        }
      } 
      else if (lowercaseText.includes('prepare') || lowercaseText.includes('preparation') || lowercaseText.includes('instructions')) {
        if (specialty === 'IVF') {
          replyContent = `Pre-stimulation preparation:
1. Administer medications at the exact times specified.
2. Avoid strenuous high-impact exercise (switch to walking).
3. Stay well hydrated, consuming electrolytes daily.
4. Report any immediate abdominal pain.`;
        } else if (specialty === 'DERMATOLOGY') {
          replyContent = `Laser/Resurfacing preparation:
1. Avoid direct sun exposure for 2 weeks prior.
2. Discontinue use of retinoids/acids 5 days prior.
3. Arrive with clean, makeup-free skin.
4. Notify us if you have any history of cold sores.`;
        } else if (specialty === 'EYE_CARE') {
          replyContent = `LASIK preparation:
1. Discontinue contact lenses (soft lenses 7 days, hard lenses 3 weeks prior).
2. Avoid applying perfumes, lotions, or face creams on surgery day.
3. Bring UV-blocking sunglasses for the ride home.`;
        } else {
          replyContent = `Preparation guidelines: Avoid direct heat, stop blood-thinning supplements under medical guidance, and arrive hydrated and well-rested.`;
        }
      } 
      else if (lowercaseText.includes('aftercare') || lowercaseText.includes('recovery') || lowercaseText.includes('care') || lowercaseText.includes('eat')) {
        if (specialty === 'DENTAL_IMPLANT') {
          replyContent = `Implant post-op aftercare:
1. Diet: Stick to cold soft foods (yogurt, smoothies, broth) for 48 hours.
2. Bleeding: Bite on gauze for 1 hour. Avoid spitting or drinking through straws.
3. Hygiene: Do not brush the surgical site for 3 days; use the prescribed warm salt water rinse.
4. Pain: Take ibuprofen as scheduled to manage swelling.`;
        } else if (specialty === 'DERMATOLOGY') {
          replyContent = `Morpheus8 RF aftercare:
1. Keep the skin hydrated using the provided healing ointment for 48 hours.
2. Do not apply makeup or sunblock for 24 hours.
3. Avoid active workouts, hot tubs, or heavy sweating for 3 days.
4. Always wear mineral sunscreen (SPF 30+) once skin closes.`;
        } else if (specialty === 'EYE_CARE') {
          replyContent = `LASIK recovery rules:
1. Rest with protective eye shields for 4-6 hours post-op.
2. Use the prescribed antibiotic and lubricating drops as scheduled.
3. Do not rub your eyes under any circumstances for the first 2 weeks.
4. Avoid swimming pools or eye makeup for 1 week.`;
        } else {
          replyContent = `Recovery care guidelines include: Rest, avoiding strenuous activities, using prescribed topical/oral medication as scheduled, and keeping the treatment site clean.`;
        }
      } 
      else if (lowercaseText.includes('question') || lowercaseText.includes('doctor') || lowercaseText.includes('ask')) {
        replyContent = `Here are important questions to prepare for your consultation:
1. "Am I a suitable candidate for this specific treatment path?"
2. "What are the exact clinical success rates for someone with my profile?"
3. "Are there alternative treatment stages or financing installments available?"
4. "What is the expected recovery time before I see full results?"`;
      } 
      else {
        // Fallback matching configuration details
        const matchingFaq = config.faqs.find(f => lowercaseText.includes(f.q.toLowerCase().split(' ').slice(0, 3).join(' ')));
        if (matchingFaq) {
          replyContent = matchingFaq.a;
        } else {
          replyContent = `That is a great question. In ${config.name}, we follow a structured 6-stage journey to ensure safety. For specific inquiries regarding medication, dosages, or custom diagnostics, please consult Dr. Ahmed or Dr. Vance directly. Can I help explain our treatment stages or preparation steps?`;
        }
      }

      // Append medical disclaimer
      replyContent += `\n\n*⚠️ Care Assistant Disclaimer: I am an AI assistant designed to explain processes and prepare you for consultations. I do not provide medical diagnoses or modify prescriptions. Please verify clinical steps with our doctors.*`;

      const aiMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg overflow-hidden">
      
      {/* Advisor Meta */}
      <div className="bg-slate-50 dark:bg-slate-900/80 px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-teal-500/10 text-teal-600 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-xs text-slate-800 dark:text-slate-200 block leading-none">
              Care Journey Assistant
            </span>
            <span className="text-[9px] text-emerald-500 font-semibold flex items-center gap-1 mt-0.5">
              <Clock className="w-2.5 h-2.5" />
              Online (Specialized Care)
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
          <Sparkles className="w-3 h-3 text-teal-500" />
          <span>Active Track: {config.name}</span>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[220px]">
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 text-white text-[10px] font-bold ${
              msg.sender === 'ai' ? 'bg-teal-500' : 'bg-pink-500'
            }`}>
              {msg.sender === 'ai' ? 'AI' : patientName.charAt(0)}
            </div>

            {/* Bubble */}
            <div className={`rounded-2xl px-3.5 py-2 text-xs leading-relaxed max-w-[85%] ${
              msg.sender === 'user' 
                ? 'bg-teal-500 text-white rounded-tr-none'
                : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 rounded-tl-none border border-slate-100 dark:border-slate-800/40'
            }`}>
              {/* Format newlines */}
              {msg.content.split('\n').map((paragraph, index) => (
                <p key={index} className={index > 0 ? 'mt-1.5' : ''}>
                  {paragraph}
                </p>
              ))}
              <span className={`text-[8px] mt-1.5 block text-right font-medium ${
                msg.sender === 'user' ? 'text-teal-200' : 'text-slate-400'
              }`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-2.5">
            <div className="h-6 w-6 rounded-full bg-teal-500 flex items-center justify-center text-white text-[10px] font-bold">
              AI
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl rounded-tl-none px-4 py-3 border border-slate-100 dark:border-slate-800/40">
              <Loader2 className="w-4 h-4 text-teal-500 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Preset Suggestions */}
      {messages.length === 1 && (
        <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-900/30">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <HelpCircle className="w-3 h-3 text-slate-400" />
            Suggested Questions
          </div>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((pr) => (
              <button
                key={pr}
                onClick={() => handleSendMessage(pr)}
                className="rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2.5 py-1 text-[10px] text-slate-600 dark:text-slate-400 hover:border-teal-500 hover:text-teal-600 cursor-pointer font-medium"
              >
                {pr}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 flex gap-2">
        <input
          type="text"
          placeholder="Ask about preparation, recovery, or timeline..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
          className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-xs focus:outline-none focus:border-teal-500 text-slate-800 dark:text-slate-200"
        />
        <button
          onClick={() => handleSendMessage(inputValue)}
          className="rounded-xl bg-teal-500 p-2 text-white hover:bg-teal-600 hover:scale-105 active:scale-95 transition-all shadow-md shadow-teal-500/10 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
