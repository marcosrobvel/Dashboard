import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homeThunk } from '../features/homeThunk';
import { ImagesComponent } from '../components/ImagesComponent';
import { getDataImages, getStatusImages } from '../features/homeSlice';
import InfiniteScroll from 'react-infinite-scroll-component';

export const Home = () => {

  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true);
  const imagesData = useSelector(getDataImages);
  const imagesStatus = useSelector(getStatusImages);
  const dispatch = useDispatch();

  useEffect(() => {
    if (imagesStatus === 'idle') {
      dispatch(homeThunk(page));
    }
  }, [imagesStatus, dispatch, page]);

  const loadMoreImages = () => {
    const nextPage = page + 1;
    dispatch(homeThunk(nextPage)).then((action) => {
      if (action.payload && action.payload.length > 0) {
        setPage(nextPage);
      } else {
        setHasMore(false);
      }
    });
  };
  

  return (
    <>
    <div>
        <InfiniteScroll dataLength={imagesData.length} next={loadMoreImages} hasMore={hasMore} loader={<h4>Loading...</h4>} endMessage={<p>No hay más imágenes</p>} >
          <ImagesComponent data={imagesData} />
        </InfiniteScroll>
    </div>    
    </>
  );
};
