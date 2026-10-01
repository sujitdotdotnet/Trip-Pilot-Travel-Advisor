import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, X, Send, Settings, Sparkles, RefreshCw, 
  HelpCircle, CheckCircle2, AlertTriangle, ArrowRight, 
  Maximize2, Minimize2, Terminal, Shield, Zap
} from 'lucide-react';
import { ChatMessage, N8nConfig } from '../types/travel';
import { sendMessageToN8n, testN8nWebhook, saveN8nConfig, getStoredN8nConfig } from '../services/n8nChatService';

interface ChatbotProps {
  n8nConfig: N8nConfig;
  onUpdateConfig: (newConfig: N8nConfig) => void;
  onOpenN8nGuide: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({
  n8nConfig,
  onUpdateConfig,
  onOpenN8nGuide,
  isOpen,
  onToggleOpen,
  initialPrompt,
  onClearInitialPrompt
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome-1',
      sender: 'assistant',
      text: `👋 Welcome to **Trip Pilot Concierge**!\n\nI can help you explore our **Couple**, **Family**, or **Stranger Squad** itinerary bundles, or draft a custom route for your next getaway.\n\n⚙️ *Note for developer*: All chat requests can be processed by your **n8n backend**. Click the **gear icon** above to connect your n8n Webhook URL, or chat right now in built-in **Demo Simulator Mode**!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [activeDebugPayload, setActiveDebugPayload] = useState<any | null>(null);

  // Settings form local state
  const [tempUrl, setTempUrl] = useState(n8nConfig.webhookUrl);
  const [tempLiveMode, setTempLiveMode] = useState(n8nConfig.isLiveMode);
  const [tempAuth, setTempAuth] = useState(n8nConfig.authHeader || '');
  const [pingResult, setPingResult] = useState<{
    tested: boolean;
    success?: boolean;
    status?: number;
    latencyMs?: number;
    message?: string;
  }>({ tested: false });
  const [isTestingPing, setIsTestingPing] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTempUrl(n8nConfig.webhookUrl);
    setTempLiveMode(n8nConfig.isLiveMode);
    setTempAuth(n8nConfig.authHeader || '');
  }, [n8nConfig]);

  // Handle passed initial prompts from external buttons
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      if (!isOpen) onToggleOpen();
      handleSend(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isSending]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isSending) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsSending(true);

    try {
      const res = await sendMessageToN8n({
        message: text,
        config: n8nConfig
      });

      const assistantMsg: ChatMessage = {
        id: 'msg-' + Date.now() + '-reply',
        sender: 'assistant',
        text: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: !!res.error,
        rawPayload: res.debugDetails
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: 'msg-' + Date.now() + '-err',
          sender: 'assistant',
          text: `⚠️ Error dispatching request: ${err.message || 'Unknown network error'}.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: true
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSaveSettings = () => {
    const updated: N8nConfig = {
      ...n8nConfig,
      webhookUrl: tempUrl.trim(),
      isLiveMode: tempLiveMode,
      authHeader: tempAuth.trim()
    };
    saveN8nConfig(updated);
    onUpdateConfig(updated);
    setShowSettings(false);
  };

  const handlePingTest = async () => {
    if (!tempUrl.trim()) {
      setPingResult({
        tested: true,
        success: false,
        message: 'Please enter an n8n webhook URL first.'
      });
      return;
    }
    setIsTestingPing(true);
    const result = await testN8nWebhook(tempUrl, tempAuth);
    setIsTestingPing(false);
    setPingResult({
      tested: true,
      success: result.success,
      status: result.status,
      latencyMs: result.latencyMs,
      message: result.success 
        ? `Successfully reached n8n in ${result.latencyMs}ms!` 
        : (result.error || 'Connection failed.')
    });
  };

  const handleClearHistory = () => {
    if (confirm('Clear message history?')) {
      setMessages([
        {
          id: 'msg-cleared',
          sender: 'system',
          text: 'Conversation history reset.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  const quickPrompts = [
    'Tell me about Couple bundles',
    'How does the Stranger bundle work?',
    'I need a family trip to Costa Rica',
    'How to connect to n8n?',
    'What does custom planning cost?'
  ];

  // Helper to render basic markdown bold and bullet points cleanly
  const renderMessageContent = (text: string) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1" />;
          
          // Bold formatting
          let formattedLine: React.ReactNode = line;
          if (line.includes('**')) {
            const parts = line.split('**');
            formattedLine = parts.map((part, i) =>
              i % 2 === 1 ? <strong key={i} className="font-bold text-slate-950">{part}</strong> : part
            );
          }

          // Bullet items
          if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-1">
                <span className="text-amber-500 font-bold shrink-0">•</span>
                <span>{formattedLine}</span>
              </div>
            );
          }

          return <p key={idx}>{formattedLine}</p>;
        })}
      </div>
    );
  };

  return (
    <>
      {/* Floating trigger button */}
      {!isOpen && (
        <button
          onClick={onToggleOpen}
          aria-label="Open Trip Pilot Concierge Chat"
          className="fixed bottom-6 right-6 z-40 bg-slate-900 hover:bg-slate-800 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl flex items-center gap-3 transition-all hover:scale-105 active:scale-95 cursor-pointer border border-slate-700 group"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-amber-400 group-hover:rotate-6 transition-transform" />
            <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ring-2 ring-slate-900 ${
              n8nConfig.isLiveMode ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'
            }`} />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold leading-tight flex items-center gap-1.5">
              <span>Ask Trip Pilot</span>
              <span className="text-[10px] font-mono text-amber-400 font-normal">
                {n8nConfig.isLiveMode ? 'n8n Live' : 'Demo'}
              </span>
            </span>
            <span className="text-[10px] text-slate-300">
              Itinerary Concierge
            </span>
          </div>
        </button>
      )}

      {/* Expandable Chat Drawer */}
      {isOpen && (
        <div 
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200"
          role="region"
          aria-label="Trip Pilot Chat Window"
        >
          
          {/* Header */}
          <div className="px-4 py-3 bg-slate-900 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs shadow-xs">
                TP
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold font-display text-white">
                    Trip Pilot Concierge
                  </h3>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-medium ${
                    n8nConfig.isLiveMode 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {n8nConfig.isLiveMode ? 'n8n Live' : 'Demo Mode'}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">
                  {n8nConfig.isLiveMode ? 'Connected to n8n webhook' : 'Running simulated responses'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowSettings(!showSettings)}
                title="Configure n8n Webhook"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  showSettings ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Settings className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenN8nGuide}
                title="n8n Integration Checklist"
                className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
              </button>

              <button
                onClick={handleClearHistory}
                title="Clear Chat"
                className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                onClick={onToggleOpen}
                title="Close Chat"
                className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Inline Settings Panel (Slide-down) */}
          {showSettings && (
            <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs space-y-3 shrink-0 overflow-y-auto max-h-[300px]">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  <span>n8n Webhook Configuration</span>
                </span>
                <button
                  onClick={onOpenN8nGuide}
                  className="text-amber-800 hover:underline text-[11px] font-semibold"
                >
                  View Setup Guide
                </button>
              </div>

              {/* Mode Toggle */}
              <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                <div>
                  <div className="font-semibold text-slate-800">
                    Live n8n Webhook Mode
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {tempLiveMode ? 'POST requests sent to your webhook URL' : 'Use built-in mock responses'}
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={tempLiveMode}
                  onChange={(e) => setTempLiveMode(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500 cursor-pointer"
                />
              </div>

              {/* Webhook URL input */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Webhook URL (POST)
                </label>
                <input
                  type="url"
                  value={tempUrl}
                  onChange={(e) => setTempUrl(e.target.value)}
                  placeholder="https://your-n8n.cloud/webhook/trip-pilot"
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md font-mono text-[11px] text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <span className="text-[10px] text-slate-500 block mt-1">
                  Must use <code>https://</code> due to browser SSL sandbox constraints.
                </span>
              </div>

              {/* Optional Auth Header */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Optional Authorization Header (Bearer token)
                </label>
                <input
                  type="text"
                  value={tempAuth}
                  onChange={(e) => setTempAuth(e.target.value)}
                  placeholder="Bearer your-secret-token"
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-md font-mono text-[11px] text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* Ping Test Button & Result */}
              <div className="pt-1 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePingTest}
                  disabled={isTestingPing}
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded font-semibold text-[11px] transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isTestingPing ? 'Testing...' : 'Ping Test Webhook'}
                </button>

                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded font-semibold text-[11px] transition-colors cursor-pointer ml-auto"
                >
                  Save & Apply
                </button>
              </div>

              {pingResult.tested && (
                <div className={`p-2 rounded text-[11px] ${
                  pingResult.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  <div className="font-bold flex items-center gap-1">
                    {pingResult.success ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />}
                    <span>{pingResult.success ? 'Webhook Reachable' : 'Connection Error'}</span>
                    {pingResult.latencyMs !== undefined && (
                      <span className="font-mono text-[10px]">({pingResult.latencyMs}ms)</span>
                    )}
                  </div>
                  <div className="mt-0.5">{pingResult.message}</div>
                </div>
              )}

            </div>
          )}

          {/* Raw Payload Inspector Modal Overlay */}
          {activeDebugPayload && (
            <div className="absolute inset-0 z-30 bg-slate-900/90 text-slate-100 p-4 overflow-y-auto flex flex-col text-xs font-mono">
              <div className="flex items-center justify-between pb-2 border-b border-slate-700 mb-2">
                <span className="font-bold text-amber-400">n8n Payload Inspector</span>
                <button
                  onClick={() => setActiveDebugPayload(null)}
                  className="p-1 hover:bg-slate-800 rounded text-slate-300 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <pre className="flex-1 overflow-x-auto text-[11px] leading-relaxed">
                {JSON.stringify(activeDebugPayload, null, 2)}
              </pre>
            </div>
          )}

          {/* Message Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
            {messages.map((msg) => {
              const isAssistant = msg.sender === 'assistant';
              const isSystem = msg.sender === 'system';

              if (isSystem) {
                return (
                  <div key={msg.id} className="text-center text-[11px] text-slate-400 py-1">
                    {msg.text}
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-2xs ${
                      isAssistant
                        ? msg.isError
                          ? 'bg-rose-50 border border-rose-200 text-rose-900'
                          : 'bg-white border border-slate-200 text-slate-800'
                        : 'bg-slate-900 text-white'
                    }`}
                  >
                    {renderMessageContent(msg.text)}

                    {/* Debug Payload affordance for developer */}
                    {msg.rawPayload && (
                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                        <span className="font-mono">
                          {msg.rawPayload.status ? `HTTP ${msg.rawPayload.status}` : 'Payload'}
                          {msg.rawPayload.latencyMs ? ` · ${msg.rawPayload.latencyMs}ms` : ''}
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveDebugPayload(msg.rawPayload)}
                          className="text-amber-800 hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                        >
                          <Terminal className="w-3 h-3" />
                          <span>Inspect Payload</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {isSending && (
              <div className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-2xl max-w-[70%] text-xs text-slate-500 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                <span>
                  {n8nConfig.isLiveMode ? 'Calling n8n workflow...' : 'Flight Pilot is drafting itinerary ideas...'}
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-2 bg-slate-100/70 border-t border-slate-200 overflow-x-auto flex gap-1.5 shrink-0">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(prompt)}
                disabled={isSending}
                className="whitespace-nowrap px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-md text-[11px] text-slate-700 font-medium transition-colors cursor-pointer disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={n8nConfig.isLiveMode ? "Type message for n8n workflow..." : "Ask about bundles or custom trips..."}
              disabled={isSending}
              className="flex-1 px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-900 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isSending}
              className="p-2 sm:px-3.5 sm:py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>

        </div>
      )}
    </>
  );
};
