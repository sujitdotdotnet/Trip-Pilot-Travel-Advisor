export type BundleCategory = 'couple' | 'family' | 'stranger';

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  location: string;
  morning: string;
  afternoon: string;
  evening: string;
  insiderTip: string;
  stay: string;
}

export interface TravelBundle {
  id: string;
  title: string;
  category: BundleCategory;
  destination: string;
  country: string;
  durationDays: number;
  pace: 'Relaxed' | 'Balanced' | 'Active';
  vibe: string;
  groupSpec: string; // e.g. "2 Adults", "2-6 Family Members", "8-12 Matched Travelers"
  priceEstimate: string;
  heroImage: string;
  shortDescription: string;
  fullOverview: string;
  highlights: string[];
  included: string[];
  days: ItineraryDay[];
  featured?: boolean;
}

export interface CustomPlanRequest {
  travelersType: BundleCategory | 'solo' | 'group';
  partySize: number;
  destination: string;
  datesOrMonth: string;
  durationDays: number;
  budgetPerPerson: string;
  travelStyle: string[];
  specialNotes: string;
  contactName: string;
  contactEmail: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  isError?: boolean;
  rawPayload?: any;
}

export interface N8nConfig {
  webhookUrl: string;
  isLiveMode: boolean; // if false, use built-in mock engine
  authHeader?: string;
  customSessionId: string;
}
