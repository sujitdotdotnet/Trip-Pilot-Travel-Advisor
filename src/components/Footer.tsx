import React from 'react';
import { Compass, Sparkles, Heart, Users, MapPin, Mail, ArrowUpRight } from 'lucide-react';
import { N8nConfig } from '../types/travel';

interface FooterProps {
  onOpenN8nGuide: () => void;
  onOpenChat: (prompt?: string) => void;
  onOpenPlanner: () => void;
  n8nConfig: N8nConfig;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenN8nGuide,
  onOpenChat,
  onOpenPlanner,
  n8nConfig
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-base font-display">
                TP
              </span>
              <span className="text-xl font-bold font-display text-white">
                Trip Pilot
              </span>
            </div>
            
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Handcrafted itinerary bundles for intimate couples, adventurous families, and curious solo travelers ready to explore with strangers.
            </p>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-500">
              <span className={`w-2 h-2 rounded-full ${n8nConfig.isLiveMode ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span>
                Chatbot Engine: {n8nConfig.isLiveMode ? 'Live n8n Webhook' : 'Built-in Demo Simulator'}
              </span>
            </div>
          </div>

          {/* Col 1: Itinerary Bundles */}
          <div className="space-y-3">
            <div className="font-bold text-xs uppercase tracking-wider text-slate-200">
              Itinerary Bundles
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#bundles" className="hover:text-white transition-colors">
                  Couple Retreats
                </a>
              </li>
              <li>
                <a href="#bundles" className="hover:text-white transition-colors">
                  Family Expeditions
                </a>
              </li>
              <li>
                <a href="#bundles" className="hover:text-white transition-colors">
                  Stranger Squads
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenPlanner}
                  className="text-amber-400 hover:text-amber-300 font-semibold transition-colors cursor-pointer text-left"
                >
                  Custom Planning Studio
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Company & Method */}
          <div className="space-y-3">
            <div className="font-bold text-xs uppercase tracking-wider text-slate-200">
              How It Works
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  The Flight-Crew Method
                </a>
              </li>
              <li>
                <a href="#stories" className="hover:text-white transition-colors">
                  Traveler Journals
                </a>
              </li>
              <li>
                <button
                  onClick={() => onOpenChat('How do stranger bundles work?')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Stranger Cohort Matching
                </button>
              </li>
              <li>
                <a href="#stories" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Developer & n8n */}
          <div className="space-y-3">
            <div className="font-bold text-xs uppercase tracking-wider text-slate-200">
              n8n Integration
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenN8nGuide}
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors cursor-pointer text-left flex items-center gap-1"
                >
                  <span>n8n Setup Checklist</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenChat('How to configure n8n webhook?')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Webhook Payload Schema
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenChat('Test n8n connection')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  CORS & SSL Troubleshooting
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenChat()}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Test In-App Chatbot
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Quiet Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Trip Pilot Inc. All travel routes hand-tested by local pilots.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Safety Guidelines</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
