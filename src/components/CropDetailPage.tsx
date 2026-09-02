import React, { useState, useMemo } from 'react';
import { 
  Wheat, 
  Share2, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  MapPin, 
  Building2, 
  ArrowUpDown, 
  HelpCircle, 
  Calendar, 
  Clock, 
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { mandiStore } from '../lib/mandiStore';
import { DISPLAY_TODAY_HI, LAST_UPDATE_TIME_HI } from '../data/seedData';
import { DailyPrice } from '../types';

interface CropDetailPageProps {
  cropSlug: string;
  onSelectMandi: (mandiSlug: string) => void;
  onSelectCrop: (cropSlug: string) => void;
  onShareWhatsApp: (text: string) => void;
  onNavigateCompare: (cropSlug: string) => void;
}

export const CropDetailPage: React.FC<CropDetailPageProps> = ({
  cropSlug,
  onSelectMandi,
  onSelectCrop,
  onShareWhatsApp,
  onNavigateCompare
}) => {
  const allCrops = mandiStore.getCrops();
  const crop = mandiStore.getCropById(cropSlug) || allCrops[0];

  const [sortBy, setSortBy] = useState<'modal-desc' | 'modal-asc' | 'mandi-asc' | 'district-asc'>('modal-desc');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const rawPrices = mandiStore.getPricesForCrop(crop.id);
  const districts = mandiStore.getDistricts();

  const filteredPrices = useMemo(() => {
    return rawPrices.filter(p => {
      if (districtFilter !== 'all' && p.district_id !== districtFilter) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'modal-desc') return b.modal_price - a.modal_price;
      if (sortBy === 'modal-asc') return a.modal_price - b.modal_price;
      if (sortBy === 'mandi-asc') return a.mandi_name_hi.localeCompare(b.mandi_name_hi, 'hi');
      if (sortBy === 'district-asc') return a.district_name_hi.localeCompare(b.district_name_hi, 'hi');
      return 0;
    });
  }, [rawPrices, districtFilter, sortBy]);

  // Summary Metrics
  const summary = useMemo(() => {
    if (rawPrices.length === 0) {
      return { avg: 0, min: 0, max: 0, bestMandi: null, lowestMandi: null, totalMandis: 0 };
    }
    const modals = rawPrices.map(p => p.modal_price);
    const mins = rawPrices.map(p => p.min_price);
    const maxs = rawPrices.map(p => p.max_price);

    const sum = modals.reduce((a, b) => a + b, 0);
    const avg = Math.round(sum / rawPrices.length);

    const sortedByModal = [...rawPrices].sort((a, b) => b.modal_price - a.modal_price);
    const bestMandi = sortedByModal[0];
    const lowestMandi = sortedByModal[sortedByModal.length - 1];

    return {
      avg,
      min: Math.min(...mins),
      max: Math.max(...maxs),
      bestMandi,
      lowestMandi,
      totalMandis: rawPrices.length
    };
  }, [rawPrices]);

  // 30 Days chart for reference mandi
  const refMandiId = summary.bestMandi ? summary.bestMandi.mandi_id : 'mandi-mandsaur';
  const chartData = useMemo(() => {
    return mandiStore.getHistory(crop.id, refMandiId, 30);
  }, [crop.id, refMandiId]);

  const handleShare = () => {
    const text = `🌾 *${crop.name_hi} मंडी भाव आज – मध्य प्रदेश (${DISPLAY_TODAY_HI})*\n\n` +
      `📊 *मुख्य बिंदु:*\n` +
      `• औसत मॉडल भाव: ₹${summary.avg.toLocaleString('en-IN')}/${crop.unit}\n` +
      `• सर्वश्रेष्ठ भाव: ₹${summary.bestMandi?.modal_price.toLocaleString('en-IN')} (${summary.bestMandi?.mandi_name_hi})\n` +
      `• कुल रिपोर्टिंग मंडियां: ${summary.totalMandis}\n\n` +
      `📍 अंतिम अपडेट: ${LAST_UPDATE_TIME_HI}`;
    onShareWhatsApp(text);
  };

  const faqs = [
    {
      q: `आज मध्य प्रदेश में ${crop.name_hi} का औसत भाव क्या है?`,
      a: `आज (${DISPLAY_TODAY_HI}) मध्य प्रदेश की प्रमुख मंडियों में ${crop.name_hi} का औसत मॉडल भाव लगभग ₹${summary.avg.toLocaleString('en-IN')} प्रति ${crop.unit} दर्ज किया गया है।`
    },
    {
      q: `आज ${crop.name_hi} का सबसे अधिक भाव किस मंडी में मिल रहा है?`,
      a: summary.bestMandi 
        ? `आज ${crop.name_hi} का सर्वाधिक मॉडल भाव ${summary.bestMandi.mandi_name_hi} (${summary.bestMandi.district_name_hi}) में ₹${summary.bestMandi.modal_price.toLocaleString('en-IN')}/${crop.unit} रहा है।`
        : 'आज का भाव संकलित किया जा रहा है।'
    },
    {
      q: `${crop.name_hi} के न्यूनतम और अधिकतम भाव की रेंज क्या है?`,
      a: `आज मंडियों में ${crop.name_hi} का न्यूनतम भाव ₹${summary.min.toLocaleString('en-IN')} से लेकर अधिकतम ₹${summary.max.toLocaleString('en-IN')} प्रति ${crop.unit} तक रहा है।`
    }
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-slate-500 mb-4">
        <span>मुखपृष्ठ</span>
        <span>/</span>
        <span>फसलें</span>
        <span>/</span>
        <span className="text-[#065F46] font-bold">{crop.name_hi}</span>
      </div>

      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#065F46] text-xs font-bold uppercase tracking-wider mb-1">
              <Wheat className="w-4 h-4 text-[#10B981]" />
              <span>{crop.category} • कृषि उपज दर</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {crop.name_hi} मंडी भाव आज – मध्य प्रदेश
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              {crop.description || 'मध्य प्रदेश की सभी प्रमुख मंडियों में आज के न्यूनतम, अधिकतम और मॉडल भाव।'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => onNavigateCompare(crop.slug)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors"
            >
              मंडियों में तुलना करें
            </button>
            <button
              onClick={handleShare}
              className="bg-[#065F46] hover:bg-[#044E3A] text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>WhatsApp शेयर</span>
            </button>
          </div>
        </div>

        {/* Date & Updates Tag */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
          <span className="flex items-center gap-1 text-slate-700 font-semibold">
            <Calendar className="w-3.5 h-3.5 text-[#065F46]" />
            {DISPLAY_TODAY_HI}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {LAST_UPDATE_TIME_HI}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-[#065F46] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
            सत्यापित डेटा
          </span>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-500 font-bold uppercase block">आज का औसत भाव</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            ₹{summary.avg.toLocaleString('en-IN')}
            <span className="text-xs font-normal text-slate-500"> /{crop.unit}</span>
          </div>
        </div>

        <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-200 shadow-xs">
          <span className="text-[11px] text-[#065F46] font-bold uppercase block">सर्वश्रेष्ठ मॉडल भाव</span>
          <div className="text-xl sm:text-2xl font-black text-[#065F46] mt-1">
            ₹{summary.bestMandi?.modal_price.toLocaleString('en-IN') || '—'}
          </div>
          <span className="text-xs text-[#065F46] font-semibold block truncate">
            {summary.bestMandi?.mandi_name_hi} ({summary.bestMandi?.district_name_hi})
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-500 font-bold uppercase block">न्यूनतम - अधिकतम रेंज</span>
          <div className="text-sm sm:text-base font-black text-slate-800 mt-1">
            ₹{summary.min.toLocaleString('en-IN')} - ₹{summary.max.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-slate-400 font-normal">प्रति {crop.unit}</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-500 font-bold uppercase block">रिपोर्टिंग मंडियां</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {summary.totalMandis}
          </div>
          <span className="text-xs text-slate-400 font-normal">मध्य प्रदेश भर में</span>
        </div>
      </div>

      {/* Historical Trend Chart */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs mb-8">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              {crop.name_hi} – पिछले 30 दिनों का भाव रुझान (Price Trend)
            </h3>
            <span className="text-xs text-slate-500">
              आधार संदर्भ: {summary.bestMandi?.mandi_name_hi || 'मंदसौर मंडी'}
            </span>
          </div>
        </div>

        <div className="w-full h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="cropDetailColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#065F46" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#065F46" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(str) => str.split('-').slice(1).reverse().join('/')}
                stroke="#94A3B8"
                fontSize={11}
              />
              <YAxis 
                domain={['auto', 'auto']}
                tickFormatter={(v) => `₹${v}`}
                stroke="#94A3B8"
                fontSize={11}
                width={60}
              />
              <Tooltip
                formatter={(v: any) => [`₹${Number(v).toLocaleString('en-IN')}`, 'मॉडल भाव']}
                labelFormatter={(l) => `तारीख: ${l}`}
                contentStyle={{ backgroundColor: '#065F46', color: '#FFF', borderRadius: '8px', fontSize: '12px', border: 'none' }}
              />
              <Area 
                type="monotone" 
                dataKey="modal_price" 
                stroke="#065F46" 
                strokeWidth={2.5} 
                fillOpacity={1} 
                fill="url(#cropDetailColor)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Mandis Table for this Crop */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs mb-8 overflow-hidden">
        {/* Table Header & Filters */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              मध्य प्रदेश में आज {crop.name_hi} का भाव
            </h3>
            <span className="text-xs text-slate-500">
              {filteredPrices.length} मंडियों में उपलब्ध दरें
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* District Filter */}
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium bg-white text-slate-700"
            >
              <option value="all">सभी जिले</option>
              {districts.map(d => (
                <option key={d.id} value={d.id}>{d.name_hi}</option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium bg-white text-slate-700"
            >
              <option value="modal-desc">उच्चतम मॉडल भाव पहले</option>
              <option value="modal-asc">न्यूनतम मॉडल भाव पहले</option>
              <option value="mandi-asc">मंडी नाम (अ-ह)</option>
              <option value="district-asc">जिला नाम</option>
            </select>
          </div>
        </div>

        {/* Table / Cards */}
        {filteredPrices.length === 0 ? (
          <div className="p-10 text-center text-slate-500 text-sm">
            आज इस फसल के लिए चयनित जिले में भाव उपलब्ध नहीं है।
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold text-xs uppercase">
                  <th className="py-3 px-4">मंडी का नाम</th>
                  <th className="py-3 px-4">जिला</th>
                  <th className="py-3 px-4 text-right">न्यूनतम</th>
                  <th className="py-3 px-4 text-right">अधिकतम</th>
                  <th className="py-3 px-4 text-right">मॉडल भाव</th>
                  <th className="py-3 px-4 text-center">बदलाव</th>
                  <th className="py-3 px-4 text-right">आवक</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPrices.map((item) => {
                  const change = mandiStore.calculatePriceChange(item.modal_price, item.prev_modal_price);
                  const isTop = summary.bestMandi && summary.bestMandi.mandi_id === item.mandi_id;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        <button
                          onClick={() => onSelectMandi(item.mandi_id.replace('mandi-', ''))}
                          className="hover:text-[#065F46] hover:underline cursor-pointer flex items-center gap-1.5"
                        >
                          <span>{item.mandi_name_hi}</span>
                          {isTop && (
                            <span className="text-[10px] bg-emerald-100 text-[#065F46] font-bold px-1.5 py-0.5 rounded">
                              शीर्ष भाव
                            </span>
                          )}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{item.district_name_hi}</td>
                      <td className="py-3 px-4 text-right font-medium text-slate-600">₹{item.min_price.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-4 text-right font-medium text-slate-600">₹{item.max_price.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-4 text-right font-extrabold text-[#065F46] text-sm sm:text-base">
                        ₹{item.modal_price.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {change.trend === 'up' && (
                          <span className="text-emerald-700 font-bold">+{change.absolute}</span>
                        )}
                        {change.trend === 'down' && (
                          <span className="text-red-600 font-bold">-{change.absolute}</span>
                        )}
                        {change.trend === 'same' && (
                          <span className="text-slate-400">स्थिर</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right text-slate-600">
                        {item.arrival_quantity ? `${item.arrival_quantity.toLocaleString('en-IN')} क्विं.` : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Dynamic SEO FAQs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#065F46]" />
          <span>अक्सर पूछे जाने वाले प्रश्न (FAQ)</span>
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full px-4 py-3 text-left font-bold text-slate-900 bg-slate-50/50 hover:bg-slate-100 flex items-center justify-between text-sm cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-[#065F46]" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>
                {isOpen && (
                  <div className="px-4 py-3 text-xs sm:text-sm text-slate-700 bg-white leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
