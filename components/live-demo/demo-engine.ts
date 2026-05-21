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
  leadClassLabel: string;
  extracted: ExtractedData;
  score: number;
  temperature: Temperature;
  factors: QualificationFactor[];
  aiResponse: string;
  alertSnippet?: string;
}

const SP_KW = ['hola', 'busco', 'buscamos', 'quiero', 'queremos', 'alquiler', 'alquilar', 'habitacion', 'habitaciones', 'piso', 'casa', 'villa', 'precio', 'zona', 'dormitorio', 'euros', 'presupuesto', 'mudarnos', 'interesado', 'gracias', 'buenos', 'tardes', 'noches', 'tengo', 'tenemos', 'comprar', 'compra', 'tienen', 'disponible', 'llamar', 'semana', 'necesito', 'necesitamos', 'nombre', 'llamo', 'soy'];
const DE_KW = ['guten', 'ich', 'wir', 'mein', 'eine', 'immobilien', 'kaufen', 'mieten', 'zimmer', 'interessiere', 'suche', 'suchen', 'schlafzimmer', 'danke', 'möchte', 'wurde', 'bitte', 'haben', 'sind', 'villa', 'euro', 'budget', 'liegt', 'gegend', 'objekte', 'meerblick', 'wohnung', 'betrag', 'preisrahmen', 'umziehen', 'herbst', 'heiße'];

const LOCATIONS = ['marbella', 'málaga', 'malaga', 'nerja', 'fuengirola', 'torremolinos', 'benalmádena', 'benalmadena', 'estepona', 'sotogrande', 'puerto banús', 'puerto banus', 'costa del sol', 'mijas', 'la cala', 'benahavís', 'benahavis', 'nueva andalucia', 'nueva andalucía', 'alhaurin', 'vélez', 'velez', 'manilva', 'casares', 'ronda', 'frigiliana', 'competa', 'torrox', 'golden mile', 'sierra blanca'];

