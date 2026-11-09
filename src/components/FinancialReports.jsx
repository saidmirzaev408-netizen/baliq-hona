import React from 'react';
import { formatUZS } from '../utils/formatters';

export function FinancialReports({ rooms, stats, calculateRoomStats, onSelectRoom }) {
  const roomReports = rooms.map(room => {
    const rStats = calculateRoomStats(room);
    const shareOfSales = stats.totalSales > 0 ? ((room.sales / stats.totalSales) * 100).toFixed(1) : 0;
    return {
      room,
      ...rStats,
      shareOfSales
    };
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
          Moliyaviy <span className="gradient-text-cyan">Hisobotlar (Financial Reports)</span>
        </h1>
        <p className="text-sm text-slate-400">Kompaniya aktivlari, ombor baholanishi, savdo va xonalar bo'yicha daromad tahlili</p>
      </div>

      {/* Top Big KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-cyan-400">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Jami Baliq Zaxirasi Qiymati</span>
          <div className="font-heading font-extrabold text-2xl text-white mt-2">
            {formatUZS(stats.totalInventoryValue)}
          </div>
          <p className="text-xs text-cyan-400 mt-1">{stats.totalFishCount} dona baliqning tannarxi</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-l-4 border-emerald-500">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Umumiy Savdo (Kassa)</span>
          <div className="font-heading font-extrabold text-2xl text-emerald-400 mt-2">
            {formatUZS(stats.totalSales)}
          </div>
          <p className="text-xs text-emerald-300 mt-1">Akvarium zallaridan to'plangan jami summa</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-l-4 border-teal-400">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Kunlik O'rtacha Aylanma</span>
          <div className="font-heading font-extrabold text-2xl text-teal-300 mt-2">
            {formatUZS(stats.totalDailySales)}
          </div>
          <p className="text-xs text-teal-400 mt-1">Bugungi kun hisobiga yozilgan mablag'</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-l-4 border-amber-400">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Oylik Taxminiy Prognoz</span>
          <div className="font-heading font-extrabold text-2xl gradient-text-amber mt-2">
            {formatUZS(stats.totalSales * 1.35)}
          </div>
          <p className="text-xs text-amber-300 mt-1">+35% mavsumiy o'sish hisobi bilan</p>
        </div>
      </div>

      {/* Room-by-Room Financial Breakdown Table */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <span>📑</span> Xonalar Bo'yicha Moliyaviy Jadval
            </h2>
            <p className="text-xs text-slate-400">Har bir zaldagi baliqlar qiymati, savdo va umumiy hissadagi ulushi</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                <th className="pb-4 pl-2">Xona & Raqami</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-center">Baliqlar</th>
                <th className="pb-4 text-right">Zal Baliq Qiymati</th>
                <th className="pb-4 text-right">Zal Savdosi</th>
                <th className="pb-4 text-right pr-2">Savdodagi Ulush (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {roomReports.map(({ room, totalCount, totalValue, sales, shareOfSales }) => (
                <tr key={room.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 pl-2">
                    <div 
                      className="font-heading font-bold text-white hover:text-cyan-300 cursor-pointer"
                      onClick={() => onSelectRoom(room.id)}
                    >
                      {room.name}
                    </div>
                    <span className="font-mono text-xs text-cyan-400">{room.number}</span>
                  </td>

                  <td className="py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      room.status === 'OCCUPIED' ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {room.status}
                    </span>
                  </td>

                  <td className="py-4 text-center font-bold text-white">
                    {totalCount} dona
                  </td>

                  <td className="py-4 text-right font-mono font-bold text-emerald-400">
                    {formatUZS(totalValue)}
                  </td>

                  <td className="py-4 text-right font-mono font-bold text-white">
                    {formatUZS(sales)}
                  </td>

                  <td className="py-4 text-right pr-2">
                    <div className="flex items-center justify-end gap-2">
                      <span className="font-mono font-bold text-cyan-400">{shareOfSales}%</span>
                      <div className="w-16 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-cyan-400 h-full rounded-full" 
                          style={{ width: `${Math.min(Number(shareOfSales), 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-cyan-500/30 font-bold text-white text-sm">
                <td colSpan="2" className="pt-4 pl-2 text-right">Jami:</td>
                <td className="pt-4 text-center text-cyan-400">
                  {roomReports.reduce((acc, r) => acc + r.totalCount, 0)} dona
                </td>
                <td className="pt-4 text-right text-emerald-400 font-mono">
                  {formatUZS(roomReports.reduce((acc, r) => acc + r.totalValue, 0))}
                </td>
                <td className="pt-4 text-right text-white font-mono">
                  {formatUZS(stats.totalSales)}
                </td>
                <td className="pt-4 text-right pr-2 text-cyan-400 font-mono">100%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

    </div>
  );
}

