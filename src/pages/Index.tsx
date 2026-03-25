import { useState } from "react";
import Icon from "@/components/ui/icon";

const SERIES_IMG = "https://cdn.poehali.dev/projects/46546d74-b92f-41d6-ba68-0a61271d4565/files/ce7f7e77-dd0f-4b33-bf31-45f2cffb69f4.jpg";
const MOVIE_IMG = "https://cdn.poehali.dev/projects/46546d74-b92f-41d6-ba68-0a61271d4565/files/2d9ebd28-8349-4862-ac1e-efa72924d5b3.jpg";

const EPISODES_S1 = [
  { num: 1, title: "Новые герои", vk: "https://vk.com/video_ext.php?oid=-230007325&id=456239199&hd=2&autoplay=0" },
  { num: 2, title: "Плохая примета" },
  { num: 3, title: "Лунная гонка" },
  { num: 4, title: "Идеальный друг" },
  { num: 5, title: "Флаг для Генерала" },
  { num: 6, title: "Таинственная коробка" },
  ...Array.from({ length: 20 }, (_, i) => ({ num: i + 7, title: "Скоро" })),
];

const EPISODES_S2 = Array.from({ length: 26 }, (_, i) => ({ num: i + 1, title: "Скоро" }));

const TV_CHANNELS = [
  { id: 1, name: "Карусель", emoji: "🎠", color: "#FF6B6B" },
  { id: 2, name: "Мульт", emoji: "🎨", color: "#4ECDC4" },
  { id: 3, name: "Канал Disney", emoji: "✨", color: "#45B7D1" },
  { id: 4, name: "Nickelodeon", emoji: "🟠", color: "#F7DC6F" },
  { id: 5, name: "Cartoon Network", emoji: "🎭", color: "#BB8FCE" },
  { id: 6, name: "Первый канал", emoji: "📺", color: "#E74C3C" },
  { id: 7, name: "Россия 1", emoji: "🇷🇺", color: "#2ECC71" },
  { id: 8, name: "НТВ", emoji: "📡", color: "#3498DB" },
  { id: 9, name: "Матч!", emoji: "⚽", color: "#E67E22" },
  { id: 10, name: "Пятница!", emoji: "🎉", color: "#9B59B6" },
  { id: 11, name: "ТНТ", emoji: "😄", color: "#F39C12" },
  { id: 12, name: "СТС", emoji: "🌟", color: "#1ABC9C" },
  { id: 13, name: "РЕН ТВ", emoji: "🔍", color: "#E74C3C" },
  { id: 14, name: "Звезда", emoji: "⭐", color: "#2C3E50" },
  { id: 15, name: "ОТР", emoji: "🏛️", color: "#16A085" },
  { id: 16, name: "Домашний", emoji: "🏠", color: "#D35400" },
  { id: 17, name: "ТВ Центр", emoji: "🏙️", color: "#7F8C8D" },
  { id: 18, name: "Спас", emoji: "✝️", color: "#6C5CE7" },
  { id: 19, name: "Мир", emoji: "🌍", color: "#00B894" },
  { id: 20, name: "Культура", emoji: "🎻", color: "#74B9FF" },
  { id: 21, name: "2х2", emoji: "🃏", color: "#FD79A8" },
  { id: 22, name: "Муз-ТВ", emoji: "🎵", color: "#A29BFE" },
  { id: 23, name: "MTV Russia", emoji: "🎸", color: "#FDCB6E" },
  { id: 24, name: "Хит ТВ", emoji: "🎤", color: "#55EFC4" },
  { id: 25, name: "Спорт 1", emoji: "🏆", color: "#FF7675" },
  { id: 26, name: "Спорт 2", emoji: "🏅", color: "#74B9FF" },
  { id: 27, name: "Eurosport", emoji: "🚴", color: "#0984E3" },
  { id: 28, name: "National Geo", emoji: "🌿", color: "#FDCB6E" },
  { id: 29, name: "Discovery", emoji: "🔭", color: "#6C5CE7" },
  { id: 30, name: "Animal Planet", emoji: "🐾", color: "#00B894" },
];

