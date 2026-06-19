import { Specialty, SpecialtyConfig } from './types';

export const SPECIALTY_CONFIGS: Record<Specialty, SpecialtyConfig> = {
  IVF: {
    name: 'IVF & Fertility',
    heroTitle: 'Your Fertility Journey Starts With Expert Care + Personalized Treatment Support',
    heroSub: 'Combining state-of-the-art laboratory sciences with compassionate care to help build families.',
    ctaText: 'Schedule Fertility Consultation',
    calculatorTitle: 'IVF Journey Cost & Financing Plan',
    stages: [
      { name: 'Initial Consultation', description: 'Meet your fertility specialist and review medical history.' },
      { name: 'Medical Testing', description: 'Ovarian reserve testing, ultrasound, and semen analysis.' },
      { name: 'Treatment Planning', description: 'Customize your stimulation protocol and medication scheduling.' },
      { name: 'Procedure', description: 'Egg retrieval under light sedation and fertilization in the IVF lab.' },
      { name: 'Follow-up', description: 'Embryo transfer and initial pregnancy blood tests.' },
      { name: 'Progress Tracking', description: 'Early obstetric ultrasounds and handoff to your OB/GYN.' }
    ],
    treatments: [
      { name: 'Standard IVF Cycle', description: 'Includes ovarian stimulation, egg retrieval, fertilization, and fresh transfer.', cost: 12500 },
      { name: 'ICSI (Intracytoplasmic Sperm Injection)', description: 'Direct injection of a single sperm into each egg to aid fertilization.', cost: 1500 },
      { name: 'PGT-A Genetic Testing', description: 'Screening embryos for chromosomal abnormalities before transfer.', cost: 3800 },
      { name: 'Frozen Embryo Transfer (FET)', description: 'Thawing and transferring a previously frozen embryo.', cost: 4200 }
    ],
    doctors: [
      {
        name: 'Dr. Sofia Ahmed',
        role: 'Lead Reproductive Endocrinologist',
        bio: 'Over 15 years helping families. Double board-certified in OB/GYN and Reproductive Endocrinology.',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400'
      },
      {
        name: 'Dr. Marcus Vance',
        role: 'Director of Embryology',
        bio: 'Pioneer in blastocyst culture methods. Ensures the highest standards in our laboratory.',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400'
      }
    ],
    beforeAfter: [
      {
        before: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=600',
        after: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=600',
        caption: 'Embryo Culture: 8-cell stage to beautiful Day-5 Blastocyst progression.'
      }
    ],
    faqs: [
      { q: 'How long does a single IVF cycle take?', a: 'One cycle typically takes about 4 to 6 weeks, starting from diagnostic testing to the embryo transfer.' },
      { q: 'What is your clinic success rate?', a: 'Our cumulative success rate is 68% for women under 35, well above the national average.' },
      { q: 'Do you offer payment installment options?', a: 'Yes! We offer 12, 24, and 36-month zero-interest or low-APR financing plans through our partners.' }
    ]
  },
  DERMATOLOGY: {
    name: 'Advanced Dermatology & Skin',
    heroTitle: 'Transform Your Skin with Custom Diagnostics and Advanced Care',
    heroSub: 'Clinical skin therapy and cosmetic procedures tailored to your unique biological profile.',
    ctaText: 'Book Skin Assessment',
    calculatorTitle: 'Skin Revision Package Planner',
    stages: [
      { name: 'Skin Assessment', description: 'High-res multispectral analysis of skin pigment, sebum, and depth.' },
      { name: 'Treatment Plan', description: 'Formulating laser settings, peel concentrations, and home care.' },
      { name: 'Sessions', description: 'Completing periodic clinical laser or microneedling treatments.' },
      { name: 'Progress Photos', description: 'Capturing calibrated progress photos under standard lighting.' },
      { name: 'Maintenance', description: 'Transitioning to lighter, protective skin regimens for long-term health.' }
    ],
    treatments: [
      { name: 'Fractional CO2 Laser Therapy', description: 'Dermal remodeling to clear acne scars and fine lines.', cost: 1800 },
      { name: 'RF Microneedling (Morpheus8)', description: 'Deep tissue collagen induction and fat remodeling.', cost: 2400 },
      { name: 'Chemical Peel & Hydrafacial Package', description: 'Multi-step clearing, exfoliation, and hydration sequence.', cost: 650 },
      { name: 'Clear + Brilliant Gentle Laser', description: 'Preventative skin maintenance and tone correction.', cost: 450 }
    ],
    doctors: [
      {
        name: 'Dr. Sofia Ahmed',
        role: 'Consultant Cosmetic Dermatologist',
        bio: 'Specialize in non-surgical laser treatments and pigment disorders with 12+ years experience.',
        image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400'
      },
      {
        name: 'Dr. Marcus Vance',
        role: 'Chief Clinical Dermatologist',
        bio: 'Expert in skin cancer screening, Mohs surgery, and severe acne management protocols.',
        image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400'
      }
    ],
    beforeAfter: [
      {
        before: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=600',
        after: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
        caption: 'Acne Scars: 3 Sessions of RF Microneedling + Fractional Laser.'
      }
    ],
    faqs: [
      { q: 'Is there downtime after Morpheus8 RF Microneedling?', a: 'Downtime is minimal, typically 24-48 hours of mild redness and light swelling, comparable to a sunburn.' },
      { q: 'How many sessions will I need?', a: 'Most patients achieve optimal results after 3 sessions spaced 4-6 weeks apart.' }
    ]
  },
  DENTAL_IMPLANT: {
    name: 'Premium Dental Implant Care',
    heroTitle: 'Complete Dental Implant Care Journey From Consultation To Recovery',
    heroSub: 'Restore your smile and bite functionality with high-precision guided surgical implants.',
    ctaText: 'Request Implant Consult',
    calculatorTitle: 'Dental Restorations Cost Planner',
    stages: [
      { name: 'Consultation', description: 'Initial visual screening and clinical discussion of restoration goals.' },
      { name: 'X-Ray / Scan', description: '3D CBCT bone density scan to plan implant placement angles.' },
      { name: 'Implant Planning', description: '3D printing surgical guides and customized titanium selection.' },
      { name: 'Procedure', description: 'Placing the titanium post under local anesthesia or IV sedation.' },
      { name: 'Crown Placement', description: 'Attaching the custom zirconia crown matching adjacent teeth.' },
      { name: 'Follow-up', description: 'Bite checks and hygiene maintenance to ensure lifelong stability.' }
    ],
    treatments: [
      { name: 'Single Tooth Implant Package', description: 'Includes titanium post, custom abutment, and premium zirconia crown.', cost: 3800 },
      { name: 'All-on-4 Full Arch Restorations', description: 'Replacing an entire upper or lower arch with 4 titanium implants.', cost: 18500 },
      { name: 'Sinus Lift / Bone Grafting', description: 'Building up bone volume in the upper jaw to anchor implants securely.', cost: 1200 },
      { name: 'Custom Cosmetic Veneers (Set of 6)', description: 'Porcelain veneers for complete anterior smile remodeling.', cost: 5400 }
    ],
    doctors: [
      {
        name: 'Dr. Sofia Ahmed',
        role: 'Prosthodontist Specialist',
        bio: 'Specialist in custom zirconia crown fabrications and perfect bite alignments.',
        image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400'
      },
      {
        name: 'Dr. Marcus Vance',
        role: 'Oral & Maxillofacial Surgeon',
        bio: 'Placed over 4,000 implants. Board-certified with emphasis on guided digital surgery.',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400'
      }
    ],
    beforeAfter: [
      {
        before: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600',
        after: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=600',
        caption: 'Full Arch: Smile restoration using All-On-4 surgical guided implants.'
      }
    ],
    faqs: [
      { q: 'How long do dental implants last?', a: 'With proper hygiene, the titanium implant post can last a lifetime. The crown may need replacement after 15-20 years.' },
      { q: 'Does the implant procedure hurt?', a: 'No, the procedure is performed under local anesthesia. Most patients report feeling only mild pressure. Post-op discomfort is similar to a simple extraction.' }
    ]
  },
  EYE_CARE: {
    name: 'Advanced Ophthalmology & LASIK',
    heroTitle: 'Restore Clear Vision with Precision Diagnosis and Expert Treatment',
    heroSub: 'Correct your vision using advanced wavefront laser technology and custom lens replacements.',
    ctaText: 'Book Vision Screening',
    calculatorTitle: 'Ophthalmic Procedure Cost Estimator',
    stages: [
      { name: 'Eye Examination', description: 'Comprehensive corneal topography and macular density mapping.' },
      { name: 'Diagnosis', description: 'Evaluating suitability for LASIK, PRK, or lens replacement.' },
      { name: 'Treatment Plan', description: 'Programming laser contours matching your exact refractive errors.' },
      { name: 'Procedure', description: 'Blade-free laser correction (usually takes under 15 minutes for both eyes).' },
      { name: 'Recovery', description: 'Immediate post-op assessments and detailed eye drop schedule check.' }
    ],
    treatments: [
      { name: 'Contoura Vision LASIK (Both Eyes)', description: 'Topography-guided laser vision correction for myopia and astigmatism.', cost: 4200 },
      { name: 'Premium Cataract Surgery with IOL', description: 'Replacing cloudy natural lenses with multifocal implants.', cost: 3500 },
      { name: 'EVO+ ICL (Implantable Collamer Lens)', description: 'Adding a corrective lens inside the eye, ideal for high prescriptions.', cost: 5800 },
      { name: 'Dry Eye LipiFlow Therapy', description: 'Clearing blocked meibomian glands to restore normal tear films.', cost: 950 }
    ],
    doctors: [
      {
        name: 'Dr. Sofia Ahmed',
        role: 'Refractive Surgeon',
        bio: 'Performed 8,000+ vision correction surgeries. Fellowship trained at Johns Hopkins Wilmer Eye Institute.',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400'
      },
      {
        name: 'Dr. Marcus Vance',
        role: 'Cataract & Glaucoma Specialist',
        bio: 'Pioneered micro-invasive glaucoma surgeries. Passionate about preserving vision in older adults.',
        image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400'
      }
    ],
    beforeAfter: [
      {
        before: 'https://images.unsplash.com/photo-1516246823573-c406be772f13?auto=format&fit=crop&q=80&w=600',
        after: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600',
        caption: 'Visual Acuity: Out-of-focus view (20/200) corrected to crystal clear 20/15 post-LASIK.'
      }
    ],
    faqs: [
      { q: 'Is LASIK vision correction permanent?', a: 'Yes, the physical reshaped structure of your cornea is permanent. However, age-related vision changes (like reading glass needs) can still occur after 45.' },
      { q: 'How quickly can I return to work after LASIK?', a: 'Most patients return to work and drive the very next day. Total visual stability occurs within 1-3 months.' }
    ]
  }
};

