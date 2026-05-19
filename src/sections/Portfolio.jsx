import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { X, ExternalLink, ArrowUpRight } from "lucide-react";
import fashionShop from "../assets/portofolio-fasshionshop.png";
import fashionShopVideo from "../assets/fashion-store-ads.mp4";
import coffeeShop from "../assets/portofolio-coffeeshop.png";
import bakery from "../assets/portofolio-bakery-ecommerce.png";
import coffeshop from "../assets/portofolio-coffee-shop.mp4";
import furniture from "../assets/furniture.png";
import furnitureVideo from "../assets/furniture.mp4";
import konstruksi from "../assets/konstruksi.png";
import konstruksiVideo from "../assets/konstruksi.mp4";
import shoes from "../assets/shoes-store.png";
import shoesVideo from "../assets/shoes-store.mp4";
import fruit from "../assets/fruit.png";
import fruitVideo from "../assets/fruit.mp4";
import portofolio from "../assets/portofolio.png";
import portofolioVideo from "../assets/portofolio.mp4";
import bookingHotel from "../assets/booking-hotel.png";
import bookingHotelVideo from "../assets/booking-hotel.mp4";


// ============================================================
// DATA — Ganti nilai image/video sesuai file di folder /public
// ============================================================
const projectsData = [
  
  {
    title: "Fruit Shop Web App",
    category: "web",
    image: fruit,
    video: fruitVideo,
    desc: "Platform e-commerce untuk toko buah dengan desain menarik, fitur checkout yang mudah, dan integrasi payment gateway.",
    tech: ["React", "Node.js", "PostgreSQL"],
    year: "2025",
    link: "#",
  },
  {
    title: "Konstruksi Web App",
    category: "web",
    image: konstruksi,
    video: konstruksiVideo,
    desc: "Web konstruksi profesional untuk pembangunan rumah, gedung, dan berbagai proyek infrastruktur dengan kualitas terbaik, pengerjaan tepat waktu, serta desain modern yang sesuai kebutuhan Anda.",
    tech: ["Next.js", "Firebase", "Redux"],
    year: "2026",
    link: "#",
  },
  {
    title: "Ecommerce shoes store web app",
    category: "web",
    image: shoes,
    video: shoesVideo,
    desc: "Platform e-commerce untuk toko sepatu dengan desain menarik, fitur checkout yang mudah, dan integrasi payment gateway.",
    tech: ["React", "Node.js", "PostgreSQL"],
    year: "2025",
    link: "#",
  },
  {
    title: "Portofolio web app",
    category: "web",
    image: portofolio,      
    video: portofolioVideo,      
    desc: "Web portofolio profesional untuk menampilkan karya dan pengalaman Anda.",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    year: "2026",
    link: "#"
  },
  {
    title: "Booking Hotel web app",
    category: "web",
    image: bookingHotel,      
    video: bookingHotelVideo,      
    desc: "Web app booking hotel modern dengan tampilan premium, fitur pencarian yang mudah, dan pengalaman reservasi yang responsif untuk meningkatkan branding serta konversi penjualan.",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    year: "2026",
    link: "#",
  },
  {
    title: "Fashion Shop web app",
    category: "web",
    image: fashionShop,       
    video: fashionShopVideo,       
    desc: "Web app fashion modern dengan tampilan premium, animasi interaktif, dan pengalaman belanja yang responsif untuk meningkatkan branding serta konversi penjualan.",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    year: "2026",
    link: "#",
  },
  {
    title: "Coffee Shop Landing Page",
    category: "web",
    image: coffeeShop,      
    video: coffeshop,       
    desc: "Web app coffee shop modern dengan desain elegan, menu interaktif, dan nuansa premium untuk menghadirkan pengalaman digital yang hangat dan menarik bagi pelanggan.",
    tech: ["Next.js", "GSAP", "Sass"],
    year: "2026",
    link: "#",
  },
  {
    title: "Bakery E-commerce",
    category: "web",
    image: bakery,      
    video: "../assets/bakery-ecommerce.mp4",       
    desc: "Platform e-commerce untuk toko kue dengan desain menarik, fitur checkout yang mudah, dan integrasi payment gateway.Platform ecommerce bakery modern dengan tampilan manis dan elegan, dilengkapi katalog produk interaktif serta pengalaman pemesanan online yang cepat dan nyaman.",
    tech: ["React", "Node.js", "MongoDB"],
    year: "2026",
    link: "#",
  },
  {
    title: "Furniture Store Web App",
    category: "web",
    image: furniture,
    video: furnitureVideo,
    desc: "MabelFurniture Web App menghadirkan furniture modern dengan desain elegan, minimalis, dan berkualitas tinggi untuk menciptakan hunian yang nyaman dan berkelas.",
    tech: ["React", "Node.js", "MongoDB"],
    year: "2026",
    link: "#",
  }
];

