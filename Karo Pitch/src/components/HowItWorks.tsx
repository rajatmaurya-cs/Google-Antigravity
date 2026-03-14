import { motion } from 'framer-motion';

const steps = [
  {
    title: "Apply with your startup",
    description: "Fill out a quick application detailing your business model, traction, and funding needs.",
    number: "01"
  },
  {
    title: "Get shortlisted",
    description: "Our curation team reviews applications to select high-potential businesses for the cohort.",
    number: "02"
  },
  {
    title: "Pitch to investors",
    description: "Present your business directly to a panel of verified angels and early-stage VC funds.",
    number: "03"
  },
  {
    title: "Connect & Scale",
    description: "Get mentorship, network with successful founders, and secure the capital you need.",
    number: "04"
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="text-emerald-400 font-semibold tracking-wider uppercase text-sm mb-4 block">Process</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">How Karo Pitch Works</h2>
          <p className="text-slate-400 text-lg">
            A streamlined journey from application to funding, designed to minimize friction for founders.
          </p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="absolute top-12 left-[40px] md:left-1/2 md:-translate-x-1/2 w-0.5 h-[calc(100%-80px)] bg-gradient-to-b from-indigo-500 via-pink-500 to-emerald-500 opacity-20 hidden md:block" />

          <div className="flex flex-col gap-12 md:gap-24 relative z-10">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 w-full text-left md:text-${isEven ? 'right' : 'left'}`}>
                    <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-slate-400 text-lg leading-relaxed">{step.description}</p>
                  </div>
                  
                  <div className="w-16 h-16 shrink-0 rounded-full bg-slate-900 border-4 border-indigo-500/30 flex items-center justify-center relative z-10 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                    <span className="text-white font-black text-xl">{step.number}</span>
                  </div>
                  
                  <div className="flex-1 w-full hidden md:block">
                     <div className={`w-full max-w-sm h-32 glass rounded-2xl p-6 ${isEven ? 'ml-auto' : 'mr-auto'} border border-white/5 flex items-center`}>
                        <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             whileInView={{ width: '100%' }}
                             transition={{ duration: 1, delay: 0.3 }}
                             viewport={{ once: true }}
                             className={`h-full bg-gradient-to-r ${isEven ? 'from-indigo-500 to-purple-500' : 'from-pink-500 to-rose-500'}`}
                           />
                        </div>
                     </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
