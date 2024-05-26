import React from 'react';
import logoImage from '../logos/white-logo.png';

function Logo({ width = '100px' }) {
    return (
        <img className='rounded-full' src={logoImage} alt="logo" style={{ width }} />
    );
}

export default Logo;
