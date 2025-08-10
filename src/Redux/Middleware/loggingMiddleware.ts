// src/middleware/loggingMiddleware.ts
import type { Middleware } from '@reduxjs/toolkit';

/**
 * Custom logging middleware that logs every dispatched action
 * along with previous and next state
 */
export const loggingMiddleware: Middleware = (store) => (next) => (action) => {
  // Get the previous state before action
  const prevState = store.getState();
  
  // Safe way to get action type
  const actionType = (typeof action === 'object' && action !== null && 'type' in action && typeof (action as { type: unknown }).type === 'string') 
    ? (action as { type: string }).type 
    : 'UNKNOWN_ACTION';
  
  console.group(`🚀 Action: ${actionType}`);
  
  // Log the previous state
  console.log('📊 Previous State:', prevState);
  
  // Log the action
  console.log('⚡ Action:', action);
  
  // Execute the action
  const result = next(action);
  
  // Get the next state after action
  const nextState = store.getState();
  
  // Log the next state
  console.log('✅ Next State:', nextState);
  
  console.groupEnd();
  
  return result;
};