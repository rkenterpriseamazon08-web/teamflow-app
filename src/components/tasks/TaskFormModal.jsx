import { useState } from 'react';
import { mockUsers } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

const initialState = {
  title: '',
  description: '',
  severity: 'Medium',
  assignedTo: '',
  deadline: '',
  subtasks: '',
};

export default function TaskFormModal({ open, onClose, onCreate }) {
  const { user } = useAuth();
  const [form, setForm] = useState(initialState);
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const visibleUsers = user?.role === 'admin'
    ? mockUsers.filter((item) => item.status === 'active')
    : mockUsers.filter((item) => item.status === 'active' && item.email !== user.email);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

setSaving(false);
    setForm(initialState);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal card" onClick={(e) => e.stopPropagation()}>
        <div className="panel-header">
          <div>
            <p className="eyebrow">Create task</p>
            <h3>Assign work with clarity</h3>
          </div>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label>
            Task title
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </label>
          <label>
            Severity
            <select value={form.severity} onChange={(e) => setForm({ ...form, severity: e.target.value })}>
              <option>Low</option>
               <option>Medium</option>
              <option>High</option>
            </select>
          </label>
          <label className="full-span">
            Description
            <textarea rows="4" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          </label>
          <label>
            Assign to
            <select value={form.assignedTo} onChange={(e) => setForm({ ...form, assignedTo: e.target.value })} required>
              <option value="">Select teammate</option>
              {visibleUsers.map((item) => (
                <option key={item.id} value={item.name}>{item.name}</option>
              ))}
            </select>
          </label>
          <label>
            Deadline
            <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} required />
          </label>
          <label className="full-span">
            Subtasks (comma separated)
            <input value={form.subtasks} onChange={(e) => setForm({ ...form, subtasks: e.target.value })} placeholder="Research, design, review" />
          </label>
           <div className="modal-actions full-span">
            <button type="button" className="secondary-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary-btn" disabled={saving}>{saving ? 'Creating...' : 'Create Task'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
