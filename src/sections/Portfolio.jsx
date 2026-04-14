import { motion } from "framer-motion";
import { useState } from "react";

const projectsData = [
  {
    title: "Company Profile",
    category: "web",
    image: "https://dummyimage.com/600x400/000/fff&text=Web",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    desc: "Modern company profile website.",
    link: "#",
  },
  {
    title: "CRUD App",
    category: "app",
    image: "https://dummyimage.com/600x400/000/fff&text=App",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    desc: "Fullstack MERN application.",
    link: "#",
  },
  {
    title: "UI Design",
    category: "design",
    image: "https://dummyimage.com/600x400/000/fff&text=Design",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    desc: "Clean UI/UX design.",
    link: "#",
  },
];

function Portfolio() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered =
    filter === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="py-24 px-6 bg-gray-50 dark:bg-black">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
        </div>

        {/* FILTER */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {["all", "web", "app", "design"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm ${
                filter === f
                  ? "bg-gradient-to-r from-blue-400 to-green-400 text-white"
                  : "bg-gray-200 dark:bg-white/10"
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {filtered.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
              onClick={() => setSelected(item)}
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[250px] object-cover group-hover:opacity-0 transition"
              />

              {/* 🎥 VIDEO HOVER */}
              <video
                src={item.video}
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition"
              />

              {/* 💎 GLOW */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-green-400/10 opacity-0 group-hover:opacity-100 blur-xl"></div>
            </motion.div>
          ))}
        </div>

        {/* 🔥 MODAL */}
        {selected && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setSelected(null)}
          >
            <div
              className="bg-white dark:bg-black p-6 rounded-2xl max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-2">{selected.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {selected.desc}
              </p>

              <video
                src={selected.video}
                controls
                className="w-full rounded-lg mb-4"
              />

              <a
                href={selected.link}
                target="_blank"
                className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-400 to-green-400 text-white"
              >
                Visit Project
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

export default Portfolio;