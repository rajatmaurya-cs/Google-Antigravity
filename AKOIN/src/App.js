import React, { useState, useEffect } from 'react';
import './App.css';

/* 
  DESIGN NOTE:
  The "Institute of Digital Risk" (IDR) brand identity utilizes a stark palette of orange, white, and black 
  to convey urgency, clarity, and authority within high-stakes cyber and digital risk sectors. 
  The isometric geometric cube icon symbolizes structural integrity, layered defense, and the multifaceted 
  nature of risk in modern digital systems. Clean, modern typography ensures high legibility, creating 
  a serious, professional aesthetic suited for regulated environments and industry-led incubators.
*/

const CubeIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5 L90 25 L50 45 L10 25 Z" fill="#FF6600"/>
    <path d="M10 25 L50 45 L50 90 L10 70 Z" fill="#111111"/>
    <path d="M50 45 L90 25 L90 70 L50 90 Z" fill="#444444"/>
    <path d="M50 45 L50 90" stroke="#FFFFFF" strokeWidth="3"/>
    <path d="M10 25 L50 45" stroke="#FFFFFF" strokeWidth="3"/>
    <path d="M90 25 L50 45" stroke="#FFFFFF" strokeWidth="3"/>
  </svg>
);

const HeroGraphic = () => (
  <svg className="hero-graphic" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="floating-element-1">
      <path d="M100 20 L160 50 L100 80 L40 50 Z" fill="#FF6600" opacity="0.9"/>
      <path d="M40 50 L100 80 L100 150 L40 120 Z" fill="#1A1A1A" opacity="0.9"/>
      <path d="M100 80 L160 50 L160 120 L100 150 Z" fill="#333333" opacity="0.9"/>
    </g>
    <g className="floating-element-2">
      <path d="M150 120 L180 135 L150 150 L120 135 Z" fill="#FF6600" />
      <path d="M120 135 L150 150 L150 185 L120 170 Z" fill="#1A1A1A" />
      <path d="M150 150 L180 135 L180 170 L150 185 Z" fill="#333333" />
    </g>
  </svg>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(null); // 'success' | 'error' | null

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setFormStatus('error');
        return;
      }
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(null), 5000);
    }
  };

  return (
    <div className="app-container">
      {/* Navigation */}
      <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo-container" onClick={() => scrollToSection('hero')}>
            <CubeIcon size={40} />
            <span className="logo-text">Institute of Digital Risk</span>
          </div>
          
          <nav className={`nav-links ${isMenuOpen ? 'nav-open' : ''}`}>
            <button onClick={() => scrollToSection('about')}>About IDR</button>
            <button onClick={() => scrollToSection('pillars')}>Services</button>
            <button onClick={() => scrollToSection('community')}>Community</button>
            <button className="nav-cta" onClick={() => scrollToSection('contact')}>Register Interest</button>
          </nav>
          
          <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className={`bar ${isMenuOpen ? 'bar-open-1' : ''}`}></div>
            <div className={`bar ${isMenuOpen ? 'bar-open-2' : ''}`}></div>
            <div className={`bar ${isMenuOpen ? 'bar-open-3' : ''}`}></div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="hero" className="hero-section">
          <div className="hero-content">
            <div className="hero-text-content">
              <div className="badge">Leading the standard in risk resilience</div>
              <h1>Advancing the Future of Digital Risk</h1>
              <p className="hero-subtext">
                IDR trains and deploys digital risk practitioners by combining academic collaboration 
                with real-world industry practice in highly regulated environments.
              </p>
              <div className="hero-cta-group">
                <button className="btn-primary" onClick={() => scrollToSection('pillars')}>Explore Programs</button>
                <button className="btn-secondary" onClick={() => scrollToSection('contact')}>Hire Talent</button>
              </div>
            </div>
            <div className="hero-visual">
              <HeroGraphic />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <div className="section-container">
            <h2 className="section-title">About IDR</h2>
            <div className="about-content">
              <div className="about-mark"><CubeIcon size={60} /></div>
              <div className="about-text">
                <p>
                  The Institute of Digital Risk is an industry-led training and deployment institute. 
                  We focus exclusively on empowering practitioners for roles in digital, cyber, technology, and AI risk.
                </p>
                <p>
                  Operating at the intersection of theory and practice, IDR works within regulated, 
                  high-consequence environments. We bridge the gap by connecting rigorous academic insight 
                  through UK university partnerships with hands-on, real-world project deployment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Pillars */}
        <section id="pillars" className="pillars-section">
          <div className="section-container">
            <h2 className="section-title text-center">Our Core Model</h2>
            
            <div className="cards-grid">
              <div className="pillar-card">
                <div className="card-icon">🎓</div>
                <h3>Academy</h3>
                <p>Intensive training and bootcamps designed for students and professionals to master digital risk fundamentals and advanced frameworks.</p>
              </div>
              <div className="pillar-card active-card">
                <div className="card-icon">💡</div>
                <h3>Innovation & Incubation</h3>
                <p>Developing intellectual property, pioneering future risk models, and structuring leading AI governance approaches for the market.</p>
              </div>
              <div className="pillar-card">
                <div className="card-icon">🛡️</div>
                <h3>Advisory Services</h3>
                <p>Expert support for organizations navigating complex regulatory landscapes, integrating frameworks like NIST, ISO 27001, and NIS2.</p>
              </div>
            </div>

            <div className="pipeline-container">
              <h3 className="pipeline-title">The IDR Pathway</h3>
              <div className="pipeline-steps">
                <div className="step">
                  <div className="step-circle">1</div>
                  <span className="step-label">Train</span>
                </div>
                <div className="step-connector"></div>
                <div className="step">
                  <div className="step-circle">2</div>
                  <span className="step-label">Hire</span>
                </div>
                <div className="step-connector"></div>
                <div className="step">
                  <div className="step-circle hover-highlight">3</div>
                  <span className="step-label">Innovate</span>
                </div>
                <div className="step-connector"></div>
                <div className="step">
                  <div className="step-circle brand-highlight">4</div>
                  <span className="step-label">Deploy</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="community-section">
          <div className="section-container">
            <h2 className="section-title">Who We Serve</h2>
            <p className="community-intro">Building a resilient, inclusive ecosystem of risk professionals across sectors.</p>
            
            <div className="audience-grid">
              <div className="audience-block">
                <h4>Students & Graduates</h4>
                <p>Launch a secure career with hands-on labs and certifications.</p>
              </div>
              <div className="audience-block">
                <h4>Early-Career Professionals</h4>
                <p>Accelerate your trajectory into specialized tech and AI risk roles.</p>
              </div>
              <div className="audience-block">
                <h4>Senior Practitioners</h4>
                <p>Master emerging frameworks and lead complex risk advisory programs.</p>
              </div>
              <div className="audience-block audience-highlight">
                <h4>Regulated Industries</h4>
                <p>Protecting financial services and critical national infrastructure.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <div className="contact-container">
            <div className="contact-text">
              <h2 className="section-title">Partner with IDR</h2>
              <p>Ready to advance your risk capability or start your training journey? Register your interest below and our team will connect with you.</p>
            </div>
            
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  placeholder="John Doe"
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  placeholder="john@example.com"
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">How can we help?</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="4" 
                  value={formData.message} 
                  onChange={handleInputChange} 
                  placeholder="I'm interested in..."
                  required 
                ></textarea>
              </div>
              
              <button type="submit" className="btn-primary form-submit">Submit Registration</button>
              
              {formStatus === 'success' && (
                <div className="form-message success-message">
                  ✓ Thank you! We have received your registration and will be in touch shortly.
                </div>
              )}
              {formStatus === 'error' && (
                <div className="form-message error-message">
                  ⚠ Please enter a valid email address.
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo-container">
              <CubeIcon size={32} />
              <span className="logo-text">Institute of Digital Risk</span>
            </div>
            <p className="footer-statement">Advancing the standard in structural risk, tech resilience, and AI safety.</p>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h4>Platform</h4>
              <button onClick={() => scrollToSection('about')}>About Us</button>
              <button onClick={() => scrollToSection('pillars')}>Academy</button>
              <button onClick={() => scrollToSection('pillars')}>Advisory</button>
            </div>
            <div className="link-group">
              <h4>Contact</h4>
              <a href="mailto:hello@instituteofdigitalrisk.com">hello@instituteofdigitalrisk.com</a>
              <button onClick={() => scrollToSection('contact')}>Register</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Institute of Digital Risk. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
