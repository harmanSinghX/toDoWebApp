import React from 'react';
import { FiLogOut, FiUser } from 'react-icons/fi';
import './Header.css';

const Header = ({
  user,
  onSignOut,
  activeView,
  onViewChange,
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  const handleSignOut = async () => {
    await onSignOut();
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="app-title">Todo App</h1>
        </div>

        <div className="header-center">
          <div className="view-filters">
            <button
              className={`filter-btn ${activeView === 'all' ? 'active' : ''}`}
              onClick={() => onViewChange('all')}
            >
              All
            </button>
            <button
              className={`filter-btn ${activeView === 'pending' ? 'active' : ''}`}
              onClick={() => onViewChange('pending')}
            >
              Pending
            </button>
            <button
              className={`filter-btn ${activeView === 'completed' ? 'active' : ''}`}
              onClick={() => onViewChange('completed')}
            >
              Completed
            </button>
          </div>

          <div className="category-filter">
            <select
              value={selectedCategory || ''}
              onChange={(e) => onCategoryChange(e.target.value || null)}
              className="category-select"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="header-right">
          <div className="user-info">
            <FiUser className="user-icon" />
            <span className="user-email">{user?.email}</span>
          </div>
          <button
            className="sign-out-btn"
            onClick={handleSignOut}
            title="Sign Out"
          >
            <FiLogOut />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
