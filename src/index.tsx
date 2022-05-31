import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import { QueryClientProvider } from 'react-query';
import { createRoot } from 'react-dom/client';
import App from './App';
import './reset.css';
import 'react-toastify/dist/ReactToastify.css';
import queryClient from 'queryClient';

const rootNode = document.getElementById('root');

if (!rootNode) throw new Error('Failed to find the root element');

axios.defaults.withCredentials = true;

createRoot(rootNode).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

Modal.setAppElement('#root');
