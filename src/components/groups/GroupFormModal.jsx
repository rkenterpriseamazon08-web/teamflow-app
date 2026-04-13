import { useState } from 'react';
import { mockUsers } from '../../data/mockData';

export default function GroupFormModal({ open, onClose, onCreate }) {
  const [name, setName] = useState('');
  const [members, setMembers] = useState([]);

  if (!open) return null;

  const toggleMember = (memberName) => {
    setMembers((prev) =>
      prev.includes(memberName)
        ? prev.filter((item) => item !== memberName)
        : [...prev, memberName]
    );
  };

  const handleCreate = (event) => {
    event.preventDefault();
    onCreate({
      id: crypto.randomUUID(),
      name,
      members,
    });
    setName('');
    setMembers([]);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal card" onClick={(e) => e.stopPropagation()}>
        <div className="panel-header">
          <div>
            <p className="eyebrow">Create group</p>
            <h3>Set up a team workspace</h3>
          </div>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>

        <form className="form-grid" onSubmit={handleCreate}>
          <label className="full-span">
            Group name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <div className="full-span">
            <span className="field-label">Members</span>
            <div className="member-selector">
              {mockUsers
                .filter((user) => user.status === 'active')
                .map((user) => (
                  <button
                    type="button"
                    key={user.id}
                    className={`member-chip ${members.includes(user.name) ? 'selected' : ''}`}
                    onClick={() => toggleMember(user.name)}
                  >
                    {user.name}
                  </button>
                ))}
            </div>
          </div>

          <div className="modal-actions full-span">
            <button type="button" className="secondary-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-btn">
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
