import React from 'react';
import LightLogo from '../logos/white-logo.png';
import darkLogo from "../logos/black-logo.png";
import useTheme from '../context/theme';


function Logo({ width = '100px' }) {
    const {themeMode} = useTheme()    
    const logo = themeMode === 'dark' ? darkLogo : LightLogo;
    
    return (
        <img className='rounded-full' src={logo} alt="logo" style={{ width }} />
    );
}

export default Logo;
