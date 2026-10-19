// =============================================
// SMART FARMING ASSISTANT - APP LOGIC
// =============================================

// --- Global State --- //
let currentLang = localStorage.getItem('farmora_lang') || 'en';
let synth = window.speechSynthesis;
let isVoiceActive = false;

const TRANSLATIONS = {
  en: {
    sign_in: "Sign In",
    sign_up: "Sign Up",
    enter_password: "Password",
    full_name: "Full Name",
    app_name: "Farmora",
    app_tagline: "Smart Farming Assistant",
    choose_lang: "Choose your language / भाषा चुनें",
    continue: "Continue →",
    setup_title: "Tell us about your farm",
    complete_setup: "Complete Setup →",
    greeting_morning: "Good Morning",
    greeting_afternoon: "Good Afternoon",
    greeting_evening: "Good Evening",
    farmer: "Farmer",
    ai_rec: "🌾 AI Recommendation",
    card_weather: "Weather",
    card_market: "Market",
    card_profit: "Est. Profit",
    card_season: "Season",
    quick_actions: "⚡ Quick Actions",
    qa_crop: "Crop Advice",
    qa_pest: "Pest Check",
    qa_land: "Land Plan",
    qa_cal: "Calendar",
    hub_title: "🌾 Farming Hub",
    ai_decision_title: "AI Decision Support",
    ai_decision_desc: "Based on your 5-acre land and current season, a staggered combination of Soybean (2 ac), Onion (1.5 ac), and Maize (1 ac) will minimize risk.",
    crop_advisory: "Crop Advisory",
    crop_advisory_sub: "Discover suitable crops",
    market_title: "📊 Market Prices",
    nav_home: "Home",
    nav_farming: "Farming",
    nav_market: "Market",
    nav_health: "Health",
    nav_comms: "Community",
    nav_community: "Comms",
    voice_title: "🎤 Voice Assistant",
    create_password: "Create Password",
    login_btn: "Login →",
    phone_placeholder: "Mobile Number",
    secure_note: "🔒 Your data is secure and private",
    location_placeholder: "Location (e.g., Pune)",
    land_placeholder: "Land Size (Acres)",
    soil_ph: "⚗️ Soil pH (Optional)",
    rain_alert_title: "Rain Alert Tomorrow",
    rain_alert_desc: "Skip irrigation — 35mm rain expected",
    soybean: "Soybean",
    soybean_rec: "Best crop for this season",
    profit: "Profit",
    smart_tips: "💡 Smart Tips",
    voice_placeholder: "Or type your question...",
    timeline_title: "📅 Planting Timeline",
    cal_title: "📅 Farming Calendar",
    pest_title: "🔬 Pest Detection",
    pest_upload_title: "Upload or Take Photo",
    pest_upload_sub: "AI will identify pests & diseases instantly",
    choose_photo: "📁 Choose Photo",
    common_issues: "🐛 Common Issues",
    active_alerts: "⚠️ Active Alerts",
    soil_report: "🧪 Soil Report",
    ai_scan: "📷 AI Disease Scan",
    profile_title: "👤 My Profile",
    logout: "🚪 Logout",
    ai_greeting: "Namaste! I am your AI Farming Assistant. How can I help you today? 🌾",
    ai_ask: "Namaste! What do you want to ask? 🎤",
    analyzing: "Analyzing soil... 🤔",
    find_crops: "🔍 Find Best Crops",
    suitable: "Suitable",
    days: "days",
    suit_high: "HIGH",
    suit_med: "MED",
    excellent_profit: "Excellent Profit! 🎉",
    good_profit: "Good Profit 👍",
    marginal_profit: "Marginal Profit",
    expected_loss: "Warning: Expected Loss ⚠️",
    generating_blueprint: "Generating AI Blueprint... 📐",
    gen_land_plan: "📋 Generate Land Plan",
    complete_text: "Complete!",
    ai_error: "Sorry, I couldn't reach the AI server.",
    new_alerts: "You have new alerts!",
    black_soil: "Black Soil",
    red_soil: "Red Soil",
    sandy_soil: "Sandy",
    loamy_soil: "Loamy",
    rain_fed: "Rain-fed",
    canal: "Canal",
    borewell: "Borewell",
    drip: "Drip",
    location_pune: "📍 Pune, Maharashtra",
    land_planning: "Land Planning",
    divide_land: "Divide land & reduce risk",
    track_stages: "Track stages & weather",
    location_label: "📍 Location",
    gps_btn: "📡 GPS",
    search_placeholder: "Search any crop...",
    ai_decision_sell: "AI Decision: SELL NOW",
    ai_market_advice: "Prices are ₹570 above MSP and at a 30-day high. Best to sell at Pune APMC.",
    enter_farm_details: "Enter Your Farm Details",
    plan_land_title: "Plan Your Land",
    total_land_label: "📐 Total Land (acres)",
    mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat", today: "Today",
    nearby_markets: "Nearby Markets",
    badge_live: "LIVE",
    pune_apmc: "Pune APMC",
    pune_market_info: "24 km away · Open till 6 PM",
    per_q: "/quintal",
    profit_breakdown_title: "📊 Profit Breakdown",
    total_revenue_label: "Total Revenue",
    total_input_cost_label: "Total Input Cost",
    net_profit_label: "Net Profit",
    roi_label: "ROI"
  },
  hi: {
    sign_in: "साइन इन",
    sign_up: "साइन अप",
    enter_password: "पासवर्ड",
    full_name: "पूरा नाम",
    app_name: "फॉर्मोरा",
    app_tagline: "स्मार्ट फार्मिंग असिस्टेंट",
    choose_lang: "अपनी भाषा चुनें",
    continue: "आगे बढ़ें →",
    setup_title: "अपने खेत के बारे में बताएं",
    complete_setup: "सेटअप पूरा करें →",
    greeting_morning: "शुभ प्रभात",
    greeting_afternoon: "शुभ दोपहर",
    greeting_evening: "शुभ संध्या",
    farmer: "किसान",
    ai_rec: "🌾 AI अनुशंसा",
    card_weather: "मौसम",
    card_market: "बाज़ार",
    card_profit: "अनुमानित लाभ",
    card_season: "सीजन",
    quick_actions: "⚡ त्वरित कार्य",
    qa_crop: "फसल सलाह",
    qa_pest: "कीट जांच",
    qa_land: "भूमि योजना",
    qa_cal: "कैलेंडर",
    hub_title: "🌾 खेती हब",
    ai_decision_title: "AI निर्णय सहायता",
    ai_decision_desc: "आपकी 5 एकड़ भूमि और वर्तमान सीजन के आधार पर, सोयाबीन (2 एकड़), प्याज (1.5 एकड़) और मक्का (1 एकड़) का संयोजन जोखिम को कम करेगा।",
    crop_advisory: "फसल परामर्श",
    crop_advisory_sub: "उपयुक्त फसलें खोजें",
    market_title: "📊 बाजार भाव",
    nav_home: "होम",
    nav_farming: "खेती",
    nav_market: "बाजार",
    nav_health: "स्वास्थ्य",
    nav_comms: "समुदाय",
    nav_community: "चर्चा",
    voice_title: "🎤 वॉयस असिस्टेंट",
    create_password: "पासवर्ड बनाएं",
    login_btn: "लॉगिन →",
    phone_placeholder: "मोबाइल नंबर",
    secure_note: "🔒 आपका डेटा सुरक्षित और निजी है",
    location_placeholder: "स्थान (जैसे, पुणे)",
    land_placeholder: "भूमि का आकार (एकड़)",
    soil_ph: "⚗️ मिट्टी का पीएच (वैकल्पिक)",
    rain_alert_title: "कल बारिश की सूचना",
    rain_alert_desc: "सिंचाई न करें — 35 मिमी बारिश की संभावना",
    soybean: "सोयाबीन",
    soybean_rec: "इस सीजन के लिए सबसे अच्छी फसल",
    profit: "लाभ",
    smart_tips: "💡 स्मार्ट टिप्स",
    voice_placeholder: "या अपना प्रश्न टाइप करें...",
    timeline_title: "📅 रोपण समयरेखा",
    cal_title: "📅 खेती कैलेंडर",
    pest_title: "🔬 कीट पहचान",
    pest_upload_title: "फोटो अपलोड करें या लें",
    pest_upload_sub: "AI तुरंत कीटों और रोगों की पहचान करेगा",
    choose_photo: "📁 फोटो चुनें",
    common_issues: "🐛 सामान्य समस्याएं",
    active_alerts: "⚠️ सक्रिय अलर्ट",
    soil_report: "🧪 मृदा रिपोर्ट",
    ai_scan: "📷 AI रोग स्कैन",
    profile_title: "👤 मेरी प्रोफ़ाइल",
    logout: "🚪 लॉगआउट",
    ai_greeting: "नमस्ते! मैं आपका एआई खेती सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं? 🌾",
    ai_ask: "नमस्ते! आप क्या पूछना चाहते हैं? 🎤",
    analyzing: "मिट्टी का विश्लेषण कर रहे हैं... 🤔",
    find_crops: "🔍 सर्वोत्तम फसलें खोजें",
    suitable: "उपयुक्त",
    days: "दिन",
    suit_high: "उच्च",
    suit_med: "मध्यम",
    excellent_profit: "शानदार मुनाफा! 🎉",
    good_profit: "अच्छा मुनाफा 👍",
    marginal_profit: "सीमित मुनाफा",
    expected_loss: "चेतावनी: संभावित नुकसान ⚠️",
    generating_blueprint: "AI ब्लूप्रिंट तैयार हो रहा है... 📐",
    gen_land_plan: "📋 भूमि योजना बनाएं",
    complete_text: "पूरा हुआ!",
    ai_error: "क्षमा करें, मैं सर्वर से संपर्क नहीं कर पा रहा हूँ।",
    new_alerts: "आपके पास नए अलर्ट हैं!",
    black_soil: "काली मिट्टी",
    red_soil: "लाल मिट्टी",
    sandy_soil: "रेतीली",
    loamy_soil: "दोमट",
    rain_fed: "वर्षा आधारित",
    canal: "नहर",
    borewell: "बोरवेल",
    drip: "ड्रिप",
    location_pune: "📍 पुणे, महाराष्ट्र",
    land_planning: "भूमि योजना",
    divide_land: "भूमि बांटें और जोखिम कम करें",
    track_stages: "चरणों और मौसम को ट्रैक करें",
    location_label: "📍 स्थान",
    gps_btn: "📡 जीपीएस",
    search_placeholder: "कोई भी फसल खोजें...",
    ai_decision_sell: "AI निर्णय: अभी बेचें",
    ai_market_advice: "कीमतें एमएसपी से ₹570 अधिक हैं। पुणे मंडी में बेचना सबसे अच्छा है।",
    enter_farm_details: "अपने खेत का विवरण दर्ज करें",
    plan_land_title: "अपनी भूमि की योजना बनाएं",
    total_land_label: "📐 कुल भूमि (एकड़)",
    mon: "सोम", tue: "मंगल", wed: "बुध", thu: "गुरु", fri: "शुक्र", sat: "शनि", today: "आज",
    nearby_markets: "नज़दीकी बाज़ार",
    badge_live: "लाइव",
    pune_apmc: "पुणे एपीएमसी",
    pune_market_info: "24 किमी दूर · शाम 6 बजे तक खुला",
    per_q: "/क्विंटल",
    profit_breakdown_title: "📊 लाभ विश्लेषण",
    total_revenue_label: "कुल आय",
    total_input_cost_label: "कुल लागत",
    net_profit_label: "शुद्ध लाभ",
    roi_label: "ROI (रिटर्न)"
  },
  te: {
    sign_in: "సైన్ ఇన్",
    sign_up: "సైన్ అప్",
    enter_password: "పాస్వర్డ్",
    full_name: "పూర్తి పేరు",
    app_name: "ఫార్మోరా",
    app_tagline: "స్మార్ట్ ఫార్మింగ్ అసిస్టెంట్",
    choose_lang: "మీ భాషను ఎంచుకోండి",
    continue: "కొనసాగించు →",
    setup_title: "మీ పొలం గురించి మాకు చెప్పండి",
    complete_setup: "సెటప్‌ను పూర్తి చేయండి →",
    greeting_morning: "శుభోదయం",
    greeting_afternoon: "శుభ మధ్యాహ్నం",
    greeting_evening: "శుభ సాయంత్రం",
    farmer: "రైతు",
    ai_rec: "🌾 AI సిఫార్సు",
    card_weather: "హవామానం",
    card_market: "మార్కెట్",
    card_profit: "అంచనా లాభం",
    card_season: "సీజన్",
    quick_actions: "⚡ తక్షణ చర్యలు",
    qa_crop: "పంట సలహా",
    qa_pest: "తెగుళ్ల తనిఖీ",
    qa_land: "భూమి ప్రణాళిక",
    qa_cal: "క్యాలెండర్",
    hub_title: "🌾 వ్యవసాయ హబ్",
    ai_decision_title: "AI నిర్ణయ మద్దతు",
    ai_decision_desc: "మీ 5 ఎకరాల భూమి మరియు ప్రస్తుత సీజన్ ఆధారంగా, సోయాబీన్ (2 ఎకరాలు), ఉల్లిపాయ (1.5 ఎకరాలు) మరియు మొక్కజొన్న (1 ఎకరా) కలయిక ప్రమాదాన్ని తగ్గిస్తుంది.",
    crop_advisory: "పంట సలహా",
    crop_advisory_sub: "తగిన పంటలను కనుగొనండి",
    market_title: "📊 మార్కెట్ ధరలు",
    nav_home: "హోమ్",
    nav_farming: "వ్యవసాయం",
    nav_market: "మార్కెట్",
    nav_health: "ఆరోగ్యం",
    nav_comms: "కమ్యూనిటీ",
    nav_community: "కమ్యూనిటీ",
    voice_title: "🎤 వాయిస్ అసిస్టెంట్",
    create_password: "పాస్వర్డ్ సృష్టించండి",
    login_btn: "లాగిన్ →",
    phone_placeholder: "మొబైల్ సంఖ్య",
    secure_note: "🔒 మీ డేటా సురక్షితంగా మరియు ప్రైవేట్‌గా ఉంటుంది",
    location_placeholder: "స్థానం (ఉదా, పూణే)",
    land_placeholder: "భూమి పరిమాణం (ఎకరాలు)",
    soil_ph: "⚗️ నేల pH (ఐచ్ఛికం)",
    rain_alert_title: "రేపు వర్ష సూచన",
    rain_alert_desc: "నీటి పారుదల వద్దు — 35 మిమీ వర్షం కురిసే అవకాశం ఉంది",
    soybean: "సోయాబీన్",
    soybean_rec: "ఈ సీజన్‌కు ఉత్తమ పంట",
    profit: "లాభం",
    smart_tips: "💡 స్మార్ట్ చిట్కాలు",
    voice_placeholder: "లేదా మీ ప్రశ్నను టైప్ చేయండి...",
    timeline_title: "📅 సాగు కాలక్రమం",
    cal_title: "📅 వ్యవసాయ క్యాలెండర్",
    pest_title: "🔬 తెగుళ్ల గుర్తింపు",
    pest_upload_title: "ఫోటోను అప్‌లోడ్ చేయండి లేదా తీయండి",
    pest_upload_sub: "AI తక్షణమే తెగుళ్లు మరియు వ్యాధులను గుర్తిస్తుంది",
    choose_photo: "📁 ఫోటోను ఎంచుకోండి",
    common_issues: "🐛 సాధారణ సమస్యలు",
    active_alerts: "⚠️ క్రియాశీల హెచ్చరికలు",
    soil_report: "🧪 నేల నివేదిక",
    ai_scan: "📷 AI వ్యాధి స్కాన్",
    profile_title: "👤 నా ప్రొఫైల్",
    logout: "🚪 లాగ్ అవుట్",
    ai_greeting: "నమస్తే! నేను మీ AI వ్యవసాయ సహాయకుడిని. ఈరోజు నేను మీకు ఎలా సహాయపడగలను? 🌾",
    ai_ask: "నమస్తే! మీరు ఏమి అడగాలి అనుకుంటున్నారు? 🎤",
    analyzing: "నేల విశ్లేషణ జరుగుతోంది... 🤔",
    find_crops: "🔍 ఉత్తమ పంటలను కనుగొనండి",
    suitable: "అనుకూలం",
    days: "రోజులు",
    suit_high: "అత్యధికం",
    suit_med: "మధ్యమం",
    excellent_profit: "అద్భుతమైన లాభం! 🎉",
    good_profit: "మంచి లాభం 👍",
    marginal_profit: "తక్కువ లాభం",
    expected_loss: "హెచ్చరిక: నష్టం వచ్చే అవకాశం ఉంది ⚠️",
    generating_blueprint: "AI బ్లూప్రింట్ తయారవుతోంది... 📐",
    gen_land_plan: "📋 భూమి ప్రణాళికను రూపొందించండి",
    complete_text: "పూర్తయింది!",
    ai_error: "క్షమించండి, AI సర్వర్‌ని సంప్రదించలేకపోయాను.",
    new_alerts: "మీకు కొత్త హెచ్చరికలు ఉన్నాయి!",
    black_soil: "నల్ల నేల",
    red_soil: "ఎర్ర నేల",
    sandy_soil: "ఇసుక నేల",
    loamy_soil: "బంకమట్టి నేల",
    rain_fed: "వర్షాధార",
    canal: "కాలువ",
    borewell: "బోరుబావి",
    drip: "బిందు సేద్యం",
    location_pune: "📍 పూణే, మహారాష్ట్ర",
    land_planning: "భూమి ప్రణాళిక",
    divide_land: "భూమిని విభజించి నష్టాన్ని తగ్గించండి",
    track_stages: "దశలు మరియు వాతావరణం ట్రాక్ చేయండి",
    location_label: "📍 స్థానం",
    gps_btn: "📡 GPS",
    search_placeholder: "ఏదైనా పంటను వెతకండి...",
    ai_decision_sell: "AI నిర్ణయం: ఇప్పుడే అమ్మండి",
    ai_market_advice: "ధరలు MSP కంటే ₹570 ఎక్కువగా ఉన్నాయి. పూణే APMCలో అమ్మడం ఉత్తమం.",
    enter_farm_details: "మీ ఫారమ్ వివరాలను నమోదు చేయండి",
    plan_land_title: "మీ భూమిని ప్లాన్ చేయండి",
    total_land_label: "📐 మొత్తం భూమి (ఎకరాలు)",
    mon: "సోమ", tue: "మం", wed: "బుధ", thu: "గురు", fri: "శుక్ర", sat: "శని", today: "నేడు",
    nearby_markets: "సమీప మార్కెట్లు",
    badge_live: "లైవ్",
    pune_apmc: "పూణే APMC",
    pune_market_info: "24 కిమీ దూరంలో · సాయంత్రం 6 వరకు",
    per_q: "/క్వింటాల్",
    profit_breakdown_title: "📊 లాభాల విభజన",
    total_revenue_label: "మొత్తం ఆదాయం",
    total_input_cost_label: "మొత్తం ఖర్చు",
    net_profit_label: "నికర లాభం",
    roi_label: "ROI"
  },
  kn: {
    sign_in: "ಸೈನ್ ಇನ್",
    sign_up: "ಸೈನ್ ಅಪ್",
    enter_password: "ಪಾಸ್ವರ್ಡ್",
    full_name: "ಪೂರ್ಣ ಹೆಸರು",
    create_password: "ಪಾಸ್ವರ್ಡ್ ರಚಿಸಿ",
    login_btn: "ಲಾಗಿನ್ →",
    app_name: "ಫಾರ್ಮೋರಾ",
    app_tagline: "ಸ್ಮಾರ್ಟ್ ಫಾರ್ಮಿಂಗ್ ಅಸಿಸ್ಟೆಂಟ್",
    choose_lang: "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    continue: "ಮುಂದುವರಿಸಿ →",
    setup_title: "ನಿಮ್ಮ ಫಾರ್ಮ್ ಬಗ್ಗೆ ನಮಗೆ ತಿಳಿಸಿ",
    complete_setup: "ಸೆಟಪ್ ಪೂರ್ಣಗೊಳಿಸಿ →",
    greeting_morning: "ಶುಭೋದಯ",
    greeting_afternoon: "ಶುಭ ಮಧ್ಯಾಹ್ನ",
    greeting_evening: "ಶುಭ ಸಂಜೆ",
    farmer: "ರೈತ",
    ai_rec: "🌾 AI ಶಿಫಾರಸು",
    card_weather: "ಹವಾಮಾನ",
    card_market: "ಮಾರುಕಟ್ಟೆ",
    card_profit: "ಅಂದಾಜು ಲಾಭ",
    card_season: "ಋತು",
    quick_actions: "⚡ ತ್ವರಿತ ಕ್ರಮಗಳು",
    qa_crop: "ಬೆಳೆ ಸಲಹೆ",
    qa_pest: "ಕೀಟ ತಪಾಸಣೆ",
    qa_land: "ಭೂಮಿ ಯೋಜನೆ",
    qa_cal: "ಕ್ಯಾಲೆಂಡರ್",
    hub_title: "🌾 ಕೃಷಿ ಹಬ್",
    ai_decision_title: "AI ನಿರ್ಧಾರ ಬೆಂಬಲ",
    ai_decision_desc: "ನಿಮ್ಮ 5 ಎಕರೆ ಭೂಮಿ ಮತ್ತು ಪ್ರಸ್ತುತ ಋತುವಿನ ಆಧಾರದ ಮೇಲೆ, ಸೋಯಾಬೀನ್ (2 ಎಕರೆ), ಈರುಳ್ಳಿ (1.5 ಎಕರೆ) ಮತ್ತು ಮೆಕ್ಕೆಜೋಳ (1 ಎಕರೆ) ಸಂಯೋಜನೆಯು ಅಪಾಯವನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ.",
    crop_advisory: "ಬೆಳೆ ಸಲಹೆ",
    crop_advisory_sub: "ಸೂಕ್ತವಾದ ಬೆಳೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
    market_title: "📊 ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
    nav_home: "ಹೋಮ್",
    nav_farming: "ಕೃಷಿ",
    nav_market: "ಮಾರುಕಟ್ಟೆ",
    nav_health: "ಆರೋಗ್ಯ",
    nav_comms: "ಸಮುದಾಯ",
    nav_community: "ಸಮುದಾಯ",
    voice_title: "🎤 ಧ್ವನಿ ಸಹಾಯಕ",
    phone_placeholder: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    secure_note: "🔒 ನಿಮ್ಮ ಡೇಟಾ ಸುರಕ್ಷಿತವಾಗಿದೆ ಮತ್ತು ಖಾಸಗಿಯಾಗಿದೆ",
    location_placeholder: "ಸ್ಥಳ (ಉದಾ. ಪುಣೆ)",
    land_placeholder: "ಭೂಮಿ ಗಾತ್ರ (ಎಕರೆ)",
    soil_ph: "⚗️ ಮಣ್ಣಿನ pH (ಐಚ್ಛಿಕ)",
    rain_alert_title: "ನಾಳೆ ಮಳೆಯ ಮುನ್ಸೂಚನೆ",
    rain_alert_desc: "ನೀರಾವರಿ ಮಾಡಬೇಡಿ — 35 ಮಿಮೀ ಮಳೆ ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ",
    soybean: "ಸೊಯಾಬೀನ್",
    soybean_rec: "ಈ ಋತುವಿನ ಅತ್ಯುತ್ತಮ ಬೆಳೆ",
    profit: "ಲಾಭ",
    smart_tips: "💡 ಸ್ಮಾರ್ಟ್ ಸಲಹೆಗಳು",
    voice_placeholder: "ಅಥವಾ ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ...",
    timeline_title: "📅 ನಾಟಿ ವೇಳಾಪಟ್ಟಿ",
    cal_title: "📅 ಕೃಷಿ ಕ್ಯಾಲೆಂಡರ್",
    pest_title: "🔬 ಕೀಟ ಪತ್ತೆ",
    pest_upload_title: "ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ತೆಗೆಯಿರಿ",
    pest_upload_sub: "AI ತಕ್ಷಣವೇ ಕೀಟಗಳು ಮತ್ತು ರೋಗಗಳನ್ನು ಗುರುತಿಸುತ್ತದೆ",
    choose_photo: "📁 ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ",
    common_issues: "🐛 ಸಾಮಾನ್ಯ ಸಮಸ್ಯೆಗಳು",
    active_alerts: "⚠️ ಸಕ್ರಿಯ ಎಚ್ಚರಿಕೆಗಳು",
    soil_report: "🧪 ಮಣ್ಣಿನ ವರದಿ",
    ai_scan: "📷 AI ರೋಗ ಸ್ಕ್ಯಾನ್",
    profile_title: "👤 ನನ್ನ ಪ್ರೊಫೈಲ್",
    logout: "🚪 ಲಾಗ್ ಔಟ್",
    ai_greeting: "ನಮಸ್ತೆ! ನಾನು ನಿಮ್ಮ AI ಕೃಷಿ ಸಹಾಯಕ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ? 🌾",
    ai_ask: "ನಮಸ್ತೆ! ನೀವು ಏನು ಕೇಳಲು ಬಯಸುತ್ತೀರಿ? 🎤",
    analyzing: "ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆ ನಡೆಸಲಾಗುತ್ತಿದೆ... 🤔",
    find_crops: "🔍 ಉತ್ತಮ ಬೆಳೆಗಳನ್ನು ಹುಡುಕಿ",
    suitable: "ಸೂಕ್ತ",
    days: "ದಿನಗಳು",
    suit_high: "ಅತ್ಯುತ್ತಮ",
    suit_med: "ಮಧ್ಯಮ",
    excellent_profit: "ಅದ್ಭುತ ಲಾಭ! 🎉",
    good_profit: "ಒಳ್ಳೆಯ ಲಾಭ 👍",
    marginal_profit: "ಕಡಿಮೆ ಲಾಭ",
    expected_loss: "ಎಚ್ಚರಿಕೆ: ನಷ್ಟದ ಸಾಧ್ಯತೆ ⚠️",
    generating_blueprint: "AI ಬ್ಲೂಪ್ರಿಂಟ್ ಸಿದ್ಧವಾಗುತ್ತಿದೆ... 📐",
    gen_land_plan: "📋 ಭೂಮಿ ಯೋಜನೆಯನ್ನು ರಚಿಸಿ",
    complete_text: "ಪೂರ್ಣಗೊಂಡಿದೆ!",
    ai_error: "ಕ್ಷಮಿಸಿ, AI ಸರ್ವರ್ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
    new_alerts: "ನಿಮಗೆ ಹೊಸ ಎಚ್ಚರಿಕೆಗಳಿವೆ!",
    black_soil: "ಕಪ್ಪು ಮಣ್ಣು",
    red_soil: "ಕೆಂಪು ಮಣ್ಣು",
    sandy_soil: "ಮರಳು ಮಣ್ಣು",
    loamy_soil: "ಜೇಡಿ ಮಣ್ಣು",
    rain_fed: "ಮಳೆ ಆಧಾರಿತ",
    canal: "ಕಾಲುವೆ",
    borewell: "ಕೊಳವೆಬಾವಿ",
    drip: "ಹನಿ ನೀರಾವರಿ",
    location_pune: "📍 ಪುಣೆ, ಮಹಾರಾಷ್ಟ್ರ",
    land_planning: "ಭೂಮಿ ಯೋಜನೆ",
    divide_land: "ಭೂಮಿಯನ್ನು ವಿಭಜಿಸಿ",
    track_stages: "ಹಂತಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
    location_label: "📍 ಸ್ಥಳ",
    gps_btn: "📡 GPS",
    search_placeholder: "ಯಾವುದೇ ಬೆಳೆ ಹುಡುಕಿ...",
    ai_decision_sell: "AI ನಿರ್ಧಾರ: ಈಗಲೇ ಮಾರಿ",
    ai_market_advice: "ಬೆಲೆಗಳು MSP ಗಿಂತ ₹570 ಹೆಚ್ಚಿವೆ. ಪುಣೆ APMC ಯಲ್ಲಿ ಮಾರಾಟ ಮಾಡುವುದು ಉತ್ತಮ.",
    enter_farm_details: "ನಿಮ್ಮ ಫಾರ್ಮ್ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ",
    plan_land_title: "ನಿಮ್ಮ ಭೂಮಿಯನ್ನು ಯೋಜಿಸಿ",
    total_land_label: "📐 ಒಟ್ಟು ಭೂಮಿ (ಎಕರೆ)",
    mon: "ಸೋಮ", tue: "ಮಂ", wed: "ಬುಧ", thu: "ಗುರು", fri: "ಶುಕ್ರ", sat: "ಶನಿ", today: "ಇಂದು",
    nearby_markets: "ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆಗಳು",
    badge_live: "ಲೈವ್",
    pune_apmc: "ಪುಣೆ APMC",
    pune_market_info: "24 ಕಿಮೀ ದೂರ · ಸಂಜೆ 6 ರವರೆಗೆ",
    per_q: "/ಕ್ವಿಂಟಾಲ್",
    profit_breakdown_title: "📊 ಲಾಭದ ವಿಶ್ಲೇಷಣೆ",
    total_revenue_label: "ಒಟ್ಟು ಆದಾಯ",
    total_input_cost_label: "ಒಟ್ಟು ವೆಚ್ಚ",
    net_profit_label: "ನಿವ್ವಳ ಲಾಭ",
    roi_label: "ROI"
  },
  ml: {
    sign_in: "സൈൻ ഇൻ",
    sign_up: "സൈൻ അപ്പ്",
    enter_password: "പാസ്സ്‌വേർഡ്",
    full_name: "മുഴുവൻ പേര്",
    app_name: "ഫാർമോറ",
    app_tagline: "സ്മാർട്ട് ഫാമിംഗ് അസിസ്റ്റന്റ്",
    choose_lang: "നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക",
    continue: "തുടരുക →",
    setup_title: "നിങ്ങളുടെ ഫാം વિશે പറയുക",
    complete_setup: "സജ്ജീകരണം പൂർത്തിയാക്കുക →",
    greeting_morning: "സുപ്രഭാതം",
    greeting_afternoon: "നല്ല ഉച്ചതിരിഞ്ഞ്",
    greeting_evening: "ശുഭ സന്ധ്യ",
    farmer: "കർഷകൻ",
    ai_rec: "🌾 AI ശുപാർശ",
    card_weather: "കാലാവസ്ഥ",
    card_market: "വിപണി",
    card_profit: "ലാഭം",
    card_season: "സീസൺ",
    quick_actions: "⚡ ദ്രുത പ്രവർത്തനങ്ങൾ",
    qa_crop: "വിള ഉപദേശം",
    qa_pest: "കീട നിയന്ത്രണം",
    qa_land: "ഭൂമി പദ്ധതി",
    qa_cal: "കലണ്ടർ",
    hub_title: "🌾 കാർഷിക ഹബ്",
    ai_decision_title: "AI തീരുമാനങ്ങൾ",
    ai_decision_desc: "നിങ്ങളുടെ അടിസ്ഥാനത്തിൽ, സോയാബീൻ ആണ് മികച്ചത്.",
    crop_advisory: "വിള ഉപദേശം",
    crop_advisory_sub: "അനുയോജ്യമായ വിളകൾ",
    market_title: "📊 വിപണി വിലകൾ",
    nav_home: "ഹോം",
    nav_farming: "കൃഷി",
    nav_market: "വിപണി",
    nav_health: "ആരോഗ്യം",
    nav_comms: "കമ്മ്യൂണിറ്റി",
    nav_community: "കമ്മ്യൂണിറ്റി",
    voice_title: "🎤 ശബ്ദ അസിസ്റ്റന്റ്",
    create_password: "പാസ്സ്‌വേർഡ് ഉണ്ടാക്കുക",
    login_btn: "ലോഗിൻ →",
    phone_placeholder: "മൊബൈൽ നമ്പർ",
    secure_note: "🔒 നിങ്ങളുടെ വിവരങ്ങൾ സുരക്ഷിതമാണ്",
    location_placeholder: "സ്ഥലം (ഉദാ: കൊച്ചി)",
    land_placeholder: "ഭൂമി വലുപ്പം (ഏക്കർ)",
    soil_ph: "⚗️ മണ്ണിന്റെ pH",
    rain_alert_title: "നാളെ മഴ കാണും",
    rain_alert_desc: "നനയ്ക്കരുത് — 35 മിമീ മഴ വരാം",
    soybean: "സോയാബീൻ",
    soybean_rec: "ഈ തവണ നല്ല വിള",
    profit: "ലാഭം",
    smart_tips: "💡 സ്മാർട്ട് ടിപ്സ്",
    voice_placeholder: "അല്ലെങ്കിൽ ചോദിക്കുക...",
    timeline_title: "📅 നടുവാൻ സമയം",
    cal_title: "📅 കൃഷി കലണ്ടർ",
    pest_title: "🔬 കീട തിരിച്ചറിയൽ",
    pest_upload_title: "ഫോട്ടോ അപ്‍ലോഡ് ചെയ്യുക",
    pest_upload_sub: "AI കീടങ്ങളെ കണ്ടെത്തും",
    choose_photo: "📁 ഫോട്ടോ തിരഞ്ഞെടുക്കുക",
    common_issues: "🐛 ലഘു പ്രശ്നങ്ങൾ",
    active_alerts: "⚠️ മുന്നറിയിപ്പുകൾ",
    soil_report: "🧪 മണ്ണ് റിപ്പോർട്ട്",
    ai_scan: "📷 AI രോഗ സ്കാൻ",
    profile_title: "👤 എന്റെ പ്രൊഫൈൽ",
    logout: "🚪 പുറത്തുകടക്കുക",
    ai_greeting: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ AI അസിസ്റ്റന്റ് ആണ്. എങ്ങനെ സഹായിക്കാം? 🌾",
    ai_ask: "നമസ്കാരം! എന്ത് ചോദിക്കണം? 🎤",
    analyzing: "പരിശോധിക്കുന്നു... 🤔",
    find_crops: "🔍 നല്ല വിളകൾ കണ്ടെത്തുക",
    suitable: "അനുയോജ്യം",
    days: "ദിവസങ്ങൾ",
    suit_high: "ഉയർന്ന",
    suit_med: "ഇടത്തരം",
    excellent_profit: "മികച്ച ലാഭം! 🎉",
    good_profit: "നല്ല ലാഭം 👍",
    marginal_profit: "മിതമായ ലാഭം",
    expected_loss: "മുന്നറിയിപ്പ്: നഷ്ടം വരാം ⚠️",
    generating_blueprint: "AI പ്ലാൻ തയ്യാറാക്കുന്നു... 📐",
    gen_land_plan: "📋 ഭൂമി പ്ലാൻ ഉണ്ടാക്കുക",
    complete_text: "പൂർത്തിയായി!",
    ai_error: "ക്ഷമിക്കണം, AI സെർവർ ലഭ്യമല്ല.",
    new_alerts: "പുതിയ അറിയിപ്പുകൾ ഉണ്ട്!",
    black_soil: "കറുത്ത മണ്ണ്",
    red_soil: "ചുവന്ന മണ്ണ്",
    sandy_soil: "മണൽ മണ്ണ്",
    loamy_soil: "കളിമണ്ണ്",
    rain_fed: "മഴ ആശ്രയിച്ചുള്ള",
    canal: "കനാൽ",
    borewell: "ബോർവെൽ",
    drip: "തുള്ളി നന",
    location_pune: "📍 പൂനെ, മഹാരാഷ്ട്ര",
    land_planning: "ഭൂമി പ്ലാനിംഗ്",
    divide_land: "ഭൂമി വിഭജിക്കുക",
    track_stages: "ഘട്ടങ്ങൾ ട്രാക്ക് ചെയ്യുക",
    location_label: "📍 സ്ഥലം",
    gps_btn: "📡 GPS",
    search_placeholder: "വിളകൾ തിരയുക...",
    ai_decision_sell: "AI തീരുമാനം: ഇപ്പോൾ വിൽക്കുക",
    ai_market_advice: "വില MSP-യേക്കാൾ ₹570 കൂടുതലാണ്. പുനെ APMC-യിൽ വിൽക്കുന്നതാണ് നല്ലത്.",
    enter_farm_details: "വിവരങ്ങൾ നൽകുക",
    plan_land_title: "ഭൂമി പ്ലാൻ ചെയ്യുക",
    total_land_label: "📐 മൊത്തം സ്ഥലം (ഏക്കർ)",
    mon: "തിങ്കൾ", tue: "ചൊവ്വ", wed: "ബുധൻ", thu: "വ്യാഴം", fri: "വെള്ളി", sat: "ശനി", today: "ഇന്ന്",
    nearby_markets: "സമീപമുള്ള വിപണികൾ",
    badge_live: "ലൈവ്",
    pune_apmc: "പുനെ APMC",
    pune_market_info: "24 കിലോമീറ്റർ അകലെ",
    per_q: "/ക്വിന്റൽ",
    profit_breakdown_title: "📊 ലാഭ വിവരങ്ങൾ",
    total_revenue_label: "ആകെ വരുമാനം",
    total_input_cost_label: "ആകെ ചിലവ്",
    net_profit_label: "അറ്റാദായം",
    roi_label: "ROI"
  }
};

