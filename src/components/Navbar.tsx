import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
        scrolled ? 'bg-secondary py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center">
          <a 
            href="https://instagram.com/shootforarts" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mr-6 text-accent-dark hover:text-primary transition-colors duration-300"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
        </div>
        
        <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-xl md:text-2xl tracking-widest font-serif uppercase text-primary whitespace-nowrap">
            Shoot For Arts
          </h1>
        </Link>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'nav-link-active' : ''}`}
              >
                overview
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`nav-link ${location.pathname === '/about' ? 'nav-link-active' : ''}`}
              >
                about
              </Link>
            </li>
            <li>
              <Link 
                to="/services" 
                className={`nav-link ${location.pathname === '/services' ? 'nav-link-active' : ''}`}
              >
                services
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`nav-link ${location.pathname === '/contact' ? 'nav-link-active' : ''}`}
              >
                contact
              </Link>
            </li>
          </ul>
        </nav>
        
        <button 
          className="block md:hidden text-primary p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : 'closed'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8 relative">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-4 text-primary p-2"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          <Link 
            to="/" 
            className="text-2xl font-serif"
            onClick={() => setMobileMenuOpen(false)}
          >
            overview
          </Link>
          <Link 
            to="/about" 
            className="text-2xl font-serif"
            onClick={() => setMobileMenuOpen(false)}
          >
            about
          </Link>
          <Link 
            to="/services" 
            className="text-2xl font-serif"
            onClick={() => setMobileMenuOpen(false)}
          >
            services
          </Link>
          <Link 
            to="/contact" 
            className="text-2xl font-serif"
            onClick={() => setMobileMenuOpen(false)}
          >
            contact
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

export default Navbar;