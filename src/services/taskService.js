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
    const tasks = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
    callback(tasks);
  });
}
export async function createTask(task) {
  const payload = {
    ...task,
    createdAt: new Date().toISOString(),
  };

  if (!isFirebaseReady) {
    const newTask = { id: crypto.randomUUID(), ...payload };
    inMemoryTasks = [newTask, ...inMemoryTasks];
