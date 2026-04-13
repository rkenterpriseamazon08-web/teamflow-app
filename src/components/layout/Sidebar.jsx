import { Bell, Boxes, LayoutDashboard, MessagesSquare, SquareCheckBig } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/tasks', label: 'Tasks', icon: SquareCheckBig },
  { to: '/chat', label: 'Chat', icon: MessagesSquare },
  { to: '/groups', label: 'Groups', icon: Boxes },
  { to: '/notifications', label: 'Notifications', icon: Bell },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div>
        <div className="brand-mark">TF</div>
        <div className="brand-copy">
          <h1>TeamFlow Hub</h1>
          <p>Collaboration workspace</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer card subtle-card">
        <p className="eyebrow">Upgrade ready</p>
        <h3>Future-ready foundation</h3>
        <span>Prepared for uploads, voice notes, AI suggestions, and FCM reminders.</span>
      </div>
    </aside>
  );
}
