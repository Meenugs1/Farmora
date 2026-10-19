// ============================================================
//  Farmora Backend — Simple Express Server
//  No database · No auth · No external APIs
// ============================================================

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// ── Middleware ───────────────────────────────────────────────
app.use(cors());          // Allow all origins (frontend can fetch freely)
app.use(express.json());  // Parse incoming JSON bodies

// ── Static Files ────────────────────────────────────────────
app.use(express.static(__dirname));

// ── AI Chat API ─────────────────────────────────────────────
const AI_DB = {
  en: {
    hello: ["hello", "hi", "hey"],
    crop: ["crop", "plant", "grow"],
    water: ["water", "irrigat"],
    fertiliz: ["fertiliz", "nutrient", "soil"],
    pest: ["pest", "disease", "insect"],
    weather: ["weather", "rain", "forecast"],
    market: ["market", "price", "sell"],
    harvest: ["harvest", "yield"],
    replies: {
      hello: "Hello! 🌱 I'm your Farmora AI assistant. Ask me about crops, irrigation, pests, market prices, or weather!",
      crop: "Based on current conditions, I recommend growing Soybean or Rice. Soybean thrives in warm weather with moderate rainfall, while Rice is ideal for waterlogged fields.",
      water: "Irrigate your fields based on soil moisture levels. For clay soil, water every 3-4 days. For sandy soil, water every 1-2 days. Early morning irrigation reduces evaporation losses.",
      fertiliz: "Use a balanced NPK fertilizer (10-26-26) during sowing. Apply urea as a top dressing 30 days after planting. Organic compost improves long-term soil health.",
      pest: "Monitor your crops weekly for pests. Neem oil spray is an effective organic pesticide. Rotate crops each season to break pest cycles.",
      weather: "Current forecast shows cloudy skies with a chance of light rain. Temperature around 28°C with 70% humidity — good conditions for most Kharif crops.",
      market: "Current market prices: Soybean ₹4,500/quintal, Rice ₹3,200/quintal, Wheat ₹2,800/quintal. Prices are trending upward — consider holding stock for a better rate.",
      harvest: "Harvest at the right moisture level for best quality. For Rice, harvest when 80% of grains turn golden. Dry your produce to 12-14% moisture before storage.",
      default: "Here's a general farming tip: Rotate your crops each season to maintain soil fertility. Keep a farm journal to track planting dates, inputs, and yields for better planning."
    }
  },
  hi: {
    hello: ["नमस्ते", "हेलो", "हाय", "नमस्कार"],
    crop: ["फसल", "पौधा", "उगा", "बोना", "कपास", "गेहूं"],
    water: ["पानी", "सिंचाई", "जल", "सींचना"],
    fertiliz: ["उर्वरक", "खाद", "मिट्टी"],
    pest: ["कीट", "बीमारी", "कीड़ा", "रोग"],
    weather: ["मौसम", "बारिश", "वर्षा"],
    market: ["बाज़ार", "कीमत", "भाव", "बेच"],
    harvest: ["कटाई", "उपज", "फसल काटना"],
    replies: {
      hello: "नमस्ते! 🌱 मैं आपका एआई खेती सहायक हूं। मुझसे फसलों, सिंचाई, कीटों, बाजार भाव या मौसम के बारे में पूछें!",
      crop: "वर्तमान स्थितियों के आधार पर, मैं सोयाबीन या चावल उगाने की सलाह देता हूं। सोयाबीन गर्म मौसम और मध्यम बारिश में अच्छी तरह से बढ़ता है, जबकि चावल जलमग्न खेतों के लिए आदर्श है।",
      water: "मिट्टी की नमी के स्तर के आधार पर अपने खेतों की सिंचाई करें। चिकनी मिट्टी के लिए, हर 3-4 दिन में पानी दें। रेतीली मिट्टी के लिए, हर 1-2 दिन में पानी दें।",
      fertiliz: "बुवाई के दौरान संतुलित NPK उर्वरक (10-26-26) का उपयोग करें। रोपण के 30 दिन बाद यूरिया को टॉप ड्रेसिंग के रूप में लगाएं।",
      pest: "कीटों के लिए हर हफ्ते अपनी फसलों की निगरानी करें। नीम के तेल का स्प्रे एक प्रभावी जैविक कीटनाशक है।",
      weather: "वर्तमान पूर्वानुमान में बादल छाए रहने और हल्की बारिश की संभावना है। तापमान लगभग 28°C और 70% आर्द्रता है।",
      market: "वर्तमान बाजार मूल्य: सोयाबीन ₹4,500/क्विंटल, चावल ₹3,200/क्विंटल। कीमतें ऊपर की ओर बढ़ रही हैं — स्टॉक रखने पर विचार करें।",
      harvest: "सर्वोत्तम गुणवत्ता के लिए नमी के सही स्तर पर कटाई करें। भंडारण से पहले अपनी उपज को 12-14% नमी तक सुखाएं।",
      default: "यहाँ एक सामान्य खेती की टिप है: मिट्टी की उर्वरता बनाए रखने के लिए हर मौसम में अपनी फसलों को घुमाएं।"
    }
  },
  te: {
    hello: ["హలో", "నమస్తే", "హాయ్"],
    crop: ["పంట", "మొక్క", "పెంచు", "విత్తనాలు"],
    water: ["నీరు", "నీటిపారుదల", "సాగునీరు"],
    fertiliz: ["ఎరువు", "పోషక", "నేల"],
    pest: ["తెగులు", "వ్యాధి", "పురుగు"],
    weather: ["వాతావరణం", "వర్షం", "సూచన"],
    market: ["మార్కెట్", "ధర", "అమ్ము"],
    harvest: ["కోత", "దిగుబడి"],
    replies: {
      hello: "నమస్తే! 🌱 నేను మీ ఫార్మోరా AI సహాయకుడిని. పంటలు, నీటిపారుదల, తెగుళ్లు, మార్కెట్ ధరలు లేదా వాతావరణం గురించి అడగండి!",
      crop: "ప్రస్తుత పరిస్థితుల ఆధారంగా, మితమైన వర్షపాతంతో పాటు సోయాబీన్ లేదా వరి సాగుకు అనుకూలం.",
      water: "నేల తేమ స్థాయి ఆధారంగా మీ పొలాలకు నీరు పెట్టండి. ఉదయం పూట నీరు పెట్టడం మంచిది.",
      fertiliz: "విత్తే సమయంలో సమతుల్య NPK ఎరువును ఉపయోగించండి. సేంద్రియ ఎరువులు నేల ఆరోగ్యాన్ని మెరుగుపరుస్తాయి.",
      pest: "తెగుళ్ల కోసం ప్రతి వారం మీ పంటలను పరిశీలించండి. వేప నూనె స్ప్రే సమర్థవంతమైన సేంద్రియ పురుగుమందు.",
      weather: "ప్రస్తుత సూచన ప్రకారం ఆకాశం మేఘావృతమై తేలికపాటి వర్షం పడే అవకాశం ఉంది. ఉష్ణోగ్రత 28°C.",
      market: "ప్రస్తుత మార్కెట్ ధరలు: సోయాబీన్ ₹4,500/క్వింటాల్, వరి ₹3,200/క్వింటాల్. ధరలు పెరుగుతున్నాయి.",
      harvest: "ఉత్తమ నాణ్యత కోసం సరైన తేమ స్థాయిలో కోత కోయండి. నిల్వ చేయడానికి ముందు ఆరబెట్టండి.",
      default: "సాధారణ వ్యవసాయ చిట్కా: నేలసారాన్ని కాపాడుకోవడానికి పంట మార్పిడి చేయండి."
    }
  },
  kn: {
    hello: ["ನಮಸ್ಕಾರ", "ಹಲೋ", "ಹಾಯ್"],
    crop: ["ಬೆಳೆ", "ಸಸ್ಯ", "ಬೆಳೆಯಲು", "ಬೀಜ"],
    water: ["ನೀರು", "ನೀರಾವರಿ"],
    fertiliz: ["ಗೊಬ್ಬರ", "ಪೋಷಕಾಂಶ", "ಮಣ್ಣು"],
    pest: ["ಕೀಟ", "ರೋಗ", "ಹುಳು"],
    weather: ["ಹವಾಮಾನ", "ಮಳೆ", "ಮುನ್ಸೂಚನೆ"],
    market: ["ಮಾರುಕಟ್ಟೆ", "ಬೆಲೆ", "ಮಾರಾಟ"],
    harvest: ["ಕೊಯ್ಲು", "ಇಳುವರಿ"],
    replies: {
      hello: "ನಮಸ್ಕಾರ! 🌱 ನಾನು ನಿಮ್ಮ AI ಕೃಷಿ ಸಹಾಯಕ. ಬೆಳೆ, ನೀರಾವರಿ, ಕೀಟಗಳು, ಬೆಲೆ ಅಥವಾ ಹವಾಮಾನದ ಬಗ್ಗೆ ಕೇಳಿ!",
      crop: "ಪ್ರಸ್ತುತ ಪರಿಸ್ಥಿತಿಗಳ ಆಧಾರದ ಮೇಲೆ, ಸೋಯಾಬೀನ್ ಅಥವಾ ಭತ್ತವನ್ನು ಬೆಳೆಯಲು ನಾನು ಶಿಫಾರಸು ಮಾಡುತ್ತೇನೆ.",
      water: "ಮಣ್ಣಿನ ತೇವಾಂಶದ ಆಧಾರದ ಮೇಲೆ ನಿಮ್ಮ ಜಮೀನಿಗೆ ನೀರುಣಿಸಿ. ಮುಂಜಾನೆ ನೀರು ಹರಿಸುವುದು ಉತ್ತಮ.",
      fertiliz: "ಬಿತ್ತನೆ ಸಮಯದಲ್ಲಿ NPK ಗೊಬ್ಬರವನ್ನು ಬಳಸಿ. ಸಾವಯವ ಗೊಬ್ಬರವು ಮಣ್ಣಿನ ಆರೋಗ್ಯವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.",
      pest: "ಕೀಟಗಳಿಗಾಗಿ ವಾರಕ್ಕೊಮ್ಮೆ ಬೆಳೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ. ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಣೆ ಪರಿಣಾಮಕಾರಿಯಾಗಿದೆ.",
      weather: "ಮುನ್ಸೂಚನೆ ಪ್ರಕಾರ ಮೋಡ ಕವಿದ ವಾತಾವರಣವಿದ್ದು ಸಾಧಾರಣ ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆ ಇದೆ.",
      market: "ಪ್ರಸ್ತುತ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ: ಸೋಯಾಬೀನ್ ₹4,500/ಕ್ವಿಂಟಾಲ್. ಬೆಲೆ ಹೆಚ್ಚಾಗುವ ಸಾಧ್ಯತೆ ಇದೆ.",
      harvest: "ಉತ್ತಮ ಗುಣಮಟ್ಟಕ್ಕಾಗಿ ಸರಿಯಾದ ತೇವಾಂಶ ಮಟ್ಟದಲ್ಲಿ ಕೊಯ್ಲು ಮಾಡಿ. ಶೇಖರಣೆಗೂ ಮುನ್ನ ಒಣಗಿಸಿ.",
      default: "ಸಾಮಾನ್ಯ ಸಲಹೆ: ಮಣ್ಣಿನ ಫಲವತ್ತತೆ ಕಾಪಾಡಲು ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ."
    }
  },
  ml: {
    hello: ["നമസ്കാരം", "ഹലോ", "ഹായ്"],
    crop: ["വിള", "ചെടി", "വളർത്തുക", "വിത്ത്"],
    water: ["വെള്ളം", "ജലസേചനം"],
    fertiliz: ["വളം", "പോഷകം", "മണ്ണ്"],
    pest: ["കീടം", "രോഗം", "പുഴു"],
    weather: ["കാലാവസ്ഥ", "മഴ", "മുന്നറിയിപ്പ്"],
    market: ["വിപണി", "വില", "വിൽക്കുക"],
    harvest: ["വിളവെടുപ്പ്", "ലാഭം"],
    replies: {
      hello: "നമസ്കാരം! 🌱 ഞാൻ നിങ്ങളുടെ ഫാർമോറ AI അസിസ്റ്റന്റാണ്. വിളകൾ, ജലസേചനം, കീടങ്ങൾ, വിലകൾ, അല്ലെങ്കിൽ കാലാവസ്ഥ എന്നിവയെക്കുറിച്ച് എന്നോട് ചോദിക്കുക!",
      crop: "കാലാവസ്ഥാ സാഹചര്യങ്ങൾ അനുസരിച്ച് ഞാൻ സോയാബീൻ അല്ലെങ്കിൽ അരി വളർത്താൻ ശുപാർശ ചെയ്യുന്നു. സോയാബീൻ മിതമായ മഴയോടെ നന്നായി വളരും.",
      water: "മണ്ണിലെ ഈർപ്പത്തിന്റെ തോത് അനുസരിച്ച് കൃഷിയിടത്തിൽ നനയ്ക്കുക. രാവിലെ വെള്ളം നനയ്ക്കുന്നത് ബാഷ്പീകരണം കുറയ്ക്കുന്നു.",
      fertiliz: "വിതയ്ക്കുന്ന സമയത്ത് സമീകൃത NPK വളം (10-26-26) ഉപയോഗിക്കുക. നട്ട് 30 ദിവസത്തിന് ശേഷം യൂറിയ നൽകുക.",
      pest: "കീടങ്ങളെ കണ്ടെത്താൻ ആഴ്ചതോറും വിളകൾ പരിശോധിക്കുക. വേപ്പെണ്ണ ഒരു മികച്ച ജൈവ കീടനാശിനിയാണ്.",
      weather: "ഇപ്പോൾ മേഘാവൃതമായ ആകാശവും നേരിയ മഴയുമുള്ള കാലാവസ്ഥയാണ്. താപനില ഏകദേശം 28°C.",
      market: "നിലവിലെ വിപണി വില: സോയാബീൻ ₹4,500/ക്വിന്റൽ, അരി ₹3,200/ക്വിന്റൽ. വിലകൾ ഉയരുകയാണ്.",
      harvest: "നല്ല ഗുണനിലവാരത്തിനായി തികഞ്ഞ ഈർപ്പത്തിന്റെ നിലവാരത്തിൽ വിളവെടുപ്പ് നടത്തുക.",
      default: "ഒരു കാർഷിക നുറുങ്ങ്: മണ്ണിന്റെ പോഷകഗുണം നിലനിർത്താൻ വിളകൾ മാറ്റുക."
    }
  }
};

