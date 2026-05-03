import React, { useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import './CategoryManager.css';

const CategoryManager = ({ categories, onAddCategory, onDeleteCategory }) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#3b82f6');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    await onAddCategory({
      name: newCategoryName.trim(),
      color: newCategoryColor,
    });

    setNewCategoryName('');
    setNewCategoryColor('#3b82f6');
    setIsAdding(false);
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category? All todos in this category will be uncategorized.')) {
      onDeleteCategory(categoryId);
    }
  };

  return (
    <div className="category-manager">
      <h3>Categories</h3>

      <div className="categories-list">
        {categories.map(category => (
          <div key={category.id} className="category-item">
            <div
              className="category-color"
              style={{ backgroundColor: category.color }}
            />
            <span className="category-name">{category.name}</span>
            <button
              className="category-delete-btn"
              onClick={() => handleDeleteCategory(category.id)}
              title="Delete category"
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>

      {isAdding ? (
        <div className="add-category-form">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category name"
            className="category-name-input"
            autoFocus
          />
          <input
            type="color"
            value={newCategoryColor}
            onChange={(e) => setNewCategoryColor(e.target.value)}
            className="category-color-input"
          />
          <div className="form-actions">
            <button
              className="cancel-btn"
              onClick={() => {
                setIsAdding(false);
                setNewCategoryName('');
                setNewCategoryColor('#3b82f6');
              }}
            >
              Cancel
            </button>
            <button
              className="add-btn"
              onClick={handleAddCategory}
              disabled={!newCategoryName.trim()}
            >
              Add
            </button>
          </div>
        </div>
      ) : (
        <button
          className="add-category-btn"
          onClick={() => setIsAdding(true)}
        >
          <FiPlus />
          Add Category
        </button>
      )}
    </div>
  );
};

export default CategoryManager;
