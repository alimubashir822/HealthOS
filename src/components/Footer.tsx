import React from 'react';
import Link from 'next/link';
import { Activity, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Tagline */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500 text-white">
                <Activity className="w-4 h-4" />
              </div>
              <span className="font-bold text-md text-slate-800 dark:text-slate-100">
                Health<span className="text-teal-500">OS</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              An AI-powered growth and patient experience platform for high-value specialty clinics. Automating patient acquisition and clinical operations.
            </p>
          </div>

          {/* Clinics Locations */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Our Locations
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-500 mt-0.5 shrink-0" />
                <span>New York Clinic: 120 Park Ave, New York, NY</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-500 mt-0.5 shrink-0" />
                <span>Miami Clinic: 300 Brickell Ave, Miami, FL</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-500 mt-0.5 shrink-0" />
                <span>Dallas Clinic: 2100 Ross Ave, Dallas, TX</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Platform Features
            </h3>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/before-after" className="hover:text-teal-500 transition-colors">
                  Before & After Slider
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-teal-500 transition-colors">
                  Installment Calculator
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-teal-500 transition-colors">
                  AI Consultation Scheduler
                </Link>
              </li>
              <li>
                <Link href="/patient/dashboard" className="hover:text-teal-500 transition-colors">
                  Patient Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Contact & Support
            </h3>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-500" />
                <span>+1 (800) 555-CARE</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-500" />
                <span>support@healthos.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="h-px bg-slate-200 dark:bg-slate-800 my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-400">
          <p>
            © {new Date().getFullYear()} HealthOS Growth OS. All rights reserved. | {' '}
            <a 
              href="https://www.healthos.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-teal-500 font-bold hover:underline transition-colors"
            >
              Healthcare system by HealthOS
            </a>
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">HIPAA Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
