import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { FiPlus, FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import {
  FaChess, FaCamera, FaMountain, FaCode, FaBook, FaMusic,
  FaGamepad, FaPaintBrush, FaRunning, FaPlane, FaDumbbell,
  FaBicycle, FaFish, FaGuitar, FaFlask, FaLeaf, FaPaw,
  FaBrush, FaFootballBall, FaBasketballBall, FaTableTennis,
  FaCoffee, FaRocket, FaFilm, FaUtensils,
} from 'react-icons/fa';
import { FiCode, FiGlobe, FiHeadphones, FiPenTool } from 'react-icons/fi';

/* ─── Icon catalogue ──────────────────────────────────────────────────────── */
const ICON_OPTIONS = [
  { name: 'FaChess',          label: 'Chess',        Icon: FaChess },
  { name: 'FaCamera',         label: 'Photography',  Icon: FaCamera },
  { name: 'FaMountain',       label: 'Hiking',       Icon: FaMountain },
  { name: 'FaCode',           label: 'Coding',       Icon: FaCode },
  { name: 'FaBook',           label: 'Reading',      Icon: FaBook },
  { name: 'FaMusic',          label: 'Music',        Icon: FaMusic },
  { name: 'FaGamepad',        label: 'Gaming',       Icon: FaGamepad },
  { name: 'FaPaintBrush',     label: 'Painting',     Icon: FaPaintBrush },
  { name: 'FaRunning',        label: 'Running',      Icon: FaRunning },
  { name: 'FaPlane',          label: 'Travel',       Icon: FaPlane },
  { name: 'FaDumbbell',       label: 'Gym',          Icon: FaDumbbell },
  { name: 'FaBicycle',        label: 'Cycling',      Icon: FaBicycle },
  { name: 'FaFish',           label: 'Fishing',      Icon: FaFish },
  { name: 'FaGuitar',         label: 'Guitar',       Icon: FaGuitar },
  { name: 'FaFlask',          label: 'Science',      Icon: FaFlask },
  { name: 'FaLeaf',           label: 'Gardening',    Icon: FaLeaf },
  { name: 'FaPaw',            label: 'Pets',         Icon: FaPaw },
  { name: 'FaBrush',          label: 'Art',          Icon: FaBrush },
  { name: 'FaFootballBall',   label: 'Football',     Icon: FaFootballBall },
  { name: 'FaBasketballBall', label: 'Basketball',   Icon: FaBasketballBall },
  { name: 'FaTableTennis',    label: 'Ping Pong',    Icon: FaTableTennis },
  { name: 'FaCoffee',         label: 'Coffee',       Icon: FaCoffee },
  { name: 'FaRocket',         label: 'Space',        Icon: FaRocket },
  { name: 'FaFilm',           label: 'Movies',       Icon: FaFilm },
  { name: 'FaUtensils',       label: 'Cooking',      Icon: FaUtensils },
  { name: 'FiCode',           label: 'Dev',          Icon: FiCode },
  { name: 'FiGlobe',          label: 'Web',          Icon: FiGlobe },
  { name: 'FiHeadphones',     label: 'Podcast',      Icon: FiHeadphones },
  { name: 'FiPenTool',        label: 'Design',       Icon: FiPenTool },
];

/* ─── Spinner ─────────────────────────────────────────────────────────────── */
function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

/* ─── Toggle Switch ───────────────────────────────────────────────────────── */
function Toggle({ checked, onChange }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer', userSelect: 'none' }}>
      <div style={{ position: 'relative' }}>
        <input type="checkbox" checked={checked || false} onChange={onChange} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
        <div style={{
          width: '44px', height: '24px', borderRadius: '999px',
          background: checked ? 'linear-gradient(135deg, #6366f1, #818cf8)' : '#d1d5db',
          transition: 'background 0.2s',
          boxShadow: checked ? '0 2px 8px rgba(99,102,241,0.35)' : 'none',
        }} />
        <div style={{
          position: 'absolute', top: '2px', left: checked ? '22px' : '2px',
          width: '20px', height: '20px', borderRadius: '50%',
          background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
          transition: 'left 0.2s',
        }} />
      </div>
      <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>{checked ? 'Yes' : 'No'}</span>
    </label>
  );
}

