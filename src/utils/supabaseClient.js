import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

console.log('Environment variables:', { supabaseUrl, supabaseAnonKey });

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// API Base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Helper function to get auth token
const getAuthToken = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token;
};

// Helper function for API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = await getAuthToken();
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }

  return response.json();
};

// Authentication functions
export const authService = {
  async signIn(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }

    return response.json();
  },

  async signUp(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }

    return response.json();
  },

  async signOut() {
    return apiRequest('/auth/logout', { method: 'POST' });
  },

  async resetPassword(email) {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }

    return response.json();
  },

  async getCurrentUser() {
    return apiRequest('/auth/me');
  },
};

// Todo service functions
export const todoService = {
  async getTodos(filters = {}) {
    const queryParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });

    const queryString = queryParams.toString();
    const endpoint = `/todos${queryString ? `?${queryString}` : ''}`;

    return apiRequest(endpoint);
  },

  async createTodo(todo) {
    return apiRequest('/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
    });
  },

  async updateTodo(id, updates) {
    return apiRequest(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  async deleteTodo(id) {
    return apiRequest(`/todos/${id}`, {
      method: 'DELETE',
    });
  },

  async bulkUpdateTodos(ids, updates) {
    return apiRequest('/todos/bulk', {
      method: 'PATCH',
      body: JSON.stringify({ ids, updates }),
    });
  },
};

// Category service functions
export const categoryService = {
  async getCategories() {
    return apiRequest('/categories');
  },

  async createCategory(category) {
    return apiRequest('/categories', {
      method: 'POST',
      body: JSON.stringify(category),
    });
  },

  async updateCategory(id, updates) {
    return apiRequest(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  async deleteCategory(id) {
    return apiRequest(`/categories/${id}`, {
      method: 'DELETE',
    });
  },

  async getCategoryStats(id) {
    return apiRequest(`/categories/${id}/stats`);
  },
};
