import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homeThunk } from '../features/homeThunk';
import { ImagesComponent } from '../components/ImagesComponent';
import { getDataImages, getStatusImages } from '../features/homeSlice';

export const Home = () => {
  const [data, setData] = useState ([])
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true);
  const imagesData = useSelector(getDataImages)
  const imagesStatus = useSelector(getStatusImages)
  const dispatch = useDispatch();

  useEffect(() => {
    if(imagesStatus ===  'idle'){
      dispatch(homeThunk())
    }else if(imagesStatus ===  'fulfilled'){
      setData(imagesData)
    }else if(imagesStatus === 'rejected'){
      alert('Error')
    }
  }, [imagesStatus, imagesData, dispatch])

  const loadMoreImages = () => {
    const nextPage = page + 1;
    dispatch(homeThunk(nextPage)).then((action) => {
      if (action.payload && action.payload.length > 0) {
        setData((prevData) => [...prevData, ...action.payload]); 
        setPage(nextPage); 
      } else {
        setHasMore(false); 
      }
    });
  };
  

  return (
    <>
    <div>
      <ImagesComponent data={data} fetchMoreImages={loadMoreImages} hasMore={hasMore} />
    </div>    
    </>
  );
};
