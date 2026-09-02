import { Crop, District, Mandi, DailyPrice, PriceHistoryRecord } from '../types';

export const TODAY_DATE = '2026-09-01';
export const TODAY_ISO = '2026-09-01';
export const DISPLAY_TODAY_HI = '1 सितम्बर 2026';
export const LAST_UPDATE_TIME_HI = '1 सितम्बर 2026, शाम 06:30 बजे';

export const SEED_DISTRICTS: District[] = [
  { id: 'dist-mandsaur', name_hi: 'मंदसौर', name_en: 'Mandsaur', slug: 'mandsaur', region: 'मालवा', hq: 'मंदसौर', key_crops: ['लहसुन', 'सोयाबीन', 'मेथी', 'अलसी', 'इसबगोल'] },
  { id: 'dist-neemuch', name_hi: 'नीमच', name_en: 'Neemuch', slug: 'neemuch', region: 'मालवा', hq: 'नीमच', key_crops: ['लहसुन', 'अश्वगंधा', 'सोयाबीन', 'कलौंजी', 'गेहूं'] },
  { id: 'dist-indore', name_hi: 'इंदौर', name_en: 'Indore', slug: 'indore', region: 'मालवा', hq: 'इंदौर', key_crops: ['सोयाबीन', 'गेहूं', 'डॉलर चना', 'प्याज', 'आलू'] },
  { id: 'dist-ujjain', name_hi: 'उज्जैन', name_en: 'Ujjain', slug: 'ujjain', region: 'मालवा', hq: 'उज्जैन', key_crops: ['सोयाबीन', 'गेहूं', 'चना', 'धनिया'] },
  { id: 'dist-ratlam', name_hi: 'रतलाम', name_en: 'Ratlam', slug: 'ratlam', region: 'मालवा', hq: 'रतलाम', key_crops: ['लहसुन', 'प्याज', 'गेहूं', 'सोयाबीन', 'मटर'] },
  { id: 'dist-dewas', name_hi: 'देवास', name_en: 'Dewas', slug: 'dewas', region: 'मालवा', hq: 'देवास', key_crops: ['सोयाबीन', 'गेहूं', 'चना', 'कपास'] },
  { id: 'dist-dhar', name_hi: 'धार', name_en: 'Dhar', slug: 'dhar', region: 'मालवा', hq: 'धार', key_crops: ['सोयाबीन', 'कपास', 'गेहूं', 'मक्का'] },
  { id: 'dist-shajapur', name_hi: 'शाजापुर', name_en: 'Shajapur', slug: 'shajapur', region: 'मालवा', hq: 'शाजापुर', key_crops: ['प्याज', 'लहसुन', 'सोयाबीन', 'गेहूं'] },
  { id: 'dist-sehore', name_hi: 'सीहोर', name_en: 'Sehore', slug: 'sehore', region: 'मध्य भारत', hq: 'सीहोर', key_crops: ['गेहूं', 'सोयाबीन', 'चना'] },
  { id: 'dist-bhopal', name_hi: 'भोपाल', name_en: 'Bhopal', slug: 'bhopal', region: 'मध्य भारत', hq: 'भोपाल', key_crops: ['गेहूं', 'सोयाबीन', 'सब्जियां'] },
  { id: 'dist-vidisha', name_hi: 'विदिशा', name_en: 'Vidisha', slug: 'vidisha', region: 'मध्य भारत', hq: 'विदिशा', key_crops: ['गेहूं', 'चना', 'सोयाबीन', 'मसूर'] },
  { id: 'dist-sagar', name_hi: 'सागर', name_en: 'Sagar', slug: 'sagar', region: 'बुंदेलखंड', hq: 'सागर', key_crops: ['सोयाबीन', 'गेहूं', 'उड़द', 'चना'] },
  { id: 'dist-jabalpur', name_hi: 'जबलपुर', name_en: 'Jabalpur', slug: 'jabalpur', region: 'महाकौशल', hq: 'जबलपुर', key_crops: ['धान', 'गेहूं', 'मटर', 'चना'] },
  { id: 'dist-harda', name_hi: 'हरदा', name_en: 'Harda', slug: 'harda', region: 'मध्य भारत', hq: 'हरदा', key_crops: ['सोयाबीन', 'गेहूं', 'मूंग', 'चना'] },
  { id: 'dist-narmadapuram', name_hi: 'नर्मदापुरम (होशंगाबाद)', name_en: 'Narmadapuram', slug: 'narmadapuram', region: 'मध्य भारत', hq: 'नर्मदापुरम', key_crops: ['गेहूं', 'धान', 'मूंग', 'सोयाबीन'] },
  { id: 'dist-khargone', name_hi: 'खरगोन (पश्चिम निमाड़)', name_en: 'Khargone', slug: 'khargone', region: 'निमाड़', hq: 'खरगोन', key_crops: ['कपास', 'मिर्च', 'सोयाबीन', 'मक्का'] },
  { id: 'dist-khandwa', name_hi: 'खंडवा (पूर्वी निमाड़)', name_en: 'Khandwa', slug: 'khandwa', region: 'निमाड़', hq: 'खंडवा', key_crops: ['कपास', 'सोयाबीन', 'गेहूं', 'मक्का'] },
  { id: 'dist-chhindwara', name_hi: 'छिंदवाड़ा', name_en: 'Chhindwara', slug: 'chhindwara', region: 'महाकौशल', hq: 'छिंदवाड़ा', key_crops: ['मक्का', 'कपास', 'सोयाबीन', 'गेहूं'] },
  { id: 'dist-gwalior', name_hi: 'ग्वालियर', name_en: 'Gwalior', slug: 'gwalior', region: 'ग्वालियर-चंबल', hq: 'ग्वालियर', key_crops: ['सरसों', 'गेहूं', 'बाजरा', 'धान'] },
  { id: 'dist-morena', name_hi: 'मुरैना', name_en: 'Morena', slug: 'morena', region: 'ग्वालियर-चंबल', hq: 'मुरैना', key_crops: ['सरसों', 'बाजरा', 'गेहूं'] },
  { id: 'dist-satna', name_hi: 'सतना', name_en: 'Satna', slug: 'satna', region: 'विंध्य', hq: 'सतना', key_crops: ['धान', 'गेहूं', 'अलसी', 'चना'] },
];

