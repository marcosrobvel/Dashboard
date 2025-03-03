import { useState } from "react";
import '../sass/popupImage.scss';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite } from "../features/favouritesSlice";
import Masonry from "react-responsive-masonry";
import { ResponsiveMasonry } from "react-responsive-masonry";

export const FavImagesComponent = ({data : initialData}) => {

    const [showPopup, setShowPopup] = useState(false); 
    const [popupImage, setPopupImage] = useState(null); 
    const [popupImageData, setPopupImageData] = useState(null);
    const [editableDescription, setEditableDescription] = useState("");
    const [dropdownIndex, setDropdownIndex] = useState(null);
    const [data, setData] = useState(initialData);

    const [likes, setLikes] = useState({});
    const dispatch = useDispatch();

    const setDateFormat = (date) => {
      const fecha = new Date(date);

      const day = String(fecha.getUTCDate()).padStart(2, '0'); 
      const month = String(fecha.getUTCMonth() + 1).padStart(2, '0');
      const year = fecha.getUTCFullYear();

      return `${day}-${month}-${year}`;
    };
     
    const openPopup = (image, index) => {
      setPopupImage(image.urls.small);
      setShowPopup(true);
      setPopupImageData({ 
        description: image.alt_description || "Sin descripción",
        likes: image.likes,
        width: image.width,
        height: image.height,
        updatedAt: setDateFormat(image.updated_at),
        index: index,
        urls: image.urls,
    });
    setEditableDescription(image.alt_description || "");
    setDropdownIndex(index);
    };
  
    const closePopup = () => {
      setShowPopup(false);
      setPopupImage(null);
      setShowDropdown(null); 
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
          setData(prevData => prevData.filter(img => img.id !== image.id));
      }
  };

  const handleDownload = (imageUrl, imageName) => {
        saveAs(imageUrl, imageName || 'image.jpg');
    };

    const toggleDropdown = (index) => {
      setDropdownIndex(dropdownIndex === index ? null : index); 
    };


    return (
    <>
        <ResponsiveMasonry columnsCountBreakPoints={{ 300:1, 350: 3, 750: 4, 900: 5 }}>
          <Masonry gutter="16px">
            {data.map((image, index) => {
                return <div key={index} className="image-item" onClick={() => openPopup(image.urls.small)}>
                    <div className="divAllImages">
                    <img src={image.urls.small} alt="image" className="cardImage" onClick={() => openPopup(image, index)} />
                                
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="heartLikesClickedInMYPHOTOS" viewBox="0 0 16 16" onClick={(e) => {
                                  e.stopPropagation();
                                  handleSave(image);
                                }}>
                                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
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
                    
                    <div className="divThreeDotsPopUp" onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(popupImageData.urls.small, `image_${popupImageData.index}.jpg`);
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
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