import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import './Header.css';
import clsx from 'clsx';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, logout, user } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const isHomePage = location.pathname === '/';

    // Handle scroll effects
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Add shadow when scrolled
            setIsScrolled(currentScrollY > 20);

            // Hide/show header on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsHeaderVisible(false);
            } else if (currentScrollY < lastScrollY) {
                setIsHeaderVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        const throttledScroll = () => {
            let ticking = false;
            return () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        handleScroll();
                        ticking = false;
                    });
                    ticking = true;
                }
            };
        };

        window.addEventListener('scroll', throttledScroll(), { passive: true });
        return () => window.removeEventListener('scroll', throttledScroll());
    }, [lastScrollY]);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const scrollToSection = useCallback((sectionId) => {
        if (!isHomePage) {
            navigate(`/#${sectionId}`);
            return;
        }

        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            setIsMobileMenuOpen(false);
        }
    }, [isHomePage, navigate]);

    const handleLogout = useCallback(() => {
        logout();
        navigate('/');
    }, [logout, navigate]);

    const navLinks = [
        { label: 'Home', path: '/', isAnchor: false },
        { label: 'Cards', sectionId: 'cards', isAnchor: true },
        { label: 'Deposits', sectionId: 'deposits', isAnchor: true },
        { label: 'Services', sectionId: 'services', isAnchor: true },
        { label: 'FAQ', sectionId: 'faq', isAnchor: true },
        { label: 'Exchange Rates', sectionId: 'exchange', isAnchor: true }
    ];

    const authLinks = isAuthenticated
        ? [
            { label: 'Dashboard', path: '/dashboard', isButton: false },
            { label: 'Add Card', path: '/add-card', isButton: false },
            { label: 'Logout', onClick: handleLogout, isButton: true }
        ]
        : [
            { label: 'Login', path: '/login', isButton: false },
            { label: 'Register', path: '/register', isButton: false, isPrimary: true }
        ];

    return (
        <header className={clsx(
            'header',
            isDarkMode && 'header--dark',
            isScrolled && 'header--scrolled',
            !isHeaderVisible && 'header--hidden'
        )}>
            <div className="container">
                <div className="header__content">
                    {/* Logo */}
                    <Link to="/" className="header__logo">
                        <div className="header__logo-icon">🏦</div>
                        <span className="header__logo-text">Chimigancha Bank</span>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="header__mobile-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span className={clsx('header__hamburger', isMobileMenuOpen && 'header__hamburger--open')}></span>
                    </button>

                    {/* Navigation */}
                    <nav className={clsx('header__nav', isMobileMenuOpen && 'header__nav--open')}>
                        {/* Main Navigation */}
                        <div className="header__nav-main">
                            {navLinks.map((link) => (
                                link.isAnchor ? (
                                    <button
                                        key={link.label}
                                        onClick={() => scrollToSection(link.sectionId)}
                                        className="header__nav-link header__nav-link--anchor"
                                    >
                                        {link.label}
                                    </button>
                                ) : (
                                    <Link
                                        key={link.label}
                                        to={link.path}
                                        className="header__nav-link"
                                    >
                                        {link.label}
                                    </Link>
                                )
                            ))}
                        </div>

                        {/* Auth Navigation */}
                        <div className="header__nav-auth">
                            {authLinks.map((link) => (
                                link.isButton ? (
                                    <button
                                        key={link.label}
                                        onClick={link.onClick}
                                        className={clsx('header__nav-btn', link.isPrimary && 'header__nav-btn--primary')}
                                    >
                                        {link.label}
                                    </button>
                                ) : (
                                    <Link
                                        key={link.label}
                                        to={link.path}
                                        className={clsx('header__nav-link', link.isPrimary && 'header__nav-link--primary')}
                                    >
                                        {link.label}
                                    </Link>
                                )
                            ))}

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="header__theme-toggle"
                                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                            >
                                {isDarkMode ? (
                                    <span className="header__theme-icon">☀️</span>
                                ) : (
                                    <span className="header__theme-icon">🌙</span>
                                )}
                            </button>

                            {/* User Info */}
                            {isAuthenticated && user && (
                                <div className="header__user-info">
                  <span className="header__user-avatar">
                    {user.name?.[0]?.toUpperCase()}
                  </span>
                                    <span className="header__user-name">
                    {user.name}
                  </span>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
