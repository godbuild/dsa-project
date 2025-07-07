import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// If using Redux or Context API for state management, import your provider(s) here
// import { Provider } from 'react-redux';
// import store from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Example API base URL config (adjust as needed)
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://your-api-url.com';

root.render(
  <React.StrictMode>
    {/* Wrap App with providers if needed */}
    {/* <Provider store={store}> */}
      <App />
    {/* </Provider> */}
  </React.StrictMode>
);