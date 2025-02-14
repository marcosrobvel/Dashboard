import React from 'react';
import icon_camera from '../assets/img/icon_camera.png';
import icon_profile from '../assets/img/icon_profile.png';

function Header(){
    return(
        <article>
            <header>
                <div class='divIcons_And_SearchBar'>
                    <button class='btnIconCamera'><img src={icon_camera} alt="" /></button>
                    <div class="divSearchBar">
                        <button class="btnLens">BtnLupaBusqueda</button><input type="text" placeholder='Buscar . . .' />
                    </div>
                    <button class='btnIconProfile'><img src={icon_profile} alt="" /></button>
                </div>
            </header>
        </article>
    )
}

export default Header;