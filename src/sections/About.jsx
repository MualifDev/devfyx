import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Code2, Smartphone, Palette, Globe,
  Zap, ShieldCheck, HeartHandshake, TrendingUp,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { end: 50,  suffix: "+", label: "Project Selesai",  color: "from-blue-500 to-cyan-400" },
  { end: 20,  suffix: "+", label: "Klien Puas",       color: "from-emerald-500 to-teal-400" },
  { end: 2,   suffix: "+", label: "Tahun Berpengalaman", color: "from-violet-500 to-blue-400" },
  { end: 100, suffix: "%", label: "Komitmen Quality", color: "from-orange-500 to-amber-400" },
];

const TECH_STACK = [
  { label: "React",       color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20" },
  { label: "Next.js",     color: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-300 border-zinc-500/20" },
  { label: "Node.js",     color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  { label: "Tailwind CSS",color: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20" },
  { label: "MongoDB",     color: "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" },
  { label: "Express.js",  color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border-yellow-500/20" },
  { label: "Figma",       color: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20" },
  { label: "Firebase",    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20" },
];

const TIMELINE = [
  {
    year: "2023",
    title: "DevFyx Berdiri",
    desc: "Dimulai dari proyek freelance kecil-kecilan, fokus pada pembuatan website untuk UMKM lokal.",
  },
  {
    year: "2024",
    title: "Berkembang & Skala",
    desc: "Mulai menangani klien lebih besar, membangun tim kecil, dan memperluas layanan ke aplikasi fullstack.",
  },
  {
    year: "2025",
    title: "Full Digital Studio",
    desc: "DevFyx resmi menjadi studio digital lengkap — dari UI/UX, web app, hingga solusi sistem enterprise.",
  },
];

const VALUES = [
  { icon: Zap,           title: "Fast Delivery",    desc: "Pengerjaan tepat waktu tanpa kompromi kualitas." },
  { icon: ShieldCheck,   title: "Kualitas Terjamin", desc: "Setiap baris kode ditulis dengan standar produksi." },
  { icon: HeartHandshake,title: "Client First",     desc: "Kepuasan klien adalah prioritas utama kami." },
  { icon: TrendingUp,    title: "Scalable",         desc: "Solusi yang tumbuh seiring bisnis kamu berkembang." },
];

// ─── Animated Counter ─────────────────────────────────────────────────────────
function Counter({ end, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function About() {
  return (
    <section
      id="about"
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
      <div className="absolute top-[-80px] right-[-80px] w-[500px] h-[500px]
        bg-blue-400/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-60px] left-[-60px] w-[400px] h-[400px]
        bg-emerald-400/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        {/* ── Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500 mb-3">
            Siapa Kami
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100">
            Tentang{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              DevFyx
            </span>
          </h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-sm md:text-base">
            Studio digital kecil yang bergerak cepat — kami bantu bisnis kamu hadir secara digital dengan solusi yang benar-benar bekerja.
          </p>
        </motion.div>

        {/* ── Main Grid: Visual + Text ───────────────────────── */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">

          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Code card mockup */}
            <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800
              shadow-2xl shadow-zinc-200/50 dark:shadow-black/50 bg-zinc-900">

              {/* Window bar */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-zinc-700/50 bg-zinc-800/80">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs text-zinc-500 font-mono">devfyx — main.jsx</span>
              </div>

              {/* Fake code */}
              <div className="p-6 font-mono text-xs leading-relaxed text-zinc-300">
                <p><span className="text-pink-400">import</span> <span className="text-cyan-300">DevFyx</span> <span className="text-pink-400">from</span> <span className="text-amber-300">'./studio'</span></p>
                <br />
                <p><span className="text-blue-400">const</span> <span className="text-cyan-300">project</span> <span className="text-zinc-400">= {"{"}</span></p>
                <p className="pl-4"><span className="text-emerald-400">client</span><span className="text-zinc-400">:</span> <span className="text-amber-300">'Bisnis Kamu'</span><span className="text-zinc-400">,</span></p>
                <p className="pl-4"><span className="text-emerald-400">goal</span><span className="text-zinc-400">:</span> <span className="text-amber-300">'Hadir Online'</span><span className="text-zinc-400">,</span></p>
                <p className="pl-4"><span className="text-emerald-400">stack</span><span className="text-zinc-400">: [</span><span className="text-amber-300">'React'</span><span className="text-zinc-400">, </span><span className="text-amber-300">'Node'</span><span className="text-zinc-400">, </span><span className="text-amber-300">'...'</span><span className="text-zinc-400">],</span></p>
                <p className="pl-4"><span className="text-emerald-400">quality</span><span className="text-zinc-400">:</span> <span className="text-blue-400">true</span><span className="text-zinc-400">,</span></p>
                <p><span className="text-zinc-400">{"}"}</span></p>
                <br />
                <p><span className="text-blue-400">const</span> <span className="text-cyan-300">result</span> <span className="text-zinc-400">=</span> <span className="text-pink-400">await</span> <span className="text-cyan-300">DevFyx</span><span className="text-zinc-400">.</span><span className="text-yellow-300">build</span><span className="text-zinc-400">(project)</span></p>
                <br />
                <p><span className="text-zinc-500">{"// ✅ Your digital presence is live!"}</span></p>
                <p className="mt-2 flex items-center gap-1">
                  <span className="inline-block w-2 h-4 bg-blue-400 animate-[blink_1s_step-end_infinite] rounded-sm" />
                </p>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 -right-5 px-4 py-3 rounded-2xl
                bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700
                shadow-xl shadow-zinc-200/40 dark:shadow-black/40"
            >
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-0.5">Rating Klien</p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
                <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100 ml-1">5.0</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                <span className="font-semibold text-zinc-800 dark:text-zinc-100">DevFyx</span> adalah startup digital yang fokus membantu bisnis — dari UMKM hingga perusahaan — untuk tumbuh lewat teknologi yang tepat sasaran.
              </p>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                Kami bukan agensi besar dengan birokrasi panjang. Kami tim kecil yang bergerak cepat, komunikatif, dan selalu menempatkan kepentingan klien di atas segalanya.
              </p>
            </div>

            {/* Value props */}
            <div className="grid grid-cols-2 gap-3">
              {VALUES.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="p-4 rounded-xl bg-white dark:bg-zinc-900
                    border border-zinc-200 dark:border-zinc-800
                    hover:border-blue-400/50 dark:hover:border-blue-500/50
                    transition-colors duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-400
                    flex items-center justify-center mb-2">
                    <Icon size={14} className="text-white" />
                  </div>
                  <p className="text-xs font-bold text-zinc-800 dark:text-zinc-100 mb-1">{title}</p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Stats ──────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white dark:bg-zinc-900
                border border-zinc-200 dark:border-zinc-800
                shadow-sm hover:shadow-md transition-shadow"
            >
              <p className={`text-3xl font-extrabold bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>
                <Counter end={s.end} suffix={s.suffix} />
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Tech Stack ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-6">
            Tech Stack yang Kami Gunakan
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {TECH_STACK.map((tech, i) => (
              <motion.span
                key={tech.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`px-4 py-2 rounded-full text-xs font-semibold border ${tech.color} backdrop-blur-sm`}
              >
                {tech.label}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ── Timeline ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400 mb-10">
            Perjalanan Kami
          </p>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px
              bg-gradient-to-b from-blue-400 via-emerald-400 to-transparent
              hidden md:block" />

            <div className="flex flex-col gap-8">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className={`relative flex flex-col md:flex-row items-center gap-6
                    ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Card */}
                  <div className="flex-1 p-5 rounded-2xl bg-white dark:bg-zinc-900
                    border border-zinc-200 dark:border-zinc-800 shadow-sm
                    hover:border-blue-400/50 dark:hover:border-blue-500/40
                    transition-colors duration-200">
                    <p className={`text-xs font-bold uppercase tracking-widest mb-1
                      bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent`}>
                      {item.year}
                    </p>
                    <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex w-4 h-4 rounded-full shrink-0
                    bg-gradient-to-br from-blue-400 to-emerald-400
                    ring-4 ring-gray-50 dark:ring-zinc-950 z-10" />

                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}