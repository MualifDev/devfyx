import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

// ─── Data placeholder — ganti dengan data klien asli ─────────────────────────
const TESTIMONIALS = [
  {
    id: 1,
    name: "Budi Santoso",                          // ← ganti nama klien
    role: "Owner",                                  // ← ganti jabatan
    company: "UD. Maju Jaya",                       // ← ganti nama bisnis
    avatar: "/testimonials/budi.jpg",               // ← ganti path foto (taruh di /public/testimonials/)
    rating: 5,
    review:
      "DevFyx benar-benar ngerti kebutuhan bisnis gue. Website company profile yang mereka buat tampil profesional dan loading-nya super cepat. Klien-klien gue langsung kasih feedback positif setelah liat website barunya!",
    project: "Company Profile",
    gradient: "from-blue-500/10 to-cyan-400/5",
    accent: "bg-blue-500",
  },
  {
    id: 2,
    name: "Sari Dewi",                             // ← ganti nama klien
    role: "Founder & CEO",                          // ← ganti jabatan
    company: "Toko Cantik Online",                  // ← ganti nama bisnis
    avatar: "/testimonials/sari.jpg",               // ← ganti path foto
    rating: 5,
    review:
      "Awalnya ragu karena budget terbatas, tapi DevFyx kasih solusi yang pas banget. Prosesnya transparan, komunikasi lancar, dan hasilnya melebihi ekspektasi. Sangat recommended untuk UMKM yang mau go digital!",
    project: "Web Application",
    gradient: "from-emerald-500/10 to-teal-400/5",
    accent: "bg-emerald-500",
  },
  {
    id: 3,
    name: "Rizky Pratama",                         // ← ganti nama klien
    role: "Marketing Manager",                      // ← ganti jabatan
    company: "PT. Solusi Digital",                  // ← ganti nama bisnis
    avatar: "/testimonials/rizky.jpg",              // ← ganti path foto
    rating: 5,
    review:
      "Tim DevFyx responsif dan selalu update progress pengerjaan. Desainnya modern, mobile-friendly, dan SEO-nya udah dioptimasi. Traffic website kami naik signifikan dalam 2 bulan pertama setelah launch!",
    project: "UI/UX Design",
    gradient: "from-violet-500/10 to-purple-400/5",
    accent: "bg-violet-500",
  },
];

// ─── Avatar with fallback initials ───────────────────────────────────────────
function Avatar({ src, name, accent }) {
  const [errored, setErrored] = useState(false);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (errored || !src) {
    return (
      <div
        className={`w-14 h-14 rounded-2xl ${accent} flex items-center justify-center
          text-white font-bold text-lg shrink-0 shadow-lg`}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setErrored(true)}
      className="w-14 h-14 rounded-2xl object-cover shrink-0 shadow-lg"
    />
  );
}

