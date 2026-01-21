import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Tracker = () => {
  const { user, token } = useContext(AuthContext);
  const [userProgress, setUserProgress] = useState([]);
  const [kainProgress, setKainProgress] = useState([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [formData, setFormData] = useState({
    physical: { weight: 0, pushups: 0, pullups: 0, plank: 0, squat: 0, bench: 0, deadlift: 0, run5k: 0 },
    mental: { readingSpeed: 0, booksRead: 0, skills: [], coursesCompleted: [] },
    financial: { netWorth: 0, monthlyIncome: 0, savings: 0 },
    notes: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const kainRes = await api.getKainProgress();
      setKainProgress(kainRes.data.days);
      
      if (token) {
        const userRes = await api.getUserProgress();
        setUserProgress(userRes.data);
        if (userRes.data.length > 0) {
          setCurrentDay(userRes.data[userRes.data.length - 1].day + 1);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      alert('Please login to save progress');
      return;
    }

    try {
      await api.saveProgress({
        day: currentDay,
        ...formData
      });
      
      alert('Progress saved!');
      fetchData();
      setCurrentDay(currentDay + 1);
      
      // Reset form
      setFormData({
        physical: { weight: 0, pushups: 0, pullups: 0, plank: 0, squat: 0, bench: 0, deadlift: 0, run5k: 0 },
        mental: { readingSpeed: 0, booksRead: 0, skills: [], coursesCompleted: [] },
        financial: { netWorth: 0, monthlyIncome: 0, savings: 0 },
        notes: ''
      });
    } catch (error) {
      alert('Error saving progress: ' + (error.response?.data?.error || error.message));
    }
  };

  const handlePhysicalChange = (field, value) => {
    setFormData({
      ...formData,
      physical: { ...formData.physical, [field]: parseFloat(value) || 0 }
    });
  };

  const handleMentalChange = (field, value) => {
    setFormData({
      ...formData,
      mental: { ...formData.mental, [field]: field === 'skills' || field === 'coursesCompleted' ? value.split(',').map(s => s.trim()) : parseFloat(value) || 0 }
    });
  };

  const handleFinancialChange = (field, value) => {
    setFormData({
      ...formData,
      financial: { ...formData.financial, [field]: parseFloat(value) || 0 }
    });
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '48px' }}>Loading...</div>;
  }

  return (
    <div>
      <h1 style={{ fontSize: '36px', marginBottom: '24px', textAlign: 'center' }}>
        Progress Tracker
      </h1>

      {!token && (
        <div className="card" style={{ background: 'var(--warning)', color: '#000', marginBottom: '24px' }}>
          <p style={{ margin: 0 }}>⚠️ Please login to save your progress!</p>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        {/* Progress Charts */}
        {userProgress.length > 0 && (
          <>
            <div className="card">
              <h3>Physical Progress</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={userProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="physical.pushups" stroke="var(--accent-primary)" name="Push-ups" />
                  <Line type="monotone" dataKey="physical.squat" stroke="var(--accent-secondary)" name="Squat" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <h3>Mental Progress</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={userProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="mental.booksRead" stroke="var(--success)" name="Books Read" />
                  <Line type="monotone" dataKey="mental.readingSpeed" stroke="var(--warning)" name="Reading Speed" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="card">
              <h3>Financial Progress</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={userProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="financial.netWorth" stroke="var(--success)" name="Net Worth" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit}>
        <div className="card">
          <h2 style={{ marginBottom: '24px' }}>Day {currentDay} Progress Entry</h2>

          {/* Physical Stats */}
          <h3 style={{ color: 'var(--accent-primary)', marginTop: '24px' }}>💪 Physical</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <InputField label="Weight (lbs)" value={formData.physical.weight} onChange={(v) => handlePhysicalChange('weight', v)} />
            <InputField label="Push-ups" value={formData.physical.pushups} onChange={(v) => handlePhysicalChange('pushups', v)} />
            <InputField label="Pull-ups" value={formData.physical.pullups} onChange={(v) => handlePhysicalChange('pullups', v)} />
            <InputField label="Plank (seconds)" value={formData.physical.plank} onChange={(v) => handlePhysicalChange('plank', v)} />
            <InputField label="Squat (lbs)" value={formData.physical.squat} onChange={(v) => handlePhysicalChange('squat', v)} />
            <InputField label="Bench (lbs)" value={formData.physical.bench} onChange={(v) => handlePhysicalChange('bench', v)} />
            <InputField label="Deadlift (lbs)" value={formData.physical.deadlift} onChange={(v) => handlePhysicalChange('deadlift', v)} />
            <InputField label="5K Time (min)" value={formData.physical.run5k} onChange={(v) => handlePhysicalChange('run5k', v)} />
          </div>

          {/* Mental Stats */}
          <h3 style={{ color: 'var(--accent-primary)', marginTop: '24px' }}>🧠 Mental</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <InputField label="Reading Speed (WPM)" value={formData.mental.readingSpeed} onChange={(v) => handleMentalChange('readingSpeed', v)} />
            <InputField label="Books Read" value={formData.mental.booksRead} onChange={(v) => handleMentalChange('booksRead', v)} />
          </div>
          <InputField 
            label="Skills (comma separated)" 
            value={formData.mental.skills.join(', ')} 
            onChange={(v) => handleMentalChange('skills', v)} 
            fullWidth 
          />
          <InputField 
            label="Courses Completed (comma separated)" 
            value={formData.mental.coursesCompleted.join(', ')} 
            onChange={(v) => handleMentalChange('coursesCompleted', v)} 
            fullWidth 
          />

          {/* Financial Stats */}
          <h3 style={{ color: 'var(--accent-primary)', marginTop: '24px' }}>💰 Financial</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <InputField label="Net Worth ($)" value={formData.financial.netWorth} onChange={(v) => handleFinancialChange('netWorth', v)} />
            <InputField label="Monthly Income ($)" value={formData.financial.monthlyIncome} onChange={(v) => handleFinancialChange('monthlyIncome', v)} />
            <InputField label="Savings ($)" value={formData.financial.savings} onChange={(v) => handleFinancialChange('savings', v)} />
          </div>

          {/* Notes */}
          <h3 style={{ color: 'var(--accent-primary)', marginTop: '24px' }}>📝 Notes</h3>
          <textarea
            className="input"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="How did today go? Any insights?"
            rows={4}
            style={{ width: '100%', resize: 'vertical' }}
          />

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '24px', padding: '16px' }}>
            Save Day {currentDay} Progress
          </button>
        </div>
      </form>
    </div>
  );
};

const InputField = ({ label, value, onChange, fullWidth }) => (
  <div style={{ marginBottom: fullWidth ? '16px' : 0 }}>
    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', color: 'var(--text-secondary)' }}>
      {label}
    </label>
    <input
      type="text"
      className="input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ marginBottom: 0 }}
    />
  </div>
);

export default Tracker;