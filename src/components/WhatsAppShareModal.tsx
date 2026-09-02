import React, { useState } from 'react';
import { Share2, Copy, Check, MessageSquare, X, Send } from 'lucide-react';

interface WhatsAppShareModalProps {
  isOpen: boolean;
  shareText: string;
  onClose: () => void;
}

export const WhatsAppShareModal: React.FC<WhatsAppShareModalProps> = ({
  isOpen,
  shareText,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    const encoded = encodeURIComponent(shareText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#065F46] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-[#044E3A] flex items-center justify-center text-[#10B981]">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base">WhatsApp पर भाव साझा करें</h3>
              <p className="text-[11px] text-emerald-100">किसान व व्यापारी ग्रुप्स में सीधा भेजें</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-100 hover:text-white p-1.5 rounded-lg hover:bg-[#044E3A] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            शेयर करने योग्य संदेश पूर्वावलोकन:
          </label>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 whitespace-pre-wrap font-mono max-h-56 overflow-y-auto custom-scrollbar leading-relaxed">
            {shareText}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleOpenWhatsApp}
              className="bg-[#065F46] hover:bg-[#044E3A] text-white py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>WhatsApp पर भेजें</span>
            </button>

            <button
              onClick={handleCopy}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors border border-slate-300"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#065F46]" />
                  <span className="text-[#065F46]">कॉपी हो गया!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-600" />
                  <span>टेक्स्ट कॉपी करें</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-5 py-2.5 border-t border-slate-100 text-center text-[11px] text-slate-500">
          मध्य प्रदेश दैनिक मंडी भाव पोर्टल • विश्वसनीय व सटीक
        </div>
      </div>
    </div>
  );
};
