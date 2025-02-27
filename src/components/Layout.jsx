import React, { useState } from 'react';
import icon_camera from '../assets/img/icon_camera.png';
import icon_profile from '../assets/img/icon_profile.png';
import { Link } from 'react-router-dom';
import '../sass/styles.scss';
import '../sass/header.scss';
import '../sass/popupImage.scss';
import { Outlet, useNavigate } from 'react-router-dom';

export const Layout = () => {

  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const navigate = useNavigate();

  return (

    <>
    <article>
      <header>
        <div className='divIcons_And_SearchBar'>
          <Link to={'/'}>
            <button className='btnIconCamera' title='Go to Home'>
              <img src={icon_camera} alt="camera icon" />
            </button>
          </Link>
          <form className="divSearchBar">
            <button className="btnLens">🔍</button>
            <input type="text" placeholder='Search . . .' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          </form>
          <Link to={'/MyPhotos'}>
            <button className='btnIconProfile' title='Go to MyPhotos'>
              <img src={icon_profile} alt="profile icon" />
            </button>
          </Link>
        </div>
      </header>
      <div className='divSeparation'></div>
    </article>

    
    <Outlet context={[searchTerm]}/>

    <footer>
        <div>
        </div>
      </footer>
    </>
  );
}
