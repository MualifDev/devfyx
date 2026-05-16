import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle2, Zap, Code2, Globe } from "lucide-react";

// ─── Typing effect hook ───────────────────────────────────────────────────────
function useTypingEffect(words, typingSpeed = 70, pauseMs = 1600) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let delay = deleting ? 35 : typingSpeed;

    if (!deleting && charIdx === current.length) {
      delay = pauseMs;
      const t = setTimeout(() => setDeleting(true), delay);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(() => {
      setDisplay(current.slice(0, deleting ? charIdx - 1 : charIdx + 1));
      setCharIdx((i) => i + (deleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, typingSpeed, pauseMs]);

  return { display, currentWord: words[wordIdx] };
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }) {
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    const controls = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate(v) {
        if (node) node.textContent = Math.round(v) + suffix;
      },
    });
    return controls.stop;
  }, [to, suffix]);

  return <span ref={nodeRef}>0{suffix}</span>;
}

// ─── Floating stat card ───────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, suffix, delay, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 180 }}
      className={`absolute flex items-center gap-3 px-4 py-3 rounded-2xl
        bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md
        border border-zinc-200/60 dark:border-zinc-700/60
        shadow-xl shadow-zinc-200/40 dark:shadow-black/40
        ${className}`}
    >
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center shrink-0">
        <Icon size={16} className="text-white" />
      </div>
      <div>
        <p className="text-lg font-bold leading-none text-zinc-800 dark:text-zinc-100">
          <Counter to={value} suffix={suffix} />
        </p>
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">{label}</p>
      </div>
    </motion.div>
  );
}

// ─── Orbit ring decoration ────────────────────────────────────────────────────
function OrbitRing({ size, duration, delay, className = "" }) {
  return (
    <motion.div
      className={`absolute rounded-full border border-dashed border-blue-400/20 dark:border-blue-400/15 ${className}`}
      style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
    />
  );
}

// ─── Main Hero ────────────────────────────────────────────────────────────────
const WORDS = ["Web Apps", "Company Profile", "Digital Systems", "SaaS Products"];

export default function Hero() {
  const { display, currentWord } = useTypingEffect(WORDS);

  // Subtle parallax on mouse move
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bgX = useTransform(mouseX, [-500, 500], [-30, 30]);
  const bgY = useTransform(mouseY, [-500, 500], [-20, 20]);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden
        bg-gray-50 dark:bg-zinc-950"
    >
      {/* ── Backgrounds ───────────────────────────────────────── */}
      {/* Grid — visible both modes */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99,102,241,0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99,102,241,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />

      {/* Glow blobs with parallax */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute w-[700px] h-[700px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full bg-blue-400/25 dark:bg-blue-500/20 blur-[120px] rounded-full" />
      </motion.div>
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] pointer-events-none"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <div className="w-full h-full bg-emerald-400/20 dark:bg-emerald-400/15 blur-[120px] rounded-full" />
      </motion.div>

      {/* Orbit rings — decorative */}
      <div className="absolute left-1/2 top-1/2 pointer-events-none hidden md:block">
        <OrbitRing size={520} duration={28} delay={0} />
        <OrbitRing size={720} duration={40} delay={4} />
      </div>

      {/* ── Floating stat cards ────────────────────────────────── */}
      {/* Desktop only — positioned relative to section */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <StatCard
          icon={Zap}
          label="Projects Delivered"
          value={20}
          suffix="+"
          delay={1.0}
          className="left-[4%] top-[28%]"
        />
        <StatCard
          icon={CheckCircle2}
          label="Happy Clients"
          value={20}
          suffix="+"
          delay={1.2}
          className="right-[4%] top-[34%]"
        />
        <StatCard
          icon={Code2}
          label="Lines of Code"
          value={200}
          suffix="k+"
          delay={1.4}
          className="left-[6%] bottom-[22%]"
        />
        <StatCard
          icon={Globe}
          label="Countries Reached"
          value={5}
          suffix="+"
          delay={1.6}
          className="right-[5%] bottom-[26%]"
        />
      </div>

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm rounded-full
            bg-white/70 dark:bg-white/10
            border border-zinc-200 dark:border-white/20
            backdrop-blur-sm text-zinc-600 dark:text-zinc-300
            shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          DevFyx — Digital Studio
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.12] tracking-tight
            text-zinc-900 dark:text-zinc-50"
        >
          We Build{" "}
          <span
            className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent"
            aria-label={currentWord}
          >
            {display}
            {/* blinking cursor */}
            <span className="inline-block w-[3px] h-[0.85em] ml-1 align-middle bg-blue-400 animate-[blink_1s_step-end_infinite] rounded-sm" />
          </span>
          <br />
          <span className="text-zinc-700 dark:text-zinc-300 font-bold">
            That Actually Work.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed"
        >
          DevFyx adalah startup digital yang membantu bisnis kamu tumbuh lewat{" "}
          <span className="text-zinc-700 dark:text-zinc-200 font-medium">
            aplikasi modern, cepat, dan scalable
          </span>{" "}
          — dari konsep sampai launch.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-9 flex flex-col sm:flex-row justify-center gap-3"
        >
          <a
            href="https://wa.me/6283169821525"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Mulai project bersama DevFyx via WhatsApp"
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl
              bg-gradient-to-r from-blue-500 to-emerald-400
              text-white font-semibold text-sm
              shadow-lg shadow-blue-500/30
              hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.03]
              active:scale-[0.98] transition-all duration-200"
          >
            Mulai Project
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#portfolio"
            aria-label="Lihat portfolio DevFyx"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl
              bg-white dark:bg-zinc-800
              border border-zinc-200 dark:border-zinc-700
              text-zinc-700 dark:text-zinc-300 font-semibold text-sm
              hover:border-blue-400 dark:hover:border-blue-500
              hover:bg-zinc-50 dark:hover:bg-zinc-700
              hover:scale-[1.03] active:scale-[0.98]
              transition-all duration-200 shadow-sm"
          >
            Lihat Portfolio
          </a>
        </motion.div>

        {/* Social proof micro-text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="mt-4 text-xs text-zinc-400 dark:text-zinc-600"
        >
          ✓ Dipercaya oleh 20+ klien &nbsp;·&nbsp; ✓ Fast delivery &nbsp;·&nbsp; ✓ Support purna jual
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex flex-col items-center gap-1.5"
          aria-hidden="true"
        >
          <span className="text-xs text-zinc-400 dark:text-zinc-600 tracking-widest uppercase">Scroll</span>
          <motion.div
            className="w-5 h-9 rounded-full border-2 border-zinc-300 dark:border-zinc-700 flex justify-center pt-1.5"
          >
            <motion.div
              className="w-1 h-2 rounded-full bg-blue-400"
              animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

      </div>

      {/* ── Global styles (blink cursor keyframe) ─────────────── */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}