export const INITIAL_LEADS = [
  {
    id: 'lead-1',
    name: 'Sarah Miller',
    email: 'sarah.miller@example.com',
    phone: '+1 (555) 123-4567',
    specialty: 'IVF' as Specialty,
    status: 'QUALIFIED',
    score: 'HIGH', // Behavior: HOT
    behaviorScore: 'HOT',
    scoreReason: 'Immediate start timeline (within 1 month) + Seeking second opinion. Behavior scoring calculated from 8 clicks + 4m session timer.',
    answers: JSON.stringify([
      { question: 'What treatment are you interested in?', answer: 'IVF Treatment' },
      { question: 'How soon are you looking for treatment?', answer: 'Within 1 month' },
      { question: 'Have you visited another clinic?', answer: 'Yes, looking for second opinion' },
      { question: 'What is your preferred location?', answer: 'New York Clinic' }
    ]),
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'lead-2',
    name: 'James Connor',
    email: 'james.c@example.com',
    phone: '+1 (555) 987-6543',
    specialty: 'DENTAL_IMPLANT' as Specialty,
    status: 'QUALIFYING',
    score: 'MEDIUM', // Behavior: WARM
    behaviorScore: 'WARM',
    scoreReason: 'Restoration candidate planning to start in 2-3 months. Clicks: 4. Session timer: 1.5m.',
    answers: JSON.stringify([
      { question: 'What treatment are you interested in?', answer: 'Single Tooth Implant' },
      { question: 'How soon are you looking for treatment?', answer: 'In 2-3 months' },
      { question: 'Have you visited another clinic?', answer: 'No' },
      { question: 'What is your preferred location?', answer: 'Miami Clinic' }
    ]),
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'lead-3',
    name: 'Elena Rostova',
    email: 'elena.ros@example.com',
    phone: '+1 (555) 345-6789',
    specialty: 'DERMATOLOGY' as Specialty,
    status: 'NEW',
    score: 'LOW', // Behavior: COLD
    behaviorScore: 'COLD',
    scoreReason: 'Distant planning timeline (6+ months). Clicks: 1. Session timer: 20s.',
    answers: JSON.stringify([
      { question: 'What treatment are you interested in?', answer: 'Hydrafacial' },
      { question: 'How soon are you looking for treatment?', answer: 'In 6+ months' },
      { question: 'Have you visited another clinic?', answer: 'No' },
      { question: 'What is your preferred location?', answer: 'Dallas Clinic' }
    ]),
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString()
  }
];

