import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoginModal from '../components/LoginModal';

const Home = () => {
    const { user } = useContext(AuthContext);
    const [showLoginModal, setShowLoginModal] = useState(false);

    return (
        <div>
            {/* Hero Section */}
            <div style={{
                background: 'var(--accent-gradient)',
                padding: '80px 24px',
                textAlign: 'center',
                borderRadius: '12px',
                marginBottom: '48px'
            }}>
                <h1 style={{
                    fontSize: '56px',
                    fontWeight: 'bold',
                    color: 'white',
                    marginBottom: '24px',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}>
                    1000 Days to Ascension
                </h1>
                <p style={{
                    fontSize: '24px',
                    color: 'rgba(255,255,255,0.9)',
                    marginBottom: '32px',
                    maxWidth: '800px',
                    margin: '0 auto 32px'
                }}>
                    Transform yourself across Physical, Mental, and Financial dimensions. Track your progress. Compete with others. Become unstoppable.
                </p>
                {!user ? (
                    <button
                        onClick={() => setShowLoginModal(true)}
                        className="btn"
                        style={{
                            background: 'white',
                            color: 'var(--accent-primary)',
                            fontSize: '18px',
                            padding: '16px 32px',
                            fontWeight: 'bold'
                        }}
                    >
                        Start Your Journey Today
                    </button>
                ) : (
                    <Link to="/tracker" className="btn" style={{
                        background: 'white',
                        color: 'var(--accent-primary)',
                        fontSize: '18px',
                        padding: '16px 32px',
                        fontWeight: 'bold',
                        textDecoration: 'none'
                    }}>
                        Continue Your Journey
                    </Link>
                )}
            </div>

            {/* The Story */}
            <div className="card" style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '36px', marginBottom: '24px', color: 'var(--accent-primary)' }}>
                    The Premise
                </h2>
                <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '16px' }}>
                    You have been reincarnated with one piece of critical knowledge:
                    <strong> Earth will be destroyed in 1500 days</strong>.
                </p>
                <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '16px' }}>
                    You start with a below-average body, average intelligence, $0 in the bank,
                    and fresh betrayal from those you trusted. You have <strong>1000 days to prepare</strong> before
                    the sun is blocked and survival becomes exponentially harder.
                </p>
                <p style={{ fontSize: '18px', lineHeight: '1.8' }}>
                    This is not about supernatural powers. This is about <strong>realistic, measurable progress</strong> through
                    disciplined training, learning, and financial strategy.
                </p>
            </div>

            {/* Features */}
            <h2 style={{ fontSize: '36px', marginBottom: '32px', textAlign: 'center' }}>
                How It Works
            </h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
                marginBottom: '48px'
            }}>
                <FeatureCard
                    icon="💪"
                    title="Physical Development"
                    description="Track strength gains, endurance improvements, and body transformation. Log workouts, lifts, and cardio metrics."
                />
                <FeatureCard
                    icon="🧠"
                    title="Mental Growth"
                    description="Monitor reading speed, books completed, skills acquired, and courses finished. Expand your knowledge systematically."
                />
                <FeatureCard
                    icon="💰"
                    title="Financial Progress"
                    description="Build wealth through tracking net worth, monthly income, and savings. Document your economic ascension."
                />
            </div>

            {/* Leaderboard Preview */}
            <div className="card" style={{ background: 'var(--bg-secondary)', marginBottom: '48px' }}>
                <h2 style={{ fontSize: '32px', marginBottom: '24px', color: 'var(--accent-primary)' }}>
                    🏆 Compete & Compare
                </h2>
                <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '16px' }}>
                    Track your progress against "Kain" - the benchmark protagonist - and compete with other users
                    on the global leaderboard. See who has the strongest total (Squat + Bench + Deadlift),
                    who's read the most books, and who's built the most wealth.
                </p>
                <Link to="/leaderboard" className="btn btn-primary">
                    View Leaderboard
                </Link>
            </div>

            {/* Timeline */}
            <div className="card">
                <h2 style={{ fontSize: '32px', marginBottom: '24px', color: 'var(--accent-primary)' }}>
                    📅 The Timeline
                </h2>
                <div style={{ marginTop: '24px' }}>
                    <TimelinePhase
                        phase="Phase 1: Preparation"
                        days="Days 1-1000"
                        description="Normal conditions. Build strength, gain knowledge, accumulate resources. Every day counts."
                        color="var(--success)"
                    />
                    <TimelinePhase
                        phase="Phase 2: The Darkness"
                        days="Days 1001-1500"
                        description="Aliens block the sun. Energy crisis. Food shortage. Infrastructure collapse. Survival mode."
                        color="var(--warning)"
                    />
                    <TimelinePhase
                        phase="Phase 3: The Attack"
                        days="Day 1501+"
                        description="The invasion begins. Everything built is tested. Fight or die."
                        color="var(--danger)"
                    />
                </div>
            </div>

            {/* CTA */}
            {!user && (
                <div style={{
                    textAlign: 'center',
                    padding: '64px 24px',
                    background: 'var(--bg-secondary)',
                    borderRadius: '12px',
                    marginTop: '48px'
                }}>
                    <h2 style={{ fontSize: '36px', marginBottom: '24px' }}>
                        Ready to Begin?
                    </h2>
                    <p style={{ fontSize: '18px', marginBottom: '32px', color: 'var(--text-secondary)' }}>
                        Your 1000 days start now. Will you be ready when the darkness comes?
                    </p>
                    <button
                        onClick={() => setShowLoginModal(true)}
                        className="btn btn-primary"
                        style={{ fontSize: '18px', padding: '16px 32px' }}
                    >
                        Create Free Account
                    </button>
                </div>
            )}

            {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="card" style={{
        textAlign: 'center',
        transition: 'transform 0.2s',
        cursor: 'default'
    }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>{icon}</div>
        <h3 style={{ fontSize: '24px', marginBottom: '12px', color: 'var(--accent-primary)' }}>
            {title}
        </h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            {description}
        </p>
    </div>
);

const TimelinePhase = ({ phase, days, description, color }) => (
    <div style={{
        padding: '20px',
        marginBottom: '16px',
        borderLeft: `4px solid ${color}`,
        background: 'var(--bg-secondary)',
        borderRadius: '4px'
    }}>
        <h4 style={{ fontSize: '20px', marginBottom: '8px', color }}>{phase}</h4>
        <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            {days}
        </div>
        <p style={{ color: 'var(--text-primary)', lineHeight: '1.6' }}>
            {description}
        </p>
    </div>
);

export default Home;
