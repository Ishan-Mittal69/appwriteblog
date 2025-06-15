import React from 'react';

const SkeletonLoader = () => {
    return (
        <div className="w-full h-full p-0">
            <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden">
                <div className="w-full h-72 bg-gray-200 dark:bg-gray-700 rounded-xl" />
                <div className="p-4">
                    <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/3"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
