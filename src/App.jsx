import { useState, useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
// import Portfolio from "./sections/Portfolio";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";


function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <MainLayout dark={dark} setDark={setDark}>
      <Hero />
      <About  />
      <Services />
      {/* <Portfolio /> */}
      <Contact />
      <Footer />
    </MainLayout>
  );
}

export default App;