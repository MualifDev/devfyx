import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// 🔥 CUSTOM COUNTER (ANTI ERROR)
function Counter({ end }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return <span>{count}</span>;
}

function About() {
  return (
    <section id="about" className="py-24 px-6 bg-gray-50 dark:bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            About{" "}
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              DevFyx
            </span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Building digital solutions with passion and precision.
          </p>
        </div>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* VISUAL */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.03 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
                alt="coding illustration"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -z-10 w-full h-full bg-blue-500/20 blur-3xl top-0 left-0"></div>
          </motion.div>

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              DevFyx is a digital solution company focused on building modern
              websites and scalable applications for businesses.
            </p>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We turn ideas into powerful digital products with clean design,
              strong architecture, and high performance.
            </p>

            {/* 🔥 COUNTER */}
            <div className="flex gap-6 flex-wrap">
              <div>
                <h3 className="text-xl font-bold text-blue-400">
                  <Counter end={10} />+
                </h3>
                <p className="text-sm text-gray-500">Projects</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-green-400">
                  <Counter end={5} />+
                </h3>
                <p className="text-sm text-gray-500">Clients</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-400">
                  <Counter end={2} />+
                </h3>
                <p className="text-sm text-gray-500">Years</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* TIMELINE */}
        {/* <div className="mt-20">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Our Journey
          </h3>

          <div className="space-y-6">
            {[
              { year: "2023", text: "DevFyx started as a freelance project." },
              { year: "2024", text: "Handled multiple clients & scaled up." },
              { year: "2025", text: "Became full digital solution service." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex items-start gap-4"
              >
                <div className="text-blue-400 font-bold">{item.year}</div>
                <div className="text-gray-600 dark:text-gray-300">
                  {item.text}
                </div>
              </motion.div>
            ))}
          </div>
        </div> */}

       {/* CLIENT LOGO */}
        <div className="mt-20">
        <h3 className="text-2xl font-bold mb-10 text-center">
            Trusted By
        </h3>

        <div className="flex flex-wrap justify-center gap-6 opacity-70">
            
            {[
            "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
            "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
            "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
            "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
            "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Bank_Negara_Indonesia_logo_%282004%29.svg/3840px-Bank_Negara_Indonesia_logo_%282004%29.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
            
            ].map((logo, i) => (
            <div
                key={i}
                className="w-[90px] h-[40px] flex items-center justify-center grayscale hover:grayscale-0 hover:scale-110 transition duration-300"
            >
                <img
                src={logo}
                alt={`client-${i}`}
                className="max-h-full max-w-full object-contain"
                />
            </div>
            ))}

        </div>
        </div>
      </div>
    </section>
  );
}

export default About;