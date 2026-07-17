import { useState } from 'react';
import { useAuth } from '../../hooks/AuthContext';
import { AdminProjects, AdminExperiences, AdminEducation, AdminHobbies, AdminAchievements } from './AdminEntities';
import { FiLogOut, FiBriefcase, FiBook, FiAward, FiHeart, FiLayers, FiLock, FiMail, FiEye, FiEyeOff, FiShield } from 'react-icons/fi';

/* ─── Spinner ─────────────────────────────────────────────────────────────── */
function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

/* ─── Login Page ──────────────────────────────────────────────────────────── */
function LoginPage({ onLogin }) {
  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [showPass, setShowPass]       = useState(false);
  const [error, setError]             = useState('');
  const [loading, setLoading]         = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: err } = await onLogin(email, password);
    if (err) { setError(err.message); setLoading(false); }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient blobs */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
      }}>
        <div style={{
          position: 'absolute', top: '-8rem', right: '-8rem',
          width: '28rem', height: '28rem', borderRadius: '9999px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-8rem', left: '-8rem',
          width: '28rem', height: '28rem', borderRadius: '9999px',
          background: 'radial-gradient(circle, rgba(217,70,239,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
      </div>

      {/* Card */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: '400px',
      }}>
        {/* Logo mark */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '56px', height: '56px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #6366f1, #d946ef)',
            boxShadow: '0 8px 32px rgba(99,102,241,0.35)',
            marginBottom: '1rem',
          }}>
            <FiShield size={24} color="#fff" />
          </div>
          <h1 style={{
            fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #6366f1, #d946ef)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', marginBottom: '0.375rem',
          }}>Admin Portal</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--tw-color-surface-500, #6b7280)' }}>
            Sign in to manage your portfolio
          </p>
        </div>

        {/* Form card */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          {error && (
            <div style={{
              marginBottom: '1.25rem', padding: '0.75rem 1rem', borderRadius: '12px',
              background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
              color: '#ef4444', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <span>⚠</span> {error}
            </div>
          )}

          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300" style={{ marginBottom: '0.375rem' }}>
                Email address
              </label>
              <div style={{ position: 'relative' }}>
                <FiMail size={15} style={{
                  position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)',
                  color: '#9ca3af', pointerEvents: 'none',
                }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="input-field"
                  style={{ paddingLeft: '2.5rem' }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300" style={{ marginBottom: '0.375rem' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <FiLock size={15} style={{
                  position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)',
                  color: '#9ca3af', pointerEvents: 'none',
                }} />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="input-field"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.75rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  style={{
                    position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 0,
                    display: 'flex', alignItems: 'center',
                  }}
                >
                  {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                width: '100%', justifyContent: 'center', marginTop: '0.25rem',
                opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? <><Spinner /> Signing in…</> : <><FiLock size={15} /> Sign In</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ─── Tab definition (outside component to avoid re-creation) ─────────────── */
const TABS = [
  { id: 'projects',     label: 'Projects',     icon: FiLayers },
  { id: 'experiences',  label: 'Experience',   icon: FiBriefcase },
  { id: 'education',    label: 'Education',    icon: FiBook },
  { id: 'achievements', label: 'Achievements', icon: FiAward },
  { id: 'hobbies',      label: 'Hobbies',      icon: FiHeart },
];

/* ─── Dashboard ───────────────────────────────────────────────────────────── */
export default function AdminDashboard() {
  const { user, signIn, signOut } = useAuth();
  const [activeTab, setActiveTab]  = useState('projects');

  if (!user) return <LoginPage onLogin={signIn} />;

  return (
    <div style={{ minHeight: '100vh', paddingTop: '4.5rem', position: 'relative' }}>
      {/* Subtle background */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '50vw', height: '50vh',
          background: 'radial-gradient(circle at top right, rgba(99,102,241,0.06) 0%, transparent 60%)',
        }} />
      </div>

      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: '1100px', margin: '0 auto',
        padding: '2.5rem 1.5rem 4rem',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem',
        }}>
          <div>
            <h1 style={{
              fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #6366f1, #d946ef)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              lineHeight: 1.1, marginBottom: '0.375rem',
            }}>
              Admin Dashboard
            </h1>
            <p className="text-surface-500 dark:text-surface-400" style={{ fontSize: '0.875rem' }}>
              Signed in as <strong className="text-surface-700 dark:text-surface-200">{user.email}</strong>
            </p>
          </div>
          <button
            onClick={signOut}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.5rem 1rem', borderRadius: '10px',
              fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
              background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
              color: '#ef4444', transition: 'all 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.14)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
          >
            <FiLogOut size={14} />
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', gap: '0.5rem', flexWrap: 'wrap',
          marginBottom: '1.5rem',
        }}>
          {TABS.map(({ id, label, icon: Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.55rem 1.1rem', borderRadius: '10px',
                  fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  background: active
                    ? 'linear-gradient(135deg, #6366f1, #818cf8)'
                    : 'transparent',
                  color: active ? '#fff' : undefined,
                  border: active ? '1px solid transparent' : '1px solid rgba(99,102,241,0.2)',
                  boxShadow: active ? '0 4px 14px rgba(99,102,241,0.3)' : 'none',
                }}
                className={active ? '' : 'text-surface-600 dark:text-surface-400'}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.background = 'rgba(99,102,241,0.08)';
                    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)';
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)';
                  }
                }}
              >
                <Icon size={14} />
                {label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          {activeTab === 'projects'     && <AdminProjects />}
          {activeTab === 'experiences'  && <AdminExperiences />}
          {activeTab === 'education'    && <AdminEducation />}
          {activeTab === 'achievements' && <AdminAchievements />}
          {activeTab === 'hobbies'      && <AdminHobbies />}
        </div>
      </div>
    </div>
  );
}
