import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Main from 'pages/Main';
import Header from 'layouts/Header';
import './styles.css';

const App: React.VFC = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
