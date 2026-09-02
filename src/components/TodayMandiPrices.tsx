import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Share2, 
  Filter, 
  Search, 
  ArrowUpDown, 
  ShieldCheck, 
  ExternalLink,
  Star,
  CheckCircle2
} from 'lucide-react';
import { DailyPrice, CropCategory } from '../types';
import { mandiStore } from '../lib/mandiStore';

interface TodayMandiPricesProps {
  prices: DailyPrice[];
  onSelectCrop: (cropSlug: string) => void;
  onSelectMandi: (mandiSlug: string) => void;
  onShareWhatsApp: (item: DailyPrice) => void;
}

export const TodayMandiPrices: React.FC<TodayMandiPricesProps> = ({
  prices,
  onSelectCrop,
  onSelectMandi,
  onShareWhatsApp
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('सभी');
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'modal-desc' | 'modal-asc' | 'arrival-desc' | 'name-asc'>('modal-desc');
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const categories = ['सभी', 'तिलहन', 'अनाज', 'मसाले', 'दलहन', 'सब्जियां', 'औषधीय फसलें'];
  const districts = mandiStore.getDistricts();

  const filteredPrices = useMemo(() => {
    return prices.filter(p => {
      // Category match
      if (selectedCategory !== 'सभी' && p.category !== selectedCategory) {
        return false;
      }
      // District match
      if (selectedDistrict !== 'all' && p.district_id !== selectedDistrict) {
        return false;
      }
      // Search text match
      if (searchFilter.trim()) {
        const query = searchFilter.toLowerCase();
        const matchCrop = p.crop_name_hi.toLowerCase().includes(query) || p.crop_name_en.toLowerCase().includes(query);
        const matchMandi = p.mandi_name_hi.toLowerCase().includes(query) || p.mandi_name_en.toLowerCase().includes(query);
        const matchDistrict = p.district_name_hi.toLowerCase().includes(query);
        if (!matchCrop && !matchMandi && !matchDistrict) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'modal-desc') return b.modal_price - a.modal_price;
      if (sortBy === 'modal-asc') return a.modal_price - b.modal_price;
      if (sortBy === 'arrival-desc') return (b.arrival_quantity || 0) - (a.arrival_quantity || 0);
      if (sortBy === 'name-asc') return a.crop_name_hi.localeCompare(b.crop_name_hi, 'hi');
      return 0;
    });
  }, [prices, selectedCategory, selectedDistrict, searchFilter, sortBy]);

  const totalPages = Math.ceil(filteredPrices.length / itemsPerPage) || 1;
  const paginatedPrices = filteredPrices.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#065F46] text-xs font-bold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
            <span>दैनिक लाइव बाजार दरें</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            आज के प्रमुख मंडी भाव
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            मध्य प्रदेश की प्रमुख मंडियों में आज दर्ज न्यूनतम, अधिकतम व मॉडल भाव (प्रति क्विंटल)
          </p>
        </div>

        {/* Total records count */}
        <div className="text-xs text-slate-500 bg-white px-3 py-1.5 rounded-lg self-start md:self-auto border border-slate-200 shadow-xs">
          कुल <strong className="text-slate-800 font-bold">{filteredPrices.length}</strong> प्रविष्टियां उपलब्ध
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-6 space-y-4">
        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#065F46] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Quick Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => {
                setSearchFilter(e.target.value);
                setPage(1);
              }}
              placeholder="फसल या मंडी नाम से छानें..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:border-[#065F46] focus:ring-1 focus:ring-[#065F46] focus:outline-hidden bg-slate-50/50"
            />
          </div>

          {/* District Selector */}
          <div>
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:border-[#065F46] focus:ring-1 focus:ring-[#065F46] focus:outline-hidden bg-white text-slate-700 font-medium"
            >
              <option value="all">सभी जिले (सम्पूर्ण म.प्र.)</option>
              {districts.map(d => (
                <option key={d.id} value={d.id}>{d.name_hi} जिला</option>
              ))}
            </select>
          </div>

          {/* Sorting */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:border-[#065F46] focus:ring-1 focus:ring-[#065F46] focus:outline-hidden bg-white text-slate-700 font-medium"
            >
              <option value="modal-desc">मॉडल भाव: सर्वाधिक पहले</option>
              <option value="modal-asc">मॉडल भाव: न्यूनतम पहले</option>
              <option value="arrival-desc">आवक (क्विंटल): अधिक पहले</option>
              <option value="name-asc">फसल नाम (अ-ह)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Display: Mobile Cards + Desktop Table */}
      {paginatedPrices.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <p className="text-slate-700 font-semibold text-base mb-1">
            "आज का भाव अभी उपलब्ध नहीं है या चयन के अनुसार कोई डेटा नहीं मिला।"
          </p>
          <p className="text-xs text-slate-500">
            कृपया अपने फ़िल्टर बदलें या अन्य फसल/मंडी खोजें।
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider">
                    <th className="py-3.5 px-4">फसल</th>
                    <th className="py-3.5 px-4">मंडी (जिला)</th>
                    <th className="py-3.5 px-4 text-right">न्यूनतम भाव</th>
                    <th className="py-3.5 px-4 text-right">अधिकतम भाव</th>
                    <th className="py-3.5 px-4 text-right">मॉडल भाव</th>
                    <th className="py-3.5 px-4 text-center">बदलाव</th>
                    <th className="py-3.5 px-4 text-right">आवक</th>
                    <th className="py-3.5 px-4 text-center">शेयर</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedPrices.map((item) => {
                    const change = mandiStore.calculatePriceChange(item.modal_price, item.prev_modal_price);
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                        {/* Crop Name */}
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          <button
                            onClick={() => onSelectCrop(item.crop_id.replace('crop-', ''))}
                            className="hover:text-[#065F46] cursor-pointer flex items-center gap-1.5 text-left"
                          >
                            <span>{item.crop_name_hi}</span>
                            <span className="text-[11px] font-normal text-slate-400">({item.crop_name_en})</span>
                          </button>
                        </td>

                        {/* Mandi & District */}
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => onSelectMandi(item.mandi_id.replace('mandi-', ''))}
                            className="text-slate-800 hover:text-[#065F46] font-medium cursor-pointer flex items-center gap-1"
                          >
                            <span>{item.mandi_name_hi}</span>
                            <span className="text-xs text-slate-500">({item.district_name_hi})</span>
                          </button>
                        </td>

                        {/* Minimum Price */}
                        <td className="py-3.5 px-4 text-right font-medium text-slate-600">
                          ₹{item.min_price.toLocaleString('en-IN')}
                        </td>

                        {/* Maximum Price */}
                        <td className="py-3.5 px-4 text-right font-medium text-slate-600">
                          ₹{item.max_price.toLocaleString('en-IN')}
                        </td>

                        {/* Modal Price */}
                        <td className="py-3.5 px-4 text-right font-black text-base text-[#065F46]">
                          ₹{item.modal_price.toLocaleString('en-IN')}
                          <span className="text-[10px] font-normal text-slate-500 block">/{item.unit}</span>
                        </td>

                        {/* Price Change */}
                        <td className="py-3.5 px-4 text-center">
                          {change.trend === 'up' && (
                            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                              <TrendingUp className="w-3.5 h-3.5" />
                              +{change.absolute} ({change.percentage}%)
                            </span>
                          )}
                          {change.trend === 'down' && (
                            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full">
                              <TrendingDown className="w-3.5 h-3.5" />
                              -{change.absolute} ({change.percentage}%)
                            </span>
                          )}
                          {change.trend === 'same' && (
                            <span className="inline-flex items-center gap-0.5 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                              <Minus className="w-3 h-3" />
                              स्थिर
                            </span>
                          )}
                          {change.trend === 'na' && (
                            <span className="text-xs text-slate-400">N/A</span>
                          )}
                        </td>

                        {/* Arrival */}
                        <td className="py-3.5 px-4 text-right text-xs text-slate-600">
                          {item.arrival_quantity ? (
                            <span>{item.arrival_quantity.toLocaleString('en-IN')} क्विंटल</span>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>

                        {/* Action Share */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => onShareWhatsApp(item)}
                            title="WhatsApp पर शेयर करें"
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#065F46] transition-colors cursor-pointer inline-flex items-center justify-center border border-emerald-200"
                            aria-label="WhatsApp शेयर करें"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards View */}
          <div className="md:hidden space-y-3">
            {paginatedPrices.map((item) => {
              const change = mandiStore.calculatePriceChange(item.modal_price, item.prev_modal_price);
              return (
                <div 
                  key={item.id}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3"
                >
                  {/* Top line: Crop and Mandi */}
                  <div className="flex items-start justify-between">
                    <div>
                      <button
                        onClick={() => onSelectCrop(item.crop_id.replace('crop-', ''))}
                        className="text-base font-bold text-slate-900 hover:text-[#065F46] text-left block"
                      >
                        {item.crop_name_hi}
                      </button>
                      <button
                        onClick={() => onSelectMandi(item.mandi_id.replace('mandi-', ''))}
                        className="text-xs font-medium text-[#065F46] hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <span>🏛️ {item.mandi_name_hi}</span>
                        <span className="text-slate-500">({item.district_name_hi})</span>
                      </button>
                    </div>

                    {/* WhatsApp Share button */}
                    <button
                      onClick={() => onShareWhatsApp(item)}
                      className="p-2 bg-emerald-50 text-[#065F46] border border-emerald-200 rounded-lg hover:bg-emerald-100 cursor-pointer flex items-center gap-1 text-xs font-semibold"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>शेयर</span>
                    </button>
                  </div>

                  {/* Price Grid */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-center">
                    <div>
                      <span className="text-[10px] text-slate-500 block">न्यूनतम</span>
                      <span className="text-xs font-semibold text-slate-700">₹{item.min_price.toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">अधिकतम</span>
                      <span className="text-xs font-semibold text-slate-700">₹{item.max_price.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="border-l border-slate-200 pl-1">
                      <span className="text-[10px] font-bold text-[#065F46] block">मॉडल भाव</span>
                      <span className="text-sm font-extrabold text-[#065F46]">₹{item.modal_price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Footer Row: Change & Arrival */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className="flex items-center gap-1">
                      <span className="text-slate-500 text-[11px]">बदलाव:</span>
                      {change.trend === 'up' && (
                        <span className="font-bold text-emerald-700 flex items-center gap-0.5">
                          <TrendingUp className="w-3 h-3" />
                          +₹{change.absolute} ({change.percentage}%)
                        </span>
                      )}
                      {change.trend === 'down' && (
                        <span className="font-bold text-red-700 flex items-center gap-0.5">
                          <TrendingDown className="w-3 h-3" />
                          -₹{change.absolute} ({change.percentage}%)
                        </span>
                      )}
                      {change.trend === 'same' && (
                        <span className="text-slate-500 font-medium">स्थिर (—)</span>
                      )}
                      {change.trend === 'na' && (
                        <span className="text-slate-400">N/A</span>
                      )}
                    </div>

                    {item.arrival_quantity && (
                      <div className="text-[11px] text-slate-600">
                        आवक: <strong>{item.arrival_quantity.toLocaleString('en-IN')}</strong> क्विंटल
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200 text-xs sm:text-sm">
              <span className="text-slate-500">
                पेज <strong>{page}</strong> / <strong>{totalPages}</strong> (कुल {filteredPrices.length} भाव)
              </span>
              <div className="flex items-center space-x-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 font-medium cursor-pointer"
                >
                  पिछला
                </button>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 font-medium cursor-pointer"
                >
                  अगला
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};
