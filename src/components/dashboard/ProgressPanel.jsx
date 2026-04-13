export default function ProgressPanel({ completionRate }) {
  return (
    <div className="card progress-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Execution health</p>
          <h3>Team completion pulse</h3>
        </div>
        <strong>{completionRate}%</strong>
      </div>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${completionRate}%` }} />
      </div>
      <div className="chart-bars">
        {[72, 58, 80, 66, 92, 77, 85].map((value, index) => (
          <div key={index} className="bar-wrap">
            <div className="bar" style={{ height: `${value}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
}
