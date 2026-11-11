import React from 'react';
import { Icons } from './Icons';
import fishHouseLogo from '../assets/logo';
import { useTranslation } from '../i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

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
  const { t } = useTranslation();

  const navItems = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: <Icons.Dashboard />, badge: null },
    { id: 'rooms', label: t('nav.rooms'), icon: <Icons.Rooms />, badge: roomsCount },
    { id: 'catalog', label: t('nav.catalog'), icon: <Icons.Fish />, badge: fishCount },
    { id: 'management', label: t('nav.management'), icon: <Icons.Manage />, badge: null },
    { id: 'sales', label: t('nav.sales'), icon: <Icons.Sales />, badge: null },
    { id: 'reports', label: t('nav.reports'), icon: <Icons.Reports />, badge: 'VIP' },
    { id: 'settings', label: t('nav.settings'), icon: <Icons.Settings />, badge: null }
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden flex items-center justify-between p-3.5 glass-panel border-b border-cyan-500/20 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <img
            src={fishHouseLogo}
            alt="Fish House"
            className="h-10 w-auto rounded-xl border border-cyan-500/40 shadow-md object-contain"
          />
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher variant="compact" />
          {currentUser && (
            <button
              onClick={onLogout}
              title={t('nav.exit')}
              className="p-2 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/30 text-xs font-semibold"
            >
              🚪
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
          {/* Brand Header with Neon Banner Logo */}
          <div className="p-4 border-b border-cyan-500/20">
            <div className="relative group cursor-pointer overflow-hidden rounded-2xl border border-cyan-500/40 shadow-xl shadow-cyan-500/25 transition-all hover:border-cyan-300">
              <img
                src={fishHouseLogo}
                alt="Fish House Aquarium"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-1.5 right-2 bg-slate-950/85 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-mono text-cyan-300 font-bold border border-cyan-400/40 flex items-center gap-1 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>OS 2.5</span>
              </div>
            </div>
          </div>

          {/* User Profile Card */}
          {currentUser && (
            <div className="p-3.5 mx-4 my-3.5 rounded-2xl glass-card-subtle border border-cyan-500/20 flex items-center justify-between shadow-lg shadow-black/20">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative">
                  <img
                    src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                    alt={currentUser.fullName}
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-cyan-400/40"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
                </div>
                <div className="min-w-0">
                  <div className="font-heading font-bold text-xs text-white truncate">{currentUser.fullName}</div>
                  <span className="text-[10px] text-cyan-300 font-semibold uppercase tracking-wider block">
                    {currentUser.role}
                  </span>
                </div>
              </div>
              <button
                onClick={onLogout}
                title={t('nav.exit')}
                className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/25 text-rose-300 border border-rose-500/20 text-xs transition shadow-sm"
              >
                🚪
              </button>
            </div>
          )}

          {/* Clean Segmented Language Control */}
          <div className="px-4 mb-3">
            <LanguageSwitcher variant="compact" />
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 space-y-1.5 font-medium text-sm">
            <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              {t('nav.mainSections')}
            </div>

            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 group ${isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-transparent text-cyan-300 border-l-4 border-cyan-400 shadow-lg shadow-cyan-950/60 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                    }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`transition-transform group-hover:scale-110 duration-200 ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-400'}`}>
                      {item.icon}
                    </span>
                    <span className="tracking-wide">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${isActive
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/40'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
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
            <div className="pt-2 mt-2 border-t border-cyan-500/15 flex items-center justify-between text-[10px]">
              <span className="text-cyan-300 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                Jonli video fon
              </span>
              <span className="text-emerald-400 font-mono font-bold uppercase">Aktiv</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
