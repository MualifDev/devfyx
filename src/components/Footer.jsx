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
            <li><a href="#portfolio" className="hover:text-blue-400 transition">Portfolio</a></li>
            <li><a href="#contact" className="hover:text-blue-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="font-semibold mb-4">Connect</h3>
          <div className="flex gap-4">

            <a
              href="#"
              className="p-2 rounded-full bg-white/10 hover:bg-blue-400/20 hover:shadow-lg hover:shadow-blue-400/20 transition text-lg"
            >
              🐙
            </a>

            <a
              href="#"
              className="p-2 rounded-full bg-white/10 hover:bg-pink-400/20 hover:shadow-lg hover:shadow-pink-400/20 transition text-lg"
            >
              📸
            </a>

            <a
              href="#"
              className="p-2 rounded-full bg-white/10 hover:bg-blue-400/20 hover:shadow-lg hover:shadow-blue-400/20 transition text-lg"
            >
              💼
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