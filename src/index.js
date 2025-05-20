import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Global styles for your app
import App from './App'; // Your main App component
import reportWebVitals from './reportWebVitals'; // For performance monitoring (optional)
import { BrowserRouter } from 'react-router-dom'; // If you're using React Router

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
