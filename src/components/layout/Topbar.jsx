import { LogOut, Search, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getInitials } from '../../utils/helpers';

export default function Topbar() {
  const { user, logout } = useAuth();

  return (
    <header className="topbar">
      <div className="topbar-copy">
        <p className="eyebrow">Premium workspace</p>
        <h2>Welcome back, {user?.name?.split(' ')[0]}</h2>
      </div>

      <div className="topbar-actions">
        <div className="search-box">
          <Search size={16} />
          <input placeholder="Search tasks, groups, people..." />
        </div>

        <div className="workspace-chip">
          <Sparkles size={14} />
          <span>Live workspace</span>
        </div>

        <div className="user-pill">
          <div className="avatar">{getInitials(user?.name)}</div>
          <div>
            <strong>{user?.name}</strong>
            <span>{user?.role}</span>
          </div>
        </div>

        <button className="icon-btn" onClick={logout} title="Logout" type="button">
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
