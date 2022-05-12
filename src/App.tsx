import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Routes, Route } from 'react-router-dom';
import Main from 'pages/Main';
import Header from 'layouts/Header';
import './reset.css';
import './styles.css';
import Login from 'components/Post/Login';

const queryClient = new QueryClient();

const App: React.VFC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
};

export default App;
