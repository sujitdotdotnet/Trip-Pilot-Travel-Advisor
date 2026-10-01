import { N8nConfig } from '../types/travel';

const STORAGE_KEY = 'trippilot_n8n_config';

export function getStoredN8nConfig(): N8nConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Failed to parse stored n8n config', err);
  }

  // Default initial configuration:
  // Starts in Demo/Simulator mode with sample placeholder URL
  return {
    webhookUrl: '',
    isLiveMode: false,
    customSessionId: 'pilot_session_' + Math.random().toString(36).substring(2, 9)
  };
}

export function saveN8nConfig(config: N8nConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save n8n config', err);
  }
}

export interface SendMessageOptions {
  message: string;
  config: N8nConfig;
  context?: {
    activeCategory?: string;
    viewedBundle?: string;
    source?: string;
  };
}

export interface SendMessageResult {
  reply: string;
  isMock: boolean;
  rawResponse?: any;
  error?: string;
  debugDetails?: {
    endpoint: string;
    requestPayload: any;
    status?: number;
    latencyMs?: number;
  };
}

export async function sendMessageToN8n({
  message,
  config,
  context
}: SendMessageOptions): Promise<SendMessageResult> {
  const startTime = Date.now();
  const payload = {
    message,
    sessionId: config.customSessionId,
    userId: 'traveler_guest',
    timestamp: new Date().toISOString(),
    source: 'Trip Pilot Web Assistant',
    context: {
      ...context,
      origin: typeof window !== 'undefined' ? window.location.origin : '',
      pathname: typeof window !== 'undefined' ? window.location.pathname : '/'
    }
  };

  // If live mode is toggled on and an endpoint is provided, try sending real request
  if (config.isLiveMode && config.webhookUrl.trim()) {
    const endpoint = config.webhookUrl.trim();

    // Check for mixed content warning (HTTP on HTTPS)
    const isHttpsPage = typeof window !== 'undefined' && window.location.protocol === 'https:';
    if (isHttpsPage && endpoint.startsWith('http://') && !endpoint.includes('localhost')) {
      return {
        reply: `⚠️ Mixed Content Error: Your page is loaded over HTTPS, but your n8n webhook URL uses HTTP (${endpoint}). Modern browsers block non-SSL HTTP requests. Please use an HTTPS endpoint (e.g., via ngrok, Cloudflare Tunnel, or n8n Cloud).`,
        isMock: false,
        error: 'Mixed Content Error: HTTPS cannot fetch HTTP endpoint.',
        debugDetails: {
          endpoint,
          requestPayload: payload,
          latencyMs: Date.now() - startTime
        }
      };
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*'
      };

      if (config.authHeader?.trim()) {
        headers['Authorization'] = config.authHeader.trim();
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      const latencyMs = Date.now() - startTime;

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        return {
          reply: `⚠️ Received HTTP ${response.status} from n8n webhook (${response.statusText}).\nMake sure your n8n workflow is active, or use a "Respond to Webhook" node inside n8n to send back an AI or JSON response.`,
          isMock: false,
          error: `HTTP ${response.status}: ${errorText || response.statusText}`,
          debugDetails: {
            endpoint,
            requestPayload: payload,
            status: response.status,
            latencyMs
          }
        };
      }

      // Try reading response
      const rawText = await response.text();
      let parsedData: any = null;
      try {
        parsedData = JSON.parse(rawText);
      } catch {
        parsedData = rawText;
      }

      // Extract conversational reply from common n8n AI / Webhook response formats:
      let reply = '';
      if (typeof parsedData === 'string') {
        reply = parsedData;
      } else if (Array.isArray(parsedData) && parsedData.length > 0) {
        const first = parsedData[0];
        reply = first.output || first.text || first.reply || first.message || first.response || JSON.stringify(first);
      } else if (typeof parsedData === 'object' && parsedData !== null) {
        reply = parsedData.output ||
          parsedData.reply ||
          parsedData.text ||
          parsedData.message ||
          parsedData.response ||
          parsedData.data?.text ||
          JSON.stringify(parsedData, null, 2);
      } else {
        reply = String(parsedData);
      }

      if (!reply || reply.trim() === '' || reply === '{}') {
        reply = '✅ n8n Webhook received your message successfully, but returned an empty response. In your n8n workflow, add a "Respond to Webhook" node or an "AI Agent" node to return message text!';
      }

      return {
        reply,
        isMock: false,
        rawResponse: parsedData,
        debugDetails: {
          endpoint,
          requestPayload: payload,
          status: response.status,
          latencyMs
        }
      };
    } catch (err: any) {
      const latencyMs = Date.now() - startTime;
      let errorMsg = err.message || 'Network request failed';
      let friendlyNote = '';

      if (err.name === 'AbortError') {
        friendlyNote = 'The request to your n8n instance timed out after 20 seconds. Make sure your n8n server is reachable and responsive.';
      } else if (errorMsg.includes('Failed to fetch') || errorMsg.includes('NetworkError') || errorMsg.includes('CORS')) {
        friendlyNote = `CORS or Network Block detected!
When calling n8n from browser JavaScript:
1. In your n8n Webhook node, click "Add Option" -> "Response Headers" and set:
   • Access-Control-Allow-Origin: *
   • Access-Control-Allow-Methods: POST, OPTIONS
   • Access-Control-Allow-Headers: Content-Type, Authorization
2. If running n8n locally on localhost:5678, expose it with an HTTPS tunnel (e.g. 'ngrok http 5678' or Cloudflare Tunnel) because browsers restrict cross-origin requests to private subnets.`;
      }

      return {
        reply: `⚠️ Connection to n8n webhook failed: ${errorMsg}\n\n${friendlyNote}\n\n(Tip: You can switch to "Demo Mode (Mock)" in Chat Settings to test the UI experience without an active n8n instance!)`,
        isMock: false,
        error: errorMsg,
        debugDetails: {
          endpoint,
          requestPayload: payload,
          latencyMs
        }
      };
    }
  }

  // --- DEMO / MOCK SIMULATOR ---
  // Realistic conversational assistant simulating a travel flight-crew advisor
  await new Promise((resolve) => setTimeout(resolve, 600)); // natural typing delay

  const lower = message.toLowerCase();
  let mockReply = '';

  if (lower.includes('stranger') || lower.includes('solo') || lower.includes('squad') || lower.includes('group')) {
    mockReply = `🎒 **Trip Pilot Stranger Bundles** are built for solo travelers who want company without feeling like they're on a rigid bus tour!

Here is how we curate our Stranger squads:
1. **Pacing & Lifestyle Match**: We group 8–12 travelers who share similar energy (e.g. dawn hikes vs night stargazing, budget vs luxury).
2. **Dedicated Expedition Pilot**: An experienced local lead handles all driving, permits, and routes.
3. **Featured Expeditions**:
   • *Iceland Ring Road & Aurora Hunt* (7 Days — glaciers & hot spring campfires)
   • *Inca Trail & Sacred Valley Cohort* (8 Days — high altitude Andean team trek)
   • *Vietnam Motorcycle Food Safari* (9 Days — street markets & Ha Long Bay)

Would you like to browse current departure dates or check our matchmaking quiz?`;
  } else if (lower.includes('couple') || lower.includes('romantic') || lower.includes('honeymoon') || lower.includes('partner')) {
    mockReply = `🥂 **Couple Bundles** are curated for stillness, intimacy, and zero-headache romance.

Popular destinations in our collection:
• **Santorini & Oia Caldera**: Private cliffside plunge pool suite, wine cave tastings, and pre-booked tables with uninterrupted sunset views.
• **Kyoto & Hakone**: Century-old riverfront machiya, private cedar-wood onsens, and dawn bamboo walks before tourists arrive.
• **Amalfi Coast & Positano**: Vintage convertible hire, secluded cove boat charters, and cliffside lemon grove dining.

All couple packages include private transfers and our 24/7 on-call concierge so you never wait in lines or worry about reservations!`;
  } else if (lower.includes('family') || lower.includes('kid') || lower.includes('children') || lower.includes('parent')) {
    mockReply = `👨‍👩‍👧‍👦 **Family Bundles** solve the biggest headache of traveling with kids: logistics and exhaustion!

Every family route includes:
• **Station-to-Station Luggage Forwarding**: We move your heavy bags so you only travel with daypacks.
• **Tested Child-Friendly Pacing**: No 6 AM checkouts or grueling 8-hour drives.
• **Interactive Experiences**: Hands-on Swiss chocolate crafting, wildlife sloth spotting in Costa Rica, or kid-friendly alpine trottibikes.
• **Family-Interconnecting Suites**: Vetted accommodations with space for everyone to relax.

How old are your children, and what kind of landscape do they love most?`;
  } else if (lower.includes('custom') || lower.includes('plan') || lower.includes('tailor') || lower.includes('request')) {
    mockReply = `🗺️ **Custom Itinerary Planning** is our specialty!

If none of our ready-to-book bundles fit your exact vision:
1. Fill out our on-page **Custom Planner** with your desired dates, countries, and style.
2. One of our human Travel Pilots reviews flight corridors, seasonal weather patterns, and off-beat boutique gems.
3. You receive an interactive digital day-by-day blueprint with GPS waypoints, reserved tables, and 24/7 WhatsApp emergency support.

You can also tell me right now: **Where are you hoping to go, for how many days, and what is your ideal budget?**`;
  } else if (lower.includes('n8n') || lower.includes('webhook') || lower.includes('backend') || lower.includes('workflow')) {
    mockReply = `⚡ **n8n Connectivity Status**:
You are currently running in **Demo Simulator Mode**.

To connect this chat to your real **n8n Workflow**:
1. Click the **⚙️ Settings** icon in the chat header or the "n8n Setup" button in the navigation.
2. Enter your n8n **Webhook URL** (e.g. \`https://your-n8n.cloud/webhook/trip-pilot\`).
3. Toggle on **Live n8n Webhook Mode**.
4. In n8n, ensure your Webhook node returns a JSON response (using an **"Respond to Webhook"** node) and enables CORS:
   \`Access-Control-Allow-Origin: *\`

All subsequent messages you send here will immediately post to your n8n workflow!`;
  } else if (lower.includes('price') || lower.includes('cost') || lower.includes('budget') || lower.includes('how much')) {
    mockReply = `💰 **Trip Pilot Transparent Pricing**:
• **Couple Bundles**: From $2,400 to $3,200 per couple (includes boutique stays, private transfers, and premier excursions).
• **Family Bundles**: From $3,800 to $4,500 per family of 4 (includes Swiss travel passes or private vans, activities, and luggage forwarding).
• **Stranger Squad Bundles**: From $1,800 to $2,200 per solo traveler (includes shared or private room, 4x4 transport, permits, and expedition leader).
• **Custom Itinerary Design**: $249 flat planning fee (credited back if you book boutique stays through our partner rates).`;
  } else {
    mockReply = `Hello! I'm your **Trip Pilot Concierge**. 

Whether you're looking for an intimate **Couple getaway**, a stress-free **Family expedition**, or want to join a small squad of **fellow solo travelers** on a Stranger Bundle, I'm here to help navigate.

You can also ask me about **Custom Itinerary Planning**, or click **⚙️ Settings** above to link this chat widget directly to your **n8n automation backend**!

Where is your dream destination right now?`;
  }

  return {
    reply: mockReply,
    isMock: true,
    debugDetails: {
      endpoint: 'Local Mock Travel Pilot Simulator',
      requestPayload: payload,
      latencyMs: Date.now() - startTime
    }
  };
}

