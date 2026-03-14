import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="border-t border-white/10 bg-slate-900/50 pt-20 pb-10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
              <span className="text-white text-lg font-black leading-none">K</span>
            </div>
            Karo Pitch
          </div>
          <p className="text-slate-400 mt-4 max-w-sm">
            Building India's most accessible startup discovery and funding platform for Bharat entrepreneurs.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-6">Platform</h4>
          <ul className="flex flex-col gap-4">
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Explore Startups</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Apply to Pitch</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">For Investors</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Success Stories</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Company</h4>
          <ul className="flex flex-col gap-4">
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">About KaroStartup</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Contact</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Karo Pitch, an initiative by KaroStartup. All rights reserved.
        </p>
        <div className="flex gap-4">
          {/* Social icons placeholders */}
          <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white transition-colors">X</a>
          <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white transition-colors">In</a>
          <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-400 hover:text-white transition-colors">Ig</a>
        </div>
      </div>
    </motion.footer>
  );
}
