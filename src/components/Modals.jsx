import React, { useState } from 'react';
import { formatUZS } from '../utils/formatters';
import { Icons } from './Icons';

// Confirm Dialog
export function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="glass-panel max-w-md w-full p-6 rounded-2xl border border-rose-500/30">
        <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
          <Icons.Trash />
        </div>
        <h3 className="font-heading font-bold text-lg text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-300 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button 
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition"
          >
            Bekor qilish
          </button>
          <button 
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm shadow-lg shadow-rose-900/50 transition"
          >
            Ha, o'chirilsin
          </button>
        </div>
      </div>
    </div>
  );
}

// Room Form Modal
export function RoomFormModal({ isOpen, mode, initialData, onClose, onSave }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    number: initialData?.number || "",
    status: initialData?.status || "AVAILABLE",
    capacity: initialData?.capacity || 150,
    temp: initialData?.temp || "25.0°C",
    ph: initialData?.ph || "7.2",
    image: initialData?.image || "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600",
    notes: initialData?.notes || ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.number.trim()) return;
    onSave(initialData ? { ...initialData, ...formData } : formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-cyan-500/30 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <h3 className="font-heading font-bold text-xl text-white">
            {mode === 'add' ? "Yangi Akvarium Xonasi Qo'shish" : "Xona Ma'lumotlarini Tahrirlash"}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-lg">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Xona Nomi *</label>
            <input 
              type="text" 
              required
              placeholder="Masalan: Moviy Okeanus"
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-900/80 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Xona Raqami (Kod) *</label>
              <input 
                type="text" 
                required
                placeholder="ZAL-109"
                value={formData.number} 
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl text-sm font-mono bg-slate-900/80 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
              <select 
                value={formData.status} 
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-900/80 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="AVAILABLE">AVAILABLE (Bo'sh)</option>
                <option value="OCCUPIED">OCCUPIED (Band)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Sig'im (dona)</label>
              <input 
                type="number" 
                value={formData.capacity} 
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm bg-slate-900/80 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Harorat</label>
              <input 
                type="text" 
                value={formData.temp} 
                onChange={(e) => setFormData({ ...formData, temp: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm bg-slate-900/80 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Suv pH</label>
              <input 
                type="text" 
                value={formData.ph} 
                onChange={(e) => setFormData({ ...formData, ph: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm bg-slate-900/80 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Rasm URL manzili</label>
            <input 
              type="url" 
              value={formData.image} 
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-900/80 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Texnik Eslatma / Tavsif</label>
            <textarea 
              rows="2"
              value={formData.notes} 
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-4 py-2 rounded-xl text-sm bg-slate-900/80 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold"
            >
              Bekor qilish
            </button>
            <button 
              type="submit"
              className="px-6 py-2 rounded-xl gradient-btn text-white text-sm font-semibold shadow-lg shadow-cyan-500/20"
            >
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Fish Form Modal
export function FishFormModal({ isOpen, mode, initialData, onClose, onSave }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    nameEn: initialData?.nameEn || "",
    category: initialData?.category || "Freshwater",
    desc: initialData?.desc || "",
    price: initialData?.price || 50000,
    qty: initialData?.qty || 20,
    image: initialData?.image || "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=500",
    temp: initialData?.temp || "24-26°C",
    size: initialData?.size || "5-10 sm"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onSave(initialData ? { ...initialData, ...formData } : formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel max-w-lg w-full p-6 sm:p-8 rounded-3xl border border-cyan-500/30 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <h3 className="font-heading font-bold text-xl text-white">
            {mode === 'add' ? "Yangi Baliq Kiritish" : "Baliq Ma'lumotlarini Tahrirlash"}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-lg">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Baliq Nomi (UZ) *</label>
              <input 
                type="text" 
                required
                placeholder="Oltin Baliq"
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-900/80 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Nomi (EN)</label>
              <input 
                type="text" 
                placeholder="Goldfish"
                value={formData.nameEn} 
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-900/80 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Kategoriya</label>
              <select 
                value={formData.category} 
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-900/80 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="Freshwater">Freshwater (Chuchuk suv)</option>
                <option value="Marine">Marine (Dengiz)</option>
                <option value="Cichlid">Cichlid (Tsiklidlar)</option>
                <option value="Exotic">Exotic (Ekzotik)</option>
                <option value="Pond">Pond (Ko'l/Hovuz)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Narxi (UZS) *</label>
              <input 
                type="number" 
                required
                value={formData.price} 
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl text-sm font-mono bg-slate-900/80 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
              />
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {[10000, 25000, 50000, 100000, 250000].map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setFormData({ ...formData, price: p })}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700"
                  >
                    {formatUZS(p)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Zaxira (dona)</label>
              <input 
                type="number" 
                value={formData.qty} 
                onChange={(e) => setFormData({ ...formData, qty: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm bg-slate-900/80 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Harorat</label>
              <input 
                type="text" 
                value={formData.temp} 
                onChange={(e) => setFormData({ ...formData, temp: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm bg-slate-900/80 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">O'lchami</label>
              <input 
                type="text" 
                value={formData.size} 
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-sm bg-slate-900/80 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Rasm URL manzili</label>
            <input 
              type="url" 
              value={formData.image} 
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-900/80 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Tavsif</label>
            <textarea 
              rows="2"
              value={formData.desc} 
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              className="w-full px-4 py-2 rounded-xl text-sm bg-slate-900/80 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold"
            >
              Bekor qilish
            </button>
            <button 
              type="submit"
              className="px-6 py-2 rounded-xl gradient-btn text-white text-sm font-semibold shadow-lg shadow-cyan-500/20"
            >
              Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Assign Fish to Room Modal
export function AssignFishModal({ isOpen, roomId, rooms, fishList, onClose, onAssign }) {
  if (!isOpen) return null;

  const room = rooms.find(r => r.id === roomId);
  const [selectedFishId, setSelectedFishId] = useState(fishList[0]?.id || "");
  const [quantity, setQuantity] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("ALL"); // ALL, CHEAP, MID, PREMIUM
  const [sortBy, setSortBy] = useState("CHEAPEST"); // CHEAPEST, EXPENSIVE, NAME

  const handleSubmit = (e) => {
    e.preventDefault();
    onAssign(roomId, Number(selectedFishId), Number(quantity));
  };

  const currentFish = fishList.find(f => f.id === Number(selectedFishId)) || fishList[0];

  // Filtered & sorted fish list for convenient selection
  const filteredFish = fishList.filter(fish => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = fish.name.toLowerCase().includes(q);
      const matchEn = (fish.nameEn || "").toLowerCase().includes(q);
      const matchCat = (fish.category || "").toLowerCase().includes(q);
      const matchPrice = String(fish.price).includes(q);
      if (!matchName && !matchEn && !matchCat && !matchPrice) return false;
    }

    // Price filter
    if (priceFilter === 'CHEAP') return Number(fish.price) <= 30000;
    if (priceFilter === 'MID') return Number(fish.price) > 30000 && Number(fish.price) <= 150000;
    if (priceFilter === 'PREMIUM') return Number(fish.price) > 150000;

    return true;
  }).sort((a, b) => {
    if (sortBy === 'CHEAPEST') return Number(a.price) - Number(b.price);
    if (sortBy === 'EXPENSIVE') return Number(b.price) - Number(a.price);
    if (sortBy === 'NAME') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel max-w-xl w-full p-5 sm:p-7 rounded-3xl border border-cyan-500/30 max-h-[92vh] flex flex-col shadow-2xl shadow-cyan-950/60">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 flex-shrink-0">
          <div>
            <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
              <span>🐠</span> Xonaga Baliq Joylashtirish
            </h3>
            <p className="text-xs text-cyan-400 font-mono mt-0.5">
              {room?.name} ({room?.number})
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-3 flex-1 overflow-y-auto pr-1">
          
          {/* Search & Price Filter Controls */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">
                Baliqni tanlang (Qulay narxlarda):
              </label>
              <span className="text-[11px] text-cyan-400 font-medium">
                Topildi: {filteredFish.length} ta
              </span>
            </div>

            {/* Live Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Baliq nomi yoki narxi bo'yicha tezkor qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              />
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none text-xs">
                🔍
              </span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Price Filters & Sorting */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1 text-[11px]">
              <div className="flex flex-wrap items-center gap-1">
                {[
                  { id: 'ALL', label: 'Barchasi' },
                  { id: 'CHEAP', label: 'Hamyonbop (<30 ming)' },
                  { id: 'MID', label: 'O\'rtacha (30-150 ming)' },
                  { id: 'PREMIUM', label: 'Premium (>150 ming)' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setPriceFilter(tab.id)}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                      priceFilter === tab.id
                        ? 'bg-cyan-500 text-slate-950 shadow-sm shadow-cyan-500/50'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2 py-1 rounded-lg bg-slate-800 text-[11px] font-medium border border-slate-700 text-cyan-300 focus:outline-none"
              >
                <option value="CHEAPEST">Narx: Arzonidan ⬆</option>
                <option value="EXPENSIVE">Narx: Qimmatidan ⬇</option>
                <option value="NAME">Nomi bo'yicha</option>
              </select>
            </div>
          </div>

          {/* Interactive Fish Cards List (Clean, Convenient Selection) */}
          <div className="border border-slate-800 rounded-2xl bg-slate-950/40 p-2 max-h-52 overflow-y-auto space-y-1.5 custom-scrollbar">
            {filteredFish.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400">
                Mos baliq topilmadi. Qidiruv so'zini o'zgartirib ko'ring.
              </div>
            ) : (
              filteredFish.map(fish => {
                const isSelected = Number(selectedFishId) === fish.id;
                return (
                  <div
                    key={fish.id}
                    onClick={() => setSelectedFishId(fish.id)}
                    className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-cyan-500/15 border-cyan-400 shadow-md shadow-cyan-950/40'
                        : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={fish.image}
                        alt={fish.name}
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-slate-700"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`font-semibold text-xs sm:text-sm truncate ${isSelected ? 'text-cyan-300 font-bold' : 'text-white'}`}>
                            {fish.name}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                            {fish.category}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Zaxirada: <span className="text-slate-200 font-mono font-medium">{fish.qty} dona</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0 pl-3">
                      <div className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono font-bold text-xs sm:text-sm">
                        {formatUZS(fish.price)}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Active Fish Detail & Quantity Controls */}
          {currentFish && (
            <div className="p-3.5 rounded-2xl glass-card-subtle border border-cyan-500/30 bg-cyan-950/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={currentFish.image}
                    alt={currentFish.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-cyan-500/40"
                  />
                  <div>
                    <div className="font-bold text-sm text-white">{currentFish.name}</div>
                    <div className="text-xs text-slate-400">{currentFish.nameEn} • {currentFish.category}</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Dona narxi</span>
                  <span className="text-sm sm:text-base font-mono font-extrabold text-emerald-400">
                    {formatUZS(currentFish.price)}
                  </span>
                </div>
              </div>

              {/* Quantity Selector with Quick Buttons */}
              <div className="pt-2 border-t border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Joylashtiriladigan Miqdor (dona):
                  </label>
                  <div className="inline-flex items-center gap-2 bg-slate-900/90 rounded-xl p-1 border border-slate-700">
                    <button
                      type="button"
                      onClick={() => setQuantity(prev => Math.max(1, Number(prev) - 1))}
                      className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold transition"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      required
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                      className="w-14 text-center font-mono font-bold text-sm text-white bg-transparent focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(prev => Number(prev) + 1)}
                      className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Quick Add Buttons */}
                <div className="flex items-center gap-1.5 self-start sm:self-end">
                  {[5, 10, 20, 50].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setQuantity(val)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition ${
                        Number(quantity) === val
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      }`}
                    >
                      {val} ta
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculation Summary Bar */}
              <div className="pt-2 border-t border-cyan-500/20 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Hisob: <span className="text-white font-mono">{quantity} dona</span> × <span className="text-emerald-400 font-mono">{formatUZS(currentFish.price)}</span>
                </span>
                <span className="font-heading font-black text-sm sm:text-base text-emerald-400 font-mono">
                  = {formatUZS((currentFish.price || 0) * quantity)}
                </span>
              </div>
            </div>
          )}

          {/* Modal Action Buttons */}
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800 flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold transition"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl gradient-btn text-white text-xs sm:text-sm font-semibold shadow-lg shadow-cyan-500/25 transition"
            >
              ✓ Xonaga Biriktirish ({quantity} dona)
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

// Record Sale Modal
export function RecordSaleModal({ isOpen, roomId, rooms, onClose, onSave }) {
  if (!isOpen) return null;

  const room = rooms.find(r => r.id === roomId);
  const [amount, setAmount] = useState(500000);
  const [method, setMethod] = useState("Naqd");
  const [note, setNote] = useState("Akvarium baliqlari savdosi");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(roomId, amount, method, note);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel max-w-md w-full p-6 sm:p-8 rounded-3xl border border-emerald-500/30">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="font-heading font-bold text-xl text-white">Yangi Savdo Qayd Etish</h3>
            <p className="text-xs text-emerald-400 font-mono mt-0.5">{room?.name} ({room?.number})</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-lg">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Savdo Summasi (UZS) *</label>
            <input 
              type="number" 
              step="10000"
              min="1000"
              required
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-base font-mono font-bold text-emerald-300 bg-slate-900/80 border border-slate-700 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {[100000, 250000, 500000, 1000000, 2500000].map(val => (
              <button
                key={val}
                type="button"
                onClick={() => setAmount(val)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 text-[11px] font-mono text-slate-300 hover:bg-slate-700"
              >
                +{formatUZS(val)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">To'lov Turi</label>
              <select 
                value={method} 
                onChange={(e) => setMethod(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900/80 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="Naqd">Naqd Pul</option>
                <option value="Payme">Payme</option>
                <option value="Click">Click</option>
                <option value="Uzcard / Humo">Uzcard / Humo</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Izoh / Mahsulot</label>
              <input 
                type="text" 
                value={note} 
                onChange={(e) => setNote(e.target.value)}
                placeholder="Masalan: 5 dona Guppi"
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-900/80 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold"
            >
              Bekor qilish
            </button>
            <button 
              type="submit"
              className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-lg shadow-emerald-950/50"
            >
              Savdoni Yozish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

