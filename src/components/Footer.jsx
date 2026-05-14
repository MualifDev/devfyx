import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Mail, MessageCircle,
  ArrowUpRight, ArrowUp, MapPin, Clock,
} from "lucide-react";
import logo from "../assets/logo.png";

// ─── Custom SVG Social Icons (lucide-react tidak support icon brand) ──────────
const GithubIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.99 3.23 9.22 7.71 10.72.56.1.77-.24.77-.54v-1.88c-3.14.68-3.8-1.52-3.8-1.52-.51-1.29-1.25-1.63-1.25-1.63-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1 1.63-.78 2.02-1.22.1-.72.39-1.22.7-1.5-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.08 1.16a10.7 10.7 0 015.6 0c2.14-1.46 3.08-1.16 3.08-1.16.61 1.53.23 2.67.11 2.95.72.79 1.16 1.8 1.16 3.03 0 4.33-2.63 5.28-5.14 5.56.4.34.76 1 .76 2.03v3.01c0 .3.2.65.78.54 4.48-1.5 7.7-5.73 7.7-10.72C23.25 5.48 18.27.5 12 .5z"/>
  </svg>
);

const InstagramIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5A3.75 3.75 0 0020 16.25v-8.5A3.75 3.75 0 0016.25 4h-8.5zm4.25 3.25a4.75 4.75 0 110 9.5 4.75 4.75 0 010-9.5zm0 2a2.75 2.75 0 100 5.5 2.75 2.75 0 000-5.5zm5.25-.75a1 1 0 110 2 1 1 0 010-2z"/>
  </svg>
);

const LinkedinIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.16h.05c.53-1 1.84-2.16 3.78-2.16C20.22 8 22 10.13 22 14.14V24h-4v-8.45c0-2.02-.04-4.62-2.82-4.62-2.82 0-3.25 2.2-3.25 4.47V24h-4V8z"/>
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Beranda",   href: "#home" },
  { label: "Tentang",   href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Layanan",   href: "#services" },
  { label: "Kontak",    href: "#contact" },
];

const SERVICES = [
  { label: "Company Profile",   href: "#services" },
  { label: "Web Application",   href: "#services" },
  { label: "UI/UX Design",      href: "#services" },
  { label: "Paket Enterprise",  href: "#services" },
  { label: "Konsultasi Gratis", href: "#contact" },
];

const CONTACTS = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+62 831-6982-1525",
    href: "https://wa.me/6283169821525",
  },
  {
    icon: Mail,
    label: "Email",
    value: "devfyx@gmail.com",        // ← sesuaikan
    href: "mailto:devfyx@gmail.com",
  },
  {
    icon: MapPin,
    label: "Lokasi",
    value: "Indonesia 🇮🇩",
    href: null,
  },
  {
    icon: Clock,
    label: "Jam Kerja",
    value: "Senin–Sabtu, 09.00–21.00",
    href: null,
  },
];

const SOCIALS = [
  {
    icon: GithubIcon,
    label: "GitHub",
    href: "https://github.com/MualifDev",
    hoverColor: "hover:bg-zinc-700 hover:text-white hover:border-zinc-600",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    href: "https://www.instagram.com/mualif.dev/",
    hoverColor: "hover:bg-pink-500 hover:text-white hover:border-pink-400",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    href: "https://linkedin.com/in/devfyx",  // ← sesuaikan
    hoverColor: "hover:bg-blue-600 hover:text-white hover:border-blue-500",
  },
];

const WA_LINK = "https://wa.me/6283169821525";

// ─── Back to Top ──────────────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="btt"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Kembali ke atas"
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full
            bg-gradient-to-br from-blue-500 to-emerald-400
            flex items-center justify-center
            shadow-lg shadow-blue-500/30
            hover:scale-110 active:scale-95
            transition-transform duration-200"
        >
          <ArrowUp size={18} className="text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl
      bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500
      px-8 py-10 text-center"
    >
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 mb-2">
          Siap Memulai?
        </p>
        <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
          Wujudkan Ide Digital Kamu Bersama DevFyx
        </h3>
        <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">
          Konsultasi gratis, tanpa komitmen. Kami siap bantu dari nol sampai launch.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat DevFyx via WhatsApp"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
              bg-white text-blue-600 text-sm font-bold
              hover:bg-blue-50 hover:scale-[1.03]
              active:scale-[0.97] transition-all duration-200
              shadow-lg shadow-black/10"
          >
            <MessageCircle size={15} />
            Chat WhatsApp
          </a>
          <a
            href="#contact"
            aria-label="Kirim pesan ke DevFyx"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
              bg-white/15 border border-white/30 text-white text-sm font-semibold
              hover:bg-white/25 hover:scale-[1.03]
              active:scale-[0.97] transition-all duration-200 backdrop-blur-sm"
          >
            Kirim Pesan
            <ArrowUpRight size={14} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Footer ──────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <>
      <BackToTop />

      <footer className="relative overflow-hidden bg-zinc-950">

        {/* Top gradient line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

        {/* Dot texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px]
          bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-8">

          {/* CTA Banner */}
          <div className="mb-16">
            <CTABanner />
          </div>

          {/* 4-column grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

            {/* Brand */}
            <div className="lg:col-span-1">
              <a href="#home" aria-label="DevFyx - kembali ke beranda">
                <img
                  src={logo}
                  alt="DevFyx Logo"
                  className="h-8 mb-4 brightness-0 invert opacity-90"
                />
              </a>
              <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                Studio digital yang membantu bisnis hadir online dengan solusi modern, cepat, dan terjangkau.
              </p>
              <div className="flex gap-2">
                {SOCIALS.map(({ icon: Icon, label, href, hoverColor }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`DevFyx di ${label}`}
                    className={`w-9 h-9 rounded-lg border border-zinc-700
                      flex items-center justify-center
                      text-zinc-400 bg-zinc-900
                      transition-all duration-200 hover:scale-110 ${hoverColor}`}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigasi */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 mb-5">
                Navigasi
              </h3>
              <ul className="space-y-3">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="group flex items-center gap-1.5 text-sm text-zinc-400
                        hover:text-white transition-colors duration-200"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-blue-400
                        transition-all duration-200 overflow-hidden" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Layanan */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 mb-5">
                Layanan
              </h3>
              <ul className="space-y-3">
                {SERVICES.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="group flex items-center gap-1.5 text-sm text-zinc-400
                        hover:text-white transition-colors duration-200"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-emerald-400
                        transition-all duration-200 overflow-hidden" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kontak */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-zinc-500 mb-5">
                Kontak
              </h3>
              <ul className="space-y-3">
                {CONTACTS.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-2.5">
                    <Icon size={14} className="text-zinc-500 shrink-0 mt-0.5" />
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        aria-label={`${label} DevFyx`}
                        className="text-sm text-zinc-400 hover:text-white transition-colors duration-200 leading-snug"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="text-sm text-zinc-400 leading-snug">{value}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-zinc-800/80 mb-6" />

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-zinc-600">
              © {new Date().getFullYear()} DevFyx. All rights reserved.
            </p>
            <p className="text-xs text-zinc-600 flex items-center gap-1">
              Dibuat dengan
              <span className="text-red-500 mx-0.5">♥</span>
              oleh tim
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 font-medium transition-colors ml-1"
              >
                DevFyx
              </a>
            </p>
          </div>

        </div>
      </footer>
    </>
  );
}