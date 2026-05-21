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

const SP_KW = ['hola', 'busco', 'buscamos', 'quiero', 'queremos', 'alquiler', 'alquilar', 'habitacion', 'habitaciones', 'piso', 'casa', 'villa', 'precio', 'zona', 'dormitorio', 'euros', 'presupuesto', 'mudarnos', 'interesado', 'gracias', 'buenos', 'tardes', 'noches', 'tengo', 'tenemos', 'comprar', 'compra', 'tienen', 'disponible', 'llamar', 'semana'];
const DE_KW = ['guten', 'ich', 'wir', 'mein', 'eine', 'immobilien', 'kaufen', 'mieten', 'zimmer', 'interessiere', 'suche', 'suchen', 'schlafzimmer', 'danke', 'möchte', 'wurde', 'bitte', 'haben', 'sind', 'villa', 'euro', 'budget', 'liegt', 'gegend', 'objekte', 'meerblick'];

const LOCATIONS = ['marbella', 'málaga', 'malaga', 'nerja', 'fuengirola', 'torremolinos', 'benalmádena', 'benalmadena', 'estepona', 'sotogrande', 'puerto banús', 'puerto banus', 'costa del sol', 'mijas', 'la cala', 'benahavís', 'benahavis', 'alhaurin', 'vélez', 'velez', 'manilva', 'casares', 'ronda', 'frigiliana', 'competa', 'torrox', 'golden mile', 'nueva andalucia', 'sierra blanca'];

