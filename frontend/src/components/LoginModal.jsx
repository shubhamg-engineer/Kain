import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const LoginModal = ({ onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, register } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            let result;
            if (isLogin) {
                result = await login(formData.email, formData.password);
            } else {
                if (!formData.username || formData.username.length < 3) {
                    setError('Username must be at least 3 characters');
                    setLoading(false);
                    return;
                }
                result = await register(formData.username, formData.email, formData.password);
            }

            if (result.success) {
                onClose();
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '24px'
        }} onClick={onClose}>
            <div className="card" style={{
                maxWidth: '400px',
                width: '100%',
                position: 'relative'
            }} onClick={(e) => e.stopPropagation()}>
                {/* Close button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'none',
                        border: 'none',
                        fontSize: '24px',
                        cursor: 'pointer',
                        color: 'var(--text-secondary)'
                    }}
                >
                    ×
                </button>

                <h2 style={{
                    marginBottom: '24px',
                    textAlign: 'center',
                    background: 'var(--accent-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    {isLogin ? 'Welcome Back' : 'Start Your Journey'}
                </h2>

                {error && (
                    <div style={{
                        background: 'var(--danger)',
                        color: 'white',
                        padding: '12px',
                        borderRadius: '4px',
                        marginBottom: '16px',
                        fontSize: '14px'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                color: 'var(--text-secondary)',
                                fontSize: '14px'
                            }}>
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="input"
                                required={!isLogin}
                                placeholder="Enter username"
                            />
                        </div>
                    )}

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            color: 'var(--text-secondary)',
                            fontSize: '14px'
                        }}>
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input"
                            required
                            placeholder="Enter email"
                        />
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            color: 'var(--text-secondary)',
                            fontSize: '14px'
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="input"
                            required
                            minLength={6}
                            placeholder="Enter password (min 6 characters)"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                        style={{ width: '100%', marginBottom: '16px' }}
                    >
                        {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Register')}
                    </button>

                    <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px' }}>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            type="button"
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                            }}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--accent-primary)',
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        >
                            {isLogin ? 'Register' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
