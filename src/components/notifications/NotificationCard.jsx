import { BellRing, Clock3 } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

export default function NotificationCard({ item }) {
  return (
    <div className={`card notification-card ${item.read ? '' : 'unread'}`}>
      <div className="notification-icon">
        {item.type === 'reminder' ? <Clock3 size={18} /> : <BellRing size={18} />}
      </div>
      <div>
        <div className="notification-topline">
          <h3>{item.title}</h3>
          {!item.read && <span className="dot" />}
        </div>
        <p>{item.message}</p>
        <span>{formatDate(item.createdAt)}</span>
      </div>
    </div>
  );
}