type Tab = "home" | "serials" | "movies" | "tv";

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [search, setSearch] = useState("");
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [showSerialDetail, setShowSerialDetail] = useState(false);
  const [showMovieDetail, setShowMovieDetail] = useState(false);

  const filteredChannels = TV_CHANNELS.filter(ch =>
    ch.name.toLowerCase().includes(search.toLowerCase())
  );

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "home", label: "Главная", icon: "Home" },
    { id: "serials", label: "Мультсериалы", icon: "Tv" },
    { id: "movies", label: "Фильмы", icon: "Film" },
    { id: "tv", label: "ТВ-каналы", icon: "Radio" },
  ];

  return (
    <div className="min-h-screen font-nunito" style={{ background: "linear-gradient(135deg, #0D0B1E 0%, #1A1035 50%, #0D1B2A 100%)" }}>
      {/* Декоративные звёзды */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.7 + 0.1,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: Math.random() * 3 + "s",
            }}
          />
        ))}
      </div>

      {/* Хедер */}
      <header className="relative z-10 px-4 py-4 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setActiveTab("home"); setShowSerialDetail(false); setShowMovieDetail(false); }}>
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg"
            style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}>
            🚀
          </div>
          <span className="text-white font-fredoka text-2xl tracking-wide">Поехали <span style={{ color: "#FCD34D" }}>Кино</span></span>
        </div>

        {/* Поиск */}
        <div className="flex-1 max-w-md mx-auto relative">
          <div className="flex items-center rounded-2xl px-4 py-2 gap-2" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <Icon name="Search" size={16} className="text-gray-400" />
            <input
              className="bg-transparent text-white placeholder-gray-400 text-sm outline-none w-full font-nunito"
              placeholder="Найти мультфильм, фильм, канал..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-gray-400 hover:text-white transition-colors">
                <Icon name="X" size={14} />
              </button>
            )}
          </div>
          {/* Результаты поиска */}
          {search.length > 1 && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden shadow-2xl z-50"
              style={{ background: "#1A1535", border: "1px solid rgba(255,255,255,0.12)" }}>
              {search.toLowerCase().split("").some(c => "геройчики".includes(c)) ? (
                <>
                  <button onClick={() => { setShowSerialDetail(true); setActiveTab("serials"); setSearch(""); }}
                    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/10 transition-colors text-left">
                    <img src={SERIES_IMG} className="w-10 h-14 object-cover rounded-lg" alt="Геройчики" />
                    <div>
                      <p className="text-white text-sm font-semibold">Геройчики</p>
                      <p className="text-gray-400 text-xs">Мультсериал • 2 сезона</p>
                    </div>
                  </button>
                  <button onClick={() => { setShowMovieDetail(true); setActiveTab("movies"); setSearch(""); }}
                    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/10 transition-colors text-left">
                    <img src={MOVIE_IMG} className="w-10 h-14 object-cover rounded-lg" alt="Незваный гость" />
                    <div>
                      <p className="text-white text-sm font-semibold">Геройчики. Незваный гость</p>
                      <p className="text-gray-400 text-xs">Фильм • 2025</p>
                    </div>
                  </button>
                </>
              ) : (
                <div className="px-4 py-3 text-gray-400 text-sm">Ничего не найдено</div>
              )}
            </div>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <button className="text-sm text-white px-4 py-2 rounded-xl font-semibold transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}>
            Войти
          </button>
        </div>
      </header>

      {/* Навигация */}
      <nav className="relative z-10 px-4 py-3 flex gap-2 overflow-x-auto" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {tabs.map(tab => (
          <button key={tab.id}
            onClick={() => { setActiveTab(tab.id); setShowSerialDetail(false); setShowMovieDetail(false); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm whitespace-nowrap transition-all hover:scale-105"
            style={activeTab === tab.id
              ? { background: "linear-gradient(135deg, #7C3AED, #EC4899)", color: "white", boxShadow: "0 4px 20px rgba(124,58,237,0.4)" }
              : { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)" }
            }>
            <Icon name={tab.icon} size={16} />
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Контент */}
      <main className="relative z-10 px-4 py-6 max-w-7xl mx-auto">

        {/* ГЛАВНАЯ */}
        {activeTab === "home" && (
          <div className="animate-fade-in">
            {/* Герой-баннер */}
            <div className="relative rounded-3xl overflow-hidden mb-8 cursor-pointer group"
              style={{ background: "linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #1a2744 100%)", minHeight: "340px" }}
              onClick={() => { setShowSerialDetail(true); setActiveTab("serials"); }}>
              <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: "#7C3AED" }} />
                <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full blur-3xl" style={{ background: "#EC4899" }} />
              </div>
              <div className="relative flex flex-col md:flex-row items-center p-8 gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#FCD34D", color: "#1A1535" }}>0+</span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: "rgba(255,255,255,0.15)" }}>Мультсериал</span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: "rgba(255,255,255,0.15)" }}>2022–2023</span>
                  </div>
                  <h1 className="font-fredoka text-5xl md:text-6xl text-white leading-tight">
                    Геройчики
                  </h1>
                  <p className="text-gray-300 text-sm leading-relaxed max-w-lg">
                    Мальчик Рома очень любит играть, поэтому в его комнате полным-полно разных игрушек. Когда Ромы нет — они живут собственной увлекательной жизнью!
                  </p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <button className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white transition-all hover:scale-105 hover:shadow-xl"
                      style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)", boxShadow: "0 4px 20px rgba(124,58,237,0.4)" }}
                      onClick={e => { e.stopPropagation(); setShowSerialDetail(true); setActiveTab("serials"); }}>
                      <Icon name="Play" size={18} />
                      Смотреть
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all hover:scale-105"
                      style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}
                      onClick={e => { e.stopPropagation(); setShowSerialDetail(true); setActiveTab("serials"); }}>
                      <Icon name="Info" size={18} />
                      Подробнее
                    </button>
                  </div>
                </div>
                <div className="flex-shrink-0 animate-float">
                  <img src={SERIES_IMG} className="w-52 h-72 object-cover rounded-2xl shadow-2xl transition-transform group-hover:scale-105"
                    style={{ boxShadow: "0 20px 60px rgba(124,58,237,0.5)" }} alt="Геройчики" />
                </div>
              </div>
            </div>

            {/* Продолжить просмотр */}
            <section className="mb-8">
              <h2 className="font-fredoka text-2xl text-white mb-4 flex items-center gap-2">
                <span>🎬</span> Продолжить просмотр
              </h2>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {EPISODES_S1.slice(0, 4).map(ep => (
                  <div key={ep.num} className="flex-shrink-0 w-52 rounded-2xl overflow-hidden cursor-pointer group transition-transform hover:scale-105"
                    style={{ background: "#1A1535" }}
                    onClick={() => { setSelectedEpisode(ep.num); setShowSerialDetail(true); setActiveTab("serials"); }}>
                    <div className="relative">
                      <img src={SERIES_IMG} className="w-full h-32 object-cover" alt={ep.title} />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                          <Icon name="Play" size={18} className="text-purple-700" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b">
                        <div className="h-full rounded-b" style={{ width: `${20 + ep.num * 12}%`, background: "linear-gradient(90deg, #7C3AED, #EC4899)" }} />
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-gray-400 text-xs mb-1">Серия {ep.num}</p>
                      <p className="text-white text-sm font-bold truncate">{ep.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Новинки */}
            <section className="mb-8">
              <h2 className="font-fredoka text-2xl text-white mb-4 flex items-center gap-2">
                <span>🆕</span> Новинки
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <div className="rounded-2xl overflow-hidden cursor-pointer group transition-transform hover:scale-105"
                  style={{ background: "#1A1535" }}
                  onClick={() => { setShowMovieDetail(true); setActiveTab("movies"); }}>
                  <div className="relative">
                    <img src={MOVIE_IMG} className="w-full h-48 object-cover" alt="Незваный гость" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                        <Icon name="Play" size={20} className="text-purple-700" />
                      </div>
                    </div>
                    <span className="absolute top-2 left-2 px-2 py-1 rounded-lg text-xs font-bold" style={{ background: "#FCD34D", color: "#1A1535" }}>0+</span>
                    <span className="absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-bold text-white" style={{ background: "rgba(124,58,237,0.8)" }}>Новинка</span>
                  </div>
                  <div className="p-3">
                    <p className="text-white font-bold text-sm">Геройчики. Незваный гость</p>
                    <p className="text-gray-400 text-xs mt-1">Фильм • 2025</p>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden cursor-pointer group transition-transform hover:scale-105"
                  style={{ background: "#1A1535" }}
                  onClick={() => { setShowSerialDetail(true); setActiveTab("serials"); }}>
                  <div className="relative">
                    <img src={SERIES_IMG} className="w-full h-48 object-cover" alt="Геройчики" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                        <Icon name="Play" size={20} className="text-purple-700" />
                      </div>
                    </div>
                    <span className="absolute top-2 left-2 px-2 py-1 rounded-lg text-xs font-bold" style={{ background: "#FCD34D", color: "#1A1535" }}>0+</span>
                  </div>
                  <div className="p-3">
                    <p className="text-white font-bold text-sm">Геройчики</p>
                    <p className="text-gray-400 text-xs mt-1">Мультсериал • 2 сезона</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Топ ТВ-каналы */}
            <section>
              <h2 className="font-fredoka text-2xl text-white mb-4 flex items-center gap-2">
                <span>📺</span> Популярные каналы
              </h2>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {TV_CHANNELS.slice(0, 8).map(ch => (
                  <button key={ch.id} onClick={() => setActiveTab("tv")}
                    className="flex-shrink-0 flex flex-col items-center gap-2 px-5 py-4 rounded-2xl transition-all hover:scale-105"
                    style={{ background: "#1A1535", border: "1px solid rgba(255,255,255,0.08)", minWidth: "90px" }}>
                    <span className="text-3xl">{ch.emoji}</span>
                    <span className="text-white text-xs font-bold text-center">{ch.name}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* МУЛЬТСЕРИАЛЫ */}
        {activeTab === "serials" && !showSerialDetail && (
          <div className="animate-fade-in">
            <h2 className="font-fredoka text-3xl text-white mb-6 flex items-center gap-2">
              <span>🎠</span> Мультсериалы
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <div className="rounded-2xl overflow-hidden cursor-pointer group transition-transform hover:scale-105"
                style={{ background: "#1A1535" }}
                onClick={() => setShowSerialDetail(true)}>
                <div className="relative">
                  <img src={SERIES_IMG} className="w-full h-56 object-cover" alt="Геройчики" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                      <Icon name="Play" size={20} className="text-purple-700" />
                    </div>
                  </div>
                  <span className="absolute top-2 left-2 px-2 py-1 rounded-lg text-xs font-bold" style={{ background: "#FCD34D", color: "#1A1535" }}>0+</span>
                </div>
                <div className="p-3">
                  <p className="text-white font-bold">Геройчики</p>
                  <p className="text-gray-400 text-xs mt-1">2 сезона • 26 серий</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Icon name="Star" size={12} className="text-yellow-400" />
                    <span className="text-yellow-400 text-xs font-bold">8.5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ДЕТАЛЬНАЯ СТРАНИЦА МУЛЬТСЕРИАЛА */}
        {activeTab === "serials" && showSerialDetail && (
          <div className="animate-fade-in">
            <button onClick={() => setShowSerialDetail(false)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 font-semibold">
              <Icon name="ChevronLeft" size={20} />
              Назад к мультсериалам
            </button>

            <div className="rounded-3xl overflow-hidden mb-8" style={{ background: "#1A1535" }}>
              <div className="relative h-64 overflow-hidden">
                <img src={SERIES_IMG} className="w-full h-full object-cover" alt="Геройчики" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, #1A1535 100%)" }} />
              </div>
              <div className="p-6 -mt-16 relative">
                <div className="flex flex-col md:flex-row gap-6">
                  <img src={SERIES_IMG} className="w-36 h-52 object-cover rounded-2xl shadow-2xl flex-shrink-0"
                    style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }} alt="Геройчики" />
                  <div className="space-y-3 pt-16 md:pt-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#FCD34D", color: "#1A1535" }}>0+</span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: "rgba(255,255,255,0.15)" }}>2022–2023</span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: "rgba(255,255,255,0.15)" }}>2 сезона</span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: "rgba(255,255,255,0.15)" }}>26 серий</span>
                    </div>
                    <h1 className="font-fredoka text-4xl text-white">Геройчики</h1>
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(s => <Icon key={s} name="Star" size={16} className="text-yellow-400" />)}
                      <span className="text-yellow-400 font-bold ml-1">8.5</span>
                      <span className="text-gray-400 text-sm ml-1">(324 отзыва)</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed max-w-2xl">
                      Мальчик Рома очень любит играть, поэтому в его комнате полным-полно разных игрушек. Кого здесь только нет: и загадочный пушистый инопланетянин Бублик, и отважный петух-тянучка Ко-Ко, и благородная ящерица-самурай О-Раш, и милая куколка Пинки, и воинственный плюшевый заяц Генерал Де-Кроль со своими роботами, и, конечно, отважные супергерои Флай и Глория. Когда Ромы нет в комнате, они живут собственной увлекательной игрушечной жизнью!
                    </p>
                    <button className="flex items-center gap-2 px-8 py-3 rounded-2xl font-bold text-white transition-all hover:scale-105"
                      style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)", boxShadow: "0 4px 20px rgba(124,58,237,0.4)" }}>
                      <Icon name="Play" size={18} />
                      Смотреть 1 серию
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Сезоны */}
            <div className="mb-6 flex gap-3">
              {[1, 2].map(s => (
                <button key={s} onClick={() => setSelectedSeason(s)}
                  className="px-6 py-2.5 rounded-2xl font-bold text-sm transition-all hover:scale-105"
                  style={selectedSeason === s
                    ? { background: "linear-gradient(135deg, #7C3AED, #EC4899)", color: "white" }
                    : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)" }
                  }>
                  Сезон {s}
                </button>
              ))}
            </div>

            {/* Список серий */}
            <div className="space-y-3">
              {(selectedSeason === 1 ? EPISODES_S1 : EPISODES_S2).map(ep => (
                <div key={ep.num} className="rounded-2xl overflow-hidden"
                  style={{
                    background: selectedEpisode === ep.num ? "rgba(124,58,237,0.2)" : "#1A1535",
                    border: selectedEpisode === ep.num ? "1px solid rgba(124,58,237,0.5)" : "1px solid rgba(255,255,255,0.06)"
                  }}>
                  <div
                    onClick={() => setSelectedEpisode(ep.num === selectedEpisode ? null : ep.num)}
                    className="flex items-center gap-4 p-4 cursor-pointer transition-all hover:scale-[1.01] group">
                    <div className="w-28 h-16 rounded-xl overflow-hidden flex-shrink-0 relative">
                      <img src={SERIES_IMG} className="w-full h-full object-cover" alt={ep.title} />
                      <div className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity ${selectedEpisode === ep.num ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                        <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                          <Icon name="Play" size={14} className="text-purple-700" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-xs mb-1">Сезон {selectedSeason} • Серия {ep.num}</p>
                      <p className="text-white font-bold">{ep.title}</p>
                      {ep.title === "Скоро" ? (
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "rgba(252,211,77,0.2)", color: "#FCD34D" }}>Скоро</span>
                      ) : (
                        <p className="text-gray-400 text-xs mt-1">12 мин</p>
                      )}
                    </div>
                    <Icon name={selectedEpisode === ep.num ? "ChevronUp" : "ChevronDown"} size={20} className="text-gray-400 flex-shrink-0" />
                  </div>
                  {selectedEpisode === ep.num && ep.title !== "Скоро" && (
                    <div className="px-4 pb-4">
                      {ep.vk ? (
                        <div className="relative w-full rounded-2xl overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                          <iframe
                            src={ep.vk}
                            className="absolute inset-0 w-full h-full"
                            style={{ border: "none" }}
                            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center py-8 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)" }}>
                          <p className="text-gray-400 text-sm">Видео скоро появится</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ФИЛЬМЫ */}
        {activeTab === "movies" && !showMovieDetail && (
          <div className="animate-fade-in">
            <h2 className="font-fredoka text-3xl text-white mb-6 flex items-center gap-2">
              <span>🎥</span> Фильмы
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <div className="rounded-2xl overflow-hidden cursor-pointer group transition-transform hover:scale-105"
                style={{ background: "#1A1535" }}
                onClick={() => setShowMovieDetail(true)}>
                <div className="relative">
                  <img src={MOVIE_IMG} className="w-full h-56 object-cover" alt="Незваный гость" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                      <Icon name="Play" size={20} className="text-purple-700" />
                    </div>
                  </div>
                  <span className="absolute top-2 left-2 px-2 py-1 rounded-lg text-xs font-bold" style={{ background: "#FCD34D", color: "#1A1535" }}>0+</span>
                  <span className="absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-bold text-white" style={{ background: "rgba(124,58,237,0.8)" }}>2025</span>
                </div>
                <div className="p-3">
                  <p className="text-white font-bold">Геройчики. Незваный гость</p>
                  <p className="text-gray-400 text-xs mt-1">Анимация • 2025</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Icon name="Star" size={12} className="text-yellow-400" />
                    <span className="text-yellow-400 text-xs font-bold">9.1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ДЕТАЛЬНАЯ СТРАНИЦА ФИЛЬМА */}
        {activeTab === "movies" && showMovieDetail && (
          <div className="animate-fade-in">
            <button onClick={() => setShowMovieDetail(false)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 font-semibold">
              <Icon name="ChevronLeft" size={20} />
              Назад к фильмам
            </button>

            <div className="rounded-3xl overflow-hidden mb-8" style={{ background: "#1A1535" }}>
              <div className="relative h-72 overflow-hidden">
                <img src={MOVIE_IMG} className="w-full h-full object-cover" alt="Незваный гость" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, #1A1535 100%)" }} />
              </div>
              <div className="p-6 -mt-20 relative">
                <div className="flex flex-col md:flex-row gap-6">
                  <img src={MOVIE_IMG} className="w-36 h-52 object-cover rounded-2xl shadow-2xl flex-shrink-0"
                    style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }} alt="Незваный гость" />
                  <div className="space-y-3 pt-20 md:pt-6">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#FCD34D", color: "#1A1535" }}>0+</span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: "rgba(255,255,255,0.15)" }}>2025</span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: "rgba(255,255,255,0.15)" }}>Анимация</span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: "rgba(255,255,255,0.15)" }}>Приключения</span>
                    </div>
                    <h1 className="font-fredoka text-4xl text-white">Геройчики. Незваный гость</h1>
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(s => <Icon key={s} name="Star" size={16} className="text-yellow-400" />)}
                      <span className="text-yellow-400 font-bold ml-1">9.1</span>
                      <span className="text-gray-400 text-sm ml-1">(156 отзывов)</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed max-w-2xl">
                      Рома планирует выступить на школьном конкурсе и показать огромный звездолёт, собранный из конструктора. Игрушка тут же привлекает внимание непрошеных гостей — таинственных космических пиратов. Друзьям Ромы — Пинки, Бублику, Генералу Де Кролю, Флаю, Глории, Ко-Ко и ящерице-ниндзя О-Раш — предстоит сразиться с пришельцами, проверить дружбу на прочность и поразмышлять о взаимопомощи, смелости и умении прощать.
                    </p>
                      <button className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all hover:scale-105"
                        style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}>
                        <Icon name="Heart" size={18} />
                        В избранное
                      </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Плеер */}
            <div className="rounded-3xl overflow-hidden" style={{ background: "#1A1535" }}>
              <div className="p-4 pb-0">
                <h2 className="font-fredoka text-xl text-white mb-3 flex items-center gap-2">
                  <Icon name="Play" size={20} />
                  Смотреть фильм
                </h2>
              </div>
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src="https://vk.com/video_ext.php?oid=791264953&id=456241390&hd=2&autoplay=0"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: "none" }}
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

        {/* ТВ-КАНАЛЫ */}
        {activeTab === "tv" && (
          <div className="animate-fade-in">
            <h2 className="font-fredoka text-3xl text-white mb-6 flex items-center gap-2">
              <span>📡</span> ТВ-каналы
            </h2>
            <div className="mb-4">
              <div className="flex items-center rounded-2xl px-4 py-3 gap-2 max-w-sm" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <Icon name="Search" size={16} className="text-gray-400" />
                <input
                  className="bg-transparent text-white placeholder-gray-400 text-sm outline-none flex-1 font-nunito"
                  placeholder="Найти канал..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {filteredChannels.map(ch => (
                <button key={ch.id}
                  className="flex flex-col items-center gap-3 p-4 rounded-2xl transition-all hover:scale-105 group"
                  style={{ background: "#1A1535", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110"
                    style={{ background: `${ch.color}20`, border: `2px solid ${ch.color}40` }}>
                    {ch.emoji}
                  </div>
                  <span className="text-white text-xs font-bold text-center leading-tight">{ch.name}</span>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: "rgba(124,58,237,0.3)", color: "#A78BFA" }}>
                    В эфире
                  </span>
                </button>
              ))}
              {filteredChannels.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400 text-lg">Канал не найден 😔</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Футер */}
      <footer className="relative z-10 mt-12 px-4 py-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="font-fredoka text-xl text-white mb-1">🚀 Поехали Кино</p>
        <p className="text-gray-500 text-xs">Онлайн кинотеатр • Всё для детей и семьи</p>
      </footer>
    </div>
  );
}