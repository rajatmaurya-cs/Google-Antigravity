import { motion } from 'framer-motion';
import { ShoppingBag, Factory, Smartphone, Cpu, Store } from 'lucide-react';

const categories = [
  {
    name: "D2C Brands",
    icon: <ShoppingBag size={32} />,
    color: "from-pink-500 to-rose-500",
    bg: "bg-pink-500/10",
    text: "text-pink-400"
  },
  {
    name: "Manufacturing",
    icon: <Factory size={32} />,
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-500/10",
    text: "text-amber-400"
  },
  {
    name: "Consumer Tech",
    icon: <Smartphone size={32} />,
    color: "from-indigo-500 to-purple-500",
    bg: "bg-indigo-500/10",
    text: "text-indigo-400"
  },
  {
    name: "SaaS & Enterprise",
    icon: <Cpu size={32} />,
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400"
  },
  {
    name: "MSMEs",
    icon: <Store size={32} />,
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/10",
    text: "text-blue-400"
  }
];

export default function StartupCategories() {
  return (
    <section id="startups" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-purple-400 font-semibold tracking-wider uppercase text-sm mb-4 block">Sectors</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Who Should Apply?</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            We are sector-agnostic but highly biased towards founders building real, 
            revenue-generating businesses with clear paths to profitability.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
              className="glass px-8 py-10 rounded-3xl border border-white/5 flex flex-col items-center justify-center gap-4 w-64 text-center group cursor-pointer relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className={`w-20 h-20 rounded-2xl ${category.bg} ${category.text} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                {category.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mt-2 relative z-10">{category.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
