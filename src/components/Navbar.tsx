import React from 'react';
import { Compass, Sparkles, SlidersHorizontal, MessageSquareText } from 'lucide-react';
import { N8nConfig } from '../types/travel';

interface NavbarProps {
  onOpenPlanner: () => void;
  onOpenN8nGuide: () => void;
  onOpenChat: (initialMessage?: string) => void;
  n8nConfig: N8nConfig;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPlanner,
  onOpenN8nGuide,
  onOpenChat,
  n8nConfig
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200">
      {/* Top Banner Notice: Right-to-Left scrolling notification */}
      <div className="w-full bg-amber-500 text-slate-950 border-b border-amber-600/30 overflow-hidden py-1.5 shadow-2xs">
        <div className="animate-marquee-rtl flex items-center">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 px-4 shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse" />
                This is a Demo/Test URL and it does not book any real travel package.
              </span>
              <span className="text-slate-950/40 text-xs select-none">✦</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="text-2xl font-extrabold tracking-tight font-display text-slate-900 flex items-center gap-2 group"
        >
          <span className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-base shadow-sm group-hover:bg-amber-400 transition-colors">
            TP
          </span>
          <span>Trip Pilot</span>
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a href="#bundles" className="hover:text-slate-900 transition-colors">
            Itinerary Bundles
          </a>
          <a href="#custom-planner" className="hover:text-slate-900 transition-colors">
            Custom Planning
          </a>
          <a href="#how-it-works" className="hover:text-slate-900 transition-colors">
            How It Works
          </a>
          <a href="#stories" className="hover:text-slate-900 transition-colors">
            Traveler Stories
          </a>
          <button
            onClick={onOpenN8nGuide}
            className="text-amber-700 hover:text-amber-900 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>n8n Integration Guide</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenChat()}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            title={n8nConfig.isLiveMode ? 'Connected to live n8n webhook' : 'Running in simulator demo mode'}
          >
            <MessageSquareText className="w-4 h-4 text-amber-600" />
            <span className="whitespace-nowrap">Ask Pilot AI</span>
            <span className={`w-2 h-2 rounded-full ${n8nConfig.isLiveMode ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
          </button>

          <button
            onClick={onOpenPlanner}
            className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Plan Custom Trip
          </button>
        </div>

      </div>
      </div>
    </header>
  );
};
