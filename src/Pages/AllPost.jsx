import React, { useState, useEffect, useCallback } from 'react';
import appwriteService from "../appwrite/conf";
import { Container } from "../components/index";
import AnimatedPostGrid from "../components/AnimatedPostGrid";
import { Query } from "appwrite";

function AllPost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const POSTS_PER_PAGE = 6;

    const fetchPosts = useCallback(async (pageNum) => {
        try {
            setLoading(true);
            const queries = [
                Query.equal("status", "active"),
                Query.limit(POSTS_PER_PAGE),
                Query.offset((pageNum - 1) * POSTS_PER_PAGE)
            ];

            const response = await appwriteService.getPosts(queries);
            if (response && response.documents) {
                if (pageNum === 1) {
                    setPosts(response.documents);
                } else {
                    setPosts(prev => [...prev, ...response.documents]);
                }
                setHasMore(response.documents.length === POSTS_PER_PAGE);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPosts(1);
    }, [fetchPosts]);

    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop
            >= document.documentElement.offsetHeight - 100
        ) {
            if (!loading && hasMore) {
                setPage(prev => prev + 1);
                fetchPosts(page + 1);
            }
        }
    }, [loading, hasMore, page, fetchPosts]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <div className='w-full py-8 min-h-screen bg-slate-50 dark:bg-[#18181b]'>
            <Container>
                <div className='backdrop-blur-lg bg-white/30 dark:bg-gray-900/30 rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-800/50'>
                    <AnimatedPostGrid posts={posts} loading={loading} skeletonCount={3} />
                    {!hasMore && posts.length > 0 && (
                        <div className='text-center mt-8 text-gray-600 dark:text-gray-400 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 py-3 rounded-full'>
                            No more posts to load
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPost;

