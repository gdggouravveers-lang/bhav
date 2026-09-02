import React from 'react';
import { 
  ShieldCheck, 
  Info, 
  HelpCircle, 
  Scale, 
  Clock, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export const AboutAndDisclaimer: React.FC = () => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2 pb-6 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-[#065F46] text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-[#10B981]" />
          <span>पारदर्शिता एवं नियम</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          डेटा स्रोत, पारदर्शिता एवं अस्वीकरण (Disclaimer)
        </h1>
        <p className="text-slate-600 text-sm max-w-2xl mx-auto">
          मध्य प्रदेश दैनिक मंडी भाव पोर्टल के डेटा संकलन, भाव परिभाषाओं और उपयोग की शर्तों की संपूर्ण जानकारी
        </p>
      </div>

      {/* Section 1: Data Sources & Update Schedule */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#065F46]" />
          <span>डेटा स्रोत एवं दैनिक अपडेट समय सारिणी</span>
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          हमारे पोर्टल पर प्रदर्शित भाव मध्य प्रदेश राज्य कृषि विपणन बोर्ड (MP Mandi Board), विभिन्न कृषि उपज मंडी समितियों (APMC) के आधिकारिक नीलामी रजिस्टर, ई-अनुज्ञा प्रणाली एवं स्थानीय विश्वसनीय मंडी प्रतिनिधियों द्वारा संकलित किए जाते हैं।
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-slate-500 uppercase block">प्राथमिक अपडेट</span>
            <span className="text-base font-extrabold text-slate-900">दोपहर 1:30 बजे</span>
            <p className="text-[11px] text-slate-500 mt-0.5">सुबह की प्रारंभिक नीलामी रिपोर्ट</p>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-slate-500 uppercase block">मुख्य अपडेट</span>
            <span className="text-base font-extrabold text-slate-900">शाम 5:30 बजे</span>
            <p className="text-[11px] text-slate-500 mt-0.5">दिन की संपूर्ण नीलामी व मॉडल भाव</p>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-slate-500 uppercase block">अंतिम सत्यापन</span>
            <span className="text-base font-extrabold text-slate-900">शाम 7:00 बजे</span>
            <p className="text-[11px] text-slate-500 mt-0.5">मंडी समिति आधिकारिक रिकॉर्ड मिलान</p>
          </div>
        </div>
      </div>

      {/* Section 2: Definitions of Prices */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Scale className="w-5 h-5 text-[#065F46]" />
          <span>मंडी भाव परिभाषाएं (Price Definitions)</span>
        </h2>
        <div className="space-y-3 text-sm text-slate-700">
          <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
            <h3 className="font-bold text-[#065F46] mb-1">1. मॉडल भाव (Modal Price) क्या है?</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              मॉडल भाव वह मूल्य होता है जिस पर उस दिन मंडी में सबसे अधिक मात्रा (volume) में फसल का व्यापार हुआ। यह न्यूनतम या अधिकतम का साधारण औसत नहीं होता, बल्कि बाजार का वास्तविक प्रतिनिधि भाव होता है।
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-1">2. न्यूनतम भाव (Minimum Price)</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              दिन की नीलामी में उस फसल के सबसे कम गुणवत्ता वाले लॉट (जैसे अधिक नमी, कटा दाना, धूल-मिट्टी) के लिए लगी सबसे कम बोली।
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-1">3. अधिकतम भाव (Maximum Price)</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              सुपर क्वालिटी, बोल्ड दाना, कम नमी और बेहतरीन ग्रेडिंग वाले माल के लिए लगी दिन की सर्वोच्च बोली।
            </p>
          </div>
        </div>
      </div>

      {/* Section 3: Official Legal Disclaimer */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-6 space-y-3 text-amber-950">
        <h2 className="text-lg font-bold flex items-center gap-2 text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-700" />
          <span>वैधानिक अस्वीकरण (Legal & Commercial Disclaimer)</span>
        </h2>
        <div className="text-xs sm:text-sm space-y-2 leading-relaxed text-amber-900/90">
          <p>
            1. इस वेबसाइट पर दिए गए सभी भाव केवल सूचनात्मक एवं सामान्य मार्गदर्शन के उद्देश्य से प्रस्तुत किए जाते हैं।
          </p>
          <p>
            2. किसी भी फसल का वास्तविक विक्रय मूल्य मंडी में माल की गुणवत्ता, नमी की मात्रा, सफाई/छनाई, व्यापारी मांग, आवक का दबाव, और तात्कालिक बोली पर निर्भर करता है।
          </p>
          <p>
            3. किसानों और व्यापारियों से अनुरोध है कि माल का सौदा करने अथवा परिवहन करने से पूर्व अपनी स्थानीय मंडी समिति या अधिकृत व्यापारी से भाव की सीधी पुष्टि अवश्य कर लें। वेबसाइट किसी भी प्रकार के वित्तीय लाभ-हानि के लिए उत्तरदायी नहीं होगी।
          </p>
        </div>
      </div>

      {/* Section 4: Contact and Feedback */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Mail className="w-5 h-5 text-[#065F46]" />
          <span>संपर्क एवं मंडी रिपोर्टर सुझाव</span>
        </h2>
        <p className="text-sm text-slate-600">
          यदि आप मध्य प्रदेश की किसी मंडी के सचिव, व्यापारी, आढ़तिया या किसान प्रतिनिधि हैं और अपनी मंडी का दैनिक भाव जोड़ना चाहते हैं, तो हमसे संपर्क करें:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <Mail className="w-4 h-4 text-[#065F46]" />
            <span>ईमेल: <strong>contact@mandibhav-mp.in</strong></span>
          </div>
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <MapPin className="w-4 h-4 text-[#065F46]" />
            <span>स्थान: भोपाल / इंदौर, मध्य प्रदेश</span>
          </div>
        </div>
      </div>
    </div>
  );
};
