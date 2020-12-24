import React from 'react';
import './errorMessage.css'


const ErrorMessage = () => {
    return (
       <>
        <img src={process.env.PUBLIC_URL + '/img/error.jpg'} alt='error'></img>
        <span> Woops, something goes wrong ¯\_(ツ)_/¯</span>
        </>
    )
};

export default ErrorMessage;