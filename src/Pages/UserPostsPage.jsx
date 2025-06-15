import React, { useState, useEffect } from 'react';
import appwriteService from "../appwrite/conf";
import { Container } from "../components/index";
import AnimatedPostGrid from "../components/AnimatedPostGrid";
import UserInfoHeader from "../components/UserInfoHeader";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Query } from "appwrite";

function UserPostsPage({ userId: propUserId }) {
    const params = useParams();
    const reduxUser = useSelector((state) => state.auth.userData);
    // Use prop, then URL param, then Redux
    const userId = propUserId || params.userId || reduxUser?.$id;
    const isSelf = userId === reduxUser?.$id;

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserPosts = async () => {
            if (!userId) return;
            setLoading(true);
            try {
                const queries = [
                    Query.equal("status", "active"),
                    Query.equal("userId", userId),
                    Query.orderDesc('$createdAt'),
                    Query.limit(100)
                ];
                const response = await appwriteService.getPosts(queries);
                setPosts(response?.documents || []);
                // Set user info
                if (isSelf && reduxUser) {
                    setUserInfo({
                        avatar: reduxUser?.prefs?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(reduxUser?.name || 'User')}`,
                        name: reduxUser?.name,
                        email: reduxUser?.email,
                        postCount: response?.documents?.length || 0
                    });
                } else if (response?.documents?.length > 0) {
                    setUserInfo({
                        avatar: response.documents[0].authorAvatar,
                        name: response.documents[0].authorName,
                        email: response.documents[0].authorEmail,
                        postCount: response.documents.length
                    });
                } else {
                    setUserInfo(null);
                }
            } catch (error) {
                console.error("Error fetching user posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserPosts();
    }, [userId, reduxUser, isSelf]);

    return (
        <div className='w-full py-8 min-h-screen bg-slate-50 dark:bg-[#18181b]'>
            <Container>
                <div className='backdrop-blur-lg bg-white/30 dark:bg-gray-900/30 rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-800/50'>
                    {userInfo && (
                        <UserInfoHeader
                            avatar={userInfo.avatar}
                            name={userInfo.name}
                            email={userInfo.email}
                            postCount={userInfo.postCount}
                        />
                    )}
                    <AnimatedPostGrid posts={posts} loading={loading} skeletonCount={3} />
                    {!loading && posts.length === 0 && (
                        <div className='text-center mt-8 text-gray-600 dark:text-gray-400 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 py-3 rounded-full'>
                            {isSelf ? 'You have not created any posts yet.' : 'This user has not created any posts yet.'}
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default UserPostsPage; 