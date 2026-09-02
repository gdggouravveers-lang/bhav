import React, { useState, useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Area, 
  AreaChart 
} from 'recharts';
import { History, Calendar, TrendingUp, TrendingDown, ArrowUpDown, Info, Share2 } from 'lucide-react';
import { mandiStore } from '../lib/mandiStore';

interface HistoricalPriceViewerProps {
  initialCropSlug?: string;
  initialMandiSlug?: string;
  onShareWhatsApp: (text: string) => void;
}

export const HistoricalPriceViewer: React.FC<HistoricalPriceViewerProps> = ({
  initialCropSlug = 'soybean',
  initialMandiSlug = 'mandsaur',
  onShareWhatsApp
}) => {
  const allCrops = mandiStore.getCrops();
  const allMandis = mandiStore.getMandis();

  const [selectedCropId, setSelectedCropId] = useState<string>(() => {
    const found = allCrops.find(c => c.slug === initialCropSlug);
    return found ? found.id : (allCrops[0]?.id || 'crop-soybean');
  });

  const [selectedMandiId, setSelectedMandiId] = useState<string>(() => {
    const found = allMandis.find(m => m.slug === initialMandiSlug);
    return found ? found.id : (allMandis[0]?.id || 'mandi-mandsaur');
  });

  const [timeRange, setTimeRange] = useState<number>(30); // 7, 30, 90, 180, 365

  const currentCrop = allCrops.find(c => c.id === selectedCropId);
  const currentMandi = allMandis.find(m => m.id === selectedMandiId);

  const historyData = useMemo(() => {
    if (!selectedCropId || !selectedMandiId) return [];
    return mandiStore.getHistory(selectedCropId, selectedMandiId, timeRange);
  }, [selectedCropId, selectedMandiId, timeRange]);

  // Statistics
  const stats = useMemo(() => {
    if (historyData.length === 0) {
      return { avg: 0, max: 0, min: 0, trend: 'na', diff: 0, pct: 0 };
    }
    const modals = historyData.map(d => d.modal_price);
    const sum = modals.reduce((acc, curr) => acc + curr, 0);
    const avg = Math.round(sum / modals.length);
    const max = Math.max(...modals);
    const min = Math.min(...modals);

    const first = historyData[0].modal_price;
    const last = historyData[historyData.length - 1].modal_price;
    const diff = last - first;
    const pct = Number(((diff / first) * 100).toFixed(1));

    return {
      avg,
      max,
      min,
      trend: diff > 0 ? 'up' : diff < 0 ? 'down' : 'same',
      diff: Math.abs(diff),
      pct: Math.abs(pct)
    };
  }, [historyData]);

  const handleShare = () => {
    if (!currentCrop || !currentMandi) return;
    const text = `📈 *${currentCrop.name_hi} भाव इतिहास (${currentMandi.name_hi})*\n` +
      `📅 पिछले ${timeRange} दिनों का विश्लेषण:\n` +
      `• औसत मॉडल भाव: ₹${stats.avg.toLocaleString('en-IN')}/${currentCrop.unit}\n` +
      `• उच्चतम भाव: ₹${stats.max.toLocaleString('en-IN')}\n` +
      `• न्यूनतम भाव: ₹${stats.min.toLocaleString('en-IN')}\n` +
      `• कुल रुझान: ${stats.trend === 'up' ? `↑ +₹${stats.diff} (+${stats.pct}%) तेजी` : `↓ -₹${stats.diff} (-${stats.pct}%) मंदी`}`;
    onShareWhatsApp(text);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#065F46] text-xs font-bold uppercase tracking-wider mb-1">
            <History className="w-4 h-4 text-[#10B981]" />
            <span>ऐतिहासिक दर चार्ट</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            मंडी भाव इतिहास (Historical Prices)
          </h1>
          <p className="text-slate-600 text-sm mt-0.5">
            विभिन्न समयावधियों में फसलों के मॉडल भाव का उतार-चढ़ाव एवं रुझान ग्राफ
          </p>
        </div>

        <button
          onClick={handleShare}
          className="bg-[#065F46] hover:bg-[#044E3A] text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-xs self-start sm:self-auto transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span>इतिहास शेयर करें</span>
        </button>
      </div>

      {/* Selectors Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs mb-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Crop Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              फसल चुनें:
            </label>
            <select
              value={selectedCropId}
              onChange={(e) => setSelectedCropId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#065F46] focus:ring-1 focus:ring-[#065F46] focus:outline-hidden bg-slate-50 text-slate-900 font-bold text-sm"
            >
              {allCrops.map(c => (
                <option key={c.id} value={c.id}>{c.name_hi} ({c.name_en})</option>
              ))}
            </select>
          </div>

          {/* Mandi Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              मंडी चुनें:
            </label>
            <select
              value={selectedMandiId}
              onChange={(e) => setSelectedMandiId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#065F46] focus:ring-1 focus:ring-[#065F46] focus:outline-hidden bg-slate-50 text-slate-900 font-bold text-sm"
            >
              {allMandis.map(m => (
                <option key={m.id} value={m.id}>{m.name_hi} ({m.district_name_hi})</option>
              ))}
            </select>
          </div>

          {/* Time Range Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              समयावधि:
            </label>
            <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
              {[
                { label: '7 दिन', val: 7 },
                { label: '30 दिन', val: 30 },
                { label: '3 महीने', val: 90 },
                { label: '6 महीने', val: 180 },
                { label: '1 वर्ष', val: 365 },
              ].map(t => (
                <button
                  key={t.val}
                  onClick={() => setTimeRange(t.val)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                    timeRange === t.val
                      ? 'bg-[#065F46] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-500 font-bold uppercase block">औसत मॉडल भाव</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            ₹{stats.avg.toLocaleString('en-IN')}
            <span className="text-xs font-normal text-slate-500"> /{currentCrop?.unit}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] text-[#065F46] font-bold uppercase block">उच्चतम स्तर</span>
          <div className="text-xl sm:text-2xl font-black text-[#065F46] mt-1">
            ₹{stats.max.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-500 font-bold uppercase block">न्यूनतम स्तर</span>
          <div className="text-xl sm:text-2xl font-black text-slate-700 mt-1">
            ₹{stats.min.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-500 font-bold uppercase block">अवधि रुझान</span>
          <div className="flex items-center gap-1 mt-1 text-base sm:text-lg font-black">
            {stats.trend === 'up' && (
              <span className="text-emerald-700 flex items-center gap-1">
                <TrendingUp className="w-5 h-5" />
                +₹{stats.diff} (+{stats.pct}%)
              </span>
            )}
            {stats.trend === 'down' && (
              <span className="text-red-600 flex items-center gap-1">
                <TrendingDown className="w-5 h-5" />
                -₹{stats.diff} (-{stats.pct}%)
              </span>
            )}
            {stats.trend === 'same' && (
              <span className="text-slate-600">स्थिर (0.0%)</span>
            )}
          </div>
        </div>
      </div>

      {/* Recharts Graphical Display */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs mb-8">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              {currentCrop?.name_hi} – {currentMandi?.name_hi} – पिछले {timeRange} दिन का चार्ट
            </h3>
            <span className="text-xs text-slate-500">दैनिक मॉडल भाव (प्रति क्विंटल)</span>
          </div>
        </div>

        {historyData.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <p className="font-semibold text-slate-700 text-base">
              "इस अवधि का डेटा उपलब्ध नहीं है।"
            </p>
          </div>
        ) : (
          <div className="w-full h-72 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorModal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#065F46" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#065F46" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(str) => {
                    const parts = str.split('-');
                    return `${parts[2]}/${parts[1]}`;
                  }}
                  stroke="#94A3B8"
                  fontSize={11}
                />
                <YAxis 
                  domain={['auto', 'auto']}
                  tickFormatter={(val) => `₹${val}`}
                  stroke="#94A3B8"
                  fontSize={11}
                  width={60}
                />
                <Tooltip
                  formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'मॉडल भाव']}
                  labelFormatter={(label) => `तारीख: ${label}`}
                  contentStyle={{ backgroundColor: '#065F46', color: '#FFFFFF', borderRadius: '8px', fontSize: '12px', border: 'none' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="modal_price" 
                  stroke="#065F46" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#colorModal)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Historical Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">
            दैनिक भाव रिकॉर्ड तालिका
          </h3>
          <span className="text-xs text-slate-500">कुल {historyData.length} रिकॉर्ड</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold text-xs uppercase">
                <th className="py-3 px-4">तारीख</th>
                <th className="py-3 px-4 text-right">न्यूनतम भाव</th>
                <th className="py-3 px-4 text-right">अधिकतम भाव</th>
                <th className="py-3 px-4 text-right">मॉडल भाव</th>
                <th className="py-3 px-4 text-right">आवक (क्विंटल)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {historyData.slice(-15).reverse().map((row) => (
                <tr key={row.date} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-semibold text-slate-800">{row.date}</td>
                  <td className="py-3 px-4 text-right text-slate-600">₹{row.min_price.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4 text-right text-slate-600">₹{row.max_price.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4 text-right font-extrabold text-[#065F46]">₹{row.modal_price.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4 text-right text-slate-600">{row.arrival_quantity ? `${row.arrival_quantity.toLocaleString('en-IN')} क्विं.` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
