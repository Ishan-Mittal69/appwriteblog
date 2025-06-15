import React from 'react';
import appwriteService from "../appwrite/conf";
import { Link } from 'react-router-dom';

const defaultAvatar = 'https://ui-avatars.com/api/?name=User&background=random';

function Postcard({ $id, title, featuredImage, authorName, authorAvatar, $createdAt }) {
    // Format date
    const formattedDate = $createdAt ? new Date($createdAt).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    }) : '';

    return (
        <Link to={`/post/${$id}`} className="block transition-all duration-300 hover:scale-[1.02]">
            <div className='w-full backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/30 dark:border-gray-800/30 hover:border-white/50 dark:hover:border-gray-700/50 flex flex-col h-full'>
                <div className='w-full overflow-hidden rounded-xl mb-4 relative group h-[220px] flex items-center justify-center bg-black'>
                    {/* Black to white gradient background */}
                    <div className="
                        absolute inset-0 
                        bg-gradient-to-br 
                        from-white via-gray-400 to-gray-700
                        dark:from-black/10 dark:via-gray-800 dark:to-gray-700
                    " />
                    {/* Main image, fully visible, centered */}
                    <img 
                        src={appwriteService.getFilePreview(featuredImage)} 
                        alt={title} 
                        className='relative z-10 w-full h-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105'
                        loading="lazy"
                    />
                </div>
                <div className='flex-1 flex flex-col justify-between p-2'>
                    <h2 className='text-xl font-bold mb-3 text-gray-800 dark:text-gray-100 line-clamp-2'>{title}</h2>
                    <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center text-sm">
                            <img
                                src={authorAvatar || defaultAvatar}
                                alt={authorName || 'User'}
                                className="w-8 h-8 rounded-full mr-2 border border-gray-200 dark:border-gray-700 object-cover"
                            />
                            <div className="flex flex-col leading-tight">
                                <span className="font-medium text-gray-700 dark:text-gray-200 leading-tight">{authorName || 'User'}</span>
                                <span className="text-xs text-gray-400">{formattedDate}</span>
                            </div>
                        </div>
                        <span className="inline-block px-3 text-sm py-2 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-full text-gray-700 dark:text-gray-200 transition-all duration-300 hover:bg-white/60 dark:hover:bg-gray-800/60 border border-white/30 dark:border-gray-700/30 hover:border-white/50 dark:hover:border-gray-600/50">
                            Read More →
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Postcard;