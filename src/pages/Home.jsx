import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { homeThunk } from '../features/homeThunk';
import { ImagesComponent } from '../components/ImagesComponent';
import { getDataImages, getStatusImages } from '../features/homeSlice';

export const Home = () => {
  const [data, setData] = useState ([])
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
  
  return (
    <>
    <div>
      <h1>hola</h1>
       <ImagesComponent data = {data} type = 'images' /> 
     </div>     
    </>
  );
};
