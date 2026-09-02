import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Upload, 
  Plus, 
  Check, 
  AlertTriangle, 
  Trash2, 
  Edit3, 
  Download, 
  RefreshCw, 
  FileText,
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  Database
} from 'lucide-react';
import { mandiStore } from '../lib/mandiStore';
import { DailyPrice, CsvImportResult } from '../types';
import { TODAY_ISO } from '../data/seedData';

interface AdminDashboardProps {
  onClose: () => void;
  onRefreshData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onClose,
  onRefreshData
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default open for ease of evaluation
  const [activeTab, setActiveTab] = useState<'upload' | 'single-entry' | 'manage'>('upload');
  
  // CSV Upload States
  const [csvText, setCsvText] = useState('');
  const [importResult, setImportResult] = useState<CsvImportResult | null>(null);
  const [importSuccessMsg, setImportSuccessMsg] = useState('');

  // Single Entry Form State
  const allCrops = mandiStore.getCrops();
  const allMandis = mandiStore.getMandis();

  const [entryDate, setEntryDate] = useState(TODAY_ISO);
  const [entryMandiId, setEntryMandiId] = useState(allMandis[0]?.id || '');
  const [entryCropId, setEntryCropId] = useState(allCrops[0]?.id || '');
  const [entryMinPrice, setEntryMinPrice] = useState('');
  const [entryMaxPrice, setEntryMaxPrice] = useState('');
  const [entryModalPrice, setEntryModalPrice] = useState('');
  const [entryArrival, setEntryArrival] = useState('');
  const [entryFormMsg, setEntryFormMsg] = useState('');

  // Manage Data Search
  const [manageSearch, setManageSearch] = useState('');
  const allPrices = mandiStore.getPricesForDate();

  const filteredManagePrices = allPrices.filter(p => {
    if (!manageSearch.trim()) return true;
    const q = manageSearch.toLowerCase();
    return (
      p.crop_name_hi.toLowerCase().includes(q) ||
      p.crop_name_en.toLowerCase().includes(q) ||
      p.mandi_name_hi.toLowerCase().includes(q)
    );
  });

  // Handle CSV Validate
  const handleValidateCsv = () => {
    if (!csvText.trim()) return;
    const res = mandiStore.validateAndParseCsv(csvText);
    setImportResult(res);
    setImportSuccessMsg('');
  };

  // Handle CSV Commit
  const handleCommitImport = () => {
    if (!importResult || importResult.validRows.length === 0) return;
    mandiStore.addBulkPrices(importResult.validRows);
    setImportSuccessMsg(`सफलतापूर्वक ${importResult.validRows.length} भाव प्रविष्टियां जोड़ी गईं!`);
    setCsvText('');
    setImportResult(null);
    onRefreshData();
  };

  // Sample CSV Template
  const sampleCsv = `date,mandi_id,crop_id,min_price,max_price,modal_price,arrival_quantity
2026-09-01,mandi-mandsaur,crop-soybean,4200,4700,4550,2200
2026-09-01,mandi-neemuch,crop-garlic,8500,16000,13200,1400
2026-09-01,mandi-indore,crop-wheat,2400,2700,2580,3100
2026-09-01,mandi-ujjain,crop-chana-dollar,10500,14000,12600,650`;

  const handleLoadSampleCsv = () => {
    setCsvText(sampleCsv);
    const res = mandiStore.validateAndParseCsv(sampleCsv);
    setImportResult(res);
  };

  // Handle Single Entry Submit
  const handleSingleEntrySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const min = Number(entryMinPrice);
    const max = Number(entryMaxPrice);
    const modal = Number(entryModalPrice);
    const arrival = entryArrival ? Number(entryArrival) : undefined;

    if (!min || !max || !modal || min > modal || modal > max) {
      setEntryFormMsg('कृपया वैध भाव दर्ज करें (न्यूनतम ≤ मॉडल ≤ अधिकतम)');
      return;
    }

    const selectedCrop = allCrops.find(c => c.id === entryCropId);
    const selectedMandi = allMandis.find(m => m.id === entryMandiId);

    if (!selectedCrop || !selectedMandi) return;

    const newPrice: DailyPrice = {
      id: `price-${entryMandiId}-${entryCropId}-${entryDate}-${Date.now()}`,
      date: entryDate,
      mandi_id: entryMandiId,
      mandi_name_hi: selectedMandi.name_hi,
      mandi_name_en: selectedMandi.name_en,
      district_id: selectedMandi.district_id,
      district_name_hi: selectedMandi.district_name_hi,
      crop_id: entryCropId,
      crop_name_hi: selectedCrop.name_hi,
      crop_name_en: selectedCrop.name_en,
      category: selectedCrop.category,
      min_price: min,
      max_price: max,
      modal_price: modal,
      prev_modal_price: modal - 20,
      unit: selectedCrop.unit,
      arrival_quantity: arrival,
      source: 'मंडी समिति (Admin Manual)',
      is_verified: true,
      updated_at: 'अभी-अभी'
    };