const EN_DICT = {
  "Humid": { hi: "नमी", te: "తేమ", kn: "ತೇವಾಂಶ", ml: "ഈർപ്പം" },
  "Cloudy": { hi: "बादल", te: "మేఘావృతం", kn: "ಮೋಡ", ml: "മേഘാവൃതം" },
  "Light rain expected in the evening": { hi: "शाम को हल्की बारिश", te: "సాయంత్రం చిరుజల్లులు", kn: "ಸಂಜೆ ಹಗುರವಾದ ಮಳೆ", ml: "വൈകുന്നേരം മഴ ലഭിച്ചേക്കാം" },
  "Expect normal conditions": { hi: "सामान्य स्थिति की उम्मीद", te: "సాధారణ పరిస్థితులు", kn: "ಸಾಮಾನ್ಯ ಲಕ್ಷಣ", ml: "സാധാരണ നിലയിലായിരിക്കും" },
  "Listening...": { hi: "सुन रहा हूँ...", te: "వింటున్నాను...", kn: "ಕೇಳುತ್ತಿದೆ...", ml: "കേൾക്കുന്നു..." },
  "🤔 Processing...": { hi: "🤔 सोच रहा हूँ...", te: "🤔 ప్రాసెస్ చేస్తోంది...", kn: "🤔 ವಿಶ್ಲೇಷಣೆ...", ml: "🤔 പരിശോധിക്കുന്നു..." },
  "Done.": { hi: "हो गया।", te: "అయింది.", kn: "ಮುಗಿಯಿತು.", ml: "പൂർത്തിയായി." },
  "Tap mic to speak": { hi: "बोलने के लिए माइक दबाएं", te: "మాట్లాడటానికి మైక్ నొక్కండి", kn: "ಮಾತನಾಡಲು ಮೈಕ್ ಒತ್ತಿ", ml: "സംസാരിക്കാൻ മൈക്കിൽ അമർത്തുക" },
  "Microphone access denied.": { hi: "माइक्रोफोन अनुमति अस्वीकृत", te: "మైక్రోఫోన్ అనుమతి నిరాకరించబడింది", kn: "ಮೈಕ್ರೊಫೋನ್ ಪ್ರವೇಶ ನಿರಾಕರಿಸಲಾಗಿದೆ", ml: "മൈക്രോഫോൺ നിരസിച്ചു" },
  "No speech detected. Try again.": { hi: "कोई आवाज़ नहीं। फिर प्रयास करें।", te: "ఏ ధ్వని లేదు. మళ్లీ ప్రయత్నించండి.", kn: "ಯಾವ ಶಬ್ದವಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.", ml: "ശബ്ദം ഇല്ല. വീണ്ടും ശ്രമിക്കുക." },
  "Could not hear you. Try again.": { hi: "सुन नहीं सका। फिर प्रयास करें।", te: "వినపడలేదు. మళ్లీ ప్రయత్నించండి.", kn: "ಕೇಳಿಸಲಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.", ml: "കേൾക്കാനായില്ല. വീണ്ടും ശ്രമിക്കുക." },
  "SELL NOW": { hi: "अभी बेचें", te: "ఇప్పుడే అమ్మండి", kn: "ಈಗಲೇ ಮಾರಿ", ml: "ഇപ്പോൾ വിൽക്കുക" },
  "HOLD": { hi: "रोक कर रखें", te: "వేచి ఉండండి", kn: "ತಡೆಹಿಡಿಯಿರಿ", ml: "കാത്തിരിക്കുക" },
  "more than nearest": { hi: "नज़दीकी से अधिक", te: "దగ్గరి కంటే ఎక్కువ", kn: "ಹತ್ತಿರದಕ್ಕಿಂತ ಹೆಚ್ಚು", ml: "അടുത്തുള്ളതിനേക്കാൾ കൂടുതൽ" },
  "less than nearest": { hi: "नज़दीकी से कम", te: "దగ్గరి కంటే తక్కువ", kn: "ಹತ್ತಿರದಕ್ಕಿಂತ ಕಡಿಮೆ", ml: "അടുത്തുള്ളതിനേക്കാൾ കുറവ്" },
  "Nearest market": { hi: "नज़दीकी बाज़ार", te: "దగ్గరి మార్కెట్", kn: "ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆ", ml: "അടുത്തുള്ള വിപണി" },
  "/quintal": { hi: "/क्विंटल", te: "/క్వింటాల్", kn: "/ಕ್ವಿಂಟಾಲ್", ml: "/ക്വിന്റൽ" },
  "Scanning...": { hi: "स्कैनिंग...", te: "స్కాన్ చేస్తోంది...", kn: "ಸ್ಕ್ಯಾನ್ ಮಾಡುತ್ತಿದೆ...", ml: "തിരയുന്നു..." },
  "Current market price is": { hi: "वर्तमान बाज़ार मूल्य एमएसपी से", te: "ప్రస్తుత మార్కెట్ ధర", kn: "ಪ್ರಸ್ತುತ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ", ml: "നിലവിലെ വിപണി വില" },
  "above MSP": { hi: "अधिक है", te: "ఎక్కువగా ఉంది", kn: "ಹೆಚ್ಚಾಗಿದೆ", ml: "കൂടുതലാണ്" },
  "below MSP": { hi: "कम है", te: "తక్కువగా ఉంది", kn: "ಕಡಿಮೆಯಾಗಿದೆ", ml: "കുറവാണ്" },
  "Good time to sell!": { hi: "बेचने का अच्छा समय!", te: "అమ్మడానికి మంచి సమయం!", kn: "ಮಾರಾಟ ಮಾಡಲು ಒಳ್ಳೆಯ ಸಮಯ!", ml: "വിൽക്കാൻ നല്ല സമയം!" },
  "Consider waiting.": { hi: "इंतजार करने पर विचार करें।", te: "వేచి ఉండండి.", kn: "ಕಾಯಲು ಯೋಚಿಸಿ.", ml: "കാത്തിരിക്കുക." },
  "Healthy!": { hi: "स्वस्थ!", te: "ఆరోగ్యకరం!", kn: "ಆರೋಗ್ಯಕರ!", ml: "ആരോഗ്യമുള്ള!" },
  "Rain Alert Tomorrow": { hi: "कल बारिश की चेतावनी", te: "రేపు వర్ష సూచన", kn: "ನಾಳೆ ಮಳೆ ಎಚ್ಚರಿಕೆ", ml: "നാളെ മഴ കാണും" },
  "Skip irrigation — 35mm rain expected": { hi: "सिंचाई छोड़ें — 35 मिमी बारिश", te: "నీరు పెట్టకండి — 35mm వర్షం", kn: "ನೀರಾವರಿ ಬೇಡ ಸಾಕು", ml: "നനയ്ക്കരുത് — 35mm മഴ" },
  "High Demand": { hi: "अधिक मांग", te: "అధిక డిమాండ్", kn: "ಹೆಚ್ಚಿನ ಬೇಡಿಕೆ", ml: "ഉയർന്ന ആവശ്യം" },
  "Kharif": { hi: "खरीफ", te: "ఖరీఫ్", kn: "ಖರೀಫ್", ml: "ഖാരിഫ്" },
  "Rain Tomorrow": { hi: "कल बारिश", te: "రేపు వర్షం", kn: "ನಾಳೆ ಮಳೆ", ml: "നാളെ മഴ" },
  "Skip irrigation": { hi: "सिंचाई छोड़ें", te: "నీరు పెట్టకండి", kn: "ನೀರಾವರಿ ಬೇಡ", ml: "നനയ്ക്കരുത്" },
  "Soybean today": { hi: "आज का सोयाबीन", te: "నేటి సోయాబీన్", kn: "ಇಂದಿನ ಸೋಯಾಬೀನ್", ml: "ഇന്നത്തെ സോയാബീൻ" },
  "Per acre": { hi: "प्रति एकड़", te: "ఎకరాకు", kn: "ಎಕರೆಗೆ", ml: "ഏക്കറിന്" },
  "Ends Oct 2026": { hi: "अक्टूबर 2026 में समाप्त", te: "అక్టోబర్ 2026 ముగుస్తుంది", kn: "ಅಕ್ಟೋಬರ್ ಅಂತ್ಯ", ml: "ഒക്ടോബർ അവസാനിക്കും" },
  "Cultivation Planning": { hi: "खेती की योजना", te: "వ్యవసాయ ప్రణాళిక", kn: "ಕೃಷಿ ಯೋಜನೆ", ml: "കൃഷി ആസൂത്രണം" },
  "Divide land & reduce risk": { hi: "भूमि बांटें और जोखिम कम करें", te: "భూమిని విభజించి నష్టాన్ని తగ్గించండి", kn: "ಭೂಮಿಯನ್ನು ವಿಭಜಿಸಿ", ml: "ഭൂമി വിഭജിക്കുക" },
  "Farming Calendar": { hi: "कृषि कैलेंडर", te: "వ్యవసాయ క్యాలెండర్", kn: "ಕೃಷಿ ಕ್ಯಾಲೆಂಡರ್", ml: "കാർഷിക കലണ്ടർ" },
  "Track stages & weather": { hi: "चरणों और मौसम को ट्रैक करें", te: "దశలు మరియు వాతావరణం ట్రాక్ చేయండి", kn: "ಹಂತಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ", ml: "ഘട്ടങ്ങൾ ട്രാക്ക് ചെയ്യുക" },
  "Black Soil": { hi: "काली मिट्टी", te: "నల్ల నేల", kn: "ಕಪ್ಪು ಮಣ್ಣು", ml: "കറുത്ത മണ്ണ്" },
  "Red Soil": { hi: "लाल मिट्टी", te: "ఎర్ర నేల", kn: "ಕೆಂಪು ಮಣ್ಣು", ml: "ചുവന്ന മണ്ണ്" },
  "Sandy": { hi: "रेतीली", te: "ఇసుక", kn: "ಮರಳು", ml: "മണൽ" },
  "Loamy": { hi: "दोमट", te: "బంకమట్టి", kn: "ಮರಳು ಮಿಶ್ರಿತ ಮಣ್ಣು", ml: "കളിമണ്ണ്" },
  "Apply urea fertilizer": { hi: "यूरिया खाद डालें", te: "యూరియా ఎరువులు వేయండి", kn: "ಯೂರಿಯಾ ಗೊಬ್ಬರ ಹಾಕಿ", ml: "യൂറിയ വളം നൽകുക" },
  "in the next 3 days before the rain for best absorption.": { hi: "बारिश से पहले 3 दिनों में", te: "వర్షం రాకముందే 3 రోజుల్లో", kn: "ಮಳೆ ಬರುವ ಮುನ್ನ 3 ದಿನಗಳಲ್ಲಿ", ml: "മഴയ്ക്ക് മുമ്പ് 3 ദിവസത്തിനുള്ളിൽ" },
  "Soybean prices rising": { hi: "सोयाबीन की कीमतें बढ़ रही हैं", te: "సోయాబీన్ ధరలు పెరుగుతున్నాయి", kn: "ಸೋಯಾಬೀನ್ ಬೆಲೆ ಏರಿಕೆ", ml: "സോയാബീൻ വില വർദ്ധിക്കുന്നു" },
  "— consider selling at Pune APMC in next 2 weeks.": { hi: "— अगले 2 हफ्तों में बेचें।", te: "— తదుపరి 2 వారాల్లో విక్రయించండి.", kn: "— ಮುಂದಿನ 2 ವಾರಗಳಲ್ಲಿ ಮಾರಿ.", ml: "— അടുത്ത 2 ആഴ്ചയ്ക്കുള്ളിൽ വിൽക്കുക." },
  "Good Evening, Farmer!": { hi: "शुभ संध्या, किसान!", te: "శుభ సాయంత్రం, రైతు!", kn: "ಶುಭ ಸಂಜೆ, ರೈತ!", ml: "ശുഭ സന്ധ്യ, കർഷകൻ!" },
  "📍 Pune, Maharashtra": { hi: "📍 पुणे, महाराष्ट्र", te: "📍 పూణే, మహారాష్ట్ర", kn: "📍 ಪುಣೆ, ಮಹಾರಾಷ್ಟ್ರ", ml: "📍 പൂനെ, മഹാരാഷ്ട്ര" },
  "AI Decision Support": { hi: "एआई निर्णय समर्थन", te: "AI నిర్ణయ మద్దతు", kn: "AI ನಿರ್ಧಾರ ಬೆಂಬಲ", ml: "AI തീരുമാന പിന്തുണ" },
  "Based on your 5-acre land and current season, a staggered combination of Soybean (2 ac), Onion (1.5 ac), and Maize (1 ac) will minimize risk.": { hi: "आपकी 5 एकड़ भूमि के आधार पर, सोयाबीन (2 एकड़), प्याज (1.5 एकड़) और मक्का (1 एकड़) लगाएंगे।", te: "మీ 5 ఎకరాల భూమిలో సోయాబీన్, ఉల్లి మరియు మొక్కజొన్న నాటండి.", kn: "ನಿಮ್ಮ 5 ಎಕರೆ ಭೂಮಿಯಲ್ಲಿ ಬೆಳೆಗಳನ್ನು ಬೆಳೆಯಿರಿ.", ml: "നിങ്ങളുടെ 5 ഏക്കർ ഭൂമിയിൽ അനുയോജ്യമായ വിളകൾ നടുക." }
};

