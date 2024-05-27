import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';

function LogoutBtn() {
    const [loading, setLoading] = useState(false); // State for loading state
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const logoutHandler = () => {
        setLoading(true); // Set loading state to true when logout is initiated
        authService.logout()
            .then(() => {
                dispatch(logout());
                navigate('/login'); // Navigate to login page after logout
            })
            .catch((error) => {
                console.error('Logout error:', error);
            })
            .finally(() => {
                setLoading(false); // Reset loading state after logout is completed
            });
    }

    return (
        <Link to='/login'>
            <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full dark:text-white" onClick={logoutHandler}>
                {loading ? 'Logging out...' : 'Logout'}
            </button>
        </Link>
    );
}

export default LogoutBtn;
