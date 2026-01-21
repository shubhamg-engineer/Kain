import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    displayName: '',
    theme: 'dark',
    showOnLeaderboard: true
  });
  const [userProgress, setUserProgress] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
    
    if (user) {
      setSettings({
        displayName: user.displayName || user.username,
        theme: user.theme || 'dark',
        showOnLeaderboard: user.showOnLeaderboard !== false
      });
    }

    fetchProgress();
  }, [user, token, navigate]);

  const fetchProgress = async () => {
    try {
      const response = await api.getUserProgress();
      setUserProgress(response.data);
      calculateStats(response.data);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const calculateStats = (progress) => {
    if (progress.length === 0) {
      setStats(null);
      return;
    }

    const first = progress[0];
    const latest = progress[progress.length - 1];

    setStats({
      totalDays: progress.length,
      improvements: {
        pushups: (latest.physical.pushups || 0) - (first.physical.pushups || 0),
        squat: (latest.physical.squat || 0) - (first.physical.squat || 0),
        netWorth: (latest.financial.netWorth || 0) - (first.financial.netWorth || 0),
        booksRead: (latest.mental.booksRead || 0) - (first.mental.booksRead || 0)
      },
      current: {
        totalStrength: (latest.physical.squat || 0) + (latest.physical.bench || 0) + (latest.physical.deadlift || 0),
        netWorth: latest.financial.netWorth || 0,
        booksRead: latest.mental.booksRead || 0
      }
    });
  };

  const handleSaveSettings = async () => {
    try {
      await api.updateSettings(settings);
      alert('Settings saved!');
    } catch (error) {
      alert('Error saving settings');
    }
  };

  if (!user) {
    return <div style={{ textAlign: 'center', padding: '48px' }}>Please login</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '24px', textAlign: 'center' }}>
        Profile: {user.username}
      </h1>

      {/* Stats Overview */}
      {stats && (
        <div className="card">
          <h2 style={{ marginBottom: '24px' }}>📊 Your Progress</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <StatBox label="Days Tracked" value={stats.totalDays} color="var(--accent-primary)" />
            <StatBox label="Total Strength" value={`${stats.current.totalStrength} lbs`} color="var(--success)" />
            <StatBox label="Net Worth" value={`${stats.current.netWorth.toLocaleString()}`} color="var(--warning)" />
            <StatBox label="Books Read" value={stats.current.booksRead} color="var(--accent-secondary)" />
          </div>

          <h3 style={{ marginTop: '32px', marginBottom: '16px' }}>Improvements Since Day 1</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <ImprovementBox label="Push-ups" value={`+${stats.improvements.pushups}`} />
            <ImprovementBox label="Squat" value={`+${stats.improvements.squat} lbs`} />
            <ImprovementBox label="Net Worth" value={`+${stats.improvements.netWorth.toLocaleString()}`} />
            <ImprovementBox label="Books" value={`+${stats.improvements.booksRead}`} />
          </div>
        </div>
      )}

      {userProgress.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
          <h2>No Progress Yet</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '16px' }}>
            Start tracking your journey in the Tracker page!
          </p>
        </div>
      )}

      {/* Settings */}
      <div className="card">
        <h2 style={{ marginBottom: '24px' }}>⚙️ Settings</h2>
        
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Display Name
          </label>
          <input
            className="input"
            type="text"
            value={settings.displayName}
            onChange={(e) => setSettings({ ...settings, displayName: e.target.value })}
            placeholder="Your display name"
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.showOnLeaderboard}
              onChange={(e) => setSettings({ ...settings, showOnLeaderboard: e.target.checked })}
              style={{ marginRight: '12px', width: '20px', height: '20px' }}
            />
            <span>Show on Leaderboard</span>
          </label>
        </div>

        <button onClick={handleSaveSettings} className="btn btn-primary" style={{ width: '100%' }}>
          Save Settings
        </button>
      </div>

      {/* Account Actions */}
      <div className="card">
        <h2 style={{ marginBottom: '24px' }}>Account</h2>
        <div style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
          <div>Email: {user.email}</div>
          <div>Member since: {new Date(user.createdAt).toLocaleDateString()}</div>
        </div>
        <button 
          onClick={logout} 
          className="btn"
          style={{ background: 'var(--danger)', color: 'white', width: '100%' }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const StatBox = ({ label, value, color }) => (
  <div style={{ 
    padding: '20px', 
    background: 'var(--bg-secondary)', 
    borderRadius: '8px',
    textAlign: 'center',
    borderTop: `4px solid ${color}`
  }}>
    <div style={{ fontSize: '28px', fontWeight: 'bold', color, marginBottom: '8px' }}>
      {value}
    </div>
    <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
      {label}
    </div>
  </div>
);

const ImprovementBox = ({ label, value }) => (
  <div style={{ 
    padding: '16px', 
    background: 'var(--bg-secondary)', 
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}>
    <span>{label}</span>
    <span style={{ fontWeight: 'bold', color: 'var(--success)' }}>{value}</span>
  </div>
);

export default Profile;