function T(text) {
  if (currentLang === 'en') return text;
  if (!text) return text;
  if (EN_DICT[text] && EN_DICT[text][currentLang]) return EN_DICT[text][currentLang];

  let out = text;
  for (const [enKey, translations] of Object.entries(EN_DICT)) {
    if (out.includes(enKey)) {
      out = out.replace(new RegExp(enKey, 'g'), translations[currentLang]);
    }
  }
  return out;
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
  console.log("Farmora: DOM Content Loaded. Initializing...");

  // 1. Add ripple effect to all interactive elements
  const interactiveEls = document.querySelectorAll('.btn-primary, .lang-btn, .quick-action-btn, .dash-card, .nav-item, .comm-chip, .soil-chip, .water-chip');
  interactiveEls.forEach(btn => {
    btn.addEventListener('click', (e) => {
      createRipple(e);
    });
  });

  // 2. Init Login Navigation (Auth toggles dynamically attached)
  const btnComplete = document.getElementById('btn-complete-setup');
  if (btnComplete) {
    btnComplete.addEventListener('click', () => {
      console.log("Completing setup");
      completeSetup();
    });
  }

  // 3. Init Language Selection
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    const lang = btn.getAttribute('data-lang');
    if (lang === currentLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
    btn.addEventListener('click', function () {
      const selected = this.getAttribute('data-lang') || 'en';
      selectLanguage(selected, this);
    });
  });

  // Initial translation apply
  updateTexts();

  // 4. Set default greeting
  setGreeting();

  // 5. Populate Voice Chat
  setTimeout(() => {
    const chatEl = document.getElementById('chat-area');
    if (chatEl && chatEl.children.length === 0) {
      const dict = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];
      addChatBubble(dict.ai_greeting || "Namaste! I am your AI Farming Assistant. How can I help you today? 🌾", 'ai');
    }
  }, 1000);

  // Fetch Backend Data
  fetchWeather();
  fetchMarket();

  // 6. Market Search Enter Key Support
  const marketSearchInput = document.getElementById('market-search-input');
  if (marketSearchInput) {
    marketSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleMarketSearch();
      }
    });
  }
});