export const INITIAL_PATIENTS = [
  {
    id: 'patient-1',
    userId: 'user-patient-1',
    name: 'Sarah Miller',
    email: 'sarah.miller@example.com',
    specialty: 'IVF' as Specialty,
    clinicName: 'New York Clinic',
    medicalHistory: 'Ovarian insufficiency diagnosed in 2025. Standard fertility panels complete. Male partner parameters normal.',
    currentStage: 'Treatment Planning',
    progress: 50,
    
    // Clinical Diagnostic & Success Scoring parameters
    riskLevel: 'MEDIUM',
    dropOffRisk: 12,        // 12% probability of dropping off
    continuationProb: 72,   // 72% continuation probability
    cancellationRisk: 8,    // 8% cancellation risk
    expectedRevenue: 12500,

    experienceScore: {
      appointmentKept: true,
      documentsUploaded: true,
      communicationRating: 'Excellent',
      progressRatio: 50,
      overallScore: 92
    },
    
    familyNetwork: {
      name: 'Emma Miller',
      relationship: 'Daughter (Care Manager)',
      email: 'emma.m@example.com',
      phone: '+1 (555) 321-7654',
      notificationsEnabled: true
    },
    
    conversionPackage: {
      procedure: 'Standard IVF Cycle',
      cost: 12500,
      explanation: 'Our tailored IVF stim protocol is designed to optimize egg maturation. We will use a soft hormone stimulation cycle over 10 days, followed by ultrasound-guided retrieval.',
      benefits: [
        'Optimized follicle counts via personalized hormone protocols.',
        'High success rate embryology lab supervision under Dr. Vance.',
        'ICSI support included for enhanced fertilization probabilities.'
      ],
      timeline: [
        'Day 1-10: Hormone stimulation and monitoring scans.',
        'Day 12: Egg retrieval procedure under light sedation.',
        'Day 17: Blastocyst transfer and initial pregnancy screening.'
      ],
      faqs: [
        { q: 'Will I need bed rest after the retrieval?', a: 'Only light rest is suggested on retrieval day. You can resume standard desk activities the following morning.' },
        { q: 'Are medications covered under the installment plan?', a: 'Yes, medication financing can be bundled directly into the 12-month zero-interest plan.' }
      ],
      prepGuide: 'Avoid alcohol and anti-inflammatory medications. Continue folate and pre-natal vitamins daily.'
    },

    upcomingAppointment: {
      doctorName: 'Dr. Sofia Ahmed',
      dateTime: new Date(Date.now() + 86400000 * 1.5).toISOString(),
      type: 'PROCEDURE',
      notes: 'Final ultrasound scan and trigger shot administration.'
    },
    documents: [
      { id: 'doc-1', name: 'Hormone Panel Lab Report.pdf', url: '#', type: 'REPORT', date: '2026-06-10' },
      { id: 'doc-2', name: 'Baseline Ultrasound Imaging.png', url: '#', type: 'IMAGE', date: '2026-06-12' },
      { id: 'doc-3', name: 'Stimulation Medication Prescription.pdf', url: '#', type: 'PRESCRIPTION', date: '2026-06-14' }
    ],
    payments: [
      { id: 'pay-1', amount: 4200, status: 'PAID', plan: 'INSTALLMENT_12', dueDate: '2026-06-01' },
      { id: 'pay-2', amount: 4200, status: 'PENDING', plan: 'INSTALLMENT_12', dueDate: '2026-07-01' },
      { id: 'pay-3', amount: 4200, status: 'PENDING', plan: 'INSTALLMENT_12', dueDate: '2026-08-01' }
    ],
    messages: [
      { id: 'msg-1', senderName: 'AI Care Assistant', content: 'Welcome to your care portal, Sarah! I have set up your stimulation calendar. Remember to take Gonal-F at 8:00 PM tonight.', isAI: true, time: '10:00 AM' },
      { id: 'msg-2', senderName: 'Sarah Miller', content: 'Thank you! Is it normal to feel bloated on Day 6 of stimulation?', isAI: false, time: '10:15 AM' },
      { id: 'msg-3', senderName: 'AI Care Assistant', content: 'Yes, bloating is a very common symptom as your follicles grow. However, if you experience sudden severe pain or weight gain over 2 lbs in 24 hours, contact Dr. Ahmed immediately. Would you like me to leave a note for her?', isAI: true, time: '10:16 AM' }
    ]
  }
];

