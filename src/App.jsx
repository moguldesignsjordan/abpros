// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

const BRAND = { dark: "#080150", accent: "#85ff00", midnight: "#03002e" };

const T = {
  dark: { pageBg: BRAND.dark, scrollTrack: BRAND.midnight },
  light: { pageBg: "#ffffff", scrollTrack: "#e8e8e8" },
};

function Layout({ theme, setTheme }) {
  const t = T[theme];
  return (
    <div style={{ margin: 0, padding: 0, fontFamily: "'Plus Jakarta Sans', sans-serif", overflowX: "hidden", background: t.pageBg, transition: "background 0.4s ease" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${BRAND.accent}40; color: ${BRAND.dark}; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${t.scrollTrack}; }
        ::-webkit-scrollbar-thumb { background: ${BRAND.accent}40; }
        ::-webkit-scrollbar-thumb:hover { background: ${BRAND.accent}70; }
        input::placeholder, textarea::placeholder { color: ${theme === "dark" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.3)"}; }
      `}</style>
      <Navbar theme={theme} setTheme={setTheme} />
      <Outlet context={{ theme }} />
      <Footer />
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <Router>
      <Routes>
        <Route element={<Layout theme={theme} setTheme={setTheme} />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;