export const SEED_MANDIS: Mandi[] = [
  // Mandsaur
  { id: 'mandi-mandsaur', name_hi: 'मंदसौर मंडी', name_en: 'Mandsaur Mandi', slug: 'mandsaur', district_id: 'dist-mandsaur', district_name_hi: 'मंदसौर', location: 'कृषि उपज मंडी समिति, मंदसौर बाईपास', active: true, isMajor: true, contact_phone: '07422-220101', market_type: 'मुख्य मंडी' },
  { id: 'mandi-daloda', name_hi: 'दलौदा मंडी', name_en: 'Daloda Mandi', slug: 'daloda', district_id: 'dist-mandsaur', district_name_hi: 'मंदसौर', location: 'दलौदा स्टेशन रोड, मंदसौर', active: true, isMajor: false, market_type: 'उप-मंडी' },
  { id: 'mandi-shamgarh', name_hi: 'शामगढ़ मंडी', name_en: 'Shamgarh Mandi', slug: 'shamgarh', district_id: 'dist-mandsaur', district_name_hi: 'मंदसौर', location: 'रेलवे स्टेशन रोड, शामगढ़', active: true, isMajor: false, market_type: 'उप-मंडी' },
  { id: 'mandi-sitamau', name_hi: 'सीतामऊ मंडी', name_en: 'Sitamau Mandi', slug: 'sitamau', district_id: 'dist-mandsaur', district_name_hi: 'मंदसौर', location: 'सुवासरा रोड, सीतामऊ', active: true, isMajor: false, market_type: 'उप-मंडी' },
  { id: 'mandi-suwasra', name_hi: 'सुवासरा मंडी', name_en: 'Suwasra Mandi', slug: 'suwasra', district_id: 'dist-mandsaur', district_name_hi: 'मंदसौर', location: 'मंडी प्रांगण, सुवासरा', active: true, isMajor: false, market_type: 'उप-मंडी' },
  { id: 'mandi-garoth', name_hi: 'गरोठ मंडी', name_en: 'Garoth Mandi', slug: 'garoth', district_id: 'dist-mandsaur', district_name_hi: 'मंदसौर', location: 'गरोठ मंडी यार्ड', active: true, isMajor: false, market_type: 'उप-मंडी' },
  { id: 'mandi-bhanpura', name_hi: 'भानपुरा मंडी', name_en: 'Bhanpura Mandi', slug: 'bhanpura', district_id: 'dist-mandsaur', district_name_hi: 'मंदसौर', location: 'कोटा रोड, भानपुरा', active: true, isMajor: false, market_type: 'उप-मंडी' },

  // Neemuch
  { id: 'mandi-neemuch', name_hi: 'नीमच मंडी', name_en: 'Neemuch Mandi', slug: 'neemuch', district_id: 'dist-neemuch', district_name_hi: 'नीमच', location: 'मंडी परिसर, नीमच केंट', active: true, isMajor: true, contact_phone: '07423-228300', market_type: 'मुख्य मंडी' },
  { id: 'mandi-jawad', name_hi: 'जावद मंडी', name_en: 'Jawad Mandi', slug: 'jawad', district_id: 'dist-neemuch', district_name_hi: 'नीमच', location: 'जावद कस्बा', active: true, isMajor: false, market_type: 'उप-मंडी' },
  { id: 'mandi-manasa', name_hi: 'मनासा मंडी', name_en: 'Manasa Mandi', slug: 'manasa', district_id: 'dist-neemuch', district_name_hi: 'नीमच', location: 'मनासा रोड', active: true, isMajor: false, market_type: 'उप-मंडी' },

  // Indore
  { id: 'mandi-indore', name_hi: 'इंदौर (चोइथराम) मंडी', name_en: 'Indore Mandi', slug: 'indore', district_id: 'dist-indore', district_name_hi: 'इंदौर', location: 'चोइथराम चौराहा, इंदौर', active: true, isMajor: true, contact_phone: '0731-2472890', market_type: 'मुख्य मंडी' },
  { id: 'mandi-sanwer', name_hi: 'सांवेर मंडी', name_en: 'Sanwer Mandi', slug: 'sanwer', district_id: 'dist-indore', district_name_hi: 'इंदौर', location: 'उज्जैन रोड, सांवेर', active: true, isMajor: false, market_type: 'उप-मंडी' },

  // Ujjain
  { id: 'mandi-ujjain', name_hi: 'उज्जैन (चिमनगंज) मंडी', name_en: 'Ujjain Mandi', slug: 'ujjain', district_id: 'dist-ujjain', district_name_hi: 'उज्जैन', location: 'चिमनगंज मंडी, आगर रोड, उज्जैन', active: true, isMajor: true, contact_phone: '0734-2550123', market_type: 'मुख्य मंडी' },
  { id: 'mandi-khachrod', name_hi: 'खाचरौद मंडी', name_en: 'Khachrod Mandi', slug: 'khachrod', district_id: 'dist-ujjain', district_name_hi: 'उज्जैन', location: 'खाचरौद', active: true, isMajor: false, market_type: 'उप-मंडी' },
  { id: 'mandi-nagda', name_hi: 'नागदा मंडी', name_en: 'Nagda Mandi', slug: 'nagda', district_id: 'dist-ujjain', district_name_hi: 'उज्जैन', location: 'नागदा जंक्शन', active: true, isMajor: false, market_type: 'उप-मंडी' },
  { id: 'mandi-mahidpur', name_hi: 'महिदपुर मंडी', name_en: 'Mahidpur Mandi', slug: 'mahidpur', district_id: 'dist-ujjain', district_name_hi: 'उज्जैन', location: 'महिदपुर सिटी', active: true, isMajor: false, market_type: 'उप-मंडी' },

  // Ratlam
  { id: 'mandi-ratlam', name_hi: 'रतलाम (धौंसवास) मंडी', name_en: 'Ratlam Mandi', slug: 'ratlam', district_id: 'dist-ratlam', district_name_hi: 'रतलाम', location: 'धौंसवास यार्ड, रतलाम', active: true, isMajor: true, contact_phone: '07412-260150', market_type: 'मुख्य मंडी' },
  { id: 'mandi-jaora', name_hi: 'जावरा मंडी', name_en: 'Jaora Mandi', slug: 'jaora', district_id: 'dist-ratlam', district_name_hi: 'रतलाम', location: 'रतलाम रोड, जावरा', active: true, isMajor: true, market_type: 'मुख्य मंडी' },

  // Dewas
  { id: 'mandi-dewas', name_hi: 'देवास मंडी', name_en: 'Dewas Mandi', slug: 'dewas', district_id: 'dist-dewas', district_name_hi: 'देवास', location: 'उज्जैन रोड, देवास', active: true, isMajor: true, market_type: 'मुख्य मंडी' },
  { id: 'mandi-sonkatch', name_hi: 'सोनकच्छ मंडी', name_en: 'Sonkatch Mandi', slug: 'sonkatch', district_id: 'dist-dewas', district_name_hi: 'देवास', location: 'सोनकच्छ मंडी यार्ड', active: true, isMajor: false, market_type: 'उप-मंडी' },

  // Dhar
  { id: 'mandi-dhar', name_hi: 'धार मंडी', name_en: 'Dhar Mandi', slug: 'dhar', district_id: 'dist-dhar', district_name_hi: 'धार', location: 'इंदौर रोड, धार', active: true, isMajor: true, market_type: 'मुख्य मंडी' },
  { id: 'mandi-badnawar', name_hi: 'बदनावर मंडी', name_en: 'Badnawar Mandi', slug: 'badnawar', district_id: 'dist-dhar', district_name_hi: 'धार', location: 'पेटलावद रोड, बदनावर', active: true, isMajor: true, market_type: 'मुख्य मंडी' },

  // Shajapur
  { id: 'mandi-shajapur', name_hi: 'शाजापुर मंडी', name_en: 'Shajapur Mandi', slug: 'shajapur', district_id: 'dist-shajapur', district_name_hi: 'शाजापुर', location: 'मंडी प्रांगण, शाजापुर', active: true, isMajor: true, market_type: 'मुख्य मंडी' },
  { id: 'mandi-shujalpur', name_hi: 'शुजालपुर मंडी', name_en: 'Shujalpur Mandi', slug: 'shujalpur', district_id: 'dist-shajapur', district_name_hi: 'शाजापुर', location: 'शुजालपुर सिटी', active: true, isMajor: true, market_type: 'मुख्य मंडी' },

  // Sehore
  { id: 'mandi-sehore', name_hi: 'सीहोर मंडी', name_en: 'Sehore Mandi', slug: 'sehore', district_id: 'dist-sehore', district_name_hi: 'सीहोर', location: 'भोपाल नाका, सीहोर', active: true, isMajor: true, market_type: 'मुख्य मंडी' },
  { id: 'mandi-ashta', name_hi: 'आष्टा मंडी', name_en: 'Ashta Mandi', slug: 'ashta', district_id: 'dist-sehore', district_name_hi: 'सीहोर', location: 'कन्नौद रोड, आष्टा', active: true, isMajor: true, market_type: 'मुख्य मंडी' },

  // Bhopal
  { id: 'mandi-bhopal', name_hi: 'करोंद (भोपाल) मंडी', name_en: 'Bhopal Karond Mandi', slug: 'bhopal', district_id: 'dist-bhopal', district_name_hi: 'भोपाल', location: 'करोंद चौराहा, भोपाल', active: true, isMajor: true, market_type: 'मुख्य मंडी' },

  // Vidisha
  { id: 'mandi-vidisha', name_hi: 'विदिशा मंडी', name_en: 'Vidisha Mandi', slug: 'vidisha', district_id: 'dist-vidisha', district_name_hi: 'विदिशा', location: 'स्टेशन रोड, विदिशा', active: true, isMajor: true, market_type: 'मुख्य मंडी' },
  { id: 'mandi-basoda', name_hi: 'गंजबासौदा मंडी', name_en: 'Ganjbasoda Mandi', slug: 'ganjbasoda', district_id: 'dist-vidisha', district_name_hi: 'विदिशा', location: 'मंडी यार्ड, गंजबासौदा', active: true, isMajor: true, market_type: 'मुख्य मंडी' },

  // Harda & Narmadapuram
  { id: 'mandi-harda', name_hi: 'हरदा मंडी', name_en: 'Harda Mandi', slug: 'harda', district_id: 'dist-harda', district_name_hi: 'हरदा', location: 'मंडी रोड, हरदा', active: true, isMajor: true, market_type: 'मुख्य मंडी' },
  { id: 'mandi-pipariya', name_hi: 'पिपरिया मंडी', name_en: 'Pipariya Mandi', slug: 'pipariya', district_id: 'dist-narmadapuram', district_name_hi: 'नर्मदापुरम (होशंगाबाद)', location: 'पिपरिया मंडी', active: true, isMajor: true, market_type: 'मुख्य मंडी' },
  { id: 'mandi-itarsi', name_hi: 'इटारसी मंडी', name_en: 'Itarsi Mandi', slug: 'itarsi', district_id: 'dist-narmadapuram', district_name_hi: 'नर्मदापुरम (होशंगाबाद)', location: 'इटारसी बाईपास', active: true, isMajor: false, market_type: 'उप-मंडी' },

  // Sagar & Jabalpur
  { id: 'mandi-sagar', name_hi: 'सागर मंडी', name_en: 'Sagar Mandi', slug: 'sagar', district_id: 'dist-sagar', district_name_hi: 'सागर', location: 'मकरोनिया, सागर', active: true, isMajor: true, market_type: 'मुख्य मंडी' },
  { id: 'mandi-jabalpur', name_hi: 'जबलपुर (पाटन) मंडी', name_en: 'Jabalpur Mandi', slug: 'jabalpur', district_id: 'dist-jabalpur', district_name_hi: 'जबलपुर', location: 'पाटन रोड, जबलपुर', active: true, isMajor: true, market_type: 'मुख्य मंडी' },

  // Khargone & Khandwa
  { id: 'mandi-khargone', name_hi: 'खरगोन मंडी', name_en: 'Khargone Mandi', slug: 'khargone', district_id: 'dist-khargone', district_name_hi: 'खरगोन (पश्चिम निमाड़)', location: 'मंडी प्रांगण, खरगोन', active: true, isMajor: true, market_type: 'मुख्य मंडी' },
  { id: 'mandi-khandwa', name_hi: 'खंडवा मंडी', name_en: 'Khandwa Mandi', slug: 'khandwa', district_id: 'dist-khandwa', district_name_hi: 'खंडवा (पूर्वी निमाड़)', location: 'जसवाड़ी रोड, खंडवा', active: true, isMajor: true, market_type: 'मुख्य मंडी' },

  // Morena & Gwalior
  { id: 'mandi-morena', name_hi: 'मुरैना मंडी', name_en: 'Morena Mandi', slug: 'morena', district_id: 'dist-morena', district_name_hi: 'मुरैना', location: 'ए.बी. रोड, मुरैना', active: true, isMajor: true, market_type: 'मुख्य मंडी' },
  { id: 'mandi-gwalior', name_hi: 'ग्वालियर (लश्कर) मंडी', name_en: 'Gwalior Mandi', slug: 'gwalior', district_id: 'dist-gwalior', district_name_hi: 'ग्वालियर', location: 'लश्कर, ग्वालियर', active: true, isMajor: true, market_type: 'मुख्य मंडी' },
  { id: 'mandi-chhindwara', name_hi: 'छिंदवाड़ा मंडी', name_en: 'Chhindwara Mandi', slug: 'chhindwara', district_id: 'dist-chhindwara', district_name_hi: 'छिंदवाड़ा', location: 'कुकड़ा जगत, छिंदवाड़ा', active: true, isMajor: true, market_type: 'मुख्य मंडी' }
];

