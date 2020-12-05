import React from 'react';
function PersonPhotos(props) {
    if(props.personPhoto !== null) {
        return ( <img src={`https://image.tmdb.org/t/p/w300${props.personPhoto}`} alt={`Name of ${props.personName}`}/> )
    } 
    else {
        return ( <></> )
    }
}

export default PersonPhotos;