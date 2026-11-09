import React, { useState } from 'react';
import { Icons } from './Icons';

export function Settings({ onResetData, showToast, currentUser, onLogout }) {
  const [businessName, setBusinessName] = useState("Fish House – Aquarium & Fish Management Platform");
  const [currency] = useState("UZS (O'zbek so'mi)");
  const [email, setEmail] = useState("admin@fishhouse.uz");
  const [phone, setPhone] = useState("+998 71 200 44 22");

  const handleSave = (e) => {
    e.preventDefault();
    showToast("Sozlamalar muvaffaqiyatli saqlandi!");
  };

  return (
    <div className="max-w-4xl space-y-8 animate-fadeIn">
      <div>
        <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
          Tizim <span className="gradient-text-cyan">Sozlamalari</span>
        </h1>
        <p className="text-sm text-slate-400">Platforma konfiguratsiyasi, profil va ma'lumotlar xavfsizligi</p>
      </div>

      {/* Current User Profile Section */}
      {currentUser && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img 
              src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
              alt={currentUser.fullName}
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-cyan-500/30 shadow-lg shadow-cyan-950/40"
            />
            <div>
              <div className="inline-block px-3 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 mb-1">
                {currentUser.role}
              </div>
              <h3 className="font-heading font-bold text-xl text-white">{currentUser.fullName}</h3>
              <p className="text-xs text-slate-300">{currentUser.email} {currentUser.phone ? `• ${currentUser.phone}` : ''}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="px-5 py-2.5 rounded-xl bg-rose-600/90 hover:bg-rose-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-rose-950/50 flex items-center gap-2 transition"
          >
            <span>🚪</span> Tizimdan Chiqish (Logout)
          </button>
        </div>
      )}

      {/* Company settings */}
      <form onSubmit={handleSave} className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
        <h3 className="font-heading font-bold text-lg text-white pb-3 border-b border-slate-800">
          Kompaniya Ma'lumotlari
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2">Platforma Nomi</label>
            <input 
              type="text" 
              value={businessName} 
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-900/80 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2">Asosiy Valyuta</label>
            <input 
              type="text" 
              value={currency} 
              disabled
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-900/50 cursor-not-allowed opacity-80 border border-slate-700 text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2">Aloqa Emaili</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-900/80 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2">Telefon Raqami</label>
            <input 
              type="text" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-900/80 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            className="px-6 py-2.5 rounded-xl gradient-btn text-white font-semibold text-sm shadow-lg shadow-cyan-500/25"
          >
            Saqlash
          </button>
        </div>
      </form>

      {/* Database Backup & Reset Box */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4 border border-rose-500/30">
        <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
          <span>⚠️</span> Ma'lumotlar Bazasini Boshqarish
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Agar barcha amaliyotlarni tozalab, dasturiy boshlang'ich 8 ta xona va 15 ta baliq namunasini qayta yuklamoqchi bo'lsangiz, quyidagi tugmadan foydalaning.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={onResetData}
            className="px-5 py-2.5 rounded-xl bg-rose-600/90 hover:bg-rose-500 text-white font-semibold text-sm shadow-lg shadow-rose-950/50 transition flex items-center gap-2"
          >
            <Icons.Trash /> Boshlang'ich Ma'lumotlarni Qayta Tiklash
          </button>
        </div>
      </div>
    </div>
  );
}
