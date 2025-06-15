import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import appwriteService from '../../appwrite/conf';
import { Loader } from '../index';

// Utility to strip HTML tags
function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState({ posts: [], users: [] });
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('posts'); // 'posts' or 'users'
    const searchTimeoutRef = useRef(null);
    const navigate = useNavigate();

    // Debounced search function
    const performSearch = useCallback(async (term) => {
        if (!term.trim()) {
            setSearchResults({ posts: [], users: [] });
            return;
        }

        setIsSearching(true);
        setError('');
        try {
            const [posts, users] = await Promise.all([
                appwriteService.searchPosts(term),
                appwriteService.searchUsers(term)
            ]);
            setSearchResults({ posts, users });
        } catch (error) {
            console.error('Search error:', error);
            setError('Failed to search. Please try again.');
            setSearchResults({ posts: [], users: [] });
        } finally {
            setIsSearching(false);
        }
    }, []);

    // Handle input changes with debounce
    useEffect(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (searchTerm.trim()) {
            searchTimeoutRef.current = setTimeout(() => {
                performSearch(searchTerm);
            }, 300);
        } else {
            setSearchResults({ posts: [], users: [] });
        }

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchTerm, performSearch]);

    // Close results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.search-container')) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleResultClick = (type, id) => {
        if (type === 'post') {
            navigate(`/post/${id}`);
        } else if (type === 'user') {
            navigate(`/user/${id}`);
        }
        setShowResults(false);
        setSearchTerm('');
        setSearchResults({ posts: [], users: [] });
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setShowResults(true);
    };

    const totalResults = searchResults.posts.length + searchResults.users.length;

    return (
        <div className="search-container relative w-full">
            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={() => setShowResults(true)}
                    placeholder="Search posts and users..."
                    className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             placeholder-gray-500 dark:placeholder-gray-400"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                {isSearching && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <Loader className="h-5 w-5" />
                    </div>
                )}
            </div>

            {/* Search Results Dropdown */}
            {showResults && (searchTerm.trim() || error) && (
                <div className="absolute z-50 w-full mt-2 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[60vh] overflow-y-auto
                    bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg animate-fade-slide-in"
                    style={{ transition: 'all 0.3s cubic-bezier(.4,0,.2,1)' }}
                >
                    {error ? (
                        <div className="p-4 text-red-500 dark:text-red-400 text-sm">
                            {error}
                        </div>
                    ) : isSearching ? (
                        <div className="p-4 text-gray-500 dark:text-gray-400 text-sm text-center">
                            Searching...
                        </div>
                    ) : totalResults > 0 ? (
                        <div>
                            {/* Tabs */}
                            <div className="flex border-b border-gray-200 dark:border-gray-700">
                                <button
                                    className={`flex-1 px-4 py-2 text-sm font-medium ${
                                        activeTab === 'posts'
                                            ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                    }`}
                                    onClick={() => setActiveTab('posts')}
                                >
                                    Posts ({searchResults.posts.length})
                                </button>
                                <button
                                    className={`flex-1 px-4 py-2 text-sm font-medium ${
                                        activeTab === 'users'
                                            ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                    }`}
                                    onClick={() => setActiveTab('users')}
                                >
                                    Users ({searchResults.users.length})
                                </button>
                            </div>

                            {/* Results */}
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                {activeTab === 'posts' ? (
                                    searchResults.posts.map((post, idx) => (
                                        <div
                                            key={post.$id}
                                            onClick={() => handleResultClick('post', post.$id)}
                                            className="p-4 hover:bg-white/80 dark:hover:bg-gray-700/80 cursor-pointer transition-colors duration-200 animate-fade-in"
                                            style={{ animationDelay: `${idx * 40}ms` }}
                                        >
                                            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                                                {stripHtml(post.content).slice(0, 120)}{stripHtml(post.content).length > 120 ? '...' : ''}
                                            </p>
                                            <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                                                <span className="flex items-center">
                                                    <img
                                                        src={post.authorAvatar}
                                                        alt={post.authorName}
                                                        className="w-4 h-4 rounded-full mr-1"
                                                    />
                                                    {post.authorName}
                                                </span>
                                                <span className="mx-2">•</span>
                                                <span>{new Date(post.$createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    searchResults.users.map((user, idx) => (
                                        <div
                                            key={user.id}
                                            onClick={() => handleResultClick('user', user.id)}
                                            className="p-4 hover:bg-white/80 dark:hover:bg-gray-700/80 cursor-pointer transition-colors duration-200 animate-fade-in"
                                            style={{ animationDelay: `${idx * 40}ms` }}
                                        >
                                            <div className="flex items-center">
                                                <img
                                                    src={user.avatar}
                                                    alt={user.name}
                                                    className="w-10 h-10 rounded-full mr-3"
                                                />
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                                        {user.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        {user.email}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        {user.postCount} {user.postCount === 1 ? 'post' : 'posts'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ) : searchTerm.trim() ? (
                        <div className="p-4 text-gray-500 dark:text-gray-400 text-sm text-center">
                            No results found matching "{searchTerm}"
                        </div>
                    ) : null}
                </div>
            )}
            {/* Animations */}
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.4s both; }
                @keyframes fade-slide-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-slide-in { animation: fade-slide-in 0.4s both; }
            `}</style>
        </div>
    );
} 