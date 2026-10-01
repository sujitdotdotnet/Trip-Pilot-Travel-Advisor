import React, { useState } from 'react';
import { TravelBundle } from '../types/travel';
import { X, Calendar, MapPin, Clock, Lightbulb, CheckCircle2, MessageSquare, Bed } from 'lucide-react';

interface ItineraryModalProps {
  bundle: TravelBundle | null;
  onClose: () => void;
  onSendToChat: (prompt: string) => void;
  onBook: (bundle: TravelBundle) => void;
}

export const ItineraryModal: React.FC<ItineraryModalProps> = ({
  bundle,
  onClose,
  onSendToChat,
  onBook
}) => {
  if (!bundle) return null;

  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const activeDay = bundle.days[activeDayIndex] || bundle.days[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="relative p-6 sm:p-8 bg-slate-900 text-white shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <span>{bundle.destination}, {bundle.country}</span>
            <span aria-hidden="true">·</span>
            <span>{bundle.durationDays} Days</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{bundle.category} Bundle</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white pr-8">
            {bundle.title}
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {bundle.fullOverview}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <span className="font-semibold text-amber-300 font-display text-base">
              {bundle.priceEstimate}
            </span>
            <span className="text-slate-500">|</span>
            <span>Pace: {bundle.pace}</span>
            <span className="text-slate-500">|</span>
            <span>{bundle.groupSpec}</span>
          </div>
        </div>

        {/* Modal Body: Day Selector & Content */}
        <div className="flex-1 overflow-y-auto flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-200">
          
          {/* Day Navigation Tabs */}
          <div className="md:w-64 p-4 bg-slate-50 overflow-x-auto md:overflow-y-auto shrink-0 flex md:flex-col gap-1.5">
            <div className="hidden md:block text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
              Daily Schedule
            </div>
            {bundle.days.map((day, idx) => (
              <button
                key={day.dayNumber}
                onClick={() => setActiveDayIndex(idx)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap md:whitespace-normal flex items-center justify-between ${
                  activeDayIndex === idx
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <span>Day {day.dayNumber}: {day.title}</span>
              </button>
            ))}

            <div className="mt-4 pt-4 border-t border-slate-200 hidden md:block">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 block mb-2">
                What's Included
              </span>
              <ul className="space-y-1.5 px-3 text-[11px] text-slate-600">
                {bundle.included.slice(0, 4).map((inc, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Active Day Detail View */}
          <div className="flex-1 p-6 sm:p-8 space-y-6">
            
            {activeDay ? (
              <>
                <div className="border-b border-slate-100 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-amber-600 uppercase">
                      Day {activeDay.dayNumber} of {bundle.durationDays}
                    </span>
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {activeDay.location}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-slate-900 mt-1">
                    {activeDay.title}
                  </h3>
                </div>

                {/* Day Schedule Segments */}
                <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-semibold text-slate-900 flex items-center gap-1.5 mb-1 text-xs">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Morning Flight Path</span>
                    </div>
                    <p className="leading-relaxed">{activeDay.morning}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-semibold text-slate-900 flex items-center gap-1.5 mb-1 text-xs">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Afternoon Exploration</span>
                    </div>
                    <p className="leading-relaxed">{activeDay.afternoon}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-semibold text-slate-900 flex items-center gap-1.5 mb-1 text-xs">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Evening Culinary & Vibe</span>
                    </div>
                    <p className="leading-relaxed">{activeDay.evening}</p>
                  </div>
                </div>

                {/* Pilot's Insider Tip Callout */}
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-amber-900 block">
                      Flight Pilot's Secret Tip:
                    </span>
                    <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                      {activeDay.insiderTip}
                    </p>
                  </div>
                </div>

                {/* Lodging */}
                <div className="flex items-center gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <Bed className="w-4 h-4 text-slate-400" />
                  <span>Lodging: <strong className="text-slate-900">{activeDay.stay}</strong></span>
                </div>
              </>
            ) : null}

          </div>

        </div>

        {/* Modal Action Bar */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-slate-500">
            Want to swap activities, extend nights, or adjust hotels? We personalize every bundle.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onSendToChat(`I'm looking at the ${bundle.title} (${bundle.destination}). Can you explain how customization or booking works?`);
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-slate-500" />
              <span>Ask Pilot AI About This</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onBook(bundle);
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Inquire / Reserve
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
