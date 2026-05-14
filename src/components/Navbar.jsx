import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

const MENU_ITEMS = [
  { id: "home",      label: "Beranda" },
  { id: "about",     label: "Tentang" },
  { id: "services",  label: "Layanan" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact",   label: "Kontak" },
];

const WA_LINK = "https://wa.me/6283169821525";

export default function Navbar({ dark, setDark }) {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active, setActive]       = useState("home");
  const [scrolled, setScrolled]   = useState(false);

  // ── Active section detection on scroll ──────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const scrollY = window.scrollY;
      const ids = MENU_ITEMS.map((m) => m.id);

      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && scrollY >= el.offsetTop - 140) {
          setActive(ids[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Close mobile menu on outside click (backdrop only) ──────
  // Handled by backdrop overlay onClick — no ref needed

  // ── Lock body scroll when mobile menu open ───────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <>
      {/* ── Main Navbar ─────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
          ${scrolled
            ? "bg-white/80 dark:bg-zinc-950/90 backdrop-blur-xl shadow-sm shadow-zinc-200/50 dark:shadow-black/40 border-b border-zinc-200/60 dark:border-zinc-800/60"
            : "bg-transparent border-b border-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-6">

          {/* Logo */}
          <button
            onClick={() => scrollTo("home")}
            aria-label="DevFyx — kembali ke beranda"
            className="shrink-0 focus:outline-none"
          >
            <img
              src={logo}
              alt="DevFyx"
              className="h-8 dark:brightness-0 dark:invert transition-all"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </button>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1" role="menubar">
            {MENU_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} role="none">
                  <button
                    role="menuitem"
                    onClick={() => scrollTo(item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${isActive
                        ? "text-zinc-900 dark:text-zinc-50"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                      }`}
                  >
                    {/* Active pill background */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-zinc-100 dark:bg-zinc-800"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}

                    {/* Label */}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {item.label}
                      {/* Active dot */}
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400" />
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right side actions */}
          <div className="flex items-center gap-2 shrink-0">

            {/* Dark mode toggle */}
            <button
              onClick={() => setDark(!dark)}
              aria-label={dark ? "Aktifkan light mode" : "Aktifkan dark mode"}
              className="w-9 h-9 flex items-center justify-center rounded-lg
                text-zinc-500 dark:text-zinc-400
                hover:bg-zinc-100 dark:hover:bg-zinc-800
                hover:text-zinc-800 dark:hover:text-zinc-200
                transition-all duration-200"
            >
              <AnimatePresence mode="wait">
                {dark ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={18} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* CTA Button — desktop only */}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mulai project bersama DevFyx"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg
                bg-gradient-to-r from-blue-500 to-emerald-400
                text-white text-sm font-semibold
                shadow-md shadow-blue-500/20
                hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.03]
                active:scale-[0.97] transition-all duration-200"
            >
              <MessageCircle size={14} />
              Mulai Project
            </a>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg
                text-zinc-600 dark:text-zinc-300
                hover:bg-zinc-100 dark:hover:bg-zinc-800
                transition-all duration-200"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={20} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={20} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

          </div>
        </div>

        {/* ── Mobile Menu ───────────────────────────────────── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden
                bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl
                border-t border-zinc-200/60 dark:border-zinc-800/60"
            >
              <div className="px-5 py-4 flex flex-col gap-1">
                {MENU_ITEMS.map((item, i) => {
                  const isActive = active === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                      onClick={() => scrollTo(item.id)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium text-left
                        transition-all duration-200
                        ${isActive
                          ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                          : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-800 dark:hover:text-zinc-200"
                        }`}
                    >
                      {item.label}
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400" />
                      )}
                    </motion.button>
                  );
                })}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: MENU_ITEMS.length * 0.05 + 0.05 }}
                  className="mt-2 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60"
                >
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Mulai project bersama DevFyx via WhatsApp"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl
                      bg-gradient-to-r from-blue-500 to-emerald-400
                      text-white text-sm font-semibold
                      shadow-md shadow-blue-500/20
                      hover:opacity-90 active:scale-[0.98]
                      transition-all duration-200"
                  >
                    <MessageCircle size={15} />
                    Mulai Project
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Mobile backdrop overlay ──────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] md:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}