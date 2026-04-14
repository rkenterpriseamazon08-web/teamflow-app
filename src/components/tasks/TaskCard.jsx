import { CalendarClock, CheckCheck, ExternalLink } from 'lucide-react';
import { formatDate, isDueSoon } from '../../utils/helpers';

export default function TaskCard({ task, onToggle }) {
  const dueSoon = isDueSoon(task.deadline);

  return (
    <div className="card task-card">
      <div className="panel-glow" />

      <div className="task-head">
        <div className="task-title-wrap">
          <div className={`badge severity-${task.severity.toLowerCase()}`}>
            {task.severity}
          </div>
          <h3>{task.title}</h3>
        </div>

        <div className={`badge status-${task.status.toLowerCase()}`}>{task.status}</div>
      </div>

      <p className="muted-text task-description">{task.description}</p>

      <div className="task-meta-grid">
        <div className="task-meta-card">
          <span>Assigned to</span>
          <strong>{task.assignedTo}</strong>
        </div>

        <div className="task-meta-card">
          <span>Assigned by</span>
          <strong>{task.assignedBy}</strong>
        </div>
      </div>

      <div className="subtask-list">
        {task.subtasks?.map((subtask) => (
          <div key={subtask} className="subtask-row">
            <CheckCheck size={14} />
            <span>{subtask}</span>
          </div>
        ))}
      </div>

      <div className="task-footer">
        <div className={`deadline ${dueSoon ? 'urgent' : ''}`}>
          <CalendarClock size={14} />
          <span>{formatDate(task.deadline)}</span>
        </div>

        <div className="task-actions-inline">
          {task.proofLink && (
            <a
              href={task.proofLink}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Proof <ExternalLink size={14} />
            </a>
          )}

          <button className="secondary-btn" onClick={() => onToggle(task)} type="button">
            {task.status === 'Completed' ? 'Mark Pending' : 'Mark Complete'}
          </button>
        </div>
      </div>
    </div>
  );
}
