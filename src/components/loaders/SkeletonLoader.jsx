import React from 'react';

const SkeletonLoader = () => {
    return (
        <div className="p-2 w-1/4">
            <div className="animate-pulse bg-gray-200 rounded-lg h-64 dark:bg-gray-600"></div>
            <div className="mt-4 h-4 bg-gray-200 rounded dark:bg-gray-600"></div>
            <div className="mt-2 h-4 bg-gray-200 rounded dark:bg-gray-600 w-3/4"></div>
            <div className="mt-2 h-4 bg-gray-200 rounded dark:bg-gray-600"></div>
        </div>
    );
};

export default SkeletonLoader;
