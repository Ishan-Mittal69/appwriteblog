import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { login as authLogin } from '../store/authSlice';

function AuthCallback() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const verifySession = async () => {
            try {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate('/');
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Auth callback error:', error);
                navigate('/login');
            }
        };

        verifySession();
    }, [dispatch, navigate]);

    return <div>Authenticating...</div>;
}

export default AuthCallback;
