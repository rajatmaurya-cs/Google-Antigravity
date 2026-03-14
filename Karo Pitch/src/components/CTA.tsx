import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <motion.div 
           animate={{ rotate: 360 }}
           transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
           className="absolute -top-1/2 -left-1/4 w-[1000px] h-[1000px] rounded-full border-[100px] border-white/5 border-dashed"
         />
         <motion.div 
           animate={{ rotate: -360 }}
           transition={{ repeat: Infinity, duration: 70, ease: "linear" }}
           className="absolute -bottom-1/2 -right-1/4 w-[800px] h-[800px] rounded-full border-[80px] border-indigo-500/10 border-dotted"
         />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
            Ready to Pitch Your Startup?
          </h2>
          <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Applications are accepted on a rolling basis. Give your business the stage, the funding, and the network it deserves.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-indigo-900 px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              Apply Now
              <ArrowRight size={20} />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass px-10 py-5 rounded-full font-bold text-lg text-white flex items-center justify-center hover:bg-white/10 transition-colors border border-white/20"
            >
              Become an Investor
            </motion.button>
          </div>
          
          <p className="mt-8 text-indigo-300 text-sm">
            Join the waitlist. Next cohort pitching event coming soon.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