// --- Navigation --- //
function navigateTo(screenId) {
  // Hide all screens
  const screens = document.querySelectorAll('.screen');
  screens.forEach(s => {
    s.classList.remove('active');
    setTimeout(() => {
      if (!s.classList.contains('active')) s.style.display = 'none';
    }, 300);
  });

  // Show target screen
  const target = document.getElementById(screenId);
  target.style.display = 'block';
  void target.offsetWidth;
  target.classList.add('active');

  // Show/Hide bottom nav
  const bottomNav = document.getElementById('bottom-nav');
  const voiceFab = document.getElementById('voice-fab');

  if (screenId === 'screen-login') {
    bottomNav.classList.remove('visible');
    voiceFab.classList.remove('visible');
  } else {
    bottomNav.classList.add('visible');
    voiceFab.classList.add('visible');

    // Update active nav button
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('onclick').includes(screenId)) {
        item.classList.add('active');
      }
    });

    const scrollAreas = document.querySelectorAll('.screen-scroll');
    scrollAreas.forEach(area => area.scrollTop = 0);
  }
}

function goBack() {
  navigateTo('screen-dashboard');
}

function setActiveNav(btn) {
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// --- Utilities --- //
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  circle.style.width = circle.style.height = `${diameter}px`;
  const rect = button.getBoundingClientRect();
  circle.style.left = `${event.clientX - rect.left - radius}px`;
  circle.style.top = `${event.clientY - rect.top - radius}px`;
  circle.classList.add('ripple');
  const existingRipple = button.querySelector('.ripple');
  if (existingRipple) existingRipple.remove();
  button.appendChild(circle);
}

