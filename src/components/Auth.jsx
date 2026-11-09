import React, { useState } from 'react';

export function Auth({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('+998 ');
  const [regRole, setRegRole] = useState('Administrator');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Error / message
  const [error, setError] = useState('');

  // Default demo user
  const handleQuickDemo = (role = 'Administrator') => {
    const demoUser = {
      id: 1,
      fullName: role === 'Administrator' ? 'Azizbek Rahimov' : 'Madina Karimova',
      email: role === 'Administrator' ? 'admin@fishhouse.uz' : 'manager@fishhouse.uz',
      phone: '+998 90 123 45 67',
      role: role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };
    localStorage.setItem('fishhouse_current_user', JSON.stringify(demoUser));
    onLoginSuccess(demoUser);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setError("Iltimos, email va parolni to'liq kiriting!");
      return;
    }

    // Check users from localStorage
    const savedUsers = JSON.parse(localStorage.getItem('fishhouse_users_v1') || '[]');
    const existing = savedUsers.find(
      u => u.email.toLowerCase() === loginEmail.trim().toLowerCase() && u.password === loginPassword
    );

    if (existing) {
      const userObj = {
        id: existing.id,
        fullName: existing.fullName,
        email: existing.email,
        phone: existing.phone,
        role: existing.role,
        avatar: existing.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      };
      if (rememberMe) {
        localStorage.setItem('fishhouse_current_user', JSON.stringify(userObj));
      }
      onLoginSuccess(userObj);
    } else if (
      (loginEmail.trim() === 'admin' || loginEmail.trim() === 'admin@fishhouse.uz') &&
      loginPassword === 'admin123'
    ) {
      handleQuickDemo('Administrator');
    } else {
      setError("Email yoki parol noto'g'ri kiritildi! (Demo kirish: admin / admin123)");
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!regFullName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setError("Barcha majburiy maydonlarni to'ldiring!");
      return;
    }

    if (regPassword.length < 6) {
      setError("Parol kamida 6 ta belgidan iborat bo'lishi kerak!");
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setError("Kiritilgan parollar bir-biriga mos kelmadi!");
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem('fishhouse_users_v1') || '[]');
    if (savedUsers.some(u => u.email.toLowerCase() === regEmail.trim().toLowerCase())) {
      setError("Ushbu email manzili allaqachon ro'yxatdan o'tgan!");
      return;
    }

    const newUser = {
      id: Date.now(),
      fullName: regFullName.trim(),
      email: regEmail.trim(),
      phone: regPhone.trim(),
      role: regRole,
      password: regPassword,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
    };

    savedUsers.push(newUser);
    localStorage.setItem('fishhouse_users_v1', JSON.stringify(savedUsers));
    localStorage.setItem('fishhouse_current_user', JSON.stringify(newUser));

    onLoginSuccess(newUser);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      
      {/* 🌊 High Quality Aquarium Fish Background with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=85')`,
        }}
      ></div>

      {/* Deep Ocean Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#020617]/95 via-[#061129]/85 to-[#021827]/90 backdrop-blur-[4px]"></div>

      {/* Floating Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-[140px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Main Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden glass-panel border border-cyan-500/25 shadow-2xl shadow-cyan-950/60 my-6">

        {/* Left Side: Brand Showcase & Photography Preview */}
        <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between relative bg-gradient-to-b from-ocean-900/90 to-ocean-950/95 border-b lg:border-b-0 lg:border-r border-cyan-500/20">
          <div>
            {/* Logo & Platform Name */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-12 h-12 rounded-2xl gradient-btn flex items-center justify-center shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-400/40">
                <span className="text-2xl animate-pulse">🐠</span>
              </div>
              <div>
                <h2 className="font-heading font-black text-2xl text-white tracking-wider">
                  FISH <span className="gradient-text-cyan">HOUSE</span>
                </h2>
                <span className="text-[10px] font-semibold tracking-widest uppercase text-cyan-400">
                  Aquarium Management
                </span>
              </div>
            </div>

            <h3 className="font-heading font-extrabold text-xl lg:text-2xl text-white leading-tight">
              Akvarium va Baliqlar Biznesi Boshqaruv Markazi
            </h3>
            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              Zallar monitoringi, baliq zaxiralari, kunlik savdolar va moliyaviy hisobotlarni yagona professional tizimda boshqaring.
            </p>
          </div>

          {/* Quick Statistics Micro-Cards */}
          <div className="space-y-2.5 my-6">
            <div className="flex items-center gap-3 p-3 rounded-2xl glass-card-subtle border border-cyan-500/20">
              <span className="text-lg">🏢</span>
              <div className="text-xs">
                <div className="font-bold text-white">8+ Akvarium Zallari</div>
                <div className="text-[11px] text-cyan-400">AVAILABLE / OCCUPIED nazorati</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl glass-card-subtle border border-cyan-500/20">
              <span className="text-lg">🐟</span>
              <div className="text-xs">
                <div className="font-bold text-white">15+ Oliy Toifali Baliqlar</div>
                <div className="text-[11px] text-cyan-400">UZS narxlar va zaxira hisobi</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl glass-card-subtle border border-emerald-500/20">
              <span className="text-lg">📈</span>
              <div className="text-xs">
                <div className="font-bold text-emerald-400">Umumiy Hisobot (Moliyaviy)</div>
                <div className="text-[11px] text-slate-300">100% avtomatik hisob-kitob</div>
              </div>
            </div>
          </div>

          {/* 1-Click Demo Quick Login */}
          <div className="pt-4 border-t border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-2 font-medium">
              Tezkor sinovdan o'tkazish uchun:
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('Administrator')}
                className="flex-1 py-2 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition"
              >
                👑 Admin bo'lib kirish
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('Menejer')}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition"
              >
                👔 Menejer kirish
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Forms (Login / Register) */}
        <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col justify-center bg-slate-950/70">
          
          {/* Tabs: Kirish ↔ Ro'yxatdan O'tish */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-900/90 border border-slate-800 mb-6">
            <button
              type="button"
              onClick={() => { setIsRegister(false); setError(''); }}
              className={`flex-1 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm transition-all ${
                !isRegister 
                  ? 'gradient-btn text-white shadow-md shadow-cyan-950/50' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Kirish (Login)
            </button>
            <button
              type="button"
              onClick={() => { setIsRegister(true); setError(''); }}
              className={`flex-1 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm transition-all ${
                isRegister 
                  ? 'gradient-btn text-white shadow-md shadow-cyan-950/50' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Ro'yxatdan O'tish (Register)
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2 animate-fadeIn">
              <span className="text-base">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* ========================================= */}
          {/* LOGIN FORM */}
          {/* ========================================= */}
          {!isRegister ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <h4 className="font-heading font-black text-xl text-white">Xush kelibsiz!</h4>
                <p className="text-xs text-slate-400 mt-1">Platformaga kirish uchun emailingiz yoki loginni kiriting.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email yoki Foydalanuvchi nomi
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                    ✉️
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="admin@fishhouse.uz yoki admin"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-900/90 border border-slate-700/80 text-white focus:border-cyan-400 focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Parol
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                    🔒
                  </span>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-slate-900/90 border border-slate-700/80 text-white focus:border-cyan-400 focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0"
                  />
                  <span>Meni eslab qol</span>
                </label>
                <button
                  type="button"
                  onClick={() => setError("Parolni tiklash uchun tizim administratoriga murojaat qiling (admin@fishhouse.uz).")}
                  className="text-cyan-400 hover:text-cyan-300 hover:underline"
                >
                  Parolni unutdingizmi?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl gradient-btn text-white font-heading font-bold text-sm shadow-xl shadow-cyan-900/40 hover:opacity-95 transition"
              >
                Tizimga Kirish →
              </button>

              <div className="text-center pt-2">
                <span className="text-xs text-slate-400">
                  Hisobingiz yo'qmi?{' '}
                  <button
                    type="button"
                    onClick={() => { setIsRegister(true); setError(''); }}
                    className="text-cyan-400 font-semibold hover:underline"
                  >
                    Ro'yxatdan o'ting
                  </button>
                </span>
              </div>
            </form>
          ) : (
            /* ========================================= */
            /* REGISTER FORM */
            /* ========================================= */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <h4 className="font-heading font-black text-xl text-white">Yangi Hisob Ochish</h4>
                <p className="text-xs text-slate-400 mt-1">Fish House tizimidan to'liq foydalanish uchun ro'yxatdan o'ting.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Ism va Familiya *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Jasurbek Aliyev"
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl text-sm bg-slate-900/90 border border-slate-700/80 text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Manzil *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="user@fishhouse.uz"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl text-sm bg-slate-900/90 border border-slate-700/80 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Telefon Raqami
                  </label>
                  <input
                    type="text"
                    placeholder="+998 90 123 45 67"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl text-sm bg-slate-900/90 border border-slate-700/80 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Lavozim / Rol
                </label>
                <select
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl text-sm bg-slate-900/90 border border-slate-700/80 text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option value="Administrator">Administrator (To'liq huquq)</option>
                  <option value="Menejer">Menejer (Savdo va xonalar)</option>
                  <option value="Akvariumchi Mutaxassis">Akvariumchi Mutaxassis (Parvarish)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Parol *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Kamida 6 belgi"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl text-sm bg-slate-900/90 border border-slate-700/80 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Parolni Tasdiqlang *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Qayta kiriting"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl text-sm bg-slate-900/90 border border-slate-700/80 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 rounded-xl gradient-btn text-white font-heading font-bold text-sm shadow-xl shadow-cyan-900/40 hover:opacity-95 transition"
              >
                Ro'yxatdan O'tish →
              </button>

              <div className="text-center pt-1">
                <span className="text-xs text-slate-400">
                  Hisobingiz allaqachon bormi?{' '}
                  <button
                    type="button"
                    onClick={() => { setIsRegister(false); setError(''); }}
                    className="text-cyan-400 font-semibold hover:underline"
                  >
                    Tizimga kiring
                  </button>
                </span>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}

