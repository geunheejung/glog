import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootNode = document.getElementById('root');

if (!rootNode) throw new Error('Failed to find the root element');

createRoot(rootNode).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
