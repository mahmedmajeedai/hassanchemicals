import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import { products } from '../data/products';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="products-page">
      <section className="page-header">
        <div className="container">
          <h1>Our Products</h1>
          <p>Explore our wide range of premium chemicals for textile, detergent, and food industries.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ProductFilters 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm}
            category={category}
            setCategory={setCategory}
            categories={categories}
          />

          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <h3>No products found</h3>
              <p>Try adjusting your search or category filter.</p>
              <button 
                className="btn btn-outline mt-4" 
                onClick={() => {setSearchTerm(''); setCategory('All');}}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .page-header {
          background: var(--primary);
          color: white;
          padding: 4rem 0;
          text-align: center;
        }
        
        .page-header h1 {
          color: white;
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .page-header p {
          opacity: 0.8;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 25px;
        }
        
        .no-results {
          text-align: center;
          padding: 5rem 0;
          color: var(--text-muted);
        }
        
        .mt-4 { margin-top: 1.5rem; }
        
        .btn-outline {
          border: 1px solid var(--primary);
          color: var(--primary);
          padding: 10px 25px;
        }

        @media (max-width: 1200px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 480px) {
          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Products;
