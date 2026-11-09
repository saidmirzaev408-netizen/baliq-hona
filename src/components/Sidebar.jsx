import React from 'react';
import { Icons } from './Icons';

export function Sidebar({ 
  activeTab, 
  onNavigate, 
  roomsCount, 
  fishCount, 
  stats, 
  mobileNavOpen, 
  setMobileNavOpen,
  currentUser,
  onLogout
}) {
  const navItems = [
    { id: 'dashboard', label: 'Boshqaruv Paneli', icon: <Icons.Dashboard />, badge: null },
    { id: 'rooms', label: 'Akvarium Xonalari', icon: <Icons.Rooms />, badge: roomsCount },
    { id: 'catalog', label: 'Baliqlar Katalogi', icon: <Icons.Fish />, badge: fishCount },
    { id: 'management', label: 'Xonalar Boshqaruvi', icon: <Icons.Manage />, badge: null },
    { id: 'sales', label: 'Savdo Bo\'limi', icon: <Icons.Sales />, badge: null },
    { id: 'reports', label: 'Moliyaviy Hisobot', icon: <Icons.Reports />, badge: 'VIP' },
    { id: 'settings', label: 'Sozlamalar', icon: <Icons.Settings />, badge: null }
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden flex items-center justify-between p-4 glass-panel border-b border-cyan-500/20 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-btn flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <span className="text-xl">🐠</span>
          </div>
          <div>
            <h1 className="font-heading font-extrabold text-lg gradient-text-cyan tracking-wider">FISH HOUSE</h1>
            <p className="text-[10px] text-cyan-400/80 uppercase font-semibold">Aquarium Management</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {currentUser && (
            <button
              onClick={onLogout}
              title="Chiqish"
              className="p-2 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/30 text-xs font-semibold"
            >
              🚪 Chiqish
            </button>
          )}
          <button 
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="p-2 rounded-lg bg-slate-800/80 text-cyan-400 hover:text-white border border-slate-700"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileNavOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-72 flex-shrink-0 transition-transform duration-300 ease-in-out
        glass-panel border-r border-cyan-500/15 flex flex-col justify-between
        ${mobileNavOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-cyan-500/15">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl gradient-btn flex items-center justify-center shadow-xl shadow-cyan-500/25 ring-2 ring-cyan-400/30">
                <span className="text-2xl animate-pulse">🐠</span>
              </div>
              <div>
                <h1 className="font-heading font-extrabold text-xl tracking-wider text-white">
                  FISH <span className="gradient-text-cyan">HOUSE</span>
                </h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[11px] font-semibold text-cyan-400/80 uppercase tracking-widest">Aquarium OS v2.4</span>
                </div>
              </div>
            </div>
          </div>

          {/* User Profile Card */}
          {currentUser && (
            <div className="p-3 mx-3 my-3 rounded-2xl glass-card-subtle border border-cyan-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <img 
                  src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                  alt={currentUser.fullName}
                  className="w-9 h-9 rounded-xl object-cover ring-2 ring-cyan-400/40"
                />
                <div className="min-w-0">
                  <div className="font-bold text-xs text-white truncate">{currentUser.fullName}</div>
                  <span className="text-[10px] text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-800/40 inline-block font-semibold">
                    {currentUser.role}
                  </span>
                </div>
              </div>
              <button
                onClick={onLogout}
                title="Tizimdan chiqish"
                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 text-xs transition"
              >
                🚪
              </button>
            </div>
          )}

          {/* Navigation Menu */}
          <nav className="p-4 space-y-1.5 font-medium text-sm">
            <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Asosiy Bo'limlar</div>
            
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-600/30 to-blue-600/20 text-cyan-300 border-l-4 border-cyan-400 shadow-lg shadow-cyan-950/50'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-400'}`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive 
                        ? 'bg-cyan-500 text-slate-950' 
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom Live Mini-Widget */}
        <div className="p-4 m-4 rounded-2xl glass-card-subtle border border-cyan-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300">Tizim Holati</span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Online
            </span>
          </div>
          <div className="space-y-1.5 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Band xonalar:</span>
              <span className="text-rose-400 font-semibold">{stats.occupiedRooms} ta</span>
            </div>
            <div className="flex justify-between">
              <span>Bo'sh xonalar:</span>
              <span className="text-emerald-400 font-semibold">{stats.availableRooms} ta</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(stats.occupiedRooms / (stats.totalRooms || 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
