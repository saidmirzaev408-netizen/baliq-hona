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

  const handleSubmit = (e) => {
    e.preventDefault();
    onAssign(roomId, Number(selectedFishId), Number(quantity));
  };

  const currentFish = fishList.find(f => f.id === Number(selectedFishId));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel max-w-md w-full p-6 sm:p-8 rounded-3xl border border-cyan-500/30">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="font-heading font-bold text-xl text-white">Xonaga Baliq Joylashtirish</h3>
            <p className="text-xs text-cyan-400 font-mono mt-0.5">{room?.name} ({room?.number})</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-lg">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Baliq Turini Tanlang</label>
            <select 
              value={selectedFishId} 
              onChange={(e) => setSelectedFishId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm bg-slate-900/80 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
            >
              {fishList.map(fish => (
                <option key={fish.id} value={fish.id}>
                  {fish.name} — {formatUZS(fish.price)} (Mavjud: {fish.qty} ta)
                </option>
              ))}
            </select>
          </div>

          {currentFish && (
            <div className="flex items-center gap-3 p-3 rounded-2xl glass-card-subtle border border-cyan-500/20">
              <img src={currentFish.image} alt={currentFish.name} className="w-12 h-12 rounded-xl object-cover" />
              <div className="text-xs">
                <div className="font-bold text-white">{currentFish.name}</div>
                <div className="text-emerald-400 font-mono">{formatUZS(currentFish.price)} / dona</div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Joylashtiriladigan Miqdor (dona)</label>
            <input 
              type="number" 
              min="1"
              required
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm font-mono bg-slate-900/80 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="pt-2 text-xs text-slate-400">
            Jami kiritilayotgan qiymat: <span className="font-bold text-emerald-400 font-mono">{formatUZS((currentFish?.price || 0) * quantity)}</span>
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
              Biriktirish
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

