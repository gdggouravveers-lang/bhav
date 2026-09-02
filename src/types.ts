/**
 * Mandi Bhav Web - Core Types and Interfaces
 */

export type CropCategory = 
  | 'अनाज' 
  | 'दलहन' 
  | 'तिलहन' 
  | 'मसाले' 
  | 'सब्जियां' 
  | 'फल' 
  | 'औषधीय फसलें' 
  | 'अन्य कृषि उपज';

export interface Crop {
  id: string;
  name_hi: string;
  name_en: string;
  slug: string;
  category: CropCategory;
  unit: string; // e.g. 'क्विंटल' | 'किग्रा' | 'पेटी'
  active: boolean;
  popular?: boolean;
  description?: string;
  searchKeywords?: string[];
}

export interface District {
  id: string;
  name_hi: string;
  name_en: string;
  slug: string;
  region: string; // 'मालवा' | 'निमाड़' | 'मध्य भारत' | 'महाकौशल' | 'ग्वालियर-चंबल' | 'बुंदेलखंड' | 'विंध्य'
  hq: string;
  key_crops?: string[];
}

export interface Mandi {
  id: string;
  name_hi: string;
  name_en: string;
  slug: string;
  district_id: string;
  district_name_hi: string;
  location: string;
  active: boolean;
  isMajor?: boolean;
  contact_phone?: string;
  established?: string;
  market_type?: 'मुख्य मंडी' | 'उप-मंडी';
}

export interface DailyPrice {
  id: string;
  mandi_id: string;
  mandi_name_hi: string;
  mandi_name_en: string;
  district_id: string;
  district_name_hi: string;
  crop_id: string;
  crop_name_hi: string;
  crop_name_en: string;
  category: CropCategory;
  date: string; // YYYY-MM-DD
  min_price: number;
  max_price: number;
  modal_price: number;
  prev_modal_price?: number;
  arrival_quantity?: number; // In Quintals
  unit: string;
  is_verified: boolean;
  source: string;
  source_ref?: string;
  updated_at: string;
}

export interface PriceHistoryRecord {
  date: string;
  min_price: number;
  max_price: number;
  modal_price: number;
  arrival_quantity?: number;
}

export interface BestPriceReport {
  crop_id: string;
  crop_name_hi: string;
  crop_name_en: string;
  category: CropCategory;
  unit: string;
  highest: {
    mandi_name_hi: string;
    district_name_hi: string;
    modal_price: number;
    max_price: number;
    mandi_id: string;
  };
  lowest: {
    mandi_name_hi: string;
    district_name_hi: string;
    modal_price: number;
    min_price: number;
    mandi_id: string;
  };
  avg_modal_price: number;
  total_mandis_reporting: number;
  date: string;
}

export interface PriceChange {
  absolute: number;
  percentage: number;
  trend: 'up' | 'down' | 'same' | 'na';
  text: string;
}

export interface SearchResult {
  type: 'crop' | 'mandi' | 'district';
  id: string;
  title_hi: string;
  title_en: string;
  subtitle_hi: string;
  slug: string;
  category?: string;
  count?: number;
}

export interface ImportValidationResult {
  totalRows: number;
  validRows: DailyPrice[];
  errors: {
    rowNumber: number;
    field: string;
    message: string;
    rawText: string;
  }[];
  duplicateCount: number;
  warnings: string[];
}

export type CsvImportResult = ImportValidationResult;

export interface UserAlert {
  id: string;
  crop_id: string;
  crop_name_hi: string;
  mandi_id?: string;
  target_price: number;
  condition: 'above' | 'below';
  created_at: string;
  phone_or_email?: string;
}

export type ViewType = 
  | 'home' 
  | 'crops' 
  | 'crop-detail' 
  | 'mandis' 
  | 'mandi-detail' 
  | 'districts' 
  | 'district-detail' 
  | 'compare' 
  | 'history' 
  | 'admin' 
  | 'about' 
  | 'disclaimer' 
  | 'privacy' 
  | 'terms'
  | 'seo'
  | 'seo-preview';
