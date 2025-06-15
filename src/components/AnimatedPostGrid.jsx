import React from 'react';
import PostCard from './PostCard';
import SkeletonLoader from './loaders/SkeletonLoader';

export default function AnimatedPostGrid({ posts = [], loading = false, skeletonCount = 3 }) {
    return (
        <div className='flex flex-wrap gap-6 justify-center'>
            {posts.map((post, idx) => (
                <div
                    key={post.$id}
                    className='w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] animate-fade-in'
                    style={{ animationDelay: `${idx * 80}ms` }}
                >
                    <PostCard {...post} />
                </div>
            ))}
            {loading && (
                Array.from({ length: skeletonCount }).map((_, index) => (
                    <div key={`skeleton-${index}`} className='w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)]'>
                        <SkeletonLoader />
                    </div>
                ))
            )}
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.6s both;
                }
            `}</style>
        </div>
    );
} 