export async function testN8nWebhook(
  url: string,
  authHeader?: string
): Promise<{ success: boolean; status?: number; responseText: string; latencyMs: number; error?: string }> {
  const startTime = Date.now();
  const endpoint = url.trim();

  if (!endpoint) {
    return {
      success: false,
      responseText: '',
      latencyMs: 0,
      error: 'Webhook URL cannot be empty.'
    };
  }

  const payload = {
    event: 'ping_test',
    message: 'Trip Pilot ping test from web interface',
    timestamp: new Date().toISOString(),
    source: 'Trip Pilot Settings'
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (authHeader?.trim()) {
      headers['Authorization'] = authHeader.trim();
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    const latencyMs = Date.now() - startTime;
    const responseText = await res.text().catch(() => '');

    if (res.ok) {
      return {
        success: true,
        status: res.status,
        responseText: responseText || 'OK (Empty body returned)',
        latencyMs
      };
    } else {
      return {
        success: false,
        status: res.status,
        responseText: responseText || res.statusText,
        latencyMs,
        error: `HTTP ${res.status}: ${res.statusText}`
      };
    }
  } catch (err: any) {
    const latencyMs = Date.now() - startTime;
    let errMsg = err.message || 'Ping failed';
    if (errMsg.includes('Failed to fetch') || errMsg.includes('NetworkError')) {
      errMsg = 'CORS / Network Error: Could not connect. Ensure n8n is running, has CORS headers configured, and uses HTTPS.';
    }
    return {
      success: false,
      responseText: '',
      latencyMs,
      error: errMsg
    };
  }
}
