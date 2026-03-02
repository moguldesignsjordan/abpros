// components/Navbar.jsx
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl px-6 py-4 mx-auto">
        <Link to="/" className="text-2xl font-black tracking-tighter text-brand-dark">
          AB <span className="text-brand-accent">PRO</span>
        </Link>
        <nav className="hidden gap-8 font-medium text-gray-600 md:flex">
          <Link to="/" className="transition hover:text-brand-dark">Home</Link>
          <a href="/#services" className="transition hover:text-brand-dark">Services</a>
          <Link to="/projects" className="transition hover:text-brand-dark">Projects</Link>
        </nav>
        <a href="tel:2488641784" className="flex items-center gap-2 font-bold text-brand-dark">
          <Phone className="w-5 h-5 text-brand-accent" />
          <span className="hidden sm:inline">(248) 864-1784</span>
        </a>
      </div>
    </header>
  );
}