import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from 'pages/Main';
import Header from 'layouts/Header';
import './reset.css';
import './styles.css';

const App: React.VFC = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
};

export default App;