function showAlert(msg) {
  alert(msg);
}

// --- Login & Language --- //
function updateTexts() {
  const lang = currentLang;
  const dict = TRANSLATIONS[lang] || TRANSLATIONS['en'];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });

  const crawlerTargets = ['.dash-card-value', '.dash-card-sub', '.tag', '.tip-text', '.alert-content p', '.alert-content strong', '.location-tag', '.chip-btn', '.field-label', 'h3', 'p'];
  document.querySelectorAll(crawlerTargets.join(', ')).forEach(el => {
    if (!el.getAttribute('data-i18n')) {
      if (!el.hasAttribute('data-orig-text')) {
        el.setAttribute('data-orig-text', el.innerHTML.trim());
      }
      const orig = el.getAttribute('data-orig-text');
      el.innerHTML = T(orig);
    }
  });

  setGreeting();
  fetchWeather();
  fetchMarket();
}

function selectLanguage(lang, btn) {
  currentLang = lang;
  localStorage.setItem('farmora_lang', lang);
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  updateTexts();
}

function setGreeting() {
  const hour = new Date().getHours();
  const lang = currentLang;
  const dict = TRANSLATIONS[lang] || TRANSLATIONS['en'];
  let timeGreeting = dict.greeting_evening;
  if (hour < 12) timeGreeting = dict.greeting_morning;
  else if (hour < 17) timeGreeting = dict.greeting_afternoon;
  const greetingEl = document.getElementById('greeting-text');
  if (greetingEl) greetingEl.textContent = `${timeGreeting}, ${dict.farmer}!`;
}

