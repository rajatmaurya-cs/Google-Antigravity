import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
            <span className="text-white text-lg font-black leading-none">K</span>
          </div>
          Karo Pitch
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">About</a>
          <a href="#how-it-works" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">How It Works</a>
          <a href="#startups" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Startups</a>
          <button className="bg-white text-slate-900 px-5 py-2 rounded-full font-semibold text-sm hover:scale-105 transition-transform">
            Apply Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass absolute top-full left-0 right-0 border-t border-white/10 p-6 flex flex-col gap-4"
        >
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-slate-300 hover:text-white transition-colors">About</a>
          <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-slate-300 hover:text-white transition-colors">How It Works</a>
          <a href="#startups" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium text-slate-300 hover:text-white transition-colors">Startups</a>
          <button className="bg-white text-slate-900 px-5 py-3 rounded-xl font-semibold text-base mt-2">
            Apply Now
          </button>
        </motion.div>
      )}
    </nav>
  );
}
