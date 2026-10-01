import React, { useState } from 'react';
import { BundleCategory, TravelBundle, N8nConfig } from './types/travel';
import { getStoredN8nConfig } from './services/n8nChatService';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BundleSection } from './components/BundleSection';
import { CustomPlanner } from './components/CustomPlanner';
import { HowItWorks } from './components/HowItWorks';
import { StoriesSection } from './components/StoriesSection';
import { ItineraryModal } from './components/ItineraryModal';
import { N8nGuideModal } from './components/N8nGuideModal';
import { Chatbot } from './components/Chatbot';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<BundleCategory | 'all'>('all');
  const [activeModalBundle, setActiveModalBundle] = useState<TravelBundle | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | undefined>(undefined);
  const [isN8nGuideOpen, setIsN8nGuideOpen] = useState(false);
  const [n8nConfig, setN8nConfig] = useState<N8nConfig>(() => getStoredN8nConfig());

  // Handlers
  const handleOpenPlanner = () => {
    const el = document.getElementById('custom-planner');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenChatWithPrompt = (prompt?: string) => {
    if (prompt) {
      setChatInitialPrompt(prompt);
    }
    setIsChatOpen(true);
  };

  const handleInquireBundle = (bundle: TravelBundle) => {
    handleOpenChatWithPrompt(`Hi! I'm interested in reserving or customizing the ${bundle.title} (${bundle.destination}). Can you share availability and details?`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* Top Bar Navigation */}
      <Navbar
        onOpenPlanner={handleOpenPlanner}
        onOpenN8nGuide={() => setIsN8nGuideOpen(true)}
        onOpenChat={handleOpenChatWithPrompt}
        n8nConfig={n8nConfig}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <Hero
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onOpenPlanner={handleOpenPlanner}
          onOpenChat={handleOpenChatWithPrompt}
        />

        {/* Curated Itinerary Bundles (Couple, Family, Stranger) */}
        <BundleSection
          selectedCategory={selectedCategory}
          onCategoryChange={(cat) => setSelectedCategory(cat)}
          onOpenItineraryModal={(bundle) => setActiveModalBundle(bundle)}
          onInquireBundle={handleInquireBundle}
        />

        {/* Custom Itinerary Planning Studio */}
        <CustomPlanner
          onSendToChat={handleOpenChatWithPrompt}
        />

        {/* Mechanism: How Trip Pilot Works */}
        <HowItWorks />

        {/* Traveler Stories & FAQ */}
        <StoriesSection
          onOpenChat={handleOpenChatWithPrompt}
        />

      </main>

      {/* Footer */}
      <Footer
        onOpenN8nGuide={() => setIsN8nGuideOpen(true)}
        onOpenChat={handleOpenChatWithPrompt}
        onOpenPlanner={handleOpenPlanner}
        n8nConfig={n8nConfig}
      />

      {/* Day-by-Day Itinerary Modal */}
      <ItineraryModal
        bundle={activeModalBundle}
        onClose={() => setActiveModalBundle(null)}
        onSendToChat={handleOpenChatWithPrompt}
        onBook={handleInquireBundle}
      />

      {/* n8n Backend Developer Guide Modal */}
      <N8nGuideModal
        isOpen={isN8nGuideOpen}
        onClose={() => setIsN8nGuideOpen(false)}
        onOpenSettings={() => {
          setIsChatOpen(true);
        }}
      />

      {/* Concierge Dummy & Live n8n Chatbot */}
      <Chatbot
        n8nConfig={n8nConfig}
        onUpdateConfig={(newConfig) => setN8nConfig(newConfig)}
        onOpenN8nGuide={() => setIsN8nGuideOpen(true)}
        isOpen={isChatOpen}
        onToggleOpen={() => setIsChatOpen(!isChatOpen)}
        initialPrompt={chatInitialPrompt}
        onClearInitialPrompt={() => setChatInitialPrompt(undefined)}
      />

    </div>
  );
}
