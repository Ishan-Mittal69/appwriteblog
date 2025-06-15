import React, { useEffect, useState } from 'react';
import { Container, Logo, UserMenu } from "../index";
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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
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
                    <Link to='/' className="flex items-center space-x-3 mr-4 sm:mr-10 flex-shrink-0">
                        <Logo width='60px' />
                        <span className="text-xl sm:text-2xl font-extrabold text-gray-800 dark:text-gray-100 tracking-widest select-none" style={{ fontFamily: 'cursive' }}>ProsePond</span>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <div className="hidden sm:block flex-1 max-w-xl mx-4">
                        <SearchBar />
                    </div>

                    {/* Avatar for mobile */}
                    {authStatus ? (
                        <div className="sm:hidden ml-auto relative">
                            <button
                                id="mobile-avatar-btn"
                                className="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onClick={() => setMobileMenuOpen(v => !v)}
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
                                isOpen={mobileMenuOpen}
                                onClose={() => setMobileMenuOpen(false)}
                                position="right-0"
                                className="sm:hidden"
                                menuId="mobile-avatar-btn"
                            />
                        </div>
                    ) : null}
                    
                    <button
                        className="sm:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        <svg className="w-7 h-7 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    {/* Desktop nav */}
                    <ul className="hidden sm:flex ml-auto items-center">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className="px-4 py-2 text-base font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {/* Avatar for desktop */}
                        {authStatus && (
                            <li className="px-4 ml-2 relative">
                                <button
                                    id="desktop-avatar-btn"
                                    onClick={() => setDesktopMenuOpen(v => !v)}
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
                                    isOpen={desktopMenuOpen}
                                    onClose={() => setDesktopMenuOpen(false)}
                                    position="right-0"
                                    className="hidden sm:block"
                                    menuId="desktop-avatar-btn"
                                />
                            </li>
                        )}
                    </ul>

                    {/* Mobile nav */}
                    {menuOpen && (
                        <div className="absolute top-full left-0 w-full bg-white/95 dark:bg-black/95 shadow-lg rounded-b-xl flex flex-col items-center py-4 sm:hidden animate-fade-in z-50">
                            {/* Search Bar - Mobile */}
                            <div className="w-full px-4 mb-4">
                                <SearchBar />
                            </div>
                            <ul className="flex flex-col w-full items-center space-y-2">
                                {navItems.map((item) =>
                                    item.active ? (
                                        <li key={item.name} className="w-full text-center">
                                            <button
                                                onClick={() => { setMenuOpen(false); navigate(item.slug); }}
                                                className="w-full px-4 py-3 text-base font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                            >
                                                {item.name}
                                            </button>
                                        </li>
                                    ) : null
                                )}
                            </ul>
                        </div>
                    )}
                </nav>
            </Container>
        </header>
    );
}

export default Header;
