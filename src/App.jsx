import { useState, useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";

function App() {
  // ✅ default DARK kalau belum ada setting
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <MainLayout dark={dark} setDark={setDark}>
      <Hero />
      <About />
      <Services />
      <Contact />
      <Footer />
    </MainLayout>
  );
}

export default App;