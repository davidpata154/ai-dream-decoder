import '@testing-library/jest-dom';

// Polyfills for JSDOM — required by Ant Design components
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Suppress Ant Design deprecation warnings in tests
const originalConsoleError = console.error;
console.error = (...args: unknown[]) => {
  if (typeof args[0] === 'string' && args[0].includes('[antd:')) return;
  originalConsoleError(...args);
};
