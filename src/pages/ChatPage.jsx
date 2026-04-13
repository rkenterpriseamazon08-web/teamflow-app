import { useMemo, useState } from 'react';
import ChatPanel from '../components/chat/ChatPanel';
import { getChatSeedData } from '../services/chatService';

export default function ChatPage() {
  const seed = useMemo(() => getChatSeedData(), []);
  const [chatMode, setChatMode] = useState('direct');
  const [selectedId, setSelectedId] = useState(seed.direct[0].id);
  const [draft, setDraft] = useState('');
  const [localData, setLocalData] = useState(seed);

  const list = localData[chatMode];
  const selected = list.find((item) => item.id === selectedId) || list[0];

  const handleSwitch = (mode, id) => {
    setChatMode(mode);
    setSelectedId(id);
  };

  const handleSend = (event) => {
    event.preventDefault();
    if (!draft.trim()) return;
    
    const key = chatMode;
    setLocalData((prev) => ({
      ...prev,
      [key]: prev[key].map((chat) =>
        chat.id === selected.id
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                { id: crypto.randomUUID(), sender: 'You', text: draft, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
              ],
            }
          : chat
      ),
    }));
    setDraft('');
  };

  return (
    <div className="chat-layout">
      <aside className="card conversation-list">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Real-time chat</p>
            <h3>Messages</h3>
          </div>
           </div>

        <div className="switch-row">
          <button className={`secondary-btn ${chatMode === 'direct' ? 'active-filter' : ''}`} onClick={() => handleSwitch('direct', localData.direct[0].id)}>1-to-1</button>
          <button className={`secondary-btn ${chatMode === 'groups' ? 'active-filter' : ''}`} onClick={() => handleSwitch('groups', localData.groups[0].id)}>Groups</button>
        </div>

        <div className="stack-list">
          {list.map((item) => (
            <button
              key={item.id}
              className={`conversation-item ${selected?.id === item.id ? 'selected' : ''}`}
              onClick={() => setSelectedId(item.id)}
            >
              <strong>{item.name || item.groupName}</strong>
              <span>{item.messages[item.messages.length - 1]?.text}</span>
            </button>
          ))}
           </div>
      </aside>

      <ChatPanel
        title={selected?.name || selected?.groupName}
        messages={selected?.messages || []}
        draft={draft}
        setDraft={setDraft}
        onSend={handleSend}
      />
    </div>
  );
}
    
