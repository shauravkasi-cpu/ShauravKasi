export default function TagPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`tag-pill cursor-pointer ${active ? 'active' : ''}`}
    >
      {label}
    </button>
  );
}