function showLoginStep(step) {
  const steps = document.querySelectorAll('.login-step');
  steps.forEach(el => el.classList.add('hidden'));
  const target = document.getElementById(`login-step-${step}`);
  if (target) {
    target.classList.remove('hidden');
    void target.offsetWidth;
    target.classList.add('active');
  }
}

// --- Auth Handling --- //
function switchAuth(tabId) {
  const isLogin = tabId === 'login';

  // Style tabs
  const tbLogin = document.getElementById('tab-login');
  const tbSignup = document.getElementById('tab-signup');
  if (tbLogin && tbSignup) {
    tbLogin.style.borderBottom = isLogin ? '2px solid var(--primary-color)' : '2px solid transparent';
    tbLogin.style.color = isLogin ? 'var(--primary-color)' : 'var(--text-muted)';
    tbSignup.style.borderBottom = !isLogin ? '2px solid var(--primary-color)' : '2px solid transparent';
    tbSignup.style.color = !isLogin ? 'var(--primary-color)' : 'var(--text-muted)';
  }

  // Toggle Forms
  const fLogin = document.getElementById('auth-login-form');
  const fSignup = document.getElementById('auth-signup-form');
  if (fLogin && fSignup) {
    fLogin.style.display = isLogin ? 'block' : 'none';
    fSignup.style.display = !isLogin ? 'block' : 'none';
  }
}

function handleLogin() {
  const pField = document.getElementById('login-phone')?.value;
  const pw = document.getElementById('login-pass')?.value;
  if (!pField || !pw) {
    alert("Please enter both phone and password.");
    return;
  }
  console.log("Existing user signed in.");
  navigateTo('screen-dashboard');
}

function handleSignup() {
  const pField = document.getElementById('signup-phone')?.value;
  if (!pField) {
    alert("Please provide a phone number.");
    return;
  }
  console.log("Navigating to Step 2 for new user");
  showLoginStep(2);
}

function completeSetup() {
  const landVal = document.getElementById('setup-land')?.value;
  const totalLandEl = document.getElementById('total-land');
  const landAcresEl = document.getElementById('land-acres');
  if (landVal) {
    if (totalLandEl) totalLandEl.value = landVal;
    if (landAcresEl) landAcresEl.value = landVal;
  }
  navigateTo('screen-dashboard');
}

// --- Forms & Chips Interaction --- //
function selectChip(btn, containerSelector) {
  document.querySelectorAll(`${containerSelector} .chip-btn`).forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// --- Market Data per Commodity --- //
const MARKET_DATA = {
  Soybean: {
    icon: '🫘',
    prices: [4520, 4240, 4380],
    change: '+₹120 ↑', changePos: true,
    msp: 3950,
    aiTitle: 'AI Decision: SELL NOW',
    aiAdvice: 'Prices are ₹570 above MSP and at a 30-day high. Best to sell at Pune APMC.',
    chart: 'M0,60 L40,55 L80,45 L120,50 L160,35 L200,30 L240,20 L280,15',
    dotY: 15,
  },
  Maize: {
    icon: '🌽',
    prices: [1850, 1720, 1790],
    change: '-₹45 ↓', changePos: false,
    msp: 1700,
    aiTitle: 'AI Decision: HOLD',
    aiAdvice: 'Maize prices are ₹150 above MSP but trending down. Wait 5–7 days before selling.',
    chart: 'M0,30 L40,32 L80,35 L120,42 L160,50 L200,55 L240,58 L280,62',
    dotY: 62,
  },
  Onion: {
    icon: '🧅',
    prices: [2200, 1980, 2100],
    change: '+₹310 ↑', changePos: true,
    msp: 800,
    aiTitle: 'AI Decision: SELL NOW',
    aiAdvice: 'Onion prices have spiked ₹1,400 above MSP. Sell immediately at Pune APMC for max returns.',
    chart: 'M0,70 L40,65 L80,60 L120,50 L160,38 L200,25 L240,18 L280,12',
    dotY: 12,
  },
  Wheat: {
    icon: '🌾',
    prices: [2275, 2190, 2240],
    change: '+₹25 ↑', changePos: true,
    msp: 2275,
    aiTitle: 'AI Decision: HOLD',
    aiAdvice: 'Wheat is trading exactly at MSP. Wait for post-harvest demand to push prices higher.',
    chart: 'M0,45 L40,44 L80,42 L120,43 L160,40 L200,39 L240,38 L280,37',
    dotY: 37,
  },
  Rice: {
    icon: '🍚',
    prices: [3100, 2950, 3020],
    change: '+₹80 ↑', changePos: true,
    msp: 2183,
    aiTitle: 'AI Decision: SELL NOW',
    aiAdvice: 'Rice prices are ₹917 above MSP. Strong demand from exporters — sell at Pune APMC.',
    chart: 'M0,55 L40,52 L80,48 L120,44 L160,40 L200,36 L240,30 L280,25',
    dotY: 25,
  },
  Cotton: {
    icon: '🥜',
    prices: [6800, 6550, 6670],
    change: '+₹250 ↑', changePos: true,
    msp: 6080,
    aiTitle: 'AI Decision: SELL NOW',
    aiAdvice: 'Cotton prices are ₹720 above MSP. Textile mills buying aggressively — sell now.',
    chart: 'M0,65 L40,58 L80,50 L120,44 L160,35 L200,28 L240,22 L280,18',
    dotY: 18,
  },
};

function selectComm(btn) {
  document.querySelectorAll('.comm-chip').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const crop = btn.getAttribute('data-comm') || 'Soybean';
  const d = MARKET_DATA[crop];
  if (!d) return;
  document.getElementById('market-crop-name').textContent = crop;
  const changeEl = document.getElementById('market-price-change');
  changeEl.textContent = d.change;
  changeEl.className = 'price-change ' + (d.changePos ? 'positive' : 'negative');
  document.getElementById('chart-line').setAttribute('d', d.chart);
  document.getElementById('chart-fill').setAttribute('d', d.chart + ` L280,80 L0,80`);
  document.getElementById('chart-dot').setAttribute('cy', d.dotY);
  let aiTitle = T(d.aiTitle);
  let aiAdvice = T(d.aiAdvice);

  document.getElementById('market-ai-title').textContent = aiTitle;
  document.getElementById('market-ai-advice').textContent = aiAdvice;
  const [p1, p2, p3] = d.prices;
  document.getElementById('mkt-price-1').innerHTML = `₹${p1.toLocaleString('en-IN')} <span>${T('/quintal')}</span>`;
  document.getElementById('mkt-price-2').innerHTML = `₹${p2.toLocaleString('en-IN')} <span>${T('/quintal')}</span>`;
  document.getElementById('mkt-price-3').innerHTML = `₹${p3.toLocaleString('en-IN')} <span>${T('/quintal')}</span>`;
  const diff1 = p1 - p2;
  const diff3 = p3 - p2;
  document.getElementById('mkt-diff-1').textContent = `₹+${diff1.toLocaleString('en-IN')} ${T('more than nearest')}`;
  document.getElementById('mkt-diff-2').textContent = T('Nearest market');
  document.getElementById('mkt-diff-3').textContent = diff3 > 0 ? `₹+${diff3.toLocaleString('en-IN')} ${T('more than nearest')}` : `₹${Math.abs(diff3).toLocaleString('en-IN')} ${T('less than nearest')}`;
  const mspDiff = p1 - d.msp;
  document.getElementById('mkt-msp-price').textContent = `₹${d.msp.toLocaleString('en-IN')}${T('/quintal').replace('quintal', 'q').replace('क्विंटल', 'q').replace('క్వింటాల్', 'q').replace('ಕ್ವಿಂಟಾಲ್', 'q').replace('ക്വിന്റൽ', 'q')}`;
  document.getElementById('mkt-msp-advice').innerHTML = mspDiff > 0 ? `💡 ${T('Current market price is')} <strong>₹${mspDiff.toLocaleString('en-IN')} ${T('above MSP')}</strong>. ${T('Good time to sell!')}` : `⚠️ Market price is <strong>₹${Math.abs(mspDiff).toLocaleString('en-IN')} ${T('below MSP')}</strong>. ${T('Consider waiting.')}`;
}

function handleMarketSearch() {
  const input = document.getElementById('market-search-input');
  if (!input) return;
  const query = input.value.trim().toLowerCase();
  if (!query) return;

  // Find matching crop in MARKET_DATA
  const crops = Object.keys(MARKET_DATA);
  const match = crops.find(c => c.toLowerCase() === query || query.includes(c.toLowerCase()));

  if (match) {
    // Find the corresponding chip and click it
    const chips = document.querySelectorAll('.comm-chip');
    let foundChip = false;
    chips.forEach(chip => {
      if (chip.getAttribute('data-comm').toLowerCase() === match.toLowerCase()) {
        selectComm(chip);
        foundChip = true;
      }
    });

    if (!foundChip) {
      // If no chip, manually update data (though usually chips exist for all)
      const mockBtn = { getAttribute: () => match, classList: { add: () => { }, remove: () => { } } };
      selectComm(mockBtn);
    }
  } else {
    alert(T("Crop not found: ") + input.value);
  }
}

// --- Profit Calculator --- //
function calcProfit() {
  const land = parseFloat(document.getElementById('land-acres').value) || 0;
  const yieldPerAcre = parseFloat(document.getElementById('yield-val').value) || 0;
  const sellPrice = parseFloat(document.getElementById('sell-price').value) || 0;
  const inputCostAcre = parseFloat(document.getElementById('input-cost').value) || 0;
  const totalYield = land * yieldPerAcre;
  const totalRev = totalYield * sellPrice;
  const totalCost = land * inputCostAcre;
  const netProfit = totalRev - totalCost;
  document.getElementById('total-revenue').textContent = `₹${totalRev.toLocaleString('en-IN')}`;
  document.getElementById('total-cost').textContent = `₹${totalCost.toLocaleString('en-IN')}`;
  const profitEl = document.getElementById('net-profit');
  const roiEl = document.getElementById('roi-val');
  const gaugeFill = document.getElementById('gauge-fill');
  const gaugeLabel = document.getElementById('gauge-label');
  profitEl.textContent = `₹${netProfit.toLocaleString('en-IN')}`;
  if (netProfit > 0) {
    profitEl.style.color = 'var(--green-800)';
    gaugeFill.className = 'gauge-fill profit-fill';
    const roi = ((netProfit / totalCost) * 100).toFixed(0);
    roiEl.textContent = `${roi}%`;
    let w = Math.min((netProfit / (totalCost * 2)) * 100, 100);
    gaugeFill.style.width = Math.max(w, 15) + '%';
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];
    if (roi > 100) gaugeLabel.textContent = dict.excellent_profit || 'Excellent Profit! 🎉';
    else if (roi > 50) gaugeLabel.textContent = dict.good_profit || 'Good Profit 👍';
    else gaugeLabel.textContent = dict.marginal_profit || 'Marginal Profit';
  } else {
    profitEl.style.color = 'var(--red-600)';
    gaugeFill.className = 'gauge-fill loss-fill';
    gaugeFill.style.width = '100%';
    roiEl.textContent = '-';
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];
    gaugeLabel.textContent = dict.expected_loss || 'Warning: Expected Loss ⚠️';
  }
}

