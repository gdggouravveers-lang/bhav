import React, { useState } from 'react';
import { 
  Sprout, 
  Search, 
  Menu, 
  X, 
  Scale, 
  History, 
  Building2, 
  ShieldCheck, 
  Share2, 
  Wheat, 
  ChevronRight,
  TrendingUp,
  MapPin,
  Lock
} from 'lucide-react';
import { ViewType } from '../types';
import { DISPLAY_TODAY_HI } from '../data/seedData';

interface HeaderProps {
  currentView: ViewType;
  onNavigate: (view: ViewType, payload?: any) => void;
  onOpenSearch: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  onOpenAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; view: ViewType; icon: React.ReactNode }[] = [
    { label: 'आज का भाव', view: 'home', icon: <TrendingUp className="w-4 h-4" /> },
    { label: 'मंडियां', view: 'mandis', icon: <Building2 className="w-4 h-4" /> },
    { label: 'फसलें', view: 'crops', icon: <Wheat className="w-4 h-4" /> },
    { label: 'जिले', view: 'districts', icon: <MapPin className="w-4 h-4" /> },
    { label: 'भाव तुलना', view: 'compare', icon: <Scale className="w-4 h-4" /> },
    { label: 'भाव इतिहास', view: 'history', icon: <History className="w-4 h-4" /> },
  ];

  const handleNavClick = (view: ViewType) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#065F46] text-white shadow-md border-b border-[#044E3A]">
      {/* Top Banner with Trust & Date Info */}
      <div className="bg-[#044E3A] text-emerald-100 text-xs py-1.5 px-4 border-b border-emerald-800/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="font-semibold text-white">मध्य प्रदेश दैनिक मंडी भाव पोर्टल</span>
            <span className="hidden sm:inline text-emerald-400/60">|</span>
            <span className="hidden sm:inline text-emerald-200">{DISPLAY_TODAY_HI}</span>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <button 
              onClick={() => onNavigate('about')} 
              className="hover:text-white text-emerald-200 transition-colors cursor-pointer flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              <span>सत्यापित डेटा</span>
            </button>
            <span className="text-emerald-500/40">|</span>
            <button 
              onClick={onOpenAdmin} 
              className="bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 border border-emerald-700/50 px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Lock className="w-3 h-3 text-[#10B981]" />
              <span>प्रशासन</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-xs group-hover:bg-white/20 transition-all">
              <Sprout className="w-6 h-6 text-[#10B981]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  मंडी भाव
                </span>
                <span className="text-[10px] font-black uppercase bg-[#10B981] text-emerald-950 px-1.5 py-0.5 rounded shadow-xs">
                  MP
                </span>
              </div>
              <p className="text-[11px] text-emerald-200 -mt-1 font-medium">
                मध्य प्रदेश के ताज़ा कृषि भाव
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white/15 text-white shadow-xs border border-white/20'
                      : 'text-emerald-100 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className={isActive ? 'text-[#10B981]' : 'text-emerald-300'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-2">
            {/* Quick Search Button */}
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-emerald-100 hover:text-white px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer border border-white/20 shadow-xs"
              aria-label="फसल या मंडी खोजें"
            >
              <Search className="w-4 h-4 text-[#10B981]" />
              <span className="hidden sm:inline">खोजें...</span>
              <kbd className="hidden lg:inline-block bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded border border-white/30">
                Ctrl+K
              </kbd>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="मेनू खोलें"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#044E3A] bg-[#065F46] shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 pt-3 pb-4 space-y-1">
            {navItems.map((item) => {
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-base font-semibold cursor-pointer ${
                    isActive
                      ? 'bg-white/15 text-white border-l-4 border-[#10B981]'
                      : 'text-emerald-100 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={isActive ? 'text-[#10B981]' : 'text-emerald-300'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-emerald-300" />
                </button>
              );
            })}

            <div className="pt-2 border-t border-[#044E3A] mt-2 space-y-1">
              <button
                onClick={() => handleNavClick('about')}
                className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium text-emerald-200 hover:bg-white/10 rounded-lg cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span>डेटा स्रोत एवं पारदर्शिता</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium text-white bg-[#044E3A] hover:bg-emerald-900 rounded-lg cursor-pointer border border-emerald-700/50"
              >
                <Lock className="w-4 h-4 text-[#10B981]" />
                <span>प्रशासन लॉगिन / डेटा अपलोड</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
