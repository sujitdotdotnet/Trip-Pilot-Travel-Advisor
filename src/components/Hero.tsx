import React from 'react';
import { Compass, Users, Heart, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { BundleCategory } from '../types/travel';

interface HeroProps {
  onSelectCategory: (category: BundleCategory) => void;
  onOpenPlanner: () => void;
  onOpenChat: (initialMsg?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectCategory,
  onOpenPlanner,
  onOpenChat
}) => {
  const handleQuickPick = (cat: BundleCategory) => {
    onSelectCategory(cat);
    const element = document.getElementById('bundles');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Context & Headline */}
        <div className="max-w-3xl mb-8">
          {/* Quiet unboxed metadata kicker */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-3">
            <span>Handcrafted Itineraries</span>
            <span aria-hidden="true">·</span>
            <span>Couple, Family & Stranger Cohorts</span>
            <span aria-hidden="true">·</span>
            <span>24/7 Human & Automation Support</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-slate-900 leading-[1.1] text-balance">
            Travel thoughtfully mapped. Memories effortlessly made.
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
            Trip Pilot builds boutique itineraries designed around human connections. Whether you’re sneaking away with a partner, guiding three generations of family, or ready to travel with strangers who become lifelong friends.
          </p>
        </div>

        {/* Hero Visual Container with Single Dominant Focal Anchor */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 group">
          
          {/* Top Marquee Banner: Right-to-Left scrolling notification */}
          <div className="relative z-10 w-full bg-amber-500/95 text-slate-950 backdrop-blur-md border-b border-amber-600/30 overflow-hidden py-2 shadow-xs">
            <div className="animate-marquee-rtl flex items-center">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-6 px-4 shrink-0">
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-wide uppercase">
                    <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse" />
                    This is a Demo/Test URL and it does not book any real travel package.
                  </span>
                  <span className="text-slate-950/40 text-xs select-none">✦</span>
                </div>
              ))}
            </div>
          </div>

          <img
            src="/src/assets/images/hero_travel_horizon_1790782420343.jpg"
            alt="Scenic coastal highway and dramatic emerald ocean cliffs at golden sunset"
            className="w-full h-[380px] sm:h-[480px] lg:h-[540px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />

          {/* Measured contrast scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-slate-950/10 pointer-events-none" />

          {/* Overlay content: Quick Interactive Bundle Selector Bar */}
          <div className="absolute bottom-0 inset-x-0 p-5 sm:p-8 lg:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            
            <div className="max-w-xl text-white">
              <span className="text-xs uppercase tracking-widest font-semibold text-amber-300">
                Choose your travel tempo
              </span>
              <p className="mt-1 text-xl sm:text-2xl font-bold font-display text-white">
                How are you exploring the world on your next journey?
              </p>
              
              {/* Interactive Segmented Quick Buttons */}
              <div className="mt-4 flex flex-wrap gap-2.5">
                <button
                  onClick={() => handleQuickPick('couple')}
                  className="px-4 py-2.5 rounded-lg bg-white/20 hover:bg-white text-white hover:text-slate-950 backdrop-blur-md text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border border-white/20 cursor-pointer active:scale-95"
                >
                  <Heart className="w-4 h-4 text-rose-300 group-hover:text-rose-600" />
                  <span>Couple Bundles</span>
                </button>

                <button
                  onClick={() => handleQuickPick('family')}
                  className="px-4 py-2.5 rounded-lg bg-white/20 hover:bg-white text-white hover:text-slate-950 backdrop-blur-md text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border border-white/20 cursor-pointer active:scale-95"
                >
                  <Users className="w-4 h-4 text-emerald-300" />
                  <span>Family Bundles</span>
                </button>

                <button
                  onClick={() => handleQuickPick('stranger')}
                  className="px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-md cursor-pointer active:scale-95"
                >
                  <Compass className="w-4 h-4 text-slate-950" />
                  <span>Stranger Bundles</span>
                  <span className="text-[10px] bg-slate-950 text-amber-300 px-1.5 py-0.5 rounded font-mono">POPULAR</span>
                </button>
              </div>
            </div>

            {/* Right Action Island inside Hero Scrim */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <button
                onClick={onOpenPlanner}
                className="px-5 py-3 rounded-lg bg-white text-slate-900 hover:bg-slate-100 font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer whitespace-nowrap active:scale-95"
              >
                <span>Build Custom Itinerary</span>
                <ArrowRight className="w-4 h-4 text-slate-600" />
              </button>
              <button
                onClick={() => onOpenChat('What bundle would you recommend for me?')}
                className="px-5 py-3 rounded-lg bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Ask n8n Pilot Concierge</span>
              </button>
            </div>

          </div>
        </div>

        {/* Quantified Adjacency Proof Strip */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div>
            <div className="text-2xl font-bold font-display text-slate-900 tabular-nums">450+</div>
            <div className="text-xs text-slate-500 mt-0.5">Hand-tested routes mapped</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-slate-900 tabular-nums">38</div>
            <div className="text-xs text-slate-500 mt-0.5">Countries with local pilots</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-slate-900 tabular-nums">4.9 / 5.0</div>
            <div className="text-xs text-slate-500 mt-0.5">Verified traveler score</div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Zero tourist-trap guarantee with 24/7 flight-crew support</span>
          </div>
        </div>

      </div>
    </section>
  );
};