export const SEED_CROPS: Crop[] = [
  // तिलहन (Oilseeds)
  { id: 'crop-soybean', name_hi: 'सोयाबीन', name_en: 'Soybean', slug: 'soybean', category: 'तिलहन', unit: 'क्विंटल', active: true, popular: true, description: 'मध्य प्रदेश की सबसे प्रमुख खरीफ तिलहन फसल (येलो सोयाबीन)।', searchKeywords: ['soya', 'soyabin', 'soyabean', 'peela soya'] },
  { id: 'crop-mustard', name_hi: 'सरसों / रायड़ा', name_en: 'Mustard', slug: 'mustard', category: 'तिलहन', unit: 'क्विंटल', active: true, popular: true, description: 'रबी की प्रमुख तिलहन फसल, चंबल व मालवा की प्रमुख उपज।', searchKeywords: ['sarson', 'raida', 'mustard seed'] },
  { id: 'crop-linseed', name_hi: 'अलसी', name_en: 'Linseed / Flaxseed', slug: 'linseed', category: 'तिलहन', unit: 'क्विंटल', active: true, popular: false, description: 'औषधीय व तेल युक्त बीज।', searchKeywords: ['alsi', 'flaxseed', 'teesi'] },
  { id: 'crop-groundnut', name_hi: 'मूंगफली', name_en: 'Groundnut / Peanut', slug: 'groundnut', category: 'तिलहन', unit: 'क्विंटल', active: true, popular: true, description: 'निमाड़ व मालवा की प्रमुख नकदी फसल।', searchKeywords: ['mungfali', 'peanut', 'singdana'] },

  // अनाज (Cereals/Grains)
  { id: 'crop-wheat', name_hi: 'गेहूं (लोकवन/शरबती)', name_en: 'Wheat', slug: 'wheat', category: 'अनाज', unit: 'क्विंटल', active: true, popular: true, description: 'मध्य प्रदेश का विश्वप्रसिद्ध शरबती व लोकवन गेहूं।', searchKeywords: ['gehu', 'gehun', 'sharbati', 'lokwan', 'mill gehu'] },
  { id: 'crop-maize', name_hi: 'मक्का', name_en: 'Maize / Corn', slug: 'maize', category: 'अनाज', unit: 'क्विंटल', active: true, popular: true, description: 'छिंदवाड़ा, धार, रतलाम व झाबुआ की मुख्य खरीफ फसल।', searchKeywords: ['makka', 'makai', 'corn'] },
  { id: 'crop-paddy', name_hi: 'धान (बासमती/क्रांति)', name_en: 'Paddy / Rice', slug: 'paddy', category: 'अनाज', unit: 'क्विंटल', active: true, popular: true, description: 'नर्मदापुरम, जबलपुर, हरदा का सुगंधित बासमती व परमल धान।', searchKeywords: ['dhan', 'chawal', 'basmati', 'paddy'] },
  { id: 'crop-jowar', name_hi: 'ज्वार', name_en: 'Jowar / Sorghum', slug: 'jowar', category: 'अनाज', unit: 'क्विंटल', active: true, popular: false, description: 'निमाड़ क्षेत्र का प्रमुख मोटा अनाज (मिलेट)।', searchKeywords: ['jowar', 'sorghum', 'mota anaj'] },
  { id: 'crop-bajra', name_hi: 'बाजरा', name_en: 'Bajra / Pearl Millet', slug: 'bajra', category: 'अनाज', unit: 'क्विंटल', active: true, popular: false, description: 'चंबल और मुरैना का प्रमुख पौष्टिक अनाज।', searchKeywords: ['bajra', 'millet'] },

  // मसाले (Spices)
  { id: 'crop-garlic', name_hi: 'लहसुन (ऊटी/देसी/G2)', name_en: 'Garlic', slug: 'garlic', category: 'मसाले', unit: 'क्विंटल', active: true, popular: true, description: 'मंदसौर-नीमच की एशिया प्रसिद्ध लहसुन मंडी उपज।', searchKeywords: ['lahsun', 'lahsun bhav', 'ooty garlic', 'desi garlic', 'g2'] },
  { id: 'crop-onion', name_hi: 'प्याज', name_en: 'Onion', slug: 'onion', category: 'मसाले', unit: 'क्विंटल', active: true, popular: true, description: 'इंदौर, शाजापुर, खंडवा का लाल व सफेद प्याज।', searchKeywords: ['pyaz', 'pyaaj', 'kanda', 'onion'] },
  { id: 'crop-coriander', name_hi: 'धनिया (बादामी/ईगल)', name_en: 'Coriander Seed', slug: 'coriander', category: 'मसाले', unit: 'क्विंटल', active: true, popular: true, description: 'गुना व नीमच-मंदसौर का प्रसिद्ध सुगंधित सूखा धनिया।', searchKeywords: ['dhaniya', 'coriander', 'sukha dhaniya'] },
  { id: 'crop-fenugreek', name_hi: 'मेथी / मेथा', name_en: 'Fenugreek Seed', slug: 'fenugreek', category: 'मसाले', unit: 'क्विंटल', active: true, popular: true, description: 'मसाला व औषधीय उपयोग हेतु प्रमुख उपज।', searchKeywords: ['methi', 'metha', 'fenugreek'] },
  { id: 'crop-isabgol', name_hi: 'इसबगोल', name_en: 'Psyllium Husk / Isabgol', slug: 'isabgol', category: 'औषधीय फसलें', unit: 'क्विंटल', active: true, popular: true, description: 'नीमच-मंदसौर की प्रमुख औषधीय व मूल्यवान फसल।', searchKeywords: ['isabgol', 'psyllium', 'bhusi'] },
  { id: 'crop-cumin', name_hi: 'जीरा', name_en: 'Cumin Seed', slug: 'cumin', category: 'मसाले', unit: 'क्विंटल', active: true, popular: false, description: 'सुगंधित मसाला बीज।', searchKeywords: ['jeera', 'zeera', 'cumin'] },
  { id: 'crop-kalonji', name_hi: 'कलौंजी (मंगरैल)', name_en: 'Nigella / Kalonji', slug: 'kalonji', category: 'मसाले', unit: 'क्विंटल', active: true, popular: false, description: 'नीमच मंडी का विशेष काला मसाला बीज।', searchKeywords: ['kalonji', 'nigella', 'black seed'] },
  { id: 'crop-ajwain', name_hi: 'अजवाइन', name_en: 'Carom Seed / Ajwain', slug: 'ajwain', category: 'मसाले', unit: 'क्विंटल', active: true, popular: false, description: 'पाचन मसाला व औषधीय बीज।', searchKeywords: ['ajwain', 'carom seeds'] },

  // दलहन (Pulses)
  { id: 'crop-chana-dollar', name_hi: 'डॉलर चना (काबुली)', name_en: 'Dollar / Kabuli Chana', slug: 'chana-dollar', category: 'दलहन', unit: 'क्विंटल', active: true, popular: true, description: 'मालवा का सफेद मोटा डॉलर चना, निर्यात गुणवत्ता।', searchKeywords: ['dollar chana', 'kabuli chana', 'safed chana'] },
  { id: 'crop-chana-desi', name_hi: 'देसी चना (कांटा/विशाल)', name_en: 'Desi Chana / Gram', slug: 'chana-desi', category: 'दलहन', unit: 'क्विंटल', active: true, popular: true, description: 'मध्य प्रदेश की सबसे बड़ी रबी दलहन फसल।', searchKeywords: ['chana', 'desi chana', 'kanta chana', 'gram'] },
  { id: 'crop-masoor', name_hi: 'मसूर', name_en: 'Lentil / Masoor', slug: 'masoor', category: 'दलहन', unit: 'क्विंटल', active: true, popular: true, description: 'विदिशा, सागर, रायसेन की प्रमुख लाल मसूर।', searchKeywords: ['masoor', 'lentil', 'laal masoor'] },
  { id: 'crop-moong', name_hi: 'मूंग (ग्रीन ग्राम)', name_en: 'Green Gram / Moong', slug: 'moong', category: 'दलहन', unit: 'क्विंटल', active: true, popular: true, description: 'हरदा, नर्मदापुरम की ग्रीष्मकालीन व खरीफ मूंग।', searchKeywords: ['moong', 'mung', 'green gram'] },
  { id: 'crop-urad', name_hi: 'उड़द (काली दाल)', name_en: 'Black Gram / Urad', slug: 'urad', category: 'दलहन', unit: 'क्विंटल', active: true, popular: false, description: 'जबलपुर व नरसिंहपुर क्षेत्र की प्रमुख दलहन।', searchKeywords: ['urad', 'black gram', 'kali dal'] },
  { id: 'crop-tur', name_hi: 'तुअर / अरहर', name_en: 'Pigeon Pea / Arhar', slug: 'tur', category: 'दलहन', unit: 'क्विंटल', active: true, popular: true, description: 'गाडरवारा, छिंदवाड़ा की प्रसिद्ध अरहर दाल।', searchKeywords: ['tuar', 'tur', 'arhar'] },

  // सब्जियां (Vegetables)
  { id: 'crop-potato', name_hi: 'आलू (चिप्सोना/ज्योति)', name_en: 'Potato', slug: 'potato', category: 'सब्जियां', unit: 'क्विंटल', active: true, popular: true, description: 'इंदौर-मालवा का चिप्स ग्रेड आलू।', searchKeywords: ['aalu', 'aloo', 'potato', 'chipsona'] },
  { id: 'crop-tomato', name_hi: 'टमाटर', name_en: 'Tomato', slug: 'tomato', category: 'सब्जियां', unit: 'क्विंटल', active: true, popular: false, description: 'धार, झाबुआ व इंदौर का हाइब्रिड टमाटर।', searchKeywords: ['tamatar', 'tomato'] },

  // औषधीय फसलें (Medicinal)
  { id: 'crop-ashwagandha', name_hi: 'अश्वगंधा (असालिया)', name_en: 'Ashwagandha', slug: 'ashwagandha', category: 'औषधीय फसलें', unit: 'क्विंटल', active: true, popular: true, description: 'नीमच व मंदसौर की अंतरराष्ट्रीय औषधीय जड़ें।', searchKeywords: ['ashwagandha', 'asgandh', 'nagori'] },

  // अन्य कृषि उपज (Commercial/Other)
  { id: 'crop-cotton', name_hi: 'कपास (कपास-नरमा)', name_en: 'Cotton', slug: 'cotton', category: 'अन्य कृषि उपज', unit: 'क्विंटल', active: true, popular: true, description: 'निमाड़ क्षेत्र (खरगोन, खंडवा, बड़वानी) का सफेद सोना।', searchKeywords: ['kapas', 'cotton', 'narma', 'ruii'] }
];

