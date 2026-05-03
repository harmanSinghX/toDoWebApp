const express = require('express');
const supabase = require('../utils/supabase');
const { authenticateToken } = require('../middleware/auth');
const { validateTodo, validateTodoUpdate, rateLimit } = require('../utils/validation');
const router = express.Router();

// Get all todos for the authenticated user
router.get('/', authenticateToken, rateLimit(1000, 15 * 60 * 1000), async (req, res) => {
  try {
    const userId = req.user.id;
    const { completed, category_id, priority, search } = req.query;

    let query = supabase
      .from('todos')
      .select(`
        *,
        categories (
          id,
          name,
          color
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    // Apply filters
    if (completed !== undefined) {
      query = query.eq('completed', completed === 'true');
    }

    if (category_id) {
      query = query.eq('category_id', category_id);
    }

    if (priority) {
      query = query.eq('priority', priority);
    }

    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Get todos error:', error);
    res.status(500).json({ error: 'Failed to get todos' });
  }
});

// Get a specific todo
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const { data, error } = await supabase
      .from('todos')
      .select(`
        *,
        categories (
          id,
          name,
          color
        )
      `)
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Todo not found' });
      }
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Get todo error:', error);
    res.status(500).json({ error: 'Failed to get todo' });
  }
});

// Create a new todo
router.post('/', authenticateToken, rateLimit(100, 15 * 60 * 1000), validateTodo, async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, priority = 'medium', due_date, category_id } = req.body;

    if (!title || title.trim().length === 0) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const todoData = {
      user_id: userId,
      title: title.trim(),
      description: description ? description.trim() : null,
      priority,
      due_date: due_date || null,
      category_id: category_id || null,
    };

    const { data, error } = await supabase
      .from('todos')
      .insert([todoData])
      .select(`
        *,
        categories (
          id,
          name,
          color
        )
      `)
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (error) {
    console.error('Create todo error:', error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// Update a todo
router.put('/:id', authenticateToken, rateLimit(200, 15 * 60 * 1000), validateTodoUpdate, async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const updates = req.body;

    // Remove user_id from updates to prevent tampering
    delete updates.user_id;

    // Validate title if provided
    if (updates.title && (!updates.title.trim() || updates.title.trim().length === 0)) {
      return res.status(400).json({ error: 'Title cannot be empty' });
    }

    // Trim string fields
    if (updates.title) updates.title = updates.title.trim();
    if (updates.description) updates.description = updates.description.trim();

    const { data, error } = await supabase
      .from('todos')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('user_id', userId)
      .select(`
        *,
        categories (
          id,
          name,
          color
        )
      `)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Todo not found' });
      }
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Update todo error:', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// Delete a todo
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Delete todo error:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Bulk update todos
router.patch('/bulk', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { ids, updates } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'Todo IDs are required' });
    }

    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'Updates are required' });
    }

    // Remove user_id from updates to prevent tampering
    delete updates.user_id;

    const { data, error } = await supabase
      .from('todos')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .in('id', ids)
      .select(`
        *,
        categories (
          id,
          name,
          color
        )
      `);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Bulk update error:', error);
    res.status(500).json({ error: 'Failed to update todos' });
  }
});

module.exports = router;
