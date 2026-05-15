import { motion } from "framer-motion";
import { Check, Zap, Rocket, Building2, Gift, ArrowRight, MessageCircle } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────
const packages = [
  {
    id: "free",
    icon: Gift,
    name: "Gratis",
    tagline: "Company Profile / Portfolio",
    price: "FREE",
    priceNote: "Terbatas — hanya tersisa beberapa slot!",
    urgent: true,
    accentFrom: "#f97316",
    accentTo: "#ef4444",
    accentClass: "from-orange-500 to-red-500",
    badgeText: "🔥 LIMITED SLOT",
    badgeBg: "bg-orange-500",
    ctaText: "Klaim Sekarang",
    ctaStyle: "bg-gradient-to-r from-orange-500 to-red-500 text-white",
    desc: "Cocok untuk UMKM, freelancer, atau bisnis yang baru mulai online. Gratis tanpa syarat tersembunyi.",
    features: [
      "1 Landing Page Premium Design",
      "Fully Responsive (Mobile Friendly)",
      "Modern UI/UX Design",
      "Basic SEO Optimization",
      "Fast Loading Performance",
      "Free Konsultasi",
      "Free Revisi 1x",
      "Deploy Online (bisa diakses publik)",
    ],
  },
  {
    id: "basic",
    icon: Zap,
    name: "Basic",
    tagline: "Website Sederhana",
    price: "Rp 500.000",
    priceNote: "Harga mulai dari",
    urgent: false,
    accentFrom: "#3b82f6",
    accentTo: "#06b6d4",
    accentClass: "from-blue-500 to-cyan-400",
    badgeText: null,
    ctaText: "Pilih Basic",
    ctaStyle: "bg-gradient-to-r from-blue-500 to-cyan-400 text-white",
    desc: "Ideal untuk bisnis yang butuh kehadiran online yang cepat, clean, dan profesional.",
    features: [
      "1 Landing Page",
      "Responsive Design",
      "Basic SEO",
      "Fast Performance",
      "Revisi 2x",
      "Free Domain .site / .web.id (1 tahun)",
      "Free Hosting (1 tahun)",
      "Garansi 30 hari",
    ],
  },
  {
    id: "pro",
    icon: Rocket,
    name: "Pro",
    tagline: "Website Multi Page",
    price: "Rp 1.500.000",
    priceNote: "Harga mulai dari",
    urgent: false,
    best: true,
    accentFrom: "#10b981",
    accentTo: "#3b82f6",
    accentClass: "from-emerald-400 to-blue-500",
    badgeText: "⭐ BEST SELLER",
    badgeBg: "bg-emerald-500",
    ctaText: "Pilih Pro",
    ctaStyle: "bg-gradient-to-r from-emerald-400 to-blue-500 text-white",
    desc: "Untuk bisnis yang serius. Multi halaman, desain custom, dan fitur interaktif lengkap.",
    features: [
      "Multi Page Website (up to 8 halaman)",
      "Custom Design System",
      "SEO Optimization Lanjutan",
      "Contact Form + WhatsApp Integration",
      "Fast + Secure (SSL)",
      "Revisi 5x",
      "Free Domain .com (1 tahun)",
      "Free Hosting Premium (1 tahun)",
      "Priority Support 3 bulan",
      "Google Analytics Integration",
    ],
  },
  {
    id: "enterprise",
    icon: Building2,
    name: "Enterprise",
    tagline: "Sistem Custom Full",
    price: "Custom",
    priceNote: "Konsultasi gratis terlebih dahulu",
    urgent: false,
    accentFrom: "#8b5cf6",
    accentTo: "#ec4899",
    accentClass: "from-violet-500 to-pink-500",
    badgeText: null,
    ctaText: "Konsultasi Gratis",
    ctaStyle: "bg-gradient-to-r from-violet-500 to-pink-500 text-white",
    desc: "Untuk perusahaan yang butuh solusi digital skala besar — dari dashboard, sistem internal, hingga aplikasi.",
    features: [
      "Full Custom Web / App System",
      "Dashboard & Admin Panel",
      "REST API / Third-party Integration",
      "Scalable Architecture",
      "Database Design & Optimization",
      "Role-based Access Control",
      "Unlimited Revisi (scope agreed)",
      "Dedicated Project Manager",
      "Priority Support 12 bulan",
      "NDA & Kontrak Resmi",
    ],
  },
];

