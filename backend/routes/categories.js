const express = require('express');
const supabase = require('../utils/supabase');
const { authenticateToken } = require('../middleware/auth');
const { validateCategory, rateLimit } = require('../utils/validation');
const router = express.Router();

// Get all categories for the authenticated user
router.get('/', authenticateToken, rateLimit(1000, 15 * 60 * 1000), async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('user_id', userId)
      .order('name');

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Failed to get categories' });
  }
});

// Get a specific category
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Category not found' });
      }
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ error: 'Failed to get category' });
  }
});

// Create a new category
router.post('/', authenticateToken, rateLimit(50, 15 * 60 * 1000), validateCategory, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, color } = req.body;

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    // Check if category name already exists for this user
    const { data: existingCategory, error: checkError } = await supabase
      .from('categories')
      .select('id')
      .eq('user_id', userId)
      .eq('name', name.trim())
      .single();

    if (existingCategory) {
      return res.status(400).json({ error: 'Category name already exists' });
    }

    const categoryData = {
      user_id: userId,
      name: name.trim(),
      color: color || '#3b82f6', // Default blue color
    };

    const { data, error } = await supabase
      .from('categories')
      .insert([categoryData])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// Update a category
router.put('/:id', authenticateToken, rateLimit(100, 15 * 60 * 1000), validateCategory, async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { name, color } = req.body;

    if (name && name.trim().length === 0) {
      return res.status(400).json({ error: 'Category name cannot be empty' });
    }

    // Check if new name conflicts with existing categories
    if (name) {
      const { data: existingCategory, error: checkError } = await supabase
        .from('categories')
        .select('id')
        .eq('user_id', userId)
        .eq('name', name.trim())
        .neq('id', id)
        .single();

      if (existingCategory) {
        return res.status(400).json({ error: 'Category name already exists' });
      }
    }

    const updates = {};
    if (name) updates.name = name.trim();
    if (color) updates.color = color;

    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Category not found' });
      }
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// Delete a category
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // First, update all todos with this category to remove the category reference
    const { error: updateError } = await supabase
      .from('todos')
      .update({ category_id: null })
      .eq('category_id', id)
      .eq('user_id', userId);

    if (updateError) {
      console.error('Error updating todos:', updateError);
      // Continue with deletion even if todo update fails
    }

    // Then delete the category
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({
      message: 'Category deleted successfully',
      note: 'All todos in this category have been uncategorized'
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

// Get category statistics
router.get('/:id/stats', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Get total todos in category
    const { count: totalTodos, error: countError } = await supabase
      .from('todos')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', id)
      .eq('user_id', userId);

    if (countError) {
      return res.status(400).json({ error: countError.message });
    }

    // Get completed todos in category
    const { count: completedTodos, error: completedError } = await supabase
      .from('todos')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', id)
      .eq('user_id', userId)
      .eq('completed', true);

    if (completedError) {
      return res.status(400).json({ error: completedError.message });
    }

    res.json({
      category_id: id,
      total_todos: totalTodos || 0,
      completed_todos: completedTodos || 0,
      pending_todos: (totalTodos || 0) - (completedTodos || 0),
      completion_rate: totalTodos > 0 ? ((completedTodos || 0) / totalTodos * 100).toFixed(1) : 0
    });
  } catch (error) {
    console.error('Get category stats error:', error);
    res.status(500).json({ error: 'Failed to get category statistics' });
  }
});

module.exports = router;
