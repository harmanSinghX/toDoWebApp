import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import './TodoItem.css';

const TodoItem = ({ todo, onUpdate, onDelete, categoryName, categoryColor, categories = [] }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [editDueDate, setEditDueDate] = useState(todo.due_date ? todo.due_date.split('T')[0] : '');
  const [editPriority, setEditPriority] = useState(todo.priority || 'medium');
  const [editCategoryId, setEditCategoryId] = useState(todo.category_id || '');

  const handleToggleComplete = () => {
    onUpdate(todo.id, { completed: !todo.completed });
  };

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      const updates = {
        title: editTitle.trim(),
        description: editDescription.trim(),
        priority: editPriority,
        due_date: editDueDate || null,
        category_id: editCategoryId || null,
      };
      onUpdate(todo.id, updates);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setEditDueDate(todo.due_date ? todo.due_date.split('T')[0] : '');
    setEditPriority(todo.priority || 'medium');
    setEditCategoryId(todo.category_id || '');
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      onDelete(todo.id);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const isOverdue = () => {
    if (!todo.due_date || todo.completed) return false;
    const dueDate = new Date(todo.due_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isOverdue() ? 'overdue' : ''}`}>
      <div className="todo-content">
        <div className="todo-header">
          <div className="todo-checkbox">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggleComplete}
              id={`todo-${todo.id}`}
            />
            <label htmlFor={`todo-${todo.id}`}></label>
          </div>

          <div className="todo-main">
            {isEditing ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="edit-title"
                  placeholder="Todo title..."
                  autoFocus
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="edit-description"
                  placeholder="Description..."
                  rows="2"
                />
                <div className="edit-fields">
                  <div className="field-group">
                    <label>Priority:</label>
                    <select
                      value={editPriority}
                      onChange={(e) => setEditPriority(e.target.value)}
                      className="edit-priority"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="field-group">
                    <label>Due Date:</label>
                    <input
                      type="date"
                      value={editDueDate}
                      onChange={(e) => setEditDueDate(e.target.value)}
                      className="edit-date"
                    />
                  </div>
                  <div className="field-group">
                    <label>Category:</label>
                    <select
                      value={editCategoryId}
                      onChange={(e) => setEditCategoryId(e.target.value)}
                      className="edit-category"
                    >
                      <option value="">No Category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="todo-text">
                <h3 className="todo-title">{todo.title}</h3>
                {todo.description && (
                  <p className="todo-description">{todo.description}</p>
                )}
              </div>
            )}
          </div>

          <div className="todo-actions">
            {isEditing ? (
              <>
                <button
                  className="action-btn save-btn"
                  onClick={handleSaveEdit}
                  title="Save"
                >
                  <FiCheck />
                </button>
                <button
                  className="action-btn cancel-btn"
                  onClick={handleCancelEdit}
                  title="Cancel"
                >
                  <FiX />
                </button>
              </>
            ) : (
              <>
                <button
                  className="action-btn edit-btn"
                  onClick={() => setIsEditing(true)}
                  title="Edit"
                >
                  <FiEdit2 />
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={handleDelete}
                  title="Delete"
                >
                  <FiTrash2 />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="todo-footer">
          <div className="todo-meta">
            <span className={`priority-badge priority-${todo.priority}`}>
              {todo.priority}
            </span>

            {categoryName && (
              <span
                className="category-badge"
                style={{ backgroundColor: categoryColor || '#e0e0e0' }}
              >
                {categoryName}
              </span>
            )}

            {todo.due_date && (
              <span className={`due-date ${isOverdue() ? 'overdue' : ''}`}>
                Due: {formatDate(todo.due_date)}
              </span>
            )}
          </div>

          <div className="todo-date">
            Created: {formatDate(todo.created_at)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
