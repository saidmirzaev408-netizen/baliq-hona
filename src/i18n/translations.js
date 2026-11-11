// Comprehensive 3-language translations: Uzbek (uz), Russian (ru), English (en)

export const translations = {
  uz: {
    // Navigation
    nav: {
      mainSections: "ASOSIY BO'LIMLAR",
      dashboard: "Boshqaruv Paneli",
      rooms: "Akvarium Xonalari",
      catalog: "Baliqlar Katalogi",
      management: "Xonalar Boshqaruvi",
      sales: "Savdo Bo'limi",
      reports: "Moliyaviy Hisobot",
      settings: "Sozlamalar",
      logout: "Chiqish",
      exit: "Tizimdan Chiqish",
      appTitle: "FISH HOUSE",
      appSubtitle: "Aquarium Management"
    },

    // Language Selector
    lang: {
      selectLang: "Tilni tanlang",
      uzbek: "O'zbekcha",
      russian: "Русский",
      english: "English"
    },

    // Common
    common: {
      save: "Saqlash",
      cancel: "Bekor qilish",
      delete: "O'chirish",
      edit: "Tahrirlash",
      search: "Qidirish...",
      actions: "Harakatlar",
      status: "Holati",
      available: "Bo'sh",
      occupied: "Band",
      total: "Jami",
      price: "Narxi",
      quantity: "Miqdori",
      date: "Sana",
      viewAll: "Barchasini ko'rish",
      details: "Batafsil",
      confirm: "Tasdiqlash",
      back: "Orqaga",
      loading: "Yuklanmoqda...",
      noData: "Ma'lumot topilmadi",
      success: "Muvaffaqiyatli",
      error: "Xatolik",
      dona: "ta",
      xil: "xil"
    },

    // Dashboard
    dashboard: {
      welcome: "Xush Kelibsiz",
      welcomeSubtitle: "Akvarium zallari holati, baliqlar katalogi, narxlar va kunlik moliyaviy aylanmani to'liq nazorat qiling.",
      badge: "Fish House Akvarium Boshqaruvi",
      addRoom: "Yangi Xona Qo'shish",
      addFish: "Yangi Baliq Kiritish",
      totalRooms: "Jami Xonalar",
      totalRoomsSub: "Barcha akvarium zallari",
      availableRooms: "Bo'sh Xonalar",
      availableRoomsSub: "Qabulga tayyor",
      occupiedRooms: "Band Xonalar",
      occupiedRoomsSub: "Baliqlar mavjud",
      totalFish: "Jami Baliqlar",
      totalFishSub: "biologik tur",
      inventoryValue: "Ombor Qiymati",
      inventoryValueSub: "Barcha aktivlar narxi",
      dailySales: "Kunlik Savdo",
      dailySalesSub: "Bugungi kassa tushumi",
      roomsTitle: "Akvarium Zallari Ko'rinishi",
      roomsSub: "Oxirgi holat, harorat va bandlik darajasi nazorati",
      occupancy: "Bandlik",
      fishCount: "Baliqlar",
      speciesCount: "Turlari",
      roomValue: "Xona qiymati",
      detailReport: "Batafsil Hisobot",
      featuredFish: "Mashhur Baliq Turlari",
      featuredFishSub: "Katalogdagi eng so'nggi, go'zal va qimmatbaho eksponatlar",
      toCatalog: "Katalogga o'tish",
      inStock: "Mavjud zaxira"
    },

    // Fish Rooms
    rooms: {
      title: "Akvarium Zallari",
      subtitle: "Barcha xonalarning to'liq ro'yxati, real rasmlari va moliyaviy hisoboti",
      allRooms: "Barcha Xonalar",
      availableOnly: "Bo'sh (Available)",
      occupiedOnly: "Band (Occupied)",
      searchPlaceholder: "Xona nomi yoki raqami...",
      createNew: "Yangi Xona Yaratish",
      syncBtn: "To'g'ri Rasmlar & Narxlarni O'rnatish",
      emptyState: "Hech qanday xona topilmadi",
      emptySub: "Qidiruv mezonlarini o'zgartirib ko'ring yoki yangi xona qo'shing.",
      capacity: "Sig'im",
      temp: "Harorat",
      salesTotal: "Jami savdo",
      roomValue: "Xona qiymati",
      roomFullness: "Xona to'laligi",
      freeRoom: "Bo'shatish",
      occupyRoom: "Band qilish",
      detailedReport: "Batafsil Hisobot",
      roomNames: {
        "Qirollik Zali (VIP)": "Qirollik Zali (VIP)",
        "Moviy Okeanus": "Moviy Okeanus",
        "Tropik Amazonka": "Tropik Amazonka",
        "Marjon Qoyalari (Marine)": "Marjon Qoyalari (Marine)",
        "Neptun Dunyosi": "Neptun Dunyosi",
        "Atlantida Marjoni": "Atlantida Marjoni",
        "Amazonka Chuqurligi": "Amazonka Chuqurligi",
        "Tinch Okean Bo'limi": "Tinch Okean Bo'limi"
      }
    },

    // Fish Catalog
    catalog: {
      title: "Baliqlar Katalogi",
      subtitle: "Barcha turdagi akvarium baliqlari, fotosuratlari va qulay narxlari",
      addNew: "Yangi Baliq Qo'shish",
      syncPrices: "Qulay Narxlarni Qo'llash",
      searchPlaceholder: "Baliq nomi yoki toifasi bo'yicha qidirish...",
      allCategories: "Barcha Toifalar",
      freshwater: "Chuchuk suv",
      marine: "Dengiz / Marjon",
      predator: "Yirtqich",
      rare: "Noyob / Elite",
      pricePerItem: "Dona narxi",
      stockQty: "Ombordagi soni",
      totalSum: "Umumiy qiymat",
      editFish: "Tahrirlash",
      deleteFish: "O'chirish"
    },

    // Room Management
    management: {
      title: "Xonalar Boshqaruvi",
      subtitle: "Baliqlarni xonalarga taqsimlash, ko'chirish va zallarni tozalash",
      assignFish: "Baliq Biriktirish",
      changeStatus: "Holatni o'zgartirish",
      editRoom: "Xonani tahrirlash",
      deleteRoom: "Xonani o'chirish",
      currentFishes: "Xonadagi baliqlar"
    },

    // Sales
    sales: {
      title: "Savdo Bo'limi",
      subtitle: "Baliqlar savdosi, xarid cheklari va mijozlar hisoboti",
      newSale: "Yangi Savdo Qilish",
      receipts: "Savdo Tarixi",
      customer: "Xaridor",
      item: "Mahsulot",
      totalPrice: "Umumiy summa",
      cash: "Naqd",
      card: "Karta / O'tkazma",
      saleSuccess: "Savdo muvaffaqiyatli amalga oshirildi!"
    },

    // Financial Reports
    reports: {
      title: "Moliyaviy Hisobotlar",
      subtitle: "Kassa aylanmasi, daromadlar statistikasi va rentabellik tahlili",
      totalRevenue: "Jami Tushum",
      monthlySales: "Oylik Savdo",
      topFish: "Eng ko'p sotilgan baliqlar",
      revenueChart: "Tushumlar grafigi"
    },

    // Settings
    settings: {
      title: "Tizim Sozlamalari",
      subtitle: "Tizim tili, profil sozlamalari, qulay narxlar va ma'lumotlar bazasi",
      languageSection: "Tizim Tili (Language)",
      languageDesc: "Dastur interfeysi uchun qulay tilni tanlang",
      companyInfo: "Kompaniya Ma'lumotlari",
      companyDesc: "Platforma nomi va asosiy aloqa kontaktlarini boshqaring",
      platformName: "Platforma Nomi",
      mainCurrency: "Asosiy Valyuta",
      contactEmail: "Aloqa Emaili",
      contactPhone: "Telefon Raqami",
      saveChanges: "Saqlash",
      systemData: "Tizim Ma'lumotlari",
      convenientPricesTitle: "Qulay Narxlarni O'rnatish",
      convenientPricesDesc: "Barcha 15 xil baliqlar narxini hamyonbop standartlarga avtomatik yangilash",
      applyPricesBtn: "Narxlarni Qulay Qilish",
      dangerZone: "Xavfli Zona (Danger Zone)",
      resetDatabase: "Tizimni Qayta Tiklash (Reset)",
      resetDatabaseDesc: "Barcha ma'lumotlarni boshlang'ich namunaviy holatga qaytarish. Amaliyotni ortga qaytarib bo'lmaydi.",
      resetBtn: "Baza Reset Qilish",
      profileSection: "Foydalanuvchi Profili",
      fullName: "F.I.SH",
      email: "Elektron pochta",
      role: "Lavozim",
      logoutBtn: "Tizimdan Chiqish"
    },

    // Auth / Login
    auth: {
      loginTitle: "Tizimga Kirish",
      loginSub: "Akvarium boshqaruv paneliga kirish uchun ma'lumotlaringizni kiriting",
      registerTitle: "Yangi Hisob Ochish",
      registerSub: "Xodim yoki menejer uchun yangi akkaunt yaratish",
      emailLabel: "Email manzili",
      passLabel: "Maxfiy parol",
      rememberMe: "Eslab qolish",
      loginBtn: "Tizimga Kirish",
      registerBtn: "Ro'yxatdan O'tish",
      quickDemo: "Tezkor Demo Kirish (Admin)",
      haveAccount: "Hisobingiz bormi? Kirish",
      noAccount: "Hisobingiz yo'qmi? Ro'yxatdan o'tish"
    }
  },

  ru: {
    // Navigation
    nav: {
      mainSections: "ОСНОВНЫЕ РАЗДЕЛЫ",
      dashboard: "Панель Управления",
      rooms: "Залы Аквариумов",
      catalog: "Каталог Рыб",
      management: "Управление Залами",
      sales: "Отдел Продаж",
      reports: "Финансовый Отчет",
      settings: "Настройки",
      logout: "Выход",
      exit: "Выйти из системы",
      appTitle: "FISH HOUSE",
      appSubtitle: "Управление Аквариумами"
    },

    // Language Selector
    lang: {
      selectLang: "Выберите язык",
      uzbek: "O'zbekcha",
      russian: "Русский",
      english: "English"
    },

    // Common
    common: {
      save: "Сохранить",
      cancel: "Отмена",
      delete: "Удалить",
      edit: "Редактировать",
      search: "Поиск...",
      actions: "Действия",
      status: "Статус",
      available: "Свободен",
      occupied: "Занят",
      total: "Всего",
      price: "Цена",
      quantity: "Количество",
      date: "Дата",
      viewAll: "Посмотреть все",
      details: "Подробнее",
      confirm: "Подтвердить",
      back: "Назад",
      loading: "Загрузка...",
      noData: "Данные не найдены",
      success: "Успешно",
      error: "Ошибка",
      dona: "шт",
      xil: "вид"
    },

    // Dashboard
    dashboard: {
      welcome: "Добро Пожаловать",
      welcomeSubtitle: "Полный контроль состояния залов аквариумов, каталога рыб, цен и ежедневного финансового оборота.",
      badge: "Fish House Управление Аквариумами",
      addRoom: "Добавить Зал",
      addFish: "Добавить Рыбу",
      totalRooms: "Всего Залов",
      totalRoomsSub: "Все залы аквариумов",
      availableRooms: "Свободные Залы",
      availableRoomsSub: "Готовы к приему",
      occupiedRooms: "Занятые Залы",
      occupiedRoomsSub: "С рыбами",
      totalFish: "Всего Рыб",
      totalFishSub: "биологических видов",
      inventoryValue: "Стоимость Склада",
      inventoryValueSub: "Стоимость всех активов",
      dailySales: "Дневная Выручка",
      dailySalesSub: "Кассовый сбор за сегодня",
      roomsTitle: "Обзор Залов Аквариумов",
      roomsSub: "Контроль статуса, температуры и уровня заполненности",
      occupancy: "Заполненность",
      fishCount: "Рыбы",
      speciesCount: "Виды",
      roomValue: "Стоимость зала",
      detailReport: "Подробный Отчет",
      featuredFish: "Популярные Виды Рыб",
      featuredFishSub: "Новейшие, редкие и ценные экспонаты из каталога",
      toCatalog: "Перейти в каталог",
      inStock: "В наличии"
    },

    // Fish Rooms
    rooms: {
      title: "Залы Аквариумов",
      subtitle: "Полный список всех залов, реальные фотографии и финансовая отчетность",
      allRooms: "Все Залы",
      availableOnly: "Свободные (Available)",
      occupiedOnly: "Занятые (Occupied)",
      searchPlaceholder: "Название или номер зала...",
      createNew: "Создать Новый Зал",
      syncBtn: "Установить Точные Фото & Цены",
      emptyState: "Залы не найдены",
      emptySub: "Попробуйте изменить параметры поиска или создайте новый зал.",
      capacity: "Вместимость",
      temp: "Температура",
      salesTotal: "Всего продаж",
      roomValue: "Стоимость зала",
      roomFullness: "Заполненность",
      freeRoom: "Освободить",
      occupyRoom: "Занять зал",
      detailedReport: "Подробный Отчет",
      roomNames: {
        "Qirollik Zali (VIP)": "Королевский Зал (VIP)",
        "Moviy Okeanus": "Синий Океан",
        "Tropik Amazonka": "Тропическая Амазонка",
        "Marjon Qoyalari (Marine)": "Коралловые Рифы (Морской)",
        "Neptun Dunyosi": "Мир Нептуна",
        "Atlantida Marjoni": "Кораллы Атлантиды",
        "Amazonka Chuqurligi": "Глубины Амазонки",
        "Tinch Okean Bo'limi": "Тихоокеанский Зал"
      }
    },

    // Fish Catalog
    catalog: {
      title: "Каталог Рыб",
      subtitle: "Все виды аквариумных рыб, качественные фото и доступные цены",
      addNew: "Добавить Рыбу",
      syncPrices: "Применить Доступные Цены",
      searchPlaceholder: "Поиск по названию или категории рыбы...",
      allCategories: "Все Категории",
      freshwater: "Пресноводные",
      marine: "Морские / Коралловые",
      predator: "Хищные",
      rare: "Редкие / Элитные",
      pricePerItem: "Цена за шт.",
      stockQty: "Количество на складе",
      totalSum: "Общая стоимость",
      editFish: "Редактировать",
      deleteFish: "Удалить"
    },

    // Room Management
    management: {
      title: "Управление Залами",
      subtitle: "Распределение рыб по залам, перемещение и санитарная очистка",
      assignFish: "Прикрепить Рыбу",
      changeStatus: "Изменить статус",
      editRoom: "Редактировать зал",
      deleteRoom: "Удалить зал",
      currentFishes: "Рыбы в этом зале"
    },

    // Sales
    sales: {
      title: "Отдел Продаж",
      subtitle: "Продажи рыб, кассовые чеки и учет покупателей",
      newSale: "Новая Продажа",
      receipts: "История Продаж",
      customer: "Покупатель",
      item: "Товар",
      totalPrice: "Общая сумма",
      cash: "Наличные",
      card: "Карта / Перевод",
      saleSuccess: "Продажа успешно оформлена!"
    },

    // Financial Reports
    reports: {
      title: "Финансовые Отчеты",
      subtitle: "Оборот кассы, статистика выручки и анализ рентабельности",
      totalRevenue: "Общая Выручка",
      monthlySales: "Продажи за месяц",
      topFish: "Самые продаваемые рыбы",
      revenueChart: "График выручки"
    },

    // Settings
    settings: {
      title: "Настройки Системы",
      subtitle: "Язык интерфейса, профиль, доступные цены и управление базой",
      languageSection: "Язык Системы (Language)",
      languageDesc: "Выберите удобный язык для интерфейса программы",
      systemData: "Системные Данные",
      convenientPricesTitle: "Установить Доступные Цены",
      convenientPricesDesc: "Автоматически обновить все цены рыб до доступных стандартов",
      applyPricesBtn: "Сделать Цены Доступными",
      resetDatabase: "Сброс Данных Системы (Reset)",
      resetDatabaseDesc: "Сбросить все данные к исходным демонстрационным",
      resetBtn: "Сбросить Базу",
      profileSection: "Профиль Пользователя",
      fullName: "Ф.И.О",
      email: "Электронная почта",
      role: "Должность"
    },

    // Auth / Login
    auth: {
      loginTitle: "Вход в Систему",
      loginSub: "Введите свои данные для входа в панель управления",
      registerTitle: "Создать Аккаунт",
      registerSub: "Регистрация нового сотрудника или менеджера",
      emailLabel: "Электронная почта",
      passLabel: "Пароль",
      rememberMe: "Запомнить меня",
      loginBtn: "Войти в Систему",
      registerBtn: "Зарегистрироваться",
      quickDemo: "Быстрый Демо Вход (Админ)",
      haveAccount: "Уже есть аккаунт? Войти",
      noAccount: "Нет аккаунта? Зарегистрироваться"
    }
  },

  en: {
    // Navigation
    nav: {
      mainSections: "MAIN SECTIONS",
      dashboard: "Dashboard",
      rooms: "Aquarium Rooms",
      catalog: "Fish Catalog",
      management: "Room Management",
      sales: "Sales Department",
      reports: "Financial Reports",
      settings: "Settings",
      logout: "Log Out",
      exit: "Sign Out",
      appTitle: "FISH HOUSE",
      appSubtitle: "Aquarium Management"
    },

    // Language Selector
    lang: {
      selectLang: "Select Language",
      uzbek: "O'zbekcha",
      russian: "Русский",
      english: "English"
    },

    // Common
    common: {
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      search: "Search...",
      actions: "Actions",
      status: "Status",
      available: "Available",
      occupied: "Occupied",
      total: "Total",
      price: "Price",
      quantity: "Quantity",
      date: "Date",
      viewAll: "View All",
      details: "Details",
      confirm: "Confirm",
      back: "Back",
      loading: "Loading...",
      noData: "No data found",
      success: "Success",
      error: "Error",
      dona: "pcs",
      xil: "types"
    },

    // Dashboard
    dashboard: {
      welcome: "Welcome",
      welcomeSubtitle: "Complete control over aquarium halls, fish catalog, prices, and daily revenue flow.",
      badge: "Fish House Aquarium Management OS",
      addRoom: "Add New Room",
      addFish: "Add New Fish",
      totalRooms: "Total Rooms",
      totalRoomsSub: "All aquarium exhibition halls",
      availableRooms: "Available Rooms",
      availableRoomsSub: "Ready for check-in",
      occupiedRooms: "Occupied Rooms",
      occupiedRoomsSub: "Contains live fish",
      totalFish: "Total Fish",
      totalFishSub: "biological species",
      inventoryValue: "Inventory Value",
      inventoryValueSub: "Total asset market worth",
      dailySales: "Daily Sales",
      dailySalesSub: "Today's register revenue",
      roomsTitle: "Aquarium Rooms Overview",
      roomsSub: "Status, temperature, and occupancy monitoring",
      occupancy: "Occupancy",
      fishCount: "Fish",
      speciesCount: "Species",
      roomValue: "Room Value",
      detailReport: "Detailed Report",
      featuredFish: "Featured Fish Species",
      featuredFishSub: "Latest, most exotic, and valuable exhibits",
      toCatalog: "Go to Catalog",
      inStock: "In Stock"
    },

    // Fish Rooms
    rooms: {
      title: "Aquarium Rooms",
      subtitle: "Full directory of halls, verified photos, and financial status",
      allRooms: "All Rooms",
      availableOnly: "Available",
      occupiedOnly: "Occupied",
      searchPlaceholder: "Room name or code...",
      createNew: "Create New Room",
      syncBtn: "Apply Verified Photos & Prices",
      emptyState: "No rooms found",
      emptySub: "Try adjusting search criteria or create a new room.",
      capacity: "Capacity",
      temp: "Temperature",
      salesTotal: "Total sales",
      roomValue: "Room Value",
      roomFullness: "Room Occupancy",
      freeRoom: "Make Available",
      occupyRoom: "Mark Occupied",
      detailedReport: "Detailed Report",
      roomNames: {
        "Qirollik Zali (VIP)": "Royal Hall (VIP)",
        "Moviy Okeanus": "Blue Ocean",
        "Tropik Amazonka": "Tropical Amazon",
        "Marjon Qoyalari (Marine)": "Coral Reefs (Marine)",
        "Neptun Dunyosi": "Neptune's Realm",
        "Atlantida Marjoni": "Atlantis Coral",
        "Amazonka Chuqurligi": "Amazon Depths",
        "Tinch Okean Bo'limi": "Pacific Ocean Hall"
      }
    },

    // Fish Catalog
    catalog: {
      title: "Fish Catalog",
      subtitle: "Complete aquarium species collection with photos and affordable pricing",
      addNew: "Add New Fish",
      syncPrices: "Apply Affordable Prices",
      searchPlaceholder: "Search fish by name or category...",
      allCategories: "All Categories",
      freshwater: "Freshwater",
      marine: "Marine / Reef",
      predator: "Predator",
      rare: "Rare / Elite",
      pricePerItem: "Unit Price",
      stockQty: "Stock Quantity",
      totalSum: "Total Worth",
      editFish: "Edit",
      deleteFish: "Delete"
    },

    // Room Management
    management: {
      title: "Room Management",
      subtitle: "Assign species, relocate specimens, and schedule tank maintenance",
      assignFish: "Assign Fish",
      changeStatus: "Change Status",
      editRoom: "Edit Room",
      deleteRoom: "Delete Room",
      currentFishes: "Fish in this room"
    },

    // Sales
    sales: {
      title: "Sales Department",
      subtitle: "Transactions register, purchase receipts, and customer orders",
      newSale: "New Sale",
      receipts: "Transaction History",
      customer: "Customer",
      item: "Item",
      totalPrice: "Total Amount",
      cash: "Cash",
      card: "Card / Wire",
      saleSuccess: "Sale registered successfully!"
    },

    // Financial Reports
    reports: {
      title: "Financial Reports",
      subtitle: "Cashflow analytics, revenue distribution, and profit margin summary",
      totalRevenue: "Total Revenue",
      monthlySales: "Monthly Sales",
      topFish: "Top Selling Species",
      revenueChart: "Revenue Chart"
    },

    // Settings
    settings: {
      title: "System Settings",
      subtitle: "Language preferences, profile credentials, price controls, and database reset",
      languageSection: "System Language",
      languageDesc: "Choose your preferred language for the application interface",
      systemData: "System Data",
      convenientPricesTitle: "Apply Affordable Prices",
      convenientPricesDesc: "Automatically update all species prices to affordable standard rates",
      applyPricesBtn: "Set Affordable Prices",
      resetDatabase: "Reset System Database",
      resetDatabaseDesc: "Restore all data back to original demo templates",
      resetBtn: "Reset Database",
      profileSection: "User Profile",
      fullName: "Full Name",
      email: "Email Address",
      role: "Role"
    },

    // Auth / Login
    auth: {
      loginTitle: "Sign In",
      loginSub: "Enter your credentials to access the aquarium management system",
      registerTitle: "Create Account",
      registerSub: "Register a new staff member or administrator account",
      emailLabel: "Email Address",
      passLabel: "Password",
      rememberMe: "Remember me",
      loginBtn: "Sign In",
      registerBtn: "Register Account",
      quickDemo: "Quick Demo Access (Admin)",
      haveAccount: "Already have an account? Sign In",
      noAccount: "Don't have an account? Sign Up"
    }
  }
};

// Helper for translated room names
export function getRoomName(lang = 'uz', originalName = '') {
  const selectedLang = translations[lang] || translations.uz;
  if (selectedLang.rooms && selectedLang.rooms.roomNames && selectedLang.rooms.roomNames[originalName]) {
    return selectedLang.rooms.roomNames[originalName];
  }
  return originalName;
}

// Helper hook / accessor for translations
export function getTranslation(lang = 'uz', keyPath = '') {
  const selectedLang = translations[lang] || translations.uz;
  const parts = keyPath.split('.');
  let current = selectedLang;
  
  for (const part of parts) {
    if (current && current[part] !== undefined) {
      current = current[part];
    } else {
      // Fallback to Uzbek
      let fallback = translations.uz;
      for (const fPart of parts) {
        if (fallback && fallback[fPart] !== undefined) {
          fallback = fallback[fPart];
        } else {
          return keyPath;
        }
      }
      return fallback;
    }
  }
  return current;
}