export const CROP_CATEGORIES: { name: string; count: number; icon: string }[] = [
  { name: 'अनाज', count: 5, icon: 'Wheat' },
  { name: 'दलहन', count: 6, icon: 'Boxes' },
  { name: 'तिलहन', count: 4, icon: 'Droplets' },
  { name: 'मसाले', count: 7, icon: 'Flame' },
  { name: 'सब्जियां', count: 2, icon: 'Salad' },
  { name: 'औषधीय फसलें', count: 2, icon: 'Sparkles' },
  { name: 'अन्य कृषि उपज', count: 1, icon: 'Layers' },
];

/**
 * Realistic today's Mandi Prices dataset
 */
export const INITIAL_DAILY_PRICES: DailyPrice[] = [
  // Soybean
  {
    id: 'dp-soy-mandsaur',
    mandi_id: 'mandi-mandsaur',
    mandi_name_hi: 'मंदसौर मंडी',
    mandi_name_en: 'Mandsaur Mandi',
    district_id: 'dist-mandsaur',
    district_name_hi: 'मंदसौर',
    crop_id: 'crop-soybean',
    crop_name_hi: 'सोयाबीन',
    crop_name_en: 'Soybean',
    category: 'तिलहन',
    date: TODAY_DATE,
    min_price: 4200,
    max_price: 4680,
    modal_price: 4520,
    prev_modal_price: 4445,
    arrival_quantity: 4800,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'कृषि उपज मंडी समिति मंदसौर (Agmarknet)',
    source_ref: 'MP-MND-2026-0901',
    updated_at: LAST_UPDATE_TIME_HI
  },
  {
    id: 'dp-soy-neemuch',
    mandi_id: 'mandi-neemuch',
    mandi_name_hi: 'नीमच मंडी',
    mandi_name_en: 'Neemuch Mandi',
    district_id: 'dist-neemuch',
    district_name_hi: 'नीमच',
    crop_id: 'crop-soybean',
    crop_name_hi: 'सोयाबीन',
    crop_name_en: 'Soybean',
    category: 'तिलहन',
    date: TODAY_DATE,
    min_price: 4180,
    max_price: 4640,
    modal_price: 4490,
    prev_modal_price: 4460,
    arrival_quantity: 3600,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'मंडी समिति नीमच',
    updated_at: LAST_UPDATE_TIME_HI
  },
  {
    id: 'dp-soy-indore',
    mandi_id: 'mandi-indore',
    mandi_name_hi: 'इंदौर (चोइथराम) मंडी',
    mandi_name_en: 'Indore Mandi',
    district_id: 'dist-indore',
    district_name_hi: 'इंदौर',
    crop_id: 'crop-soybean',
    crop_name_hi: 'सोयाबीन',
    crop_name_en: 'Soybean',
    category: 'तिलहन',
    date: TODAY_DATE,
    min_price: 4250,
    max_price: 4720,
    modal_price: 4560,
    prev_modal_price: 4500,
    arrival_quantity: 5200,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'मंडी बोर्ड मध्य प्रदेश',
    updated_at: LAST_UPDATE_TIME_HI
  },
  {
    id: 'dp-soy-ujjain',
    mandi_id: 'mandi-ujjain',
    mandi_name_hi: 'उज्जैन (चिमनगंज) मंडी',
    mandi_name_en: 'Ujjain Mandi',
    district_id: 'dist-ujjain',
    district_name_hi: 'उज्जैन',
    crop_id: 'crop-soybean',
    crop_name_hi: 'सोयाबीन',
    crop_name_en: 'Soybean',
    category: 'तिलहन',
    date: TODAY_DATE,
    min_price: 4210,
    max_price: 4660,
    modal_price: 4510,
    prev_modal_price: 4480,
    arrival_quantity: 4100,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'चिमनगंज मंडी समिति',
    updated_at: LAST_UPDATE_TIME_HI
  },
  {
    id: 'dp-soy-jaora',
    mandi_id: 'mandi-jaora',
    mandi_name_hi: 'जावरा मंडी',
    mandi_name_en: 'Jaora Mandi',
    district_id: 'dist-ratlam',
    district_name_hi: 'रतलाम',
    crop_id: 'crop-soybean',
    crop_name_hi: 'सोयाबीन',
    crop_name_en: 'Soybean',
    category: 'तिलहन',
    date: TODAY_DATE,
    min_price: 4220,
    max_price: 4690,
    modal_price: 4540,
    prev_modal_price: 4490,
    arrival_quantity: 2900,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'जावरा मंडी बोर्ड',
    updated_at: LAST_UPDATE_TIME_HI
  },
  {
    id: 'dp-soy-sehore',
    mandi_id: 'mandi-sehore',
    mandi_name_hi: 'सीहोर मंडी',
    mandi_name_en: 'Sehore Mandi',
    district_id: 'dist-sehore',
    district_name_hi: 'सीहोर',
    crop_id: 'crop-soybean',
    crop_name_hi: 'सोयाबीन',
    crop_name_en: 'Soybean',
    category: 'तिलहन',
    date: TODAY_DATE,
    min_price: 4150,
    max_price: 4580,
    modal_price: 4430,
    prev_modal_price: 4450,
    arrival_quantity: 2100,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'मंडी समिति सीहोर',
    updated_at: LAST_UPDATE_TIME_HI
  },

  // Wheat (गेहूं)
  {
    id: 'dp-wheat-indore',
    mandi_id: 'mandi-indore',
    mandi_name_hi: 'इंदौर (चोइथराम) मंडी',
    mandi_name_en: 'Indore Mandi',
    district_id: 'dist-indore',
    district_name_hi: 'इंदौर',
    crop_id: 'crop-wheat',
    crop_name_hi: 'गेहूं (लोकवन/शरबती)',
    crop_name_en: 'Wheat',
    category: 'अनाज',
    date: TODAY_DATE,
    min_price: 2450,
    max_price: 3100,
    modal_price: 2750,
    prev_modal_price: 2710,
    arrival_quantity: 6500,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'मंडी बोर्ड मध्य प्रदेश',
    updated_at: LAST_UPDATE_TIME_HI
  },
  {
    id: 'dp-wheat-mandsaur',
    mandi_id: 'mandi-mandsaur',
    mandi_name_hi: 'मंदसौर मंडी',
    mandi_name_en: 'Mandsaur Mandi',
    district_id: 'dist-mandsaur',
    district_name_hi: 'मंदसौर',
    crop_id: 'crop-wheat',
    crop_name_hi: 'गेहूं (लोकवन/शरबती)',
    crop_name_en: 'Wheat',
    category: 'अनाज',
    date: TODAY_DATE,
    min_price: 2320,
    max_price: 2780,
    modal_price: 2580,
    prev_modal_price: 2550,
    arrival_quantity: 3400,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'कृषि उपज मंडी समिति मंदसौर',
    updated_at: LAST_UPDATE_TIME_HI
  },
  {
    id: 'dp-wheat-vidisha',
    mandi_id: 'mandi-vidisha',
    mandi_name_hi: 'विदिशा मंडी',
    mandi_name_en: 'Vidisha Mandi',
    district_id: 'dist-vidisha',
    district_name_hi: 'विदिशा',
    crop_id: 'crop-wheat',
    crop_name_hi: 'गेहूं (लोकवन/शरबती)',
    crop_name_en: 'Wheat',
    category: 'अनाज',
    date: TODAY_DATE,
    min_price: 2600,
    max_price: 3650,
    modal_price: 3150,
    prev_modal_price: 3100,
    arrival_quantity: 4800,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'विदिशा मंडी समिति (शरबती विशेष)',
    updated_at: LAST_UPDATE_TIME_HI
  },
  {
    id: 'dp-wheat-harda',
    mandi_id: 'mandi-harda',
    mandi_name_hi: 'हरदा मंडी',
    mandi_name_en: 'Harda Mandi',
    district_id: 'dist-harda',
    district_name_hi: 'हरदा',
    crop_id: 'crop-wheat',
    crop_name_hi: 'गेहूं (लोकवन/शरबती)',
    crop_name_en: 'Wheat',
    category: 'अनाज',
    date: TODAY_DATE,
    min_price: 2380,
    max_price: 2680,
    modal_price: 2540,
    prev_modal_price: 2530,
    arrival_quantity: 2600,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'हरदा कृषि उपज मंडी',
    updated_at: LAST_UPDATE_TIME_HI
  },
  {
    id: 'dp-wheat-ujjain',
    mandi_id: 'mandi-ujjain',
    mandi_name_hi: 'उज्जैन (चिमनगंज) मंडी',
    mandi_name_en: 'Ujjain Mandi',
    district_id: 'dist-ujjain',
    district_name_hi: 'उज्जैन',
    crop_id: 'crop-wheat',
    crop_name_hi: 'गेहूं (लोकवन/शरबती)',
    crop_name_en: 'Wheat',
    category: 'अनाज',
    date: TODAY_DATE,
    min_price: 2400,
    max_price: 2820,
    modal_price: 2620,
    prev_modal_price: 2600,
    arrival_quantity: 4300,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'उज्जैन मंडी बोर्ड',
    updated_at: LAST_UPDATE_TIME_HI
  },

  // Garlic (लहसुन)
  {
    id: 'dp-garlic-neemuch',
    mandi_id: 'mandi-neemuch',
    mandi_name_hi: 'नीमच मंडी',
    mandi_name_en: 'Neemuch Mandi',
    district_id: 'dist-neemuch',
    district_name_hi: 'नीमच',
    crop_id: 'crop-garlic',
    crop_name_hi: 'लहसुन (ऊटी/देसी/G2)',
    crop_name_en: 'Garlic',
    category: 'मसाले',
    date: TODAY_DATE,
    min_price: 7500,
    max_price: 16800,
    modal_price: 12900,
    prev_modal_price: 13200,
    arrival_quantity: 14500,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'नीमच लहसुन मंडी सेल',
    updated_at: LAST_UPDATE_TIME_HI
  },
  {
    id: 'dp-garlic-mandsaur',
    mandi_id: 'mandi-mandsaur',
    mandi_name_hi: 'मंदसौर मंडी',
    mandi_name_en: 'Mandsaur Mandi',
    district_id: 'dist-mandsaur',
    district_name_hi: 'मंदसौर',
    crop_id: 'crop-garlic',
    crop_name_hi: 'लहसुन (ऊटी/देसी/G2)',
    crop_name_en: 'Garlic',
    category: 'मसाले',
    date: TODAY_DATE,
    min_price: 7800,
    max_price: 16500,
    modal_price: 12650,
    prev_modal_price: 12900,
    arrival_quantity: 18200,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'मंदसौर लहसुन व्यापारी संघ / मंडी',
    updated_at: LAST_UPDATE_TIME_HI
  },
  {
    id: 'dp-garlic-jaora',
    mandi_id: 'mandi-jaora',
    mandi_name_hi: 'जावरा मंडी',
    mandi_name_en: 'Jaora Mandi',
    district_id: 'dist-ratlam',
    district_name_hi: 'रतलाम',
    crop_id: 'crop-garlic',
    crop_name_hi: 'लहसुन (ऊटी/देसी/G2)',
    crop_name_en: 'Garlic',
    category: 'मसाले',
    date: TODAY_DATE,
    min_price: 7200,
    max_price: 15400,
    modal_price: 12100,
    prev_modal_price: 12350,
    arrival_quantity: 6800,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'जावरा मंडी समिति',
    updated_at: LAST_UPDATE_TIME_HI
  },

  // Onion (प्याज)
  {
    id: 'dp-onion-indore',
    mandi_id: 'mandi-indore',
    mandi_name_hi: 'इंदौर (चोइथराम) मंडी',
    mandi_name_en: 'Indore Mandi',
    district_id: 'dist-indore',
    district_name_hi: 'इंदौर',
    crop_id: 'crop-onion',
    crop_name_hi: 'प्याज',
    crop_name_en: 'Onion',
    category: 'मसाले',
    date: TODAY_DATE,
    min_price: 1100,
    max_price: 2450,
    modal_price: 1850,
    prev_modal_price: 1750,
    arrival_quantity: 28000,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'इंदौर सब्जी एवं फल मंडी समिति',
    updated_at: LAST_UPDATE_TIME_HI
  },
  {
    id: 'dp-onion-shajapur',
    mandi_id: 'mandi-shajapur',
    mandi_name_hi: 'शाजापुर मंडी',
    mandi_name_en: 'Shajapur Mandi',
    district_id: 'dist-shajapur',
    district_name_hi: 'शाजापुर',
    crop_id: 'crop-onion',
    crop_name_hi: 'प्याज',
    crop_name_en: 'Onion',
    category: 'मसाले',
    date: TODAY_DATE,
    min_price: 1000,
    max_price: 2300,
    modal_price: 1720,
    prev_modal_price: 1680,
    arrival_quantity: 9200,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'शाजापुर मंडी',
    updated_at: LAST_UPDATE_TIME_HI
  },
  {
    id: 'dp-onion-neemuch',
    mandi_id: 'mandi-neemuch',
    mandi_name_hi: 'नीमच मंडी',
    mandi_name_en: 'Neemuch Mandi',
    district_id: 'dist-neemuch',
    district_name_hi: 'नीमच',
    crop_id: 'crop-onion',
    crop_name_hi: 'प्याज',
    crop_name_en: 'Onion',
    category: 'मसाले',
    date: TODAY_DATE,
    min_price: 1050,
    max_price: 2280,
    modal_price: 1760,
    prev_modal_price: 1720,
    arrival_quantity: 7500,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'नीमच मंडी',
    updated_at: LAST_UPDATE_TIME_HI
  },

  // Mustard (सरसों)
  {
    id: 'dp-mustard-morena',
    mandi_id: 'mandi-morena',
    mandi_name_hi: 'मुरैना मंडी',
    mandi_name_en: 'Morena Mandi',
    district_id: 'dist-morena',
    district_name_hi: 'मुरैना',
    crop_id: 'crop-mustard',
    crop_name_hi: 'सरसों / रायड़ा',
    crop_name_en: 'Mustard',
    category: 'तिलहन',
    date: TODAY_DATE,
    min_price: 5350,
    max_price: 6100,
    modal_price: 5850,
    prev_modal_price: 5750,
    arrival_quantity: 6200,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'मुरैना सरसों मंडी',
    updated_at: LAST_UPDATE_TIME_HI
  },
  {
    id: 'dp-mustard-mandsaur',
    mandi_id: 'mandi-mandsaur',
    mandi_name_hi: 'मंदसौर मंडी',
    mandi_name_en: 'Mandsaur Mandi',
    district_id: 'dist-mandsaur',
    district_name_hi: 'मंदसौर',
    crop_id: 'crop-mustard',
    crop_name_hi: 'सरसों / रायड़ा',
    crop_name_en: 'Mustard',
    category: 'तिलहन',
    date: TODAY_DATE,
    min_price: 5200,
    max_price: 5850,
    modal_price: 5620,
    prev_modal_price: 5560,
    arrival_quantity: 2400,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'मंदसौर मंडी समिति',
    updated_at: LAST_UPDATE_TIME_HI
  },

  // Dollar Chana (डॉलर चना)
  {
    id: 'dp-dollar-indore',
    mandi_id: 'mandi-indore',
    mandi_name_hi: 'इंदौर (चोइथराम) मंडी',
    mandi_name_en: 'Indore Mandi',
    district_id: 'dist-indore',
    district_name_hi: 'इंदौर',
    crop_id: 'crop-chana-dollar',
    crop_name_hi: 'डॉलर चना (काबुली)',
    crop_name_en: 'Dollar / Kabuli Chana',
    category: 'दलहन',
    date: TODAY_DATE,
    min_price: 9400,
    max_price: 13200,
    modal_price: 11800,
    prev_modal_price: 11600,
    arrival_quantity: 3800,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'इंदौर दाल-तिलहन मंडी',
    updated_at: LAST_UPDATE_TIME_HI
  },
  {
    id: 'dp-dollar-ujjain',
    mandi_id: 'mandi-ujjain',
    mandi_name_hi: 'उज्जैन (चिमनगंज) मंडी',
    mandi_name_en: 'Ujjain Mandi',
    district_id: 'dist-ujjain',
    district_name_hi: 'उज्जैन',
    crop_id: 'crop-chana-dollar',
    crop_name_hi: 'डॉलर चना (काबुली)',
    crop_name_en: 'Dollar / Kabuli Chana',
    category: 'दलहन',
    date: TODAY_DATE,
    min_price: 9200,
    max_price: 12800,
    modal_price: 11450,
    prev_modal_price: 11400,
    arrival_quantity: 2100,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'उज्जैन मंडी',
    updated_at: LAST_UPDATE_TIME_HI
  },

  // Desi Chana (देसी चना)
  {
    id: 'dp-desichana-sehore',
    mandi_id: 'mandi-sehore',
    mandi_name_hi: 'सीहोर मंडी',
    mandi_name_en: 'Sehore Mandi',
    district_id: 'dist-sehore',
    district_name_hi: 'सीहोर',
    crop_id: 'crop-chana-desi',
    crop_name_hi: 'देसी चना (कांटा/विशाल)',
    crop_name_en: 'Desi Chana / Gram',
    category: 'दलहन',
    date: TODAY_DATE,
    min_price: 5500,
    max_price: 6350,
    modal_price: 5950,
    prev_modal_price: 5900,
    arrival_quantity: 2700,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'सीहोर मंडी बोर्ड',
    updated_at: LAST_UPDATE_TIME_HI
  },
  {
    id: 'dp-desichana-mandsaur',
    mandi_id: 'mandi-mandsaur',
    mandi_name_hi: 'मंदसौर मंडी',
    mandi_name_en: 'Mandsaur Mandi',
    district_id: 'dist-mandsaur',
    district_name_hi: 'मंदसौर',
    crop_id: 'crop-chana-desi',
    crop_name_hi: 'देसी चना (कांटा/विशाल)',
    crop_name_en: 'Desi Chana / Gram',
    category: 'दलहन',
    date: TODAY_DATE,
    min_price: 5420,
    max_price: 6180,
    modal_price: 5880,
    prev_modal_price: 5850,
    arrival_quantity: 1900,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'मंदसौर मंडी समिति',
    updated_at: LAST_UPDATE_TIME_HI
  },

  // Coriander (धनिया)
  {
    id: 'dp-coriander-neemuch',
    mandi_id: 'mandi-neemuch',
    mandi_name_hi: 'नीमच मंडी',
    mandi_name_en: 'Neemuch Mandi',
    district_id: 'dist-neemuch',
    district_name_hi: 'नीमच',
    crop_id: 'crop-coriander',
    crop_name_hi: 'धनिया (बादामी/ईगल)',
    crop_name_en: 'Coriander Seed',
    category: 'मसाले',
    date: TODAY_DATE,
    min_price: 6400,
    max_price: 8400,
    modal_price: 7650,
    prev_modal_price: 7500,
    arrival_quantity: 3200,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'नीमच मसाला मंडी',
    updated_at: LAST_UPDATE_TIME_HI
  },

  // Isabgol (इसबगोल)
  {
    id: 'dp-isabgol-neemuch',
    mandi_id: 'mandi-neemuch',
    mandi_name_hi: 'नीमच मंडी',
    mandi_name_en: 'Neemuch Mandi',
    district_id: 'dist-neemuch',
    district_name_hi: 'नीमच',
    crop_id: 'crop-isabgol',
    crop_name_hi: 'इसबगोल',
    crop_name_en: 'Psyllium Husk / Isabgol',
    category: 'औषधीय फसलें',
    date: TODAY_DATE,
    min_price: 13500,
    max_price: 17800,
    modal_price: 15900,
    prev_modal_price: 15600,
    arrival_quantity: 1250,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'नीमच औषधीय मंडी सेल',
    updated_at: LAST_UPDATE_TIME_HI
  },

  // Ashwagandha (अश्वगंधा)
  {
    id: 'dp-ashwa-neemuch',
    mandi_id: 'mandi-neemuch',
    mandi_name_hi: 'नीमच मंडी',
    mandi_name_en: 'Neemuch Mandi',
    district_id: 'dist-neemuch',
    district_name_hi: 'नीमच',
    crop_id: 'crop-ashwagandha',
    crop_name_hi: 'अश्वगंधा (असालिया)',
    crop_name_en: 'Ashwagandha',
    category: 'औषधीय फसलें',
    date: TODAY_DATE,
    min_price: 18000,
    max_price: 36000,
    modal_price: 28500,
    prev_modal_price: 28000,
    arrival_quantity: 480,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'नीमच मंडी (आयुष प्रकोष्ठ)',
    updated_at: LAST_UPDATE_TIME_HI
  },

  // Fenugreek (मेथी)
  {
    id: 'dp-fenugreek-mandsaur',
    mandi_id: 'mandi-mandsaur',
    mandi_name_hi: 'मंदसौर मंडी',
    mandi_name_en: 'Mandsaur Mandi',
    district_id: 'dist-mandsaur',
    district_name_hi: 'मंदसौर',
    crop_id: 'crop-fenugreek',
    crop_name_hi: 'मेथी / मेथा',
    crop_name_en: 'Fenugreek Seed',
    category: 'मसाले',
    date: TODAY_DATE,
    min_price: 4900,
    max_price: 6100,
    modal_price: 5550,
    prev_modal_price: 5600,
    arrival_quantity: 1400,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'मंदसौर कृषि उपज मंडी',
    updated_at: LAST_UPDATE_TIME_HI
  },

  // Maize (मक्का)
  {
    id: 'dp-maize-chhindwara',
    mandi_id: 'mandi-chhindwara',
    mandi_name_hi: 'छिंदवाड़ा मंडी',
    mandi_name_en: 'Chhindwara Mandi',
    district_id: 'dist-chhindwara',
    district_name_hi: 'छिंदवाड़ा',
    crop_id: 'crop-maize',
    crop_name_hi: 'मक्का',
    crop_name_en: 'Maize / Corn',
    category: 'अनाज',
    date: TODAY_DATE,
    min_price: 1950,
    max_price: 2380,
    modal_price: 2220,
    prev_modal_price: 2200,
    arrival_quantity: 5800,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'छिंदवाड़ा मक्का कॉर्न सिटी मंडी',
    updated_at: LAST_UPDATE_TIME_HI
  },

  // Cotton (कपास)
  {
    id: 'dp-cotton-khargone',
    mandi_id: 'mandi-khargone',
    mandi_name_hi: 'खरगोन मंडी',
    mandi_name_en: 'Khargone Mandi',
    district_id: 'dist-khargone',
    district_name_hi: 'खरगोन (पश्चिम निमाड़)',
    crop_id: 'crop-cotton',
    crop_name_hi: 'कपास (कपास-नरमा)',
    crop_name_en: 'Cotton',
    category: 'अन्य कृषि उपज',
    date: TODAY_DATE,
    min_price: 6800,
    max_price: 7950,
    modal_price: 7480,
    prev_modal_price: 7420,
    arrival_quantity: 4200,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'खरगोन कपास मंडी',
    updated_at: LAST_UPDATE_TIME_HI
  },

  // Masoor (मसूर)
  {
    id: 'dp-masoor-vidisha',
    mandi_id: 'mandi-vidisha',
    mandi_name_hi: 'विदिशा मंडी',
    mandi_name_en: 'Vidisha Mandi',
    district_id: 'dist-vidisha',
    district_name_hi: 'विदिशा',
    crop_id: 'crop-masoor',
    crop_name_hi: 'मसूर',
    crop_name_en: 'Lentil / Masoor',
    category: 'दलहन',
    date: TODAY_DATE,
    min_price: 5800,
    max_price: 6650,
    modal_price: 6300,
    prev_modal_price: 6250,
    arrival_quantity: 2200,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'विदिशा मंडी',
    updated_at: LAST_UPDATE_TIME_HI
  },

  // Moong (मूंग)
  {
    id: 'dp-moong-harda',
    mandi_id: 'mandi-harda',
    mandi_name_hi: 'हरदा मंडी',
    mandi_name_en: 'Harda Mandi',
    district_id: 'dist-harda',
    district_name_hi: 'हरदा',
    crop_id: 'crop-moong',
    crop_name_hi: 'मूंग (ग्रीन ग्राम)',
    crop_name_en: 'Green Gram / Moong',
    category: 'दलहन',
    date: TODAY_DATE,
    min_price: 7100,
    max_price: 8450,
    modal_price: 7920,
    prev_modal_price: 7850,
    arrival_quantity: 1800,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'हरदा मंडी बोर्ड',
    updated_at: LAST_UPDATE_TIME_HI
  },

  // Paddy (धान)
  {
    id: 'dp-paddy-pipariya',
    mandi_id: 'mandi-pipariya',
    mandi_name_hi: 'पिपरिया मंडी',
    mandi_name_en: 'Pipariya Mandi',
    district_id: 'dist-narmadapuram',
    district_name_hi: 'नर्मदापुरम (होशंगाबाद)',
    crop_id: 'crop-paddy',
    crop_name_hi: 'धान (बासमती/क्रांति)',
    crop_name_en: 'Paddy / Rice',
    category: 'अनाज',
    date: TODAY_DATE,
    min_price: 3100,
    max_price: 4350,
    modal_price: 3850,
    prev_modal_price: 3800,
    arrival_quantity: 3900,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'पिपरिया बासमती धान मंडी',
    updated_at: LAST_UPDATE_TIME_HI
  },

  // Daloda Mandi (Mandsaur District Sub-mandi) prices
  {
    id: 'dp-soy-daloda',
    mandi_id: 'mandi-daloda',
    mandi_name_hi: 'दलौदा मंडी',
    mandi_name_en: 'Daloda Mandi',
    district_id: 'dist-mandsaur',
    district_name_hi: 'मंदसौर',
    crop_id: 'crop-soybean',
    crop_name_hi: 'सोयाबीन',
    crop_name_en: 'Soybean',
    category: 'तिलहन',
    date: TODAY_DATE,
    min_price: 4190,
    max_price: 4620,
    modal_price: 4480,
    prev_modal_price: 4420,
    arrival_quantity: 1600,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'दलौदा उप-मंडी',
    updated_at: LAST_UPDATE_TIME_HI
  },
  {
    id: 'dp-garlic-daloda',
    mandi_id: 'mandi-daloda',
    mandi_name_hi: 'दलौदा मंडी',
    mandi_name_en: 'Daloda Mandi',
    district_id: 'dist-mandsaur',
    district_name_hi: 'मंदसौर',
    crop_id: 'crop-garlic',
    crop_name_hi: 'लहसुन (ऊटी/देसी/G2)',
    crop_name_en: 'Garlic',
    category: 'मसाले',
    date: TODAY_DATE,
    min_price: 7400,
    max_price: 15800,
    modal_price: 12300,
    prev_modal_price: 12550,
    arrival_quantity: 4200,
    unit: 'क्विंटल',
    is_verified: true,
    source: 'दलौदा उप-मंडी',
    updated_at: LAST_UPDATE_TIME_HI
  }
];

