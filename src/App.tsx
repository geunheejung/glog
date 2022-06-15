import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Main from 'pages/Main';
import Search from 'pages/Main/Search';
import Header from 'layouts/Header';
import Write from 'pages/Main/Write';
import './styles.css';

const App: React.VFC = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/search" element={<Search />} />
        <Route path="/write" element={<Write />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
