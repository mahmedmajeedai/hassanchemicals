import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div 
          key={index} 
          className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
        >
          <button 
            className="accordion-header" 
            onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
          >
            <span>{item.title}</span>
            <ChevronDown size={20} className="icon" />
          </button>
          
          <div className="accordion-content">
            <div className="content-inner">
              {item.content}
            </div>
          </div>
        </div>
      ))}

      <style jsx>{`
        .accordion {
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
          background: white;
        }
        
        .accordion-item {
          border-bottom: 1px solid var(--border);
        }
        
        .accordion-item:last-child {
          border-bottom: none;
        }
        
        .accordion-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 25px;
          background: none;
          text-align: left;
          font-size: 1.05rem;
          color: var(--primary);
          font-weight: 600;
          transition: var(--transition);
        }
        
        .accordion-header:hover {
          background: var(--bg);
        }
        
        .accordion-item.active .accordion-header {
          background: var(--bg);
          color: var(--accent);
        }
        
        .icon {
          transition: transform 0.3s ease;
        }
        
        .accordion-item.active .icon {
          transform: rotate(180deg);
        }
        
        .accordion-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out, padding 0.3s ease;
          background: white;
        }
        
        .accordion-item.active .accordion-content {
          max-height: 500px;
        }
        
        .content-inner {
          padding: 20px 25px;
          color: var(--text-muted);
          line-height: 1.7;
          font-size: 0.95rem;
        }
      `}</style>
    </div>
  );
};

export default Accordion;
