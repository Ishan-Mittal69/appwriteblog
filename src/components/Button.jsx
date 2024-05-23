import React from 'react';

function Button({children , type='button', bgcolor='bg-blue-600' , textcolor='text-white', className='', ...props}) {
    return ( 
        <button className={`px-4 py-2 rounded-lg ${bgcolor} ${textcolor} ${className}`} {...props}>
            {children} 
        </button>
     );
    }

export default Button;