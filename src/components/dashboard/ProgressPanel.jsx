export default function ProgressPanel({ completionRate }) {
  const weeklyValues = [72, 58, 80, 66, 92, 77, 85];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="card progress-panel">
      <div className="panel-glow" />

      <div className="panel-header">
        <div>
          <p className="eyebrow">Execution health</p>
          <h3>Team completion pulse</h3>
        </div>
        <strong className="progress-rate">{completionRate}%</strong>
      </div>

      <div className="progress-summary-row">
        <div className="progress-summary-card">
          <span>Current completion</span>
          <strong>{completionRate}%</strong>
        </div>

        <div className="progress-summary-card">
          <span>Workflow stability</span>
          <strong>Healthy</strong>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${completionRate}%` }} />
      </div>

      <div className="chart-bars">
        {weeklyValues.map((value, index) => (
          <div key={index} className="bar-column">
            <div className="bar-wrap">
              <div className="bar" style={{ height: `${value}%` }} />
            </div>
            <span className="bar-label">{days[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
