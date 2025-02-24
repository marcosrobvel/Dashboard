import { useState } from "react";
import '../sass/popupImage.scss';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite } from "../features/favouritesSlice";
import Masonry from "react-responsive-masonry";
import { ResponsiveMasonry } from "react-responsive-masonry";

export const FavImagesComponent = (image) => {

    const [showPopup, setShowPopup] = useState(false); 
    const [popupImage, setPopupImage] = useState(null); 
    const [likes, setLikes] = useState({});
    const dispatch = useDispatch();
    const favourites = useSelector(state => state.favourites.data);
    
  
    const openPopup = (imageUrl) => {
      setPopupImage(imageUrl);
      setShowPopup(true);
    };
  
    const closePopup = () => {
      setShowPopup(false);
      setPopupImage(null);
    };

    const toggleLike = (index) => {
        setLikes(prevLikes => ({
            ...prevLikes,
            [index]: !prevLikes[index]
        }));
    };

    const handleSave = (image) => {
      if (!image || !image.id) {
        console.error("Invalid image object", image);  // Depuración
        return;
    }
      const isLiked = !likes[image.id]; 
      toggleLike(image.id);

      if (isLiked) {
        console.log("LIKED")
        console.log(image)
          dispatch(toggleFavourite(image));
          localStorage.setItem(image.id, JSON.stringify(image)); 
      } else {
          localStorage.removeItem(image.id);
      }
  };


    return (
    <>
        <ResponsiveMasonry columnsCountBreakPoints={{ 300:1, 350: 3, 750: 4, 900: 5 }}>
          <Masonry gutter="16px">
            {image.data.map((image, index) => {
                const isLiked = likes[index];
                return <div key={index} className="image-item" onClick={() => openPopup(image.urls.small)}>
                    <div className="divAllImages">
                    <img
                                    src={image.urls.small}
                                    alt="image"
                                    className="cardImage"
                                    onClick={() => openPopup(image.urls.small)}
                                    
                                />
                                <div className="divThreeDots"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"     viewBox="0 0 16 16">
                                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                                          </svg>
                                </div>
                                <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="heartLikesClickedInMYPHOTOS"
                                        viewBox="0 0 16 16"
                                        
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                                        />
                                    </svg>                                
                    </div>
                </div>
                
            })}
        </Masonry>
      </ResponsiveMasonry>

        {showPopup && (
        <div className="popup" onClick={closePopup}>
          <div className="popup-content">
            <img src={popupImage} alt="Popup" className="popup-image" />
          </div>
        </div>
      )}
    </>  
    )
  }
