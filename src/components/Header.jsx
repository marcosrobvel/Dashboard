import React from 'react';
import icon_camera from '../assets/img/icon_camera.png';
import icon_profile from '../assets/img/icon_profile.png';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Header(){
    return(
        <article>
            <header>
                <div className='divIcons_And_SearchBar'>
                    <Link to={'./pages/Home'}><button className='btnIconCamera'><img src={icon_camera} alt="" /></button></Link>
                    <div className="divSearchBar">
                        <button className="btnLens">🔍</button><input type="text" placeholder='Buscar . . .' />
                    </div>
                    <Link to={'./pages/MyPhotos'}><button className='btnIconProfile'><img src={icon_profile} alt="" /></button></Link>
                </div>
            </header>
        </article>
    )
}

export default Header;


