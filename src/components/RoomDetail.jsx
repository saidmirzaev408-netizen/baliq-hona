import React from 'react';
import { formatUZS } from '../utils/formatters';
import { Icons } from './Icons';

export function RoomDetail({ 
  roomId, 
  rooms, 
  fishList, 
  calculateRoomStats, 
  onBack, 
  onToggleStatus,
  onOpenAssign,
  onOpenSale,
  onRemoveFish,
  onUpdateQty,
  onEditRoom,
  onDeleteRoom
}) {
  const room = rooms.find(r => r.id === roomId);

  if (!room) {
    return (
      <div className="glass-panel p-12 rounded-3xl text-center">
        <h2 className="text-xl font-bold text-white mb-4">Xona topilmadi</h2>
        <button onClick={onBack} className="px-5 py-2.5 rounded-xl gradient-btn text-white text-sm font-semibold">
          Xonalar ro'yxatiga qaytish
        </button>
      </div>
    );
  }

  const rStats = calculateRoomStats(room);
  const isOccupied = room.status === 'OCCUPIED';

  // Detailed fish items inside room
  const roomFishItems = (room.fish || []).map(item => {
    const fishData = fishList.find(f => f.id === item.fishId);
    const subtotal = fishData ? (Number(item.qty) * Number(fishData.price)) : 0;
    return {
      ...item,
      data: fishData,
      subtotal
    };
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Bar Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button 
          onClick={onBack}
          className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-cyan-300 font-semibold text-xs sm:text-sm flex items-center gap-2 border border-slate-700 transition"
        >
          <Icons.ArrowLeft /> Xonalar Ro'yxatiga Qaytish
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onToggleStatus(room.id)}
            className={`px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm border transition ${
              isOccupied
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
            }`}
          >
            Status: {isOccupied ? 'OCCUPIED (Bo\'shatish)' : 'AVAILABLE (Band qilish)'}
          </button>

          <button
            onClick={() => onEditRoom(room)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 flex items-center gap-1.5 transition"
          >
            <Icons.Edit /> Tahrirlash
          </button>

          <button
            onClick={() => onDeleteRoom(room.id)}
            className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs sm:text-sm font-semibold border border-rose-500/30 flex items-center gap-1.5 transition"
          >
            <Icons.Trash /> O'chirish
          </button>
        </div>
      </div>

      {/* Large Hero Banner */}
      <div className="glass-panel rounded-3xl overflow-hidden relative border border-cyan-500/30">
        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-slate-900">
          <img 
            src={room.image} 
            alt={room.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

          {/* Status and Room Number Overlay */}
          <div className="absolute top-6 left-6 flex items-center gap-3">
            <span className="px-4 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md text-cyan-300 font-mono font-extrabold text-sm sm:text-base border border-cyan-500/40">
              {room.number}
            </span>
            {isOccupied ? (
              <span className="px-4 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold tracking-wider bg-rose-600 text-white shadow-xl shadow-rose-950/80 ring-2 ring-rose-400/40">
                OCCUPIED
              </span>
            ) : (
              <span className="px-4 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold tracking-wider bg-emerald-500 text-white shadow-xl shadow-emerald-950/80 ring-2 ring-emerald-400/40">
                AVAILABLE
              </span>
            )}
          </div>

          {/* Title & Info on bottom */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-heading font-black text-2xl sm:text-4xl text-white tracking-tight">
                {room.name}
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
                {room.notes || "Ushbu zal uchun maxsus texnik eslatmalar kiritilmagan."}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-950/70 backdrop-blur-md p-3 rounded-2xl border border-cyan-500/20 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Harorat</span>
                <span className="font-mono font-bold text-cyan-300">{room.temp || "25.0°C"}</span>
              </div>
              <div className="w-px h-6 bg-slate-700"></div>
              <div>
                <span className="text-slate-400 block text-[10px]">Suv pH</span>
                <span className="font-mono font-bold text-cyan-300">{room.ph || "7.2"}</span>
              </div>
              <div className="w-px h-6 bg-slate-700"></div>
              <div>
                <span className="text-slate-400 block text-[10px]">Maks. Sig'im</span>
                <span className="font-bold text-white">{room.capacity} dona</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CRITICAL SECTION: TOTAL ROOM SUMMARY (UMUMIY HISOBOT) */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-cyan-500/40 shadow-2xl shadow-cyan-950/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-cyan-500/20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-1">
              Umumiy Hisobot
            </div>
            <h2 className="font-heading font-black text-xl sm:text-2xl text-white">
              Xonaning To'liq Moliyaviy va Moddiy Xulosasi
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-cyan-300 font-semibold text-xs sm:text-sm flex items-center gap-2 border border-slate-700 transition"
              title="Hisobotni printerdan chiqarish yoki PDF saqlash"
            >
              <span>🖨️</span> Chop Etish (Print)
            </button>
            <button
              onClick={onOpenAssign}
              className="px-4 py-2.5 rounded-xl gradient-btn text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Icons.Plus /> Xonaga Baliq Qo'shish
            </button>
            <button
              onClick={onOpenSale}
              className="px-4 py-2.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-950/40"
            >
              <Icons.Sales /> Savdo Kiritish
            </button>
          </div>
        </div>

        {/* Metric Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
          
          <div className="glass-card-subtle p-4 rounded-2xl border border-cyan-500/20">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Jami Baliqlar Soni</span>
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-2">
              {rStats.totalCount} <span className="text-sm font-normal text-slate-400">dona</span>
            </div>
            <div className="text-[11px] text-cyan-400 mt-1">Hozirda zalda mavjud</div>
          </div>

          <div className="glass-card-subtle p-4 rounded-2xl border border-cyan-500/20">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Baliq Turlari</span>
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-cyan-400 mt-2">
              {rStats.speciesCount} <span className="text-sm font-normal text-slate-400">xil tur</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Har xil biologik turlar</div>
          </div>

          <div className="glass-card-subtle p-4 rounded-2xl border border-emerald-500/30">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Xonadagi Baliqlar Qiymati</span>
            <div className="font-heading font-extrabold text-xl sm:text-2xl text-emerald-400 mt-2 truncate" title={formatUZS(rStats.totalValue)}>
              {formatUZS(rStats.totalValue)}
            </div>
            <div className="text-[11px] text-emerald-300/80 mt-1">Jami zaxira aktivlari</div>
          </div>

          <div className="glass-card-subtle p-4 rounded-2xl border border-amber-500/30">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Xonadan Jami Savdo</span>
            <div className="font-heading font-extrabold text-xl sm:text-2xl gradient-text-amber mt-2 truncate" title={formatUZS(rStats.sales)}>
              {formatUZS(rStats.sales)}
            </div>
            <div className="text-[11px] text-amber-300/80 mt-1">Jami olingan daromad</div>
          </div>

          <div className="glass-card-subtle p-4 rounded-2xl border border-slate-700">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bandlik Holati</span>
            <div className="mt-2">
              {isOccupied ? (
                <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  BAND (Occupied)
                </span>
              ) : (
                <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  BO'SH (Available)
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-400 mt-2">Sig'im bandligi: {Math.round((rStats.totalCount / (room.capacity || 1)) * 100)}%</div>
          </div>

        </div>
      </div>

      {/* List of Fish in Room */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <span>🐠</span> Zaldagi Baliqlar Ro'yxati
            </h3>
            <p className="text-xs text-slate-400">Ushbu akvarium xonasida boqilayotgan barcha baliq turlari</p>
          </div>

          <button
            onClick={onOpenAssign}
            className="px-4 py-2 rounded-xl gradient-btn text-white text-xs font-semibold flex items-center gap-1.5"
          >
            <Icons.Plus /> Yangi Baliq Biriktirish
          </button>
        </div>

        {roomFishItems.length === 0 ? (
          <div className="text-center py-12 glass-card-subtle rounded-2xl">
            <div className="text-4xl mb-3">🌊</div>
            <h4 className="font-heading font-bold text-white text-base">Bu xonada hali baliq yo'q</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto mb-4">
              Xona hozirda bo'sh holatda. Yuqoridagi tugma orqali katalogdan baliqlarni ushbu xonaga joylashtiring.
            </p>
            <button
              onClick={onOpenAssign}
              className="px-5 py-2.5 rounded-xl gradient-btn text-white text-xs font-semibold"
            >
              Baliq Biriktirish
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pl-2">Baliq</th>
                  <th className="pb-3">Kategoriya</th>
                  <th className="pb-3 text-right">Dona Narxi</th>
                  <th className="pb-3 text-center">Xonadagi Miqdori</th>
                  <th className="pb-3 text-right">Jami Summa</th>
                  <th className="pb-3 text-right pr-2">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {roomFishItems.map(item => {
                  if (!item.data) return null;
                  return (
                    <tr key={item.fishId} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 pl-2">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.data.image} 
                            alt={item.data.name} 
                            className="w-12 h-12 rounded-xl object-cover border border-cyan-500/20"
                          />
                          <div>
                            <div className="font-heading font-bold text-white">{item.data.name}</div>
                            <div className="text-xs text-slate-400">{item.data.nameEn}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="px-2.5 py-1 rounded-lg text-xs bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-medium">
                          {item.data.category}
                        </span>
                      </td>
                      <td className="py-4 text-right font-mono font-medium text-slate-200">
                        {formatUZS(item.data.price)}
                      </td>
                      <td className="py-4 text-center">
                        <div className="inline-flex items-center gap-2 bg-slate-900/80 px-2 py-1 rounded-xl border border-slate-700">
                          <button
                            onClick={() => onUpdateQty(room.id, item.fishId, item.qty - 1)}
                            className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                          >
                            -
                          </button>
                          <span className="font-bold text-cyan-300 px-2 min-w-[32px] text-center">{item.qty}</span>
                          <button
                            onClick={() => onUpdateQty(room.id, item.fishId, item.qty + 1)}
                            className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 text-right font-mono font-bold text-emerald-400">
                        {formatUZS(item.subtotal)}
                      </td>
                      <td className="py-4 text-right pr-2">
                        <button
                          onClick={() => onRemoveFish(room.id, item.fishId)}
                          title="Xonadan chiqarish"
                          className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition"
                        >
                          <Icons.Trash />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-cyan-500/30 font-bold text-white">
                  <td colSpan="3" className="pt-4 pl-2 text-right">Jami Xulosa:</td>
                  <td className="pt-4 text-center text-cyan-400">{rStats.totalCount} dona</td>
                  <td className="pt-4 text-right text-emerald-400 font-mono text-base">{formatUZS(rStats.totalValue)}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

