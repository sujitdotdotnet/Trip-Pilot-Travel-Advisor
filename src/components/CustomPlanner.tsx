import React, { useState } from 'react';
import { Sparkles, Send, CheckCircle2, Sliders, Calendar, MapPin, Users, Heart, Compass, DollarSign, MessageSquare } from 'lucide-react';
import { CustomPlanRequest } from '../types/travel';

interface CustomPlannerProps {
  onSendToChat: (prompt: string) => void;
}

export const CustomPlanner: React.FC<CustomPlannerProps> = ({ onSendToChat }) => {
  const [formData, setFormData] = useState<CustomPlanRequest>({
    travelersType: 'couple',
    partySize: 2,
    destination: 'Southern Italy & Amalfi Coast',
    datesOrMonth: 'October 2026',
    durationDays: 8,
    budgetPerPerson: '$2,500 - $3,500',
    travelStyle: ['Culinary & Local Wine', 'Coastal Solitude', 'Boutique Heritage Stays'],
    specialNotes: 'Looking for romantic cliffside hotels and a private boat afternoon.',
    contactName: '',
    contactEmail: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [requestId, setRequestId] = useState('');

  const travelStylesList = [
    'Culinary & Local Wine',
    'Coastal Solitude',
    'Boutique Heritage Stays',
    'Alpine & Hiking Trails',
    'Wildlife & Nature Safaris',
    'Photography & Golden Hour',
    'Family Slow Travel',
    'High-Energy Squad Adventure'
  ];

  const handleStyleToggle = (style: string) => {
    setFormData((prev) => {
      const exists = prev.travelStyle.includes(style);
      if (exists) {
        return { ...prev, travelStyle: prev.travelStyle.filter((s) => s !== style) };
      } else {
        return { ...prev, travelStyle: [...prev.travelStyle, style] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contactName || !formData.contactEmail) {
      alert('Please provide your name and email so our flight crew can send your custom blueprint.');
      return;
    }
    const fakeId = 'TP-' + Math.floor(100000 + Math.random() * 900000);
    setRequestId(fakeId);
    setSubmitted(true);
  };

  const handleDiscussWithChat = () => {
    const summary = `Hi! I just drafted a custom trip request to ${formData.destination} for ${formData.partySize} travelers (${formData.travelersType}) for ${formData.durationDays} days around ${formData.datesOrMonth}. Our budget is ${formData.budgetPerPerson}. Key styles: ${formData.travelStyle.join(', ')}. Can you help review this and suggest routes?`;
    onSendToChat(summary);
  };

  return (
    <section id="custom-planner" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
            Tailor-Made Route Studio
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight text-balance">
            Got an unmapped dream? We craft custom itineraries from scratch.
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Tell our travel pilots who’s going, where you’re yearning to explore, and your ideal tempo. We research seasonal conditions, curate hand-tested boutique sanctuaries, and eliminate hours of booking chaos.
          </p>
        </div>

        {submitted ? (
          <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto">
            <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto mb-4" />
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-900">
              Request Received · Reference #{requestId}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 mt-2">
              Your custom blueprint is taking flight!
            </h3>
            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              Thank you, {formData.contactName}! A Trip Pilot route specialist is currently reviewing regional flight corridors and off-peak boutique accommodations for your {formData.durationDays}-day journey to {formData.destination}.
            </p>

            <div className="mt-6 p-4 bg-white rounded-xl border border-amber-100 text-left text-xs text-slate-600 space-y-1">
              <div><strong className="text-slate-900">Destination:</strong> {formData.destination}</div>
              <div><strong className="text-slate-900">Travelers:</strong> {formData.partySize} ({formData.travelersType})</div>
              <div><strong className="text-slate-900">Target Window:</strong> {formData.datesOrMonth} ({formData.durationDays} days)</div>
              <div><strong className="text-slate-900">Contact:</strong> {formData.contactEmail}</div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={handleDiscussWithChat}
                className="px-5 py-3 text-xs sm:text-sm font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-slate-950" />
                <span>Discuss with Concierge Bot</span>
              </button>
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-3 text-xs sm:text-sm font-medium rounded-lg text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Form Section */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
              
              {/* Question 1: Who is traveling */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-600" />
                  <span>01. Who is traveling?</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'couple', label: 'Couple / Duo', icon: Heart },
                    { id: 'family', label: 'Family with Kids', icon: Users },
                    { id: 'stranger', label: 'Join Stranger Squad', icon: Compass },
                    { id: 'solo', label: 'Solo Explorer', icon: Sparkles }
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = formData.travelersType === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, travelersType: item.id as any })}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <Icon className={`w-4 h-4 mb-2 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                        <span className="text-xs font-semibold">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 2: Destination & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span>02. Where do you want to go?</span>
                  </label>
                  <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    placeholder="e.g. Kyoto & Hakone, Japan or Norwegian Fjords"
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span>Duration</span>
                  </label>
                  <select
                    value={formData.durationDays}
                    onChange={(e) => setFormData({ ...formData, durationDays: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white text-slate-900 cursor-pointer"
                  >
                    <option value={5}>5 Days (Quick escape)</option>
                    <option value={7}>7 Days (1 Week standard)</option>
                    <option value={10}>10 Days (Deep immersion)</option>
                    <option value={14}>14 Days (Extended expedition)</option>
                    <option value={21}>21 Days (Epic sabbatical)</option>
                  </select>
                </div>
              </div>

              {/* Target Window & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-1.5">
                    Target Dates / Month
                  </label>
                  <input
                    type="text"
                    value={formData.datesOrMonth}
                    onChange={(e) => setFormData({ ...formData, datesOrMonth: e.target.value })}
                    placeholder="e.g. September 2026 or Fall"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-amber-600" />
                    <span>Estimated Budget (Per Traveler)</span>
                  </label>
                  <select
                    value={formData.budgetPerPerson}
                    onChange={(e) => setFormData({ ...formData, budgetPerPerson: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white text-slate-900 cursor-pointer"
                  >
                    <option value="$1,500 - $2,500">$1,500 - $2,500 (Smart boutique)</option>
                    <option value="$2,500 - $4,000">$2,500 - $4,000 (Premium curated)</option>
                    <option value="$4,000 - $7,000">$4,000 - $7,000 (Luxury & private charters)</option>
                    <option value="$7,000+">$7,000+ (Ultra-luxury bespoke)</option>
                  </select>
                </div>
              </div>

              {/* Question 3: Travel Styles */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2.5 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-600" />
                  <span>03. Desired Travel Vibe & Focus (Select all that fit)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {travelStylesList.map((style) => {
                    const active = formData.travelStyle.includes(style);
                    return (
                      <button
                        key={style}
                        type="button"
                        onClick={() => handleStyleToggle(style)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          active
                            ? 'bg-amber-100 text-amber-900 border border-amber-300 font-semibold'
                            : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {style}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1.5">
                  Special Notes or Must-Have Experiences
                </label>
                <textarea
                  rows={2}
                  value={formData.specialNotes}
                  onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                  placeholder="e.g. Vegetarian dining required, celebrating 10th anniversary, want to avoid crowded tourist buses..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white text-slate-900"
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="e.g. Maya Lin"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="e.g. maya@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white text-slate-900"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>Submit Custom Itinerary Request</span>
                </button>
                <span className="text-xs text-slate-500 hidden sm:inline">
                  ⚡ Reviewed within 24 hours
                </span>
              </div>

            </form>

            {/* Live Interactive Itinerary Preview Card */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    Live Blueprint Preview
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">DRAFT</span>
                </div>

                <div className="mt-4">
                  <h4 className="text-lg font-bold font-display text-slate-900">
                    {formData.destination || 'Your Dream Destination'}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <span>{formData.durationDays} Days</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{formData.travelersType}</span>
                    <span aria-hidden="true">·</span>
                    <span>{formData.datesOrMonth || 'Target Season'}</span>
                  </div>
                </div>

                <div className="mt-5 space-y-3 text-xs text-slate-600">
                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <span className="font-semibold text-slate-900 block mb-1">Travel Tempo & Highlights</span>
                    {formData.travelStyle.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {formData.travelStyle.map((s) => (
                          <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px]">
                            {s}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="italic text-slate-400">Select vibes above</span>
                    )}
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200">
                    <span className="font-semibold text-slate-900 block mb-1">What Trip Pilot Handles</span>
                    <ul className="space-y-1 text-slate-600 list-disc list-inside">
                      <li>Boutique lodging vetting & reservation links</li>
                      <li>Station & airport chauffeur logistics</li>
                      <li>Curated offline GPS maps with local dining</li>
                      <li>Dedicated flight-crew WhatsApp concierge</li>
                    </ul>
                  </div>

                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={handleDiscussWithChat}
                      className="w-full py-2.5 text-xs font-semibold text-amber-800 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                      <span>Ask Pilot Concierge Bot About This</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
