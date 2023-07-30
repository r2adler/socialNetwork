import React from 'react';
import loader from '../../../assets/images/loader.gif';

export const Preloader = () => {
    return (
        <div >
            < img  style={{width: 100}} src={loader} alt="preloader"/>
        </div>
    );
};