export const MOCK_AUTOMATION_RULES = [
  { id: 'rule-1', triggerEvent: 'NEW_LEAD', actionType: 'UPDATE_SCORE', template: 'Score lead based on prompt criteria', isActive: true },
  { id: 'rule-2', triggerEvent: 'LEAD_QUALIFIED', actionType: 'SEND_SMS', template: 'Hi [Name], your lead score is High! Let\'s book a consultation. Link: clinic.com/book', isActive: true },
  { id: 'rule-3', triggerEvent: 'APPOINTMENT_BOOKED', actionType: 'SEND_EMAIL', template: 'Dear [Name], your appointment with [Doctor] is confirmed for [Date]. Prepare using instructions: clinic.com/prep', isActive: true }
];

export const MOCK_AUTOMATION_LOGS = [
  { id: 'log-1', timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), rule: 'Score Lead', message: 'Lead Sarah Miller analyzed. Score set to HIGH (Reason: immediate intent, second opinion).' },
  { id: 'log-2', timestamp: new Date(Date.now() - 3600000 * 2 + 1000).toISOString(), rule: 'Send Qualified SMS', message: 'SMS sent to Sarah Miller (+1 555-123-4567): "Hi Sarah, our fertility doctor has reviewed your inquiry. Click here to book your consultation..."' },
  { id: 'log-3', timestamp: new Date(Date.now() - 3600000 * 2 + 500000).toISOString(), rule: 'Book Lead Consultation', message: 'Sarah Miller booked Initial Consultation for 2026-06-21.' }
];

