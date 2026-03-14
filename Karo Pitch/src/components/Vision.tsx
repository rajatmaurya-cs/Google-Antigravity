import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Vision() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden bg-black min-h-screen flex items-center">
      
      {/* Parallax Background Elements */}
      <motion.div style={{ y: y1 }} className="absolute top-0 left-10 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px]" />
      <motion.div style={{ y: y2 }} className="absolute bottom-0 right-10 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px]" />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at center, transparent 0%, black 100%)' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div style={{ opacity, scale }} className="max-w-4xl mx-auto">
          <span className="text-indigo-400 font-bold tracking-[0.2em] uppercase text-sm mb-8 block">Our Long-Term Vision</span>
          
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter mix-blend-difference">
             Building India's most <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">accessible</span> startup discovery & funding platform for Bharat entrepreneurs.
          </h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6"
          >
             <div className="h-0.5 w-12 bg-white/20 hidden sm:block" />
             <p className="text-xl text-slate-300 font-medium">Because the next big unicorn is building in a Tier-2 city right now.</p>
             <div className="h-0.5 w-12 bg-white/20 hidden sm:block" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
