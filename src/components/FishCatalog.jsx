import React, { useState, useMemo } from 'react';
import { formatUZS } from '../utils/formatters';
import { Icons } from './Icons';
import { useTranslation } from '../i18n/LanguageContext';

export function FishCatalog({ fishList, onAddFish, onEditFish, onDeleteFish, onApplyConvenientPrices }) {
  const { t } = useTranslation();
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    const set = new Set(fishList.map(f => f.category));
    return ['ALL', ...Array.from(set)];
  }, [fishList]);

  const filteredFish = useMemo(() => {
    return fishList.filter(fish => {
      if (categoryFilter !== 'ALL' && fish.category !== categoryFilter) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = fish.name.toLowerCase().includes(q);
        const matchEn = (fish.nameEn || '').toLowerCase().includes(q);
        const matchDesc = (fish.desc || '').toLowerCase().includes(q);
        return matchName || matchEn || matchDesc;
      }
      return true;
    });
  }, [fishList, categoryFilter, searchQuery]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            {t('catalog.title')}
          </h1>
          <p className="text-sm text-slate-300 mt-0.5">{t('catalog.subtitle')}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          {onApplyConvenientPrices && (
            <button
              onClick={onApplyConvenientPrices}
              className="px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition"
              title={t('catalog.syncPrices')}
            >
              <span>⚡</span> {t('catalog.syncPrices')}
            </button>
          )}
          <button
            onClick={onAddFish}
            className="px-5 py-2.5 rounded-xl gradient-btn text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25"
          >
            <Icons.Plus /> {t('catalog.addNew')}
          </button>
        </div>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${categoryFilter === cat
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
                }`}
            >
              {cat === 'ALL' ? 'Barchasi' : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[280px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Icons.Search />
          </div>
          <input
            type="text"
            placeholder={t('catalog.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-900/80 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Catalog Cards Grid */}
      {filteredFish.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center">
          <div className="text-4xl mb-3">🐠</div>
          <h3 className="font-heading font-bold text-lg text-white">Mos baliq topilmadi</h3>
          <p className="text-sm text-slate-400 mt-1">Qidiruv so'zini tekshiring yoki yangi baliq kiriting.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFish.map(fish => {
            const inStock = Number(fish.qty) > 0;

            return (
              <div
                key={fish.id}
                className="bg-slate-900/85 backdrop-blur-md rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-800/80 hover:border-slate-700 transition duration-200 shadow-sm"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <img
                      src={fish.image}
                      alt={fish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-0.5 rounded-lg text-xs font-semibold text-cyan-300 border border-slate-700">
                      {fish.category}
                    </div>

                    {/* Availability Pill */}
                    <div className="absolute top-3 right-3">
                      {inStock ? (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-emerald-300 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          <span>{fish.qty} {t('common.dona')}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-950/85 backdrop-blur-md border border-rose-500/40 text-rose-300 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                          <span>0 {t('common.dona')}</span>
                        </div>
                      )}
                    </div>

                    {/* Price Tag */}
                    <div className="absolute bottom-2.5 right-2.5">
                      <div className="bg-emerald-600 text-white px-2.5 py-1 rounded-lg shadow-sm font-mono font-bold text-xs">
                        {formatUZS(fish.price)}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-heading font-black text-lg text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {fish.name}
                    </h3>
                    <p className="text-xs text-cyan-400/90 font-medium mb-2">{fish.nameEn}</p>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {fish.desc}
                    </p>

                    <div className="grid grid-cols-2 gap-2 mt-3.5 pt-3 border-t border-slate-800 text-[11px]">
                      <div className="px-2.5 py-1 rounded-lg bg-slate-850/60 border border-slate-800 text-slate-400">
                        {t('rooms.temp')}: <span className="text-cyan-300 font-mono font-bold">{fish.temp || '24-26°C'}</span>
                      </div>
                      <div className="px-2.5 py-1 rounded-lg bg-slate-850/60 border border-slate-800 text-slate-400">
                        <span className="text-white font-medium">{fish.size || '5-10 sm'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 sm:p-5 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => onEditFish(fish)}
                    className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700/60 flex items-center justify-center gap-1.5 transition"
                  >
                    <Icons.Edit /> {t('common.edit')}
                  </button>
                  <button
                    onClick={() => onDeleteFish(fish.id)}
                    className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition"
                    title={t('common.delete')}
                  >
                    <Icons.Trash />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}