export function analyzeInput(message: string, source: string): DemoResult {
  const text = message.trim();
  const lower = text.toLowerCase();

  // Language
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

  // Lead Type
  const sellerKw = ['selling', 'sell my', 'want to sell', 'looking to sell', 'vender', 'vendo', 'quiero vender', 'mi propiedad', 'my property', 'my apartment', 'my villa', 'my house', 'meine wohnung', 'mein haus', 'verkaufen', 'valuation', 'appraisal', 'my flat', 'thinking about selling', 'considering selling', 'realistic price', 'what would', 'what is it worth'];
  const rentalKw = ['rent', 'rental', 'renting', 'long-term', 'monthly', 'alquiler', 'alquilar', 'en alquiler', 'mieten', 'miete', '/month', 'per month', 'al mes', 'por mes', 'month-to-month', 'long term', 'larga duración', 'larga duracion'];
  const investorKw = ['invest', 'investor', 'investing', 'investment', 'rental income', 'yield', 'portfolio', 'units', 'acquire', 'acquisition', 'buy-to-let', 'buy to let', 'return on', 'projected'];

  const isSeller   = sellerKw.some(w => lower.includes(w));
  const isRental   = rentalKw.some(w => lower.includes(w));
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

  // Name extraction — requires candidate to actually start with an uppercase letter
  let name: string | undefined;
  const namePat =
    text.match(/(?:my name is|i'm|i am|name's|me llamo|ich bin|ich heiße)\s+([A-Z][a-záéíóúüñ]{2,})/i) ||
    text.match(/^(?:hi|hola|hello)[,!]?\s+(?:i'm\s+)?([A-Z][a-záéíóúüñ]{2,})\b/im) ||
    text.match(/,\s*([A-Z][a-záéíóúüñ]{2,})\s+(?:here|speaking)\b/i);
  if (namePat) {
    const candidate = namePat[1];
    const skip = [
      'looking', 'searching', 'interested', 'buying', 'renting', 'selling', 'planning',
      'based', 'living', 'moving', 'hoping', 'buscamos', 'somos', 'buscando', 'mirando',
      'interesados', 'tenemos', 'queremos', 'necesitamos', 'suchen', 'wir',
    ];
    if (/^[A-Z]/.test(candidate) && !skip.includes(candidate.toLowerCase())) {
      name = candidate;
    }
  }

  // Budget — handles ranges with dash, "and", "to", "bis", or "a"
  let budget: string | undefined;
  const bm = text.match(
    /[€£$]\s*[\d,\.]+\s*(?:m(?:illion)?|k|M|K)?(?:\s*(?:[-–]|\band\b|\bto\b|\bbis\b|\ba\b)\s*[€£$]?\s*[\d,\.]+\s*(?:m(?:illion)?|k|M|K)?)?|[\d,\.]+\s*(?:million|millón|M)\s*euro(?:s)?|[\d,\.]+\s*k\s*euro(?:s)?|[\d\.]+[,\.][\d]{3}\s*(?:(?:and|bis|to|a)\s+[\d\.]+[,\.][\d]{3}\s*)?euro(?:s)?/i
  );
  if (bm) budget = bm[0].trim().replace(/\s+/g, ' ');

  // Location
  let location: string | undefined;
  for (const loc of LOCATIONS) {
    if (lower.includes(loc)) {
      location = loc.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      break;
    }
  }

  // Property type
  let propertyType: string | undefined;
  if (/penthouse|ático|atico/i.test(text)) propertyType = 'Penthouse';
  else if (/villa/i.test(text)) propertyType = 'Villa';
  else if (/townhouse|adosado/i.test(text)) propertyType = 'Townhouse';
  else if (/apartment|apartamento|piso|wohnung/i.test(text)) propertyType = 'Apartment';
  else if (/studio|estudio/i.test(text)) propertyType = 'Studio';

  // Bedrooms
  let bedrooms: string | undefined;
  const bdr = text.match(/(\d)\+?\s*(?:bed(?:room)?s?|habitaci[oó]n(?:es)?|schlafzimmer|zimmer)/i);
  if (bdr) bedrooms = `${bdr[1]}+ bed`;

  // Timeline
  let timeline: string | undefined;
  if (/this week|esta semana/i.test(text))                                 timeline = 'This week';
  else if (/next week|próxima semana|proxima semana/i.test(text))          timeline = 'Next week';
  else if (/this month|este mes/i.test(text))                              timeline = 'This month';
  else if (/next month|próximo mes|el mes que viene/i.test(text))          timeline = 'Next month';
  else if (/jan(?:uary)?|enero/i.test(text))                               timeline = 'January';
  else if (/feb(?:ruary)?|febrero/i.test(text))                            timeline = 'February';
  else if (/mar(?:ch)?|marzo/i.test(text))                                 timeline = 'March';
  else if (/apr(?:il)?|abril/i.test(text))                                 timeline = 'April';
  else if (/\bmay\b|mayo/i.test(text))                                     timeline = 'May';
  else if (/june?|junio/i.test(text))                                      timeline = 'June';
  else if (/july?|julio/i.test(text))                                      timeline = 'July';
  else if (/aug(?:ust)?|agosto/i.test(text))                               timeline = 'August';
  else if (/sep(?:tember)?|septiembre/i.test(text))                        timeline = 'September';
  else if (/oct(?:ober)?|octubre/i.test(text))                             timeline = 'October';
  else if (/nov(?:ember)?|noviembre/i.test(text))                          timeline = 'November';
  else if (/dec(?:ember)?|diciembre/i.test(text))                          timeline = 'December';
  else if (/\bherbst\b|\boutono\b/i.test(text))                            timeline = 'Autumn';
  else if (/asap|urgent|urgente|immediately/i.test(text))                  timeline = 'ASAP';
  else {
    const mm = text.match(/in\s+(\d+)\s+months?/i);
    if (mm) timeline = `${mm[1]} months`;
  }

  const viewingRequested = /\b(?:view(?:ing)?s?|visit|visita|visitar|ver pisos?|ver la propiedad|besichtigung|appointment|cita|flying in|coming to spain|view tomorrow|view on|puedo ver|podríamos ver|podemos ver|venir a ver|venga a ver|arrange.*view|come.*view|show.*around)\b/i.test(text);
  const urgency = /urgent|urgente|asap|immediately|this week|esta semana|as soon as possible|today|hoy|tomorrow|mañana|sofort|friday|viernes/i.test(text);

  const extracted: ExtractedData = { name, budget, location, propertyType, bedrooms, timeline, viewingRequested, urgency };

  // Score
  let score = 18;
  const factors: QualificationFactor[] = [];

  if (budget)           { score += 26; factors.push({ label: 'Budget confirmed', positive: true }); }
  else                  { factors.push({ label: 'No budget specified', positive: false }); }
  if (location)         { score += 16; factors.push({ label: `Location: ${location}`, positive: true }); }
  else                  { factors.push({ label: 'Location not stated', positive: false }); }
  if (timeline)         { score += 20; factors.push({ label: `Timeline: ${timeline}`, positive: true }); }
  else                  { factors.push({ label: 'Timeline unclear', positive: false }); }
  if (viewingRequested) { score += 18; factors.push({ label: 'Viewing interest confirmed', positive: true }); }
  if (bedrooms)         { score +=  6; factors.push({ label: bedrooms, positive: true }); }
  if (propertyType)     { score +=  6; factors.push({ label: propertyType + ' specified', positive: true }); }
  if (urgency)          { score +=  8; factors.push({ label: 'High urgency signal', positive: true }); }
  if (isInvestor)       { score += 10; factors.push({ label: 'Investment intent', positive: true }); }
  if (leadType === 'seller') { score = Math.max(score, 42); factors.push({ label: 'Listing opportunity', positive: true }); }

  score = Math.min(100, Math.max(8, score));
  const temperature: Temperature = score >= 75 ? 'hot' : score >= 45 ? 'warm' : 'cold';

  // Lead classification label (for email view badge + CRM card)
  const leadClassLabel = isSeller
    ? (language === 'es' ? 'Valoración de venta' : 'Seller valuation')
    : isRental && viewingRequested
      ? (language === 'es' ? 'Alquiler · visita solicitada' : 'Rental · viewing requested')
      : isRental
        ? (language === 'es' ? 'Alquiler de larga duración' : 'Long-term rental')
        : isInvestor
          ? (language === 'es' ? 'Comprador inversor' : 'Investment buyer')
          : viewingRequested
            ? (language === 'es' ? 'Solicitud de visita' : 'Viewing request')
            : (language === 'es' ? 'Comprador potencial' : 'Buyer lead');

  // AI Response — no em dashes, natural agent voice, asks the one most useful next question
  const loc = location ?? (language === 'es' ? 'la zona' : language === 'de' ? 'der Gegend' : 'the area');
  const isEmailSource = source !== 'WhatsApp';
  const hi      = name ? `Hi ${name},`    : 'Hi,';
  const hola    = name ? `Hola ${name},`  : 'Hola,';
  const hallo   = name ? `Hallo ${name},` : 'Hallo,';
  const offEN   = isEmailSource ? '\n\nBest regards,\nLaura\nNuovaSolution' : '';
  const offES   = isEmailSource ? '\n\nSaludos,\nLaura\nNuovaSolution' : '';
  const offDE   = isEmailSource ? '\n\nBeste Grüße,\nLaura\nNuovaSolution' : '';

  let aiResponse: string;

  if (language === 'es') {
    if (leadType === 'seller') {
      aiResponse = `${hola} el mercado en ${loc} está bastante activo ahora mismo. ¿Tiene pensado un plazo para la venta o es más una consulta exploratoria por ahora?${offES}`;
    } else if (leadType === 'rental') {
      if (!timeline) {
        aiResponse = `${hola} tenemos alquileres en ${loc} que podrían encajar bien. ¿Para cuándo necesitaría tener algo cerrado? Y cuénteme, ¿la zona es imprescindible o tiene algo de flexibilidad si aparece algo mejor cerca?${offES}`;
      } else {
        aiResponse = `${hola} para ${timeline.toLowerCase()} tenemos disponibilidad en ${loc}. ¿Tiene hueco esta semana para ver alguna opción? Le preparo una selección ajustada antes de llamarle.${offES}`;
      }
    } else if (temperature === 'hot') {
      if (viewingRequested) {
        aiResponse = `${hola} con ese presupuesto en ${loc} tenemos opciones muy buenas ahora mismo. ¿Qué días le vienen mejor para las visitas${timeline ? `, cerca de ${timeline.toLowerCase()}` : ''}?`;
      } else {
        aiResponse = `${hola} con ese presupuesto en ${loc} hay cosas realmente interesantes ahora mismo. ¿Tiene pensado venir a verlas pronto? Le preparo una selección corta.`;
      }
    } else if (!budget) {
      aiResponse = `${hola} ${loc} tiene propiedades muy interesantes ahora mismo. ¿Me comenta un rango de presupuesto aproximado? Así le preparo solo las que realmente merecen la pena.${offES}`;
    } else {
      aiResponse = `${hola} tenemos propiedades en ${loc} que pueden encajar. ¿Cuándo está pensando en hacer el movimiento? Así enfoco la búsqueda en lo que hay disponible en ese momento.${offES}`;
    }
  } else if (language === 'de') {
    if (leadType === 'seller') {
      aiResponse = `${hallo} der Markt in ${loc} ist gerade sehr aktiv. Haben Sie einen bestimmten Zeitraum für den Verkauf im Kopf, oder ist das noch eine erste Orientierung?${offDE}`;
    } else if (temperature === 'hot') {
      if (viewingRequested) {
        aiResponse = `${hallo} in ${loc} haben wir aktuell sehr passende Objekte in Ihrem Preisrahmen. Welche Tage passen Ihnen für Besichtigungen am besten${timeline ? `, um ${timeline.toLowerCase()}` : ''}?${offDE}`;
      } else {
        aiResponse = `${hallo} in ${loc} haben wir aktuell sehr interessante Objekte in Ihrem Preisrahmen. Planen Sie, demnächst zum Besichtigen vorbeizukommen? Ich stelle gerne eine Auswahl zusammen.${offDE}`;
      }
    } else if (isInvestor) {
      aiResponse = `${hallo} in ${loc} gibt es gute Renditeobjekte, besonders in stark nachgefragten Lagen. Suchen Sie eher Kurzzeitmiete oder langfristige Vermietung? Das beeinflusst die Strategie erheblich.${offDE}`;
    } else if (!budget) {
      aiResponse = `${hallo} in ${loc} haben wir einige passende Angebote. Darf ich kurz fragen, in welchem Preisrahmen Sie suchen? So kann ich die richtigen Objekte gezielt heraussuchen.${offDE}`;
    } else {
      aiResponse = `${hallo} in ${loc} gibt es derzeit interessante Möglichkeiten in Ihrem Budget. Suchen Sie zur Eigennutzung oder als Kapitalanlage? Das hilft mir, die richtigen Objekte für Sie auszuwählen.${offDE}`;
    }
  } else {
    if (leadType === 'seller') {
      aiResponse = `${hi} properties in ${loc} are moving well right now. Are you looking to sell within a specific timeframe, or is this more exploratory for now?${offEN}`;
    } else if (leadType === 'rental') {
      if (!timeline) {
        aiResponse = `${hi} we have a solid range of rentals in ${loc}. When do you need to be settled by? And is the area a firm requirement, or do you have some flexibility if something better came up nearby?${offEN}`;
      } else {
        aiResponse = `${hi} for ${timeline.toLowerCase()} we have options in ${loc} that could work well. Would it be helpful to line up some viewings, or would you prefer to see details first?${offEN}`;
      }
    } else if (isInvestor) {
      aiResponse = `${hi} the Costa del Sol has strong rental investment opportunities right now, particularly in high-demand areas. Are you focused on short-term tourist lets, long-term residential, or a mix? That changes the approach quite a bit.${offEN}`;
    } else if (temperature === 'hot') {
      if (viewingRequested) {
        aiResponse = `${hi} we have some strong options in ${loc} at that level right now${timeline ? `. ${timeline} works perfectly` : ''}. Let me put a viewing day together. What dates work best?`;
      } else {
        aiResponse = `${hi} we have a few properties in ${loc} that match what you described. Good selection at that budget right now. Are you planning to come and view in person, or would a detailed walkthrough video be a useful first step?`;
      }
    } else if (!budget) {
      aiResponse = `${hi} ${loc} is a great area to be looking. Could I ask what kind of budget you are working with? That will help me focus on properties that are actually worth your time.`;
    } else if (!timeline) {
      aiResponse = `${hi} good timing. We have some interesting stock in ${loc} right now. When are you hoping to make a move? I want to make sure what I show you is actually available when you are ready.${offEN}`;
    } else {
      aiResponse = `${hi} good timing to be looking in ${loc}. Is there a particular style you are drawn to, modern or more traditional Andalusian character? That will help me narrow down the shortlist quickly.${offEN}`;
    }
  }

  // Hot alert
  let alertSnippet: string | undefined;
  if (temperature === 'hot') {
    const parts: string[] = [];
    if (budget) parts.push(budget);
    if (location) parts.push(location);
    if (viewingRequested) parts.push('Viewing requested');
    if (timeline) parts.push(timeline);
    alertSnippet = parts.join(' · ') || 'High-intent lead detected';
  }

  return { language, languageLabel, languageFlag, leadType, leadTypeLabel, leadClassLabel, extracted, score, temperature, factors, aiResponse, alertSnippet };
}

export function getRecommendedAction(
  result: DemoResult,
  lang: 'en' | 'es'
): { title: string; body: string; urgency: 'immediate' | 'soon' | 'low' } {
  const { temperature, leadType, extracted } = result;
  const { budget, timeline, viewingRequested } = extracted;

  if (lang === 'es') {
    if (temperature === 'hot' && viewingRequested) {
      return { title: 'Lead prioritario', body: 'Solicitó visita y confirmó presupuesto. Llame en los próximos 15 minutos y proponga dos horarios concretos.', urgency: 'immediate' };
    }
    if (temperature === 'hot') {
      return { title: 'Alta intención detectada', body: 'Presupuesto y ubicación confirmados. Llame hoy y ofrezca organizar una visita.', urgency: 'immediate' };
    }
    if (leadType === 'seller') {
      return { title: 'Oportunidad de captación', body: 'El cliente considera vender. Organice una llamada de valoración en las próximas 24 horas.', urgency: 'soon' };
    }
    if (!budget) {
      return { title: 'Lead activo, falta presupuesto', body: 'Pregunte por el rango de presupuesto antes de enviar listados. El seguimiento continúa automáticamente.', urgency: 'soon' };
    }
    if (!timeline) {
      return { title: 'Lead activo, timing por confirmar', body: 'Confirme cuándo quiere hacer el movimiento antes de priorizar. El sistema hace seguimiento automáticamente.', urgency: 'soon' };
    }
    return { title: 'Lead frío en seguimiento', body: 'Señal de intención baja. La secuencia automática está activa. Revíselo si responde.', urgency: 'low' };
  }

  // English
  if (temperature === 'hot' && viewingRequested) {
    return { title: 'Priority lead', body: 'Client requested a viewing and confirmed budget. Call within 15 minutes and propose two specific viewing slots.', urgency: 'immediate' };
  }
  if (temperature === 'hot') {
    return { title: 'High intent detected', body: 'Budget and location confirmed. Reach out today and offer to arrange a viewing.', urgency: 'immediate' };
  }
  if (leadType === 'seller') {
    return { title: 'Listing opportunity', body: 'Client is considering selling. Arrange a valuation call within 24 hours.', urgency: 'soon' };
  }
  if (!budget) {
    return { title: 'Active lead, budget missing', body: 'Ask for a budget range before sending listings. Automated follow-up is running.', urgency: 'soon' };
  }
  if (!timeline) {
    return { title: 'Active lead, timing unclear', body: 'Confirm when they are looking to move before prioritising. The system is following up automatically.', urgency: 'soon' };
  }
  return { title: 'Cold lead in follow-up', body: 'Low intent signal. Automated follow-up sequence is active. Review if they respond.', urgency: 'low' };
}

export function generateFollowUp(followUpMsg: string, original: DemoResult): string {
  const lower = followUpMsg.toLowerCase();
  const loc = original.extracted.location ?? 'the area';
  const { language } = original;

  if (/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\w*\b|in \d+ months?|\bnow\b|\basap\b/i.test(lower)) {
    if (language === 'es') return `Perfecto. ¿Cuántas personas se mudarán? Así le busco las mejores opciones.`;
    if (language === 'de') return `Gut. Für wie viele Personen suchen Sie? So finde ich die passendsten Objekte.`;
    return `Perfect. How many people will be moving in? That helps me find exactly the right fit.`;
  }
  if (/beach|playa|coast|sea view|meerblick|front|central/i.test(lower)) {
    if (language === 'es') return `Entendido. ¿Primera línea o a unos minutos a pie? La disponibilidad varía bastante entre las dos opciones.`;
    if (language === 'de') return `Verstanden. Direkt am Strand oder Gehweg entfernt? Die Verfügbarkeit ist recht unterschiedlich.`;
    return `Got it. Frontline or a short walk from the beach? Availability is quite different between the two.`;
  }
  if (/[€£$\d,]|budget|presupuesto/i.test(lower)) {
    if (language === 'es') return `Perfecto, con ese rango tenemos buenas opciones en ${loc}. ¿Cuándo podría hablar 10 minutos? Le preparo una selección hoy.`;
    if (language === 'de') return `Gut, in diesem Preisrahmen haben wir passende Objekte in ${loc}. Wann hätten Sie 10 Minuten Zeit für ein kurzes Gespräch?`;
    return `Good, that range gives us some strong options in ${loc}. When can you spare 10 minutes for a quick call? I will have a shortlist ready.`;
  }
  if (language === 'es') return `Entendido. ¿Cuándo podría hablar 10 minutos? Le cuento exactamente lo que tenemos disponible ahora.`;
  if (language === 'de') return `Verstanden. Wann hätten Sie kurz Zeit? Ich erkläre Ihnen genau, was wir gerade haben.`;
  return `Got it. When is a good moment for a quick 10-minute call? I can walk you through exactly what we have available right now.`;
}

export const EXAMPLE_LEADS: Array<{ label: string; labelES: string; source: string; message: string }> = [
  {
    label: 'Is it still available?',
    labelES: '¿Sigue disponible?',
    source: 'WhatsApp',
    message: "Hi, I saw the 3-bed apartment in Marbella on Idealista. Is it still available? We are very interested and could come to view it quite soon. Our budget is around €480,000.",
  },
  {
    label: 'Can we view tomorrow?',
    labelES: '¿Podemos visitar mañana?',
    source: 'WhatsApp',
    message: "Hello, I'm looking for a 2-bedroom apartment in Estepona. Budget between €300,000 and €380,000. We are in the area until Friday. Is it possible to arrange viewings tomorrow or Thursday?",
  },
  {
    label: 'Long-term rental · Marbella',
    labelES: 'Alquiler larga duración · Marbella',
    source: 'Email & Portals',
    message: "Hola, buscamos alquiler de larga duración en Marbella o Estepona. Somos una pareja con dos hijos pequeños, necesitamos 3 habitaciones. Presupuesto hasta 2.200 euros al mes. ¿Cuándo podríamos ver algo disponible?",
  },
  {
    label: 'Relocating from Germany',
    labelES: 'Mudanza desde Alemania',
    source: 'Email & Portals',
    message: "Guten Tag, wir ziehen im Herbst nach Málaga um und suchen eine Wohnung oder Villa zur Miete oder zum Kauf. Unser Budget liegt zwischen 450.000 und 600.000 Euro. Wir haben zwei Kinder und einen kleinen Hund. Können Sie uns passende Optionen zeigen?",
  },
  {
    label: 'Villa in Benahavís · €1.8M',
    labelES: 'Villa en Benahavís · €1.8M',
    source: 'Web Forms',
    message: "Hi, we are interested in villas in the Benahavís or Nueva Andalucía area. 4 bedrooms, private pool, good privacy essential. Budget up to €1.8M. We are planning a trip from London in September specifically to view properties. Can you put together a shortlist?",
  },
  {
    label: 'Thinking of selling',
    labelES: 'Pensando en vender',
    source: 'Web Forms',
    message: "Hello, I'm considering selling my apartment in Torremolinos. It is a 2-bedroom with sea views, about 85sqm on the 4th floor. Not in a rush but I'm curious what the market looks like. What would be a realistic asking price?",
  },
  {
    label: 'Need apartment by October',
    labelES: 'Piso antes de octubre',
    source: 'Email & Portals',
    message: "Hola, me llamo Carmen y necesito encontrar un piso antes de octubre. Busco 2 habitaciones en Fuengirola o Torremolinos. Presupuesto hasta 230.000 euros. ¿Tienen algo disponible que se ajuste?",
  },
  {
    label: 'Investor · 2 to 3 units',
    labelES: 'Inversor · 2 a 3 inmuebles',
    source: 'Email & Portals',
    message: "Hello, I'm looking to acquire 2 or 3 rental units on the Costa del Sol, ideally apartments in high-demand tourist areas. Total budget around €1.2M to €1.5M. Could we set up a call to discuss what is available and projected rental yields?",
  },
];
