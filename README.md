# 🐠 Fish House – Aquarium & Fish Management Platform (React JS + Vite + Tailwind CSS)

Professional, zamonaviy va to'liq funksional Akvarium & Baliqchilik Biznesini Boshqarish Platformasi.

---

## 🔐 Login va Ro'yxatdan O'tish (Auth Page)

Dasturga chiroyli akvarium fon rasmi bilan bezatilgan **Kirish (Login)** va **Ro'yxatdan O'tish (Register)** sahifasi qo'shildi:
- **Orqa fon:** Yuqori sifatli jonli akvarium va baliqlar fotosurati + okean gradientlari
- **Kirish (Login):** Email/Login va Parol kiritish
- **Tezkor Sinov (1-Click Demo):** 
  - Login: `admin@fishhouse.uz` yoki `admin`
  - Parol: `admin123`
  - Yoki ekrandagi *"Admin bo'lib kirish"* tugmasi orqali to'g'ridan-to'g'ri kirish
- **Ro'yxatdan O'tish (Register):** Ism-familiya, email, telefon raqami, lavozim tanlash (*Administrator*, *Menejer*, *Akvariumchi mutaxassis*) va parol tasdiqlash
- Ro'yxatdan o'tgan foydalanuvchilar ma'lumotlari `localStorage`da avtomatik saqlanadi
- Foydalanuvchi profili sidebar va sozlamalarda ko'rinadi, **Chiqish (Logout)** tugmasi mavjud.

---

## 🛠️ O'rnatish va Ishga Tushirish

```bash
# 1. Kerakli paketlarni o'rnatish
npm install

# 2. Dasturni dev serverda ishga tushirish
npm run dev
```

Brauzerda ochiladi:
👉 `http://localhost:3000`

---

## 📁 Loyiha Strukturasi (React JS)

```text
baliq hona/
├── index.html                   # Vite HTML shabloni
├── package.json                 # React 18, Vite, Tailwind CSS konfiguratsiyasi
├── vite.config.js               # Vite konfiguratsiyasi
├── tailwind.config.js           # Tailwind CSS sozlamalari
├── postcss.config.js            # PostCSS
├── src/
│   ├── main.jsx                 # React root render
│   ├── App.jsx                  # Asosiy ilova komponenti, Auth va State boshqaruvi
│   ├── index.css                # Tailwind va Glassmorphism stillari
│   ├── data/
│   │   └── initialData.js       # 8 ta akvarium xonasi va 15 ta baliq ma'lumotlari
│   ├── utils/
│   │   ├── formatters.js        # UZS valyuta formati
│   │   └── csvExport.js         # CSV formatda eksport qilish
│   └── components/
│       ├── Auth.jsx             # 🌊 Login va Register sahifasi (Baliq fon rasmi bilan)
│       ├── Sidebar.jsx          # Yon navigatsiya paneli va profil ma'lumotlari
│       ├── Dashboard.jsx        # Asosiy statistika va monitoring (6 ta KPI)
│       ├── FishRooms.jsx        # Xonalar kartochkalari va filtrlar
│       ├── RoomDetail.jsx       # Xona ichki hisoboti (Umumiy hisobot va print)
│       ├── FishCatalog.jsx      # 15 xil baliq katalogi va narxlar
│       ├── RoomManagement.jsx   # Xonalarni boshqarish jadvali (CRUD)
│       ├── Sales.jsx            # Savdo va tranzaksiyalar jurnali
│       ├── FinancialReports.jsx # Moliyaviy tahlil va ulushlar
│       ├── Settings.jsx         # Profil, sozlamalar va bazani qayta tiklash
│       ├── Modals.jsx           # Barcha modallar (Yangi xona, baliq, sotuv, confirm)
│       └── Icons.jsx            # SVG ikonkalari
```