app.post("/api/ai", (req, res) => {
  const { message, lang } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "Please send a message." });
  }

  const msg = message.toLowerCase();

  let matchedKey = "default";
  let detectedLang = lang || "en";

  // Prioritize the language sent from UI, but fall back to full scan
  const langOrder = Object.keys(AI_DB);
  if (lang && langOrder.includes(lang)) {
    langOrder.splice(langOrder.indexOf(lang), 1);
    langOrder.unshift(lang);
  }

  let found = false;
  for (const l of langOrder) {
    const dict = AI_DB[l];
    for (const [key, keywords] of Object.entries(dict)) {
      if (key === 'replies') continue;
      if (keywords.some(k => msg.includes(k))) {
        matchedKey = key;
        detectedLang = l;
        found = true;
        break;
      }
    }
    if (found) break;
  }

  res.json({ reply: AI_DB[detectedLang].replies[matchedKey], detectedLang });
});

// ── Weather API ─────────────────────────────────────────────
// GET /api/weather
// Returns static weather data (no external API).
app.get("/api/weather", (req, res) => {
  res.json({
    temp: 28,
    humidity: 70,
    condition: "Cloudy",
    wind: "12 km/h",
    forecast: "Light rain expected in the evening"
  });
});

// ── Market API ──────────────────────────────────────────────
// GET /api/market
// Returns sample crop prices.
app.get("/api/market", (req, res) => {
  res.json([
    { crop: "Soybean", price: 4500, unit: "₹/quintal", trend: "up" },
    { crop: "Rice", price: 3200, unit: "₹/quintal", trend: "stable" },
    { crop: "Wheat", price: 2800, unit: "₹/quintal", trend: "up" },
    { crop: "Cotton", price: 6200, unit: "₹/quintal", trend: "down" },
    { crop: "Maize", price: 2100, unit: "₹/quintal", trend: "stable" }
  ]);
});

// ── Start Server ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🌾  Farmora Backend is running on http://localhost:${PORT}\n`);
});
