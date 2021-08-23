import React from 'react'

const Navbar = ({imgSrc, imgAlt, imgHref,handleButton }) => {
    return (<div className = "navbar">
                <img onClick={imgHref} className = "navbar-img" src = {imgSrc} alt = {imgAlt} />
                <button className = "btn btn-journal btn-logout" onClick = {handleButton}>Log Out</button>
            </div>)
}

export default Navbar