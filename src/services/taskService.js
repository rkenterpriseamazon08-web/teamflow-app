import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { mockTasks, mockNotifications } from '../data/mockData';
import { db, isFirebaseReady } from './firebase';

let inMemoryTasks = [...mockTasks];
let inMemoryNotifications = [...mockNotifications];

export function subscribeToTasks(callback) {
  if (!isFirebaseReady) {
    callback(inMemoryTasks);
    return () => {};
  }

  const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));

  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));
    callback(tasks);
  });
}

export async function createTask(task) {
  const payload = {
    ...task,
    createdAt: new Date().toISOString(),
  };

  if (!isFirebaseReady) {
    const newTask = {
      id: crypto.randomUUID(),
      ...payload,
    };

    inMemoryTasks = [newTask, ...inMemoryTasks];
    inMemoryNotifications = [
      {
        id: crypto.randomUUID(),
        title: 'New task assigned',
        message: `${task.title} was assigned to ${task.assignedTo}.`,
        type: 'assignment',
        read: false,
        createdAt: new Date().toISOString(),
      },
      ...inMemoryNotifications,
    ];

    return newTask;
  }

  const ref = await addDoc(collection(db, 'tasks'), {
    ...task,
    createdAt: serverTimestamp(),
  });

  await addDoc(collection(db, 'notifications'), {
    title: 'New task assigned',
    message: `${task.title} was assigned to ${task.assignedTo}.`,
    type: 'assignment',
    read: false,
    createdAt: serverTimestamp(),
  });

  return {
    id: ref.id,
    ...payload,
  };
}

export async function updateTaskStatus(taskId, status, proofLink = '') {
  if (!isFirebaseReady) {
    inMemoryTasks = inMemoryTasks.map((task) =>
      task.id === taskId ? { ...task, status, proofLink } : task
    );
    return;
  }

  await updateDoc(doc(db, 'tasks', taskId), {
    status,
    proofLink,
  });
}

export function getInMemoryNotifications() {
  return inMemoryNotifications;
}
