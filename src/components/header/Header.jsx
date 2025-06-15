import React, { useEffect, useState } from 'react';
import { Container, Logo, UserMenu, ThemeBtn } from "../index";
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector((state) => state.auth.userData);
    const navigate = useNavigate()
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const location = useLocation();
    const defaultAvatar = 'https://ui-avatars.com/api/?name=User&background=random';
    const userAvatar = userData?.prefs?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData?.name || 'User')}`;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 55);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: "Posts",
            slug: "/all-posts",
            active: true,
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        }
    ]

    // Transparent header only on Home page
    const isHome = location.pathname === "/";
    const headerClass = isHome
        ? "sticky top-0 z-50 dark:bg-gray-900 bg-white"
        : scrolled
            ? "sticky top-0 z-50 backdrop-blur-2xl bg-white/40 dark:bg-black/40 transition-all duration-300 rounded-b-xl"
            : "sticky top-0 z-50 backdrop-blur bg-white/90 dark:bg-black/90 transition-all duration-300";

    return (
        <header className={headerClass}>
            <Container>
                <nav className="flex items-center h-20 sm:h-24 px-2 sm:px-0">
                    {/* Logo */}
                    <Link to='/' className="flex items-center space-x-3 mr-4 sm:mr-10 flex-shrink-0">
                        <Logo width='60px' />
                        <span className="text-xl sm:text-2xl font-extrabold text-gray-800 dark:text-gray-100 tracking-widest select-none" style={{ fontFamily: 'cursive' }}>ProsePond</span>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <div className="hidden sm:block flex-1 max-w-xl mx-8">
                        <SearchBar />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:flex items-center space-x-8">
                        {navItems.map((item) =>
                            item.active && item.name !== 'Home' ? (
                                <button
                                    key={item.name}
                                    onClick={() => navigate(item.slug)}
                                    className="text-base font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    {item.name}
                                </button>
                            ) : null
                        )}
                    </div>

                    {/* Right side items */}
                    <div className="ml-auto flex items-center space-x-4">
                        {/* Avatar - Only visible when logged in */}
                        {authStatus && (
                            <div className="relative">
                                <button
                                    id="user-menu-btn"
                                    onClick={() => setUserMenuOpen(v => !v)}
                                    className="focus:outline-none"
                                    aria-label="Open user menu"
                                >
                                    <img
                                        src={userAvatar || defaultAvatar}
                                        alt={userData?.name || 'User'}
                                        className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 object-cover"
                                    />
                                </button>
                                <UserMenu 
                                    userData={userData}
                                    isOpen={userMenuOpen}
                                    onClose={() => setUserMenuOpen(false)}
                                    position="right-0"
                                    menuId="user-menu-btn"
                                />
                            </div>
                        )}
                        
                        {/* Hamburger menu button */}
                        <div className="relative">
                            <button
                                className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onClick={() => setMenuOpen(!menuOpen)}
                                aria-label="Toggle navigation menu"
                            >
                                <svg className="w-7 h-7 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>

                            {/* Hamburger Menu */}
                            {menuOpen && (
                                <>
                                    {/* Mobile Dropdown Menu - Redesigned */}
                                    <div className="fixed left-0 right-0 top-20 bg-white/95 dark:bg-black/95 shadow-2xl rounded-b-2xl z-[100] px-4 py-6 flex flex-col gap-4 sm:hidden animate-fade-in">
                                        {/* Search Bar - Mobile */}
                                        <div className="w-full mb-4">
                                            <SearchBar />
                                        </div>
                                        <ul className="flex flex-col w-full gap-2">
                                            <li>
                                                <button
                                                    onClick={() => { setMenuOpen(false); navigate('/'); }}
                                                    className="w-full py-3 text-lg font-semibold text-gray-800 dark:text-gray-100 rounded hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
                                                >
                                                    Home
                                                </button>
                                            </li>
                                            {!authStatus && (
                                                <>
                                                    <li>
                                                        <button
                                                            onClick={() => { setMenuOpen(false); navigate('/login'); }}
                                                            className="w-full py-3 text-lg font-semibold text-gray-800 dark:text-gray-100 rounded hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
                                                        >
                                                            Login
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            onClick={() => { setMenuOpen(false); navigate('/signup'); }}
                                                            className="w-full py-3 text-lg font-semibold text-gray-800 dark:text-gray-100 rounded hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
                                                        >
                                                            Signup
                                                        </button>
                                                    </li>
                                                </>
                                            )}
                                            <li className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
                                                <div className="flex justify-center">
                                                    <ThemeBtn />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* Desktop Dropdown Menu */}
                                    <div className="absolute top-full right-0 w-64 bg-white/95 dark:bg-black/95 shadow-lg rounded-b-xl flex-col items-center py-4 animate-fade-in z-50 hidden sm:flex">
                                        {/* Search Bar - Desktop (hidden) */}
                                        <div className="w-full px-4 mb-6 hidden">
                                            <SearchBar />
                                        </div>
                                        <ul className="flex flex-col w-full items-center space-y-2">
                                            <li className="w-full text-center">
                                                <button
                                                    onClick={() => { setMenuOpen(false); navigate('/'); }}
                                                    className="w-full px-4 py-3 text-base font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                                >
                                                    Home
                                                </button>
                                            </li>
                                            {!authStatus && (
                                                <>
                                                    <li className="w-full text-center">
                                                        <button
                                                            onClick={() => { setMenuOpen(false); navigate('/login'); }}
                                                            className="w-full px-4 py-3 text-base font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                                        >
                                                            Login
                                                        </button>
                                                    </li>
                                                    <li className="w-full text-center">
                                                        <button
                                                            onClick={() => { setMenuOpen(false); navigate('/signup'); }}
                                                            className="w-full px-4 py-3 text-base font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                                        >
                                                            Signup
                                                        </button>
                                                    </li>
                                                </>
                                            )}
                                            <li className="w-full text-center border-t border-gray-200 dark:border-gray-700 mt-2 pt-4">
                                                <div className="flex justify-center">
                                                    <ThemeBtn />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </Container>
        </header>
    );
}

export default Header;
