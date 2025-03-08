import { useState } from "react";
import '../sass/popupImage.scss';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite } from "../features/favouritesSlice";
import Masonry from "react-responsive-masonry";
import { ResponsiveMasonry } from "react-responsive-masonry";
import { useOutletContext } from "react-router-dom";

export const ImagesComponent = ({ data = [] }) => {

    const [showPopup, setShowPopup] = useState(false); 
    const [popupImage, setPopupImage] = useState(null); 
    const [likes, setLikes] = useState({});
    const dispatch = useDispatch();
    const [sortedData, setSortedData] = useState(data);

    const [searchTerm, sortCriteria, sortDirection] = useOutletContext();
    
    
  
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
        console.error("Invalid image object", image);
        return;
    }
      const isLiked = !likes[image.id]; 
      toggleLike(image.id);

      if (isLiked) {
          dispatch(toggleFavourite(image));
          localStorage.setItem(image.id, JSON.stringify(image)); 
      } else {
          localStorage.removeItem(image.id);
      }
  };

    const sortImages = (images, criteria, direction) => {
        return [...images].sort((a, b) => {
            let valueA, valueB;

            switch (criteria) {
                case "date":
                    valueA = new Date(a.updated_at);
                    valueB = new Date(b.updated_at);
                    break;
                case "width":
                    valueA = a.width;
                    valueB = b.width;
                    break;
                case "height":
                    valueA = a.height;
                    valueB = b.height;
                    break;
                case "likes":
                    valueA = a.likes;
                    valueB = b.likes;
                    break;
                default:
                    valueA = a.updated_at;
                    valueB = b.updated_at;
            }

            if (direction === "asc") {
                return valueA - valueB;
            } else {
                return valueB - valueA;
            }
        });
    };

    useEffect(() => {
        const sorted = sortImages(data, sortCriteria, sortDirection);
        setSortedData(sorted);
    }, [data, sortCriteria, sortDirection]);

    return (
    <>  
     <div className="lineBeforeHomeTitle"></div>
     <div className="titleHomePage">
        <p>Home</p>
     </div>


      <ResponsiveMasonry columnsCountBreakPoints={{ 320: 1, 375: 1, 425: 2, 768: 3, 900: 3, 1024: 4, 1200: 5  }}>
                <Masonry gutter="16px">
                    {sortedData.map((image, index) => {
                        const isLiked = likes[index];
                        return (
                            <div key={index} className="image-item" onClick={() => openPopup(image.urls.small)}>
                                <div className="divAllImages">
                                    <img
                                        src={image.urls.small}
                                        alt="image"
                                        className="cardImage"
                                        onClick={() => openPopup(image.urls.small)}
                                    />
                                    {isLiked ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="heartLikesClicked" viewBox="0 0 16 16" onClick={(e) => {
                                                e.stopPropagation();
                                                handleSave(image);
                                                toggleLike(index);
                                            }}
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                                            />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="heartLikes" viewBox="0 0 16 16" onClick={(e) => {
                                                e.stopPropagation();
                                                handleSave(image);
                                                toggleLike(index);
                                            }}
                                        >
                                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    
             
            {showPopup && (
            <div className={`popup ${showPopup ? 'show' : ''}`} onClick={closePopup}>
                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                    <img src={popupImage} alt="Popup" className="popup-image" />
                    <div></div>
                </div>
            </div>
            )}
                </Masonry>
            </ResponsiveMasonry>
            
            
    
    </>  
    )
  }
