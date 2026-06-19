export type Specialty = 'IVF' | 'DERMATOLOGY' | 'DENTAL_IMPLANT' | 'EYE_CARE';

export type LeadStatus = 'NEW' | 'QUALIFYING' | 'QUALIFIED' | 'UNQUALIFIED' | 'CONVERTED';

export type LeadScore = 'HIGH' | 'MEDIUM' | 'LOW';

export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export type AppointmentType = 'CONSULTATION' | 'PROCEDURE' | 'FOLLOW_UP';

export type PaymentStatus = 'PENDING' | 'PAID' | 'OVERDUE';

export type PaymentPlan = 'FULL' | 'INSTALLMENT_12' | 'INSTALLMENT_24' | 'INSTALLMENT_36';

export interface LeadAnswer {
  question: string;
  answer: string;
}

export interface SpecialtyConfig {
  name: string;
  heroTitle: string;
  heroSub: string;
  ctaText: string;
  calculatorTitle: string;
  stages: { name: string; description: string }[];
  treatments: { name: string; description: string; cost: number }[];
  doctors: { name: string; role: string; bio: string; image: string }[];
  beforeAfter: { before: string; after: string; caption: string }[];
  faqs: { q: string; a: string }[];
}
