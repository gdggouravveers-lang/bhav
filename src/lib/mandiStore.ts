import { 
  Crop, 
  District, 
  Mandi, 
  DailyPrice, 
  BestPriceReport, 
  PriceChange, 
  SearchResult, 
  ImportValidationResult,
  UserAlert,
  PriceHistoryRecord
} from '../types';
import { 
  SEED_CROPS, 
  SEED_DISTRICTS, 
  SEED_MANDIS, 
  INITIAL_DAILY_PRICES, 
  TODAY_DATE,
  DISPLAY_TODAY_HI,
  LAST_UPDATE_TIME_HI,
  generateHistoryForCropAndMandi
} from '../data/seedData';

const STORAGE_KEYS = {
  PRICES: 'mp_mandi_prices_v1',
  MANDIS: 'mp_mandi_list_v1',
  CROPS: 'mp_crops_list_v1',
  FAVORITES: 'mp_user_favorites_v1',
  ALERTS: 'mp_user_alerts_v1',
  IMPORT_LOGS: 'mp_import_logs_v1',
};

class MandiStore {
  private prices: DailyPrice[] = [];
  private mandis: Mandi[] = [];
  private crops: Crop[] = [];
  private districts: District[] = [];
  private favorites: { crops: string[]; mandis: string[] } = { crops: ['crop-soybean', 'crop-garlic', 'crop-wheat'], mandis: ['mandi-mandsaur', 'mandi-neemuch', 'mandi-indore'] };
  private alerts: UserAlert[] = [];
  private subscribers: Array<() => void> = [];

  constructor() {
    this.districts = SEED_DISTRICTS;
    this.init();
  }

  private init() {
    // Load from LocalStorage if exists, else load Seed data
    try {
      const storedPrices = localStorage.getItem(STORAGE_KEYS.PRICES);
      const storedMandis = localStorage.getItem(STORAGE_KEYS.MANDIS);
      const storedCrops = localStorage.getItem(STORAGE_KEYS.CROPS);
      const storedFavs = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      const storedAlerts = localStorage.getItem(STORAGE_KEYS.ALERTS);

      this.prices = storedPrices ? JSON.parse(storedPrices) : [...INITIAL_DAILY_PRICES];
      this.mandis = storedMandis ? JSON.parse(storedMandis) : [...SEED_MANDIS];
      this.crops = storedCrops ? JSON.parse(storedCrops) : [...SEED_CROPS];
      
      if (storedFavs) {
        this.favorites = JSON.parse(storedFavs);
      }
      if (storedAlerts) {
        this.alerts = JSON.parse(storedAlerts);
      }
    } catch {
      this.prices = [...INITIAL_DAILY_PRICES];
      this.mandis = [...SEED_MANDIS];
      this.crops = [...SEED_CROPS];
    }
  }

