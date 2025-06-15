import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutBtn } from '../index';

function UserMenu({ 
    userData, 
    isOpen, 
    onClose, 
    position = 'right-0', 
    className = '',
    menuId
}) {
    const navigate = useNavigate();
    const menuRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target) && 
                !event.target.closest(`#${menuId}`)) {
                onClose();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose, menuId]);

    const handleNavigation = (path) => {
        onClose();
        navigate(path);
    };

    if (!isOpen) return null;

    return (
        <div 
            ref={menuRef}
            className={`absolute ${position} mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-lg z-50 py-2 border border-gray-200 dark:border-gray-700 animate-fade-in ${className}`}
        >
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{userData?.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{userData?.email}</p>
            </div>
            <button
                className="block w-full text-left px-4 py-3 text-base text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => handleNavigation('/my-posts')}
            >My Posts</button>
            <button
                className="block w-full text-left px-4 py-3 text-base text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => handleNavigation('/add-post')}
            >Add Post</button>
            <button
                className="block w-full text-left px-4 py-3 text-base text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => handleNavigation('/all-posts')}
            >All Posts</button>
            <button
                className="block w-full text-left px-4 py-3 text-base text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => handleNavigation('/')}
            >Home</button>
            <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
            <div className="px-4 py-2"><LogoutBtn /></div>
        </div>
    );
}

export default UserMenu; 