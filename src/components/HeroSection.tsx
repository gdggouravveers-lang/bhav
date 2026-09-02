import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight, 
  Sparkles, 
  Building2, 
  Wheat, 
  MapPin, 
  X,
  TrendingUp
} from 'lucide-react';
import { DISPLAY_TODAY_HI, LAST_UPDATE_TIME_HI } from '../data/seedData';
import { mandiStore } from '../lib/mandiStore';
import { SearchResult } from '../types';

interface HeroSectionProps {
  onSelectResult: (result: SearchResult) => void;
  onNavigate: (view: any, payload?: any) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectResult,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const quickTags = [
    { label: 'सोयाबीन', type: 'crop', slug: 'soybean' },
    { label: 'गेहूं', type: 'crop', slug: 'wheat' },
    { label: 'लहसुन', type: 'crop', slug: 'garlic' },
    { label: 'प्याज', type: 'crop', slug: 'onion' },
    { label: 'मंदसौर मंडी', type: 'mandi', slug: 'mandsaur' },
    { label: 'नीमच मंडी', type: 'mandi', slug: 'neemuch' },
    { label: 'इंदौर मंडी', type: 'mandi', slug: 'indore' },
    { label: 'उज्जैन मंडी', type: 'mandi', slug: 'ujjain' },
    { label: 'डॉलर चना', type: 'crop', slug: 'chana-dollar' },
  ];

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const found = mandiStore.search(searchQuery);
      setResults(found);
      setIsDropdownOpen(true);
    } else {
      setResults([]);
      setIsDropdownOpen(false);
    }
  }, [searchQuery]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item: SearchResult) => {
    setIsDropdownOpen(false);
    setSearchQuery('');
    onSelectResult(item);
  };

  return (
    <div className="relative bg-gradient-to-b from-[#065F46] via-[#044E3A] to-[#022C22] text-white pt-9 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Date & Update Live Pill */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-black/20 border border-emerald-400/30 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium mb-5 shadow-xs backdrop-blur-xs">
          <div className="flex items-center space-x-1.5 text-emerald-200">
            <Calendar className="w-3.5 h-3.5 text-[#10B981]" />
            <span>आज का भाव — <strong className="text-white">{DISPLAY_TODAY_HI}</strong></span>
          </div>
          <span className="hidden sm:inline text-emerald-400/60">•</span>
          <div className="flex items-center space-x-1.5 text-emerald-200">
            <Clock className="w-3.5 h-3.5 text-[#10B981]" />
            <span>अंतिम अपडेट: {LAST_UPDATE_TIME_HI}</span>
          </div>
          <span className="hidden sm:inline text-emerald-400/60">•</span>
          <div className="flex items-center space-x-1 text-white font-semibold bg-[#065F46] border border-emerald-500/40 px-2 py-0.5 rounded-full text-[11px]">
            <ShieldCheck className="w-3 h-3 text-[#10B981]" />
            <span>सत्यापित डेटा</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight">
          मध्य प्रदेश मंडी भाव – आज के ताज़ा भाव
        </h1>

        {/* Subheadline */}
        <p className="text-emerald-100/90 text-sm sm:text-base lg:text-lg font-normal max-w-3xl mx-auto mb-8 leading-relaxed">
          मध्य प्रदेश की प्रमुख मंडियों में फसलों के दैनिक न्यूनतम, अधिकतम और मॉडल भाव देखें।
        </p>

        {/* Prominent Search Container */}
        <div ref={searchContainerRef} className="max-w-2xl mx-auto relative mb-6">
          <div className="relative flex items-center bg-white rounded-2xl shadow-xl border-2 border-emerald-400/40 overflow-hidden focus-within:border-[#10B981] focus-within:ring-4 focus-within:ring-emerald-500/20 transition-all">
            <div className="pl-4 sm:pl-5 text-[#065F46]">
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim() && setIsDropdownOpen(true)}
              placeholder="फसल या मंडी खोजें... (उदा. गेहूं, सोयाबीन, लहसुन, मंदसौर, नीमच)"
              className="w-full py-3.5 sm:py-4 px-3 sm:px-4 text-slate-800 text-sm sm:text-base placeholder-slate-400 focus:outline-hidden font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-2 mr-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
                aria-label="खोज साफ करें"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => {
                if (results.length > 0) {
                  handleSelect(results[0]);
                }
              }}
              className="bg-[#065F46] hover:bg-[#044E3A] text-white px-5 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-base font-bold transition-colors cursor-pointer shrink-0"
            >
              खोजें
            </button>
          </div>

          {/* Autocomplete Dropdown */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 text-left animate-in fade-in-50 duration-150 max-h-96 overflow-y-auto">
              {results.length === 0 ? (
                <div className="p-6 text-center text-slate-500 text-sm">
                  <p className="font-semibold text-slate-700 mb-1">
                    "हमें आपकी खोज से कोई मंडी या फसल नहीं मिली।"
                  </p>
                  <p className="text-xs text-slate-400">
                    कृपया सही वर्तनी (उदा. सोयाबीन, गेहूं, मंदसौर, नीमच) के साथ पुनः प्रयास करें।
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  <div className="px-4 py-2 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    मिलते-जुलते परिणाम ({results.length})
                  </div>
                  {results.map((res) => (
                    <div
                      key={`${res.type}-${res.id}`}
                      onClick={() => handleSelect(res)}
                      className="px-4 py-3 hover:bg-emerald-50 cursor-pointer flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                          res.type === 'crop' 
                            ? 'bg-amber-100 text-amber-800' 
                            : res.type === 'mandi'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {res.type === 'crop' ? <Wheat className="w-4 h-4" /> : res.type === 'mandi' ? <Building2 className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-900 font-bold text-sm sm:text-base group-hover:text-emerald-900">
                              {res.title_hi}
                            </span>
                            <span className="text-slate-400 text-xs font-normal">
                              ({res.title_en})
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">
                            {res.subtitle_hi}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-emerald-700 font-medium group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                        भाव देखें <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Search Badges */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs text-emerald-200">
          <span className="font-semibold text-emerald-300 mr-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            लोकप्रिय खोज:
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag.slug}
              onClick={() => {
                if (tag.type === 'crop') {
                  onNavigate('crop-detail', { cropSlug: tag.slug });
                } else {
                  onNavigate('mandi-detail', { mandiSlug: tag.slug });
                }
              }}
              className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-lg transition-colors cursor-pointer border border-white/20 hover:border-white/40 font-medium"
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
