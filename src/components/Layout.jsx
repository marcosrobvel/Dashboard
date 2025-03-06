import React, { useState } from 'react';
import icon_camera from '../assets/img/icon_camera.png';
import icon_profile from '../assets/img/icon_profile.png';
import { Link } from 'react-router-dom';
import '../sass/styles.scss';
import '../sass/header.scss';
import '../sass/popupImage.scss';
import { Outlet } from 'react-router-dom';
import { SortDropdown } from './SortDropdown';

export const Layout = () => {

  const [searchTerm, setSearchTerm] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('date'); 
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSortChange = (criteria, direction) => {
    setSortCriteria(criteria);
    setSortDirection(direction);
};

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
          <p className='titleApp'>Visualist</p>
          <form className="divSearchBar">
            <input type="text" placeholder=' Search . . .' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <SortDropdown onSortChange={handleSortChange} />
          </form>
          <Link to={'/myphotos'}>
            <button className='btnIconProfile' title='Go to MyPhotos'>
              <img src={icon_profile} alt="profile icon" />
            </button>
          </Link>
        </div>
      </header>
      <div className='divSeparation'></div>
    </article>

    
    <Outlet context={[searchTerm, sortCriteria, sortDirection]}/>

    <footer>
        <div>
        </div>
      </footer>
    </>
  );
}
