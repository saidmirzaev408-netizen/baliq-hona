import React from 'react';
import { formatUZS } from '../utils/formatters';
import { Icons } from './Icons';
import { useTranslation } from '../i18n/LanguageContext';

export function Dashboard({ stats, rooms, fishList, calculateRoomStats, onNavigate, onAddRoom, onAddFish }) {
  const { t, tRoom } = useTranslation();

  return (
    <div className="space-y-7 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-slate-900/85 backdrop-blur-md p-6 sm:p-7 rounded-2xl border border-slate-800 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-semibold mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              {t('dashboard.badge')}
            </div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-tight">
              {t('dashboard.welcome')}, <span className="text-cyan-400">Administrator</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              {t('dashboard.welcomeSubtitle')}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={onAddRoom}
              className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition shadow-sm"
            >
              <Icons.Plus /> {t('dashboard.addRoom')}
            </button>
            <button
              onClick={onAddFish}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm flex items-center gap-2 transition"
            >
              <Icons.Fish /> {t('dashboard.addFish')}
            </button>
          </div>
        </div>
      </div>

      {/* 6 Clean Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">

        {/* Card 1: Total Rooms */}
        <div className="bg-slate-900/85 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{t('dashboard.totalRooms')}</span>
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 text-sm">
              <Icons.Rooms />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="font-heading font-bold text-2xl sm:text-3xl text-white">{stats.totalRooms}</div>
            <div className="text-[11px] text-slate-400 mt-1">{t('dashboard.totalRoomsSub')}</div>
          </div>
        </div>

        {/* Card 2: Available Rooms */}
        <div className="bg-slate-900/85 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{t('dashboard.availableRooms')}</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-sm">
              <Icons.Check />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="font-heading font-bold text-2xl sm:text-3xl text-emerald-400">{stats.availableRooms}</div>
            <div className="text-[11px] text-emerald-400/90 mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> {t('dashboard.availableRoomsSub')}
            </div>
          </div>
        </div>

        {/* Card 3: Occupied Rooms */}
        <div className="bg-slate-900/85 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{t('dashboard.occupiedRooms')}</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400 text-sm">
              <span className="text-xs">⛔</span>
            </div>
          </div>
          <div className="mt-2.5">
            <div className="font-heading font-bold text-2xl sm:text-3xl text-rose-400">{stats.occupiedRooms}</div>
            <div className="text-[11px] text-rose-400/90 mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span> {t('dashboard.occupiedRoomsSub')}
            </div>
          </div>
        </div>

        {/* Card 4: Total Fish Count */}
        <div className="bg-slate-900/85 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{t('dashboard.totalFish')}</span>
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sky-400 text-sm">
              <Icons.Fish />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="font-heading font-bold text-2xl sm:text-3xl text-white">{stats.totalFishCount}</div>
            <div className="text-[11px] text-slate-400 mt-1">{stats.totalSpecies} {t('dashboard.totalFishSub')}</div>
          </div>
        </div>

        {/* Card 5: Inventory Value */}
        <div className="bg-slate-900/85 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{t('dashboard.inventoryValue')}</span>
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400 text-sm">
              <Icons.Sales />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="font-heading font-bold text-base sm:text-lg text-amber-300 font-mono tracking-tight" title={formatUZS(stats.totalInventoryValue)}>
              {formatUZS(stats.totalInventoryValue)}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">{t('dashboard.inventoryValueSub')}</div>
          </div>
        </div>

        {/* Card 6: Daily Sales */}
        <div className="bg-slate-900/85 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{t('dashboard.dailySales')}</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-sm">
              <Icons.Reports />
            </div>
          </div>
          <div className="mt-2.5">
            <div className="font-heading font-bold text-base sm:text-lg text-emerald-300 font-mono tracking-tight" title={formatUZS(stats.totalDailySales)}>
              {formatUZS(stats.totalDailySales)}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">{t('dashboard.dailySalesSub')}</div>
          </div>
        </div>

      </div>

      {/* Clean Rooms Preview Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h2 className="font-heading font-bold text-lg sm:text-xl text-white">
              {t('dashboard.roomsTitle')}
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-cyan-300 border border-slate-700">
              {rooms.length} {t('common.dona')}
            </span>
          </div>

          <button
            onClick={() => onNavigate('rooms')}
            className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition"
          >
            <span>{t('common.viewAll')}</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
          {rooms.slice(0, 4).map(room => {
            const rStats = calculateRoomStats(room);
            const isOccupied = room.status === 'OCCUPIED';
            const capacity = room.capacity || 100;
            const occupancyPct = Math.min(100, Math.round((rStats.totalCount / capacity) * 100));

            return (
              <div
                key={room.id}
                onClick={() => onNavigate('room-detail', room.id)}
                className="bg-slate-900/85 backdrop-blur-md rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between border border-slate-800/80 hover:border-slate-700 transition duration-200 shadow-sm"
              >
                <div>
                  {/* Image Banner */}
                  <div className="relative h-44 overflow-hidden bg-slate-950">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                    {/* Status Badge — Human, non-AI minimal pill */}
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

                    {/* Room Code pill */}
                    <div className="absolute bottom-2.5 left-2.5 bg-slate-950/85 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-slate-700 text-cyan-300 text-xs font-mono font-bold">
                      {room.number}
                    </div>

                    {/* Temperature Pill */}
                    <div className="absolute bottom-2.5 right-2.5 bg-slate-950/85 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-slate-700 text-slate-300 text-[11px] font-mono font-medium">
                      🌡️ {room.temperature || '26.0'}°C
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5">
                    <h3 className="font-heading font-bold text-base text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {tRoom ? tRoom(room.name) : room.name}
                    </h3>

                    {/* Occupancy bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span>{t('dashboard.occupancy')}: {rStats.totalCount}/{capacity}</span>
                        <span className="font-mono text-slate-300">{occupancyPct}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${occupancyPct > 80 ? 'bg-rose-500' : 'bg-cyan-500'
                            }`}
                          style={{ width: `${occupancyPct}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-3.5 text-xs">
                      <div className="p-2 rounded-xl bg-slate-850/60 border border-slate-800 flex items-center gap-2">
                        <span>🐠</span>
                        <div>
                          <span className="text-slate-400 block text-[10px]">{t('dashboard.fishCount')}</span>
                          <span className="font-bold text-white text-xs">{rStats.totalCount} {t('common.dona')}</span>
                        </div>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-850/60 border border-slate-800 flex items-center gap-2">
                        <span>🧬</span>
                        <div>
                          <span className="text-slate-400 block text-[10px]">{t('dashboard.speciesCount')}</span>
                          <span className="font-bold text-cyan-300 text-xs">{rStats.speciesCount} {t('common.xil')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3.5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-400">{t('dashboard.roomValue')}:</span>
                      <span className="font-mono font-bold text-emerald-400 text-xs">{formatUZS(rStats.totalValue)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5 pt-0">
                  <div className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition">
                    <span>{t('dashboard.detailReport')}</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clean Fish Gallery Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h2 className="font-heading font-bold text-lg sm:text-xl text-white">
              {t('dashboard.featuredFish')}
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-sky-300 border border-slate-700">
              {fishList.length} {t('common.xil')}
            </span>
          </div>

          <button
            onClick={() => onNavigate('catalog')}
            className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition"
          >
            <span>{t('dashboard.toCatalog')}</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {fishList.slice(0, 4).map(fish => (
            <div
              key={fish.id}
              onClick={() => onNavigate('catalog')}
              className="bg-slate-900/85 backdrop-blur-md rounded-2xl overflow-hidden group cursor-pointer border border-slate-800/80 hover:border-slate-700 transition flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-950">
                  <img
                    src={fish.image}
                    alt={fish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  <div className="absolute top-2.5 left-2.5 bg-slate-950/85 backdrop-blur-md px-2.5 py-0.5 rounded-lg text-xs font-semibold text-cyan-300 border border-slate-700">
                    {fish.category}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-emerald-600 text-white font-mono font-bold text-xs px-2.5 py-1 rounded-lg shadow-sm">
                    {formatUZS(fish.price)}
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="font-heading font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                    {fish.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {fish.desc}
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 pt-0">
                <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{t('dashboard.inStock')}:</span>
                  <span className="font-mono font-bold text-slate-200">
                    {fish.qty} {t('common.dona')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

