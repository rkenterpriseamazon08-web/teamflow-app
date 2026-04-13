import MetricCard from '../components/dashboard/MetricCard';
import ProgressPanel from '../components/dashboard/ProgressPanel';
import NotificationCard from '../components/notifications/NotificationCard';
import { useTasks } from '../hooks/useTasks';
import { getInMemoryNotifications } from '../services/taskService';

export default function DashboardPage() {
  const { tasks, metrics } = useTasks();
  const notifications = getInMemoryNotifications();

  return (
    <div className="page-grid">
      <section className="hero-panel card">
        <div>
          <p className="eyebrow">Team performance</p>
          <h1>Execution visibility that feels calm, clear, and premium.</h1>
          <p className="muted-text">
            Track assignments, monitor momentum, and keep teams aligned with one connected workspace.
          </p>
        </div>
        <div className="hero-actions">
          <div className="kpi-chip">Today: {metrics.assignedToday} assignments</div>
          <div className="kpi-chip">Completion: {metrics.completionRate}%</div>
        </div>
        </section>

      <section className="metrics-grid">
        <MetricCard label="Total tasks" value={metrics.total} hint="Across all active teams" accent="blue" />
        <MetricCard label="Completed" value={metrics.completed} hint="Closed this cycle" accent="green" />
        <MetricCard label="Pending" value={metrics.pending} hint="Needs follow-through" accent="amber" />
        <MetricCard label="Assigned today" value={metrics.assignedToday} hint="Fresh task load" accent="purple" />
      </section>

      <section className="dashboard-layout">
        <ProgressPanel completionRate={metrics.completionRate} />

        <div className="card">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Recent tasks</p>
              <h3>Latest work items</h3>
            </div>
          </div>

          <div className="stack-list">
            {tasks.slice(0, 4).map((task) => (
              <div key={task.id} className="list-row">
                <div>
                   <strong>{task.title}</strong>
                  <p>{task.assignedTo} • {task.severity}</p>
                </div>
                <span className={`badge status-${task.status.toLowerCase()}`}>{task.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dashboard-layout two-col">
        <div className="card">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Activity timeline</p>
              <h3>Recent workflow events</h3>
            </div>
          </div>
          
          <div className="timeline">
            {tasks.slice(0, 4).map((task) => (
              <div key={task.id} className="timeline-item">
                <div className="timeline-dot" />
                <div>
                  <strong>{task.title}</strong>
                  <p>{task.assignedBy} assigned this to {task.assignedTo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Notifications</p>
              <h3>Important reminders</h3>
            </div>
          </div>
          <div className="stack-list">
            {notifications.slice(0, 3).map((item) => <NotificationCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