export function analyzeInput(message: string, source: string): DemoResult {
  const text = message.trim();
  const lower = text.toLowerCase();

  // ── Language ──
  const spCount = SP_KW.filter(w => lower.includes(w)).length;
  const deCount = DE_KW.filter(w => lower.includes(w)).length;

  let language: Language, languageLabel: string, languageFlag: string;

  if (deCount >= 2 && deCount >= spCount) {
    language = 'de'; languageLabel = 'German'; languageFlag = '🇩🇪';
  } else if (spCount >= 2) {
    language = 'es'; languageLabel = 'Spanish'; languageFlag = '🇪🇸';
  } else if (spCount === 1 && deCount === 1) {
    language = 'mixed'; languageLabel = 'Mixed'; languageFlag = '🌐';
  } else {
    language = 'en'; languageLabel = 'English'; languageFlag = '🇬🇧';
  }

  // ── Lead Type ──
  const sellerKw = ['selling', 'sell my', 'want to sell', 'looking to sell', 'vender', 'vendo', 'quiero vender', 'mi propiedad', 'my property', 'my apartment', 'my villa', 'my house', 'meine wohnung', 'mein haus', 'verkaufen', 'valuation', 'appraisal', 'tasacion', 'my flat', 'thinking about selling', 'what would', 'what is it worth', 'realistic price'];
  const rentalKw = ['rent', 'rental', 'renting', 'long-term', 'monthly', 'alquiler', 'alquilar', 'en alquiler', 'mieten', 'miete', '/month', 'per month', 'al mes', 'por mes', '€1,', '€2,', 'month-to-month'];

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
  const bm = text.match(
    /[€£$]\s*[\d,\.]+\s*(?:m(?:illion)?|k|M|K)?(?:\s*[-–]\s*[€£$]?\s*[\d,\.]+\s*(?:m(?:illion)?|k|M|K)?)?|[\d,\.]+\s*(?:million|millón|M)\s*euro(?:s)?|[\d,\.]+\s*k\s*euro(?:s)?|[\d\.]+[,\.][\d]{3}\s*(?:bis\s+[\d\.]+[,\.][\d]{3}\s*)?euro(?:s)?/i
  );
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
  const bdr = text.match(/(\d)\+?\s*(?:bed(?:room)?s?|habitaci[oó]n(?:es)?|schlafzimmer|zimmer)/i);
  if (bdr) bedrooms = `${bdr[1]}+ bed`;

  let timeline: string | undefined;
  if (/this week|esta semana/i.test(text)) timeline = 'This week';
  else if (/next week|próxima semana|proxima semana/i.test(text)) timeline = 'Next week';
  else if (/this month|este mes/i.test(text)) timeline = 'This month';
  else if (/next month|próximo mes|el mes que viene|siguiente mes/i.test(text)) timeline = 'Next month';
  else if (/jan(?:uary)?|enero/i.test(text)) timeline = 'January';
  else if (/feb(?:ruary)?|febrero/i.test(text)) timeline = 'February';
  else if (/mar(?:ch)?|marzo/i.test(text)) timeline = 'March';
  else if (/apr(?:il)?|abril/i.test(text)) timeline = 'April';
  else if (/may|mayo/i.test(text)) timeline = 'May';
  else if (/june?|junio/i.test(text)) timeline = 'June';
  else if (/july?|julio/i.test(text)) timeline = 'July';
  else if (/aug(?:ust)?|agosto/i.test(text)) timeline = 'August';
  else if (/sep(?:tember)?|septiembre/i.test(text)) timeline = 'September';
  else if (/oct(?:ober)?|octubre/i.test(text)) timeline = 'October';
  else if (/nov(?:ember)?|noviembre/i.test(text)) timeline = 'November';
  else if (/dec(?:ember)?|diciembre/i.test(text)) timeline = 'December';
  else if (/asap|urgent|urgente|immediately|inmediatamente/i.test(text)) timeline = 'ASAP';
  else {
    const mm = text.match(/in\s+(\d+)\s+(?:months?|semanas?)/i);
    if (mm) timeline = `${mm[1]} months`;
  }

  const viewingRequested = /viewing|visita|visitar|ver pisos?|ver la propiedad|appointment|cita|flying in|coming to spain|coming over|visit|viewings|arrange a view/i.test(text);
  const urgency = /urgent|urgente|asap|immediately|this week|esta semana|as soon as possible|can we speak today|hoy/i.test(text);

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
      aiResponse = `¡Muchas gracias por contactarnos! Las propiedades en ${loc} tienen buena demanda ahora mismo — es un buen momento para conocer sus opciones. ¿Le vendría bien una llamada breve esta semana? En 30 minutos podría darle una valoración clara del mercado actual.`;
    } else if (leadType === 'rental') {
      aiResponse = `¡Hola! Tenemos pisos en alquiler en ${loc} que podrían encajar muy bien con lo que busca${timeline ? ` — para ${timeline.toLowerCase()} hay disponibilidad` : ''}. ¿Le llamo esta semana para hacer una preselección rápida y comentar los detalles?`;
    } else if (temperature === 'hot') {
      aiResponse = `¡Hola! Con ese presupuesto en ${loc} tenemos algunas opciones muy buenas ahora mismo${viewingRequested ? ` — y organizarle las visitas no es ningún problema` : ''}. ¿Cuándo podría hablar 10 minutos para afinar los detalles antes de confirmar?`;
    } else {
      aiResponse = `¡Hola, gracias por contactarnos! Tenemos propiedades en ${loc} que podrían interesarle. Le preparo una selección adaptada a lo que busca y se la envío. ¿Prefiere que le llame o le mando la información por este medio?`;
    }
  } else if (language === 'de') {
    if (temperature === 'hot') {
      aiResponse = `Guten Tag! Vielen Dank für Ihre Anfrage. In ${loc} haben wir aktuell einige sehr attraktive Objekte, die sehr gut zu Ihrem Budget passen. Wäre ein kurzes Telefonat möglich? Ich würde Ihnen gerne die passendsten Optionen direkt vorstellen${timeline ? ` — ${timeline.toLowerCase()} passt uns gut` : ''}.`;
    } else {
      aiResponse = `Guten Tag, vielen Dank für Ihre Nachricht! In ${loc} können wir Ihnen eine interessante Auswahl zeigen. Ich stelle Ihnen gerne einige passende Objekte zusammen — wäre ein kurzes Gespräch möglich, damit ich Ihre Wünsche besser verstehen kann?`;
    }
  } else {
    if (leadType === 'seller') {
      aiResponse = `Hi, thanks for getting in touch! Properties in ${loc} are in decent demand right now — actually a good time to understand your options. It would only take about 20 minutes to walk you through a proper valuation. Does this week work for a quick call?`;
    } else if (leadType === 'rental') {
      aiResponse = `Hi! We have a good selection of rentals in ${loc}${timeline ? ` with availability from ${timeline.toLowerCase()}` : ''}. Can I ask — are you flexible on the exact neighbourhood, or is there a specific area you had in mind? That'll help me narrow it down quickly.`;
    } else if (temperature === 'hot') {
      if (viewingRequested) {
        aiResponse = `Hi! Sounds like you have a very clear picture of what you're after — we have some strong options in ${loc} at that level right now${timeline ? `. With ${timeline.toLowerCase()} in mind` : ''}, I'd love to put together a proper shortlist and plan a viewing day for you. What dates are you looking at?`;
      } else {
        aiResponse = `Hi! Based on what you've described, we have a few properties in ${loc} that are genuinely worth a look at that budget. This is a great time to be searching — some interesting stock has come to market recently. Worth a quick call this week to go through the best ones?`;
      }
    } else if (temperature === 'warm') {
      aiResponse = `Hi, thanks for reaching out! We have some good properties in ${loc} that could match what you're describing. I'll put together a curated selection and send it over — give me a couple of hours. If anything catches your eye, we can arrange a viewing easily.`;
    } else {
      aiResponse = `Hi there! We do have some options available — happy to point you in the right direction. Can I ask what's drawing you to the area specifically? That'll help me focus the search on what's most relevant for you.`;
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

  return { language, languageLabel, languageFlag, leadType, leadTypeLabel, extracted, score, temperature, factors, crmFields, aiResponse, alertSnippet };
}

export const EXAMPLE_LEADS: Array<{ label: string; source: string; message: string }> = [
  {
    label: 'Villa Buyer · Marbella',
    source: 'WhatsApp',
    message: "Hi, we're looking for a 4-bed villa in Marbella — ideally with a pool and sea views. Our budget is around €2.5M. We're flying in from London next month specifically to view properties. Can you put together a shortlist?",
  },
  {
    label: 'German Cash Buyer',
    source: 'Email',
    message: "Guten Tag, ich suche eine Immobilie zur Eigennutzung in der Gegend von Málaga oder Marbella. Mein Budget liegt bei 600.000 bis 800.000 Euro, Barzahlung ist möglich. Ich interessiere mich für Villen oder größere Apartments mit Meerblick. Wann wäre ein kurzes Gespräch möglich?",
  },
  {
    label: 'Spanish Rental Family',
    source: 'Idealista',
    message: "Hola, buscamos piso en alquiler en Nerja para mudarnos en septiembre. Somos una familia de 4 personas, necesitamos 3 habitaciones como mínimo. Presupuesto hasta 1.200 euros al mes. ¿Tienen algo disponible?",
  },
  {
    label: 'Urgent Relocation',
    source: 'WhatsApp',
    message: "URGENT — need a long-term rental in Fuengirola starting July 1st. Maximum €1,800/month, must have 2+ bedrooms. Relocating from Amsterdam for work, company covering first 3 months. Can we arrange viewings this week?",
  },
  {
    label: 'Seller · Sea View Apt',
    source: 'Web Form',
    message: "Hello, I'm thinking about selling my apartment in Torremolinos — 2-bed, sea views, around 85sqm. Not in a rush but curious what the market looks like right now. What would a realistic price be?",
  },
  {
    label: 'British Retiree',
    source: 'Email',
    message: "Good morning, my wife and I are retiring to the Costa del Sol next year and have been looking at Estepona and Mijas. We'd like something quiet — 2 or 3 bedrooms, a garden or large terrace would be ideal. Budget around €450,000. We'll be visiting in August, is it possible to arrange a few viewings then?",
  },
  {
    label: 'Penthouse · Puerto Banús',
    source: 'WhatsApp',
    message: "Hi, looking for a penthouse in Marbella — preferably Golden Mile or Puerto Banús. Budget up to €3M. I'm in the area this week and can arrange viewings. Can we speak today?",
  },
  {
    label: 'Cold Inquiry',
    source: 'Fotocasa',
    message: "Hello, just browsing your listings. What properties do you have available under €180,000? Looking for something small, no particular area in mind yet.",
  },
];
