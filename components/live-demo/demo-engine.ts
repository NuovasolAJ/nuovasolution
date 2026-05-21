export type Language = 'en' | 'es' | 'de' | 'mixed';
export type LeadType = 'buyer' | 'seller' | 'rental';
export type Temperature = 'hot' | 'warm' | 'cold';

export interface ExtractedData {
  name?: string;
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

const SP_KW = ['hola', 'busco', 'buscamos', 'quiero', 'queremos', 'alquiler', 'alquilar', 'habitacion', 'habitaciones', 'piso', 'casa', 'villa', 'precio', 'zona', 'dormitorio', 'euros', 'presupuesto', 'mudarnos', 'interesado', 'gracias', 'buenos', 'tardes', 'noches', 'tengo', 'tenemos', 'comprar', 'compra', 'tienen', 'disponible', 'llamar', 'semana', 'necesito', 'necesitamos', 'nombre', 'llamo', 'soy'];
const DE_KW = ['guten', 'ich', 'wir', 'mein', 'eine', 'immobilien', 'kaufen', 'mieten', 'zimmer', 'interessiere', 'suche', 'suchen', 'schlafzimmer', 'danke', 'möchte', 'wurde', 'bitte', 'haben', 'sind', 'villa', 'euro', 'budget', 'liegt', 'gegend', 'objekte', 'meerblick', 'wohnung', 'betrag', 'preisrahmen', 'umziehen', 'herbst', 'heiße'];

const LOCATIONS = ['marbella', 'málaga', 'malaga', 'nerja', 'fuengirola', 'torremolinos', 'benalmádena', 'benalmadena', 'estepona', 'sotogrande', 'puerto banús', 'puerto banus', 'costa del sol', 'mijas', 'la cala', 'benahavís', 'benahavis', 'nueva andalucia', 'nueva andalucía', 'alhaurin', 'vélez', 'velez', 'manilva', 'casares', 'ronda', 'frigiliana', 'competa', 'torrox', 'golden mile', 'sierra blanca'];

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
  const sellerKw = ['selling', 'sell my', 'want to sell', 'looking to sell', 'vender', 'vendo', 'quiero vender', 'mi propiedad', 'my property', 'my apartment', 'my villa', 'my house', 'meine wohnung', 'mein haus', 'verkaufen', 'valuation', 'appraisal', 'my flat', 'thinking about selling', 'considering selling', 'realistic price', 'what would', 'what is it worth'];
  const rentalKw = ['rent', 'rental', 'renting', 'long-term', 'monthly', 'alquiler', 'alquilar', 'en alquiler', 'mieten', 'miete', '/month', 'per month', 'al mes', 'por mes', 'month-to-month', 'long term', 'larga duración', 'larga duracion'];
  const investorKw = ['invest', 'investor', 'investing', 'investment', 'rental income', 'yield', 'portfolio', 'units', 'acquire', 'acquisition', 'buy-to-let', 'buy to let', 'return on', 'projected'];

  const isSeller = sellerKw.some(w => lower.includes(w));
  const isRental = rentalKw.some(w => lower.includes(w));
  const isInvestor = investorKw.some(w => lower.includes(w));

  let leadType: LeadType, leadTypeLabel: string;
  if (isSeller) {
    leadType = 'seller';
    leadTypeLabel = language === 'es' ? 'Propietario vendedor' : language === 'de' ? 'Verkäufer' : 'Seller Lead';
  } else if (isRental) {
    leadType = 'rental';
    leadTypeLabel = language === 'es' ? 'Búsqueda de alquiler' : language === 'de' ? 'Mietsuche' : 'Rental Inquiry';
  } else {
    leadType = 'buyer';
    leadTypeLabel = language === 'es' ? 'Comprador potencial' : language === 'de' ? 'Kaufinteressent' : isInvestor ? 'Investment Buyer' : 'Buyer Lead';
  }

