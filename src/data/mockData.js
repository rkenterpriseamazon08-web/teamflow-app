export const mockUsers = [
  { id: 'u1', name: 'Aarav Mehta', email: 'aarav@teamflow.ai', password: '1234', status: 'active', role: 'admin' },
  { id: 'u2', name: 'Riya Sharma', email: 'riya@teamflow.ai', password: '1234', status: 'active', role: 'user' },
  { id: 'u3', name: 'Kabir Rao', email: 'kabir@teamflow.ai', password: '1234', status: 'active', role: 'user' },
  { id: 'u4', name: 'Naina Kapoor', email: 'naina@teamflow.ai', password: '1234', status: 'inactive', role: 'user' },
];

export const mockTasks = [
  {
    id: 't1',
    title: 'Launch landing page redesign',
    description: 'Finalize premium dashboard hero and navigation micro-interactions.',
    severity: 'High',
    assignedTo: 'Riya Sharma',
 assignedBy: 'Aarav Mehta',
    subtasks: ['Audit current UI', 'Update design tokens', 'Push staging build'],
    deadline: '2026-04-16',
    status: 'Pending',
    proofLink: '',
    createdAt: '2026-04-13T08:00:00.000Z',
  },
  {
    id: 't2',
    title: 'Prepare investor metrics summary',
    description: 'Compile weekly growth metrics and activation funnel insights.',
    severity: 'Medium',
    assignedTo: 'Kabir Rao',
    assignedBy: 'Aarav Mehta',
     subtasks: ['Collect analytics', 'Draft summary deck'],
    deadline: '2026-04-15',
    status: 'Completed',
    proofLink: 'https://docs.example.com/proof',
    createdAt: '2026-04-12T10:30:00.000Z',
  },
  {
    id: 't3',
    title: 'QA collaboration workspace',
    description: 'Test chat threads, unread counters, and task assignment flow.',
    severity: 'Low',
    assignedTo: 'Aarav Mehta',
    assignedBy: 'Riya Sharma',
    subtasks: ['Test mobile nav', 'Check notification panel'],
    deadline: '2026-04-17',
    status: 'Pending',
    proofLink: '',
   createdAt: '2026-04-13T12:15:00.000Z',
  },
];

export const mockNotifications = [
  {
    id: 'n1',
    title: 'New task assigned',
    message: 'Launch landing page redesign was assigned to Riya Sharma.',
    type: 'assignment',
    read: false,
    createdAt: '2026-04-13T11:45:00.000Z',
  },
  {
    id: 'n2',
    title: 'Deadline approaching',
    message: 'Prepare investor metrics summary is due tomorrow.',
    type: 'reminder',
    read: true,
    createdAt: '2026-04-13T09:10:00.000Z',
  },
];

export const mockGroups = [
  { id: 'g1', name: 'Product Squad', members: ['Aarav Mehta', 'Riya Sharma', 'Kabir Rao'] },
  { id: 'g2', name: 'Growth Ops', members: ['Aarav Mehta', 'Kabir Rao'] },
];

export const mockChats = {
  direct: [  
   {
      id: 'c1',
      name: 'Riya Sharma',
      messages: [
        { id: 'm1', sender: 'Riya Sharma', text: 'Can you review the new task board before lunch?', timestamp: '10:20 AM' },
        { id: 'm2', sender: 'You', text: 'Yes, I will review it and share notes.', timestamp: '10:21 AM' },
      ],
    },
  ],
  groups: [
    {
      id: 'gc1',
      groupName: 'Product Squad',
      members: ['Aarav Mehta', 'Riya Sharma', 'Kabir Rao'],
      messages: [
        { id: 'gm1', sender: 'Kabir Rao', text: 'Analytics summary is ready for the dashboard.', timestamp: '09:45 AM' },
        { id: 'gm2', sender: 'Aarav Mehta', text: 'Great. Add it to the investor workspace too.', timestamp: '09:47 AM' },
      ],
    },
  ],
};