const FILTERS = [
  { key: "all",    label: "All" },
  { key: "web",    label: "Web" },
  { key: "app",    label: "App" },
  { key: "design", label: "Design" },
  { key: "uiux",  label: "UI/UX" },
];

// ============================================================
// CARD
// ============================================================
function ProjectCard({ item, onClick, index }) {
  const videoRef = useRef(null);
  const hasVideo = Boolean(item.video);

  const handleMouseEnter = () => {
    if (hasVideo && videoRef.current) videoRef.current.play();
  };
  const handleMouseLeave = () => {
    if (hasVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer bg-white dark:bg-zinc-900 shadow-md hover:shadow-2xl transition-shadow duration-300"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`Lihat detail project ${item.title}`}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-[220px] overflow-hidden bg-zinc-200 dark:bg-zinc-800">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // Fallback placeholder jika file belum ada
            e.currentTarget.src = `https://dummyimage.com/600x400/1a1a2e/6c63ff&text=${encodeURIComponent(item.title)}`;
          }}
        />

        {/* Video overlay */}
        {hasVideo && (
          <video
            ref={videoRef}
            src={item.video}
            muted
            loop
            preload="none"
            playsInline
            title={`Preview video ${item.title}`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          />
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category badge */}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-white/10 backdrop-blur-sm text-white border border-white/20">
          {item.category}
        </span>

        {/* Arrow icon on hover */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <ArrowUpRight size={16} className="text-white" />
          </div>
        </div>

        {/* Title overlay on hover */}
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <p className="text-white font-bold text-lg leading-tight drop-shadow">{item.title}</p>
          <p className="text-white/70 text-xs mt-0.5">{item.year}</p>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-base text-zinc-800 dark:text-zinc-100">{item.title}</h3>
          <span className="text-xs text-zinc-400 dark:text-zinc-500 whitespace-nowrap">{item.year}</span>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-4">{item.desc}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// MODAL
// ============================================================
function Modal({ item, onClose }) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

          {/* Panel */}
          <motion.div
            className="relative bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.92, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Tutup modal"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              <X size={16} className="text-zinc-600 dark:text-zinc-300" />
            </button>

            {/* Media: video jika ada, fallback ke image */}
            {item.video ? (
              <video
                src={item.video}
                controls
                autoPlay
                muted
                className="w-full h-[260px] object-cover bg-zinc-900"
                title={`Video preview ${item.title}`}
                onError={(e) => e.currentTarget.style.display = "none"}
              />
            ) : (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[260px] object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://dummyimage.com/600x400/1a1a2e/6c63ff&text=${encodeURIComponent(item.title)}`;
                }}
              />
            )}

            {/* Content */}
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{item.title}</h3>
                <span className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">{item.year}</span>
              </div>
              <span className="inline-block px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-widest rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 mb-4">
                {item.category}
              </span>

              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5 leading-relaxed">{item.desc}</p>

              {/* Tech stack */}
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-emerald-400 text-white hover:opacity-90 transition-opacity"
              >
                Visit Project
                <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// MAIN SECTION
// ============================================================
function Portfolio() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered =
    filter === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="py-24 px-6 bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500 mb-3">What I've Built</p>
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
        </motion.div>

        {/* Filter */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap" role="group" aria-label="Filter kategori project">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === f.key
                  ? "bg-gradient-to-r from-blue-500 to-emerald-400 text-white shadow-md shadow-blue-500/20"
                  : "bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:border-blue-400 dark:hover:border-blue-500"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((item, i) => (
                <ProjectCard
                  key={item.title}
                  item={item}
                  index={i}
                  onClick={() => setSelected(item)}
                />
              ))
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-3 text-center py-20 text-zinc-400 dark:text-zinc-600"
              >
                <p className="text-4xl mb-3">🗂️</p>
                <p className="text-base font-medium">Belum ada project di kategori ini.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <Modal item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

export default Portfolio;