// ─── Star rating ──────────────────────────────────────────────────────────────
function StarRating({ count = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(count)].map((_, i) => (
        <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const autoRef = useRef(null);

  const total = TESTIMONIALS.length;

  const go = (idx, dir) => {
    setDirection(dir);
    setCurrent((idx + total) % total);
    resetAuto();
  };

  const next = () => go(current + 1, 1);
  const prev = () => go(current - 1, -1);

  // Auto-advance every 5s
  const resetAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 5000);
  };

  useEffect(() => {
    autoRef.current = setInterval(next, 5000);
    return () => clearInterval(autoRef.current);
  }, [current]);

  const item = TESTIMONIALS[current];

  const variants = {
    enter:  (d) => ({ x: d > 0 ? 60 : -60, opacity: 0, scale: 0.97 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit:   (d) => ({ x: d > 0 ? -60 : 60, opacity: 0, scale: 0.97 }),
  };

  return (
    <section
      id="testimonials"
      className="relative py-24 px-6 overflow-hidden bg-gray-50 dark:bg-zinc-950"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(99,102,241,0.08) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute top-0 right-0 w-[500px] h-[400px]
        bg-gradient-to-bl from-blue-400/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px]
        bg-gradient-to-tr from-emerald-400/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500 mb-3">
            Kata Mereka
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100">
            Klien yang{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Puas
            </span>
          </h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-md mx-auto text-sm">
            Kepercayaan klien adalah bukti nyata kualitas kerja kami.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={item.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className={`relative rounded-3xl p-8 md:p-10 overflow-hidden
                bg-white dark:bg-zinc-900
                border border-zinc-200/80 dark:border-zinc-800
                shadow-xl shadow-zinc-200/40 dark:shadow-black/40`}
            >
              {/* Gradient tint per testimonial */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} pointer-events-none`} />

              {/* Quote icon */}
              <div className="absolute top-6 right-8 opacity-10 dark:opacity-5">
                <Quote size={80} className="text-blue-500 fill-blue-500" />
              </div>

              <div className="relative z-10 flex flex-col gap-6">

                {/* Stars + project tag */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <StarRating count={item.rating} />
                  <span className={`px-3 py-1 rounded-full text-[11px] font-semibold
                    text-white ${item.accent} shadow-sm`}>
                    {item.project}
                  </span>
                </div>

                {/* Review text */}
                <blockquote className="text-zinc-700 dark:text-zinc-200 text-base md:text-lg
                  leading-relaxed font-medium">
                  "{item.review}"
                </blockquote>

                {/* Divider */}
                <div className="h-px bg-zinc-100 dark:bg-zinc-800" />

                {/* Client info */}
                <div className="flex items-center gap-4">
                  <Avatar src={item.avatar} name={item.name} accent={item.accent} />
                  <div>
                    <p className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                      {item.name}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      {item.role} · {item.company}
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next buttons */}
          <button
            onClick={prev}
            aria-label="Testimoni sebelumnya"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5
              w-10 h-10 rounded-full
              bg-white dark:bg-zinc-900
              border border-zinc-200 dark:border-zinc-700
              shadow-md flex items-center justify-center
              text-zinc-500 dark:text-zinc-400
              hover:text-blue-500 dark:hover:text-blue-400
              hover:border-blue-400 dark:hover:border-blue-500
              transition-all duration-200 hover:scale-110
              hidden md:flex"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={next}
            aria-label="Testimoni berikutnya"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5
              w-10 h-10 rounded-full
              bg-white dark:bg-zinc-900
              border border-zinc-200 dark:border-zinc-700
              shadow-md flex items-center justify-center
              text-zinc-500 dark:text-zinc-400
              hover:text-blue-500 dark:hover:text-blue-400
              hover:border-blue-400 dark:hover:border-blue-500
              transition-all duration-200 hover:scale-110
              hidden md:flex"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > current ? 1 : -1)}
              aria-label={`Testimoni ${i + 1}`}
              className={`transition-all duration-300 rounded-full
                ${i === current
                  ? "w-6 h-2 bg-gradient-to-r from-blue-500 to-emerald-400"
                  : "w-2 h-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-500"
                }`}
            />
          ))}
        </div>

        {/* Mobile swipe hint */}
        <div className="flex justify-center gap-3 mt-6 md:hidden">
          <button
            onClick={prev}
            aria-label="Sebelumnya"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium
              bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700
              text-zinc-500 dark:text-zinc-400 shadow-sm
              hover:border-blue-400 dark:hover:border-blue-500 transition-all"
          >
            <ChevronLeft size={14} /> Sebelumnya
          </button>
          <button
            onClick={next}
            aria-label="Berikutnya"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium
              bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700
              text-zinc-500 dark:text-zinc-400 shadow-sm
              hover:border-blue-400 dark:hover:border-blue-500 transition-all"
          >
            Berikutnya <ChevronRight size={14} />
          </button>
        </div>

        {/* Bottom trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6
            py-5 px-8 rounded-2xl
            bg-white dark:bg-zinc-900
            border border-zinc-200/80 dark:border-zinc-800
            shadow-sm"
        >
          {[
            { value: "20+", label: "Klien Puas" },
            { value: "5.0", label: "Rating Rata-rata" },
            { value: "100%", label: "Proyek Selesai Tepat Waktu" },
          ].map(({ value, label }, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <p className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-emerald-400
                bg-clip-text text-transparent">
                {value}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}