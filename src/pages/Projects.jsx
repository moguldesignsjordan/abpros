// pages/Projects.jsx
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  { id: 1, img: "/path/to/img1.jpg", title: "Modern Kitchen Rehab", category: "Complete Rehabs" },
  { id: 2, img: "/path/to/img2.jpg", title: "Basement Waterproofing", category: "Renovations" },
  { id: 3, img: "/path/to/img3.jpg", title: "Full Bathroom Remodel", category: "Complete Rehabs" },
  { id: 4, img: "/path/to/img4.jpg", title: "Exterior Siding Update", category: "Renovations" },
  { id: 5, img: "/path/to/img5.jpg", title: "Plumbing Overhaul", category: "Maintenance" },
  { id: 6, img: "/path/to/img6.jpg", title: "Commercial Buildout", category: "Project Management" },
];

export default function Projects() {
  return (
    <div className="pt-24 pb-20 bg-brand-light">
      <div className="max-w-7xl px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl font-bold text-brand-dark">Our Projects</h1>
          <p className="mt-4 text-xl text-gray-600">Highlights of Our Recent Work in Metro Detroit</p>
        </motion.div>

        {/* CSS Grid for Gallery */}
        <motion.div 
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden" animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id} 
              variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
              className="relative overflow-hidden cursor-pointer group rounded-2xl aspect-square bg-gray-200"
            >
              {/* Replace with actual <img> tags using the project.img source */}
              <div className="absolute inset-0 transition-transform duration-500 bg-center bg-cover group-hover:scale-110 bg-brand-dark" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-100">
                <p className="text-sm font-semibold tracking-wider text-brand-accent uppercase">{project.category}</p>
                <div className="flex items-center justify-between mt-2">
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  <ArrowUpRight className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}