/* ─── Icon Picker ─────────────────────────────────────────────────────────── */
function IconPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = ICON_OPTIONS.find(o => o.name === value);
  const SelectedIcon = selected ? selected.Icon : null;

  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.625rem',
          padding: '0.65rem 0.875rem', borderRadius: '12px', cursor: 'pointer',
          border: open ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(0,0,0,0.1)',
          width: '100%', fontSize: '0.875rem', fontWeight: 500,
          boxShadow: open ? '0 0 0 3px rgba(99,102,241,0.12)' : 'none',
          transition: 'all 0.15s', textAlign: 'left',
        }}
        className="bg-white dark:bg-surface-800 text-surface-800 dark:text-surface-100"
      >
        {SelectedIcon ? (
          <>
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '30px', height: '30px', borderRadius: '8px', flexShrink: 0,
              background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(217,70,239,0.1))',
            }}>
              <SelectedIcon size={16} color="#6366f1" />
            </span>
            <span style={{ flex: 1 }}>{selected.label}</span>
            <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>{value}</span>
          </>
        ) : (
          <span style={{ color: '#9ca3af', flex: 1 }}>— Select an icon —</span>
        )}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          style={{ flexShrink: 0, transition: 'transform 0.15s', transform: open ? 'rotate(180deg)' : 'none' }}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, zIndex: 200,
            borderRadius: '16px', padding: '0.875rem',
            border: '1px solid rgba(99,102,241,0.15)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.14)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))',
            gap: '0.375rem',
            maxHeight: '280px', overflowY: 'auto',
          }}
          className="bg-white dark:bg-surface-800"
        >
          {ICON_OPTIONS.map(({ name, label, Icon }) => {
            const isSelected = value === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => { onChange(name); setOpen(false); }}
                title={label}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: '0.3rem', padding: '0.625rem 0.25rem', borderRadius: '10px', cursor: 'pointer',
                  border: isSelected ? '1.5px solid #6366f1' : '1px solid transparent',
                  background: isSelected
                    ? 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(217,70,239,0.08))'
                    : 'transparent',
                  transition: 'all 0.12s',
                }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(99,102,241,0.06)'; }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
              >
                <Icon size={20} color={isSelected ? '#6366f1' : '#9ca3af'} />
                <span style={{
                  fontSize: '0.65rem', fontWeight: 600,
                  color: isSelected ? '#6366f1' : '#9ca3af',
                  textAlign: 'center', lineHeight: 1.2,
                  overflow: 'hidden', textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap', maxWidth: '64px',
                }}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── Field Input ─────────────────────────────────────────────────────────── */
function FieldInput({ col, value, onChange }) {
  if (col.type === 'textarea') {
    return (
      <textarea
        required={col.required}
        value={value || ''}
        onChange={onChange}
        placeholder={col.placeholder || ''}
        className="input-field"
        rows={3}
        style={{ resize: 'vertical' }}
      />
    );
  }
  if (col.type === 'checkbox') {
    return <Toggle checked={value} onChange={onChange} />;
  }
  return (
    <input
      type={col.type === 'array' ? 'text' : (col.type || 'text')}
      required={col.required}
      value={col.type === 'array' ? (value || []).join(', ') : value || ''}
      onChange={onChange}
      placeholder={col.placeholder || (col.type === 'array' ? 'Item 1, Item 2, ...' : '')}
      className="input-field"
    />
  );
}

/* ─── Item Row ────────────────────────────────────────────────────────────── */
function ItemRow({ item, renderItem, onEdit, onDelete }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem 1.25rem', borderRadius: '14px', gap: '1rem',
        border: hover ? '1px solid rgba(99,102,241,0.25)' : '1px solid rgba(0,0,0,0.07)',
        background: hover ? 'rgba(99,102,241,0.04)' : 'rgba(255,255,255,0.5)',
        transition: 'all 0.15s',
        boxShadow: hover ? '0 2px 12px rgba(99,102,241,0.08)' : 'none',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>{renderItem(item)}</div>
      <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0, opacity: hover ? 1 : 0, transition: 'opacity 0.15s' }}>
        <button
          onClick={() => onEdit(item)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
            padding: '0.4rem 0.75rem', borderRadius: '8px', cursor: 'pointer',
            fontSize: '0.78rem', fontWeight: 600, border: '1px solid rgba(99,102,241,0.2)',
            background: 'rgba(99,102,241,0.08)', color: '#6366f1', transition: 'all 0.12s',
          }}
        >
          <FiEdit2 size={12} /> Edit
        </button>
        <button
          onClick={() => onDelete(item.id)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
            padding: '0.4rem 0.75rem', borderRadius: '8px', cursor: 'pointer',
            fontSize: '0.78rem', fontWeight: 600, border: '1px solid rgba(239,68,68,0.2)',
            background: 'rgba(239,68,68,0.08)', color: '#ef4444', transition: 'all 0.12s',
          }}
        >
          <FiTrash2 size={12} /> Delete
        </button>
      </div>
    </div>
  );
}

