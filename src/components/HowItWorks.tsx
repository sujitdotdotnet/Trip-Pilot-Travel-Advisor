import React from 'react';
import { Compass, Sparkles, Map, PhoneCall, ShieldCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Select a Bundle or Spark a Custom Route',
      desc: 'Pick between curated Couple, Family, or Stranger Squad journeys, or tell our custom studio your target destinations and pace.',
      detail: 'Tailored for real travel dynamics, from stroller routes to solo matchmaking.'
    },
    {
      num: '02',
      title: 'Curated by Human Flight Pilots',
      desc: 'Our destination specialists vet boutique accommodations, hand-test driving times, and reserve tables at local culinary gems.',
      detail: 'Zero kickback tourist traps. Only places we personally return to.'
    },
    {
      num: '03',
      title: 'Live Pocket Blueprint & Offline Maps',
      desc: 'Receive your complete hour-by-hour itinerary on your phone with custom Google Maps pins, offline transit guides, and packing tips.',
      detail: 'Seamlessly shareable with family members or your newly matched stranger squad.'
    },
    {
      num: '04',
      title: '24/7 On-Trip Concierge & Smart Automation',
      desc: 'Need a last-minute table reservation, rain backup plan, or train rebooking? Reach our flight-crew and automation bot on WhatsApp instantly.',
      detail: 'Backed by our custom n8n automation engine for instant assistance.'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
            The Trip Pilot Method
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight text-balance">
            How we turn travel chaos into effortless wonder.
          </h2>
          <p className="mt-3 text-base text-slate-600">
            A blend of passionate local pilots and high-speed automations designed to eliminate vacation fatigue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <span className="text-2xl font-black font-display text-amber-500 block mb-3 tabular-nums">
                  {step.num}.
                </span>
                <h3 className="text-lg font-bold font-display text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-amber-900 font-medium">
                {step.detail}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
