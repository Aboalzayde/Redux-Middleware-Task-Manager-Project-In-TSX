// src/Redux/Store.ts
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../taskSlice';

// Import our custom middleware
import { loggingMiddleware } from '../Middleware/loggingMiddleware';
import { analyticsMiddleware } from '../Middleware/AnalyticsMiddleware';

/**
 * Enhanced Redux store with custom middleware and DevTools integration
 * Maintains all existing functionality while adding Week 6 requirements
 */
export const store = configureStore({
  // Your existing reducer configuration
  reducer: {
    task: taskReducer,
  },
  
  // Add custom middleware while keeping Redux Toolkit defaults
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([
        loggingMiddleware,    // Logs every action with prev/next state
        analyticsMiddleware   // Tracks specific analytics events
      ]),
  
  // Enable Redux DevTools (automatically enabled in development)
  devTools: true, // Simple true/false instead of checking process.env
});

// Keep your existing type exports unchanged
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;