export const MOCK_CAMPAIGNS = [
  {
    id: 'camp-1',
    topic: 'Explain IVF Egg Freezing Benefits',
    landingCopy: 'Freeze Your Fertility: Lock In Your Choices For Tomorrow. Modern vitrification technology offers a 95% survival rate for cryopreserved oocytes.',
    faqs: [
      { q: 'What is the optimal age to freeze eggs?', a: 'Eggs frozen before age 35 offer the highest success rates for future transfers.' },
      { q: 'How long can frozen eggs be stored?', a: 'Cryopreserved eggs remain viable indefinitely when stored in liquid nitrogen.' }
    ],
    blogIdeas: [
      'The Science of Oocyte Vitrification: How Cold Keeps Eggs Young',
      'Career, Family, & Choices: Why Women in Their 20s are Freezing Their Eggs'
    ],
    emailSequence: 'Subject: Take Control of Your Timeline, Sarah.\nDear Sarah, modern clinical science gives you options to design your own timeline. Click here to read our free guide on Egg Freezing...',
    socialPosts: '❄️ Your fertility choices, frozen in time. Learn about our low-APR vitrification packages at HealthOS. #FertilityScience #EggFreezing'
  }
];

export const INITIAL_RETENTION_ALERTS = [
  {
    id: 'ret-1',
    patientId: 'patient-1',
    name: 'Sarah Miller',
    email: 'sarah.miller@example.com',
    specialty: 'IVF',
    daysSinceConsultation: 14,
    status: 'AT_RISK',
    lastContactDate: new Date(Date.now() - 86400000 * 14).toISOString()
  }
];

