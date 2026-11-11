import React from 'react';
import { useTranslation } from '../i18n/LanguageContext';

export function LanguageSwitcher({ variant = 'compact' }) {
  const { language, setLanguage, languages } = useTranslation();

  if (variant === 'full') {
    return (
      <div className="grid grid-cols-3 gap-3">
        {languages.map((lang) => {
          const isActive = language === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all text-xs font-semibold border ${
                isActive
                  ? 'bg-cyan-500/15 border-cyan-400/60 text-cyan-200 shadow-sm'
                  : 'bg-slate-900/60 hover:bg-slate-850 text-slate-400 hover:text-slate-200 border-slate-800'
              }`}
            >
              <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-bold">{lang.short}</span>
              <span className="text-slate-200">{lang.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Segmented control style — clean, human, non-AI aesthetic
  return (
    <div className="w-full grid grid-cols-3 p-1 rounded-xl bg-slate-900/90 border border-slate-800 shadow-inner">
      {languages.map((lang) => {
        const isActive = language === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            title={lang.label}
            className={`py-1.5 rounded-lg text-xs font-bold font-mono transition-all text-center ${
              isActive
                ? 'bg-slate-800 text-cyan-400 shadow-sm border border-slate-700/60 font-black'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {lang.short}
          </button>
        );
      })}
    </div>
  );
}

