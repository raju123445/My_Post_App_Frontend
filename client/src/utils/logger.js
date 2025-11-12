/**
 * Structured Logger Utility
 * Logs with timestamps and severity levels for better debugging
 */

const LOG_LEVELS = {
  DEBUG: { level: 0, color: '#7986CB', label: 'DEBUG' },
  INFO: { level: 1, color: '#42A5F5', label: 'INFO' },
  WARN: { level: 2, color: '#FFA726', label: 'WARN' },
  ERROR: { level: 3, color: '#EF5350', label: 'ERROR' }
};

const getTimestamp = () => {
  const now = new Date();
  return now.toISOString().split('T')[1].slice(0, 8); // HH:MM:SS
};

const formatLog = (level, category, message, data) => {
  const timestamp = getTimestamp();
  const levelInfo = LOG_LEVELS[level];
  const prefix = `%c[${timestamp}] [${levelInfo.label}] [${category}]`;
  const style = `color: white; background-color: ${levelInfo.color}; padding: 2px 6px; border-radius: 3px; font-weight: bold;`;
  
  if (data) {
    return [prefix, style, message, data];
  }
  return [prefix, style, message];
};

const logger = {
  // Authentication logs
  auth: {
    login: (email) => console.log(...formatLog('INFO', 'AUTH', 'Login attempt', { email })),
    loginSuccess: (user) => console.log(...formatLog('INFO', 'AUTH', 'Login successful', { user: user.email })),
    loginError: (error) => console.error(...formatLog('ERROR', 'AUTH', 'Login failed', { error: error.message })),
    register: (email) => console.log(...formatLog('INFO', 'AUTH', 'Registration attempt', { email })),
    registerSuccess: (user) => console.log(...formatLog('INFO', 'AUTH', 'Registration successful', { user: user.email })),
    registerError: (error) => console.error(...formatLog('ERROR', 'AUTH', 'Registration failed', { error: error.message })),
    logout: () => console.log(...formatLog('INFO', 'AUTH', 'User logged out')),
    loadUser: () => console.log(...formatLog('DEBUG', 'AUTH', 'Loading user from token')),
    loadUserSuccess: (user) => console.log(...formatLog('INFO', 'AUTH', 'User loaded successfully', { user: user.email })),
    loadUserError: (error) => console.warn(...formatLog('WARN', 'AUTH', 'Failed to load user', { error: error.message }))
  },

  // Posts logs
  posts: {
    fetch: () => console.log(...formatLog('DEBUG', 'POSTS', 'Fetching posts')),
    fetchSuccess: (count) => console.log(...formatLog('INFO', 'POSTS', 'Posts fetched', { count })),
    fetchError: (error) => console.error(...formatLog('ERROR', 'POSTS', 'Failed to fetch posts', { error: error.message })),
    create: (title) => console.log(...formatLog('DEBUG', 'POSTS', 'Creating post', { title })),
    createSuccess: (id) => console.log(...formatLog('INFO', 'POSTS', 'Post created successfully', { id })),
    createError: (error) => console.error(...formatLog('ERROR', 'POSTS', 'Failed to create post', { error: error.message })),
    update: (id) => console.log(...formatLog('DEBUG', 'POSTS', 'Updating post', { id })),
    updateSuccess: (id) => console.log(...formatLog('INFO', 'POSTS', 'Post updated successfully', { id })),
    updateError: (error) => console.error(...formatLog('ERROR', 'POSTS', 'Failed to update post', { error: error.message })),
    delete: (id) => console.log(...formatLog('DEBUG', 'POSTS', 'Deleting post', { id })),
    deleteSuccess: (id) => console.log(...formatLog('INFO', 'POSTS', 'Post deleted successfully', { id })),
    deleteError: (error) => console.error(...formatLog('ERROR', 'POSTS', 'Failed to delete post', { error: error.message }))
  },

  // Users logs
  users: {
    fetch: () => console.log(...formatLog('DEBUG', 'USERS', 'Fetching users')),
    fetchSuccess: (count) => console.log(...formatLog('INFO', 'USERS', 'Users fetched', { count })),
    fetchError: (error) => console.error(...formatLog('ERROR', 'USERS', 'Failed to fetch users', { error: error.message })),
    updateProfile: () => console.log(...formatLog('DEBUG', 'USERS', 'Updating profile')),
    updateProfileSuccess: () => console.log(...formatLog('INFO', 'USERS', 'Profile updated successfully')),
    updateProfileError: (error) => console.error(...formatLog('ERROR', 'USERS', 'Failed to update profile', { error: error.message }))
  },

  // API logs
  api: {
    request: (method, url) => console.log(...formatLog('DEBUG', 'API', `${method} request`, { url })),
    response: (method, url, status) => console.log(...formatLog('INFO', 'API', `${method} response`, { url, status })),
    error: (method, url, error) => console.error(...formatLog('ERROR', 'API', `${method} failed`, { url, error: error.message }))
  },

  // Navigation logs
  navigation: {
    navigate: (path) => console.log(...formatLog('DEBUG', 'NAVIGATION', 'Navigating to', { path })),
    routeChange: (path) => console.log(...formatLog('INFO', 'NAVIGATION', 'Route changed', { path }))
  },

  // Theme logs
  theme: {
    toggle: (theme) => console.log(...formatLog('DEBUG', 'THEME', 'Toggling theme', { theme })),
    set: (theme) => console.log(...formatLog('INFO', 'THEME', 'Theme changed', { theme }))
  },

  // General utility logs
  info: (category, message, data) => console.log(...formatLog('INFO', category, message, data)),
  warn: (category, message, data) => console.warn(...formatLog('WARN', category, message, data)),
  error: (category, message, data) => console.error(...formatLog('ERROR', category, message, data)),
  debug: (category, message, data) => console.log(...formatLog('DEBUG', category, message, data))
};

export default logger;