// Seeded Audit Logs timeline for HIPAA Compliance
export const INITIAL_AUDIT_LOGS = [
  { id: 'audit-1', timestamp: new Date(Date.now() - 3600000 * 3).toISOString(), operatorName: 'Dr. Sofia Ahmed', role: 'DOCTOR', action: 'READ_CHART', details: 'Accessed patient chart Sarah Miller (user-patient-1).' },
  { id: 'audit-2', timestamp: new Date(Date.now() - 3600000 * 2.5).toISOString(), operatorName: 'Dr. Sofia Ahmed', role: 'DOCTOR', action: 'WRITE_NOTE', details: 'Added stimulation schedule clinical chart note.' },
  { id: 'audit-3', timestamp: new Date(Date.now() - 3600000 * 1).toISOString(), operatorName: 'Clinic Owner', role: 'ADMIN', action: 'ACCESS_ANALYTICS', details: 'Viewed group operational revenue telemetry boards.' },
  { id: 'audit-4', timestamp: new Date(Date.now() - 3600000 * 0.2).toISOString(), operatorName: 'Nurse Emma', role: 'NURSE', action: 'UPLOAD_DOC', details: 'Uploaded Stimulation Medication Prescription.pdf.' }
];

// Seeded Document intelligence parsed values simulator
export const MOCK_REPORT_EXTRACTION: Record<string, any> = {
  'Hormone Panel Lab Report.pdf': {
    patientName: 'Sarah Miller',
    abnormalities: ['FSH Level Elevated (12.4 mIU/mL)', 'AMH Level Low (0.8 ng/mL)'],
    highlights: 'Ovarian reserve indicates slight depletion. Suggest stimulation protocol scaling.',
    extractedValues: [
      { key: 'AMH', value: '0.8 ng/mL', status: 'LOW' },
      { key: 'FSH', value: '12.4 mIU/mL', status: 'HIGH' },
      { key: 'LH', value: '4.8 mIU/mL', status: 'NORMAL' },
      { key: 'Estradiol', value: '45 pg/mL', status: 'NORMAL' }
    ]
  },
  'Baseline Ultrasound Imaging.png': {
    patientName: 'Sarah Miller',
    abnormalities: ['Antral Follicle Count slightly low (8 total)'],
    highlights: 'Active follicles map ready. Left ovary: 5, Right ovary: 3.',
    extractedValues: [
      { key: 'Antral Follicle Count', value: '8 total', status: 'WARNING' },
      { key: 'Uterine Lining', value: '7.8 mm', status: 'NORMAL' }
    ]
  }
};

