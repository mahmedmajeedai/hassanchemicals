import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { sendInquiry, isEmailConfigured } from '../utils/email';

const Contact = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Website Inquiry',
    message: '',
    honeypot: '' // Anti-spam honeypot
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [errorMsg, setErrorMsg] = useState('');
  const [configError, setConfigError] = useState(false);

  useEffect(() => {
    // Check configuration on mount
    setConfigError(!isEmailConfigured());
  }, []);

  useEffect(() => {
    if (location.state?.fromProduct) {
      setFormData(prev => ({
        ...prev,
        subject: `Inquiry: ${location.state.fromProduct}`,
        message: `I am interested in ${location.state.fromProduct}. Please provide more details.`
      }));
    }
  }, [location.state]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Anti-spam honeypot check
    if (formData.honeypot) {
      console.log('Spam detected');
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (configError) {
      setStatus('error');
      setErrorMsg('Email service not configured yet. Please email us directly.');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      await sendInquiry({
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      });
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: 'Website Inquiry', message: '', honeypot: '' });
    } catch (error) {
      console.error('Email send error:', error);
      setStatus('error');
      setErrorMsg('Failed to send. Please try again or email us directly.');
    }
  };

  return (
    <div className="contact-page">
      <section className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Have questions or need a bulk order quote? Reach out to our team.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          {/* Contact Info Side */}
          <div className="contact-info-cards">
            <div className="info-card">
              <div className="icon-box"><Phone size={24} /></div>
              <div className="info-text">
                <h3>Phone</h3>
                <p>Available Mon-Sat, 9am-6pm</p>
                <a href="tel:+9203447733778">(+92) 03447733778</a>
              </div>
            </div>
            
            <div className="info-card">
              <div className="icon-box"><Mail size={24} /></div>
              <div className="info-text">
                <h3>Email</h3>
                <p>Send us your requirements</p>
                <a href="mailto:03447733778bilal@gmail.com">03447733778bilal@gmail.com</a>
              </div>
            </div>
            
            <div className="info-card">
              <div className="icon-box"><MapPin size={24} /></div>
              <div className="info-text">
                <h3>Faisalabad Office</h3>
                <p>Industrial Supply Hub</p>
                <span>Pakistan</span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="contact-form-container">
            {status === 'success' ? (
              <div className="form-feedback success">
                <CheckCircle2 size={48} />
                <h2>Message Sent Successfully!</h2>
                <p>Thank you for contacting Hassan Chemical. We will get back to you shortly.</p>
                <button className="btn btn-outline mt-4" onClick={() => setStatus('idle')}>Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <h2>Send Message</h2>
                
                {/* Honeypot field - hidden from users */}
                <div style={{ display: 'none' }}>
                  <input 
                    type="text" 
                    name="honeypot" 
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
                  <label>Subject</label>
                  <input 
                    type="text" 
                    placeholder="What is this about?"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Your Message <span className="required">*</span></label>
                  <textarea 
                    rows="5" 
                    required 
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                
                {status === 'error' && (
                  <div className="error-note">
                    <AlertCircle size={18} />
                    {errorMsg || "Something went wrong. Please try again."}
                  </div>
                )}
                
                <button 
                  type="submit" 
                  className={`btn btn-submit ${status === 'sending' ? 'loading' : ''}`}
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'} <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        .page-header { background: var(--primary); color: white; padding: 4rem 0; text-align: center; }
        .page-header h1 { color: white; margin-bottom: 1rem; }
        .page-header p { opacity: 0.8; }
        .contact-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 50px; align-items: start; }
        .info-card { display: flex; gap: 20px; padding: 25px; background: white; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); margin-bottom: 20px; border: 1px solid var(--border); transition: var(--transition); }
        .info-card:hover { border-color: var(--accent); transform: translateX(5px); }
        .icon-box { width: 50px; height: 50px; background: rgba(26, 166, 183, 0.1); color: var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .info-text h3 { font-size: 1.1rem; margin-bottom: 5px; }
        .info-text p { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 5px; }
        .info-text a { font-weight: 600; color: var(--primary); }
        .info-text a:hover { color: var(--accent); }
        .contact-form { background: white; padding: 3rem; border-radius: var(--radius-md); box-shadow: var(--shadow-md); border: 1px solid var(--border); }
        .contact-form h2 { margin-bottom: 2rem; }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; margin-bottom: 8px; font-weight: 600; font-size: 0.9rem; }
        .required { color: #e11d48; }
        .form-group input, .form-group textarea { width: 100%; padding: 12px 15px; border: 1px solid var(--border); border-radius: var(--radius-sm); font-family: inherit; font-size: 0.95rem; }
        .form-group input:focus, .form-group textarea:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(26, 166, 183, 0.1); }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .btn-submit { background: var(--accent); color: white; width: 100%; padding: 15px; gap: 10px; font-size: 1rem; }
        .btn-submit:hover { background: var(--accent-muted); transform: translateY(-2px); }
        .btn-submit.loading { opacity: 0.7; cursor: wait; }
        .form-feedback { text-align: center; padding: 4rem 2rem; background: white; border-radius: var(--radius-md); border: 1px solid var(--border); box-shadow: var(--shadow-md); }
        .form-feedback success { color: var(--accent); }
        .form-feedback h2 { margin: 20px 0 10px; color: var(--primary); }
        .form-feedback p { color: var(--text-muted); margin-bottom: 2rem; }
        .error-note { background: #fee2e2; color: #b91c1c; padding: 12px; border-radius: var(--radius-sm); margin-bottom: 20px; display: flex; align-items: center; gap: 10px; font-size: 0.9rem; }
        @media (max-width: 1024px) { .contact-grid { grid-template-columns: 1fr; } }
        @media (max-width: 768px) { .contact-form { padding: 2rem; } .form-row { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
};

export default Contact;