const WA_LINK = "https://wa.me/6283169821525";

// ─── Urgency Pulse Badge ──────────────────────────────────────────────────────
function UrgencyBadge() {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500" />
      </span>
      <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">
        Slot hampir habis!
      </span>
    </div>
  );
}

// ─── Single Pricing Card ──────────────────────────────────────────────────────
function PricingCard({ pkg, index }) {
  const Icon = pkg.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col rounded-2xl overflow-hidden
        ${pkg.best
          ? "ring-2 ring-emerald-400/60 dark:ring-emerald-400/40 shadow-2xl shadow-emerald-500/10"
          : "ring-1 ring-zinc-200 dark:ring-zinc-800 shadow-lg"
        }
        bg-white dark:bg-zinc-900
      `}
    >
      {/* Top gradient bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${pkg.accentClass}`} />

      {/* Badge */}
      {pkg.badgeText && (
        <div className={`absolute top-4 right-4 text-[11px] font-bold px-3 py-1 rounded-full text-white ${pkg.badgeBg || "bg-zinc-700"} shadow-md`}>
          {pkg.badgeText}
        </div>
      )}

      <div className="p-7 flex flex-col flex-1">

        {/* Icon + name */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pkg.accentClass} flex items-center justify-center shadow-md`}>
            <Icon size={18} className="text-white" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              {pkg.tagline}
            </p>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
              {pkg.name}
            </h3>
          </div>
        </div>

        {/* Urgency */}
        {pkg.urgent && <UrgencyBadge />}

        {/* Price */}
        <div className="mb-3">
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mb-0.5">{pkg.priceNote}</p>
          <p className={`text-3xl font-extrabold bg-gradient-to-r ${pkg.accentClass} bg-clip-text text-transparent`}>
            {pkg.price}
          </p>
        </div>

        {/* Desc */}
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5 leading-relaxed">
          {pkg.desc}
        </p>

        {/* Divider */}
        <div className="h-px bg-zinc-100 dark:bg-zinc-800 mb-5" />

        {/* Features */}
        <ul className="space-y-2.5 mb-7 flex-1">
          {pkg.features.map((f, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-300">
              <span className={`mt-0.5 shrink-0 w-4 h-4 rounded-full bg-gradient-to-br ${pkg.accentClass} flex items-center justify-center`}>
                <Check size={10} className="text-white" strokeWidth={3} />
              </span>
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${pkg.ctaText} — DevFyx paket ${pkg.name}`}
          className={`group flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold
            transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]
            shadow-md ${pkg.ctaStyle}`}
        >
          <MessageCircle size={15} />
          {pkg.ctaText}
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </a>

      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function Services() {
  return (
    <section
      id="services"
      className="relative py-24 px-6 overflow-hidden bg-gray-50 dark:bg-zinc-950"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(99,102,241,0.08) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px]
        bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500 mb-3">
            Layanan & Harga
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100">
            Paket{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Harga Kami
            </span>
          </h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-sm md:text-base">
            Transparan, terjangkau, dan disesuaikan dengan kebutuhan bisnis kamu — dari skala kecil hingga enterprise.
          </p>
        </motion.div>

        {/* Grid — 2 col on md, 4 col on xl */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {packages.map((pkg, i) => (
            <PricingCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-zinc-400 dark:text-zinc-600 mt-10"
        >
          Semua paket sudah termasuk konsultasi awal gratis. Punya kebutuhan khusus?{" "}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline font-medium"
          >
            Hubungi kami langsung →
          </a>
        </motion.p>

      </div>
    </section>
  );
}