// --- Crop Suggestion --- //
const CROP_DB = {
  'Black Soil': [
    { name: 'Soybean', icon: '🫘', days: 90, price: '₹4,520/q', water: 'Medium Water', phMin: 6.0, phMax: 7.5, waterTypes: ['Rain-fed', 'Canal', 'Borewell', 'Drip'], baseSuit: 92, desc: 'Grows excellently in black cotton soil' },
    { name: 'Cotton', icon: '🌿', days: 180, price: '₹6,800/q', water: 'Low Water', phMin: 5.8, phMax: 8.0, waterTypes: ['Rain-fed', 'Canal', 'Borewell'], baseSuit: 88, desc: 'Classic income crop for black soil' },
    { name: 'Wheat', icon: '🌾', days: 120, price: '₹2,275/q', water: 'Medium Water', phMin: 6.0, phMax: 7.5, waterTypes: ['Canal', 'Borewell', 'Drip'], baseSuit: 80, desc: 'Reliable Rabi crop for black soil' },
    { name: 'Gram', icon: '🫛', days: 100, price: '₹5,440/q', water: 'Low Water', phMin: 6.5, phMax: 8.5, waterTypes: ['Rain-fed', 'Canal'], baseSuit: 75, desc: 'Good for medium-depth black soil' },
    { name: 'Sunflower', icon: '🌻', days: 95, price: '₹6,015/q', water: 'Medium Water', phMin: 6.0, phMax: 8.0, waterTypes: ['Canal', 'Borewell', 'Drip'], baseSuit: 70, desc: 'Adapts well to heavy black soil' },
    { name: 'Maize', icon: '🌽', days: 75, price: '₹1,850/q', water: 'Low Water', phMin: 5.5, phMax: 7.5, waterTypes: ['Rain-fed', 'Canal', 'Borewell', 'Drip'], baseSuit: 65, desc: 'Good for pH range within black soil' },
  ],
  'Red Soil': [
    { name: 'Groundnut', icon: '🥜', days: 110, price: '₹5,850/q', water: 'Low Water', phMin: 5.0, phMax: 6.5, waterTypes: ['Rain-fed', 'Canal', 'Borewell', 'Drip'], baseSuit: 94, desc: 'Thrives perfectly in red soil' },
    { name: 'Ragi', icon: '🌾', days: 90, price: '₹3,578/q', water: 'Low Water', phMin: 5.0, phMax: 7.0, waterTypes: ['Rain-fed', 'Canal'], baseSuit: 87, desc: 'Drought-tolerant, ideal for red soil' },
    { name: 'Maize', icon: '🌽', days: 75, price: '₹1,850/q', water: 'Low Water', phMin: 5.5, phMax: 7.5, waterTypes: ['Rain-fed', 'Canal', 'Borewell', 'Drip'], baseSuit: 80, desc: 'Grows well in light red soils' },
    { name: 'Castor', icon: '🌿', days: 120, price: '₹6,115/q', water: 'Low Water', phMin: 5.0, phMax: 7.5, waterTypes: ['Rain-fed', 'Borewell'], baseSuit: 73, desc: 'Hardy cash crop for red soil' },
    { name: 'Sunflower', icon: '🌻', days: 95, price: '₹6,015/q', water: 'Medium Water', phMin: 6.0, phMax: 7.5, waterTypes: ['Canal', 'Borewell', 'Drip'], baseSuit: 68, desc: 'Good oil crop for red soil' },
    { name: 'Tomato', icon: '🍅', days: 80, price: '₹1,200/q', water: 'Medium Water', phMin: 5.5, phMax: 7.0, waterTypes: ['Canal', 'Borewell', 'Drip'], baseSuit: 62, desc: 'Vegetable crop, well-suited' },
  ],
  'Sandy': [
    { name: 'Groundnut', icon: '🥜', days: 110, price: '₹5,850/q', water: 'Low Water', phMin: 5.5, phMax: 7.0, waterTypes: ['Rain-fed', 'Canal', 'Borewell', 'Drip'], baseSuit: 91, desc: 'Sandy loam is ideal for groundnut' },
    { name: 'Watermelon', icon: '🍉', days: 80, price: '₹800/q', water: 'Medium Water', phMin: 5.5, phMax: 7.0, waterTypes: ['Drip', 'Canal', 'Borewell'], baseSuit: 85, desc: 'Excellent in well-drained sandy soil' },
    { name: 'Carrot', icon: '🥕', days: 70, price: '₹1,500/q', water: 'Medium Water', phMin: 5.5, phMax: 7.0, waterTypes: ['Drip', 'Borewell'], baseSuit: 78, desc: 'Root vegetables love sandy soil depth' },
    { name: 'Cowpea', icon: '🫘', days: 65, price: '₹4,350/q', water: 'Low Water', phMin: 5.0, phMax: 7.0, waterTypes: ['Rain-fed', 'Canal', 'Borewell'], baseSuit: 72, desc: 'Drought-resistant legume for sandy land' },
    { name: 'Sweet Potato', icon: '🍠', days: 100, price: '₹1,600/q', water: 'Low Water', phMin: 5.5, phMax: 6.5, waterTypes: ['Rain-fed', 'Canal', 'Borewell', 'Drip'], baseSuit: 66, desc: 'Sandy soil gives good tuber quality' },
    { name: 'Bajra', icon: '🌾', days: 85, price: '₹2,350/q', water: 'Low Water', phMin: 6.0, phMax: 8.0, waterTypes: ['Rain-fed', 'Canal'], baseSuit: 60, desc: 'Pearl millet for dry sandy regions' },
  ],
  'Loamy': [
    { name: 'Wheat', icon: '🌾', days: 120, price: '₹2,275/q', water: 'Medium Water', phMin: 6.0, phMax: 7.5, waterTypes: ['Canal', 'Borewell', 'Drip'], baseSuit: 95, desc: 'Loamy soil is perfect for wheat' },
    { name: 'Onion', icon: '🧅', days: 120, price: '₹2,200/q', water: 'Medium Water', phMin: 6.0, phMax: 7.2, waterTypes: ['Canal', 'Borewell', 'Drip'], baseSuit: 90, desc: 'High market demand crop for loamy soil' },
    { name: 'Tomato', icon: '🍅', days: 80, price: '₹1,200/q', water: 'Medium Water', phMin: 5.5, phMax: 7.5, waterTypes: ['Canal', 'Borewell', 'Drip'], baseSuit: 84, desc: 'Vegetable cash crop, excellent yield' },
    { name: 'Soybean', icon: '🫘', days: 90, price: '₹4,520/q', water: 'Medium Water', phMin: 6.0, phMax: 7.5, waterTypes: ['Rain-fed', 'Canal', 'Borewell', 'Drip'], baseSuit: 79, desc: 'Protein-rich cash crop for loamy land' },
    { name: 'Potato', icon: '🥔', days: 90, price: '₹1,100/q', water: 'Medium Water', phMin: 5.0, phMax: 6.5, waterTypes: ['Canal', 'Borewell', 'Drip'], baseSuit: 74, desc: 'High-yield tuber crop in loamy soil' },
    { name: 'Maize', icon: '🌽', days: 75, price: '₹1,850/q', water: 'Low Water', phMin: 5.5, phMax: 7.5, waterTypes: ['Rain-fed', 'Canal', 'Borewell', 'Drip'], baseSuit: 68, desc: 'Versatile and adaptable to loamy land' },
  ]
};

function showCropResults() {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];
  const btn = document.querySelector('#screen-crops .btn-primary');
  btn.innerHTML = dict.analyzing || 'Analyzing soil... 🤔';
  const soilBtn = document.querySelector('.soil-chips .chip-btn.active');
  const waterBtn = document.querySelector('.water-chips .chip-btn.active');
  const phSlider = document.querySelector('#screen-crops .ph-slider');
  const soilType = soilBtn ? soilBtn.textContent.trim() : 'Black Soil';
  const waterType = waterBtn ? waterBtn.textContent.trim() : 'Rain-fed';
  const pH = parseFloat(phSlider ? phSlider.value : 6.5);
  setTimeout(() => {
    btn.innerHTML = dict.find_crops || '🔍 Find Best Crops';
    const pool = CROP_DB[soilType] || CROP_DB['Black Soil'];
    const scored = pool.map(crop => {
      let suit = crop.baseSuit;
      if (pH < crop.phMin) suit -= Math.round((crop.phMin - pH) * 10);
      if (pH > crop.phMax) suit -= Math.round((pH - crop.phMax) * 10);
      if (crop.waterTypes.includes(waterType)) suit += 4;
      else suit -= 8;
      suit = Math.max(30, Math.min(99, suit));
      return { ...crop, suit };
    }).sort((a, b) => b.suit - a.suit).slice(0, 3);
    const resultsEl = document.getElementById('crop-results');
    resultsEl.classList.remove('hidden');
    const ranks = ['🥇 #1', '🥈 #2', '🥉 #3'];
    const rankClass = ['crop-rank-1', 'crop-rank-2', 'crop-rank-3'];
    const badgeLabel = [
      scored[0].suit >= 80 ? (dict.suit_high || 'HIGH') : (dict.suit_med || 'MED'),
      scored[1] && scored[1].suit >= 75 ? (dict.suit_high || 'HIGH') : (dict.suit_med || 'MED'),
      (dict.suit_med || 'MED')
    ];
    const header = resultsEl.querySelector('.section-header');
    resultsEl.innerHTML = '';
    resultsEl.appendChild(header);
    scored.forEach((crop, i) => {
      const card = document.createElement('div');
      card.className = `crop-result-card ${rankClass[i]}`;
      card.innerHTML = `
        <div class="rank-badge">${ranks[i]}</div>
        <div class="crop-result-body">
          <div class="crop-result-icon">${crop.icon}</div>
          <div class="crop-result-info">
            <h3>${crop.name}</h3>
            <p>${crop.desc}</p>
            <div class="suitability-bar">
              <div class="suit-fill" style="width:${crop.suit}%"></div>
            </div>
            <span class="suit-label">${crop.suit}% ${dict.suitable || 'Suitable'}</span>
          </div>
          <div class="crop-result-badge ${scored[i].suit >= 80 ? 'badge-high' : 'badge-med'}">${badgeLabel[i]}</div>
        </div>
        <div class="crop-extras">
          <span class="extra-tag">⏱ ${crop.days} ${dict.days || 'days'}</span>
          <span class="extra-tag">💰 ${crop.price}</span>
          <span class="extra-tag">💧 ${crop.water}</span>
        </div>`;
      resultsEl.appendChild(card);
    });
    const scrollContainer = document.querySelector('#screen-crops .screen-scroll');
    scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' });
  }, 1500);
}

// --- Land Plan --- //
function generateLandPlan() {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];
  const btn = document.querySelector('#screen-land .btn-primary');
  btn.innerHTML = dict.generating_blueprint || 'Generating AI Blueprint... 📐';
  setTimeout(() => {
    btn.innerHTML = dict.gen_land_plan || '📋 Generate Land Plan';
    document.getElementById('land-plan-results').classList.remove('hidden');
  }, 1000);
}

