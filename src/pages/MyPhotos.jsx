import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavourite, editDescription } from '../redux/favouritesSlice';
import { saveAs } from 'file-saver';

const MyPhotos = () => {
  const [editMode, setEditMode] = useState(false);
  const [newDescription, setNewDescription] = useState('');
  const [currentPhotoId, setCurrentPhotoId] = useState(null);
  const favourites = useSelector((state) => state.favourites.favourites);
  const dispatch = useDispatch();

  const handleDownload = (url) => {
    saveAs(url, 'image.jpg');
  };

  const handleEditDescription = (id) => {
    setCurrentPhotoId(id);
    setEditMode(true);
  };

  const handleSaveDescription = () => {
    dispatch(editDescription({ id: currentPhotoId, description: newDescription }));
    setEditMode(false);
  };

  return (
    <div>
      <h1>My Photos</h1>
      <div>
        {favourites.map((photo) => (
          <div key={photo.id}>
            <img src={photo.urls.small} alt={photo.alt_description} />
            <button onClick={() => dispatch(removeFavourite(photo.id))}>Delete</button>
            <button onClick={() => handleDownload(photo.urls.full)}>Download</button>
            <button onClick={() => handleEditDescription(photo.id)}>Edit Description</button>
            {editMode && currentPhotoId === photo.id && (
              <div>
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
                <button onClick={handleSaveDescription}>Save</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPhotos;