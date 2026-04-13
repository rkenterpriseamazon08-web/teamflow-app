export default function MetricCard({ label, value, hint, accent }) {
  return (
    <div className={`card metric-card accent-${accent}`}>
      <p>{label}</p>
      <h3>{value}</h3>
      <span>{hint}</span>
    </div>
  );
}
