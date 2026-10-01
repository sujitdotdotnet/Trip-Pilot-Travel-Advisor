import React, { useState } from 'react';
import { TESTIMONIALS, TRAVEL_FAQ } from '../data/travelData';
import { Quote, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface StoriesSectionProps {
  onOpenChat: (prompt: string) => void;
}

export const StoriesSection: React.FC<StoriesSectionProps> = ({ onOpenChat }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="stories" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Testimonials Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
            Verified Traveler Journals
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight text-balance">
            Real stories from couples, families, and stranger squads.
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-6 h-6 text-amber-500 mb-4" />
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <div className="font-bold text-sm text-slate-900">
                  {item.author}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {item.type} · {item.location}
                </div>
                <div className="text-[11px] text-amber-800 font-medium mt-2">
                  {item.metrics}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto pt-8 border-t border-slate-200">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
              Frequently Asked Questions
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Everything you need to know about Trip Pilot bundles, custom planning, and our concierge engine.
            </p>
          </div>

          <div className="space-y-4">
            {TRAVEL_FAQ.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200 rounded-xl overflow-hidden bg-white transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 hover:text-amber-800 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 p-5 bg-amber-50 rounded-xl border border-amber-200 text-center">
            <p className="text-xs sm:text-sm text-slate-700">
              Have a specific question not answered here? Ask our AI concierge bot or test your n8n workflow connection!
            </p>
            <button
              onClick={() => onOpenChat('How do stranger bundles work?')}
              className="mt-3 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-xs inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Ask Pilot Concierge</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
