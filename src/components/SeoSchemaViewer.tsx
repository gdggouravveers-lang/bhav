import React, { useState } from 'react';
import { Code, Check, Copy, Globe, Search, Tag } from 'lucide-react';
import { DISPLAY_TODAY_HI, TODAY_ISO } from '../data/seedData';

export const SeoSchemaViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const sampleJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "मध्य प्रदेश मंडी भाव",
    "alternateName": "MP Mandi Bhav Today",
    "url": "https://mandibhav-mp.in",
    "description": "मध्य प्रदेश की सभी प्रमुख कृषि उपज मंडियों (मंदसौर, नीमच, इंदौर, उज्जैन आदि) में आज के दैनिक न्यूनतम, अधिकतम और मॉडल भाव।",
    "inLanguage": "hi-IN",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://mandibhav-mp.in/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "DataFeed",
      "name": `मध्य प्रदेश दैनिक कृषि मंडी भाव - ${DISPLAY_TODAY_HI}`,
      "dateModified": TODAY_ISO,
      "publisher": {
        "@type": "Organization",
        "name": "MP Mandi Bhav Portal",
        "areaServed": "Madhya Pradesh, India"
      }
    }
  };

  const jsonString = JSON.stringify(sampleJsonLd, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-[#065F46] text-xs font-bold uppercase tracking-wider mb-1">
            <Globe className="w-4 h-4 text-[#10B981]" />
            <span>SEO & स्ट्रक्चर्ड डेटा</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Google Search JSON-LD Structured Data
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            सर्च इंजन (Google Search) रिच रिजल्ट्स, हिंदी कीवर्ड इंडेक्सिंग व मेटा टैग्स विनिर्देश
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          {copied ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'कॉपी हो गया' : 'JSON-LD कॉपी करें'}</span>
        </button>
      </div>

      {/* SEO Key Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="font-bold text-slate-500 uppercase block">प्राथमिक भाषा</span>
          <span className="text-sm font-extrabold text-slate-900">hi-IN (हिंदी)</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="font-bold text-slate-500 uppercase block">Schema Type</span>
          <span className="text-sm font-extrabold text-[#065F46]">WebSite & DataFeed</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="font-bold text-slate-500 uppercase block">URL संरचना</span>
          <span className="text-sm font-extrabold text-slate-900">/{'{crop}'} /mandi/{'{mandi}'}</span>
        </div>
      </div>

      {/* Code Block */}
      <div className="bg-slate-900 text-emerald-300 p-4 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
        <pre>{jsonString}</pre>
      </div>
    </div>
  );
};
