export type Language = 'en' | 'es' | 'de' | 'mixed';
export type LeadType = 'buyer' | 'seller' | 'rental';
export type Temperature = 'hot' | 'warm' | 'cold';

export interface ExtractedData {
  budget?: string;
  location?: string;
  propertyType?: string;
  bedrooms?: string;
  timeline?: string;
  viewingRequested: boolean;
  urgency: boolean;
}

export interface CRMField {
  label: string;
  value: string;
}

export interface QualificationFactor {
  label: string;
  positive: boolean;
}

export interface DemoResult {
  language: Language;
  languageLabel: string;
  languageFlag: string;
  languageConfidence: number;
  leadType: LeadType;
  leadTypeLabel: string;
  extracted: ExtractedData;
  score: number;
  temperature: Temperature;
  factors: QualificationFactor[];
  crmFields: CRMField[];
  aiResponse: string;
  alertSnippet?: string;
}

const SP_KW = ['hola', 'busco', 'buscamos', 'quiero', 'queremos', 'alquiler', 'alquilar', 'habitacion', 'habitaciones', 'piso', 'casa', 'villa', 'precio', 'zona', 'dormitorio', 'euros', 'presupuesto', 'mudarnos', 'interesado', 'gracias', 'buenos', 'tardes', 'noches', 'tengo', 'tenemos', 'comprar', 'compra'];
const DE_KW = ['guten', 'ich', 'wir', 'mein', 'eine', 'immobilien', 'kaufen', 'mieten', 'zimmer', 'interessiere', 'suche', 'suchen', 'schlafzimmer', 'danke', 'möchte', 'wurde', 'bitte', 'haben', 'sind', 'villa', 'euro'];

const LOCATIONS = ['marbella', 'málaga', 'malaga', 'nerja', 'fuengirola', 'torremolinos', 'benalmádena', 'benalmadena', 'estepona', 'sotogrande', 'puerto banús', 'puerto banus', 'costa del sol', 'mijas', 'la cala', 'benahavís', 'benahavis', 'alhaurin', 'vélez', 'velez', 'manilva', 'casares', 'ronda', 'frigiliana', 'competa', 'torrox'];

