import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootNode = document.getElementById('root');

if (!rootNode) throw new Error('Failed to find the root element');

// axios.defaults.baseURL = 'http://localhost:3095';
axios.defaults.withCredentials = true;

createRoot(rootNode).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

Modal.setAppElement('#root');
