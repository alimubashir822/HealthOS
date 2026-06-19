'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Specialty } from '@/lib/types';
import { SPECIALTY_CONFIGS, DemoStateManager } from '@/lib/mockData';
import { 
  Calendar, 
  User, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Sparkles, 
  AlertCircle,
  Loader2,
  Bookmark
} from 'lucide-react';
import Link from 'next/link';

function BookContent() {
  const searchParams = useSearchParams();
  const [specialty, setSpecialty] = useState<Specialty>('IVF');

  useEffect(() => {
    const spec = searchParams.get('specialty') as Specialty;
    if (spec && ['IVF', 'DERMATOLOGY', 'DENTAL_IMPLANT', 'EYE_CARE'].includes(spec)) {
      setSpecialty(spec);
    }
  }, [searchParams]);

  const config = SPECIALTY_CONFIGS[specialty];

  // Booking Form State
  const [selectedTreatment, setSelectedTreatment] = useState(config.treatments[0]?.name || '');
  const [selectedDoctor, setSelectedDoctor] = useState(config.doctors[0]?.name || '');
  const [selectedLocation, setSelectedLocation] = useState('New York Clinic');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Sync state if specialty changes
  useEffect(() => {
    setSelectedTreatment(config.treatments[0]?.name || '');
    setSelectedDoctor(config.doctors[0]?.name || '');
  }, [specialty]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !bookingTime || !patientName || !patientEmail || !patientPhone) return;

    setIsSubmitting(true);

    // Simulate database insertion and triggering of automation alerts
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingSuccess(true);

      // Save a simulated Lead of status "CONVERTED"
      const newBookingLead = {
        id: `lead-book-${Date.now()}`,
        name: patientName,
        email: patientEmail,
        phone: patientPhone,
        specialty,
        status: 'CONVERTED',
        score: 'HIGH',
        scoreReason: 'Manually booked consultation through scheduler.',
        answers: JSON.stringify([
          { question: 'What treatment are you interested in?', answer: selectedTreatment },
          { question: 'Booked Doctor', answer: selectedDoctor },
          { question: 'Clinic Location', answer: selectedLocation },
          { question: 'Date & Time', answer: `${bookingDate} at ${bookingTime}` }
        ]),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      DemoStateManager.saveLead(newBookingLead);
      
      // Update automation logs
      DemoStateManager.addAutomationLog(
        `Consultation booked for ${patientName} with ${selectedDoctor} on ${bookingDate} at ${bookingTime}.`,
        'Book Lead Consultation'
      );
      DemoStateManager.addAutomationLog(
        `Sent email confirmation and pre-visit prep documents to ${patientEmail}.`,
        'Send Confirmed Email'
      );
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1 rounded-full bg-teal-100/60 dark:bg-teal-950/40 text-teal-700 px-2.5 py-0.5 text-[10px] font-bold">
          <Calendar className="w-3.5 h-3.5" />
          <span>Care Scheduler</span>
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Schedule Consultation
        </h2>
        <p className="text-xs text-slate-500">
          Book your diagnostic assessment and treatment planning session instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Booking Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
          {!bookingSuccess ? (
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5" />
                <span>1. Select Care Options</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Treatment Plan</label>
                  <select
                    value={selectedTreatment}
                    onChange={(e) => setSelectedTreatment(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs focus:outline-none focus:border-teal-500 text-slate-800 dark:text-slate-200"
                  >
                    {config.treatments.map((tr) => (
                      <option key={tr.name} value={tr.name}>{tr.name} (${tr.cost.toLocaleString()})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Specialist Clinician</label>
                  <select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs focus:outline-none focus:border-teal-500 text-slate-800 dark:text-slate-200"
                  >
                    {config.doctors.map((doc) => (
                      <option key={doc.name} value={doc.name}>{doc.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Clinic Location</label>
                <div className="grid grid-cols-3 gap-2">
                  {['New York Clinic', 'Miami Clinic', 'Dallas Clinic'].map((loc) => {
                    const isSelected = selectedLocation === loc;
                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => setSelectedLocation(loc)}
                        className={`rounded-xl border py-2 px-1 text-center text-[10px] font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'border-teal-500 bg-teal-50/40 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400 ring-1 ring-teal-500'
                            : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5 mx-auto mb-1 text-slate-400" />
                        <span>{loc.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider pt-2 mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>2. Schedule Schedule</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Date</label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs focus:outline-none focus:border-teal-500 text-slate-800 dark:text-slate-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Time Slot</label>
                  <input
                    type="time"
                    required
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs focus:outline-none focus:border-teal-500 text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>

              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider pt-2 mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>3. Patient Information</span>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs focus:outline-none focus:border-teal-500 text-slate-800 dark:text-slate-200"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs focus:outline-none focus:border-teal-500 text-slate-800 dark:text-slate-200"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs focus:outline-none focus:border-teal-500 text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-teal-500 py-3 text-center text-xs font-bold text-white shadow-md hover:bg-teal-600 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Booking Appointment...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Confirm Consultation Appointment</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-10 space-y-4">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                  Appointment Confirmed!
                </h3>
                <p className="text-xs text-slate-500">
                  Thank you, {patientName}. Your session has been added to our scheduling queues.
                </p>
              </div>
              
              <div className="rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/50 p-4 max-w-sm mx-auto space-y-2 text-xs text-left">
                <div className="flex justify-between">
                  <span className="text-slate-500">Practitioner:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedDoctor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Specialty:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{config.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Clinic Site:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date & Time:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{bookingDate} at {bookingTime}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <Link
                  href={`/patient/dashboard?specialty=${specialty}`}
                  className="rounded-xl bg-teal-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-teal-600 cursor-pointer"
                >
                  Go to Patient Dashboard
                </Link>
                <button
                  onClick={() => setBookingSuccess(false)}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Book Another
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Trust & Direct AI support info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-850 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-500" />
              <span>What Happens Next?</span>
            </h3>
            
            <ul className="space-y-4 text-xs">
              <li className="flex gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-950/40 text-[10px] font-bold text-teal-600 shrink-0">1</span>
                <div>
                  <h5 className="font-bold text-slate-800 dark:text-slate-200">Confirmation Alert</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">An email detailing your consultation preparation checklist and clinical forms has been sent.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-950/40 text-[10px] font-bold text-teal-600 shrink-0">2</span>
                <div>
                  <h5 className="font-bold text-slate-800 dark:text-slate-200">AI Care Onboarding</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">Use your Patient Portal to chat with the AI Care Assistant, uploading files or checking pre-visit instructions.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-950/40 text-[10px] font-bold text-teal-600 shrink-0">3</span>
                <div>
                  <h5 className="font-bold text-slate-800 dark:text-slate-200">Diagnostic Visit</h5>
                  <p className="text-[11px] text-slate-500 mt-0.5">Meet Dr. {config.doctors[0]?.name.split(' ').slice(-1)[0]} for your 3D CBCT scans/ovarian maps and finalize your roadmap.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center bg-slate-50 py-20">
        <div className="text-center space-y-2">
          <Loader2 className="w-8 h-8 text-teal-500 animate-spin mx-auto" />
          <span className="text-xs font-bold text-slate-400">Loading Scheduler...</span>
        </div>
      </div>
    }>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <BookContent />
        <Footer />
      </div>
    </Suspense>
  );
}
