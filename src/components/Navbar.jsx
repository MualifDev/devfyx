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
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive]     = useState("home");
  const [scrolled, setScrolled] = useState(false);

  // ── Detect active section on scroll ─────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const scrollY = window.scrollY;
      for (let i = MENU_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(MENU_ITEMS[i].id);
        if (el && scrollY >= el.offsetTop - 140) {
          setActive(MENU_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Lock body scroll when mobile menu is open ────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ── Scroll to section ────────────────────────────────────────
  const handleNavClick = (id) => {
    setMenuOpen(false);
    // small timeout so menu closes before scroll fires
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <>
      {/* ── Navbar ───────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
          ${scrolled
            ? "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl shadow-sm border-b border-zinc-200/60 dark:border-zinc-800/60"
            : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-4">

          {/* Logo */}
          <button
            onClick={() => handleNavClick("home")}
            aria-label="Kembali ke beranda"
            className="shrink-0 focus:outline-none"
          >
            <img
              src={logo}
              alt="DevFyx"
              className="h-8 dark:brightness-0 dark:invert transition-all"
            />
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {MENU_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${isActive
                        ? "text-zinc-900 dark:text-zinc-50"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                      }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="pill"
                        className="absolute inset-0 rounded-lg bg-zinc-100 dark:bg-zinc-800"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {item.label}
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400" />
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2">

            {/* Dark mode */}
            <button
              onClick={() => setDark(!dark)}
              aria-label={dark ? "Light mode" : "Dark mode"}
              className="w-9 h-9 flex items-center justify-center rounded-lg
                text-zinc-500 dark:text-zinc-400
                hover:bg-zinc-100 dark:hover:bg-zinc-800
                transition-all duration-200"
            >
              <AnimatePresence mode="wait">
                {dark ? (
                  <motion.span key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={18} />
                  </motion.span>
                ) : (
                  <motion.span key="moon"
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

            {/* CTA — desktop */}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg
                bg-gradient-to-r from-blue-500 to-emerald-400
                text-white text-sm font-semibold
                shadow-md shadow-blue-500/20
                hover:scale-[1.03] active:scale-[0.97]
                transition-all duration-200"
            >
              <MessageCircle size={14} />
              Mulai Project
            </a>

            {/* Hamburger — mobile */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg
                text-zinc-600 dark:text-zinc-300
                hover:bg-zinc-100 dark:hover:bg-zinc-800
                transition-all duration-200"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Menu (rendered outside nav, no z-conflict) ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-[60px] left-0 right-0 z-50 md:hidden
                bg-white dark:bg-zinc-950
                border-b border-zinc-200 dark:border-zinc-800
                shadow-xl shadow-zinc-200/50 dark:shadow-black/50"
            >
              <div className="px-4 py-3 flex flex-col gap-1">
                {MENU_ITEMS.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center justify-between w-full px-4 py-3.5 rounded-xl
                        text-sm font-medium text-left transition-all duration-150
                        ${isActive
                          ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                        }`}
                    >
                      {item.label}
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-emerald-400" />
                      )}
                    </button>
                  );
                })}

                {/* Mobile CTA */}
                <div className="pt-2 mt-1 border-t border-zinc-100 dark:border-zinc-800">
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3.5 rounded-xl
                      bg-gradient-to-r from-blue-500 to-emerald-400
                      text-white text-sm font-semibold
                      hover:opacity-90 active:scale-[0.98]
                      transition-all duration-200"
                  >
                    <MessageCircle size={15} />
                    Mulai Project via WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}