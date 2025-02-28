import { useState } from "react";
import '../sass/popupImage.scss';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite } from "../features/favouritesSlice";
import Masonry from "react-responsive-masonry";
import { ResponsiveMasonry } from "react-responsive-masonry";

export const FavImagesComponent = ({data}) => {

    const [showPopup, setShowPopup] = useState(false); 
    const [popupImage, setPopupImage] = useState(null); 
    const [popupImageData, setPopupImageData] = useState(null);
    const [editableDescription, setEditableDescription] = useState("");

    const [likes, setLikes] = useState({});
    const dispatch = useDispatch();

    const setDateFormat = (date) => {
      const fecha = new Date(date);

      const day = String(fecha.getUTCDate()).padStart(2, '0'); 
      const month = String(fecha.getUTCMonth() + 1).padStart(2, '0');
      const year = fecha.getUTCFullYear();

      return `${day}-${month}-${year}`;
    };
     
    const openPopup = (image) => {
      setPopupImage(image.urls.small);
      setShowPopup(true);
      setPopupImageData({ 
        description: image.alt_description || "Sin descripción",
        likes: image.likes,
        width: image.width,
        height: image.height,
        updatedAt: setDateFormat(image.updated_at),
    });
    setEditableDescription(image.alt_description || "");
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


    return (
    <>
        <ResponsiveMasonry columnsCountBreakPoints={{ 300:1, 350: 3, 750: 4, 900: 5 }}>
          <Masonry gutter="16px">
            {data.map((image, index) => {
                return <div key={index} className="image-item" onClick={() => openPopup(image.urls.small)}>
                    <div className="divAllImages">
                    <img
                                    src={image.urls.small}
                                    alt="image"
                                    className="cardImage"
                                    onClick={() => openPopup(image)}
                                    
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

      {showPopup && popupImageData && (
                <div className={`popup ${showPopup ? 'show' : ''}`} onClick={closePopup}>
                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                    <img src={popupImage} alt="Popup" className="popup-image" />
                    <div className="heartLikedPopUp">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="heartLikesClickedInMYPHOTOSPopUp" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                      </svg>  
                      <p className="numLikes">{popupImageData.likes}</p>
                    </div>
                    
                    <div className="divThreeDotsPopUp">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"     viewBox="0 0 16 16">
                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                          </svg>
                    </div>
                    <div className="image-details">
                      
                      <p><strong>Dimensions:</strong> {popupImageData.width} x {popupImageData.height}px</p>
                      <p><strong>Updated at:</strong> {popupImageData.updatedAt}</p>
                      <label className="labelDescription">
                          <strong>Description:</strong>
                      </label>
                          <textarea
                              type="text"
                              value={editableDescription}
                              onChange={(e) => {
                                  setEditableDescription(e.target.value); 
                                  setPopupImageData({ ...popupImageData, description: e.target.value }); 
                              }}
                              placeholder="Añade una descripción"
                          />
                      
                  </div>
                </div>
            </div>
            )}


            
    </>  
    )
  }


  /*{showPopup && (
                <div className={`popup ${showPopup ? 'show' : ''}`} onClick={closePopup}>
                <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                    <img src={popupImage} alt="Popup" className="popup-image" />
                    <div className="divThreeDotsPopUp"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"     viewBox="0 0 16 16">
                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                          </svg>
                    </div>
                </div>
            </div>
            )}*/
