import React, { useState, useMemo } from 'react';
import { formatUZS } from '../utils/formatters';
import { Icons } from './Icons';

export function FishRooms({ rooms, calculateRoomStats, onSelectRoom, onToggleStatus, onAddRoom }) {
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Akvarium <span className="gradient-text-cyan">Zallari (Fish Rooms)</span>
          </h1>
          <p className="text-sm text-slate-400">Barcha xonalarning to'liq ro'yxati va bandlik nazorati</p>
        </div>
        <button 
          onClick={onAddRoom}
          className="px-5 py-2.5 rounded-xl gradient-btn text-white font-semibold text-sm flex items-center gap-2 self-start sm:self-auto shadow-lg shadow-cyan-500/25"
        >
          <Icons.Plus /> Yangi Xona Yaratish
        </button>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'ALL', label: 'Barcha Xonalar', count: rooms.length },
            { id: 'AVAILABLE', label: 'Bo\'sh (Available)', count: rooms.filter(r => r.status === 'AVAILABLE').length, badgeColor: 'bg-emerald-500/20 text-emerald-300' },
            { id: 'OCCUPIED', label: 'Band (Occupied)', count: rooms.filter(r => r.status === 'OCCUPIED').length, badgeColor: 'bg-rose-500/20 text-rose-300' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                filter === tab.id
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-900/40'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${tab.badgeColor || 'bg-slate-700 text-slate-200'}`}>
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
            placeholder="Xona nomi yoki raqami..."
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

            return (
              <div 
                key={room.id}
                className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Cover Image */}
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img 
                      src={room.image} 
                      alt={room.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

                    {/* Room Number */}
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-cyan-500/30 text-cyan-300 font-mono font-bold text-xs">
                      {room.number}
                    </div>

                    {/* OCCUPIED / AVAILABLE Badge */}
                    <div className="absolute top-3 right-3">
                      {isOccupied ? (
                        <span className="px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wider bg-rose-600 text-white shadow-lg shadow-rose-950/80 ring-2 ring-rose-400/40">
                          OCCUPIED
                        </span>
                      ) : (
                        <span className="px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wider bg-emerald-500 text-white shadow-lg shadow-emerald-950/80 ring-2 ring-emerald-400/40">
                          AVAILABLE
                        </span>
                      )}
                    </div>

                    {/* Bottom Tag in image */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium">Sig'im: {room.capacity} ta baliq</span>
                      <span className="text-cyan-300 font-mono font-semibold">T: {room.temp}</span>
                    </div>
                  </div>

                  {/* Info Body */}
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                      {room.name}
                    </h3>

                    <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                      <div className="glass-card-subtle p-2.5 rounded-xl">
                        <span className="text-slate-400 block text-[10px]">Baliqlar soni</span>
                        <span className="font-bold text-white text-sm">{rStats.totalCount} dona</span>
                      </div>
                      <div className="glass-card-subtle p-2.5 rounded-xl">
                        <span className="text-slate-400 block text-[10px]">Turlari</span>
                        <span className="font-bold text-cyan-400 text-sm">{rStats.speciesCount} xil</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 space-y-1 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Umumiy xona qiymati:</span>
                        <span className="font-bold text-emerald-400 text-sm">{formatUZS(rStats.totalValue)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Jami savdo:</span>
                        <span className="font-semibold text-slate-300">{formatUZS(room.sales)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions footer */}
                <div className="p-5 pt-0 flex items-center gap-2">
                  <button 
                    onClick={() => onSelectRoom(room.id)}
                    className="flex-1 py-2.5 rounded-xl gradient-btn text-white text-xs font-semibold shadow-md shadow-cyan-950/40 text-center"
                  >
                    Batafsil Hisobot
                  </button>
                  <button
                    onClick={() => onToggleStatus(room.id)}
                    title="Statusni almashtirish"
                    className={`p-2.5 rounded-xl border text-xs font-bold transition ${
                      isOccupied 
                        ? 'bg-rose-500/10 text-rose-300 border-rose-500/30 hover:bg-rose-500/20' 
                        : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                    }`}
                  >
                    {isOccupied ? 'Bo\'shatish' : 'Band qilish'}
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

