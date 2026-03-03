import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className={`sticky-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="top-bar">
        <div className="container header-flex">
          <div className="contact-info">
            <a href="tel:+9203447733778" className="contact-item">
              <Phone size={14} /> (+92) 03447733778
            </a>
            <a href="mailto:03447733778bilal@gmail.com" className="contact-item">
              <Mail size={14} /> 03447733778bilal@gmail.com
            </a>
          </div>
        </div>
      </div>
      
      <div className="main-header">
        <div className="container header-flex">
          <Link to="/" className="logo">
            Hassan <span>Chemical</span>
          </Link>

          <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
            <Link to="/products" className={`nav-link ${location.pathname.startsWith('/products') ? 'active' : ''}`}>Products</Link>
            <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
            
            <div className="mobile-only mt-4">
              <a href="tel:+9203447733778" className="btn btn-primary w-full mb-2">Call Now</a>
              <a href="mailto:03447733778bilal@gmail.com" className="btn btn-outline w-full">Email Us</a>
            </div>
          </nav>

          <div className="header-actions hide-mobile">
            <a href="tel:+9203447733778" className="btn btn-primary">Call Now</a>
          </div>

          <button className="menu-toggle mobile-only" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <style jsx>{`
        .sticky-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: var(--card-bg);
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
        }
        
        .top-bar {
          background: var(--primary);
          color: white;
          padding: 6px 0;
          font-size: 0.8rem;
        }
        
        .contact-info {
          display: flex;
          gap: 20px;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 6px;
          opacity: 0.9;
        }
        
        .contact-item:hover {
          opacity: 1;
        }
        
        .main-header {
          padding: 15px 0;
          border-bottom: 1px solid var(--border);
        }
        
        .header-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary);
        }
        
        .logo span {
          color: var(--accent);
        }
        
        .nav-menu {
          display: flex;
          gap: 30px;
        }
        
        .nav-link {
          font-weight: 500;
          color: var(--text-main);
          position: relative;
          padding: 5px 0;
        }
        
        .nav-link:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--accent);
          transition: var(--transition);
        }
        
        .nav-link:hover:after, .nav-link.active:after {
          width: 100%;
        }
        
        .nav-link.active {
          color: var(--accent);
        }
        
        .btn-primary {
          background: var(--primary);
          color: white;
          padding: 10px 20px;
          font-size: 0.9rem;
        }
        
        .btn-primary:hover {
          background: var(--primary-light);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        
        .btn-outline {
          border: 1px solid var(--primary);
          color: var(--primary);
          padding: 10px 20px;
        }

        .menu-toggle {
          background: none;
          color: var(--primary);
        }

        @media (max-width: 768px) {
          .hide-mobile {
            display: none;
          }
          
          .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: white;
            flex-direction: column;
            padding: 40px 20px;
            transition: 0.4s ease;
            box-shadow: var(--shadow-md);
            z-index: 999;
          }
          
          .nav-menu.active {
            left: 0;
          }
          
          .mobile-only {
            display: block;
          }
          
          .w-full {
            width: 100%;
          }
          
          .mb-2 { margin-bottom: 0.5rem; }
          .mt-4 { margin-top: 1.5rem; }
        }
        
        @media (min-width: 769px) {
          .mobile-only {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