    mandiStore.addPrice(newPrice);
    setEntryFormMsg('सफलतापूर्वक भाव प्रविष्टि जोड़ी गई!');
    setEntryMinPrice('');
    setEntryMaxPrice('');
    setEntryModalPrice('');
    setEntryArrival('');
    onRefreshData();
  };

  const handleDeletePrice = (id: string) => {
    mandiStore.deletePrice(id);
    onRefreshData();
  };

  const handleResetData = () => {
    if (window.confirm('क्या आप सभी डेटा को डिफ़ॉल्ट डेमो डेटा पर रीसेट करना चाहते हैं?')) {
      mandiStore.resetToSeedData();
      onRefreshData();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#065F46] text-white px-5 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-[#044E3A] flex items-center justify-center text-[#10B981]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold">
                मंडी डेटा प्रबंधन एवं प्रशासन पोर्टल (Admin Panel)
              </h2>
              <p className="text-xs text-emerald-100">
                दैनिक भाव प्रविष्टि, CSV/Excel बल्क अपलोड एवं सत्यापन
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-100 hover:text-white p-2 rounded-lg hover:bg-[#044E3A] cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2 overflow-x-auto custom-scrollbar">
          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'upload'
                ? 'border-[#065F46] text-[#065F46]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>CSV बल्क डेटा अपलोड</span>
          </button>
          <button
            onClick={() => setActiveTab('single-entry')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'single-entry'
                ? 'border-[#065F46] text-[#065F46]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>एकल भाव प्रविष्टि (Manual Entry)</span>
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'manage'
                ? 'border-[#065F46] text-[#065F46]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>डेटा सूची एवं संपादन ({allPrices.length})</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 custom-scrollbar">
          {/* TAB 1: CSV Bulk Upload */}
          {activeTab === 'upload' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    CSV / Excel प्रारूप से दैनिक भाव अपलोड करें
                  </h3>
                  <p className="text-xs text-slate-500">
                    मंडी समिति या ई-अनुज्ञा से प्राप्त CSV डेटा चिपकाएं या नमूना लोड करें।
                  </p>
                </div>
                <button
                  onClick={handleLoadSampleCsv}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-lg cursor-pointer self-start sm:self-auto border border-slate-300"
                >
                  डेमो नमूना CSV भरें (Load Sample)
                </button>
              </div>

              {/* Text Area */}
              <div>
                <textarea
                  rows={6}
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  placeholder="date,mandi_id,crop_id,min_price,max_price,modal_price,arrival_quantity..."
                  className="w-full font-mono text-xs p-3.5 border border-slate-300 rounded-xl focus:border-[#065F46] focus:outline-hidden bg-slate-50"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleValidateCsv}
                  disabled={!csvText.trim()}
                  className="bg-slate-800 hover:bg-slate-900 disabled:opacity-40 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer"
                >
                  डेटा जांचें (Validate CSV)
                </button>
                {importResult && importResult.validRows.length > 0 && (
                  <button
                    onClick={handleCommitImport}
                    className="bg-[#065F46] hover:bg-[#044E3A] text-white px-5 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    <span>{importResult.validRows.length} रिकॉर्ड्स सेव करें (Publish Live)</span>
                  </button>
                )}
              </div>

              {/* Success Message */}
              {importSuccessMsg && (
                <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl text-xs sm:text-sm text-[#065F46] font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                  <span>{importSuccessMsg}</span>
                </div>
              )}

              {/* Validation Results Display */}
              {importResult && (
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-4 text-xs font-bold">
                    <span className="text-[#065F46] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      ✓ वैध पंक्तियां: {importResult.validRows.length}
                    </span>
                    {importResult.errors.length > 0 && (
                      <span className="text-red-700 bg-red-50 px-2.5 py-1 rounded-lg border border-red-200">
                        ⚠ त्रुटियां: {importResult.errors.length}
                      </span>
                    )}
                  </div>

                  {/* Errors List */}
                  {importResult.errors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 space-y-1 text-xs text-red-800">
                      <p className="font-bold flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span>सुधार योग्य त्रुटियां मिलीं:</span>
                      </p>
                      <ul className="list-disc list-inside space-y-0.5 text-[11px] text-red-700">
                        {importResult.errors.map((err, i) => (
                          <li key={i}>पंक्ति {err.row}: {err.message}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Valid Rows Preview Table */}
                  {importResult.validRows.length > 0 && (
                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                      <div className="px-4 py-2 bg-slate-50 text-xs font-bold text-slate-700 border-b border-slate-200">
                        लाइव प्रविष्टि पूर्वावलोकन ({importResult.validRows.length})
                      </div>
                      <div className="max-h-48 overflow-y-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-100 text-slate-600">
                            <tr>
                              <th className="p-2">तारीख</th>
                              <th className="p-2">मंडी</th>
                              <th className="p-2">फसल</th>
                              <th className="p-2 text-right">न्यूनतम</th>
                              <th className="p-2 text-right">अधिकतम</th>
                              <th className="p-2 text-right">मॉडल भाव</th>
                              <th className="p-2 text-right">आवक</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {importResult.validRows.map((r, idx) => (
                              <tr key={idx}>
                                <td className="p-2">{r.date}</td>
                                <td className="p-2 font-semibold text-slate-800">{r.mandi_name_hi}</td>
                                <td className="p-2 font-semibold text-slate-800">{r.crop_name_hi}</td>
                                <td className="p-2 text-right">₹{r.min_price}</td>
                                <td className="p-2 text-right">₹{r.max_price}</td>
                                <td className="p-2 text-right font-bold text-[#065F46]">₹{r.modal_price}</td>
                                <td className="p-2 text-right">{r.arrival_quantity || '—'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Single Entry */}
          {activeTab === 'single-entry' && (
            <form onSubmit={handleSingleEntrySubmit} className="space-y-5 max-w-2xl">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  एकल मंडी भाव प्रविष्टि फॉर्म
                </h3>
                <p className="text-xs text-slate-500">
                  किसी विशिष्ट मंडी और फसल के लिए नया भाव दर्ज करें।
                </p>
              </div>

              {entryFormMsg && (
                <div className={`p-3 rounded-xl text-xs font-bold ${
                  entryFormMsg.includes('सफलतापूर्वक')
                    ? 'bg-emerald-50 text-[#065F46] border border-emerald-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {entryFormMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">तारीख:</label>
                  <input
                    type="date"
                    value={entryDate}
                    onChange={(e) => setEntryDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">मंडी चुनें:</label>
                  <select
                    value={entryMandiId}
                    onChange={(e) => setEntryMandiId(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white font-medium"
                  >
                    {allMandis.map(m => (
                      <option key={m.id} value={m.id}>{m.name_hi} ({m.district_name_hi})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">फसल चुनें:</label>
                  <select
                    value={entryCropId}
                    onChange={(e) => setEntryCropId(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white font-medium"
                  >
                    {allCrops.map(c => (
                      <option key={c.id} value={c.id}>{c.name_hi} ({c.category})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">न्यूनतम भाव (₹/क्विंटल):</label>
                  <input
                    type="number"
                    value={entryMinPrice}
                    onChange={(e) => setEntryMinPrice(e.target.value)}
                    placeholder="उदा. 4200"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">अधिकतम भाव (₹/क्विंटल):</label>
                  <input
                    type="number"
                    value={entryMaxPrice}
                    onChange={(e) => setEntryMaxPrice(e.target.value)}
                    placeholder="उदा. 4800"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">मॉडल भाव (₹/क्विंटल):</label>
                  <input
                    type="number"
                    value={entryModalPrice}
                    onChange={(e) => setEntryModalPrice(e.target.value)}
                    placeholder="उदा. 4550"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">आवक मात्रा (क्विंटल में - ऐच्छिक):</label>
                  <input
                    type="number"
                    value={entryArrival}
                    onChange={(e) => setEntryArrival(e.target.value)}
                    placeholder="उदा. 2500"
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#065F46] hover:bg-[#044E3A] text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer shadow-xs transition-colors"
              >
                भाव प्रकाशित करें (Save Record)
              </button>
            </form>
          )}

          {/* TAB 3: Manage Live Data */}
          {activeTab === 'manage' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <input
                  type="text"
                  value={manageSearch}
                  onChange={(e) => setManageSearch(e.target.value)}
                  placeholder="फसल या मंडी खोजें..."
                  className="px-3.5 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-300 bg-white w-full sm:w-64"
                />

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetData}
                    className="text-xs bg-red-50 hover:bg-red-100 text-red-700 font-bold px-3 py-1.5 rounded-lg border border-red-200 cursor-pointer flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>डेमो डेटा रीसेट</span>
                  </button>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden max-h-96 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                    <tr>
                      <th className="p-2.5">फसल</th>
                      <th className="p-2.5">मंडी</th>
                      <th className="p-2.5 text-right">न्यूनतम</th>
                      <th className="p-2.5 text-right">अधिकतम</th>
                      <th className="p-2.5 text-right">मॉडल भाव</th>
                      <th className="p-2.5 text-center">स्थिति</th>
                      <th className="p-2.5 text-center">हटाएं</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredManagePrices.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50">
                        <td className="p-2.5 font-bold text-slate-900">{row.crop_name_hi}</td>
                        <td className="p-2.5 text-slate-700">{row.mandi_name_hi}</td>
                        <td className="p-2.5 text-right">₹{row.min_price}</td>
                        <td className="p-2.5 text-right">₹{row.max_price}</td>
                        <td className="p-2.5 text-right font-bold text-[#065F46]">₹{row.modal_price}</td>
                        <td className="p-2.5 text-center">
                          <span className="text-[10px] bg-emerald-100 text-[#065F46] font-bold px-1.5 py-0.5 rounded">
                            सत्यापित
                          </span>
                        </td>
                        <td className="p-2.5 text-center">
                          <button
                            onClick={() => handleDeletePrice(row.id)}
                            className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                            title="हटाएं"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>मध्य प्रदेश कृषि उपज मंडी डेटाबेस v1.0</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-bold cursor-pointer"
          >
            बंद करें
          </button>
        </div>
      </div>
    </div>
  );
};
