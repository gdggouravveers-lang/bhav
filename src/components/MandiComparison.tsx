import React, { useState } from 'react';
import { Scale, Plus, Trash2, Award, ArrowRight, Share2, Info, Check } from 'lucide-react';
import { mandiStore } from '../lib/mandiStore';
import { DailyPrice } from '../types';
import { DISPLAY_TODAY_HI } from '../data/seedData';

interface MandiComparisonProps {
  initialCropSlug?: string;
  onSelectMandi: (mandiSlug: string) => void;
  onShareWhatsApp: (text: string) => void;
}

export const MandiComparison: React.FC<MandiComparisonProps> = ({
  initialCropSlug = 'soybean',
  onSelectMandi,
  onShareWhatsApp
}) => {
  const allCrops = mandiStore.getCrops();
  const allMandis = mandiStore.getMandis();

  const [selectedCropId, setSelectedCropId] = useState<string>(() => {
    const found = allCrops.find(c => c.slug === initialCropSlug);
    return found ? found.id : (allCrops[0]?.id || 'crop-soybean');
  });

  const [selectedMandiIds, setSelectedMandiIds] = useState<string[]>([
    'mandi-mandsaur',
    'mandi-neemuch',
    'mandi-daloda',
    'mandi-jaora',
    'mandi-indore'
  ]);

  const [mandiToAdd, setMandiToAdd] = useState<string>('');

  const currentCrop = allCrops.find(c => c.id === selectedCropId);
  const cropPrices = mandiStore.getPricesForCrop(selectedCropId);

  // Get price records for selected mandis
  const comparisonData = selectedMandiIds.map(mId => {
    const mandi = allMandis.find(m => m.id === mId);
    const priceRecord = cropPrices.find(p => p.mandi_id === mId);
    return {
      mandiId: mId,
      mandiName: mandi ? mandi.name_hi : 'अज्ञात मंडी',
      mandiSlug: mandi?.slug || '',
      districtName: mandi?.district_name_hi || '',
      price: priceRecord || null
    };
  });

  // Calculate highest modal price for highlight
  const validPrices = comparisonData.filter(d => d.price !== null).map(d => d.price!);
  const highestModal = validPrices.length > 0 ? Math.max(...validPrices.map(p => p.modal_price)) : 0;
  const lowestModal = validPrices.length > 0 ? Math.min(...validPrices.map(p => p.modal_price)) : 0;
  const maxDiff = highestModal - lowestModal;

  const handleAddMandi = () => {
    if (mandiToAdd && !selectedMandiIds.includes(mandiToAdd)) {
      setSelectedMandiIds([...selectedMandiIds, mandiToAdd]);
      setMandiToAdd('');
    }
  };

  const handleRemoveMandi = (id: string) => {
    if (selectedMandiIds.length > 2) {
      setSelectedMandiIds(selectedMandiIds.filter(mId => mId !== id));
    }
  };

  const handleShareComparison = () => {
    if (!currentCrop) return;
    let text = `📊 *${currentCrop.name_hi} - विभिन्न मंडियों में भाव तुलना (${DISPLAY_TODAY_HI})*\n\n`;
    comparisonData.forEach(item => {
      if (item.price) {
        const isBest = item.price.modal_price === highestModal;
        text += `• *${item.mandiName}* (${item.districtName}): ₹${item.price.modal_price}/${currentCrop.unit} (न्यूनतम: ₹${item.price.min_price} - अधिकतम: ₹${item.price.max_price}) ${isBest ? '👑 शीर्ष भाव' : ''}\n`;
      } else {
        text += `• *${item.mandiName}*: आज भाव दर्ज नहीं है\n`;
      }
    });
    if (maxDiff > 0) {
      text += `\n💡 मंडियों में अधिकतम भाव अंतर: *₹${maxDiff.toLocaleString('en-IN')}/${currentCrop.unit}*`;
    }
    onShareWhatsApp(text);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#065F46] text-xs font-bold uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4 text-[#10B981]" />
            <span>लाइव भाव विश्लेषक</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            मंडी भाव तुलना (Mandi Bhav Comparison)
          </h1>
          <p className="text-slate-600 text-sm mt-0.5">
            एक ही फसल के अलग-अलग मंडियों के भाव की तुलना करें और सबसे बेहतर मॉडल भाव पहचानें
          </p>
        </div>

        <button
          onClick={handleShareComparison}
          className="bg-[#065F46] hover:bg-[#044E3A] text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-xs self-start sm:self-auto transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span>तुलना WhatsApp पर शेयर करें</span>
        </button>
      </div>

      {/* Selectors Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs mb-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Crop Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              1. फसल का चयन करें:
            </label>
            <select
              value={selectedCropId}
              onChange={(e) => setSelectedCropId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#065F46] focus:ring-1 focus:ring-[#065F46] focus:outline-hidden bg-slate-50 text-slate-900 font-bold text-sm"
            >
              {allCrops.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name_hi} ({c.name_en})
                </option>
              ))}
            </select>
          </div>

          {/* Add Mandi to Compare */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              2. तुलना हेतु अन्य मंडी जोड़ें:
            </label>
            <div className="flex gap-2">
              <select
                value={mandiToAdd}
                onChange={(e) => setMandiToAdd(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-[#065F46] focus:outline-hidden bg-white text-slate-800 text-sm"
              >
                <option value="">-- मंडी चुनें --</option>
                {allMandis
                  .filter(m => !selectedMandiIds.includes(m.id))
                  .map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name_hi} ({m.district_name_hi})
                    </option>
                  ))}
              </select>
              <button
                onClick={handleAddMandi}
                disabled={!mandiToAdd}
                className="bg-[#065F46] hover:bg-[#044E3A] disabled:opacity-40 text-white px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 cursor-pointer flex items-center gap-1 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>जोड़ें</span>
              </button>
            </div>
          </div>

          {/* Quick Summary Pill */}
          <div className="bg-emerald-50/80 rounded-xl p-3 border border-emerald-200 flex items-center justify-between sm:col-span-2 lg:col-span-1">
            <div>
              <span className="text-[11px] text-[#065F46] uppercase font-bold block">अधिकतम भाव अंतर</span>
              <span className="text-xl font-black text-[#065F46]">₹{maxDiff.toLocaleString('en-IN')}</span>
              <span className="text-xs text-slate-500 font-normal"> /{currentCrop?.unit}</span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-500 block">तुलना में शामिल</span>
              <span className="text-sm font-bold text-slate-800">{selectedMandiIds.length} मंडियां</span>
            </div>
          </div>
        </div>

        {/* Selected Mandis Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs text-slate-400 font-medium">चयनित मंडियां:</span>
          {selectedMandiIds.map(mId => {
            const mandi = allMandis.find(m => m.id === mId);
            return (
              <span
                key={mId}
                className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-lg border border-slate-200"
              >
                <span>{mandi?.name_hi}</span>
                {selectedMandiIds.length > 2 && (
                  <button
                    onClick={() => handleRemoveMandi(mId)}
                    className="text-slate-400 hover:text-red-600 cursor-pointer"
                    title="हटाएं"
                  >
                    ×
                  </button>
                )}
              </span>
            );
          })}
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {comparisonData.map((item) => {
          const isBest = item.price && item.price.modal_price === highestModal && highestModal > 0;
          const isLowest = item.price && item.price.modal_price === lowestModal && lowestModal > 0;
          const diffFromBest = item.price ? highestModal - item.price.modal_price : 0;
          const pctDiff = item.price && highestModal > 0 ? ((diffFromBest / highestModal) * 100).toFixed(1) : '0';

          return (
            <div
              key={item.mandiId}
              className={`bg-white rounded-2xl border p-5 shadow-xs flex flex-col justify-between relative transition-all ${
                isBest
                  ? 'border-[#065F46] ring-2 ring-[#10B981]/30'
                  : 'border-slate-200'
              }`}
            >
              {isBest && (
                <div className="absolute -top-3 right-4 bg-[#065F46] text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>सबसे अधिक मॉडल भाव</span>
                </div>
              )}

              <div>
                {/* Mandi Title */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 
                      onClick={() => onSelectMandi(item.mandiSlug)}
                      className="text-lg font-bold text-slate-900 hover:text-[#065F46] cursor-pointer"
                    >
                      {item.mandiName}
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">जिला: {item.districtName}</span>
                  </div>

                  {selectedMandiIds.length > 2 && (
                    <button
                      onClick={() => handleRemoveMandi(item.mandiId)}
                      className="text-slate-300 hover:text-red-500 p-1 cursor-pointer transition-colors"
                      title="तुलना से हटाएं"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {item.price ? (
                  <div className="space-y-3">
                    {/* Modal Price Highlight */}
                    <div className={`p-4 rounded-xl text-center ${
                      isBest ? 'bg-emerald-50/80 border border-emerald-200' : 'bg-slate-50 border border-slate-100'
                    }`}>
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        मॉडल भाव (Modal Price)
                      </span>
                      <div className="text-2xl font-black text-[#065F46] mt-1">
                        ₹{item.price.modal_price.toLocaleString('en-IN')}
                        <span className="text-xs font-normal text-slate-500"> /{item.price.unit}</span>
                      </div>
                    </div>

                    {/* Min and Max Range */}
                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="bg-slate-50 p-2.5 rounded-lg">
                        <span className="text-[10px] text-slate-400 block font-semibold">न्यूनतम भाव</span>
                        <span className="font-bold text-slate-700">₹{item.price.min_price.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-lg">
                        <span className="text-[10px] text-slate-400 block font-semibold">अधिकतम भाव</span>
                        <span className="font-bold text-slate-700">₹{item.price.max_price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    {/* Difference metric */}
                    <div className="pt-2 text-xs text-slate-600 flex items-center justify-between border-t border-slate-100">
                      <span>शीर्ष भाव से अंतर:</span>
                      {diffFromBest === 0 ? (
                        <span className="text-[#065F46] font-bold">सर्वोत्तम (0 अंतर)</span>
                      ) : (
                        <span className="text-red-600 font-semibold">-₹{diffFromBest.toLocaleString('en-IN')} ({pctDiff}%)</span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-slate-50 rounded-xl text-center text-slate-500 text-xs">
                    <p className="font-medium text-slate-700 mb-1">
                      आज इस मंडी का भाव उपलब्ध नहीं है
                    </p>
                    <p className="text-[11px] text-slate-400">
                      आवक या अवकाश के कारण डेटा दर्ज नहीं हुआ है।
                    </p>
                  </div>
                )}
              </div>

              {/* View mandi link */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#065F46]">
                <button
                  onClick={() => onSelectMandi(item.mandiSlug)}
                  className="hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>इस मंडी के सभी भाव</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Notes */}
      <div className="bg-slate-100 rounded-2xl p-4 sm:p-5 text-xs text-slate-600 space-y-2">
        <h4 className="font-bold text-slate-800 flex items-center gap-1.5 text-sm">
          <Info className="w-4 h-4 text-emerald-700" />
          <span>तुलना उपयोग विधि एवं दिशा-निर्देश:</span>
        </h4>
        <ul className="list-disc list-inside space-y-1 text-slate-600">
          <li>विभिन्न मंडियों के बीच भाव का अंतर मुख्य रूप से स्थानीय मिलर्स की मांग, निर्यात मांग व उपज की गुणवत्ता पर निर्भर करता है।</li>
          <li>दूर की मंडी में उपज ले जाने से पहले परिवहन भाड़ा (भाड़ा लागत) और मंडी कटौतियों का अवश्य हिसाब लगाएं।</li>
        </ul>
      </div>
    </div>
  );
};
