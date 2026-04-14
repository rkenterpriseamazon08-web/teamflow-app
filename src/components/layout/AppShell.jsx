import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppShell() {
  return (
    <div className="app-shell">
      <div className="app-shell-bg" />
      <Sidebar />

      <div className="app-main">
        <Topbar />
        <main className="page-content page-shell">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
