import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Share2, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  ExternalLink,
  Info
} from 'lucide-react';
import { mandiStore } from '../lib/mandiStore';
import { DISPLAY_TODAY_HI, LAST_UPDATE_TIME_HI } from '../data/seedData';
import { DailyPrice } from '../types';

interface MandiDetailPageProps {
  mandiSlug: string;
  onSelectCrop: (cropSlug: string) => void;
  onSelectDistrict: (districtSlug: string) => void;
  onShareWhatsApp: (text: string) => void;
}

export const MandiDetailPage: React.FC<MandiDetailPageProps> = ({
  mandiSlug,
  onSelectCrop,
  onSelectDistrict,
  onShareWhatsApp
}) => {
  const allMandis = mandiStore.getMandis();
  const mandi = mandiStore.getMandiById(mandiSlug) || allMandis[0];
  const mandiPrices = mandiStore.getPricesForMandi(mandi.id);
  const district = mandiStore.getDistrictBySlug(mandi.district_id);

  const handleShare = () => {
    let text = `🏛️ *${mandi.name_hi} आज के भाव (${DISPLAY_TODAY_HI})*\n\n`;
    if (mandiPrices.length > 0) {
      mandiPrices.forEach(p => {
        text += `• *${p.crop_name_hi}*: ₹${p.modal_price.toLocaleString('en-IN')}/${p.unit} (न्यूनतम: ₹${p.min_price} - अधिकतम: ₹${p.max_price})\n`;
      });
    } else {
      text += `आज इस मंडी का भाव उपलब्ध नहीं है।\n`;
    }
    text += `\n📍 अंतिम अपडेट: ${LAST_UPDATE_TIME_HI}`;
    onShareWhatsApp(text);
  };

  const totalArrival = mandiPrices.reduce((acc, p) => acc + (p.arrival_quantity || 0), 0);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs text-slate-500 mb-4">
        <span>मुखपृष्ठ</span>
        <span>/</span>
        <span>मंडियां</span>
        <span>/</span>
        <button 
          onClick={() => onSelectDistrict(district?.slug || 'mandsaur')}
          className="hover:underline cursor-pointer hover:text-[#065F46]"
        >
          {mandi.district_name_hi} जिला
        </button>
        <span>/</span>
        <span className="text-[#065F46] font-bold">{mandi.name_hi}</span>
      </div>

      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#065F46] text-xs font-bold uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4 text-[#10B981]" />
              <span>{mandi.market_type || 'कृषि उपज मंडी'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {mandi.name_hi} भाव आज
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{mandi.location} (जिला: {mandi.district_name_hi})</span>
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleShare}
              className="bg-[#065F46] hover:bg-[#044E3A] text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>WhatsApp पर शेयर करें</span>
            </button>
          </div>
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
          <span className="flex items-center gap-1 text-[#065F46] font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
            सत्यापित मंडी डेटा
          </span>
          {mandi.contact_phone && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-600">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                दूरभाष: {mandi.contact_phone}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Mandi Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-500 font-bold uppercase block">कुल दर्ज फसलें</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {mandiPrices.length}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-500 font-bold uppercase block">आज की कुल आवक</span>
          <div className="text-xl sm:text-2xl font-black text-[#065F46] mt-1">
            {totalArrival > 0 ? `${totalArrival.toLocaleString('en-IN')} क्विं.` : 'उपलब्ध नहीं'}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
          <span className="text-[11px] text-slate-500 font-bold uppercase block">मंडी कार्य स्थिति</span>
          <div className="text-base sm:text-lg font-bold text-[#065F46] mt-1 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping"></span>
            <span>नीलामी व आवक चालू</span>
          </div>
        </div>
      </div>

      {/* Mandi Crops Price Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden mb-8">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            {mandi.name_hi} आज के भाव (दैनिक फसल दरें)
          </h2>
          <span className="text-xs text-slate-500">सभी भाव प्रति क्विंटल में</span>
        </div>

        {mandiPrices.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            "आज इस मंडी का भाव उपलब्ध नहीं है।"
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold text-xs uppercase">
                  <th className="py-3.5 px-4">फसल का नाम</th>
                  <th className="py-3.5 px-4 text-right">न्यूनतम भाव</th>
                  <th className="py-3.5 px-4 text-right">अधिकतम भाव</th>
                  <th className="py-3.5 px-4 text-right">मॉडल भाव</th>
                  <th className="py-3.5 px-4 text-center">बदलाव</th>
                  <th className="py-3.5 px-4 text-right">आवक</th>
                  <th className="py-3.5 px-4 text-center">स्रोत</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mandiPrices.map((item) => {
                  const change = mandiStore.calculatePriceChange(item.modal_price, item.prev_modal_price);
                  return (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <button
                          onClick={() => onSelectCrop(item.crop_id.replace('crop-', ''))}
                          className="hover:text-[#065F46] hover:underline cursor-pointer flex items-center gap-1.5"
                        >
                          <span>{item.crop_name_hi}</span>
                          <span className="text-[11px] font-normal text-slate-400">({item.crop_name_en})</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right text-slate-600 font-medium">
                        ₹{item.min_price.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 text-right text-slate-600 font-medium">
                        ₹{item.max_price.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 text-right font-black text-[#065F46] text-base">
                        ₹{item.modal_price.toLocaleString('en-IN')}
                        <span className="text-[10px] font-normal text-slate-400 block">/{item.unit}</span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {change.trend === 'up' && (
                          <span className="text-emerald-700 font-bold text-xs">
                            ↑ +₹{change.absolute}
                          </span>
                        )}
                        {change.trend === 'down' && (
                          <span className="text-red-600 font-bold text-xs">
                            ↓ -₹{change.absolute}
                          </span>
                        )}
                        {change.trend === 'same' && (
                          <span className="text-slate-400 text-xs">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right text-slate-600 font-medium">
                        {item.arrival_quantity ? `${item.arrival_quantity.toLocaleString('en-IN')} क्विं.` : '—'}
                      </td>
                      <td className="py-3.5 px-4 text-center text-[11px] text-slate-500">
                        {item.source}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Information Box */}
      <div className="bg-slate-100 rounded-2xl p-4 text-xs text-slate-600 space-y-1">
        <p className="font-bold text-slate-800 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-[#065F46]" />
          <span>मंडी सूचना एवं नियम:</span>
        </p>
        <p>• नीलामी के समय माल की सफाई, नमी एवं दाने की चमक के आधार पर अंतिम बोली तय होती है।</p>
        <p>• किसान भाई अपनी उपज को सुखाकर व छानकर मंडी लाएं ताकि उच्चतम भाव प्राप्त हो सके।</p>
      </div>
    </div>
  );
};
