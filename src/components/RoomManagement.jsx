import React from 'react';
import { formatUZS } from '../utils/formatters';
import { Icons } from './Icons';

export function RoomManagement({ 
  rooms, 
  calculateRoomStats, 
  onAddRoom, 
  onEditRoom, 
  onDeleteRoom, 
  onToggleStatus, 
  onSelectRoom,
  onAssignFish 
}) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Xonalar <span className="gradient-text-cyan">Boshqaruvi (Management)</span>
          </h1>
          <p className="text-sm text-slate-400">Xonalarni tahrirlash, o'chirish, statusini o'zgartirish va baliqlar taqsimoti</p>
        </div>
        <button 
          onClick={onAddRoom}
          className="px-5 py-2.5 rounded-xl gradient-btn text-white font-semibold text-sm flex items-center gap-2 self-start sm:self-auto shadow-lg shadow-cyan-500/25"
        >
          <Icons.Plus /> Yangi Xona Yaratish
        </button>
      </div>

      {/* Rooms Table */}
      <div className="glass-panel rounded-3xl overflow-hidden p-6 sm:p-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                <th className="pb-4 pl-2">Xona Nomi & Raqami</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-center">Baliq Soni</th>
                <th className="pb-4 text-center">Turlar</th>
                <th className="pb-4 text-right">Xona Qiymati</th>
                <th className="pb-4 text-right">Savdo</th>
                <th className="pb-4 text-right pr-2">Boshqaruv</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {rooms.map(room => {
                const rStats = calculateRoomStats(room);
                const isOccupied = room.status === 'OCCUPIED';

                return (
                  <tr key={room.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 pl-2">
                      <div className="flex items-center gap-3">
                        <img 
                          src={room.image} 
                          alt={room.name} 
                          className="w-14 h-14 rounded-xl object-cover border border-cyan-500/20"
                        />
                        <div>
                          <div 
                            className="font-heading font-bold text-white text-base hover:text-cyan-300 cursor-pointer" 
                            onClick={() => onSelectRoom(room.id)}
                          >
                            {room.name}
                          </div>
                          <span className="font-mono text-xs text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                            {room.number}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4">
                      <button
                        onClick={() => onToggleStatus(room.id)}
                        className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wider border transition ${
                          isOccupied
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                        }`}
                      >
                        {isOccupied ? 'OCCUPIED' : 'AVAILABLE'}
                      </button>
                    </td>

                    <td className="py-4 text-center font-bold text-white">
                      {rStats.totalCount} dona
                    </td>

                    <td className="py-4 text-center font-bold text-cyan-400">
                      {rStats.speciesCount} xil
                    </td>

                    <td className="py-4 text-right font-mono font-bold text-emerald-400">
                      {formatUZS(rStats.totalValue)}
                    </td>

                    <td className="py-4 text-right font-mono font-semibold text-slate-300">
                      {formatUZS(room.sales)}
                    </td>

                    <td className="py-4 text-right pr-2">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onAssignFish(room.id)}
                          title="Baliq qo'shish"
                          className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition"
                        >
                          + Baliq
                        </button>
                        <button
                          onClick={() => onSelectRoom(room.id)}
                          title="Batafsil ko'rish"
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                        >
                          👁️
                        </button>
                        <button
                          onClick={() => onEditRoom(room)}
                          title="Tahrirlash"
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition"
                        >
                          <Icons.Edit />
                        </button>
                        <button
                          onClick={() => onDeleteRoom(room.id)}
                          title="O'chirish"
                          className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition"
                        >
                          <Icons.Trash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

