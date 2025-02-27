import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './sass/styles.scss';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { MyPhotos } from './pages/MyPhotos';

//import MyPhotos from './pages/MyPhotos';

createRoot(document.getElementById('root')).render( 
   
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
              <Route element={<Layout/>}>
                <Route path='' element={< Home />} />
              </Route>
              <Route element={<Layout/>}>
                <Route path='myphotos' element={< MyPhotos />} />
              </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
);
