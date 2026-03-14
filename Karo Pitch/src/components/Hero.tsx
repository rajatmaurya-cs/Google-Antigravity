import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center">
      {/* Animated Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-600/20 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
              Karo Pitch is now open for applications
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Pitch Your Startup to <span className="text-gradient">Real Investors</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-xl">
              Building for Bharat? Get direct access to investors, mentorship, and funding networks through India's premier startup discovery platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                Apply to Pitch
                <ArrowRight size={20} />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass px-8 py-4 rounded-full font-bold text-lg text-white flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
              >
                <Play size={20} className="text-indigo-400" />
                Explore Startups
              </motion.button>
            </div>
            
            <div className="mt-12 flex items-center gap-4 text-sm text-slate-400">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-lg z-10">
                    F{i}
                  </div>
                ))}
              </div>
              <p>Join 1,000+ founders who pitched</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative hidden lg:block h-[700px] w-full mt-12 lg:mt-0"
          >
            {/* Abstract Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/10 to-pink-500/10 rounded-full blur-2xl pointer-events-none" />
            
            {/* Card 1: D2C */}
            <motion.div 
              animate={{ y: [0, -15, 0] }} 
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              whileHover={{ y: -25, scale: 1.05, zIndex: 50 }}
              className="absolute top-0 right-4 w-72 glass p-5 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl cursor-default transition-all group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
              <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-3">
                <div className="w-10 h-10 bg-pink-500/20 rounded-xl flex items-center justify-center text-pink-400 font-bold text-xs uppercase tracking-wider">
                  D2C
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Jaipur Spices</h4>
                  <p className="text-slate-400 text-xs text-ellipsis overflow-hidden whitespace-nowrap w-40">Jaipur</p>
                </div>
              </div>
              <p className="text-slate-300 text-xs mb-4 leading-relaxed line-clamp-2">
                Premium direct-to-consumer spice brand sourcing from Indian farmers.
              </p>
              <div className="flex justify-between items-center px-3 py-2 bg-slate-800/50 rounded-lg border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Funding Needed</span>
                <span className="text-sm font-bold text-pink-400">₹50L</span>
              </div>
            </motion.div>

            {/* Card 2: Tech */}
            <motion.div 
              animate={{ y: [0, 15, 0] }} 
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1 }}
              whileHover={{ y: 5, scale: 1.05, zIndex: 50 }}
              className="absolute top-32 left-0 w-80 glass p-5 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl z-20 cursor-default transition-all group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
              <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-3">
                <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 font-bold text-xs uppercase tracking-wider">
                  Tech
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">BharatPay AI</h4>
                  <p className="text-slate-400 text-xs text-ellipsis overflow-hidden whitespace-nowrap w-48">Bangalore</p>
                </div>
              </div>
              <p className="text-slate-300 text-xs mb-4 leading-relaxed line-clamp-2">
                AI-powered payment and analytics platform for MSMEs.
              </p>
              <div className="flex justify-between items-center px-3 py-2 bg-slate-800/50 rounded-lg border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Funding Needed</span>
                <span className="text-sm font-bold text-indigo-400">₹1.2Cr</span>
              </div>
            </motion.div>
            
            {/* Card 3: MSME */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2.5 }}
              whileHover={{ y: -20, scale: 1.05, zIndex: 50 }}
              className="absolute bottom-16 right-0 w-72 glass p-5 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl z-10 cursor-default transition-all group"
            >
               <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
               <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 font-bold text-[10px] uppercase tracking-wider text-center leading-tight">
                  MSME
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Surat Textile Hub</h4>
                  <p className="text-slate-400 text-xs text-ellipsis overflow-hidden whitespace-nowrap w-40">Surat</p>
                </div>
              </div>
              <p className="text-slate-300 text-xs mb-4 leading-relaxed line-clamp-2">
                Digital platform connecting textile manufacturers with global buyers.
              </p>
              <div className="flex justify-between items-center px-3 py-2 bg-slate-800/50 rounded-lg border border-white/5">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Funding Needed</span>
                <span className="text-sm font-bold text-amber-400">₹80L</span>
              </div>
            </motion.div>

            {/* Card 4: Manufacturing */}
            <motion.div 
              animate={{ y: [0, 20, 0] }} 
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1.5 }}
              whileHover={{ y: 10, scale: 1.05, zIndex: 50 }}
              className="absolute top-[45%] left-16 w-64 glass p-4 rounded-2xl shadow-xl border border-white/10 backdrop-blur-md z-0 opacity-80 cursor-default transition-all group scale-90 hover:opacity-100 uppercase"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
              <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-2">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-400 font-bold text-[8px] uppercase tracking-wider text-center">
                  MFG
                </div>
                <div>
                  <h4 className="text-white font-bold text-xs normal-case">Indore EV Components</h4>
                  <p className="text-slate-400 text-[10px] normal-case overflow-hidden whitespace-nowrap w-32 text-ellipsis">Indore</p>
                </div>
              </div>
              <p className="text-slate-300 normal-case text-[10px] mb-3 leading-relaxed line-clamp-2">
                Manufacturing affordable EV battery components for Indian startups.
              </p>
              <div className="flex justify-between items-center px-2 py-1.5 bg-slate-800/50 rounded-md border border-white/5 normal-case">
                <span className="text-[8px] text-slate-400 uppercase tracking-wider font-semibold">Funding Needed</span>
                <span className="text-xs font-bold text-orange-400">₹2Cr</span>
              </div>
            </motion.div>

            {/* Card 5: Consumer Tech */}
            <motion.div 
              animate={{ y: [0, -12, 0] }} 
              transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut", delay: 3.5 }}
              whileHover={{ y: -22, scale: 1.05, zIndex: 50 }}
              className="absolute top-6 left-[60%] -translate-x-1/2 w-64 glass p-4 rounded-2xl shadow-xl border border-white/10 backdrop-blur-md z-0 opacity-80 cursor-default transition-all group scale-90 hover:opacity-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
              <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-2">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 font-bold text-[8px] uppercase tracking-wider text-center leading-[1]">
                  C-Tech
                </div>
                <div>
                  <h4 className="text-white font-bold text-xs">BharatMart</h4>
                  <p className="text-slate-400 text-[10px] overflow-hidden whitespace-nowrap w-32 text-ellipsis">Lucknow</p>
                </div>
              </div>
              <p className="text-slate-300 text-[10px] mb-3 leading-relaxed line-clamp-2">
                Commerce platform helping small-town retailers sell online.
              </p>
              <div className="flex justify-between items-center px-2 py-1.5 bg-slate-800/50 rounded-md border border-white/5">
                <span className="text-[8px] text-slate-400 uppercase tracking-wider font-semibold">Funding Needed</span>
                <span className="text-xs font-bold text-purple-400">₹1Cr</span>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