// --- Pest Detection System --- //
const PEST_DATA = {
  aphid: {
    name: 'Aphid Infestation',
    conf: '94%',
    severity: '⚠️ High Severity',
    sevClass: 'severity-high',
    desc: 'Aphids suck sap from plant tissues, causing curling leaves. Most active in warm conditions.',
    organic: [
      { step: 'Spray Neem oil in early morning.', tip: 'Best when temp < 30°C' },
      { step: 'Prepare garlic-chilli spray.', tip: 'Natural repellent' }
    ],
    chemical: [
      { step: 'Spray Imidacloprid 17.8 SL @ 1ml/L.', tip: 'Fast acting' }
    ]
  },
  fungal: {
    name: 'Fungal Leaf Blight',
    conf: '91%',
    severity: '🔴 Severe',
    sevClass: 'severity-high',
    desc: 'Fungal blight causes rapid leaf browning in wet conditions.',
    organic: [
      { step: 'Spray Trichoderma viride.', tip: 'Bio-fungicide' },
      { step: 'Remove and burn infected leaves.', tip: 'Critical step' }
    ],
    chemical: [
      { step: 'Spray Mancozeb 75 WP @ 2.5g/L.', tip: 'Protective' }
    ]
  }
};

function triggerPestUpload() {
  document.getElementById('pest-file').click();
}

function showPestResult() {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];
  const area = document.getElementById('pest-upload-area');
  area.innerHTML = `
    <div class="ai-scan-icon" style="animation: breathe 1.5s infinite;">🔬</div>
    <div class="ai-scan-title">${T('Analyzing...')}</div>
  `;
  setTimeout(() => {
    area.innerHTML = `<div class="pest-upload-icon">✅</div><div class="pest-upload-title">${dict.complete_text || 'Complete!'}</div>`;
    showPestCard('aphid');
  }, 2000);
}

function switchPestTab(tab) {
  document.getElementById('pest-organic').classList.toggle('hidden', tab !== 'organic');
  document.getElementById('pest-chemical').classList.toggle('hidden', tab !== 'chemical');
  document.getElementById('tab-organic').classList.toggle('active', tab === 'organic');
  document.getElementById('tab-chemical').classList.toggle('active', tab === 'chemical');
}

function renderSteps(containerId, steps) {
  const el = document.getElementById(containerId);
  el.innerHTML = steps.map((s, i) => `
    <div class="solution-step">
      <div class="sol-num">${i + 1}</div>
      <div>${s.step}<br><span class="sol-tip">${s.tip}</span></div>
    </div>`).join('');
}

function showPestCard(type) {
  const data = PEST_DATA[type];
  if (!data) return;
  document.getElementById('pest-result').classList.remove('hidden');
  document.getElementById('pest-conf').textContent = data.conf;
  document.getElementById('pest-name').textContent = data.name;
  const sevEl = document.getElementById('pest-severity');
  sevEl.textContent = data.severity;
  sevEl.className = `pest-severity ${data.sevClass}`;
  document.getElementById('pest-desc').textContent = data.desc;
  renderSteps('organic-steps', data.organic);
  renderSteps('chemical-steps', data.chemical);
  switchPestTab('organic');
  const scrollContainer = document.querySelector('#screen-pest .screen-scroll');
  setTimeout(() => scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' }), 100);
}

// --- Voice Assistant System --- //
const LANG_MAP = {
  en: 'en-IN',
  hi: 'hi-IN',
  te: 'te-IN',
  kn: 'kn-IN',
  ml: 'ml-IN'
};

let recognition = null;
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = function () {
    isVoiceActive = true;
    document.getElementById('voice-status').textContent = T("Listening...");
    document.getElementById('voice-anim-wrap').classList.add('listening');
  };

  recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById('voice-status').textContent = T("🤔 Processing...");
    document.getElementById('voice-anim-wrap').classList.remove('listening');
    sendVoiceQuery(transcript);
  };

  recognition.onerror = function (event) {
    console.error("Speech recognition error", event.error);
    isVoiceActive = false;
    document.getElementById('voice-anim-wrap').classList.remove('listening');
    if (event.error === 'not-allowed') {
      document.getElementById('voice-status').textContent = T("Microphone access denied.");
    } else if (event.error === 'no-speech') {
      document.getElementById('voice-status').textContent = T("No speech detected. Try again.");
    } else {
      document.getElementById('voice-status').textContent = T("Could not hear you. Try again.");
    }
  };

  recognition.onend = function () {
    isVoiceActive = false;
    document.getElementById('voice-anim-wrap').classList.remove('listening');
    const statusEl = document.getElementById('voice-status');
    if (statusEl.textContent === T("Listening...")) {
      statusEl.textContent = T("Tap mic to speak");
    }
  };
}

function startListening() {
  if (!recognition) {
    alert("Speech recognition not supported in your browser.");
    return;
  }
  recognition.lang = LANG_MAP[currentLang] || 'en-IN';
  try {
    recognition.start();
  } catch (e) {
    console.error(e);
  }
}

function toggleVoice() {
  const overlay = document.getElementById('voice-overlay');
  const fab = document.getElementById('voice-fab');
  if (!overlay || !fab) return;

  if (overlay.classList.contains('open')) {
    overlay.classList.remove('open');
    fab.classList.remove('listening');
    isVoiceActive = false;
    if (window.speechSynthesis) speechSynthesis.cancel();
    if (recognition) {
      try { recognition.stop(); } catch (e) { console.warn("Recognition stop error:", e); }
    }
  } else {
    // Reset any previous state
    if (recognition) {
      try { recognition.stop(); } catch (e) { }
    }

    overlay.classList.add('open');
    fab.classList.add('listening');
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS['en'];

    // Clear chat area for fresh start? Or just add greeting
    const chatArea = document.getElementById('chat-area');
    if (chatArea && chatArea.children.length === 0) {
      addChatBubble(dict.ai_ask || "Namaste! What do you want to ask? 🎤", 'ai');
    }

    setTimeout(() => {
      startListening();
    }, 400); // Small delay to let overlay animate

    // Bind click to the inner icon to restart listening if needed
    const voiceCore = document.querySelector('.voice-anim-core');
    if (voiceCore) {
      voiceCore.style.cursor = 'pointer';
      voiceCore.onclick = (e) => {
        e.stopPropagation();
        startListening();
      };
    }
  }
}

function addChatBubble(text, sender) {
  const chatArea = document.getElementById('chat-area');
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble bubble-${sender}`;
  bubble.innerHTML = text;
  chatArea.appendChild(bubble);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function sendVoiceFromInput() {
  const input = document.getElementById('voice-text');
  if (input.value.trim() === '') return;
  sendVoiceQuery(input.value);
  input.value = '';
}

async function askAI(message) {
  try {
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message, lang: currentLang })
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching AI response:', error);
    let errorMsg = "Sorry, I couldn't reach the AI server.";
    if (currentLang === 'hi') errorMsg = "क्षमा करें, मैं सर्वर से संपर्क नहीं कर पा रहा हूँ।";
    return { reply: errorMsg, detectedLang: currentLang };
  }
}

async function sendVoiceQuery(queryText) {
  addChatBubble(queryText, 'user');

  const chatArea = document.getElementById('chat-area');
  const loadingBubble = document.createElement('div');
  loadingBubble.className = 'chat-bubble bubble-ai loading-bubble';
  loadingBubble.innerHTML = T('🤔 Processing...');
  chatArea.appendChild(loadingBubble);
  chatArea.scrollTop = chatArea.scrollHeight;

  const data = await askAI(queryText);
  const reply = data.reply;
  const detectedLang = data.detectedLang || currentLang;

  if (loadingBubble.parentNode) loadingBubble.remove();
  const statusEl = document.getElementById('voice-status');
  if (statusEl) statusEl.textContent = T("Done.");

  addChatBubble(reply, 'ai');
  speakText(reply, detectedLang);
}

function speakText(text, detectedLangStr) {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();

    const utter = () => {
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = speechSynthesis.getVoices();

      const baseLang = detectedLangStr || currentLang;
      const targetLang = LANG_MAP[baseLang] || 'en-IN';

      // Advanced voice matching
      let voice = voices.find(v => v.lang === targetLang);
      if (!voice) voice = voices.find(v => v.lang.includes(targetLang));
      if (!voice && targetLang.includes('-')) {
        const shortLang = targetLang.split('-')[0];
        voice = voices.find(v => v.lang.startsWith(shortLang));
      }
      if (!voice) voice = voices[0];

      utterance.voice = voice;
      utterance.lang = targetLang;
      utterance.rate = 0.9; // Slightly slower for clarity
      speechSynthesis.speak(utterance);
    };

    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.onvoiceschanged = utter;
    } else {
      utter();
    }
  }
}

// --- Backend Integration --- //
async function fetchWeather() {
  try {
    const res = await fetch('/api/weather');
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    // Update dashboard quick stats
    const chips = document.querySelectorAll('.quick-stats .stat-chip');
    if (chips.length >= 3) {
      chips[0].innerHTML = `<span>🌡️</span> ${data.temp}°C`;
      chips[1].innerHTML = `<span>💧</span> ${data.humidity}% ${T('Humid')}`;
      chips[2].innerHTML = `<span>🌬️</span> ${data.wind || '12 km/h'}`;
    }
    // Update dashboard weather card
    const weatherVal = document.querySelector('.card-weather .dash-card-value');
    if (weatherVal) weatherVal.textContent = T(data.condition);
    const weatherSub = document.querySelector('.card-weather .dash-card-sub');
    if (weatherSub) weatherSub.textContent = T(data.forecast || 'Expect normal conditions');
  } catch (err) {
    console.error('Failed to fetch weather:', err);
  }
}

async function fetchMarket() {
  try {
    const res = await fetch('/api/market');
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();

    // Update MARKET_DATA dictionary
    data.forEach(item => {
      if (MARKET_DATA[item.crop]) {
        MARKET_DATA[item.crop].prices[0] = item.price; // Update latest price
      }
    });

    // Refresh UI if necessary
    const activeChip = document.querySelector('.comm-chip.active');
    if (activeChip) {
      selectComm(activeChip);
    }

    // Update the dashboard market card if available
    const marketVal = document.querySelector('.card-market .dash-card-value');
    const soybeanData = data.find(c => c.crop === 'Soybean');
    if (soybeanData && marketVal) {
      marketVal.textContent = `₹${soybeanData.price.toLocaleString('en-IN')}/q`;
    }
  } catch (err) {
    console.error('Failed to fetch market data:', err);
  }
}

// --- Health Scan --- //
function triggerHealthScan() {
  const area = document.getElementById('health-scan-area');
  area.innerHTML = `<div class="ai-scan-icon">🔬</div><div class="ai-scan-title">${T('Scanning...')}</div>`;
  setTimeout(() => {
    area.innerHTML = `<div class="ai-scan-icon">✅</div><div class="ai-scan-title">${T('Healthy!')}</div>`;
  }, 2000);
}

// --- Community --- //
let selectedPostType = '';
function selectPostType(type, btn) {
  selectedPostType = type;
  document.querySelectorAll('.post-action-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('active');
}

function addCommunityPost() {
  const input = document.getElementById('post-input');
  if (!input.value.trim()) return;
  const post = document.createElement('div');
  post.className = 'comm-post';
  post.innerHTML = `<div class="comm-post-body">${input.value}</div>`;
  document.getElementById('comm-feed').prepend(post);
  input.value = '';
}
