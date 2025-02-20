import React from 'react';
import icon_camera from '../assets/img/icon_camera.png';
import icon_profile from '../assets/img/icon_profile.png';
import { Link } from 'react-router-dom';
import '../sass/styles.scss';
import '../sass/header.scss';
import '../sass/popupImage.scss';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (

    <>
    <article>
      <header>
        <div className='divIcons_And_SearchBar'>
          <Link to={'/'}>
            <button className='btnIconCamera'>
              <img src={icon_camera} alt="camera icon" />
            </button>
          </Link>
          <div className="divSearchBar">
            <button className="btnLens">🔍</button>
            <input type="text" placeholder='Buscar . . .' />
          </div>
          <Link to={'/MyPhotos'}>
            <button className='btnIconProfile'>
              <img src={icon_profile} alt="profile icon" />
            </button>
          </Link>
        </div>
      </header>
      <div className='divSeparation'></div>
    </article>

    
    <Outlet/>

    <footer>
        <div>
        </div>
      </footer>
    </>
  );
}
