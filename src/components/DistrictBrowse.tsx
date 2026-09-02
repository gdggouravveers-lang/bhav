import React, { useState } from 'react';
import { MapPin, Building2, ChevronRight, Search } from 'lucide-react';
import { mandiStore } from '../lib/mandiStore';

interface DistrictBrowseProps {
  onSelectDistrict: (districtSlug: string) => void;
  onSelectMandi: (mandiSlug: string) => void;
}

export const DistrictBrowse: React.FC<DistrictBrowseProps> = ({
  onSelectDistrict,
  onSelectMandi
}) => {
  const [districtSearch, setDistrictSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('सभी क्षेत्र');

  const districts = mandiStore.getDistricts();
  const regions = ['सभी क्षेत्र', 'मालवा', 'निमाड़', 'मध्य भारत', 'महाकौशल', 'ग्वालियर-चंबल', 'बुंदेलखंड', 'विंध्य'];

  const filteredDistricts = districts.filter(d => {
    if (selectedRegion !== 'सभी क्षेत्र' && d.region !== selectedRegion) {
      return false;
    }
    if (districtSearch.trim()) {
      const q = districtSearch.toLowerCase();
      return d.name_hi.toLowerCase().includes(q) || d.name_en.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#065F46] text-xs font-bold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
            <span>जिलावार निर्देशिका</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            मध्य प्रदेश के जिले एवं मंडियां
          </h2>
          <p className="text-slate-600 text-sm mt-0.5">
            अपने जिले का चयन करें और उस जिले की सभी मुख्य व उप-मंडियों के भाव देखें
          </p>
        </div>

        {/* Region Filter & Search */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-48">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={districtSearch}
              onChange={(e) => setDistrictSearch(e.target.value)}
              placeholder="जिला खोजें..."
              className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:border-[#065F46] bg-white"
            />
          </div>
        </div>
      </div>

      {/* Region Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 mb-6 custom-scrollbar">
        {regions.map((reg) => (
          <button
            key={reg}
            onClick={() => setSelectedRegion(reg)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedRegion === reg
                ? 'bg-[#065F46] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {reg}
          </button>
        ))}
      </div>

      {/* District Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredDistricts.map((dist) => {
          const distMandis = mandiStore.getMandis(dist.id);
          return (
            <div
              key={dist.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs hover:border-[#10B981] hover:shadow-md transition-all p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#065F46] flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 
                        onClick={() => onSelectDistrict(dist.slug)}
                        className="font-bold text-slate-900 hover:text-[#065F46] cursor-pointer text-base"
                      >
                        {dist.name_hi}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-medium">({dist.name_en})</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {dist.region}
                  </span>
                </div>

                {/* Mandi List Snippet */}
                <div className="mt-3 space-y-1">
                  <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">
                    प्रमुख मंडियां ({distMandis.length}):
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {distMandis.slice(0, 4).map(m => (
                      <button
                        key={m.id}
                        onClick={() => onSelectMandi(m.slug)}
                        className="text-[11px] bg-emerald-50 text-[#065F46] border border-emerald-100 hover:bg-emerald-100 px-2 py-0.5 rounded transition-colors cursor-pointer font-medium"
                      >
                        {m.name_hi.replace(' मंडी', '')}
                      </button>
                    ))}
                    {distMandis.length > 4 && (
                      <span className="text-[10px] text-slate-400 self-center">
                        +{distMandis.length - 4} और
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* View District Button */}
              <button
                onClick={() => onSelectDistrict(dist.slug)}
                className="mt-4 pt-2.5 border-t border-slate-100 w-full flex items-center justify-between text-xs font-bold text-[#065F46] hover:text-[#044E3A] cursor-pointer"
              >
                <span>जिले के सभी भाव देखें</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
