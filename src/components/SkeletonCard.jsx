export default function SkeletonCard({ lines = 3 }) {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="skeleton h-5 w-3/4" />
      <div className="skeleton h-4 w-1/2" />
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="skeleton h-3"
            style={{ width: `${85 - i * 15}%` }}
          />
        ))}
      </div>
      <div className="flex gap-2 pt-2">
        <div className="skeleton h-6 w-16 rounded-full" />
        <div className="skeleton h-6 w-20 rounded-full" />
        <div className="skeleton h-6 w-14 rounded-full" />
      </div>
    </div>
  );
}
