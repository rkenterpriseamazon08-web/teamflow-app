import { useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import TaskCard from '../components/tasks/TaskCard';
import TaskFormModal from '../components/tasks/TaskFormModal';
import { useTasks } from '../hooks/useTasks';

export default function TasksPage() {
  const { tasks, createTask, updateTaskStatus } = useTasks();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All');
  const [open, setOpen] = useState(false);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesQuery = [task.title, task.description, task.assignedTo].join(' ').toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === 'All' || task.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [tasks, query, status]);
  
  const handleToggle = async (task) => {
    const nextStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    const proofLink = nextStatus === 'Completed' && !task.proofLink ? 'https://proof-link.example.com' : task.proofLink;
    await updateTaskStatus(task.id, nextStatus, proofLink);
  };

  return (
    <div className="page-grid">
      <div className="page-toolbar card">
        <div>
          <p className="eyebrow">Task manager</p>
          <h1>Assign, track, and complete work with structure.</h1>
        </div>
        <button className="primary-btn" onClick={() => setOpen(true)}>
          <Plus size={16} /> New Task
        </button>
      </div>

      <div className="filters-row card">
        <div className="search-box wide">
           <Search size={16} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title, assignee, or description..." />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>All</option>
          <option>Pending</option>
          <option>Completed</option>
        </select>
      </div>

      <div className="task-grid">
        {filteredTasks.length ? (
          filteredTasks.map((task) => <TaskCard key={task.id} task={task} onToggle={handleToggle} />)
        ) : (
          <div className="empty-state card">
            <h3>No tasks found</h3>
            <p>Try a different filter or create a new task.</p>
          </div>
        )}
      </div>

      <TaskFormModal open={open} onClose={() => setOpen(false)} onCreate={createTask} />
    </div>
  );
}

