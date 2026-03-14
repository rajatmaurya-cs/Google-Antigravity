import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const stories = [
  {
    name: "Rahul Sharma",
    company: "Desi Brews",
    location: "Kochi, Kerala",
    quote: "We were generating ₹5Cr ARR but couldn't get a single meeting with Tier-1 VCs. Karo Pitch changed that. 10 minutes on stage led to our entire seed round being oversubscribed.",
    image: "https://i.pravatar.cc/150?img=11",
    metric: "Raised ₹4Cr Seed"
  },
  {
    name: "Priya Desai",
    company: "LoomTech",
    location: "Surat, Gujarat",
    quote: "Building hardware outside Bangalore is tough. The mentorship we received post-pitch helped us optimize our supply chain and achieve profitability in just 8 months.",
    image: "https://i.pravatar.cc/150?img=5",
    metric: "Partnered with 200+ MSMEs"
  },
  {
    name: "Vikram Singh",
    company: "AgriSense",
    location: "Chandigarh",
    quote: "Karo Pitch isn't just a funding platform, it's a validation engine. The investors asked the right questions because they actually understood Bharat markets.",
    image: "https://i.pravatar.cc/150?img=12",
    metric: "Scaled to 5 States"
  }
];

export default function FounderStories() {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-900/50">
       <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-amber-400 font-semibold tracking-wider uppercase text-sm mb-4 block">Success Stories</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Founders Who Pitched</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Hear from the founders who used Karo Pitch to scale their businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-3xl border border-white/5 relative flex flex-col h-full hover:border-white/20 transition-colors"
            >
               <Quote className="absolute top-6 right-6 text-white/5" size={64} />
               
               <p className="text-slate-300 text-lg leading-relaxed mb-8 flex-grow relative z-10 italic">
                 "{story.quote}"
               </p>
               
               <div className="mt-auto pt-6 border-t border-white/10 flex items-center gap-4 relative z-10">
                 <img src={story.image} alt={story.name} className="w-14 h-14 rounded-full border-2 border-slate-700" />
                 <div>
                   <h4 className="text-white font-bold">{story.name}</h4>
                   <p className="text-slate-400 text-sm whitespace-nowrap overflow-hidden text-ellipsis w-40">{story.company} • {story.location}</p>
                 </div>
               </div>
               
               <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {story.metric}
                  </div>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
