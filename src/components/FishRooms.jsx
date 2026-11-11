import React, { useState, useMemo } from 'react';
import { formatUZS } from '../utils/formatters';
import { Icons } from './Icons';
import { useTranslation } from '../i18n/LanguageContext';

export function FishRooms({ rooms, calculateRoomStats, onSelectRoom, onToggleStatus, onAddRoom, onSyncAccurateData }) {
  const { t, tRoom } = useTranslation();
  const [filter, setFilter] = useState('ALL'); // ALL, AVAILABLE, OCCUPIED
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      // Status filter
      if (filter !== 'ALL' && room.status !== filter) return false;
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = room.name.toLowerCase().includes(q);
        const matchNum = room.number.toLowerCase().includes(q);
        return matchName || matchNum;
      }
      return true;
    });
  }, [rooms, filter, searchQuery]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900/85 backdrop-blur-md rounded-2xl p-5 border border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white">
            {t('rooms.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">{t('rooms.subtitle')}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          {onSyncAccurateData && (
            <button
              onClick={onSyncAccurateData}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-emerald-400 border border-slate-700 font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition"
              title={t('rooms.syncBtn')}
            >
              <span>⚡</span> {t('rooms.syncBtn')}
            </button>
          )}
          <button
            onClick={onAddRoom}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition shadow-sm"
          >
            <Icons.Plus /> {t('rooms.createNew')}
          </button>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-slate-900/85 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-slate-800 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'ALL', label: t('rooms.allRooms'), count: rooms.length },
            { id: 'AVAILABLE', label: t('rooms.availableOnly'), count: rooms.filter(r => r.status === 'AVAILABLE').length, badgeColor: 'bg-emerald-500/10 text-emerald-400' },
            { id: 'OCCUPIED', label: t('rooms.occupiedOnly'), count: rooms.filter(r => r.status === 'OCCUPIED').length, badgeColor: 'bg-rose-500/10 text-rose-400' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                filter === tab.id
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${tab.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Icons.Search />
          </div>
          <input
            type="text"
            placeholder={t('rooms.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-900/80 border border-slate-700/80 focus:border-cyan-400 focus:outline-none transition text-white"
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

      {/* Rooms Grid */}
      {filteredRooms.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="font-heading font-bold text-lg text-white">Hech qanday xona topilmadi</h3>
          <p className="text-sm text-slate-400 mt-1">Qidiruv mezonlarini o'zgartirib ko'ring yoki yangi xona qo'shing.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRooms.map(room => {
            const rStats = calculateRoomStats(room);
            const isOccupied = room.status === 'OCCUPIED';
            const capacity = room.capacity || 100;
            const occupancyPct = Math.min(100, Math.round((rStats.totalCount / capacity) * 100));

            return (
              <div
                key={room.id}
                className="bg-slate-900/85 backdrop-blur-md rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-800/80 hover:border-slate-700 transition duration-200 shadow-sm"
              >
                <div>
                  {/* Cover Image Banner */}
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

                    {/* Room Code Pill */}
                    <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-slate-700 text-cyan-300 font-mono font-bold text-xs">
                      {room.number}
                    </div>

                    {/* Status Pill — Clean human SaaS aesthetic */}
                    <div className="absolute top-3 right-3">
                      {isOccupied ? (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-950/85 backdrop-blur-md border border-rose-500/40 text-rose-300 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                          <span>{t('common.occupied')}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-emerald-300 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          <span>{t('common.available')}</span>
                        </div>
                      )}
                    </div>

                    {/* Floating Sensor Badges (Temp & pH) */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2 bg-slate-950/85 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-slate-700 text-slate-300 font-mono">
                        <span>🌡️ <strong className="text-cyan-300">{room.temp}</strong></span>
                        <span className="text-slate-600">|</span>
                        <span>💧 pH <strong className="text-cyan-300">{room.ph || '7.2'}</strong></span>
                      </div>

                      <span className="bg-slate-950/85 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-slate-700 text-slate-300 font-medium">
                        {t('rooms.capacity')}: <strong className="text-white">{room.capacity}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <h3 className="font-heading font-black text-lg text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {tRoom(room.name)}
                    </h3>

                    {/* Occupancy Progress Bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[11px] mb-1.5 text-slate-400">
                        <span>{t('rooms.roomFullness')}:</span>
                        <span className="font-mono font-bold text-cyan-300">{occupancyPct}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${occupancyPct > 80
                              ? 'bg-gradient-to-r from-amber-500 to-rose-500'
                              : 'bg-gradient-to-r from-cyan-500 to-emerald-400'
                            }`}
                          style={{ width: `${occupancyPct}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-2 mt-3.5 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-850/60 border border-slate-800 flex items-center gap-2">
                        <span>🐠</span>
                        <div>
                          <span className="text-slate-400 block text-[10px]">{t('dashboard.fishCount')}</span>
                          <span className="font-bold text-white text-xs">{rStats.totalCount} {t('common.dona')}</span>
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-850/60 border border-slate-800 flex items-center gap-2">
                        <span>🧬</span>
                        <div>
                          <span className="text-slate-400 block text-[10px]">{t('dashboard.speciesCount')}</span>
                          <span className="font-bold text-cyan-300 text-xs">{rStats.speciesCount} {t('common.xil')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="mt-3.5 pt-3 border-t border-slate-800 space-y-1.5 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">{t('rooms.roomValue')}:</span>
                        <span className="font-mono font-bold text-emerald-400 text-xs">{formatUZS(rStats.totalValue)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">{t('rooms.salesTotal')}:</span>
                        <span className="font-mono font-bold text-amber-300 text-xs">{formatUZS(room.sales)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="p-4 sm:p-5 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => onSelectRoom(room.id)}
                    className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    <span>{t('rooms.detailedReport')}</span>
                    <span>→</span>
                  </button>
                  <button
                    onClick={() => onToggleStatus(room.id)}
                    title={isOccupied ? t('rooms.freeRoom') : t('rooms.occupyRoom')}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition border ${
                      isOccupied
                        ? 'bg-rose-500/10 text-rose-300 border-rose-500/30 hover:bg-rose-500/20'
                        : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                    }`}
                  >
                    {isOccupied ? t('rooms.freeRoom') : t('rooms.occupyRoom')}
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

