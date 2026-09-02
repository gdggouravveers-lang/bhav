import React from 'react';
import { Wheat, Droplets, Flame, Salad, Sparkles, Layers, Boxes, ArrowRight } from 'lucide-react';
import { CropCategory, Crop } from '../types';
import { mandiStore } from '../lib/mandiStore';

interface CropCategoriesProps {
  onSelectCrop: (cropSlug: string) => void;
  onSelectCategoryFilter?: (cat: string) => void;
}

export const CropCategories: React.FC<CropCategoriesProps> = ({
  onSelectCrop
}) => {
  const allCrops = mandiStore.getCrops();

  const categoryGroups: {
    name: CropCategory;
    title: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    { name: 'तिलहन', title: 'तिलहन फसलें', icon: <Droplets className="w-5 h-5" />, color: 'bg-amber-500 text-white' },
    { name: 'अनाज', title: 'अनाज (खाद्यान्न)', icon: <Wheat className="w-5 h-5" />, color: 'bg-emerald-600 text-white' },
    { name: 'मसाले', title: 'मसाले एवं कंद', icon: <Flame className="w-5 h-5" />, color: 'bg-red-500 text-white' },
    { name: 'दलहन', title: 'दलहन फसलें', icon: <Boxes className="w-5 h-5" />, color: 'bg-orange-500 text-white' },
    { name: 'औषधीय फसलें', title: 'औषधीय उपज', icon: <Sparkles className="w-5 h-5" />, color: 'bg-purple-600 text-white' },
    { name: 'सब्जियां', title: 'सब्जियां', icon: <Salad className="w-5 h-5" />, color: 'bg-lime-600 text-white' },
    { name: 'अन्य कृषि उपज', title: 'व्यावसायिक उपज', icon: <Layers className="w-5 h-5" />, color: 'bg-blue-600 text-white' },
  ];

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-6 pb-4 border-b border-slate-200">
        <div className="flex items-center space-x-2 text-[#065F46] text-xs font-bold uppercase tracking-wider mb-1">
          <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
          <span>फसल श्रेणियां</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          फसल अनुसार मंडी भाव देखें
        </h2>
        <p className="text-slate-600 text-sm mt-0.5">
          अपनी मनपसंद कृषि उपज का चयन करें और मध्य प्रदेश की सभी मंडियों के ताज़ा भाव जानें
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categoryGroups.map((grp) => {
          const cropsInGroup = allCrops.filter(c => c.category === grp.name);
          return (
            <div 
              key={grp.name}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-[#10B981] transition-all p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${grp.color} flex items-center justify-center shadow-xs`}>
                    {grp.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{grp.title}</h3>
                    <span className="text-xs text-slate-500 font-medium">{cropsInGroup.length} प्रमुख फसलें</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {cropsInGroup.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => onSelectCrop(c.slug)}
                      className="bg-slate-100 hover:bg-emerald-50 hover:text-[#065F46] text-slate-700 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer border border-slate-200 hover:border-emerald-300"
                    >
                      {c.name_hi}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
