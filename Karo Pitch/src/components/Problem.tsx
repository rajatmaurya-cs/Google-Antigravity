import { motion } from 'framer-motion';
import { ShieldX, SearchX, Users, LineChart } from 'lucide-react';

const struggles = [
  {
    icon: <Users size={24} className="text-pink-400" />,
    title: "No Investor Access",
    description: "Traditional VC circles are often closed networks, making it extremely hard for outsiders to get noticed."
  },
  {
    icon: <ShieldX size={24} className="text-indigo-400" />,
    title: "Limited Mentorship",
    description: "Founders outside major hubs lack access to experienced mentors who can guide them through early-stage hurdles."
  },
  {
    icon: <SearchX size={24} className="text-emerald-400" />,
    title: "Low Visibility",
    description: "Building incredible products isn't enough when you don't have the platform to amplify your story."
  },
  {
    icon: <LineChart size={24} className="text-amber-400" />,
    title: "Funding Bottleneck",
    description: "Reaching funding networks usually requires warm introductions which many Bharat founders don't have."
  }
];

export default function Problem() {
  return (
    <section className="py-24 relative bg-slate-900 overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-pink-500 font-semibold tracking-wider uppercase text-sm mb-4 block">The Challenge</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Building is hard. <br />
            <span className="text-slate-400">Finding support shouldn't be.</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Real businesses in Tier-2 and Tier-3 cities are generating revenue and creating value, 
            yet they face systemic roadblocks to scaling.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {struggles.map((struggle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass p-8 rounded-2xl border border-white/5 text-left relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform">
                {struggle.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{struggle.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {struggle.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
