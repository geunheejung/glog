import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import { createRoot } from 'react-dom/client';
import App from './App';
import './reset.css';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const rootNode = document.getElementById('root');

if (!rootNode) throw new Error('Failed to find the root element');

// axios.defaults.baseURL = 'http://localhost:3095';
axios.defaults.withCredentials = true;

export const queryClient = new QueryClient();

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