/**
 * Historical Data Generator (produces genuine price patterns for up to 30 days)
 */
export function generateHistoryForCropAndMandi(cropId: string, mandiId: string, daysCount: number = 30): PriceHistoryRecord[] {
  // Base baseline modal prices
  const baseMap: Record<string, number> = {
    'crop-soybean': 4450,
    'crop-wheat': 2600,
    'crop-garlic': 12400,
    'crop-onion': 1750,
    'crop-mustard': 5700,
    'crop-chana-dollar': 11600,
    'crop-chana-desi': 5850,
    'crop-coriander': 7550,
    'crop-isabgol': 15700,
    'crop-ashwagandha': 28200,
    'crop-fenugreek': 5500,
    'crop-maize': 2200,
    'crop-cotton': 7450,
    'crop-masoor': 6250,
    'crop-moong': 7850,
    'crop-paddy': 3800,
  };

  const base = baseMap[cropId] || 3500;
  const history: PriceHistoryRecord[] = [];

  const today = new Date(2026, 8, 1); // Sept 1, 2026

  let currentModal = base;
  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    
    // Format YYYY-MM-DD
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;

    // Skip Sundays for realistic mandi trading days
    if (d.getDay() === 0) continue;

    // Small stochastic realistic drift
    const delta = (Math.sin(i * 0.7) * (base * 0.015)) + ((i % 3 === 0 ? 1 : -0.8) * (base * 0.008));
    const modal = Math.round(currentModal + delta);
    const min = Math.round(modal * 0.88);
    const max = Math.round(modal * 1.12);
    const arrival = Math.round(1500 + Math.abs(Math.sin(i)) * 3500);

    history.push({
      date: dateStr,
      min_price: min,
      max_price: max,
      modal_price: modal,
      arrival_quantity: arrival
    });
  }

  return history;
}
