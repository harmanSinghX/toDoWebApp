import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import CategoryManager from '../components/CategoryManager';
import Header from '../components/Header';
import { todoService, categoryService } from '../utils/supabaseClient';
import './Dashboard.css';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('all'); // 'all', 'pending', 'completed'
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load todos and categories in parallel
      const [todosData, categoriesData] = await Promise.all([
        todoService.getTodos(),
        categoryService.getCategories()
      ]);

      setTodos(todosData || []);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todoData) => {
    try {
      const newTodo = await todoService.createTodo(todoData);
      setTodos(prev => [newTodo, ...prev]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleUpdateTodo = async (id, updates) => {
    try {
      const updatedTodo = await todoService.updateTodo(id, updates);
      setTodos(prev => prev.map(todo =>
        todo.id === id ? updatedTodo : todo
      ));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleAddCategory = async (categoryData) => {
    try {
      const newCategory = await categoryService.createCategory(categoryData);
      setCategories(prev => [...prev, newCategory]);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (activeView === 'pending') return !todo.completed;
    if (activeView === 'completed') return todo.completed;
    if (selectedCategory) return todo.category_id === selectedCategory;
    return true;
  });

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your todos...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Header
        user={user}
        onSignOut={signOut}
        activeView={activeView}
        onViewChange={setActiveView}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="dashboard-content">
        <div className="dashboard-sidebar">
          <CategoryManager
            categories={categories}
            onAddCategory={handleAddCategory}
            onDeleteCategory={async (id) => {
              try {
                await categoryService.deleteCategory(id);
                setCategories(prev => prev.filter(cat => cat.id !== id));
              } catch (error) {
                console.error('Error deleting category:', error);
              }
            }}
          />
        </div>

        <div className="dashboard-main">
          <TodoForm onAddTodo={handleAddTodo} categories={categories} />

          <TodoList
            todos={filteredTodos}
            onUpdateTodo={handleUpdateTodo}
            onDeleteTodo={handleDeleteTodo}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
