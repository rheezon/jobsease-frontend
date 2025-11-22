import api from '../services/api';

const LEVELS = ['debug', 'info', 'warn', 'error'];

function safeGetUser() {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

async function sendToServer(level, message, meta) {
  try {
    // Prefer a dedicated endpoint if backend supports it
    await api.post('/logs', {
      level,
      message,
      meta: {
        ...meta,
        path: window.location?.pathname,
        userId: safeGetUser()?.id || null,
        userEmail: safeGetUser()?.email || null,
      },
      timestamp: new Date().toISOString(),
      app: 'jobease-frontend',
      environment: import.meta.env.MODE,
    });
  } catch {
    // Swallow logging errors to avoid impacting UX
  }
}

function createLogger() {
  const logger = {};
  LEVELS.forEach((level) => {
    logger[level] = (message, meta = undefined) => {
      // In dev, keep console for developer ergonomics
      if (!import.meta.env.PROD) {
        // Use console only in development
        const fn =
          level === 'error' ? console.error :
          level === 'warn' ? console.warn :
          level === 'info' ? console.info :
          console.debug;
        try { fn(`[${level.toUpperCase()}] ${message}`, meta ?? ''); } catch {}
      }
      // Always try to ship logs to server; backend should handle rotation
      void sendToServer(level, message, meta);
    };
  });
  return logger;
}

export const logger = createLogger();
export default logger;


