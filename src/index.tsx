import React from 'react';  // Import React library
import ReactDOM from 'react-dom/client';  // Import để render
import App from './App';  // Import component App

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);  // Tìm div root trong HTML
root.render(  // Render (vẽ) App vào root
  <React.StrictMode>  
    <App />
  </React.StrictMode>
);