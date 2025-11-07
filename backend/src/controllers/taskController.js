const pool = require('../config/db');
const { validationResult } = require('express-validator');

exports.createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, description, status, priority, dueDate } = req.body;
    const [result] = await pool.query(
      'INSERT INTO tasks (title, description, status, priority, dueDate, userId) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, status || 'pending', priority || 'medium', dueDate || null, req.user.id]
    );

    res.status(201).json({ message: 'Task created', taskId: result.insertId });
  } catch (err) {
    next(err);
  }
};

exports.getTasks = async (req, res) => {
  try {
    let query, params;

    if (req.user.role === 'admin') {
      query = 'SELECT * FROM tasks ORDER BY dueDate ASC';
      params = [];
    } else {
      query = 'SELECT * FROM tasks WHERE userId = ? ORDER BY dueDate ASC';
      params = [req.user.id];
    }

    const [rows] = await pool.query(query, params);
    res.status(200).json({ tasks: rows });
  } catch (err) {
    console.error('Fetch tasks error:', err);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};


exports.getTaskById = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Task not found' });

    const task = rows[0];
    if (req.user.role !== 'admin' && task.userId !== req.user.id)
      return res.status(403).json({ message: 'Forbidden' });

    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Task not found' });

    const task = rows[0];
    if (req.user.role !== 'admin' && task.userId !== req.user.id)
      return res.status(403).json({ message: 'Forbidden' });

    const { title, description, status, priority, dueDate } = req.body;
    await pool.query(
      'UPDATE tasks SET title=?, description=?, status=?, priority=?, dueDate=? WHERE id=?',
      [title, description, status, priority, dueDate, req.params.id]
    );
    res.json({ message: 'Task updated' });
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Task not found' });

    const task = rows[0];
    if (req.user.role !== 'admin' && task.userId !== req.user.id)
      return res.status(403).json({ message: 'Forbidden' });

    await pool.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};
