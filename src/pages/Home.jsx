import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Factory, ShieldCheck, Zap } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home = () => {
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1>Textile Detergent & Food Chemicals Supplier</h1>
          <p>Hassan Chemical supplies high-quality industrial chemicals, surfactants, and food-grade ingredients with reliable packaging and quality assurance.</p>
          <div className="hero-btns">
            <Link to="/products" className="btn btn-hero-primary">
              View Products <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn btn-hero-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title">Industries We Serve</h2>
          <div className="industry-grid">
            <div className="industry-card">
              <div className="industry-icon"><Factory size={40} /></div>
              <h3>Textile & Detergent Manufacturing</h3>
              <p>State-of-the-art chemicals for soap bases, surfactants, and textile processing agents.</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon"><ShieldCheck size={40} /></div>
              <h3>Industrial Chemical Supply</h3>
              <p>Reliable solvents, acids, and bases for diverse industrial applications and manufacturing.</p>
            </div>
            <div className="industry-card">
              <div className="industry-icon"><Zap size={40} /></div>
              <h3>Food Chemicals & Ingredients</h3>
              <p>High-purity food grade additives, flavors, and ingredients for the food processing industry.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-item">
              <CheckCircle className="feature-icon" />
              <div>
                <h4>Consistent Quality</h4>
                <p>We ensure every batch meets rigid specifications for industrial performance.</p>
              </div>
            </div>
            <div className="feature-item">
              <CheckCircle className="feature-icon" />
              <div>
                <h4>Reliable Packaging</h4>
                <p>Standardized packaging from 1kg to jumbo bags for safe handling and storage.</p>
              </div>
            </div>
            <div className="feature-item">
              <CheckCircle className="feature-icon" />
              <div>
                <h4>COA/MSDS Support</h4>
                <p>Full documentation provided for compliance and safety standards.</p>
              </div>
            </div>
            <div className="feature-item">
              <CheckCircle className="feature-icon" />
              <div>
                <h4>Quick Availability</h4>
                <p>Maintained stock levels to ensure minimal lead times for your production.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="container">
          <div className="section-header-flex">
            <h2 className="section-title text-left">Featured Products</h2>
            <Link to="/products" className="view-all-link">View All Products <ArrowRight size={16} /></Link>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Strip */}
      <section className="contact-strip">
        <div className="container strip-flex">
          <div className="strip-text">
            <h2>Ready to place an order?</h2>
            <p>Get in touch with us today for a custom quote or product samples.</p>
          </div>
          <div className="strip-actions">
            <a href="tel:+9203447733778" className="btn btn-white">Call Now</a>
            <Link to="/contact" className="btn btn-accent">Send Inquiry</Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero {
          background: linear-gradient(rgba(11, 31, 59, 0.85), rgba(11, 31, 59, 0.85)), url('https://picsum.photos/seed/chemical-factory/1920/1080');
          background-size: cover;
          background-position: center;
          height: 80vh;
          min-height: 500px;
          display: flex;
          align-items: center;
          color: white;
          text-align: center;
        }
        
        .hero-content {
          max-width: 800px;
        }
        
        .hero h1 {
          font-size: 3.5rem;
          color: white;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }
        
        .hero p {
          font-size: 1.25rem;
          opacity: 0.9;
          margin-bottom: 2.5rem;
        }
        
        .hero-btns {
          display: flex;
          gap: 20px;
          justify-content: center;
        }
        
        .btn-hero-primary {
          background: var(--accent);
          color: white;
          padding: 15px 35px;
          font-size: 1rem;
        }
        
        .btn-hero-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
          padding: 15px 35px;
          font-size: 1rem;
        }
        
        .btn-hero-primary:hover {
          background: #1594a5;
          transform: translateY(-3px);
        }
        
        .btn-hero-secondary:hover {
          background: white;
          color: var(--primary);
        }
        
        .bg-white { background: white; }
        .bg-light { background: #f1f5f9; }
        
        .industry-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        
        .industry-card {
          padding: 3rem 2rem;
          background: var(--bg);
          border-radius: var(--radius-md);
          text-align: center;
          transition: var(--transition);
        }
        
        .industry-card:hover {
          background: white;
          box-shadow: var(--shadow-md);
          transform: translateY(-5px);
        }
        
        .industry-icon {
          color: var(--accent);
          margin-bottom: 1.5rem;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
        }
        
        .feature-item {
          display: flex;
          gap: 20px;
        }
        
        .feature-icon {
          color: var(--accent);
          flex-shrink: 0;
        }
        
        .section-header-flex {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 3rem;
        }
        
        .text-left { margin-bottom: 0; }
        
        .view-all-link {
          color: var(--accent);
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        
        .contact-strip {
          background: var(--primary);
          color: white;
          padding: 4rem 0;
        }
        
        .strip-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
        }
        
        .strip-text h2 {
          color: white;
          margin-bottom: 10px;
        }
        
        .strip-actions {
          display: flex;
          gap: 15px;
        }
        
        .btn-white {
          background: white;
          color: var(--primary);
          padding: 12px 25px;
        }
        
        .btn-accent {
          background: var(--accent);
          color: white;
          padding: 12px 25px;
        }

        @media (max-width: 1024px) {
          .industry-grid, .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .hero h1 { font-size: 2.5rem; }
          .industry-grid, .products-grid { grid-template-columns: 1fr; }
          .features-grid { grid-template-columns: 1fr; }
          .strip-flex { flex-direction: column; text-align: center; }
          .hero-btns { flex-direction: column; }
          .section-header-flex { flex-direction: column; align-items: center; gap: 15px; }
        }
      `}</style>
    </div>
  );
};

export default Home;