  private persist() {
    try {
      localStorage.setItem(STORAGE_KEYS.PRICES, JSON.stringify(this.prices));
      localStorage.setItem(STORAGE_KEYS.MANDIS, JSON.stringify(this.mandis));
      localStorage.setItem(STORAGE_KEYS.CROPS, JSON.stringify(this.crops));
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(this.favorites));
      localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(this.alerts));
    } catch (e) {
      console.warn('Storage persistence failed', e);
    }
    this.notify();
  }

  public subscribe(callback: () => void) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  private notify() {
    this.subscribers.forEach(fn => fn());
  }

  // Getters
  public getDistricts(): District[] {
    return this.districts;
  }

  public getMandis(districtId?: string): Mandi[] {
    if (districtId) {
      return this.mandis.filter(m => m.district_id === districtId && m.active);
    }
    return this.mandis.filter(m => m.active);
  }

  public getMandiById(id: string): Mandi | undefined {
    return this.mandis.find(m => m.id === id || m.slug === id);
  }

  public getDistrictBySlug(slug: string): District | undefined {
    return this.districts.find(d => d.slug === slug || d.id === slug);
  }

  public getCrops(category?: string): Crop[] {
    if (category && category !== 'सभी') {
      return this.crops.filter(c => c.category === category && c.active);
    }
    return this.crops.filter(c => c.active);
  }

  public getCropById(id: string): Crop | undefined {
    return this.crops.find(c => c.id === id || c.slug === id);
  }

  public getAllPrices(): DailyPrice[] {
    return this.prices;
  }

  public getPricesForDate(date: string = TODAY_DATE): DailyPrice[] {
    return this.prices.filter(p => p.date === date);
  }

  public getPricesForCrop(cropIdOrSlug: string, date: string = TODAY_DATE): DailyPrice[] {
    const crop = this.getCropById(cropIdOrSlug);
    if (!crop) return [];
    return this.prices.filter(p => (p.crop_id === crop.id || p.crop_id === cropIdOrSlug) && p.date === date);
  }

  public getPricesForMandi(mandiIdOrSlug: string, date: string = TODAY_DATE): DailyPrice[] {
    const mandi = this.getMandiById(mandiIdOrSlug);
    if (!mandi) return [];
    return this.prices.filter(p => (p.mandi_id === mandi.id || p.mandi_id === mandiIdOrSlug) && p.date === date);
  }

  public getPricesForDistrict(districtIdOrSlug: string, date: string = TODAY_DATE): DailyPrice[] {
    const district = this.getDistrictBySlug(districtIdOrSlug);
    if (!district) return [];
    return this.prices.filter(p => (p.district_id === district.id || p.district_id === districtIdOrSlug) && p.date === date);
  }

  // Price Change Calculation
  public calculatePriceChange(currentModal: number, prevModal?: number): PriceChange {
    if (!prevModal || prevModal <= 0) {
      return { absolute: 0, percentage: 0, trend: 'na', text: '—' };
    }
    const diff = currentModal - prevModal;
    const pct = ((diff / prevModal) * 100);
    const roundedPct = Math.abs(pct).toFixed(1);

    if (diff > 0) {
      return {
        absolute: diff,
        percentage: Number(roundedPct),
        trend: 'up',
        text: `↑ ₹${diff.toLocaleString('en-IN')} (+${roundedPct}%)`
      };
    } else if (diff < 0) {
      return {
        absolute: Math.abs(diff),
        percentage: Number(roundedPct),
        trend: 'down',
        text: `↓ ₹${Math.abs(diff).toLocaleString('en-IN')} (-${roundedPct}%)`
      };
    } else {
      return {
        absolute: 0,
        percentage: 0,
        trend: 'same',
        text: '— कोई बदलाव नहीं'
      };
    }
  }

  // Best Price Reports (आज सबसे अच्छा भाव)
  public getBestPriceReports(date: string = TODAY_DATE): BestPriceReport[] {
    const todayPrices = this.getPricesForDate(date);
    const cropMap = new Map<string, DailyPrice[]>();

    todayPrices.forEach(p => {
      const list = cropMap.get(p.crop_id) || [];
      list.push(p);
      cropMap.set(p.crop_id, list);
    });

    const reports: BestPriceReport[] = [];

    cropMap.forEach((prices, cropId) => {
      const crop = this.getCropById(cropId);
      if (!crop || prices.length === 0) return;

      // Sort by modal price descending
      const sorted = [...prices].sort((a, b) => b.modal_price - a.modal_price);
      const highest = sorted[0];
      const lowest = sorted[sorted.length - 1];

      const sum = prices.reduce((acc, curr) => acc + curr.modal_price, 0);
      const avg = Math.round(sum / prices.length);

      reports.push({
        crop_id: crop.id,
        crop_name_hi: crop.name_hi,
        crop_name_en: crop.name_en,
        category: crop.category,
        unit: crop.unit,
        highest: {
          mandi_name_hi: highest.mandi_name_hi,
          district_name_hi: highest.district_name_hi,
          modal_price: highest.modal_price,
          max_price: highest.max_price,
          mandi_id: highest.mandi_id
        },
        lowest: {
          mandi_name_hi: lowest.mandi_name_hi,
          district_name_hi: lowest.district_name_hi,
          modal_price: lowest.modal_price,
          min_price: lowest.min_price,
          mandi_id: lowest.mandi_id
        },
        avg_modal_price: avg,
        total_mandis_reporting: prices.length,
        date
      });
    });

    return reports.sort((a, b) => b.total_mandis_reporting - a.total_mandis_reporting);
  }

  // Price History
  public getHistory(cropId: string, mandiId: string, days: number = 30): PriceHistoryRecord[] {
    return generateHistoryForCropAndMandi(cropId, mandiId, days);
  }

  // Comprehensive Search (Hindi + English + Phonetic matching)
  public search(query: string): SearchResult[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: SearchResult[] = [];

    // Search Crops
    this.crops.forEach(crop => {
      const matchHi = crop.name_hi.toLowerCase().includes(q);
      const matchEn = crop.name_en.toLowerCase().includes(q);
      const matchKeywords = crop.searchKeywords?.some(k => k.toLowerCase().includes(q));

      if (matchHi || matchEn || matchKeywords) {
        const reportingCount = this.getPricesForCrop(crop.id).length;
        results.push({
          type: 'crop',
          id: crop.id,
          title_hi: crop.name_hi,
          title_en: crop.name_en,
          subtitle_hi: `${crop.category} • ${reportingCount} मंडियों में भाव उपलब्ध`,
          slug: crop.slug,
          category: crop.category,
          count: reportingCount
        });
      }
    });

    // Search Mandis
    this.mandis.forEach(mandi => {
      const matchHi = mandi.name_hi.toLowerCase().includes(q);
      const matchEn = mandi.name_en.toLowerCase().includes(q);
      const matchDist = mandi.district_name_hi.toLowerCase().includes(q);

      if (matchHi || matchEn || matchDist) {
        const cropCount = this.getPricesForMandi(mandi.id).length;
        results.push({
          type: 'mandi',
          id: mandi.id,
          title_hi: mandi.name_hi,
          title_en: mandi.name_en,
          subtitle_hi: `जिला ${mandi.district_name_hi} • ${cropCount} फसलें दर्ज`,
          slug: mandi.slug,
          count: cropCount
        });
      }
    });

    // Search Districts
    this.districts.forEach(dist => {
      const matchHi = dist.name_hi.toLowerCase().includes(q);
      const matchEn = dist.name_en.toLowerCase().includes(q);

      if (matchHi || matchEn) {
        const mandisInDist = this.getMandis(dist.id).length;
        results.push({
          type: 'district',
          id: dist.id,
          title_hi: `${dist.name_hi} जिला`,
          title_en: `${dist.name_en} District`,
          subtitle_hi: `${dist.region} क्षेत्र • ${mandisInDist} प्रमुख मंडियां`,
          slug: dist.slug,
          count: mandisInDist
        });
      }
    });

    return results;
  }

  // WhatsApp Share Message Helper
  public generateWhatsAppShareUrl(options: {
    type: 'crop' | 'mandi' | 'compare';
    title: string;
    itemsText: string;
    url?: string;
  }): string {
    const pageUrl = window.location.origin;
    let message = '';

    if (options.type === 'crop') {
      message = `🌾 *मध्य प्रदेश मंडी भाव (${DISPLAY_TODAY_HI})*\n\n` +
        `📊 *${options.title} आज के भाव:*\n` +
        `${options.itemsText}\n\n` +
        `🔎 सभी मंडियों के ताज़ा भाव, न्यूनतम-अधिकतम व आवक देखने के लिए लिंक खोलें:\n` +
        `${pageUrl}`;
    } else if (options.type === 'mandi') {
      message = `🏛️ *${options.title} आज के भाव (${DISPLAY_TODAY_HI})*\n\n` +
        `${options.itemsText}\n\n` +
        `📍 अंतिम अपडेट: ${LAST_UPDATE_TIME_HI}\n` +
        `🔗 विस्तृत मंडी भाव व इतिहास देखें: ${pageUrl}`;
    } else {
      message = `⚖️ *मंडी भाव तुलना (${options.title})*\n\n` +
        `${options.itemsText}\n\n` +
        `📲 रोज़ाना ताज़ा मध्य प्रदेश मंडी भाव देखें: ${pageUrl}`;
    }

    return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  }

  // Admin Actions
  public addOrUpdatePrice(priceData: Omit<DailyPrice, 'id' | 'updated_at'> & { id?: string }): DailyPrice {
    const id = priceData.id || `dp-${priceData.crop_id}-${priceData.mandi_id}-${Date.now()}`;
    const newPrice: DailyPrice = {
      ...priceData,
      id,
      updated_at: `${DISPLAY_TODAY_HI}, ${new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })}`
    };

    const existingIndex = this.prices.findIndex(p => 
      p.id === id || (p.mandi_id === priceData.mandi_id && p.crop_id === priceData.crop_id && p.date === priceData.date)
    );

    if (existingIndex >= 0) {
      this.prices[existingIndex] = newPrice;
    } else {
      this.prices.unshift(newPrice);
    }

    this.persist();
    return newPrice;
  }

  public deletePrice(priceId: string): boolean {
    const initialLen = this.prices.length;
    this.prices = this.prices.filter(p => p.id !== priceId);
    if (this.prices.length !== initialLen) {
      this.persist();
      return true;
    }
    return false;
  }

  public toggleVerifyPrice(priceId: string): boolean {
    const price = this.prices.find(p => p.id === priceId);
    if (price) {
      price.is_verified = !price.is_verified;
      this.persist();
      return true;
    }
    return false;
  }

  // CSV / Excel Import Validator & Parser
  public validateAndParseCsv(csvText: string): ImportValidationResult {
    const lines = csvText.trim().split(/\r?\n/).filter(line => line.trim().length > 0);
    const errors: ImportValidationResult['errors'] = [];
    const validRows: DailyPrice[] = [];
    const warnings: string[] = [];
    let duplicateCount = 0;

    if (lines.length < 2) {
      return {
        totalRows: 0,
        validRows: [],
        errors: [{ rowNumber: 1, field: 'file', message: 'फ़ाइल खाली है या हेडर पंक्ति गायब है', rawText: '' }],
        duplicateCount: 0,
        warnings: ['कम से कम एक डेटा पंक्ति आवश्यक है']
      };
    }

    const header = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    // Expected headers: date, district, mandi, crop, min_price, max_price, modal_price, arrival, unit
    // Or in Hindi: तारीख, जिला, मंडी, फसल, न्यूनतम भाव, अधिकतम भाव, मॉडल भाव, आवक, इकाई
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const cols = line.split(',').map(c => c.trim());

      if (cols.length < 6) {
        errors.push({
          rowNumber: i + 1,
          field: 'columns',
          message: `कॉलम की संख्या अपर्याप्त है (कम से कम 6 कॉलम आवश्यक हैं)`,
          rawText: line
        });
        continue;
      }

      const dateVal = cols[0] || TODAY_DATE;
      const districtVal = cols[1];
      const mandiVal = cols[2];
      const cropVal = cols[3];
      const minPrice = parseFloat(cols[4]);
      const maxPrice = parseFloat(cols[5]);
      const modalPrice = cols[6] ? parseFloat(cols[6]) : Math.round((minPrice + maxPrice) / 2);
      const arrival = cols[7] ? parseFloat(cols[7]) : undefined;
      const unit = cols[8] || 'क्विंटल';

      // Validation
      if (!mandiVal) {
        errors.push({ rowNumber: i + 1, field: 'mandi', message: 'मंडी का नाम आवश्यक है', rawText: line });
        continue;
      }
      if (!cropVal) {
        errors.push({ rowNumber: i + 1, field: 'crop', message: 'फसल का नाम आवश्यक है', rawText: line });
        continue;
      }
      if (isNaN(minPrice) || minPrice <= 0) {
        errors.push({ rowNumber: i + 1, field: 'min_price', message: 'न्यूनतम भाव अमान्य या शून्य है', rawText: line });
        continue;
      }
      if (isNaN(maxPrice) || maxPrice <= 0 || maxPrice < minPrice) {
        errors.push({ rowNumber: i + 1, field: 'max_price', message: 'अधिकतम भाव न्यूनतम से कम नहीं हो सकता', rawText: line });
        continue;
      }
      if (isNaN(modalPrice) || modalPrice < minPrice || modalPrice > maxPrice) {
        errors.push({ rowNumber: i + 1, field: 'modal_price', message: 'मॉडल भाव न्यूनतम व अधिकतम के बीच होना चाहिए', rawText: line });
        continue;
      }

      // Match Mandi & Crop
      const matchedMandi = this.mandis.find(m => 
        m.name_hi.includes(mandiVal) || m.name_en.toLowerCase().includes(mandiVal.toLowerCase()) || m.slug.includes(mandiVal.toLowerCase())
      );
      const matchedCrop = this.crops.find(c => 
        c.name_hi.includes(cropVal) || c.name_en.toLowerCase().includes(cropVal.toLowerCase()) || c.slug.includes(cropVal.toLowerCase())
      );

      const mandiId = matchedMandi ? matchedMandi.id : `mandi-custom-${mandiVal.toLowerCase().replace(/\s+/g, '-')}`;
      const mandiNameHi = matchedMandi ? matchedMandi.name_hi : mandiVal;
      const districtNameHi = matchedMandi ? matchedMandi.district_name_hi : (districtVal || 'मध्य प्रदेश');
      const districtId = matchedMandi ? matchedMandi.district_id : 'dist-mandsaur';

      const cropId = matchedCrop ? matchedCrop.id : `crop-custom-${cropVal.toLowerCase().replace(/\s+/g, '-')}`;
      const cropNameHi = matchedCrop ? matchedCrop.name_hi : cropVal;
      const cropNameEn = matchedCrop ? matchedCrop.name_en : cropVal;
      const category = matchedCrop ? matchedCrop.category : 'अन्य कृषि उपज';

      if (!matchedMandi) {
        warnings.push(`पंक्ति ${i + 1}: मंडी "${mandiVal}" डेटाबेस में पहले से नहीं थी, इसे नई प्रविष्टि के रूप में जोड़ा गया।`);
      }
      if (!matchedCrop) {
        warnings.push(`पंक्ति ${i + 1}: फसल "${cropVal}" डेटाबेस में पहले से नहीं थी।`);
      }

      const id = `dp-import-${mandiId}-${cropId}-${dateVal}`;
      const existing = this.prices.some(p => p.mandi_id === mandiId && p.crop_id === cropId && p.date === dateVal);
      if (existing) {
        duplicateCount++;
      }

      validRows.push({
        id,
        mandi_id: mandiId,
        mandi_name_hi: mandiNameHi,
        mandi_name_en: matchedMandi?.name_en || mandiVal,
        district_id: districtId,
        district_name_hi: districtNameHi,
        crop_id: cropId,
        crop_name_hi: cropNameHi,
        crop_name_en: cropNameEn,
        category,
        date: dateVal,
        min_price: minPrice,
        max_price: maxPrice,
        modal_price: modalPrice,
        prev_modal_price: modalPrice - 20, // default diff
        arrival_quantity: arrival,
        unit,
        is_verified: true,
        source: 'CSV/Excel बल्क आयात (सत्यापित)',
        updated_at: `${DISPLAY_TODAY_HI}, बल्क अपलोड`
      });
    }

    return {
      totalRows: lines.length - 1,
      validRows,
      errors,
      duplicateCount,
      warnings
    };
  }

  public executeImport(rows: DailyPrice[]): number {
    let imported = 0;
    rows.forEach(row => {
      this.addOrUpdatePrice(row);
      imported++;
    });
    return imported;
  }

  public generateWhatsAppShareText(item: DailyPrice): string {
    const change = this.calculatePriceChange(item.modal_price, item.prev_modal_price);
    return `🌾 *${item.crop_name_hi} मंडी भाव आज (${DISPLAY_TODAY_HI})*\n\n` +
      `🏛️ मंडी: *${item.mandi_name_hi}* (${item.district_name_hi})\n` +
      `💰 मॉडल भाव: *₹${item.modal_price.toLocaleString('en-IN')}/${item.unit}*\n` +
      `📉 न्यूनतम भाव: ₹${item.min_price.toLocaleString('en-IN')}\n` +
      `📈 अधिकतम भाव: ₹${item.max_price.toLocaleString('en-IN')}\n` +
      `🔄 आज का बदलाव: ${change.trend === 'up' ? `↑ +₹${change.absolute} (+${change.percentage}%) तेजी` : change.trend === 'down' ? `↓ -₹${change.absolute} (-${change.percentage}%) मंदी` : 'स्थिर (—)'}\n` +
      (item.arrival_quantity ? `📦 आवक: ${item.arrival_quantity.toLocaleString('en-IN')} क्विंटल\n` : '') +
      `\n📍 अंतिम अपडेट: ${LAST_UPDATE_TIME_HI}\n` +
      `🌐 लाइव भाव देखें: https://mandibhav-mp.in`;
  }

  public addPrice(price: DailyPrice) {
    this.addOrUpdatePrice(price);
  }

  public addBulkPrices(prices: DailyPrice[]) {
    this.executeImport(prices);
  }

  public resetToSeedData() {
    this.prices = [...INITIAL_DAILY_PRICES];
    this.mandis = [...SEED_MANDIS];
    this.crops = [...SEED_CROPS];
    this.persist();
  }

  // Favorites
  public isFavoriteCrop(cropId: string): boolean {
    return this.favorites.crops.includes(cropId);
  }

  public toggleFavoriteCrop(cropId: string) {
    if (this.favorites.crops.includes(cropId)) {
      this.favorites.crops = this.favorites.crops.filter(id => id !== cropId);
    } else {
      this.favorites.crops.push(cropId);
    }
    this.persist();
  }

  public isFavoriteMandi(mandiId: string): boolean {
    return this.favorites.mandis.includes(mandiId);
  }

  public toggleFavoriteMandi(mandiId: string) {
    if (this.favorites.mandis.includes(mandiId)) {
      this.favorites.mandis = this.favorites.mandis.filter(id => id !== mandiId);
    } else {
      this.favorites.mandis.push(mandiId);
    }
    this.persist();
  }

  public getFavoriteCrops(): Crop[] {
    return this.crops.filter(c => this.favorites.crops.includes(c.id));
  }

  public getFavoriteMandis(): Mandi[] {
    return this.mandis.filter(m => this.favorites.mandis.includes(m.id));
  }
}

export const mandiStore = new MandiStore();
