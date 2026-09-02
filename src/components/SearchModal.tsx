import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Wheat, Building2, MapPin, ArrowRight } from 'lucide-react';
import { mandiStore } from '../lib/mandiStore';
import { SearchResult } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (result: SearchResult) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Keyboard shortcut Ctrl+K or Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (query.trim()) {
      setResults(mandiStore.search(query));
    } else {
      setResults([]);
    }
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200">
          <Search className="w-5 h-5 text-[#065F46] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="फसल, मंडी या जिला खोजें... (उदा. सोयाबीन, लहसुन, मंदसौर, नीमच)"
            className="w-full text-slate-800 placeholder-slate-400 text-sm sm:text-base focus:outline-hidden font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 px-2 py-1 bg-slate-100 rounded-md cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 custom-scrollbar">
          {query.trim() === '' ? (
            <div className="p-6 text-center text-xs sm:text-sm text-slate-500">
              <p className="font-semibold text-slate-700 mb-1">
                फसल का नाम (गेहूं, सोयाबीन, लहसुन) या मंडी का नाम (मंदसौर, नीमच, इंदौर) टाइप करें
              </p>
              <p className="text-slate-400 text-xs">
                हिन्दी और अंग्रेजी दोनों में खोज उपलब्ध है।
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <p className="font-bold text-slate-700 text-sm">
                "कोई परिणाम नहीं मिला"
              </p>
              <p className="text-xs text-slate-400 mt-1">
                कृपया अन्य फसल या मंडी नाम से खोजें।
              </p>
            </div>
          ) : (
            results.map((res) => (
              <div
                key={`${res.type}-${res.id}`}
                onClick={() => {
                  onSelectResult(res);
                  onClose();
                }}
                className="p-3.5 hover:bg-emerald-50/70 cursor-pointer flex items-center justify-between group transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                    res.type === 'crop' 
                      ? 'bg-amber-100 text-amber-800' 
                      : res.type === 'mandi'
                      ? 'bg-emerald-100 text-[#065F46]'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {res.type === 'crop' ? <Wheat className="w-4 h-4" /> : res.type === 'mandi' ? <Building2 className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm group-hover:text-[#065F46]">
                        {res.title_hi}
                      </span>
                      <span className="text-slate-400 text-xs font-normal">
                        ({res.title_en})
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{res.subtitle_hi}</p>
                  </div>
                </div>

                <div className="text-xs text-[#065F46] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>देखें</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
