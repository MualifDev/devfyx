import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🧠 VALIDASI
    if (!form.name || !form.email || !form.message) {
      alert("Isi semua field dulu bro 😤");
      return;
    }

    if (!form.email.includes("@")) {
      alert("Email tidak valid bro 😤");
      return;
    }

    setLoading(true);

    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          time: new Date().toLocaleString(),
        },
        "YOUR_PUBLIC_KEY"
      )
      .then(() => {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
        setLoading(false);
      })
      .catch(() => {
        alert("Gagal kirim 😢");
        setLoading(false);
      });
  };

  // 💬 WHATSAPP (UPGRADE SALES)
  const whatsappLink = `https://wa.me/6283169821525?text=${encodeURIComponent(
`Halo DevFyx 👋

Saya tertarik dengan jasa Anda.

Nama: ${form.name}
Email: ${form.email}

Kebutuhan saya:
${form.message}

Mohon info lebih lanjut ya 🙌`
  )}`;

  return (
    <section
      id="contact"
      className="py-32 px-6 bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-900"
    >
      <div className="max-w-xl mx-auto text-center">

        {/* HEADER */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold mb-6"
        >
          Let's Work{" "}
          <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Together
          </span>
        </motion.h2>

        <p className="text-gray-600 dark:text-gray-300 mb-10">
          Got a project idea? Let’s turn it into reality 🚀
        </p>

        {/* CARD */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-2xl backdrop-blur-lg bg-white/70 dark:bg-white/5 border border-white/10 shadow-xl space-y-6"
        >
          {/* INPUT */}
          <input
            autoFocus
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 py-2 outline-none focus:border-blue-400 focus:scale-[1.02] transition"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 py-2 outline-none focus:border-blue-400 focus:scale-[1.02] transition"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 py-2 outline-none focus:border-blue-400 focus:scale-[1.02] transition"
          ></textarea>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-gradient-to-r from-blue-400 to-green-400 text-white font-semibold hover:scale-105 transition disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {/* SUCCESS */}
          {success && (
            <p className="text-green-400 text-sm">
              ✅ Message sent successfully!
            </p>
          )}
        </motion.form>

        {/* WHATSAPP CTA */}
        <a
          href={whatsappLink}
          target="_blank"
          className="inline-block mt-8 px-6 py-3 rounded-full bg-green-400 text-black font-semibold hover:scale-105 transition"
        >
          Or Chat via WhatsApp 🚀
        </a>

      </div>
    </section>
  );
}

export default Contact;