import React from 'react';
import { Award, TrendingUp, TrendingDown, Info, ArrowRight, Wheat, ExternalLink } from 'lucide-react';
import { BestPriceReport } from '../types';

interface BestPricesSectionProps {
  reports: BestPriceReport[];
  onSelectCrop: (cropSlug: string) => void;
  onSelectMandi: (mandiSlug: string) => void;
}

export const BestPricesSection: React.FC<BestPricesSectionProps> = ({
  reports,
  onSelectCrop,
  onSelectMandi
}) => {
  // Show top 4-6 reports
  const displayReports = reports.slice(0, 6);

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-slate-200 gap-2">
        <div>
          <div className="flex items-center space-x-1.5 text-[#065F46] text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4 text-[#10B981]" />
            <span>भाव विश्लेषण एवं तुलना</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            आज सबसे अच्छा भाव (Best Mandi Prices)
          </h2>
          <p className="text-slate-600 text-sm mt-0.5">
            जानें आज किस मंडी में किस फसल का मॉडल भाव सबसे अधिक दर्ज हुआ है
          </p>
        </div>
      </div>

      {/* Important Farmer Disclaimer */}
      <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3.5 sm:p-4 mb-6 text-xs sm:text-sm text-amber-900 flex items-start space-x-3">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>किसान भाइयों के लिए ध्यान दें:</strong> उच्चतम मॉडल भाव केवल तुलनात्मक सूचना हेतु है। माल परिवहन, आवक, नमी, गुणवत्ता, मंडी शुल्क, लोडिंग-अनलोडिंग व स्थानीय व्यापारी मांग के अनुसार आपका वास्तविक प्राप्त मूल्य भिन्न हो सकता है।
        </p>
      </div>

      {/* Best Price Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {displayReports.map((report) => {
          const diff = report.highest.modal_price - report.lowest.modal_price;
          return (
            <div 
              key={report.crop_id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow p-5 flex flex-col justify-between group"
            >
              <div>
                {/* Crop Name & Category */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 
                      onClick={() => onSelectCrop(report.crop_id.replace('crop-', ''))}
                      className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{report.crop_name_hi}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700" />
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">
                      {report.category} • {report.total_mandis_reporting} मंडियों की रिपोर्ट
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">औसत भाव</span>
                    <span className="text-sm font-bold text-slate-700">₹{report.avg_modal_price.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Highest Mandi Box */}
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3.5 mb-3">
                  <div className="flex items-center justify-between text-xs text-[#065F46] font-bold mb-1">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-[#10B981]" />
                      सबसे अधिक मॉडल भाव
                    </span>
                    <span className="bg-[#065F46] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                      शीर्ष मंडी
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between mt-1">
                    <div>
                      <button
                        onClick={() => onSelectMandi(report.highest.mandi_id.replace('mandi-', ''))}
                        className="text-sm sm:text-base font-bold text-slate-900 hover:text-[#065F46] hover:underline text-left cursor-pointer"
                      >
                        {report.highest.mandi_name_hi}
                      </button>
                      <span className="text-xs text-slate-500 block">({report.highest.district_name_hi})</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black text-[#065F46]">
                        ₹{report.highest.modal_price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-slate-500 font-normal block">/{report.unit}</span>
                    </div>
                  </div>
                </div>

                {/* Lowest Mandi Box */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs">
                  <div className="flex items-center justify-between text-slate-600 font-medium mb-1">
                    <span className="flex items-center gap-1">
                      <TrendingDown className="w-3.5 h-3.5 text-slate-400" />
                      न्यूनतम मॉडल भाव
                    </span>
                    <span>अंतर: <strong className="text-slate-900">+₹{diff.toLocaleString('en-IN')}</strong></span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 font-semibold">{report.lowest.mandi_name_hi}</span>
                    <span className="font-bold text-slate-900">₹{report.lowest.modal_price.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onSelectCrop(report.crop_id.replace('crop-', ''))}
                  className="text-xs font-bold text-[#065F46] hover:text-[#044E3A] flex items-center gap-1 cursor-pointer"
                >
                  <span>{report.crop_name_hi} के सभी मंडी भाव देखें</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
