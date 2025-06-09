const ParentDashboard = () => {
  return (
    <div className="parent-dashboard">
      <div className="dashboard-header">
        <h1>Welcome Back!</h1>
        <p>Track your child's learning progress</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>👦 Child Progress</h2>
          <div className="progress-summary">
            <div className="stat">
              <span className="stat-number">45</span>
              <span className="stat-label">Minutes today</span>
            </div>
            <div className="stat">
              <span className="stat-number">12</span>
              <span className="stat-label">Lessons completed</span>
            </div>
            <div className="stat">
              <span className="stat-number">8</span>
              <span className="stat-label">Achievements earned</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>📚 Curriculum Coverage</h2>
          <div className="curriculum-list">
            <div className="curriculum-item">
              <span>Numbers</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '75%'}}></div>
              </div>
              <span>75%</span>
            </div>
            <div className="curriculum-item">
              <span>Shapes</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '60%'}}></div>
              </div>
              <span>60%</span>
            </div>
            <div className="curriculum-item">
              <span>Measuring</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '40%'}}></div>
              </div>
              <span>40%</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>🎯 Recent Activities</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-title">Addition to 10</span>
              <span className="activity-time">2 hours ago</span>
              <span className="activity-score">8/10</span>
            </div>
            <div className="activity-item">
              <span className="activity-title">Shapes Quiz</span>
              <span className="activity-time">Yesterday</span>
              <span className="activity-score">5/5</span>
            </div>
            <div className="activity-item">
              <span className="activity-title">Counting Practice</span>
              <span className="activity-time">3 days ago</span>
              <span className="activity-score">10/10</span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>⚠️ Areas for Improvement</h2>
          <div className="improvement-list">
            <div className="improvement-item">
              <span>Subtraction with borrowing</span>
              <span className="difficulty">Needs practice</span>
            </div>
            <div className="improvement-item">
              <span>Telling time</span>
              <span className="difficulty">Struggling</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
