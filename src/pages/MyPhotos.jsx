
import React from 'react';
import { useSelector } from 'react-redux';
import { FavImagesComponent } from '../components/FavImagesComponent';
import { useOutletContext } from 'react-router-dom';

export const MyPhotos = () => {

  const [searchTerm] = useOutletContext();
  const favourites = useSelector((state) => state.favourites.data); 

  const filteredImagesMyPhotos = searchTerm ? favourites.filter(image =>
    image.alt_description && image.alt_description.toLowerCase().includes(searchTerm?.toLowerCase())
  ): favourites;

  return (
    <div>
      <div className="photos-container">
        {favourites.length !== 0 && (
          <FavImagesComponent data={filteredImagesMyPhotos} type="favourites" />
        )}
      </div>
    </div>
  );
};