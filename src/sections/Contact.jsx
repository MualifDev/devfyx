import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail, MessageCircle, MapPin, Clock, Send,
  GitBranch, CheckCircle2, AlertCircle,
} from "lucide-react";

// ─── Custom SVG Social Icons ──────────────────────────────────────────────────
const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5A3.75 3.75 0 0020 16.25v-8.5A3.75 3.75 0 0016.25 4h-8.5zm4.25 3.25a4.75 4.75 0 110 9.5 4.75 4.75 0 010-9.5zm0 2a2.75 2.75 0 100 5.5 2.75 2.75 0 000-5.5zm5.25-.75a1 1 0 110 2 1 1 0 010-2z"/>
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.16h.05c.53-1 1.84-2.16 3.78-2.16C20.22 8 22 10.13 22 14.14V24h-4v-8.45c0-2.02-.04-4.62-2.82-4.62-2.82 0-3.25 2.2-3.25 4.47V24h-4V8z"/>
  </svg>
);

// ─── ENV — pindahkan ke .env ──────────────────────────────────────────────────
// Buat file .env di root project:
//   VITE_EMAILJS_SERVICE_ID=service_xvr6ruc
//   VITE_EMAILJS_TEMPLATE_ID=template_xfq8t07
//   VITE_EMAILJS_PUBLIC_KEY=QNIMvimxoD5ll6XqW
const EMAILJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || "service_xvr6ruc";
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_xfq8t07";
const EMAILJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || "QNIMvimxoD5ll6XqW";
const WA_NUMBER        = "6283169821525";

// ─── Validators ───────────────────────────────────────────────────────────────
const validators = {
  name:    (v) => v.trim().length < 2 ? "Nama minimal 2 karakter." : "",
  email:   (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Format email tidak valid.",
  subject: (v) => v ? "" : "Pilih topik terlebih dahulu.",
  message: (v) => v.trim().length < 10 ? "Pesan minimal 10 karakter." : "",
};

const SUBJECTS = [
  "Website / Company Profile",
  "Web Application",
  "UI/UX Design",
  "Konsultasi Proyek",
  "Lainnya",
];

// ─── Info kontak ──────────────────────────────────────────────────────────────
const INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "mualif2310@gmail.com",        // ← sesuaikan
    href: "mailto:mualif23103@gmail.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+62 831-6982-1525",
    href: `https://wa.me/${WA_NUMBER}`,
  },
  {
    icon: MapPin,
    label: "Lokasi",
    value: "Indonesia 🇮🇩",
    href: null,
  },
  {
    icon: Clock,
    label: "Jam Operasional",
    value: "Senin–Sabtu, 09.00–21.00 WIB",
    href: null,
  },
];

const SOCIALS = [
  { icon: InstagramIcon, href: "https://www.instagram.com/mualif.dev/", label: "Instagram DevFyx" },
  { icon: GitBranch,     href: "https://github.com/MualifDev", label: "GitHub DevFyx" },
  { icon: LinkedinIcon,  href: "https://www.linkedin.com/in/mualif-kamaludin-963469264/", label: "LinkedIn DevFyx" },
];

