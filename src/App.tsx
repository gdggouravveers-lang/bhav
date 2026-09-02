import React, { useState, useEffect } from 'react';
import { ViewType, DailyPrice, SearchResult } from './types';
import { mandiStore } from './lib/mandiStore';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TodayMandiPrices } from './components/TodayMandiPrices';
import { BestPricesSection } from './components/BestPricesSection';
import { CropCategories } from './components/CropCategories';
import { DistrictBrowse } from './components/DistrictBrowse';
import { MandiComparison } from './components/MandiComparison';
import { HistoricalPriceViewer } from './components/HistoricalPriceViewer';
import { CropDetailPage } from './components/CropDetailPage';
import { MandiDetailPage } from './components/MandiDetailPage';
import { DistrictDetailPage } from './components/DistrictDetailPage';
import { AdminDashboard } from './components/AdminDashboard';
import { SearchModal } from './components/SearchModal';
import { WhatsAppShareModal } from './components/WhatsAppShareModal';
import { AboutAndDisclaimer } from './components/AboutAndDisclaimer';
import { SeoSchemaViewer } from './components/SeoSchemaViewer';
import { Footer } from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [viewPayload, setViewPayload] = useState<{
    cropSlug?: string;
    mandiSlug?: string;
    districtSlug?: string;
  }>({});

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [whatsAppShareText, setWhatsAppShareText] = useState('');

  // Local data revision ticker to trigger reactive re-render when admin updates data
  const [dataVersion, setDataVersion] = useState(0);

  const refreshData = () => {
    setDataVersion(v => v + 1);
  };

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, viewPayload]);

  const handleNavigate = (view: ViewType, payload?: any) => {
    setCurrentView(view);
    if (payload) {
      setViewPayload(payload);
    }
  };

  const handleSelectSearchResult = (result: SearchResult) => {
    if (result.type === 'crop') {
      handleNavigate('crop-detail', { cropSlug: result.slug });
    } else if (result.type === 'mandi') {
      handleNavigate('mandi-detail', { mandiSlug: result.slug });
    } else if (result.type === 'district') {
      handleNavigate('district-detail', { districtSlug: result.slug });
    }
  };

  const handleShareItem = (item: DailyPrice) => {
    const text = mandiStore.generateWhatsAppShareText(item);
    setWhatsAppShareText(text);
    setIsWhatsAppModalOpen(true);
  };

  const handleCustomShareText = (text: string) => {
    setWhatsAppShareText(text);
    setIsWhatsAppModalOpen(true);
  };

  // Live prices and best price reports
  const todayPrices = mandiStore.getPricesForDate();
  const bestPriceReports = mandiStore.getBestPriceReports();

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCF8] text-[#1F2937] font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* Hero Section */}
            <HeroSection
              onSelectResult={handleSelectSearchResult}
              onNavigate={handleNavigate}
            />

            {/* Today's Mandi Prices Table */}
            <TodayMandiPrices
              prices={todayPrices}
              onSelectCrop={(cropSlug) => handleNavigate('crop-detail', { cropSlug })}
              onSelectMandi={(mandiSlug) => handleNavigate('mandi-detail', { mandiSlug })}
              onShareWhatsApp={handleShareItem}
            />

            {/* Best Prices in MP Section */}
            <BestPricesSection
              reports={bestPriceReports}
              onSelectCrop={(cropSlug) => handleNavigate('crop-detail', { cropSlug })}
              onSelectMandi={(mandiSlug) => handleNavigate('mandi-detail', { mandiSlug })}
            />

            {/* Crop Categories Grid */}
            <CropCategories
              onSelectCrop={(cropSlug) => handleNavigate('crop-detail', { cropSlug })}
            />

            {/* District Browse Directory */}
            <DistrictBrowse
              onSelectDistrict={(districtSlug) => handleNavigate('district-detail', { districtSlug })}
              onSelectMandi={(mandiSlug) => handleNavigate('mandi-detail', { mandiSlug })}
            />
          </>
        )}

        {currentView === 'crop-detail' && (
          <CropDetailPage
            cropSlug={viewPayload.cropSlug || 'soybean'}
            onSelectMandi={(mandiSlug) => handleNavigate('mandi-detail', { mandiSlug })}
            onSelectCrop={(cropSlug) => handleNavigate('crop-detail', { cropSlug })}
            onShareWhatsApp={handleCustomShareText}
            onNavigateCompare={(cropSlug) => handleNavigate('compare', { cropSlug })}
          />
        )}

        {currentView === 'mandi-detail' && (
          <MandiDetailPage
            mandiSlug={viewPayload.mandiSlug || 'mandsaur'}
            onSelectCrop={(cropSlug) => handleNavigate('crop-detail', { cropSlug })}
            onSelectDistrict={(districtSlug) => handleNavigate('district-detail', { districtSlug })}
            onShareWhatsApp={handleCustomShareText}
          />
        )}

        {currentView === 'district-detail' && (
          <DistrictDetailPage
            districtSlug={viewPayload.districtSlug || 'mandsaur'}
            onSelectMandi={(mandiSlug) => handleNavigate('mandi-detail', { mandiSlug })}
            onSelectCrop={(cropSlug) => handleNavigate('crop-detail', { cropSlug })}
            onShareWhatsApp={handleCustomShareText}
          />
        )}

        {currentView === 'mandis' && (
          <div className="py-6">
            <DistrictBrowse
              onSelectDistrict={(districtSlug) => handleNavigate('district-detail', { districtSlug })}
              onSelectMandi={(mandiSlug) => handleNavigate('mandi-detail', { mandiSlug })}
            />
          </div>
        )}

        {currentView === 'crops' && (
          <div className="py-6">
            <CropCategories
              onSelectCrop={(cropSlug) => handleNavigate('crop-detail', { cropSlug })}
            />
          </div>
        )}

        {currentView === 'districts' && (
          <div className="py-6">
            <DistrictBrowse
              onSelectDistrict={(districtSlug) => handleNavigate('district-detail', { districtSlug })}
              onSelectMandi={(mandiSlug) => handleNavigate('mandi-detail', { mandiSlug })}
            />
          </div>
        )}

        {currentView === 'compare' && (
          <MandiComparison
            initialCropSlug={viewPayload.cropSlug || 'soybean'}
            onSelectMandi={(mandiSlug) => handleNavigate('mandi-detail', { mandiSlug })}
            onShareWhatsApp={handleCustomShareText}
          />
        )}

        {currentView === 'history' && (
          <HistoricalPriceViewer
            initialCropSlug={viewPayload.cropSlug || 'soybean'}
            initialMandiSlug={viewPayload.mandiSlug || 'mandsaur'}
            onShareWhatsApp={handleCustomShareText}
          />
        )}

        {currentView === 'about' && (
          <AboutAndDisclaimer />
        )}

        {currentView === 'seo' && (
          <SeoSchemaViewer />
        )}
      </main>

      {/* Global Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSelectSearchResult}
      />

      {isAdminOpen && (
        <AdminDashboard
          onClose={() => setIsAdminOpen(false)}
          onRefreshData={refreshData}
        />
      )}

      <WhatsAppShareModal
        isOpen={isWhatsAppModalOpen}
        shareText={whatsAppShareText}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />
    </div>
  );
}
