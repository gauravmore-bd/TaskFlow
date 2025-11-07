import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import taskService from '../services/taskService';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getTasks();
      setTasks(response.tasks || response);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await taskService.deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      alert(err.message || 'Failed to delete task');
    }
  };

  const handleFormSubmit = async (taskData) => {
    try {
      if (editingTask) {
        const response = await taskService.updateTask(editingTask.id, taskData);
        setTasks(tasks.map(task => 
          task.id === editingTask.id ? response.task : task
        ));
      } else {
        const response = await taskService.createTask(taskData);
        setTasks([response.task, ...tasks]);
      }
      setShowForm(false);
      setEditingTask(null);
    } catch (err) {
      alert(err.message || 'Failed to save task');
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const filteredTasks = (tasks || []).filter(task => {
  if (!task || !task.status) return false;
  if (filter === 'all') return true;
  if (filter === 'completed') return task.status === 'completed';
  if (filter === 'pending') return task.status === 'pending';
  return true;
});


  const taskStats = {
  total: tasks?.length || 0,
  completed: (tasks || []).filter(t => t && t.status === 'completed').length,
  pending: (tasks || []).filter(t => t && t.status === 'pending').length,
};

  return (
    <div className="dashboard">
      <Navbar />
      
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1>Welcome back, {user?.name}!</h1>
            <p>Manage your tasks efficiently</p>
          </div>
          <button className="btn-primary" onClick={handleCreateTask}>
            + New Task
          </button>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{taskStats.total}</h3>
            <p>Total Tasks</p>
          </div>
          <div className="stat-card">
            <h3>{taskStats.pending}</h3>
            <p>Pending</p>
          </div>
          <div className="stat-card">
            <h3>{taskStats.completed}</h3>
            <p>Completed</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'pending' ? 'active' : ''} 
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''} 
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        {/* Task Form Modal */}
        {showForm && (
          <TaskForm
            task={editingTask}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        )}

        {/* Tasks List */}
        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : filteredTasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks found. Create your first task!</p>
          </div>
        ) : (
          <div className="tasks-grid">
            {filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;