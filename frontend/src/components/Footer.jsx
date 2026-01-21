import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{
            background: 'var(--bg-secondary)',
            borderTop: '2px solid var(--accent-primary)',
            padding: '48px 24px 24px',
            marginTop: '64px'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '32px'
            }}>
                {/* About Section */}
                <div>
                    <h3 style={{
                        color: 'var(--accent-primary)',
                        marginBottom: '16px',
                        fontSize: '18px'
                    }}>
                        1000 Days Ascension
                    </h3>
                    <p style={{
                        color: 'var(--text-secondary)',
                        lineHeight: '1.6',
                        fontSize: '14px'
                    }}>
                        Track your transformation across physical, mental, and financial dimensions.
                        Compete with others. Become who you were meant to be.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 style={{
                        color: 'var(--accent-primary)',
                        marginBottom: '16px',
                        fontSize: '18px'
                    }}>
                        Quick Links
                    </h3>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                    }}>
                        <Link to="/" style={{
                            color: 'var(--text-secondary)',
                            textDecoration: 'none',
                            fontSize: '14px'
                        }}>
                            Home
                        </Link>
                        <Link to="/tracker" style={{
                            color: 'var(--text-secondary)',
                            textDecoration: 'none',
                            fontSize: '14px'
                        }}>
                            Tracker
                        </Link>
                        <Link to="/leaderboard" style={{
                            color: 'var(--text-secondary)',
                            textDecoration: 'none',
                            fontSize: '14px'
                        }}>
                            Leaderboard
                        </Link>
                        <Link to="/about" style={{
                            color: 'var(--text-secondary)',
                            textDecoration: 'none',
                            fontSize: '14px'
                        }}>
                            About
                        </Link>
                    </div>
                </div>

                {/* Community */}
                <div>
                    <h3 style={{
                        color: 'var(--accent-primary)',
                        marginBottom: '16px',
                        fontSize: '18px'
                    }}>
                        Community
                    </h3>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                    }}>
                        <Link to="/gallery" style={{
                            color: 'var(--text-secondary)',
                            textDecoration: 'none',
                            fontSize: '14px'
                        }}>
                            Transformation Gallery
                        </Link>
                        <Link to="/blog" style={{
                            color: 'var(--text-secondary)',
                            textDecoration: 'none',
                            fontSize: '14px'
                        }}>
                            Stories & Blog
                        </Link>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div style={{
                maxWidth: '1200px',
                margin: '32px auto 0',
                paddingTop: '24px',
                borderTop: '1px solid var(--accent-primary)',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                fontSize: '14px'
            }}>
                <p>© 2026 1000 Days Ascension. Your journey to greatness starts today.</p>
                <p style={{ marginTop: '8px', fontSize: '12px', opacity: 0.7 }}>
                    "The best time to plant a tree was 20 years ago. The second best time is now."
                </p>
            </div>
        </footer>
    );
};

export default Footer;
