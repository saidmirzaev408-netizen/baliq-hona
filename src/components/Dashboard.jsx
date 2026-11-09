import React from 'react';
import { formatUZS } from '../utils/formatters';
import { Icons } from './Icons';

export function Dashboard({ stats, rooms, fishList, calculateRoomStats, onNavigate, onAddRoom, onAddFish }) {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden border border-cyan-500/25">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Fish House Akvarium Boshqaruvi
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
              Xush Kelibsiz, <span className="gradient-text-cyan">Administrator!</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
              Akvarium zallari holati, baliqlar katalogi, narxlar va kunlik moliyaviy aylanmani to'liq nazorat qiling.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button 
              onClick={onAddRoom}
              className="px-5 py-3 rounded-xl gradient-btn text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/30"
            >
              <Icons.Plus /> Yangi Xona Qo'shish
            </button>
            <button 
              onClick={onAddFish}
              className="px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 font-semibold text-sm flex items-center gap-2 transition"
            >
              <Icons.Fish /> Yangi Baliq Kiritish
            </button>
          </div>
        </div>
      </div>

      {/* 6 Essential KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
        
        {/* Card 1: Total Rooms */}
        <div className="glass-panel glass-panel-hover p-5 rounded-2xl border-l-4 border-cyan-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Jami Xonalar</span>
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Icons.Rooms />
            </div>
          </div>
          <div className="mt-3">
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-white">{stats.totalRooms}</div>
            <div className="text-[11px] text-cyan-400/80 mt-1">Barcha akvarium zallari</div>
          </div>
        </div>

        {/* Card 2: Available Rooms */}
        <div className="glass-panel glass-panel-hover p-5 rounded-2xl border-l-4 border-emerald-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bo'sh Xonalar</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Icons.Check />
            </div>
          </div>
          <div className="mt-3">
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-400">{stats.availableRooms}</div>
            <div className="text-[11px] text-emerald-300/80 mt-1">Qabulga tayyor (Available)</div>
          </div>
        </div>

        {/* Card 3: Occupied Rooms */}
        <div className="glass-panel glass-panel-hover p-5 rounded-2xl border-l-4 border-rose-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Band Xonalar</span>
            <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400">
              <span className="font-bold text-sm">⛔</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-rose-400">{stats.occupiedRooms}</div>
            <div className="text-[11px] text-rose-300/80 mt-1">Baliqlar mavjud (Occupied)</div>
          </div>
        </div>

        {/* Card 4: Total Fish Count */}
        <div className="glass-panel glass-panel-hover p-5 rounded-2xl border-l-4 border-sky-400">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Jami Baliqlar</span>
            <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400">
              <Icons.Fish />
            </div>
          </div>
          <div className="mt-3">
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-white">{stats.totalFishCount}</div>
            <div className="text-[11px] text-sky-400/80 mt-1">{stats.totalSpecies} xil turdagi baliq</div>
          </div>
        </div>

        {/* Card 5: Inventory Value */}
        <div className="glass-panel glass-panel-hover p-5 rounded-2xl border-l-4 border-amber-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Ombor Qiymati</span>
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
              <Icons.Sales />
            </div>
          </div>
          <div className="mt-3">
            <div className="font-heading font-extrabold text-xl sm:text-2xl gradient-text-amber truncate" title={formatUZS(stats.totalInventoryValue)}>
              {formatUZS(stats.totalInventoryValue)}
            </div>
            <div className="text-[11px] text-amber-300/80 mt-1">Barcha baliqlar narxi</div>
          </div>
        </div>

        {/* Card 6: Daily Sales */}
        <div className="glass-panel glass-panel-hover p-5 rounded-2xl border-l-4 border-teal-400">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Kunlik Savdo</span>
            <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-400">
              <Icons.Reports />
            </div>
          </div>
          <div className="mt-3">
            <div className="font-heading font-extrabold text-xl sm:text-2xl text-teal-300 truncate" title={formatUZS(stats.totalDailySales)}>
              {formatUZS(stats.totalDailySales)}
            </div>
            <div className="text-[11px] text-teal-400/80 mt-1">Bugungi tushum</div>
          </div>
        </div>

      </div>

      {/* Quick Rooms Preview Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <span>🏢</span> Akvarium Zallari Ko'rinishi
            </h2>
            <p className="text-xs text-slate-400">Oxirgi holat va bandlik darajasi</p>
          </div>
          <button 
            onClick={() => onNavigate('rooms')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 group"
          >
            Barchasini ko'rish 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {rooms.slice(0, 4).map(room => {
            const rStats = calculateRoomStats(room);
            const isOccupied = room.status === 'OCCUPIED';

            return (
              <div 
                key={room.id}
                onClick={() => onNavigate('room-detail', room.id)}
                className="glass-panel glass-panel-hover rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Image Banner */}
                  <div className="relative h-44 overflow-hidden">
                    <img 
                      src={room.image} 
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      {isOccupied ? (
                        <span className="px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wider bg-rose-500/90 text-white shadow-lg shadow-rose-950/60 ring-2 ring-rose-400/30">
                          OCCUPIED
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wider bg-emerald-500/90 text-white shadow-lg shadow-emerald-950/60 ring-2 ring-emerald-400/30">
                          AVAILABLE
                        </span>
                      )}
                    </div>

                    {/* Room Number pill */}
                    <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
                      {room.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-heading font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                      {room.name}
                    </h3>

                    <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                      <div className="glass-card-subtle p-2 rounded-xl">
                        <span className="text-slate-400 block text-[10px]">Baliqlar soni</span>
                        <span className="font-bold text-white text-sm">{rStats.totalCount} dona</span>
                      </div>
                      <div className="glass-card-subtle p-2 rounded-xl">
                        <span className="text-slate-400 block text-[10px]">Turlari</span>
                        <span className="font-bold text-cyan-400 text-sm">{rStats.speciesCount} xil</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Xona qiymati:</span>
                      <span className="font-bold text-emerald-400">{formatUZS(rStats.totalValue)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <div className="w-full py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-semibold text-center border border-cyan-500/20 group-hover:border-cyan-400/40 transition">
                    Batafsil ko'rish
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Fish Gallery Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <span>🐟</span> Mashhur Baliq Turlari
            </h2>
            <p className="text-xs text-slate-400">Katalogdagi eng so'nggi va qimmatbaho eksponatlar</p>
          </div>
          <button 
            onClick={() => onNavigate('catalog')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 group"
          >
            Katalogga o'tish 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {fishList.slice(0, 4).map(fish => (
            <div key={fish.id} className="glass-panel glass-panel-hover rounded-2xl overflow-hidden group">
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img 
                  src={fish.image} 
                  alt={fish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-cyan-300 border border-cyan-500/30">
                  {fish.category}
                </div>
                <div className="absolute bottom-3 right-3 bg-emerald-500/90 text-white font-extrabold text-xs px-2.5 py-1 rounded-lg shadow-lg">
                  {formatUZS(fish.price)}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-heading font-bold text-base text-white">{fish.name}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">{fish.desc}</p>
                <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Mavjud zaxira:</span>
                  <span className="font-bold text-cyan-400">{fish.qty} dona</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

