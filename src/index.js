// Copyright (C) 2017-2022 Smart code 203358507

// Initialize Sentry if available
if (typeof process.env.SENTRY_DSN === 'string') {
  const Sentry = require('@sentry/browser');
  Sentry.init({ dsn: process.env.SENTRY_DSN });
}

// Parse the user's browser
const Bowser = require('bowser');
const browser = Bowser.parse(window.navigator?.userAgent || '');

// Set the viewport meta tag for desktop browsers
if (browser?.platform?.type === 'desktop') {
  document.querySelector('meta[name="viewport"]')?.setAttribute('content', '');
}

// Create the root React element and render the app
const React = require('react');
const ReactDOM = require('react-dom/client');
const App = require('./App');

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);

// Register a service worker in production mode
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .catch((registrationError) => {
        console.error('SW registration failed: ', registrationError);
      });
  });
}
