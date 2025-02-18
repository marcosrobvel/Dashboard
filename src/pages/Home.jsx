import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages } from '../redux/searchSlice';
import { addFavourite } from '../redux/favouritesSlice';
import Header from '../components/Header';

export const Home = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const images = useSelector((state) => state.search.images);

  useEffect(() => {
    if (query === '') {
      dispatch(fetchImages('random'));
    } else {
      dispatch(fetchImages(query));
    }
  }, [query, dispatch]);

  return (
        <div>
        <h1>Search Images</h1>
        <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
        <div>
            {images.map((image) => (
            <div key={image.id}>
                <img src={image.urls.small} alt={image.alt_description} />
                <button onClick={() => dispatch(addFavourite(image))}>Add to my photos</button>
            </div>
            ))}
        </div>
        </div>
  );
};

export default Home;