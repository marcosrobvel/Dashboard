import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './sass/styles.scss';
import { HashRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { MyPhotos } from './pages/MyPhotos';
import { Navigate } from 'react-router-dom';

//import MyPhotos from './pages/MyPhotos';

createRoot(document.getElementById('root')).render( 
   
      <Provider store={store}>
        <HashRouter>
          <Routes>
              <Route element={<Layout/>}>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path='dashboard' element={< Home />} />
                <Route path='dashboard/myphotos' element={< MyPhotos />} />
              </Route>
          </Routes>
        </HashRouter>
      </Provider>
);