/* ─── Entity Manager ──────────────────────────────────────────────────────── */
function EntityManager({ title, tableName, columns, renderItem }) {
  const [items, setItems]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [formData, setFormData]   = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId]       = useState(null);
  const [formOpen, setFormOpen]   = useState(false);
  const [saving, setSaving]       = useState(false);
  const [saveError, setSaveError] = useState('');

  const refetch = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(tableName).select('*').order('sort_order', { ascending: true });
    if (!error) setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { refetch(); }, [tableName]); // eslint-disable-line

  const handleChange = (e, col) => {
    let val = e.target.value;
    if (col.type === 'checkbox') val = e.target.checked;
    if (col.type === 'array')    val = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
    setFormData(p => ({ ...p, [col.name]: val }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setSaveError('');
    const payload = { ...formData };
    delete payload.id; delete payload.created_at;
    const { error } = isEditing
      ? await supabase.from(tableName).update(payload).eq('id', editId)
      : await supabase.from(tableName).insert([payload]);
    setSaving(false);
    if (error) { setSaveError(error.message); return; }
    setFormOpen(false); setIsEditing(false); setEditId(null); setFormData({});
    refetch();
  };

  const openEdit = (item) => { setFormData(item); setIsEditing(true); setEditId(item.id); setFormOpen(true); setSaveError(''); };
  const openAdd  = () => { setFormData({}); setIsEditing(false); setEditId(null); setFormOpen(true); setSaveError(''); };
  const cancel   = () => { setFormOpen(false); setIsEditing(false); setEditId(null); setFormData({}); setSaveError(''); };

  const onDelete = async (id) => {
    if (!confirm('Delete this item? This cannot be undone.')) return;
    await supabase.from(tableName).delete().eq('id', id);
    refetch();
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{title}</h2>
        {!formOpen && (
          <button onClick={openAdd} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', gap: '0.375rem' }}>
            <FiPlus size={14} /> Add New
          </button>
        )}
      </div>

      {formOpen && (
        <div style={{ marginBottom: '1.75rem', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(99,102,241,0.15)', background: 'rgba(99,102,241,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontWeight: 700, fontSize: '0.95rem' }}>
              {isEditing ? `Edit ${title.replace(/s$/, '')}` : `New ${title.replace(/s$/, '')}`}
            </h3>
            <button onClick={cancel} style={{ width: '28px', height: '28px', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.06)', border: 'none', color: '#6b7280' }}>
              <FiX size={14} />
            </button>
          </div>

          {saveError && (
            <div style={{ marginBottom: '1rem', padding: '0.7rem 1rem', borderRadius: '10px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444', fontSize: '0.85rem' }}>
              ⚠ {saveError}
            </div>
          )}

          <form onSubmit={onSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              {columns.map(col => (
                <div key={col.name} style={col.type === 'textarea' ? { gridColumn: '1 / -1' } : {}}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.375rem', color: '#4b5563' }}>
                    {col.label}
                    {col.required && <span style={{ color: '#6366f1', marginLeft: '3px' }}>*</span>}
                  </label>
                  <FieldInput
                    col={col}
                    value={col.type === 'array' ? (formData[col.name] || []) : formData[col.name]}
                    onChange={e => handleChange(e, col)}
                  />
                  {col.hint && <p style={{ marginTop: '0.3rem', fontSize: '0.75rem', color: '#9ca3af' }}>{col.hint}</p>}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.625rem' }}>
              <button type="submit" disabled={saving} className="btn-primary"
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem', opacity: saving ? 0.7 : 1, cursor: saving ? 'not-allowed' : 'pointer' }}>
                {saving ? <><Spinner /> Saving…</> : <><FiCheck size={14} /> {isEditing ? 'Save Changes' : 'Add Item'}</>}
              </button>
              <button type="button" onClick={cancel} className="btn-ghost" style={{ padding: '0.6rem 1rem', fontSize: '0.875rem' }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[1, 2, 3].map(i => <div key={i} className="skeleton" style={{ height: '68px', borderRadius: '14px' }} />)}
        </div>
      ) : items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#9ca3af' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📭</div>
          <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>No entries yet</p>
          <p style={{ fontSize: '0.85rem' }}>Click "Add New" to create your first {title.replace(/s$/, '').toLowerCase()}.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {items.map(item => (
            <ItemRow key={item.id} item={item} renderItem={renderItem} onEdit={openEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Entity Sections ─────────────────────────────────────────────────────── */

export function AdminProjects() {
  const cols = [
    { name: 'title',       label: 'Title',       required: true },
    { name: 'sort_order',  label: 'Sort Order',  type: 'number' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'tech_stack',  label: 'Tech Stack',  type: 'array', hint: 'Comma-separated — React, TypeScript, …' },
    { name: 'github_url',  label: 'GitHub URL',  placeholder: 'https://github.com/…' },
    { name: 'demo_url',    label: 'Demo URL',    placeholder: 'https://…' },
    { name: 'image_url',   label: 'Image URL',   placeholder: 'https://…' },
    { name: 'featured',    label: 'Featured',    type: 'checkbox' },
  ];
  return (
    <EntityManager title="Projects" tableName="projects" columns={cols} renderItem={item => (
      <div>
        <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.title}</p>
        {item.tech_stack?.length > 0 && <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '2px' }}>{item.tech_stack.slice(0, 5).join(' · ')}</p>}
      </div>
    )} />
  );
}

export function AdminExperiences() {
  const cols = [
    { name: 'title',       label: 'Job Title',   required: true },
    { name: 'company',     label: 'Company',     required: true },
    { name: 'start_date',  label: 'Start Date',  type: 'date', required: true },
    { name: 'end_date',    label: 'End Date',    type: 'date', hint: 'Leave empty if currently employed here' },
    { name: 'sort_order',  label: 'Sort Order',  type: 'number' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'tags',        label: 'Tags',        type: 'array', hint: 'Comma-separated — Python, AWS, …' },
  ];
  return (
    <EntityManager title="Experiences" tableName="experience" columns={cols} renderItem={item => (
      <div>
        <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.title}</p>
        <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '2px' }}>
          {item.company} · {item.start_date?.slice(0, 7)} – {item.end_date?.slice(0, 7) || 'Present'}
        </p>
      </div>
    )} />
  );
}

export function AdminEducation() {
  const cols = [
    { name: 'school',         label: 'School',         required: true },
    { name: 'degree',         label: 'Degree',         required: true },
    { name: 'field_of_study', label: 'Field of Study' },
    { name: 'start_date',     label: 'Start Date',     type: 'date', required: true },
    { name: 'end_date',       label: 'End Date',       type: 'date', hint: 'Leave empty if currently enrolled' },
    { name: 'grade',          label: 'Grade / GPA' },
    { name: 'sort_order',     label: 'Sort Order',     type: 'number' },
    { name: 'description',    label: 'Description',    type: 'textarea' },
  ];
  return (
    <EntityManager title="Education" tableName="education" columns={cols} renderItem={item => (
      <div>
        <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>
          {item.degree}{item.field_of_study ? ` in ${item.field_of_study}` : ''}
        </p>
        <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '2px' }}>
          {item.school}{item.grade ? ` · ${item.grade}` : ''}
        </p>
      </div>
    )} />
  );
}

export function AdminAchievements() {
  const cols = [
    { name: 'title',       label: 'Title',       required: true },
    { name: 'category',    label: 'Category',    required: true, hint: 'Publications · Competitions · Certifications' },
    { name: 'date',        label: 'Date',        type: 'date' },
    { name: 'link',        label: 'Link',        placeholder: 'https://…' },
    { name: 'sort_order',  label: 'Sort Order',  type: 'number' },
    { name: 'description', label: 'Description', type: 'textarea' },
  ];
  return (
    <EntityManager title="Achievements" tableName="achievements" columns={cols} renderItem={item => (
      <div>
        <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.title}</p>
        <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '2px' }}>
          {item.category}{item.date ? ` · ${item.date.slice(0, 7)}` : ''}
        </p>
      </div>
    )} />
  );
}

/* ─── AdminHobbies — custom form with visual icon picker ─────────────────── */
export function AdminHobbies() {
  const [items, setItems]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [formData, setFormData]   = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId]       = useState(null);
  const [formOpen, setFormOpen]   = useState(false);
  const [saving, setSaving]       = useState(false);
  const [saveError, setSaveError] = useState('');

  const refetch = async () => {
    setLoading(true);
    const { data } = await supabase.from('hobbies').select('*').order('sort_order', { ascending: true });
    setItems(data || []);
    setLoading(false);
  };
  useEffect(() => { refetch(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setSaveError('');
    const payload = { ...formData };
    delete payload.id; delete payload.created_at;
    const { error } = isEditing
      ? await supabase.from('hobbies').update(payload).eq('id', editId)
      : await supabase.from('hobbies').insert([payload]);
    setSaving(false);
    if (error) { setSaveError(error.message); return; }
    setFormOpen(false); setIsEditing(false); setEditId(null); setFormData({});
    refetch();
  };

  const openEdit = (item) => { setFormData(item); setIsEditing(true); setEditId(item.id); setFormOpen(true); setSaveError(''); };
  const openAdd  = () => { setFormData({}); setIsEditing(false); setEditId(null); setFormOpen(true); setSaveError(''); };
  const cancel   = () => { setFormOpen(false); setIsEditing(false); setEditId(null); setFormData({}); setSaveError(''); };
  const onDelete = async (id) => {
    if (!confirm('Delete this hobby?')) return;
    await supabase.from('hobbies').delete().eq('id', id);
    refetch();
  };

  const set = (key, val) => setFormData(p => ({ ...p, [key]: val }));

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Hobbies</h2>
        {!formOpen && (
          <button onClick={openAdd} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', gap: '0.375rem' }}>
            <FiPlus size={14} /> Add New
          </button>
        )}
      </div>

      {formOpen && (
        <div style={{ marginBottom: '1.75rem', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(99,102,241,0.15)', background: 'rgba(99,102,241,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontWeight: 700, fontSize: '0.95rem' }}>{isEditing ? 'Edit Hobby' : 'New Hobby'}</h3>
            <button onClick={cancel} style={{ width: '28px', height: '28px', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.06)', border: 'none', color: '#6b7280' }}>
              <FiX size={14} />
            </button>
          </div>

          {saveError && (
            <div style={{ marginBottom: '1rem', padding: '0.7rem 1rem', borderRadius: '10px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444', fontSize: '0.85rem' }}>
              ⚠ {saveError}
            </div>
          )}

          <form onSubmit={onSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.375rem', color: '#4b5563' }}>
                  Title <span style={{ color: '#6366f1' }}>*</span>
                </label>
                <input type="text" required value={formData.title || ''} onChange={e => set('title', e.target.value)} placeholder="e.g. Chess" className="input-field" />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.375rem', color: '#4b5563' }}>Sort Order</label>
                <input type="number" value={formData.sort_order || ''} onChange={e => set('sort_order', e.target.value)} placeholder="0" className="input-field" />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.375rem', color: '#4b5563' }}>Icon</label>
                <IconPicker value={formData.icon} onChange={v => set('icon', v)} />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.375rem', color: '#4b5563' }}>Description</label>
                <textarea value={formData.description || ''} onChange={e => set('description', e.target.value)} placeholder="A short description of this hobby…" className="input-field" rows={3} style={{ resize: 'vertical' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.625rem' }}>
              <button type="submit" disabled={saving} className="btn-primary"
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem', opacity: saving ? 0.7 : 1, cursor: saving ? 'not-allowed' : 'pointer' }}>
                {saving ? <><Spinner /> Saving…</> : <><FiCheck size={14} /> {isEditing ? 'Save Changes' : 'Add Hobby'}</>}
              </button>
              <button type="button" onClick={cancel} className="btn-ghost" style={{ padding: '0.6rem 1rem', fontSize: '0.875rem' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[1, 2, 3].map(i => <div key={i} className="skeleton" style={{ height: '68px', borderRadius: '14px' }} />)}
        </div>
      ) : items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#9ca3af' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎮</div>
          <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>No hobbies yet</p>
          <p style={{ fontSize: '0.85rem' }}>Click "Add New" to add your first hobby.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {items.map(item => {
            const opt = ICON_OPTIONS.find(o => o.name === item.icon);
            return (
              <ItemRow
                key={item.id}
                item={item}
                renderItem={it => (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {opt && (
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(217,70,239,0.08))',
                      }}>
                        <opt.Icon size={18} color="#6366f1" />
                      </div>
                    )}
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{it.title}</p>
                      {it.description && (
                        <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '400px' }}>
                          {it.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                onEdit={openEdit}
                onDelete={onDelete}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
