import React from 'react';
import '../styles/TaskCard.css';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const getPriorityClass = (priority) => {
    return `priority-${priority?.toLowerCase() || 'low'}`;
  };

  const getStatusClass = (status) => {
    return `status-${status?.toLowerCase().replace(' ', '-') || 'pending'}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isOverdue = (dueDate, status) => {
    if (!dueDate || status === 'completed') return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <div className={`task-card ${getStatusClass(task.status)}`}>
      <div className="task-card-header">
        <div className="task-badges">
          <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
            {task.priority || 'Low'}
          </span>
          <span className={`status-badge ${getStatusClass(task.status)}`}>
            {task.status || 'Pending'}
          </span>
        </div>
      </div>

      <div className="task-card-body">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-description">
          {task.description || 'No description provided'}
        </p>
      </div>

      <div className="task-card-footer">
        <div className="task-date">
          <span className={isOverdue(task.dueDate, task.status) ? 'overdue' : ''}>
            📅 {formatDate(task.dueDate)}
          </span>
          {isOverdue(task.dueDate, task.status) && (
            <span className="overdue-label">Overdue</span>
          )}
        </div>

        <div className="task-actions">
          <button 
            className="btn-icon edit" 
            onClick={() => onEdit(task)}
            title="Edit task"
          >
            ✏️
          </button>
          <button 
            className="btn-icon delete" 
            onClick={() => onDelete(task.id)}
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;