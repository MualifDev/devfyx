import Navbar from "../components/Navbar";


function MainLayout({ children, dark, setDark }) {
  return (
    <div>
      <Navbar dark={dark} setDark={setDark} />
      {children}
    </div>

  );
}

export default MainLayout;