import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function Hero() {
  const texts = ["Web Apps", "Company Profile", "Digital Systems"];
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  // typing effect
  useEffect(() => {
    if (charIndex < texts[index].length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + texts[index][charIndex]);
        setCharIndex(charIndex + 1);
      }, 70);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        setCharIndex(0);
        setDisplayText("");
        setIndex((prev) => (prev + 1) % texts.length);
      }, 1500);
    }
  }, [charIndex, index]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-24 overflow-hidden"
    >
      {/* 🌌 BACKGROUND GLOW */}
      <div className="absolute w-[600px] h-[600px] bg-blue-500/20 blur-3xl rounded-full top-10 left-[-100px] animate-pulse"></div>
      <div className="absolute w-[500px] h-[500px] bg-green-400/20 blur-3xl rounded-full bottom-0 right-[-100px] animate-pulse"></div>

      {/* 🧱 GRID PATTERN */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="text-center max-w-3xl relative z-10">

        {/* 🔥 BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1 mb-4 text-sm rounded-full bg-white/10 border border-white/20 backdrop-blur"
        >
          🚀 Professional Digital Solution
        </motion.div>

        {/* 🧠 HEADLINE */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          We Build{" "}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-green-400 bg-clip-text text-transparent animate-gradient">
            {displayText}
          </span>
        </motion.h1>

        {/* ✍️ SUBTEXT */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-gray-600 dark:text-gray-300 text-lg"
        >
          DevFyx helps businesses grow with modern, scalable, and high-quality digital solutions tailored to your needs.
        </motion.p>

        {/* 🎯 CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex justify-center gap-4 flex-wrap"
        >
          <a
            href="https://wa.me/6283169821525"
            target="_blank"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-green-400 text-white font-medium hover:scale-105 hover:shadow-lg transition"
          >
            🚀 Start Project
          </a>

          <button className="px-6 py-3 rounded-lg border border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-white/10 transition">
            View Portfolio
          </button>
        </motion.div>

        {/* 👇 SCROLL INDICATOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-sm text-gray-400"
        >
          ↓ Scroll Down
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;