import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Handshake, Lightbulb } from 'lucide-react';

const solutions = [
  {
    icon: <TrendingUp size={24} className="text-emerald-400" />,
    title: "Structured Pitch Events",
    description: "Present to a curated room of active investors focused on real businesses."
  },
  {
    icon: <Handshake size={24} className="text-indigo-400" />,
    title: "Direct Investor Access",
    description: "Bypass the cold email grind with guaranteed visibility to decision-makers."
  },
  {
    icon: <Lightbulb size={24} className="text-amber-400" />,
    title: "Expert Mentorship",
    description: "Get guidance from successful founders who have built similar businesses."
  },
  {
    icon: <CheckCircle2 size={24} className="text-pink-400" />,
    title: "Extensive Network",
    description: "Join the KaroStartup community of operators, builders, and enablers."
  }
];

export default function Solution() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-l from-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative"
          >
            <div className="relative glass p-8 rounded-3xl border border-white/10 shadow-2xl">
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-indigo-500 rounded-full blur-xl opacity-50" />
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-pink-500 rounded-full blur-xl opacity-50" />
              
              <div className="relative z-10 flex flex-col gap-6">
                {solutions.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (index * 0.1) }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="w-12 h-12 shrink-0 rounded-full bg-slate-800/80 border border-white/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <span className="text-indigo-400 font-semibold tracking-wider uppercase text-sm mb-4 block">The Solution</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              A curated platform for <span className="text-gradient">high-potential</span> startups.
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Karo Pitch recreates the closed-room investor experience at scale. 
              We curate the best early-stage businesses from across India and put 
              them in front of investors actively looking to fund Bharat's next big success story.
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] transition-all"
            >
              See Success Stories
            </motion.button>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
