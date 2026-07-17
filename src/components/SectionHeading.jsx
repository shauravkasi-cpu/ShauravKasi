export default function SectionHeading({ title, subtitle, align = 'center' }) {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-surface-900 dark:text-surface-50">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-surface-500 dark:text-surface-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />
    </div>
  );
}
