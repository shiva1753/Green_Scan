import "../styles/home.css";

function Home() {
  return (
    <div className="home-container">
      {/* Header */}
      <header className="top-bar">
        <div>
          <h1 className="logo">GreenScan</h1>
          <p className="tagline">Smart Office Print & Resource Tracker</p>
        </div>

        <button className="logout-btn">Logout</button>
      </header>

      {/* Dashboard Title */}
      <section className="dashboard-header">
        <h2>Dashboard</h2>
        <p>Monitor your office printing resources in real-time</p>
      </section>

      {/* Stats Cards */}
      <section className="stats-grid">
        {/* Paper Card */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="icon blue">📄</span>
            <span className="stat-title">PAPER REMAINING</span>
          </div>

          <h3 className="stat-value">
            2,450 <span> sheets</span>
          </h3>

          <div className="progress-info">
            <span>Capacity</span>
            <span>5,000 sheets</span>
          </div>

          <div className="progress-bar">
            <div className="progress blue-progress" style={{ width: "49%" }} />
          </div>
        </div>

        {/* Toner Card */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="icon green">💧</span>
            <span className="stat-title">TONER LEVEL</span>
          </div>

          <h3 className="stat-value">
            68 <span>%</span>
          </h3>

          <div className="progress-info">
            <span>Status</span>
            <span className="status-good">Good</span>
          </div>

          <div className="progress-bar">
            <div className="progress green-progress" style={{ width: "68%" }} />
          </div>
        </div>
      </section>

      {/* Action Card */}
      <section className="action-card">
        <h3>Ready to print?</h3>
        <p>
          Submit a new print job to track your resource usage and maintain
          sustainability goals.
        </p>

        <button className="primary-btn">
          + Add Print Job
        </button>
      </section>
    </div>
  );
}

export default Home;
