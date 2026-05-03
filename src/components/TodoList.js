import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ todos, onUpdateTodo, onDeleteTodo, categories }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No todos found</h3>
        <p>Add your first todo to get started!</p>
      </div>
    );
  }

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  };

  const getCategoryColor = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : null;
  };

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdateTodo}
          onDelete={onDeleteTodo}
          categoryName={getCategoryName(todo.category_id)}
          categoryColor={getCategoryColor(todo.category_id)}
          categories={categories}
        />
      ))}
    </div>
  );
};

export default TodoList;
