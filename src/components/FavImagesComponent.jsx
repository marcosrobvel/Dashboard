import { useState } from "react";
import '../sass/popupImage.scss';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite } from "../features/favouritesSlice";
import Masonry from "react-responsive-masonry";
import { ResponsiveMasonry } from "react-responsive-masonry";
import { useOutletContext } from "react-router-dom";

export const FavImagesComponent = ({data : initialData}) => {

    const [showPopup, setShowPopup] = useState(false); 
    const [popupImage, setPopupImage] = useState(null); 
    const [popupImageData, setPopupImageData] = useState(null);
    const [editableDescription, setEditableDescription] = useState("");
    const [dropdownIndex, setDropdownIndex] = useState(null);
    const [data, setData] = useState(initialData);
    const [searchTerm, sortCriteria, sortDirection] = useOutletContext();
    const [descriptions, setDescriptions] = useState({});
    const [initialDescription, setInitialDescription] = useState("");
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);

    const [likes, setLikes] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const savedDescriptions = localStorage.getItem("imageDescriptions");
        if (savedDescriptions) {
          setDescriptions(JSON.parse(savedDescriptions));
        }
      }, []);

    const setDateFormat = (date) => {
      const fecha = new Date(date);

      const day = String(fecha.getUTCDate()).padStart(2, '0'); 
      const month = String(fecha.getUTCMonth() + 1).padStart(2, '0');
      const year = fecha.getUTCFullYear();

      return `${day}-${month}-${year}`;
    };
     
    const openPopup = (image, index) => {
      if (image && image.urls && image.urls.small) {
        setPopupImage(image.urls.small);
        setShowPopup(true);
        setPopupImageData({ 
          description: descriptions[image.id] || image.alt_description || "No description",
          likes: image.likes,
          width: image.width,
          height: image.height,
          updatedAt: setDateFormat(image.updated_at),
          index: index,
          urls: image.urls,
          id: image.id,
        });
        setEditableDescription(image.alt_description || "");
        setDropdownIndex(index);
        setIsSaveDisabled(true);
      } 
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
          setData(prevData => prevData.filter(img => img.id !== image.id));
      }
  };

  const handleDownload = (imageUrl, imageName) => {
        saveAs(imageUrl, imageName || 'image.jpg');
    };

    const toggleDropdown = (index) => {
      setDropdownIndex(dropdownIndex === index ? null : index); 
    };

  const handleSaveDesc = () => {
    if (popupImageData) {
      const newDescription = descriptions[popupImageData.id] || popupImageData.description;
      const updatedDescriptions = {
        ...descriptions,
        [popupImageData.id]: newDescription,
      };

      setDescriptions(updatedDescriptions);

      localStorage.setItem("imageDescriptions", JSON.stringify(updatedDescriptions));
      setIsSaveDisabled(true);
    }
  };

  const handleCancelDesc = () => {
    if (popupImageData) {
      setDescriptions((prevDescriptions) => ({
        ...prevDescriptions,
        [popupImageData.id]: initialDescription,
      }));
    }
  };

  const handleDescriptionChange = (e, imageId) => {
    const newDescription = e.target.value;
    setDescriptions((prevDescriptions) => ({
      ...prevDescriptions,
      [imageId]: newDescription,
    }));
    if (newDescription !== initialDescription) {
        setIsSaveDisabled(false);
      } else {
        setIsSaveDisabled(true);
      }
  };

    const sortImages = (images, criteria, direction) => {
        return images.sort((a, b) => {
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
        const sortedData = sortImages([...initialData], sortCriteria, sortDirection);
        setData(sortedData);
    }, [sortCriteria, sortDirection, initialData]);


    return (
    <>
    <div className="divTitleHome-MyPhotos">
      <div className="lineBeforeHomeTitle"></div>
          <div className="titleHomePage">
              <p>My Photos</p>
          </div>
    </div>
        <ResponsiveMasonry columnsCountBreakPoints={{ 320: 1, 375: 1, 425: 2, 768: 3, 900: 3, 1024: 4, 1200: 5 }}>
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
                          handleDownload(popupImageData.urls.full, `image_${popupImageData.index}.jpg`);
                      }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
                          </svg>
                      </div>
                    

                    <div className="image-details">

                    

                      <p><strong>Dimensions:</strong> {popupImageData.width} x {popupImageData.height}px</p>
                      <p><strong>Updated at:</strong> {popupImageData.updatedAt}</p>
                      
                      <div className="divDesc-Btns">
                        <label className="labelDescription">
                            <strong>Description:</strong>
                        </label>
                          <textarea type="text" value={descriptions[popupImageData.id] || popupImageData.description} onChange={(e) => handleDescriptionChange(e, popupImageData.id)} placeholder="Add a description" /> 
                          <button className="btnSave" onClick={handleSaveDesc} disabled={isSaveDisabled}>Save</button>
                          <button className="btnCancel" onClick={handleCancelDesc}>Reset</button>
                      </div>
                  </div>
                </div>
            </div>
            )}


            
    </>  
    )
  }