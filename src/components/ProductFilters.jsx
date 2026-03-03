import React from 'react';
import { Search, Filter } from 'lucide-react';

const ProductFilters = ({ searchTerm, setSearchTerm, category, setCategory, categories }) => {
  return (
    <div className="filters-container">
      <div className="search-box">
        <Search className="search-icon" size={20} />
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filter-box">
        <Filter className="filter-icon" size={20} />
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <style jsx>{`
        .filters-container {
          display: flex;
          gap: 20px;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }
        
        .search-box, .filter-box {
          position: relative;
          display: flex;
          align-items: center;
          background: white;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 0 15px;
          height: 50px;
          transition: var(--transition);
        }
        
        .search-box {
          flex: 2;
          min-width: 250px;
        }
        
        .filter-box {
          flex: 1;
          min-width: 200px;
        }
        
        .search-box:focus-within, .filter-box:focus-within {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(26, 166, 183, 0.1);
        }
        
        .search-icon, .filter-icon {
          color: var(--text-muted);
          margin-right: 12px;
        }
        
        input, select {
          width: 100%;
          border: none;
          outline: none;
          background: none;
          font-family: inherit;
          font-size: 0.95rem;
          color: var(--text-main);
        }
        
        select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right center;
          padding-right: 30px;
        }

        @media (max-width: 768px) {
          .filters-container {
            flex-direction: column;
            gap: 15px;
          }
          .search-box, .filter-box {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductFilters;