export class DemoStateManager {
  static getLeads() {
    if (typeof window === 'undefined') return INITIAL_LEADS;
    const data = localStorage.getItem('healthos_leads');
    if (!data) {
      localStorage.setItem('healthos_leads', JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    return JSON.parse(data);
  }

  static saveLead(lead: any) {
    if (typeof window === 'undefined') return;
    const leads = this.getLeads();
    const updated = [lead, ...leads.filter((l: any) => l.id !== lead.id)];
    localStorage.setItem('healthos_leads', JSON.stringify(updated));
    this.addAuditLog('AI Front Desk', 'AI_BOT', 'CREATE_LEAD', `Created new qualified lead ${lead.name} (${lead.specialty}).`);
  }

  static getPatients() {
    if (typeof window === 'undefined') return INITIAL_PATIENTS;
    const data = localStorage.getItem('healthos_patients');
    if (!data) {
      localStorage.setItem('healthos_patients', JSON.stringify(INITIAL_PATIENTS));
      return INITIAL_PATIENTS;
    }
    return JSON.parse(data);
  }

  static savePatient(patient: any) {
    if (typeof window === 'undefined') return;
    const patients = this.getPatients();
    const updated = patients.map((p: any) => p.id === patient.id ? patient : p);
    localStorage.setItem('healthos_patients', JSON.stringify(updated));
    
    // Log HIPAA Access audit
    this.addAuditLog(
      'Dr. Sofia Ahmed', 
      'DOCTOR', 
      'UPDATE_PATIENT_CHART', 
      `Modified clinical records/stage for ${patient.name} to: "${patient.currentStage}".`
    );
  }

  static getAutomationLogs() {
    if (typeof window === 'undefined') return MOCK_AUTOMATION_LOGS;
    const data = localStorage.getItem('healthos_autologs');
    if (!data) {
      localStorage.setItem('healthos_autologs', JSON.stringify(MOCK_AUTOMATION_LOGS));
      return MOCK_AUTOMATION_LOGS;
    }
    return JSON.parse(data);
  }

  static addAutomationLog(logMessage: string, ruleName: string) {
    if (typeof window === 'undefined') return;
    const logs = this.getAutomationLogs();
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      rule: ruleName,
      message: logMessage
    };
    localStorage.setItem('healthos_autologs', JSON.stringify([newLog, ...logs]));
  }

  static getCampaigns() {
    if (typeof window === 'undefined') return MOCK_CAMPAIGNS;
    const data = localStorage.getItem('healthos_campaigns');
    if (!data) {
      localStorage.setItem('healthos_campaigns', JSON.stringify(MOCK_CAMPAIGNS));
      return MOCK_CAMPAIGNS;
    }
    return JSON.parse(data);
  }

  static saveCampaign(campaign: any) {
    if (typeof window === 'undefined') return;
    const campaigns = this.getCampaigns();
    localStorage.setItem('healthos_campaigns', JSON.stringify([campaign, ...campaigns]));
    this.addAuditLog('Clinic Owner', 'ADMIN', 'CREATE_CAMPAIGN', `Generated marketing package copy for topic: "${campaign.topic}".`);
  }

  static getRetentionAlerts() {
    if (typeof window === 'undefined') return INITIAL_RETENTION_ALERTS;
    const data = localStorage.getItem('healthos_retention');
    if (!data) {
      localStorage.setItem('healthos_retention', JSON.stringify(INITIAL_RETENTION_ALERTS));
      return INITIAL_RETENTION_ALERTS;
    }
    return JSON.parse(data);
  }

  static triggerRetentionOutreach(patientId: string) {
    if (typeof window === 'undefined') return;
    const alerts = this.getRetentionAlerts();
    const updated = alerts.map((a: any) => 
      a.patientId === patientId ? { ...a, status: 'CONTACTED', lastContactDate: new Date().toISOString() } : a
    );
    localStorage.setItem('healthos_retention', JSON.stringify(updated));
    this.addAutomationLog(
      `AI Retention Outreach executed for patient ID: ${patientId}. Auto-emailed educational resources and zero-interest financing plans.`,
      'Retention Engine Outreach'
    );
    this.addAuditLog('Clinic Owner', 'ADMIN', 'RETENTION_TRIGGER', `Dispatched outreach follow-ups for patient ID: ${patientId}.`);
  }

  // HIPAA Audit Log Store
  static getAuditLogs() {
    if (typeof window === 'undefined') return INITIAL_AUDIT_LOGS;
    const data = localStorage.getItem('healthos_auditlogs');
    if (!data) {
      localStorage.setItem('healthos_auditlogs', JSON.stringify(INITIAL_AUDIT_LOGS));
      return INITIAL_AUDIT_LOGS;
    }
    return JSON.parse(data);
  }

  static addAuditLog(operatorName: string, role: string, action: string, details: string) {
    if (typeof window === 'undefined') return;
    const logs = this.getAuditLogs();
    const newLog = {
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString(),
      operatorName,
      role,
      action,
      details
    };
    localStorage.setItem('healthos_auditlogs', JSON.stringify([newLog, ...logs]));
  }
}
