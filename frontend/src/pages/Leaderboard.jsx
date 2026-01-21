import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const Leaderboard = () => {
  const [category, setCategory] = useState('physical');
  const [leaderboard, setLeaderboard] = useState([]);
  const [improvers, setImprovers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, [category]);

  useEffect(() => {
    fetchImprovers();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await api.getLeaderboard(category);
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchImprovers = async () => {
    try {
      const response = await api.getImprovers();
      setImprovers(response.data);
    } catch (error) {
      console.error('Error fetching improvers:', error);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '36px', marginBottom: '24px', textAlign: 'center' }}>
        Leaderboard
      </h1>

      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <button 
          className={category === 'physical' ? 'btn btn-primary' : 'btn'}
          onClick={() => setCategory('physical')}
          style={{ margin: '0 8px', background: category === 'physical' ? undefined : 'var(--bg-secondary)' }}
        >
          💪 Physical
        </button>
        <button 
          className={category === 'mental' ? 'btn btn-primary' : 'btn'}
          onClick={() => setCategory('mental')}
          style={{ margin: '0 8px', background: category === 'mental' ? undefined : 'var(--bg-secondary)' }}
        >
          🧠 Mental
        </button>
        <button 
          className={category === 'financial' ? 'btn btn-primary' : 'btn'}
          onClick={() => setCategory('financial')}
          style={{ margin: '0 8px', background: category === 'financial' ? undefined : 'var(--bg-secondary)' }}
        >
          💰 Financial
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        {/* Current Leaders */}
        <div className="card">
          <h2 style={{ marginBottom: '24px' }}>🏆 Top Performers</h2>
          {loading ? (
            <p>Loading...</p>
          ) : leaderboard.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>No data yet. Be the first!</p>
          ) : (
            <div>
              {leaderboard.map((user, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                  background: index === 0 ? 'var(--accent-gradient)' : 'var(--bg-secondary)',
                  marginBottom: '12px',
                  borderRadius: '8px',
                  color: index === 0 ? 'white' : 'var(--text-primary)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '24px', fontWeight: 'bold' }}>
                      {index + 1}
                    </span>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{user.username}</div>
                      <div style={{ fontSize: '14px', opacity: 0.8 }}>Day {user.day}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    {user.score.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Improvers */}
        <div className="card">
          <h2 style={{ marginBottom: '24px' }}>📈 Most Improved</h2>
          {improvers.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>No improvement data yet</p>
          ) : (
            <div>
              {improvers.slice(0, 10).map((user, index) => (
                <div key={index} style={{
                  padding: '16px',
                  background: 'var(--bg-secondary)',
                  marginBottom: '12px',
                  borderRadius: '8px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 'bold' }}>{user.username}</span>
                    <span style={{ color: 'var(--success)' }}>{user.days} days tracked</span>
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                    Push-ups: +{user.improvements.pushups} | 
                    Squat: +{user.improvements.squat} lbs | 
                    Net Worth: +${user.improvements.netWorth.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="card" style={{ marginTop: '32px', background: 'var(--bg-secondary)' }}>
        <h3>💡 How Rankings Work</h3>
        <ul style={{ color: 'var(--text-secondary)' }}>
          <li><strong>Physical:</strong> Total of Squat + Bench + Deadlift (lbs)</li>
          <li><strong>Mental:</strong> Total books read</li>
          <li><strong>Financial:</strong> Net worth ($)</li>
          <li><strong>Most Improved:</strong> Total gains across all categories since Day 1</li>
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;