export function analyzeInput(message: string, source: string): DemoResult {
  const text = message.trim();
  const lower = text.toLowerCase();

  // ── Language ──
  const spCount = SP_KW.filter(w => lower.includes(w)).length;
  const deCount = DE_KW.filter(w => lower.includes(w)).length;

  let language: Language, languageLabel: string, languageFlag: string, languageConfidence: number;

  if (deCount >= 2 && deCount >= spCount) {
    language = 'de'; languageLabel = 'German'; languageFlag = '🇩🇪';
    languageConfidence = Math.min(97, 68 + deCount * 6);
  } else if (spCount >= 2) {
    language = 'es'; languageLabel = 'Spanish'; languageFlag = '🇪🇸';
    languageConfidence = Math.min(98, 72 + spCount * 5);
  } else if (spCount === 1 && deCount === 1) {
    language = 'mixed'; languageLabel = 'Mixed'; languageFlag = '🌐';
    languageConfidence = 71;
  } else {
    language = 'en'; languageLabel = 'English'; languageFlag = '🇬🇧';
    languageConfidence = 96;
  }

  // ── Lead Type ──
  const sellerKw = ['selling', 'sell my', 'want to sell', 'looking to sell', 'vender', 'vendo', 'quiero vender', 'mi propiedad', 'my property', 'my apartment', 'my villa', 'my house', 'meine wohnung', 'mein haus', 'verkaufen', 'valuation', 'appraisal', 'tasacion', 'my flat'];
  const rentalKw = ['rent', 'rental', 'renting', 'long-term', 'monthly', 'alquiler', 'alquilar', 'en alquiler', 'mieten', 'miete', '/month', 'per month', 'al mes', 'por mes'];

  const isSeller = sellerKw.some(w => lower.includes(w));
  const isRental = rentalKw.some(w => lower.includes(w));

  let leadType: LeadType, leadTypeLabel: string;
  if (isSeller) {
    leadType = 'seller';
    leadTypeLabel = language === 'es' ? 'Propietario vendedor' : language === 'de' ? 'Verkäufer' : 'Seller Lead';
  } else if (isRental) {
    leadType = 'rental';
    leadTypeLabel = language === 'es' ? 'Búsqueda de alquiler' : language === 'de' ? 'Mietsuche' : 'Rental Inquiry';
  } else {
    leadType = 'buyer';
    leadTypeLabel = language === 'es' ? 'Comprador potencial' : language === 'de' ? 'Kaufinteressent' : 'Buyer Lead';
  }

  // ── Extraction ──
  let budget: string | undefined;
  const bm = text.match(/[€£$]\s*[\d,\.]+\s*(?:m|M|k|K|million|millón|millon)?|[\d,\.]+\s*(?:million|millón|M)\s*euro(?:s)?|[\d,\.]+\s*k\s*euro(?:s)?|[\d,\.]+[,\.]000\s*euro(?:s)?/i);
  if (bm) budget = bm[0].trim().replace(/\s+/g, ' ');

  let location: string | undefined;
  for (const loc of LOCATIONS) {
    if (lower.includes(loc)) {
      location = loc.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      break;
    }
  }

  let propertyType: string | undefined;
  if (/penthouse|ático|atico/i.test(text)) propertyType = 'Penthouse';
  else if (/villa/i.test(text)) propertyType = 'Villa';
  else if (/townhouse|adosado/i.test(text)) propertyType = 'Townhouse';
  else if (/apartment|apartamento|piso/i.test(text)) propertyType = 'Apartment';
  else if (/studio|estudio/i.test(text)) propertyType = 'Studio';

  let bedrooms: string | undefined;
  const bdr = text.match(/(\d+)\s*(?:\+)?\s*(?:bed(?:room)?s?|habitaci[oó]n(?:es)?|schlafzimmer|zimmer)/i);
  if (bdr) bedrooms = `${bdr[1]}+ bed`;

  let timeline: string | undefined;
  if (/this week|esta semana/i.test(text)) timeline = 'This week';
  else if (/next week|próxima semana|proxima semana/i.test(text)) timeline = 'Next week';
  else if (/this month|este mes/i.test(text)) timeline = 'This month';
  else if (/next month|próximo mes|el mes que viene/i.test(text)) timeline = 'Next month';
  else if (/july|julio/i.test(text)) timeline = 'July';
  else if (/august|agosto/i.test(text)) timeline = 'August';
  else if (/september|septiembre/i.test(text)) timeline = 'September';
  else if (/october|octubre/i.test(text)) timeline = 'October';
  else if (/asap|urgent|urgente|immediately|inmediatamente/i.test(text)) timeline = 'ASAP';
  else { const mm = text.match(/in\s+(\d+)\s+(?:months?|semanas?)/i); if (mm) timeline = `${mm[1]} months`; }

  const viewingRequested = /viewing|visita|visitar|ver pisos?|ver la propiedad|appointment|cita|flying in|coming to spain|coming over|visit/i.test(text);
  const urgency = /urgent|urgente|asap|immediately|this week|esta semana|as soon as possible/i.test(text);

  const extracted: ExtractedData = { budget, location, propertyType, bedrooms, timeline, viewingRequested, urgency };

  // ── Score ──
  let score = 18;
  const factors: QualificationFactor[] = [];

  if (budget) { score += 26; factors.push({ label: 'Budget confirmed', positive: true }); }
  else { factors.push({ label: 'No budget specified', positive: false }); }

  if (location) { score += 16; factors.push({ label: `Location: ${location}`, positive: true }); }
  else { factors.push({ label: 'Location not stated', positive: false }); }

  if (timeline) { score += 20; factors.push({ label: `Timeline: ${timeline}`, positive: true }); }
  else { factors.push({ label: 'Timeline unclear', positive: false }); }

  if (viewingRequested) { score += 18; factors.push({ label: 'Viewing interest confirmed', positive: true }); }
  if (bedrooms) { score += 6; factors.push({ label: bedrooms, positive: true }); }
  if (propertyType) { score += 6; factors.push({ label: propertyType + ' specified', positive: true }); }
  if (urgency) { score += 8; factors.push({ label: 'High urgency signal', positive: true }); }
  if (leadType === 'seller') { score = Math.max(score, 42); factors.push({ label: 'Listing opportunity', positive: true }); }

  score = Math.min(100, Math.max(8, score));
  const temperature: Temperature = score >= 75 ? 'hot' : score >= 45 ? 'warm' : 'cold';

  // ── CRM Fields ──
  const crmFields: CRMField[] = [
    { label: 'Lead Type', value: leadTypeLabel },
    { label: 'Language', value: `${languageFlag} ${languageLabel}` },
    { label: 'Channel', value: source },
    { label: 'Temperature', value: temperature.charAt(0).toUpperCase() + temperature.slice(1) },
  ];
  if (budget) crmFields.push({ label: 'Budget', value: budget });
  if (location) crmFields.push({ label: 'Location', value: location });
  if (propertyType) crmFields.push({ label: 'Property Type', value: propertyType });
  if (bedrooms) crmFields.push({ label: 'Bedrooms', value: bedrooms });
  if (timeline) crmFields.push({ label: 'Timeline', value: timeline });
  crmFields.push({ label: 'Viewing Req.', value: viewingRequested ? 'Yes' : 'No' });
  crmFields.push({ label: 'Lead Score', value: `${score} / 100` });

  // ── AI Response ──
  const loc = location ?? (language === 'es' ? 'la zona' : language === 'de' ? 'der Gegend' : 'the area');
  let aiResponse: string;

  if (language === 'es') {
    if (leadType === 'seller') {
      aiResponse = `Muchas gracias por contactarnos. Me encantaría conocer más sobre su propiedad en ${loc} y darle una valoración actualizada del mercado. ¿Le vendría bien una llamada breve esta semana para comentar los detalles?`;
    } else if (leadType === 'rental') {
      aiResponse = `Hola, gracias por escribir. Tenemos opciones de alquiler en ${loc} que pueden encajar con lo que busca. Le preparo una selección esta misma tarde. ¿Tiene disponibilidad para una llamada rápida para ajustar los detalles?`;
    } else if (temperature === 'hot') {
      aiResponse = `Muchas gracias por su consulta. Tenemos propiedades en ${loc} que encajan perfectamente con lo que describe${timeline ? ` y con su disponibilidad para ${timeline.toLowerCase()}` : ''}. Me gustaría coordinar los detalles cuanto antes. ¿Cuándo podría hablar unos minutos?`;
    } else {
      aiResponse = `Gracias por contactarnos. He anotado sus preferencias en ${loc} y le preparo una selección de propiedades. ¿Le va bien recibirla por email o prefiere que le llamemos?`;
    }
  } else if (language === 'de') {
    if (temperature === 'hot') {
      aiResponse = `Vielen Dank für Ihre Anfrage. Wir haben mehrere Immobilien in ${loc}, die Ihren Anforderungen sehr gut entsprechen${timeline ? ` und für ${timeline.toLowerCase()} verfügbar sind` : ''}. Wäre ein kurzes Gespräch möglich, um die Details abzustimmen?`;
    } else {
      aiResponse = `Guten Tag, vielen Dank für Ihre Nachricht. Ich stelle gerne eine Auswahl passender Immobilien in ${loc} zusammen und sende sie Ihnen zu. Wäre ein kurzes Telefonat möglich?`;
    }
  } else {
    if (leadType === 'seller') {
      aiResponse = `Thank you for reaching out. We'd love to arrange a brief appraisal for your property in ${loc} — it's a strong market and it's worth understanding your options. Could we schedule a quick call this week?`;
    } else if (leadType === 'rental') {
      aiResponse = `Thanks for your message. We have rental options in ${loc} that could work well for what you're describing. I'll put together a curated selection and send it across shortly. Would a quick call help to narrow things down?`;
    } else if (temperature === 'hot') {
      aiResponse = `Thank you for reaching out. Based on your requirements, I'm already pulling together the best options in ${loc}${timeline ? ` with your ${timeline.toLowerCase()} visit in mind` : ''}. I'd love a brief call to align on the details before we confirm the viewings — when works best for you?`;
    } else if (temperature === 'warm') {
      aiResponse = `Thanks for your message. We have properties in ${loc} that could match what you're looking for. I'll prepare a tailored selection and send it across. Would email work, or would you prefer a quick call to go through what's available?`;
    } else {
      aiResponse = `Thank you for your interest. I've noted your criteria and will keep you updated as relevant properties come to market. Feel free to reach out anytime if you'd like more details on what's currently available.`;
    }
  }

  // ── Alert ──
  let alertSnippet: string | undefined;
  if (temperature === 'hot') {
    const parts: string[] = [];
    if (budget) parts.push(budget);
    if (location) parts.push(location);
    if (viewingRequested) parts.push('Viewing requested');
    if (timeline) parts.push(timeline);
    alertSnippet = parts.join(' · ') || 'High-intent lead detected';
  }

  return { language, languageLabel, languageFlag, languageConfidence, leadType, leadTypeLabel, extracted, score, temperature, factors, crmFields, aiResponse, alertSnippet };
}

