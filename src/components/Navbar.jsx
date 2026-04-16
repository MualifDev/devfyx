import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

function Navbar({ dark, setDark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ❌ HAPUS DARK MODE EFFECT DARI SINI

  // SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["home", "about", "services", "contact"];
      const scrollY = window.scrollY;

      sections.forEach((section) => {
        const el = document.getElementById(section);
        if (el) {
          const offsetTop = el.offsetTop - 120;
          const height = el.offsetHeight;

          if (scrollY >= offsetTop && scrollY < offsetTop + height) {
            setActive(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
      ${
        scrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <img src={logo} alt="DevFyx" className="h-8" />

        <ul className="hidden md:flex gap-8 text-sm font-medium">
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative cursor-pointer group"
            >
              <span
                className={`transition ${
                  active === item.id
                    ? "bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
                    : "hover:text-blue-400"
                }`}
              >
                {item.label}
              </span>

              <span
                className={`absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-blue-400 to-green-400 transition-all duration-300 group-hover:w-full ${
                  active === item.id ? "w-full" : ""
                }`}
              ></span>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {/* DARK MODE BUTTON */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition"
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-4 backdrop-blur-lg bg-white/80 dark:bg-black/80">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`py-2 cursor-pointer ${
                active === item.id
                  ? "bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent"
                  : "hover:text-blue-400"
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;