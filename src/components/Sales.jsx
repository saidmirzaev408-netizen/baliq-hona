import React from 'react';
import { formatUZS } from '../utils/formatters';

export function Sales({ rooms, stats, transactions = [], onRecordSale, onSelectRoom }) {
  const sortedBySales = [...rooms].sort((a, b) => (b.sales || 0) - (a.sales || 0));
  const maxSale = Math.max(...rooms.map(r => Number(r.sales) || 0), 1);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Savdo <span className="gradient-text-cyan">Bo'limi (Sales)</span>
          </h1>
          <p className="text-sm text-slate-400">Har bir xona bo'yicha savdo tushumlari, kunlik savdolar va to'lovlarni yozish</p>
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-cyan-500">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Jami Savdo Tushumi</span>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-2">
            {formatUZS(stats.totalSales)}
          </div>
          <div className="text-xs text-cyan-400 mt-1">Barcha zallardan to'plangan jami tushum</div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-l-4 border-emerald-500">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bugungi Kunlik Savdo</span>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-400 mt-2">
            {formatUZS(stats.totalDailySales)}
          </div>
          <div className="text-xs text-emerald-300 mt-1">Bugun amalga oshirilgan savdolar</div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border-l-4 border-amber-500">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Eng Ko'p Savdo Qilingan Xona</span>
          <div className="font-heading font-bold text-xl text-amber-300 mt-2 truncate">
            {sortedBySales[0]?.name || "Mavjud emas"}
          </div>
          <div className="text-xs text-amber-200 mt-1">
            Savdo: {formatUZS(sortedBySales[0]?.sales || 0)}
          </div>
        </div>
      </div>

      {/* Sales Comparison Chart (CSS Bar Chart) */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
        <div>
          <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2">
            <span>📊</span> Xonalar Bo'yicha Savdo Grafigi
          </h2>
          <p className="text-xs text-slate-400">Har bir xona tushumining vizual taqqoslanishi</p>
        </div>

        <div className="space-y-4">
          {sortedBySales.map(room => {
            const sale = Number(room.sales) || 0;
            const percentage = Math.round((sale / maxSale) * 100);

            return (
              <div key={room.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-cyan-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                      {room.number}
                    </span>
                    <span className="font-semibold text-white cursor-pointer hover:text-cyan-300" onClick={() => onSelectRoom(room.id)}>
                      {room.name}
                    </span>
                  </div>
                  <div className="font-mono font-bold text-emerald-400">
                    {formatUZS(sale)}
                  </div>
                </div>

                <div className="w-full bg-slate-900 h-3.5 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 h-full rounded-full transition-all duration-700"
                    style={{ width: `${Math.max(percentage, 3)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sales Management Table */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl">
        <h3 className="font-heading font-bold text-xl text-white mb-6">
          Savdo Amallari va Yangi Tranzaksiya Yozish
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                <th className="pb-3 pl-2">Xona</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Jami Savdo</th>
                <th className="pb-3 text-right">Kunlik Savdo</th>
                <th className="pb-3 text-right pr-2">Amal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {rooms.map(room => (
                <tr key={room.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 pl-2 font-heading font-bold text-white">
                    {room.name} <span className="text-xs font-mono text-cyan-400 ml-1">({room.number})</span>
                  </td>
                  <td className="py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      room.status === 'OCCUPIED' ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {room.status}
                    </span>
                  </td>
                  <td className="py-4 text-right font-mono font-bold text-emerald-400">
                    {formatUZS(room.sales)}
                  </td>
                  <td className="py-4 text-right font-mono font-semibold text-teal-300">
                    {formatUZS(room.dailySales || 0)}
                  </td>
                  <td className="py-4 text-right pr-2">
                    <button
                      onClick={() => onRecordSale(room.id)}
                      className="px-4 py-2 rounded-xl gradient-btn text-white text-xs font-semibold shadow-md shadow-cyan-950/40"
                    >
                      + Savdo Yozish
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Transactions History Ledger */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <span>🧾</span> So'nggi Savdo Tranzaksiyalari Tarixi
            </h3>
            <p className="text-xs text-slate-400">Har bir xona bo'yicha to'lov usullari va cheklar jurnali</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            {transactions.length} ta operatsiya
          </span>
        </div>

        {transactions.length === 0 ? (
          <div className="text-center py-8 glass-card-subtle rounded-2xl text-slate-400 text-xs">
            Hozircha yangi savdolar qayd etilmagan.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pl-2">Vaqt</th>
                  <th className="pb-3">Xona</th>
                  <th className="pb-3">Izoh / Mahsulot</th>
                  <th className="pb-3">To'lov Usuli</th>
                  <th className="pb-3 text-right pr-2">Summa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {transactions.map(item => (
                  <tr key={item.id} className="hover:bg-slate-800/20 transition-colors text-xs">
                    <td className="py-3 pl-2 font-mono text-slate-400">{item.time}</td>
                    <td className="py-3 font-semibold text-white">
                      {item.roomName} <span className="font-mono text-cyan-400">({item.roomNumber})</span>
                    </td>
                    <td className="py-3 text-slate-300">{item.note}</td>
                    <td className="py-3">
                      <span className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold ${
                        item.method === 'Payme' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                        item.method === 'Click' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                        item.method === 'Naqd' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {item.method}
                      </span>
                    </td>
                    <td className="py-3 text-right pr-2 font-mono font-bold text-emerald-400">
                      +{formatUZS(item.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

