import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-black border-t border-gray-200 dark:border-white/10 py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        {/* BRAND */}
        <div>
          <img src={logo} alt="DevFyx" className="h-8 mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            DevFyx is a digital solution company focused on building modern
            websites and scalable applications for businesses.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
            <li><a href="#home" className="hover:text-blue-400 transition">Home</a></li>
            <li><a href="#about" className="hover:text-blue-400 transition">About</a></li>
            <li><a href="#services" className="hover:text-blue-400 transition">Services</a></li>
            <li><a href="#contact" className="hover:text-blue-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="font-semibold mb-4">Connect</h3>
          <div className="flex gap-4">

            {/* GITHUB */}
            <a
              href="https://github.com/MualifDev"
              target="_blank"
              className="p-2 rounded-full bg-white/10 hover:bg-gray-400/20 hover:scale-110 transition"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.99 3.23 9.22 7.71 10.72.56.1.77-.24.77-.54v-1.88c-3.14.68-3.8-1.52-3.8-1.52-.51-1.29-1.25-1.63-1.25-1.63-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1 1.63-.78 2.02-1.22.1-.72.39-1.22.7-1.5-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.08 1.16a10.7 10.7 0 015.6 0c2.14-1.46 3.08-1.16 3.08-1.16.61 1.53.23 2.67.11 2.95.72.79 1.16 1.8 1.16 3.03 0 4.33-2.63 5.28-5.14 5.56.4.34.76 1 .76 2.03v3.01c0 .3.2.65.78.54 4.48-1.5 7.7-5.73 7.7-10.72C23.25 5.48 18.27.5 12 .5z"/>
              </svg>
            </a>

            {/* INSTAGRAM */}
            <a
              href="https://www.instagram.com/mualif.dev/"
              target="_blank"
              className="p-2 rounded-full bg-white/10 hover:bg-pink-400/20 hover:scale-110 transition"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5A3.75 3.75 0 0020 16.25v-8.5A3.75 3.75 0 0016.25 4h-8.5zm4.25 3.25a4.75 4.75 0 110 9.5 4.75 4.75 0 010-9.5zm0 2a2.75 2.75 0 100 5.5 2.75 2.75 0 000-5.5zm5.25-.75a1 1 0 110 2 1 1 0 010-2z"/>
              </svg>
            </a>

            {/* LINKEDIN */}
            <a
              href="https://linkedin.com/in/username-lu"
              target="_blank"
              className="p-2 rounded-full bg-white/10 hover:bg-blue-400/20 hover:scale-110 transition"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.16h.05c.53-1 1.84-2.16 3.78-2.16C20.22 8 22 10.13 22 14.14V24h-4v-8.45c0-2.02-.04-4.62-2.82-4.62-2.82 0-3.25 2.2-3.25 4.47V24h-4V8z"/>
              </svg>
            </a>

          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="text-center mt-10 text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} DevFyx. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;