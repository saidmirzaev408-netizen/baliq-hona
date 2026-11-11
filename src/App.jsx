import React, { useState, useEffect, useMemo } from 'react';
import { DEFAULT_ROOMS, DEFAULT_FISH, DEFAULT_TRANSACTIONS } from './data/initialData';
import { formatUZS } from './utils/formatters';

import { Auth } from './components/Auth';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { FishRooms } from './components/FishRooms';
import { RoomDetail } from './components/RoomDetail';
import { FishCatalog } from './components/FishCatalog';
import { RoomManagement } from './components/RoomManagement';
import { Sales } from './components/Sales';
import { FinancialReports } from './components/FinancialReports';
import { Settings } from './components/Settings';
import { ConfirmDialog, RoomFormModal, FishFormModal, AssignFishModal, RecordSaleModal } from './components/Modals';

export default function App() {
  // Current logged in user (null triggers login & register view)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('fishhouse_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Version key for accurate verified images and prices
  const SYSTEM_DATA_VERSION = 'fishhouse_v4_accurate_images_and_prices';

  // LocalStorage state management with auto-migration
  const [rooms, setRooms] = useState(() => {
    const version = localStorage.getItem('fishhouse_sys_ver');
    const saved = localStorage.getItem('fishhouse_rooms_v1');
    if (version !== SYSTEM_DATA_VERSION) {
      localStorage.setItem('fishhouse_sys_ver', SYSTEM_DATA_VERSION);
      localStorage.setItem('fishhouse_rooms_v1', JSON.stringify(DEFAULT_ROOMS));
      localStorage.setItem('fishhouse_fish_v1', JSON.stringify(DEFAULT_FISH));
      localStorage.setItem('fishhouse_trans_v1', JSON.stringify(DEFAULT_TRANSACTIONS));
      return DEFAULT_ROOMS;
    }
    return saved ? JSON.parse(saved) : DEFAULT_ROOMS;
  });

  const [fishList, setFishList] = useState(() => {
    const version = localStorage.getItem('fishhouse_sys_ver');
    const saved = localStorage.getItem('fishhouse_fish_v1');
    if (version !== SYSTEM_DATA_VERSION) {
      return DEFAULT_FISH;
    }
    return saved ? JSON.parse(saved) : DEFAULT_FISH;
  });

  const [transactions, setTransactions] = useState(() => {
    const version = localStorage.getItem('fishhouse_sys_ver');
    const saved = localStorage.getItem('fishhouse_trans_v1');
    if (version !== SYSTEM_DATA_VERSION) {
      return DEFAULT_TRANSACTIONS;
    }
    return saved ? JSON.parse(saved) : DEFAULT_TRANSACTIONS;
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Confirm Dialog State
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null
  });

  // Modals
  const [roomModal, setRoomModal] = useState({ isOpen: false, mode: 'add', data: null });
  const [fishModal, setFishModal] = useState({ isOpen: false, mode: 'add', data: null });
  const [assignFishModal, setAssignFishModal] = useState({ isOpen: false, roomId: null });
  const [saleRecordModal, setSaleRecordModal] = useState({ isOpen: false, roomId: null });

  // Persist to LocalStorage
  useEffect(() => {
    localStorage.setItem('fishhouse_rooms_v1', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('fishhouse_fish_v1', JSON.stringify(fishList));
  }, [fishList]);

  useEffect(() => {
    localStorage.setItem('fishhouse_trans_v1', JSON.stringify(transactions));
  }, [transactions]);

  // Toast notification helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('fishhouse_current_user');
    showToast("Tizimdan muvaffaqiyatli chiqildi.", 'info');
  };

  // Room calculations
  const calculateRoomStats = (room) => {
    let totalCount = 0;
    let totalValue = 0;
    const speciesCount = (room.fish || []).length;

    (room.fish || []).forEach(item => {
      const f = fishList.find(x => x.id === item.fishId);
      if (f) {
        totalCount += Number(item.qty || 0);
        totalValue += Number(item.qty || 0) * Number(f.price || 0);
      }
    });

    return {
      totalCount,
      totalValue,
      speciesCount,
      sales: Number(room.sales || 0)
    };
  };

  // Global aggregations for Dashboard & Reports
  const stats = useMemo(() => {
    const totalRooms = rooms.length;
    const availableRooms = rooms.filter(r => r.status === 'AVAILABLE').length;
    const occupiedRooms = rooms.filter(r => r.status === 'OCCUPIED').length;
    
    let totalFishCount = 0;
    let totalInventoryValue = 0;

    fishList.forEach(f => {
      totalFishCount += Number(f.qty || 0);
      totalInventoryValue += (Number(f.price || 0) * Number(f.qty || 0));
    });

    const totalSales = rooms.reduce((acc, r) => acc + Number(r.sales || 0), 0);
    const totalDailySales = rooms.reduce((acc, r) => acc + Number(r.dailySales || 0), 0);

    return {
      totalRooms,
      availableRooms,
      occupiedRooms,
      totalFishCount,
      totalSpecies: fishList.length,
      totalInventoryValue,
      totalSales,
      totalDailySales
    };
  }, [rooms, fishList]);

  // Navigation handler
  const handleNavigate = (tab, roomId = null) => {
    setActiveTab(tab);
    if (roomId !== null) {
      setSelectedRoomId(roomId);
    }
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Room Status Toggle
  const toggleRoomStatus = (roomId) => {
    setRooms(prev => prev.map(r => {
      if (r.id === roomId) {
        const nextStatus = r.status === 'AVAILABLE' ? 'OCCUPIED' : 'AVAILABLE';
        showToast(`${r.number} statusi "${nextStatus}" ga o'zgartirildi!`);
        return { ...r, status: nextStatus };
      }
      return r;
    }));
  };

  // Room CRUD
  const saveRoom = (formData) => {
    if (roomModal.mode === 'add') {
      const newRoom = {
        id: Date.now(),
        ...formData,
        capacity: Number(formData.capacity) || 100,
        fish: [],
        sales: 0,
        dailySales: 0
      };
      setRooms(prev => [...prev, newRoom]);
      showToast(`Yangi xona "${newRoom.name}" muvaffaqiyatli qo'shildi!`);
    } else {
      setRooms(prev => prev.map(r => r.id === formData.id ? { ...r, ...formData } : r));
      showToast(`Xona ma'lumotlari yangilandi!`);
    }
    setRoomModal({ isOpen: false, mode: 'add', data: null });
  };

  const deleteRoom = (roomId) => {
    const room = rooms.find(r => r.id === roomId);
    setConfirmDialog({
      isOpen: true,
      title: "Xonani o'chirishni tasdiqlang",
      message: `Haqiqatan ham "${room ? room.name : 'Xona'}"ni o'chirib tashlamoqchimisiz? Ushbu amalni qaytarib bo'lmaydi.`,
      onConfirm: () => {
        setRooms(prev => prev.filter(r => r.id !== roomId));
        if (selectedRoomId === roomId) {
          setSelectedRoomId(null);
          setActiveTab('rooms');
        }
        showToast("Xona tizimdan o'chirildi", 'info');
      }
    });
  };

  // Fish CRUD
  const saveFish = (formData) => {
    if (fishModal.mode === 'add') {
      const newFish = {
        id: Date.now(),
        ...formData,
        price: Number(formData.price) || 0,
        qty: Number(formData.qty) || 0
      };
      setFishList(prev => [...prev, newFish]);
      showToast(`"${newFish.name}" katalogga qo'shildi!`);
    } else {
      setFishList(prev => prev.map(f => f.id === formData.id ? { 
        ...f, 
        ...formData,
        price: Number(formData.price) || 0,
        qty: Number(formData.qty) || 0
      } : f));
      showToast(`Baliq ma'lumotlari yangilandi!`);
    }
    setFishModal({ isOpen: false, mode: 'add', data: null });
  };

  const deleteFish = (fishId) => {
    const f = fishList.find(x => x.id === fishId);
    setConfirmDialog({
      isOpen: true,
      title: "Baliq mahsulotini o'chirish",
      message: `Haqiqatan ham "${f ? f.name : 'Baliq'}"ni katalogdan o'chirmoqchimisiz?`,
      onConfirm: () => {
        setFishList(prev => prev.filter(x => x.id !== fishId));
        setRooms(prev => prev.map(r => ({
          ...r,
          fish: (r.fish || []).filter(item => item.fishId !== fishId)
        })));
        showToast("Mahsulot muvaffaqiyatli o'chirildi", 'info');
      }
    });
  };

  // Fish Room Assignment
  const addFishToRoom = (roomId, fishId, qty) => {
    qty = Number(qty);
    if (!qty || qty <= 0) return;

    const catalogItem = fishList.find(f => f.id === fishId);
    if (!catalogItem) return;

    setRooms(prev => prev.map(room => {
      if (room.id !== roomId) return room;

      const existingIndex = (room.fish || []).findIndex(item => item.fishId === fishId);
      let updatedFish = [...(room.fish || [])];

      if (existingIndex >= 0) {
        updatedFish[existingIndex] = {
          ...updatedFish[existingIndex],
          qty: Number(updatedFish[existingIndex].qty) + qty
        };
      } else {
        updatedFish.push({ fishId, qty });
      }

      return {
        ...room,
        status: 'OCCUPIED',
        fish: updatedFish
      };
    }));

    showToast(`${qty} dona "${catalogItem.name}" xonaga joylashtirildi!`);
    setAssignFishModal({ isOpen: false, roomId: null });
  };

  const removeFishFromRoom = (roomId, fishId) => {
    setRooms(prev => prev.map(room => {
      if (room.id !== roomId) return room;
      const updated = (room.fish || []).filter(item => item.fishId !== fishId);
      return {
        ...room,
        status: updated.length === 0 ? 'AVAILABLE' : room.status,
        fish: updated
      };
    }));
    showToast("Baliq xonadan chiqarildi", 'info');
  };

  const updateRoomFishQty = (roomId, fishId, newQty) => {
    newQty = Math.max(1, Number(newQty) || 1);
    setRooms(prev => prev.map(room => {
      if (room.id !== roomId) return room;
      const updated = (room.fish || []).map(item => {
        if (item.fishId === fishId) {
          return { ...item, qty: newQty };
        }
        return item;
      });
      return { ...room, fish: updated };
    }));
    showToast("Miqdor muvaffaqiyatli yangilandi");
  };

  // Record a sale for a room
  const recordSale = (roomId, amount, method = 'Naqd', note = 'Akvarium mahsulotlari') => {
    amount = Number(amount);
    if (isNaN(amount) || amount <= 0) {
      showToast("Iltimos, to'g'ri summa kiriting!", "error");
      return;
    }

    const targetRoom = rooms.find(r => r.id === roomId);

    setRooms(prev => prev.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          sales: (Number(room.sales) || 0) + amount,
          dailySales: (Number(room.dailySales) || 0) + amount
        };
      }
      return room;
    }));

    // Add to live transactions log
    const newTrans = {
      id: Date.now(),
      roomId,
      roomNumber: targetRoom ? targetRoom.number : 'Xona',
      roomName: targetRoom ? targetRoom.name : 'Akvarium Zali',
      amount,
      method,
      note: note || 'Mahsulotlar savdosi',
      time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
    };
    setTransactions(prev => [newTrans, ...prev]);

    showToast(`${formatUZS(amount)} savdo (${method}) muvaffaqiyatli yozildi!`);
    setSaleRecordModal({ isOpen: false, roomId: null });
  };

  // Apply 100% accurate pictures, realistic prices, and clean room data
  const handleApplyConvenientPrices = () => {
    setRooms(DEFAULT_ROOMS);
    setFishList(DEFAULT_FISH);
    setTransactions(DEFAULT_TRANSACTIONS);
    localStorage.setItem('fishhouse_sys_ver', SYSTEM_DATA_VERSION);
    localStorage.setItem('fishhouse_rooms_v1', JSON.stringify(DEFAULT_ROOMS));
    localStorage.setItem('fishhouse_fish_v1', JSON.stringify(DEFAULT_FISH));
    localStorage.setItem('fishhouse_trans_v1', JSON.stringify(DEFAULT_TRANSACTIONS));
    showToast("Barcha xonalar va baliqlarga to'g'ri rasmlar va to'g'ri narxlar o'rnatildi! 🎉", 'success');
  };

  // Reset Demo Data
  const resetDemoData = () => {
    setConfirmDialog({
      isOpen: true,
      title: "Barcha ma'lumotlarni qayta tiklash",
      message: "Barcha dastlabki namunaviy xonalar va baliqlar qayta yuklanadi. Rozimisiz?",
      onConfirm: () => {
        setRooms(DEFAULT_ROOMS);
        setFishList(DEFAULT_FISH);
        setTransactions(DEFAULT_TRANSACTIONS);
        localStorage.removeItem('fishhouse_rooms_v1');
        localStorage.removeItem('fishhouse_fish_v1');
        localStorage.removeItem('fishhouse_trans_v1');
        showToast("Barcha dastlabki ma'lumotlar qayta tiklandi!");
      }
    });
  };

  // If user is not logged in, show the Auth Login & Register Screen with the beautiful fish background
  if (!currentUser) {
    return (
      <Auth 
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showToast(`Xush kelibsiz, ${user.fullName}!`);
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative z-10 text-slate-200">
      {/* 🌊 Elegant Ambient Live Aquarium Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=80"
          className="w-full h-full object-cover opacity-35 filter brightness-90 contrast-105 saturate-110"
        >
          <source src="https://upload.wikimedia.org/wikipedia/commons/2/29/Freshwater_fish.webm" type="video/webm" />
          <source src="https://upload.wikimedia.org/wikipedia/commons/2/22/Tropical_Fish_Banner_Fish_on_Coral_Reef.webm" type="video/webm" />
        </video>
        {/* Deep, refined obsidian slate overlay for professional SaaS readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060c18]/80 via-[#071329]/70 to-[#060c18]/85 backdrop-blur-[2px]"></div>
      </div>

      {/* Dynamic Ambient Ocean Glows */}
      <div className="ambient-glow bg-cyan-500/15 top-[-80px] left-[-80px] w-[550px] h-[550px]"></div>
      <div className="ambient-glow bg-blue-600/10 bottom-[-100px] right-[-80px] w-[600px] h-[600px]"></div>
      <div className="ambient-glow bg-emerald-500/10 top-1/3 left-1/2 w-[500px] h-[500px]"></div>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-xl transition-all duration-300 border ${
          toast.type === 'error' 
            ? 'bg-rose-950/90 border-rose-500/50 text-rose-200 shadow-rose-950/50' 
            : toast.type === 'info'
            ? 'bg-sky-950/90 border-sky-500/50 text-sky-200 shadow-sky-950/50'
            : 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200 shadow-emerald-950/50'
        }`}>
          <span className="w-2.5 h-2.5 rounded-full bg-current animate-ping"></span>
          <span className="font-semibold text-xs sm:text-sm">{toast.message}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab}
        onNavigate={handleNavigate}
        roomsCount={rooms.length}
        fishCount={fishList.length}
        stats={stats}
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main View Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {activeTab === 'dashboard' && (
          <Dashboard 
            stats={stats} 
            rooms={rooms} 
            fishList={fishList}
            calculateRoomStats={calculateRoomStats}
            onNavigate={handleNavigate}
            onAddRoom={() => setRoomModal({ isOpen: true, mode: 'add', data: null })}
            onAddFish={() => setFishModal({ isOpen: true, mode: 'add', data: null })}
          />
        )}

        {activeTab === 'rooms' && (
          <FishRooms 
            rooms={rooms}
            calculateRoomStats={calculateRoomStats}
            onSelectRoom={(id) => handleNavigate('room-detail', id)}
            onToggleStatus={toggleRoomStatus}
            onAddRoom={() => setRoomModal({ isOpen: true, mode: 'add', data: null })}
            onSyncAccurateData={handleApplyConvenientPrices}
          />
        )}

        {activeTab === 'room-detail' && (
          <RoomDetail 
            roomId={selectedRoomId}
            rooms={rooms}
            fishList={fishList}
            calculateRoomStats={calculateRoomStats}
            onBack={() => handleNavigate('rooms')}
            onToggleStatus={toggleRoomStatus}
            onOpenAssign={() => setAssignFishModal({ isOpen: true, roomId: selectedRoomId })}
            onOpenSale={() => setSaleRecordModal({ isOpen: true, roomId: selectedRoomId })}
            onRemoveFish={removeFishFromRoom}
            onUpdateQty={updateRoomFishQty}
            onEditRoom={(room) => setRoomModal({ isOpen: true, mode: 'edit', data: room })}
            onDeleteRoom={deleteRoom}
          />
        )}

        {activeTab === 'catalog' && (
          <FishCatalog 
            fishList={fishList}
            onAddFish={() => setFishModal({ isOpen: true, mode: 'add', data: null })}
            onEditFish={(fish) => setFishModal({ isOpen: true, mode: 'edit', data: fish })}
            onDeleteFish={deleteFish}
            onApplyConvenientPrices={handleApplyConvenientPrices}
          />
        )}

        {activeTab === 'management' && (
          <RoomManagement 
            rooms={rooms}
            calculateRoomStats={calculateRoomStats}
            onAddRoom={() => setRoomModal({ isOpen: true, mode: 'add', data: null })}
            onEditRoom={(room) => setRoomModal({ isOpen: true, mode: 'edit', data: room })}
            onDeleteRoom={deleteRoom}
            onToggleStatus={toggleRoomStatus}
            onSelectRoom={(id) => handleNavigate('room-detail', id)}
            onAssignFish={(roomId) => setAssignFishModal({ isOpen: true, roomId })}
          />
        )}

        {activeTab === 'sales' && (
          <Sales 
            rooms={rooms}
            stats={stats}
            transactions={transactions}
            onRecordSale={(roomId) => setSaleRecordModal({ isOpen: true, roomId })}
            onSelectRoom={(id) => handleNavigate('room-detail', id)}
          />
        )}

        {activeTab === 'reports' && (
          <FinancialReports 
            rooms={rooms}
            stats={stats}
            calculateRoomStats={calculateRoomStats}
            onSelectRoom={(id) => handleNavigate('room-detail', id)}
          />
        )}

        {activeTab === 'settings' && (
          <Settings 
            onResetData={resetDemoData}
            onApplyConvenientPrices={handleApplyConvenientPrices}
            showToast={showToast}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Confirmation Dialog */}
      <ConfirmDialog 
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={() => {
          if (confirmDialog.onConfirm) confirmDialog.onConfirm();
          setConfirmDialog({ ...confirmDialog, isOpen: false });
        }}
        onCancel={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
      />

      {/* Add / Edit Room Modal */}
      <RoomFormModal 
        isOpen={roomModal.isOpen}
        mode={roomModal.mode}
        initialData={roomModal.data}
        onClose={() => setRoomModal({ isOpen: false, mode: 'add', data: null })}
        onSave={saveRoom}
      />

      {/* Add / Edit Fish Modal */}
      <FishFormModal 
        isOpen={fishModal.isOpen}
        mode={fishModal.mode}
        initialData={fishModal.data}
        onClose={() => setFishModal({ isOpen: false, mode: 'add', data: null })}
        onSave={saveFish}
      />

      {/* Assign Fish Modal */}
      <AssignFishModal 
        isOpen={assignFishModal.isOpen}
        roomId={assignFishModal.roomId}
        rooms={rooms}
        fishList={fishList}
        onClose={() => setAssignFishModal({ isOpen: false, roomId: null })}
        onAssign={addFishToRoom}
      />

      {/* Record Sale Modal */}
      <RecordSaleModal 
        isOpen={saleRecordModal.isOpen}
        roomId={saleRecordModal.roomId}
        rooms={rooms}
        onClose={() => setSaleRecordModal({ isOpen: false, roomId: null })}
        onSave={recordSale}
      />
    </div>
  );
}
