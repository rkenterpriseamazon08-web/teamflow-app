export default function MetricCard({ label, value, hint, accent }) {
  return (
    <div className={`card metric-card accent-${accent}`}>
      <div className="panel-glow" />
      <div className="metric-card-inner">
        <p className="metric-label">{label}</p>
        <h3>{value}</h3>
        <span className="metric-hint">{hint}</span>
      </div>
    </div>
  );
}
