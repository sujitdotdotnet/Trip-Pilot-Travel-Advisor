import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, AlertTriangle, ShieldCheck, Zap, Workflow, HelpCircle } from 'lucide-react';

interface N8nGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings: () => void;
}

export const N8nGuideModal: React.FC<N8nGuideModalProps> = ({
  isOpen,
  onClose,
  onOpenSettings
}) => {
  if (!isOpen) return null;

  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const samplePayload = `{
  "message": "Can you recommend a romantic 5-day bundle for our honeymoon in Greece?",
  "sessionId": "pilot_session_8f3a92",
  "userId": "traveler_guest",
  "timestamp": "2026-09-30T15:30:00.000Z",
  "source": "Trip Pilot Web Assistant",
  "context": {
    "activeCategory": "couple",
    "origin": "https://trippilot.app",
    "pathname": "/bundles"
  }
}`;

  const sampleResponse = `{
  "reply": "Congratulations on your upcoming honeymoon! I recommend our Aegean Sunset & Cliffside Sanctuary in Santorini...",
  "status": "success"
}`;

  const starterWorkflowJson = `{
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "trip-pilot",
        "responseMode": "responseNode",
        "options": {
          "responseHeaders": {
            "entries": [
              { "name": "Access-Control-Allow-Origin", "value": "*" },
              { "name": "Access-Control-Allow-Methods", "value": "POST, OPTIONS" },
              { "name": "Access-Control-Allow-Headers", "value": "Content-Type, Authorization" }
            ]
          }
        }
      },
      "id": "1",
      "name": "Webhook Trigger",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [250, 300]
    },
    {
      "parameters": {
        "options": {},
        "respondWith": "json",
        "responseBody": "={\\n  \\\"reply\\\": \\\"Hello from your n8n workflow! Received: \\\" + $json.body.message\\n}"
      },
      "id": "2",
      "name": "Respond to Webhook",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.1,
      "position": [550, 300]
    }
  ],
  "connections": {
    "Webhook Trigger": {
      "main": [
        [
          {
            "node": "Respond to Webhook",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}`;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white shrink-0 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Developer Reference & Guide</span>
            </div>
            <h2 className="text-2xl font-bold font-display text-white">
              Connecting Trip Pilot to your n8n Backend
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl">
              Step-by-step checklist of everything you need to configure in n8n so the chatbot talks to your workflows seamlessly.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 text-slate-800 text-sm">
          
          {/* Section 1: Overview */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-200 flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block font-semibold mb-1">What is n8n?</strong>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                n8n is an open-source workflow automation platform (like Zapier, but self-hostable and node-based). It allows you to build AI agents, connect databases (like Postgres, Airtable, Notion), or trigger email/WhatsApp notifications when a traveler messages your chatbot.
              </p>
            </div>
          </div>

          {/* Section 2: The 4 Things you MUST take care of */}
          <div>
            <h3 className="text-lg font-bold font-display text-slate-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>4 Critical Things to Take Care Of in n8n</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Item 1: CORS */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    01. Browser CORS Headers
                  </span>
                  <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded font-bold">
                    MUST CONFIGURE
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Because this landing page runs in a web browser, requests to your n8n server will be blocked by browser CORS policy unless n8n sends cross-origin headers.
                </p>
                <div className="p-2.5 bg-slate-900 rounded-lg text-[11px] font-mono text-amber-300">
                  Access-Control-Allow-Origin: *<br />
                  Access-Control-Allow-Methods: POST, OPTIONS<br />
                  Access-Control-Allow-Headers: Content-Type
                </div>
                <p className="text-[11px] text-slate-500">
                  👉 In n8n Webhook Node, click <strong>"Add Option" → "Response Headers"</strong> and insert these.
                </p>
              </div>

              {/* Item 2: HTTPS / Mixed Content */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    02. HTTPS Endpoint
                  </span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">
                    SSL REQUIRED
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  This website is served over <strong>HTTPS</strong>. Browsers prohibit "Mixed Content" (calling an insecure <code>http://</code> address from an HTTPS site).
                </p>
                <p className="text-xs text-slate-600">
                  If running n8n on <code>localhost:5678</code>, expose it using a free tunnel:
                </p>
                <div className="p-2 bg-slate-900 rounded-lg text-[11px] font-mono text-emerald-400">
                  ngrok http 5678
                </div>
                <p className="text-[11px] text-slate-500">
                  Then copy the <code>https://xxxx.ngrok-free.app/webhook/...</code> URL into Trip Pilot settings.
                </p>
              </div>

              {/* Item 3: Respond to Webhook Node */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    03. "Respond to Webhook" Node
                  </span>
                  <span className="text-[10px] bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded font-bold">
                    N8N LOGIC
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  By default, n8n responds with <em>"Workflow got started"</em>. To send real answers back to the chat:
                </p>
                <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                  <li>In Webhook node, change <strong>"Respond"</strong> to <strong>"Using 'Respond to Webhook' Node"</strong>.</li>
                  <li>Add a <strong>Respond to Webhook</strong> node at the end of your workflow.</li>
                  <li>Set response body to: <code>&#123; "reply": "your answer here" &#125;</code></li>
                </ul>
              </div>

              {/* Item 4: Test vs Production URL */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    04. Test vs Production URL
                  </span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-bold">
                    LIFECYCLE
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  n8n provides two distinct webhook URLs:
                </p>
                <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                  <li><strong>Test URL:</strong> Only triggers when you click <em>"Listen for test event"</em> in the n8n canvas.</li>
                  <li><strong>Production URL:</strong> Works 24/7 once you flip the workflow switch to <strong>"Active"</strong>.</li>
                </ul>
              </div>

            </div>
          </div>

          {/* Section 3: Request Payload Format */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold font-display text-slate-900">
                Payload Schema Sent by Trip Pilot
              </h3>
              <button
                onClick={() => copyToClipboard(samplePayload, 'payload')}
                className="text-xs font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
              >
                {copiedSection === 'payload' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'payload' ? 'Copied!' : 'Copy JSON'}</span>
              </button>
            </div>
            <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
              {samplePayload}
            </pre>
          </div>

          {/* Section 4: Expected Response Format */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold font-display text-slate-900">
                Expected Response JSON From n8n
              </h3>
              <button
                onClick={() => copyToClipboard(sampleResponse, 'response')}
                className="text-xs font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
              >
                {copiedSection === 'response' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'response' ? 'Copied!' : 'Copy JSON'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-2">
              Trip Pilot automatically looks for <code>reply</code>, <code>output</code>, <code>text</code>, or <code>message</code> fields, or parses plain text.
            </p>
            <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
              {sampleResponse}
            </pre>
          </div>

          {/* Section 5: Copy-Paste Starter Workflow JSON */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold font-display text-slate-900 flex items-center gap-2">
                <Workflow className="w-4 h-4 text-amber-600" />
                <span>Ready-to-Paste Starter n8n Workflow</span>
              </h3>
              <button
                onClick={() => copyToClipboard(starterWorkflowJson, 'workflow')}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                {copiedSection === 'workflow' ? <Check className="w-3.5 h-3.5 text-emerald-800" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'workflow' ? 'Copied to Clipboard!' : 'Copy n8n Workflow JSON'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-600 mb-3">
              You can copy this JSON, open any n8n workflow canvas, and press <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-800 font-mono text-[10px]">Ctrl+V</kbd> (or <kbd className="px-1.5 py-0.5 bg-slate-200 rounded text-slate-800 font-mono text-[10px]">Cmd+V</kbd>) to instantly paste the pre-configured Webhook + Response nodes!
            </p>
            <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs font-mono overflow-x-auto max-h-48 leading-relaxed border border-slate-800">
              {starterWorkflowJson}
            </pre>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-slate-500">
            Trip Pilot works out-of-the-box in Demo Simulator mode while you configure n8n.
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenSettings();
              }}
              className="px-4 py-2.5 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors cursor-pointer"
            >
              Open Webhook Settings in Chat
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
            >
              Got It, Close Guide
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
