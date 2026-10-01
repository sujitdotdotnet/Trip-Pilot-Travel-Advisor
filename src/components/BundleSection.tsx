import React, { useState } from 'react';
import { TravelBundle, BundleCategory } from '../types/travel';
import { TRAVEL_BUNDLES } from '../data/travelData';
import { Calendar, Users, Heart, Compass, ArrowUpRight, Check, Sparkles } from 'lucide-react';

interface BundleSectionProps {
  selectedCategory: BundleCategory | 'all';
  onCategoryChange: (cat: BundleCategory | 'all') => void;
  onOpenItineraryModal: (bundle: TravelBundle) => void;
  onInquireBundle: (bundle: TravelBundle) => void;
}

export const BundleSection: React.FC<BundleSectionProps> = ({
  selectedCategory,
  onCategoryChange,
  onOpenItineraryModal,
  onInquireBundle
}) => {
  const [filterPace, setFilterPace] = useState<'all' | 'Relaxed' | 'Balanced' | 'Active'>('all');

  const filteredBundles = TRAVEL_BUNDLES.filter((bundle) => {
    const categoryMatch = selectedCategory === 'all' || bundle.category === selectedCategory;
    const paceMatch = filterPace === 'all' || bundle.pace === filterPace;
    return categoryMatch && paceMatch;
  });

  return (
    <section id="bundles" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
              Curated Travel Bundles
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight text-balance">
              Designed for couples, families, and curious strangers.
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-xl">
              Every bundle is built with vetted boutique stays, seamless transfers, local perks, and unhurried pacing.
            </p>
          </div>

          {/* Interactive Filter Tabs (Buttons) */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white rounded-xl border border-slate-200 shadow-xs">
            <button
              onClick={() => onCategoryChange('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Bundles
            </button>
            <button
              onClick={() => onCategoryChange('couple')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'couple'
                  ? 'bg-rose-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <span>Couple</span>
            </button>
            <button
              onClick={() => onCategoryChange('family')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'family'
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>Family</span>
            </button>
            <button
              onClick={() => onCategoryChange('stranger')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'stranger'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-slate-950" />
              <span>Stranger Squads</span>
            </button>
          </div>
        </div>

        {/* Bundle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBundles.map((bundle) => {
            return (
              <div
                key={bundle.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col hover:border-slate-300 hover:shadow-lg transition-all group"
              >
                {/* Visual Asset Container with Fallback */}
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={bundle.heroImage}
                    alt={bundle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback container
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Top Category Indicator (Text, not garish pill) */}
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-semibold text-white uppercase tracking-wider">
                    {bundle.category === 'couple' && 'Couple Retreat'}
                    {bundle.category === 'family' && 'Family Expedition'}
                    {bundle.category === 'stranger' && 'Stranger Squad'}
                  </div>

                  {/* Bottom overlay highlight inside image */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-xs font-medium text-amber-300">
                      {bundle.destination}, {bundle.country}
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata Line with typographic separators */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-2.5">
                      <span>{bundle.durationDays} Days</span>
                      <span aria-hidden="true">·</span>
                      <span>{bundle.pace} Pace</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{bundle.groupSpec}</span>
                    </div>

                    <h3 className="text-xl font-bold font-display text-slate-900 group-hover:text-amber-800 transition-colors">
                      {bundle.title}
                    </h3>

                    <p className="mt-2.5 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {bundle.shortDescription}
                    </p>

                    {/* Bullet Highlights */}
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                      {bundle.highlights.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Price & Working Action Buttons */}
                  <div className="mt-6 pt-4 border-t border-slate-200">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                          Estimated Package
                        </span>
                        <div className="text-lg font-bold font-display text-slate-900 tabular-nums">
                          {bundle.priceEstimate}
                        </div>
                      </div>
                      <span className="text-xs text-slate-500">
                        {bundle.days.length} Daily Schedules
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onOpenItineraryModal(bundle)}
                        className="w-full px-3 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>View Days</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                      </button>

                      <button
                        onClick={() => onInquireBundle(bundle)}
                        className="w-full px-3 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      >
                        Inquire / Book
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Stranger Bundle Special Callout Banner */}
        <div className="mt-14 p-6 sm:p-8 bg-amber-500/10 border border-amber-200 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
              <Compass className="w-4 h-4 text-amber-700" />
              <span>The Stranger Cohort Philosophy</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
              Why travel with strangers? Because they don't stay strangers for long.
            </h3>
            <p className="mt-2 text-sm text-slate-700 leading-relaxed">
              We match solo travelers through a short lifestyle and tempo questionnaire. You get the safety of small-group logistics, the freedom of an expert route pilot, and the sheer magic of campfire camaraderie without the awkwardness of tourist bus crowds.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onCategoryChange('stranger')}
              className="px-5 py-3 text-xs sm:text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            >
              Browse Stranger Cohorts
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