  // ── Name extraction ──
  let name: string | undefined;
  const namePat =
    text.match(/(?:my name is|i'm|i am|name's|me llamo|soy|ich bin|ich heiße)\s+([A-Z][a-záéíóúüñ]{2,})/i) ||
    text.match(/^(?:hi|hola|hello)[,!]?\s+(?:i'm\s+)?([A-Z][a-záéíóúüñ]{2,})\b/im) ||
    text.match(/,\s*([A-Z][a-záéíóúüñ]{2,})\s+(?:here|speaking)\b/i);
  if (namePat) {
    const candidate = namePat[1];
    const skip = ['looking', 'searching', 'interested', 'buying', 'renting', 'selling', 'planning', 'based', 'living', 'moving', 'hoping'];
    if (!skip.includes(candidate.toLowerCase())) name = candidate;
  }

  // ── Budget ──
  let budget: string | undefined;
  const bm = text.match(
    /[€£$]\s*[\d,\.]+\s*(?:m(?:illion)?|k|M|K)?(?:\s*[-–]\s*[€£$]?\s*[\d,\.]+\s*(?:m(?:illion)?|k|M|K)?)?|[\d,\.]+\s*(?:million|millón|M)\s*euro(?:s)?|[\d,\.]+\s*k\s*euro(?:s)?|[\d\.]+[,\.][\d]{3}\s*(?:bis\s+[\d\.]+[,\.][\d]{3}\s*)?euro(?:s)?/i
  );
  if (bm) budget = bm[0].trim().replace(/\s+/g, ' ');

  // ── Location ──
  let location: string | undefined;
  for (const loc of LOCATIONS) {
    if (lower.includes(loc)) {
      location = loc.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      break;
    }
  }

  // ── Property type ──
  let propertyType: string | undefined;
  if (/penthouse|ático|atico/i.test(text)) propertyType = 'Penthouse';
  else if (/villa/i.test(text)) propertyType = 'Villa';
  else if (/townhouse|adosado/i.test(text)) propertyType = 'Townhouse';
  else if (/apartment|apartamento|piso|wohnung/i.test(text)) propertyType = 'Apartment';
  else if (/studio|estudio/i.test(text)) propertyType = 'Studio';

  // ── Bedrooms ──
  let bedrooms: string | undefined;
  const bdr = text.match(/(\d)\+?\s*(?:bed(?:room)?s?|habitaci[oó]n(?:es)?|schlafzimmer|zimmer)/i);
  if (bdr) bedrooms = `${bdr[1]}+ bed`;

  // ── Timeline ──
  let timeline: string | undefined;
  if (/this week|esta semana/i.test(text)) timeline = 'This week';
  else if (/next week|próxima semana|proxima semana/i.test(text)) timeline = 'Next week';
  else if (/this month|este mes/i.test(text)) timeline = 'This month';
  else if (/next month|próximo mes|el mes que viene/i.test(text)) timeline = 'Next month';
  else if (/jan(?:uary)?|enero/i.test(text)) timeline = 'January';
  else if (/feb(?:ruary)?|febrero/i.test(text)) timeline = 'February';
  else if (/mar(?:ch)?|marzo/i.test(text)) timeline = 'March';
  else if (/apr(?:il)?|abril/i.test(text)) timeline = 'April';
  else if (/\bmay\b|mayo/i.test(text)) timeline = 'May';
  else if (/june?|junio/i.test(text)) timeline = 'June';
  else if (/july?|julio/i.test(text)) timeline = 'July';
  else if (/aug(?:ust)?|agosto/i.test(text)) timeline = 'August';
  else if (/sep(?:tember)?|septiembre/i.test(text)) timeline = 'September';
  else if (/oct(?:ober)?|octubre/i.test(text)) timeline = 'October';
  else if (/nov(?:ember)?|noviembre/i.test(text)) timeline = 'November';
  else if (/dec(?:ember)?|diciembre/i.test(text)) timeline = 'December';
  else if (/asap|urgent|urgente|immediately/i.test(text)) timeline = 'ASAP';
  else {
    const mm = text.match(/in\s+(\d+)\s+months?/i);
    if (mm) timeline = `${mm[1]} months`;
  }

  const viewingRequested = /viewing|visita|visitar|ver pisos?|ver la propiedad|appointment|cita|flying in|coming to spain|visit|viewings|arrange a view|view tomorrow|view on|when can we view|puedo ver|besichtigung/i.test(text);
  const urgency = /urgent|urgente|asap|immediately|this week|esta semana|as soon as possible|can we speak today|hoy|tomorrow|mañana|sofort/i.test(text);

  const extracted: ExtractedData = { name, budget, location, propertyType, bedrooms, timeline, viewingRequested, urgency };

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
  if (isInvestor) { score += 10; factors.push({ label: 'Investment intent', positive: true }); }
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
  const isEmailSource = /email|portal|web|idealista|fotocasa|fotocas/i.test(source);
  const hi = name ? `Hi ${name}!` : 'Hi!';
  const hola = name ? `¡Hola, ${name}!` : '¡Hola!';
  const gutenTag = name ? `Guten Tag, ${name}!` : 'Guten Tag!';
  const offEN = isEmailSource ? '\n\nBest,\nLaura' : '';
  const offES = isEmailSource ? '\n\nSaludos,\nLaura' : '';
  const offDE = isEmailSource ? '\n\nMit freundlichen Grüßen,\nLaura' : '';

  let aiResponse: string;

  if (language === 'es') {
    if (leadType === 'seller') {
      aiResponse = `${hola} El mercado en ${loc} está bastante activo ahora mismo — buen momento para conocer sus opciones. ¿Tiene en mente un plazo para la venta, o es más una consulta exploratoria por ahora?${offES}`;
    } else if (leadType === 'rental') {
      if (!timeline) {
        aiResponse = `${hola} Tenemos alquileres en ${loc} que podrían encajar bien. ¿Para cuándo necesitaría tener algo cerrado? Y cuénteme — ¿la zona es imprescindible o tiene algo de flexibilidad si aparece algo mejor cerca?${offES}`;
      } else {
        aiResponse = `${hola} Para ${timeline.toLowerCase()} tenemos disponibilidad en ${loc}. ¿Tiene hueco esta semana para ver alguna opción? Le preparo una selección ajustada antes de llamarle.${offES}`;
      }
    } else if (temperature === 'hot') {
      if (viewingRequested) {
        aiResponse = `${hola} ¡Perfecto! Con ese presupuesto en ${loc} tenemos opciones muy buenas ahora mismo. Le organizo un día de visitas${timeline ? ` para ${timeline.toLowerCase()}` : ''}. ¿Qué días le vienen mejor?`;
      } else {
        aiResponse = `${hola} Con ese presupuesto en ${loc} tenemos cosas realmente interesantes en este momento. ¿Tiene pensado venir a verlas pronto? Le preparo una selección corta y lo hablamos.`;
      }
    } else if (!budget) {
      aiResponse = `${hola} ${loc} tiene propiedades muy interesantes ahora mismo. ¿Me comenta un rango de presupuesto aproximado? Así le preparo solo las que realmente merecen la pena.${offES}`;
    } else {
      aiResponse = `${hola} Tenemos propiedades en ${loc} que pueden encajar. ¿Cuándo está pensando en hacer el movimiento? Así enfoco la búsqueda en lo que hay disponible en ese momento.${offES}`;
    }
  } else if (language === 'de') {
    if (leadType === 'seller') {
      aiResponse = `${gutenTag} Der Markt in ${loc} ist gerade sehr aktiv — ein guter Zeitpunkt, um Ihre Optionen zu kennen. Haben Sie einen bestimmten Zeitraum für den Verkauf im Kopf, oder ist das eher eine erste Orientierung?${offDE}`;
    } else if (temperature === 'hot') {
      if (viewingRequested) {
        aiResponse = `${gutenTag} Sehr gut! In ${loc} haben wir aktuell sehr passende Objekte in Ihrem Preisrahmen. Ich organisiere gerne Besichtigungstermine${timeline ? ` für ${timeline.toLowerCase()}` : ''}. Welche Tage passen Ihnen am besten?${offDE}`;
      } else {
        aiResponse = `${gutenTag} In ${loc} haben wir aktuell sehr interessante Objekte in Ihrem Preisrahmen. Planen Sie, demnächst zum Besichtigen vorbeizukommen? Ich stelle gerne eine Auswahl zusammen.${offDE}`;
      }
    } else if (isInvestor) {
      aiResponse = `${gutenTag} Sehr interessant — in ${loc} gibt es gute Renditeobjekte, besonders in stark nachgefragten Lagen. Suchen Sie eher Kurzzeitmiete oder langfristige Vermietung? Das beeinflusst die Strategie erheblich.${offDE}`;
    } else if (!budget) {
      aiResponse = `${gutenTag} In ${loc} haben wir einige passende Angebote. Darf ich kurz fragen, in welchem Preisrahmen Sie suchen? So kann ich die richtigen Objekte gezielt heraussuchen.${offDE}`;
    } else {
      aiResponse = `${gutenTag} In ${loc} gibt es derzeit interessante Möglichkeiten in Ihrem Budget. Suchen Sie zur Eigennutzung oder als Kapitalanlage? Das hilft mir, die richtigen Objekte für Sie auszuwählen.${offDE}`;
    }
  } else {
    if (leadType === 'seller') {
      aiResponse = `${hi} Properties in ${loc} are moving well right now — a good time to understand your position. Can I ask: are you looking to sell within a specific timeframe, or is this more exploratory for now?${offEN}`;
    } else if (leadType === 'rental') {
      if (!timeline) {
        aiResponse = `${hi} We have a solid range of rentals in ${loc}. When do you need to be settled by? And is the area a firm requirement, or do you have some flexibility if something better came up nearby?${offEN}`;
      } else {
        aiResponse = `${hi} For ${timeline.toLowerCase()}, we have options in ${loc} that could work well. Would it be helpful to line up some viewings at the same time, or would you prefer to see details first?${offEN}`;
      }
    } else if (isInvestor) {
      aiResponse = `${hi} The Costa del Sol has strong rental investment opportunities right now — particularly in high-demand areas. Are you focused on short-term tourist lets, long-term residential, or a mix? That changes the approach quite a bit.${offEN}`;
    } else if (temperature === 'hot') {
      if (viewingRequested) {
        aiResponse = `${hi} Sounds like you know exactly what you're after — we have some strong options in ${loc} at that level right now${timeline ? `. ${timeline} works perfectly` : ''}. Let me put a viewing day together. What dates work best?`;
      } else {
        aiResponse = `${hi} We have a few properties in ${loc} that match what you've described — good selection at that budget right now. Are you planning to come and view in person, or would a detailed walkthrough video be a useful first step?`;
      }
    } else if (!budget) {
      aiResponse = `${hi} ${loc} is a great area to be looking — lots of different options. Could I ask what kind of budget you're working with? That'll help me focus on properties that are actually worth your time.`;
    } else if (!timeline) {
      aiResponse = `${hi} Good timing — we have some interesting stock in ${loc} right now. When are you hoping to make a move? I want to make sure what I show you is actually available when you're ready.`;
    } else {
      aiResponse = `${hi} Good timing to be looking in ${loc}. Is there a particular style you're drawn to — modern, or more traditional Andalusian character? That'll help me narrow down the shortlist quickly.${offEN}`;
    }
  }

  // ── Hot alert ──
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
    label: 'Is it still available?',
    source: 'WhatsApp',
    message: "Hi, I saw the 3-bed apartment in Marbella on Idealista — is it still available? We're very interested and could come to view it quite soon. Our budget is around €480,000.",
  },
  {
    label: 'Can we view tomorrow?',
    source: 'WhatsApp',
    message: "Hello, I'm looking for a 2-bedroom apartment in Estepona. Budget between €300,000 and €380,000. We're in the area until Friday — is it possible to arrange viewings tomorrow or Thursday?",
  },
  {
    label: 'Long-term rental · Marbella',
    source: 'Email & Portals',
    message: "Hola, buscamos alquiler de larga duración en Marbella o Estepona. Somos una pareja con dos hijos pequeños, necesitamos 3 habitaciones. Presupuesto hasta 2.200 euros al mes. ¿Cuándo podríamos ver algo disponible?",
  },
  {
    label: 'Relocating from Germany',
    source: 'Email & Portals',
    message: "Guten Tag, wir ziehen im Herbst nach Málaga um und suchen eine Wohnung oder Villa zur Miete oder zum Kauf. Unser Budget liegt zwischen 450.000 und 600.000 Euro. Wir haben zwei Kinder und einen kleinen Hund. Können Sie uns passende Optionen zeigen?",
  },
  {
    label: 'Villa in Benahavís · €1.8M',
    source: 'Web Forms',
    message: "Hi, we're interested in villas in the Benahavís or Nueva Andalucía area — 4 bedrooms, private pool, good privacy essential. Budget up to €1.8M. We're planning a trip from London in September specifically to view properties. Can you put together a shortlist?",
  },
  {
    label: 'Thinking of selling',
    source: 'Web Forms',
    message: "Hello, I'm considering selling my apartment in Torremolinos — it's a 2-bedroom with sea views, about 85sqm on the 4th floor. Not in a rush but I'm curious what the market looks like. What would be a realistic asking price?",
  },
  {
    label: 'Need apartment by October',
    source: 'Email & Portals',
    message: "Hola, me llamo Carmen y necesito encontrar un piso antes de octubre. Busco 2 habitaciones en Fuengirola o Torremolinos. Presupuesto hasta 230.000 euros. ¿Tienen algo disponible que se ajuste?",
  },
  {
    label: 'Investor · 2–3 units',
    source: 'Email & Portals',
    message: "Hello, I'm looking to acquire 2 or 3 rental units on the Costa del Sol — ideally apartments in high-demand tourist areas. Total budget around €1.2M–€1.5M. Could we set up a call to discuss what's available and projected rental yields?",
  },
];
