import React from 'react';

export default function UserInfoHeader({ avatar, name, email, postCount }) {
    return (
        <div className="mb-8 text-center animate-fade-in">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 border-4 border-white dark:border-gray-800 shadow-lg">
                    {avatar ? (
                        <img 
                            src={avatar} 
                            alt={name} 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-500 dark:text-gray-400">
                            {name?.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {name || 'User'}
                    </h1>
                    {email && (
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {email}
                        </p>
                    )}
                    {typeof postCount === 'number' && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {postCount} {postCount === 1 ? 'post' : 'posts'}
                        </p>
                    )}
                </div>
            </div>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.5s both; }
            `}</style>
        </div>
    );
} 