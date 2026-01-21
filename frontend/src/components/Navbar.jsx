import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import LoginModal from './LoginModal';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/tracker', label: 'Tracker' },
        { path: '/leaderboard', label: 'Leaderboard' },
        { path: '/gallery', label: 'Gallery' },
        { path: '/blog', label: 'Blog' },
        { path: '/about', label: 'About' }
    ];

    return (
        <>
            <nav style={{
                background: 'var(--bg-secondary)',
                borderBottom: '2px solid var(--accent-primary)',
                padding: '16px 0',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                backdropFilter: 'blur(10px)'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    {/* Logo */}
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h1 style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            background: 'var(--accent-gradient)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            margin: 0
                        }}>
                            1000 Days Ascension
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }} className="desktop-nav">
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                style={{
                                    textDecoration: 'none',
                                    color: isActive(link.path) ? 'var(--accent-primary)' : 'var(--text-primary)',
                                    fontWeight: isActive(link.path) ? 'bold' : 'normal',
                                    transition: 'color 0.2s'
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth & Theme */}
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        {/* Theme Switcher */}
                        <select
                            value={theme}
                            onChange={(e) => toggleTheme(e.target.value)}
                            style={{
                                padding: '8px 12px',
                                background: 'var(--bg-primary)',
                                color: 'var(--text-primary)',
                                border: '1px solid var(--accent-primary)',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="dark">🌙 Dark</option>
                            <option value="light">☀️ Light</option>
                            <option value="comic">📚 Comic</option>
                        </select>

                        {/* Auth Buttons */}
                        {user ? (
                            <>
                                <Link to="/profile" className="btn" style={{
                                    textDecoration: 'none',
                                    background: isActive('/profile') ? 'var(--accent-gradient)' : 'var(--bg-primary)'
                                }}>
                                    👤 {user.username}
                                </Link>
                                <button onClick={logout} className="btn">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setShowLoginModal(true)} className="btn btn-primary">
                                Login / Register
                            </button>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            style={{
                                display: 'none',
                                background: 'none',
                                border: 'none',
                                fontSize: '24px',
                                cursor: 'pointer',
                                color: 'var(--text-primary)'
                            }}
                        >
                            ☰
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="mobile-menu" style={{
                        display: 'none',
                        flexDirection: 'column',
                        gap: '12px',
                        padding: '16px 24px',
                        background: 'var(--bg-primary)',
                        marginTop: '16px'
                    }}>
                        {navLinks.map(link => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setMobileMenuOpen(false)}
                                style={{
                                    textDecoration: 'none',
                                    color: isActive(link.path) ? 'var(--accent-primary)' : 'var(--text-primary)',
                                    fontWeight: isActive(link.path) ? 'bold' : 'normal',
                                    padding: '8px 0'
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>

            {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
        </>
    );
};

export default Navbar;
