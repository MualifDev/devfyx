import { motion } from "framer-motion";
import { Check } from "lucide-react";

const packages = [
  {
    name: "Basic",
    price: "Start from Rp 1jt",
    features: [
      "1 Landing Page",
      "Responsive Design",
      "Basic SEO",
      "Fast Performance",
    ],
  },
  {
    name: "Pro",
    price: "Start from Rp 2.5jt",
    best: true,
    features: [
      "Multi Page Website",
      "Custom Design",
      "SEO Optimization",
      "Contact Form / API",
      "Fast + Secure",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom Price",
    features: [
      "Full Custom System",
      "Dashboard / Admin Panel",
      "API Integration",
      "Scalable Architecture",
      "Priority Support",
    ],
  },
];

function Services() {
  const whatsappLink = "https://wa.me/6283169821525"; // ganti nomor lu

  return (
    <section id="services" className="py-24 px-6 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            Pricing{" "}
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Packages
            </span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Choose the best package for your business growth.
          </p>
        </div>

        {/* CARD */}
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.08, rotate: item.best ? 0 : -1 }}
              transition={{ delay: i * 0.2 }}
              className={`relative p-[1px] rounded-2xl ${
                item.best
                  ? "bg-gradient-to-r from-green-400 to-blue-400"
                  : "bg-gradient-to-r from-blue-400 to-green-400"
              }`}
            >
              {/* INNER */}
              <div className="p-8 rounded-2xl bg-white dark:bg-black h-full relative overflow-hidden group">

                {/* 🔥 GLOW */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-blue-400/20 to-green-400/20 blur-2xl"></div>

                {/* BEST SELLER */}
                {item.best && (
                  <div className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full bg-green-400 text-black font-semibold">
                    BEST SELLER
                  </div>
                )}

                {/* CONTENT */}
                <div className="relative z-10">

                  {/* TITLE */}
                  <h3 className="text-xl font-semibold mb-2">
                    {item.name}
                  </h3>

                  {/* PRICE */}
                  <p className="text-lg font-bold text-green-400 mb-4">
                    {item.price}
                  </p>

                  {/* FEATURES */}
                  <ul className="space-y-2 mb-6">
                    {item.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Check size={16} className="text-green-400" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href={whatsappLink}
                    target="_blank"
                    className={`block text-center px-4 py-2 rounded-full text-sm font-medium transition ${
                      item.best
                        ? "bg-green-400 text-black hover:opacity-90"
                        : "bg-gradient-to-r from-blue-400 to-green-400 text-white hover:opacity-90"
                    }`}
                  >
                    Choose Package
                  </a>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Services;