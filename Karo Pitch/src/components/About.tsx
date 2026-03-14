import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Story of <span className="text-gradient">KaroStartup</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-300">
              <p>
                For over 5 years, KaroStartup has been at the forefront of India's entrepreneurial revolution, 
                sharing the untold journeys of thousands of founders from across the nation.
              </p>
              <p>
                We realized that while talent is distributed evenly across India—especially in Tier-2, Tier-3 
                cities, and "Bharat"—opportunities and capital are not. Countless incredible businesses in D2C, 
                manufacturing, and tech remain unseen by traditional investors.
              </p>
              <p className="font-semibold text-white">
                That's why we built <span className="text-indigo-400">Karo Pitch</span>.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <h4 className="text-4xl font-black text-indigo-400 mb-2">5,000+</h4>
                <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">Founder Stories</p>
              </div>
              <div>
                <h4 className="text-4xl font-black text-pink-400 mb-2">5 Yrs</h4>
                <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">Ecosystem Experience</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Visual representation of Bharat startups */}
            <div className="aspect-square rounded-full bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 blur-3xl absolute inset-0" />
            
            <div className="relative glass p-8 rounded-3xl border border-white/10 shadow-2xl z-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-32 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 p-4 flex flex-col justify-end">
                     <span className="text-xs text-slate-400">Jaipur</span>
                     <span className="font-bold text-sm">D2C Spices</span>
                  </div>
                  <div className="h-48 rounded-2xl bg-gradient-to-br from-indigo-900/50 to-slate-900 border border-indigo-500/20 p-4 flex flex-col justify-end">
                     <span className="text-xs text-slate-400">Indore</span>
                     <span className="font-bold text-sm text-indigo-200">EV Manufacturing</span>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="h-48 rounded-2xl bg-gradient-to-br from-pink-900/50 to-slate-900 border border-pink-500/20 p-4 flex flex-col justify-end">
                     <span className="text-xs text-slate-400">Lucknow</span>
                     <span className="font-bold text-sm text-pink-200">Consumer Tech</span>
                  </div>
                  <div className="h-32 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 p-4 flex flex-col justify-end">
                     <span className="text-xs text-slate-400">Surat</span>
                     <span className="font-bold text-sm">Textile SaaS</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-indigo-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.5)] border-4 border-slate-900">
                <span className="text-white font-black text-xl">Bharat</span>
              </div>
            </div>
            
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
