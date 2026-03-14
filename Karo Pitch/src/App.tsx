import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Problem from './components/Problem';
import Solution from './components/Solution';
import HowItWorks from './components/HowItWorks';
import StartupCategories from './components/StartupCategories';
import Vision from './components/Vision';
import FounderStories from './components/FounderStories';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-slate-900 min-h-screen text-slate-50 font-sans selection:bg-indigo-500/30">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Problem />
        <Solution />
        <HowItWorks />
        <StartupCategories />
        <Vision />
        <FounderStories />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
