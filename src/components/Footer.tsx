import React from 'react';
import { Sprout, ShieldCheck, Heart, MapPin, Scale, Wheat, Building2, Code } from 'lucide-react';
import { ViewType } from '../types';

interface FooterProps {
  onNavigate: (view: ViewType, payload?: any) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenAdmin
}) => {
  const popularCrops = [
    { name: 'सोयाबीन भाव', slug: 'soybean' },
    { name: 'गेहूं भाव', slug: 'wheat' },
    { name: 'लहसुन भाव', slug: 'garlic' },
    { name: 'प्याज भाव', slug: 'onion' },
    { name: 'चना डॉलर भाव', slug: 'chana-dollar' },
    { name: 'मक्का भाव', slug: 'maize' },
    { name: 'सरसों भाव', slug: 'mustard' },
    { name: 'धनिया भाव', slug: 'coriander' },
  ];

  const popularMandis = [
    { name: 'मंदसौर मंडी भाव', slug: 'mandsaur' },
    { name: 'नीमच मंडी भाव', slug: 'neemuch' },
    { name: 'इंदौर मंडी भाव', slug: 'indore' },
    { name: 'उज्जैन मंडी भाव', slug: 'ujjain' },
    { name: 'जावरा मंडी भाव', slug: 'jaora' },
    { name: 'दलौदा मंडी भाव', slug: 'daloda' },
    { name: 'देवास मंडी भाव', slug: 'dewas' },
    { name: 'रतलाम मंडी भाव', slug: 'ratlam' },
  ];

  const popularDistricts = [
    { name: 'मंदसौर जिला', slug: 'mandsaur' },
    { name: 'नीमच जिला', slug: 'neemuch' },
    { name: 'इंदौर जिला', slug: 'indore' },
    { name: 'उज्जैन जिला', slug: 'ujjain' },
    { name: 'सीहोर जिला', slug: 'sehore' },
    { name: 'हरदा जिला', slug: 'harda' },
    { name: 'छिंदवाड़ा जिला', slug: 'chhindwara' },
    { name: 'जबलपुर जिला', slug: 'jabalpur' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-3 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 rounded-xl bg-[#065F46] flex items-center justify-center text-white shadow-xs">
                <Sprout className="w-6 h-6 text-[#10B981]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold tracking-tight text-white">
                    मंडी भाव
                  </span>
                  <span className="text-[10px] font-bold uppercase bg-amber-500 text-amber-950 px-1.5 py-0.5 rounded">
                    MP
                  </span>
                </div>
                <p className="text-xs text-[#10B981] font-medium">
                  मध्य प्रदेश का विश्वसनीय दैनिक कृषि भाव पोर्टल
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              मध्य प्रदेश की सभी प्रमुख कृषि उपज मंडियों (APMC) के दैनिक न्यूनतम, अधिकतम और मॉडल भाव। किसान भाइयों और कृषि व्यापारियों के लिए त्वरित, सटीक और पारदर्शी जानकारी।
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => onNavigate('about')}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-slate-700"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>सत्यापित डेटा नीति</span>
              </button>

              <button
                onClick={() => onNavigate('seo')}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-slate-700"
              >
                <Code className="w-3.5 h-3.5 text-blue-400" />
                <span>SEO Schema</span>
              </button>
            </div>
          </div>

          {/* Col 2: Popular Crops */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Wheat className="w-3.5 h-3.5 text-emerald-400" />
              <span>प्रमुख फसलें</span>
            </h3>
            <ul className="space-y-1.5 text-xs">
              {popularCrops.map(c => (
                <li key={c.slug}>
                  <button
                    onClick={() => onNavigate('crop-detail', { cropSlug: c.slug })}
                    className="hover:text-emerald-400 transition-colors text-slate-400 cursor-pointer"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Mandis */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>प्रमुख मंडियां</span>
            </h3>
            <ul className="space-y-1.5 text-xs">
              {popularMandis.map(m => (
                <li key={m.slug}>
                  <button
                    onClick={() => onNavigate('mandi-detail', { mandiSlug: m.slug })}
                    className="hover:text-emerald-400 transition-colors text-slate-400 cursor-pointer"
                  >
                    {m.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: District & Tools */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>जिले एवं टूल्स</span>
            </h3>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('compare')}
                  className="text-emerald-400 hover:underline font-semibold cursor-pointer"
                >
                  ⚡ भाव तुलना टूल (Compare)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('history')}
                  className="text-emerald-400 hover:underline font-semibold cursor-pointer"
                >
                  📈 भाव इतिहास ग्राफ (History)
                </button>
              </li>
              {popularDistricts.slice(0, 5).map(d => (
                <li key={d.slug}>
                  <button
                    onClick={() => onNavigate('district-detail', { districtSlug: d.slug })}
                    className="hover:text-emerald-400 transition-colors text-slate-400 cursor-pointer"
                  >
                    {d.name} मंडी भाव
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80 mb-8 text-[11px] text-slate-400 leading-relaxed">
          <strong className="text-slate-200">अस्वीकरण (Disclaimer):</strong> इस वेबसाइट पर प्रकाशित भाव मंडी समितियों के अधिकृत दैनिक रजिस्टर व ई-अनुज्ञा से संकलित किए जाते हैं। वास्तविक नीलामी दरें उपज की नमी, गुणवत्ता व स्थानीय मांग के अनुसार बदल सकती हैं। व्यापार करने से पूर्व अपनी स्थानीय मंडी में भाव की पुष्टि करें।
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span>© {new Date().getFullYear()} मध्य प्रदेश मंडी भाव पोर्टल. सर्व अधिकार सुरक्षित.</span>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('about')} 
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              पारदर्शिता व नियम
            </button>
            <span>•</span>
            <button 
              onClick={onOpenAdmin} 
              className="hover:text-slate-300 transition-colors cursor-pointer text-emerald-400 font-semibold"
            >
              प्रशासन लॉगिन
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
