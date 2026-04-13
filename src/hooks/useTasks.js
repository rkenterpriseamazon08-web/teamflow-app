import { useEffect, useMemo, useState } from 'react';
import { createTask, subscribeToTasks, updateTaskStatus } from '../services/taskService';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToTasks((data) => {
      setTasks(data);
      setLoading(false);
    });

    return () => unsubscribe?.();
  }, []);

  const metrics = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.status === 'Completed').length;
    const pending = total - completed;
    const assignedToday = tasks.filter((task) => new Date(task.createdAt).toDateString() === new Date().toDateString()).length;
    const completionRate = total ? Math.round((completed / total) * 100) : 0;
 return { total, completed, pending, assignedToday, completionRate };
  }, [tasks]);

  return {
    tasks,
    loading,
    metrics,
    createTask,
    updateTaskStatus,
  };
}
