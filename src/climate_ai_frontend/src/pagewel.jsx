import React from 'react';
import AuthButton from '../loginlogout/button';

function AppIntro() {
  return (
    <div className="welcome-page">
      <div className="welcome-content">
        <h1>Welcome to Climate AI</h1>
        <p className="tagline">Empowering a Sustainable Future with Artificial Intelligence</p>
        
        <div className="features">
          <div className="feature">
            <span className="icon">🌍</span>
            <h3>Climate Monitoring</h3>
            <p>Real-time tracking of environmental changes using advanced AI algorithms.</p>
          </div>
          <div className="feature">
            <span className="icon">📊</span>
            <h3>Data-Driven Insights</h3>
            <p>Actionable insights to help governments and organizations make informed decisions.</p>
          </div>
          <div className="feature">
            <span className="icon">🤖</span>
            <h3>AI-Powered Solutions</h3>
            <p>Cutting-edge AI models to predict and mitigate climate risks.</p>
          </div>
        </div>

    <AuthButton/>
      </div>
    </div>
  );
}

export default AppIntro;