// ─── Inline field component ───────────────────────────────────────────────────
function Field({ label, id, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-1.5 text-xs text-red-500"
          >
            <AlertCircle size={12} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass = (hasErr) =>
  `w-full rounded-xl px-4 py-3 text-sm bg-zinc-100 dark:bg-zinc-800 
   text-zinc-800 dark:text-zinc-100 outline-none
   border transition-all duration-200
   placeholder:text-zinc-400 dark:placeholder:text-zinc-500
   focus:ring-2 focus:ring-blue-500/40
   ${hasErr
     ? "border-red-400 dark:border-red-500"
     : "border-zinc-200 dark:border-zinc-700 focus:border-blue-400 dark:focus:border-blue-500"
   }`;

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm]     = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const MAX_MSG = 500;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Clear error on change
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(validators).forEach((k) => {
      const msg = validators[k](form[k]);
      if (msg) newErrors[k] = msg;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        {
          from_name:    form.name,
          from_email:   form.email,
          subject:      form.subject,
          message:      form.message,
          time:         new Date().toLocaleString("id-ID"),
        },
        EMAILJS_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
`Halo DevFyx 👋

Saya tertarik dengan jasa Anda.

Nama: ${form.name || "[nama]"}
Email: ${form.email || "[email]"}
Topik: ${form.subject || "[topik]"}

Kebutuhan saya:
${form.message || "[pesan]"}

Mohon info lebih lanjut ya 🙌`
  )}`;

  return (
    <section
      id="contact"
      className="relative py-24 px-6 overflow-hidden bg-gray-50 dark:bg-zinc-950"
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(99,102,241,0.08) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px]
        bg-gradient-to-tl from-emerald-400/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 w-[500px] h-[350px]
        bg-gradient-to-br from-blue-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500 mb-3">
            Hubungi Kami
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100">
            Ayo Mulai{" "}
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Ngobrol
            </span>
          </h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-sm md:text-base">
            Punya ide atau proyek? Ceritakan ke kami — konsultasi awal gratis, tanpa komitmen.
          </p>
        </motion.div>

        {/* 2-column layout */}
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 items-start">

          {/* ── Left: Info panel ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="flex flex-col gap-6"
          >
            {/* Response time badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
              bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800
              text-emerald-700 dark:text-emerald-400 text-sm font-medium w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Biasanya reply dalam 1×24 jam
            </div>

            {/* Info items */}
            <div className="flex flex-col gap-4">
              {INFO.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-400
                    flex items-center justify-center shrink-0 shadow-md">
                    <Icon size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

            {/* Social links */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3">
                Ikuti Kami
              </p>
              <div className="flex gap-3">
                {SOCIALS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800
                      border border-zinc-200 dark:border-zinc-700
                      flex items-center justify-center
                      text-zinc-500 dark:text-zinc-400
                      hover:bg-gradient-to-br hover:from-blue-500 hover:to-emerald-400
                      hover:text-white hover:border-transparent
                      transition-all duration-200 hover:scale-105"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* WA shortcut */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat langsung via WhatsApp"
              className="group flex items-center justify-center gap-2 w-full py-3 rounded-xl
                bg-emerald-500 hover:bg-emerald-600
                text-white text-sm font-semibold
                shadow-lg shadow-emerald-500/25
                hover:shadow-emerald-500/40 hover:scale-[1.02]
                active:scale-[0.98] transition-all duration-200"
            >
              <MessageCircle size={16} />
              Chat via WhatsApp
            </a>
          </motion.div>

          {/* ── Right: Form ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="bg-white dark:bg-zinc-900 rounded-2xl p-8
              border border-zinc-200 dark:border-zinc-800
              shadow-xl shadow-zinc-200/40 dark:shadow-black/30"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                /* ── Success state ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-12 gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30
                    flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    Pesan Terkirim! 🎉
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs">
                    Terima kasih sudah menghubungi DevFyx. Kami akan segera membalas dalam 1×24 jam.
                  </p>
                </motion.div>
              ) : (
                /* ── Form ── */
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-5"
                  noValidate
                >
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    Kirim Pesan
                  </h3>

                  {/* Name + Email row */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Nama" id="name" error={errors.name}>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Nama lengkap kamu"
                        className={inputClass(!!errors.name)}
                        aria-invalid={!!errors.name}
                      />
                    </Field>

                    <Field label="Email" id="email" error={errors.email}>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="email@kamu.com"
                        className={inputClass(!!errors.email)}
                        aria-invalid={!!errors.email}
                      />
                    </Field>
                  </div>

                  {/* Subject */}
                  <Field label="Topik Kebutuhan" id="subject" error={errors.subject}>
                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className={inputClass(!!errors.subject) + " cursor-pointer"}
                      aria-invalid={!!errors.subject}
                    >
                      <option value="">-- Pilih topik --</option>
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </Field>

                  {/* Message */}
                  <Field label={`Pesan (${form.message.length}/${MAX_MSG})`} id="message" error={errors.message}>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      maxLength={MAX_MSG}
                      rows={5}
                      placeholder="Ceritakan kebutuhan proyek kamu..."
                      className={inputClass(!!errors.message) + " resize-none"}
                      aria-invalid={!!errors.message}
                    />
                  </Field>

                  {/* Error banner */}
                  <AnimatePresence>
                    {status === "error" && (
                      <motion.div
                        key="err-banner"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl
                          bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800
                          text-red-600 dark:text-red-400 text-sm"
                      >
                        <AlertCircle size={16} />
                        Gagal mengirim pesan. Coba lagi atau hubungi via WhatsApp.
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    aria-label="Kirim pesan ke DevFyx"
                    className="group flex items-center justify-center gap-2 w-full py-3.5 rounded-xl
                      bg-gradient-to-r from-blue-500 to-emerald-400 text-white text-sm font-semibold
                      shadow-lg shadow-blue-500/25
                      hover:shadow-blue-500/40 hover:scale-[1.02]
                      active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed
                      transition-all duration-200"
                  >
                    {status === "loading" ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Kirim Pesan
                        <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-zinc-400 dark:text-zinc-600">
                    Atau langsung chat via{" "}
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-500 hover:underline font-medium"
                    >
                      WhatsApp
                    </a>{" "}
                    untuk respons lebih cepat.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}