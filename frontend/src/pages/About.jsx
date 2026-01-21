import React from 'react';

const About = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '24px', textAlign: 'center' }}>
        About 1000 Days to Ascension
      </h1>

      <div className="card">
        <h2 style={{ color: 'var(--accent-primary)' }}>The Story</h2>
        <p style={{ lineHeight: '1.8', marginBottom: '24px' }}>
          A 23-year-old man experiences death and reincarnation. A soul from the past enters his body,
          bringing an aggressive will to survive. But the past-life memories fade quickly, leaving only
          one critical piece of knowledge: <strong>Earth will be destroyed in 1500 days.</strong>
        </p>

        <p style={{ lineHeight: '1.8', marginBottom: '24px' }}>
          Starting with a below-average body, average intelligence, $0 in the bank, and fresh betrayal
          from friends and family, he has exactly <strong>1000 days to prepare</strong> before the sun is
          blocked and survival becomes exponentially harder.
        </p>

        <p style={{ lineHeight: '1.8', marginBottom: '24px' }}>
          This is not a story of supernatural powers or plot armor. This is about <strong>realistic,
            measurable progress</strong> in three critical areas: Physical strength, Mental capability,
          and Financial resources.
        </p>
      </div>

      <div className="card">
        <h2 style={{ color: 'var(--accent-primary)' }}>The Timeline</h2>
        <div style={{ marginTop: '24px' }}>
          <TimelineItem
            phase="Phase 1: Preparation"
            days="Days 1-1000"
            description="Normal conditions. Build strength, gain knowledge, accumulate resources. Every day counts."
          />
          <TimelineItem
            phase="Phase 2: The Darkness"
            days="Days 1001-1500"
            description="Aliens block the sun. Energy crisis. Food shortage. Infrastructure collapse. Survival mode."
          />
          <TimelineItem
            phase="Phase 3: The Attack"
            days="Day 1501+"
            description="The invasion begins. Everything built is tested. Fight or die."
          />
        </div>
      </div>

      <div className="card">
        <h2 style={{ color: 'var(--accent-primary)' }}>Realism Principles</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li><strong>Real Programs:</strong> Starting Strength, freeCodeCamp, actual training methods</li>
          <li><strong>Real Timeline:</strong> Natural strength gains take months, not weeks</li>
          <li><strong>Real Setbacks:</strong> Injuries, failed clients, burnout, doubt</li>
          <li><strong>Real Economics:</strong> Actual budgets, savings rates, income sources</li>
          <li><strong>Real Science:</strong> Based on physics, biology, and known training protocols</li>
        </ul>
      </div>

      <div className="card">
        <h2 style={{ color: 'var(--accent-primary)' }}>Track Your Own Journey</h2>
        <p style={{ lineHeight: '1.8' }}>
          Use this platform to track your own journey. Log daily progress, view your improvements over time,
          and see how you stack up against others who are also preparing for the unthinkable.
        </p>
      </div>
    </div>
  );
};

const TimelineItem = ({ phase, days, description }) => (
  <div style={{
    padding: '20px',
    marginBottom: '16px',
    borderLeft: '4px solid var(--accent-primary)',
    background: 'var(--bg-secondary)',
    borderRadius: '4px'
  }}>
    <h4 style={{ fontSize: '20px', marginBottom: '8px', color: 'var(--accent-primary)' }}>
      {phase}
    </h4>
    <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
      {days}
    </div>
    <p style={{ color: 'var(--text-primary)', lineHeight: '1.6' }}>
      {description}
    </p>
  </div>
);

export default About;