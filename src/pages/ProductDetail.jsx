import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, CheckCircle2, Phone, Mail, AlertCircle } from 'lucide-react';
import { products } from '../data/products';
import Accordion from '../components/Accordion';
import ProductCard from '../components/ProductCard';
import { sendInquiry, isEmailConfigured } from '../utils/email';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.slug === slug);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    honeypot: ''
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [errorMsg, setErrorMsg] = useState('');
  const [configError, setConfigError] = useState(false);

  useEffect(() => {
    // Check configuration on mount
    setConfigError(!isEmailConfigured());
  }, []);

  useEffect(() => {
    if (product) {
      setFormData(prev => ({
        ...prev,
        message: `I want a quote for ${product.name}.`
      }));
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container section text-center">
        <h2>Product not found</h2>
        <Link to="/products" className="btn btn-primary mt-4">Back to Products</Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  // Helper to format camelCase keys to Title Case
  const formatKey = (key) => {
    const result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  const accordionItems = Object.entries(product.sections).map(([key, value]) => ({
    title: formatKey(key),
    content: value
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.honeypot) return; // Spam check

    if (configError) {
      setStatus('error');
      setErrorMsg('Email service not configured. Please use our contact page or email directly.');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      await sendInquiry({
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: `Quote Request: ${product.name}`,
        message: formData.message,
        product: product.name
      });
      setStatus('success');
      setTimeout(() => {
        navigate('/contact', { state: { fromProduct: product.name, success: true } });
      }, 2000);
    } catch (error) {
      console.error('Email send error:', error);
      setStatus('error');
      setErrorMsg('Failed to send. Please try again.');
    }
  };

  return (
    <div className="product-detail-page">
      <div className="container section">
        <Link to="/products" className="back-link">
          <ArrowLeft size={18} /> Back to Products
        </Link>
        
        <div className="detail-grid">
          <div className="detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          
          <div className="detail-info">
            <span className="category-label">{product.category}</span>
            <h1>{product.name}</h1>
            <p className="description">{product.shortDescription}</p>
            
            <div className="accordion-wrapper">
              <Accordion items={accordionItems} />
            </div>

            <div className="quick-contact-box">
              <h3>Direct Inquiry</h3>
              <div className="contact-links">
                <a href="tel:+9203447733778" className="contact-btn phone">
                  <Phone size={18} /> (+92) 03447733778
                </a>
                <a href="mailto:03447733778bilal@gmail.com" className="contact-btn email">
                  <Mail size={18} /> Email Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Form */}
        <div className="quote-section">
          <div className="quote-form-card">
            <h2>Request a Quote</h2>
            <p>Fill out the form below and we will get back to you with pricing and availability for **{product.name}**.</p>
            
            {status === 'success' ? (
              <div className="success-message">
                <CheckCircle2 size={48} color="var(--accent)" />
                <h3>Quote Request Sent!</h3>
                <p>Redirecting you to our contact page...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="quote-form">
                {/* Honeypot */}
                <div style={{ display: 'none' }}>
                  <input 
                    type="text" 
                    value={formData.honeypot} 
                    onChange={(e) => setFormData({...formData, honeypot: e.target.value})} 
                  />
                </div>

                <div className="form-group">
                  <label>Full Name <span className="required">*</span></label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address <span className="required">*</span></label>
                    <input 
                      type="email" 
                      required 
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+92 3XX XXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Message <span className="required">*</span></label>
                  <textarea 
                    rows="4" 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>

                {status === 'error' && (
                  <div className="error-note">
                    <AlertCircle size={18} />
                    {errorMsg}
                  </div>
                )}

                <button 
                  type="submit" 
                  className={`btn btn-submit ${status === 'sending' ? 'loading' : ''}`}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Quote Request'} <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-section">
            <h2 className="related-title">Related Products</h2>
            <div className="related-grid">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .back-link { display: inline-flex; align-items: center; gap: 8px; color: var(--text-muted); margin-bottom: 2rem; font-weight: 500; }
        .back-link:hover { color: var(--accent); }
        .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: start; }
        .detail-image img { width: 100%; border-radius: var(--radius-md); box-shadow: var(--shadow-md); border: 1px solid var(--border); }
        .category-label { color: var(--accent); font-weight: 600; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1px; }
        .detail-info h1 { font-size: 2.5rem; margin: 10px 0 20px; }
        .description { font-size: 1.1rem; color: var(--text-muted); margin-bottom: 2rem; }
        .accordion-wrapper { margin-bottom: 2.5rem; }
        .quick-contact-box { background: var(--bg); padding: 25px; border-radius: var(--radius-md); border: 1px dashed var(--accent); }
        .quick-contact-box h3 { font-size: 1.1rem; margin-bottom: 15px; }
        .contact-links { display: flex; gap: 15px; flex-wrap: wrap; }
        .contact-btn { display: flex; align-items: center; gap: 10px; padding: 10px 20px; border-radius: var(--radius-sm); font-weight: 600; font-size: 0.9rem; }
        .contact-btn.phone { background: var(--primary); color: white; }
        .contact-btn.email { background: var(--accent); color: white; }
        .quote-section { margin-top: 5rem; display: flex; justify-content: center; }
        .quote-form-card { background: white; padding: 3rem; border-radius: var(--radius-md); box-shadow: var(--shadow-md); width: 100%; max-width: 800px; border: 1px solid var(--border); }
        .quote-form-card h2 { text-align: center; margin-bottom: 15px; }
        .quote-form-card p { text-align: center; color: var(--text-muted); margin-bottom: 30px; }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; margin-bottom: 8px; font-weight: 600; font-size: 0.9rem; }
        .required { color: #e11d48; }
        .form-group input, .form-group textarea { width: 100%; padding: 12px 15px; border: 1px solid var(--border); border-radius: var(--radius-sm); font-family: inherit; font-size: 1rem; }
        .form-group input:focus, .form-group textarea:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(26, 166, 183, 0.1); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .btn-submit { background: var(--primary); color: white; width: 100%; padding: 15px; gap: 10px; font-size: 1rem; margin-top: 10px; }
        .btn-submit:hover { background: var(--primary-light); transform: translateY(-2px); }
        .btn-submit.loading { opacity: 0.7; cursor: wait; }
        .success-message { text-align: center; padding: 3rem 0; }
        .error-note { background: #fee2e2; color: #b91c1c; padding: 12px; border-radius: var(--radius-sm); margin-bottom: 20px; display: flex; align-items: center; gap: 10px; font-size: 0.9rem; }
        .related-section { margin-top: 6rem; }
        .related-title { margin-bottom: 2.5rem; text-align: center; }
        .related-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 25px; }
        @media (max-width: 1024px) { .detail-grid { grid-template-columns: 1fr; gap: 30px; } .related-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) { .form-row { grid-template-columns: 1fr; } .quote-form-card { padding: 2rem; } .related-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
};

export default ProductDetail;
