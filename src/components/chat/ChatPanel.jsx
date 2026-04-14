export default function ChatPanel({ title, messages, draft, setDraft, onSend }) {
  return (
    <div className="card chat-panel">
      <div className="panel-glow" />

      <div className="panel-header chat-header">
        <div>
          <p className="eyebrow">Conversation</p>
          <h3>{title}</h3>
        </div>

        <div className="chat-status-pill">
          <span className="dot" />
          <span>Active now</span>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message-bubble ${message.sender === 'You' ? 'mine' : ''}`}
          >
            <strong>{message.sender}</strong>
            <p>{message.text}</p>
            <span>{message.timestamp}</span>
          </div>
        ))}
      </div>

      <form className="chat-compose" onSubmit={onSend}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write a message..."
        />
        <button className="primary-btn" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
