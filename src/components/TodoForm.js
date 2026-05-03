import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import './TodoForm.css';

const TodoForm = ({ onAddTodo, categories }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const todoData = {
      title: title.trim(),
      description: description.trim(),
      priority,
      due_date: dueDate || null,
      category_id: categoryId || null,
    };

    await onAddTodo(todoData);

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setCategoryId('');
    setIsExpanded(false);
  };

  return (
    <div className="todo-form-container">
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-row">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="title-input"
            required
          />
          <button
            type="button"
            className="expand-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <FiPlus className={isExpanded ? 'rotated' : ''} />
          </button>
          <button type="submit" className="add-btn" disabled={!title.trim()}>
            Add Todo
          </button>
        </div>

        {isExpanded && (
          <div className="expanded-fields">
            <div className="form-row">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description..."
                className="description-input"
                rows="3"
              />
            </div>

            <div className="form-row">
              <div className="field-group">
                <label>Priority:</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="priority-select"
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
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="date-input"
                />
              </div>

              <div className="field-group">
                <label>Category:</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="category-select"
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
        )}
      </form>
    </div>
  );
};

export default TodoForm;
