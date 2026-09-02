import React, { useState } from 'react';
import { MapPin, Building2, Wheat, ChevronRight, Share2, Calendar, Clock } from 'lucide-react';
import { mandiStore } from '../lib/mandiStore';
import { DISPLAY_TODAY_HI, LAST_UPDATE_TIME_HI } from '../data/seedData';

interface DistrictDetailPageProps {
  districtSlug: string;
  onSelectMandi: (mandiSlug: string) => void;
  onSelectCrop: (cropSlug: string) => void;
  onShareWhatsApp: (text: string) => void;
}

export const DistrictDetailPage: React.FC<DistrictDetailPageProps> = ({
  districtSlug,
  onSelectMandi,
  onSelectCrop,
  onShareWhatsApp
}) => {
  const allDistricts = mandiStore.getDistricts();
  const district = mandiStore.getDistrictBySlug(districtSlug) || allDistricts[0];
  const mandis = mandiStore.getMandis(district.id);
  const allPrices = mandiStore.getPricesForDate();
  const districtPrices = allPrices.filter(p => p.district_id === district.id);

  const [selectedMandiTab, setSelectedMandiTab] = useState<string>('all');

  const displayedPrices = selectedMandiTab === 'all'
    ? districtPrices
    : districtPrices.filter(p => p.mandi_id === selectedMandiTab);

  const handleShare = () => {
    const text = `📍 *${district.name_hi} जिला मंडी भाव (${DISPLAY_TODAY_HI})*\n\n` +
      `🏛️ कुल सक्रिय मंडियां: ${mandis.length}\n` +
      `🌾 प्रमुख फसलें: ${district.key_crops.join(', ')}\n` +
      `📊 कुल दर्ज भाव प्रविष्टियां: ${districtPrices.length}\n\n` +
      `अंतिम अपडेट: ${LAST_UPDATE_TIME_HI}`;
    onShareWhatsApp(text);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs text-slate-500 mb-4">
        <span>मुखपृष्ठ</span>
        <span>/</span>
        <span>जिले</span>
        <span>/</span>
        <span className="text-[#065F46] font-bold">{district.name_hi} जिला</span>
      </div>

      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#065F46] text-xs font-bold uppercase tracking-wider mb-1">
              <MapPin className="w-4 h-4 text-[#10B981]" />
              <span>{district.region} संभाग • जिला कृषि मंडी दरें</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {district.name_hi} जिला मंडी भाव आज
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              {district.name_hi} जिले की सभी प्रमुख मंडियों और उप-मंडियों के आज के दैनिक कृषि भाव
            </p>
          </div>

          <button
            onClick={handleShare}
            className="bg-[#065F46] hover:bg-[#044E3A] text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer shadow-xs self-start md:self-auto transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>जिला भाव शेयर करें</span>
          </button>
        </div>

        {/* Info Tags Row */}
        <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
          <span className="flex items-center gap-1 font-semibold text-slate-800">
            <Calendar className="w-3.5 h-3.5 text-[#065F46]" />
            {DISPLAY_TODAY_HI}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {LAST_UPDATE_TIME_HI}
          </span>
          <span>•</span>
          <span>प्रमुख फसलें: <strong>{district.key_crops.join(', ')}</strong></span>
        </div>
      </div>

      {/* Mandis in this District */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#065F46]" />
          <span>{district.name_hi} जिले की मंडियां ({mandis.length})</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mandis.map((m) => {
            const count = districtPrices.filter(p => p.mandi_id === m.id).length;
            return (
              <div
                key={m.id}
                onClick={() => onSelectMandi(m.slug)}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#10B981] hover:shadow-xs cursor-pointer transition-all flex items-center justify-between group"
              >
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-[#065F46] text-base">
                    {m.name_hi}
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    {count} फसलों के आज के भाव उपलब्ध
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#065F46] group-hover:translate-x-0.5 transition-transform" />
              </div>
            );
          })}
        </div>
      </div>

      {/* District Prices Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {district.name_hi} में आज के सभी मंडी भाव
            </h2>
            <span className="text-xs text-slate-500">कुल {displayedPrices.length} प्रविष्टियां</span>
          </div>

          {/* Mandi Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">मंडी फ़िल्टर:</span>
            <select
              value={selectedMandiTab}
              onChange={(e) => setSelectedMandiTab(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium bg-white text-slate-700"
            >
              <option value="all">जिले की सभी मंडियां</option>
              {mandis.map(m => (
                <option key={m.id} value={m.id}>{m.name_hi}</option>
              ))}
            </select>
          </div>
        </div>

        {displayedPrices.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            आज इस चयन के अनुसार कोई भाव दर्ज नहीं है।
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold text-xs uppercase">
                  <th className="py-3 px-4">फसल</th>
                  <th className="py-3 px-4">मंडी</th>
                  <th className="py-3 px-4 text-right">न्यूनतम</th>
                  <th className="py-3 px-4 text-right">अधिकतम</th>
                  <th className="py-3 px-4 text-right">मॉडल भाव</th>
                  <th className="py-3 px-4 text-right">आवक</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedPrices.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      <button
                        onClick={() => onSelectCrop(item.crop_id.replace('crop-', ''))}
                        className="hover:text-[#065F46] hover:underline cursor-pointer"
                      >
                        {item.crop_name_hi}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">
                      <button
                        onClick={() => onSelectMandi(item.mandi_id.replace('mandi-', ''))}
                        className="hover:text-[#065F46] hover:underline cursor-pointer"
                      >
                        {item.mandi_name_hi}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right text-slate-600 font-medium">
                      ₹{item.min_price.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-600 font-medium">
                      ₹{item.max_price.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right font-black text-[#065F46] text-base">
                      ₹{item.modal_price.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-600">
                      {item.arrival_quantity ? `${item.arrival_quantity.toLocaleString('en-IN')} क्विं.` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
