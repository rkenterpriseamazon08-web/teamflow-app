import { useState } from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Unable to sign in.');
    } finally {
      setLoading(false);
    }
  };

 return (
    <div className="login-page">
      <div className="login-backdrop" />
      <section className="login-hero">
        <div className="hero-badge">Independent collaboration platform</div>
        <h1>Run tasks, chats, groups, and execution visibility in one premium workspace.</h1>
        <p>
          Designed for fast-moving teams that need assignment clarity, real-time conversations,
          notification workflows, and dashboard-level visibility without the clutter.
        </p>

        <div className="hero-points">
          <div className="mini-card"><Sparkles size={18} /> Premium SaaS dashboard experience</div>
          <div className="mini-card"><Workflow size={18} /> Tasks, groups, chat, and analytics together</div>
          <div className="mini-card"><ShieldCheck size={18} /> Google Sheets login + Firebase-ready architecture</div>
        </div>
        </section>

      <section className="login-panel card">
        <div>
          <p className="eyebrow">Welcome back</p>
          <h2>Sign in to your workspace</h2>
          <span className="muted-text">Use your credentials from Google Sheets. Mock login works too.</span>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="full-span">
            Email
            <input
              type="email"
              placeholder="aarav@teamflow.ai"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>

          <label className="full-span">
            Password
            <input
              type="password" 
             placeholder="Enter password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>

          {error && <div className="error-box full-span">{error}</div>}

          <button className="primary-btn full-span" disabled={loading}>
            {loading ? 'Signing in...' : <>Enter Workspace <ArrowRight size={16} /></>}
          </button>
        </form>

        <div className="demo-tip">
          <strong>Mock login:</strong> aarav@teamflow.ai / 1234 or riya@teamflow.ai / 1234
        </div>
      </section>
    </div>
  );
}