export const EXAMPLE_LEADS: Array<{ label: string; source: string; message: string }> = [
  {
    label: 'Luxury Villa Buyer',
    source: 'WhatsApp',
    message: "Hi, I'm looking for a luxury villa in Marbella — ideally 4+ bedrooms with a pool. Our budget is around €2.5M. We're flying in from London next month specifically to view properties.",
  },
  {
    label: 'German Investor',
    source: 'Email',
    message: "Guten Tag, ich interessiere mich für Kapitalanlage-Immobilien in der Gegend von Málaga. Mein Budget liegt bei etwa 500.000 bis 700.000 Euro. Haben Sie derzeit interessante Objekte?",
  },
  {
    label: 'Spanish Family Rental',
    source: 'Idealista',
    message: "Hola, buscamos un piso en alquiler en Nerja para mudarnos en septiembre. Somos una familia de 4 personas, necesitamos al menos 3 habitaciones. Presupuesto máximo 1.200 euros al mes.",
  },
  {
    label: 'Urgent Relocation',
    source: 'WhatsApp',
    message: "URGENT — we need a long-term rental in Fuengirola starting July 1st. Max €2,000/month, 2+ bedrooms minimum. We're relocating from Amsterdam for work. Can we arrange viewings this week?",
  },
  {
    label: 'Seller Lead',
    source: 'Web Form',
    message: "Hello, I'm thinking about selling my apartment in Torremolinos. It's a 2-bed with sea views, around 85sqm. Not in a rush but curious about current market prices in the area.",
  },
  {
    label: 'Cold Inquiry',
    source: 'Fotocasa',
    message: "Hello, just browsing your listings. What properties do you currently have available under €200k? Looking for something small.",
  },
  {
    label: 'British Buyer',
    source: 'WhatsApp',
    message: "Good morning! We've been looking in Estepona for a while. Budget is €650k, looking for a 3-bed villa or townhouse. We have a viewing trip planned for August — can you suggest some options?",
  },
  {
    label: 'Penthouse Buyer',
    source: 'Email',
    message: "Hi, I'm searching for a penthouse in Marbella Golden Mile or Puerto Banús area. Budget up to €3M. I'd like to arrange viewings as soon as possible — this week if at all feasible.",
  },
];
