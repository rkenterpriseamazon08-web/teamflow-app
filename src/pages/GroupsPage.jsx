import { useState } from 'react';
import { Plus } from 'lucide-react';
import GroupFormModal from '../components/groups/GroupFormModal';
import { mockGroups } from '../data/mockData';

export default function GroupsPage() {
  const [groups, setGroups] = useState(mockGroups);
  const [open, setOpen] = useState(false);

  return (
    <div className="page-grid">
      <div className="page-toolbar card">
        <div>
          <p className="eyebrow">Group management</p>
          <h1>Create focused workspaces for teams and projects.</h1>
        </div>
        <button className="primary-btn" onClick={() => setOpen(true)}>
          <Plus size={16} /> New Group
        </button>
          </div>

      <div className="group-grid">
        {groups.map((group) => (
          <div className="card group-card" key={group.id}>
            <p className="eyebrow">Workspace</p>
            <h3>{group.name}</h3>
            <div className="member-stack">
              {group.members.map((member) => (
                <span className="member-chip selected" key={member}>{member}</span>
              ))}
            </div>
            <div className="group-footer">
              <span>{group.members.length} members</span>
              <button className="secondary-btn">Open Chat</button>
            </div>
          </div>
        ))}
      </div>

      <GroupFormModal open={open} onClose={() => setOpen(false)} onCreate={(group) => setGroups((prev) => [group, ...prev])} />
    </div>
  );
}
