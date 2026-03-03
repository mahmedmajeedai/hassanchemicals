import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer-area">
      <div className="container footer-grid">
        <div className="footer-col about">
          <Link to="/" className="footer-logo">
            Hassan <span>Chemical</span>
          </Link>
          <p className="mt-4">
            A trusted leader in providing premium chemicals for textile, detergent, and food industries. Quality assurance and reliability at your service.
          </p>
        </div>

        <div className="footer-col links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Our Products</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-col contact">
          <h3>Contact Info</h3>
          <ul>
            <li>
              <a href="tel:+9203447733778">
                <Phone size={18} /> (+92) 03447733778
              </a>
            </li>
            <li>
              <a href="mailto:03447733778bilal@gmail.com">
                <Mail size={18} /> 03447733778bilal@gmail.com
              </a>
            </li>
            <li>
              <span className="address-item">
                <MapPin size={18} /> [Faisalabad - Regional Supply Hub], Pakistan
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Hassan Chemical. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        .footer-area {
          background: var(--primary);
          color: rgba(255, 255, 255, 0.8);
          padding: 5rem 0 0;
          margin-top: 5rem;
        }
        
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr;
          gap: 40px;
          padding-bottom: 4rem;
        }
        
        .footer-logo {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: white;
        }
        
        .footer-logo span {
          color: var(--accent);
        }
        
        .footer-col h3 {
          color: white;
          margin-bottom: 1.5rem;
          font-size: 1.2rem;
          position: relative;
          padding-bottom: 10px;
        }
        
        .footer-col h3:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background: var(--accent);
        }
        
        .footer-col ul li {
          margin-bottom: 12px;
        }
        
        .footer-col ul li a {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .footer-col ul li a:hover {
          color: var(--accent);
          transform: translateX(5px);
        }
        
        .address-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.5rem 0;
          text-align: center;
          font-size: 0.9rem;
        }
        
        .mt-4 { margin-top: 1.5rem; }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
          
          .footer-col h3:after {
            left: 50%;
            transform: translateX(-50%);
          }
          
          .footer-col ul li a {
            justify-content: center;
          }
          
          .address-item {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
