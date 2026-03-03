import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="category-tag">{product.category}</span>
      </div>
      <div className="product-content">
        <h3>{product.name}</h3>
        <p className="short-desc">{product.shortDescription}</p>
        <Link to={`/products/${product.slug}`} className="view-btn">
          View Details <ArrowRight size={16} />
        </Link>
      </div>

      <style jsx>{`
        .product-card {
          background: var(--card-bg);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: var(--transition);
          height: 100%;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border);
        }
        
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-md);
          border-color: var(--accent-muted);
        }
        
        .product-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .product-card:hover .product-image img {
          transform: scale(1.1);
        }
        
        .category-tag {
          position: absolute;
          top: 15px;
          left: 15px;
          background: var(--primary);
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        
        .product-content {
          padding: 1.5rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        
        .product-content h3 {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
          color: var(--primary);
        }
        
        .short-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }
        
        .view-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--accent);
          font-weight: 600;
          font-size: 0.95rem;
          transition: var(--transition);
        }
        
        .view-btn:hover {
          gap: 12px;
          color: var(--accent-muted);
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
