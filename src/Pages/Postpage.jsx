import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/conf";
import { Button, Container, Loader } from "../components";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            setLoading(true);
            appwriteService.getpost(slug).then((post) => {
                setLoading(false);
                if (post) {
                    setPost(post);
                } else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        setLoading(true);
        appwriteService.deletePost(post.$id).then((status) => {
            setLoading(false);
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/all-posts");
            }
        });
    };

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Loader />
            </motion.div>
        </div>
    ) : post ? (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
        >
            <Container>
                <motion.div 
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-4xl mx-auto py-6 sm:py-12 px-3 sm:px-6 lg:px-8"
                >
                    {/* Hero Section */}
                    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl mb-8 sm:mb-12 group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
                        
                        <div className="relative w-full aspect-[16/9] overflow-hidden flex items-center justify-center bg-black">
                            <motion.img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="w-full h-full object-contain"
                                style={{
                                    objectPosition: "center"
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.7 }}
                            />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 z-20">
                            <motion.h1 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-4 drop-shadow-lg"
                            >
                                {post.title}
                            </motion.h1>
                        </div>

                        <Link to='/all-posts'>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20"
                            >
                                <Button 
                                    bgcolor="bg-white/10 hover:bg-white/20 backdrop-blur-md" 
                                    className="text-white border border-white/20 text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1 sm:py-2"
                                >
                                    <span className="hidden sm:inline">← Back to Posts</span>
                                    <span className="sm:hidden">←</span>
                                </Button>
                            </motion.div>
                        </Link>

                        {isAuthor && (
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 flex gap-2 sm:gap-3"
                            >
                                <Link to={`/edit-post/${post.$id}`}>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button 
                                            bgcolor="bg-green-500/90 hover:bg-green-600 backdrop-blur-md" 
                                            className="text-white border border-white/20 text-sm sm:text-base"
                                        >
                                            Edit
                                        </Button>
                                    </motion.div>
                                </Link>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button 
                                        bgcolor="bg-red-500/90 hover:bg-red-600 backdrop-blur-md" 
                                        onClick={deletePost}
                                        className="text-white border border-white/20 text-sm sm:text-base"
                                    >
                                        Delete
                                    </Button>
                                </motion.div>
                            </motion.div>
                        )}
                    </div>

                    {/* Author and Date Section */}
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 px-2 sm:px-4 gap-4 sm:gap-0"
                    >
                        <Link to={`/user/${post.userId}`} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                                {post.authorAvatar ? (
                                    <img 
                                        src={post.authorAvatar || 'https://ui-avatars.com/api/?name=User&background=random'} 
                                        alt={post.authorName || 'Deleted User'} 
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-lg sm:text-xl font-bold text-gray-500 dark:text-gray-400">
                                        {post.authorName?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                                    {post.authorName}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                    {post.authorEmail}
                                </p>
                            </div>
                        </Link>
                        <div className="text-left sm:text-right">
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                Published on
                            </p>
                            <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                                {formatDate(post.$createdAt)}
                            </p>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-8"
                    >
                        <div 
                            className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none"
                            //todo: add DOMPurify to sanitize the content while handling the embedded urls
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </motion.div>
                </motion.div>
            </Container>
        </motion.div>
    ) : null;
}
