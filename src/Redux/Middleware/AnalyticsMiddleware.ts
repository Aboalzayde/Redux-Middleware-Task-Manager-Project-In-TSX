// src/middleware/analyticsMiddleware.ts
import type { Middleware } from '@reduxjs/toolkit';
import type { Task, TaskActions } from '../../types/types';

/**
 * Custom analytics middleware that tracks specific task management events
 */
export const analyticsMiddleware: Middleware = (store) => (next) => (action) => {
  // Execute the action first
  const result = next(action);
  
  // Get current state after action
  const state = store.getState();
  
  // Type guard to check if this is one of our task actions
  const isTaskAction = (action: unknown): action is TaskActions => {
    return typeof action === 'object' && 
           action !== null && 
           'type' in action &&
           typeof (action as { type: unknown }).type === 'string' &&
           (action as { type: string }).type.startsWith('task/');
  };

  if (!isTaskAction(action)) {
    return result;
  }
  
  // Track specific events for analytics
  switch (action.type) {
    case 'task/addTask': {
      console.log('📈 Analytics: Task Created', {
        taskId: action.payload.id,
        taskName: action.payload.name,
        priority: action.payload.priority,
        totalTasks: state.task.tasks.length,
        timestamp: new Date().toISOString()
      });
      break;
    }
      
    case 'task/toggleTask': {
      const toggledTask = state.task.tasks.find((t: Task) => t.id === action.payload);
      console.log('📈 Analytics: Task Toggled', {
        taskId: action.payload,
        completed: toggledTask?.completed,
        totalCompleted: state.task.tasks.filter((t: Task) => t.completed).length,
        timestamp: new Date().toISOString()
      });
      break;
    }
      
    case 'task/deleteTask': {
      console.log('📈 Analytics: Task Deleted', {
        taskId: action.payload,
        totalTasks: state.task.tasks.length,
        timestamp: new Date().toISOString()
      });
      break;
    }
      
    case 'task/updateTask': {
      console.log('📈 Analytics: Task Updated', {
        taskId: action.payload.id,
        totalTasks: state.task.tasks.length,
        timestamp: new Date().toISOString()
      });
      break;
    }
      
    case 'task/setEditingTask': {
      console.log('📈 Analytics: Edit Mode', {
        action: action.payload ? 'started' : 'cancelled',
        taskId: action.payload?.id || null,
        timestamp: new Date().toISOString()
      });
      break;
    }
  }
  
  return result;
};