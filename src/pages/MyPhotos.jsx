/*import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { removeFavourite, editDescription } from '../redux/favouritesSlice';
import { saveAs } from 'file-saver';
import { toggleFavourite } from '../features/favouritesSlice';

export const MyPhotos = () => {

  const dispatch = useDispatch();  // Hook para despachar acciones
  const favourites = useSelector((state) => state.favourites.data); // Obtenemos las imágenes favoritas

  const handleToggleFavourite = (image) => {
    dispatch(toggleFavourite(image));  // Despachar la acción toggleFavourite cuando se hace click en una imagen
  };

  return (
    <>
    <div>
      <h1>Mis Fotos Favoritas</h1>
      <div className="photos-container">
        {favourites.length === 0 ? (
          <p>No tienes fotos favoritas.</p>
        ) : (
          favourites.map((image) => (
         //   console.log(image.urls.small),
            <div key={image.id} className="photo">
              <img src={image.urls.small} alt="" />
              <button onClick={() => handleToggleFavourite(image)}>
                {favourites.some(fav => fav.id === id) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
          
        </>
  );
  
};
*/
import React from 'react';
import { useSelector } from 'react-redux';
import { FavImagesComponent } from '../components/FavImagesComponent';

export const MyPhotos = () => {
  const favourites = useSelector((state) => state.favourites.data); 

  return (
    <div>
      <h1>Mis Fotos Favoritas</h1>
      <div className="photos-container">
        {favourites.length === 0 ? (
          <p>No tienes fotos favoritas.</p>
        ) : (
          <FavImagesComponent data={favourites} type="favourites" />
          // Le pasas `favourites` como `data` a ImagesComponent
        )}
      </div>
    </div>
  );
};