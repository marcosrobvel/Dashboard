// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MyPhotos from './pages/MyPhotos';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-photos" element={<MyPhotos />} />
      </Routes>
    </Router>
  );
};

export default App;
