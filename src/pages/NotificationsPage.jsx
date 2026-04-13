import NotificationCard from '../components/notifications/NotificationCard';
import { getInMemoryNotifications } from '../services/taskService';

export default function NotificationsPage() {
  const notifications = getInMemoryNotifications();

  return (
    <div className="page-grid">
      <div className="page-toolbar card">
        <div>
          <p className="eyebrow">Notifications</p>
          <h1>Stay ahead of assignments, deadlines, and updates.</h1>
        </div>
      </div>

      <div className="stack-list">
        {notifications.map((item) => (
          <NotificationCard key={item.id} item={item} />
        ))}
      </div>
     </div>
  );
}
