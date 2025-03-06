import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homeThunk } from '../features/homeThunk';
import { ImagesComponent } from '../components/ImagesComponent';
import { getDataImages, getStatusImages, resetData } from '../features/homeSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useOutletContext } from 'react-router-dom';

export const Home = () => {

  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm] = useOutletContext();
  const imagesData = useSelector(getDataImages);
  const imagesStatus = useSelector(getStatusImages);
  const dispatch = useDispatch();

  const filteredImages = imagesData

  useEffect(() => {
      const getData = setTimeout(() => {
      dispatch(resetData())
      dispatch(homeThunk({page, searchTerm}));
    }, 1000)

    return () => clearTimeout(getData)
  }, [searchTerm]);

  const loadMoreImages = () => {
    const nextPage = page + 1;
    dispatch(homeThunk({page: nextPage, searchTerm})).then((action) => {
      if (action.payload?.results && action.payload.results.length > 0) {
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
          <ImagesComponent data={filteredImages}  />
        </InfiniteScroll>
    </div>    
    </>
  );
};
