import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Global styles for your app
import App from './App'; // Your main App component
import { BrowserRouter } from 'react-router-dom'; // If you're using React Router

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

