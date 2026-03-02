// components/Footer.jsx
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 text-white bg-brand-dark">
      <div className="grid grid-cols-1 gap-8 px-6 mx-auto max-w-7xl md:grid-cols-3">
        <div>
          <h3 className="mb-4 text-2xl font-bold text-brand-accent">AB PRO LLC</h3>
          <p className="text-gray-400">Full-Service Contractors For Detroit Homeowners & Businesses.</p>
        </div>
        <div>
          <h4 className="mb-4 font-semibold tracking-wider uppercase">Contact</h4>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-brand-accent"/> +1 (248) 864-1784</li>
            <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-brand-accent"/> Info@abprojectllc.com</li>
            <li className="flex items-start gap-3"><MapPin className="w-5 h-5 shrink-0 text-brand-accent"/> 17515 W Nine Mile Rd,<br/>Southfield, MI 48075</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-semibold tracking-wider uppercase">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/#services" className="hover:text-brand-accent">Services</a></li>
            <li><a href="/projects" className="hover:text-brand-accent">Projects Gallery</a></li>
            <li><a href="/#contact" className="hover:text-brand-accent">Get an Estimate</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 mt-16 text-center border-t border-white/10 text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} AB PRO LLC. Created with Mogul Design Agency.</p>
      </div>
    </footer>
  );
}