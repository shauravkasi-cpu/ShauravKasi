import { useMemo } from 'react';
import { useSupabase } from '../hooks/useSupabase';
import SectionHeading from '../components/SectionHeading';
import SkeletonCard from '../components/SkeletonCard';
import {
  FiAward,
  FiBookOpen,
  FiExternalLink,
  FiCode,
  FiTarget,
} from 'react-icons/fi';

const categoryIcons = {
  Publications: FiBookOpen,
  Competitions: FiTarget,
  Certifications: FiAward,
  'Open Source': FiCode,
};

const categoryColors = {
  Publications: 'from-blue-500 to-cyan-500',
  Competitions: 'from-amber-500 to-orange-500',
  Certifications: 'from-emerald-500 to-teal-500',
  'Open Source': 'from-violet-500 to-purple-500',
};

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

export default function Achievements() {
  const { data: achievements, loading, error } = useSupabase('achievements');

  // Group by category
  const grouped = useMemo(() => {
    const groups = {};
    achievements.forEach((a) => {
      const cat = a.category || 'General';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(a);
    });
    return groups;
  }, [achievements]);

  const categories = Object.keys(grouped);

  return (
    <div className="min-h-screen pt-24">
      <section className="section-container">
        <SectionHeading
          title="Achievements"
          subtitle="Competitions, publications, certifications, and open-source contributions."
        />

        {loading ? (
          <div className="max-w-4xl mx-auto space-y-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <div className="skeleton h-6 w-40 mb-6" />
                <div className="grid md:grid-cols-2 gap-4">
                  <SkeletonCard lines={2} />
                  <SkeletonCard lines={2} />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-surface-500 dark:text-surface-400">
              Unable to load achievements. Please try again later.
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-14">
            {categories.map((category) => {
              const IconComponent = categoryIcons[category] || FiAward;
              const gradientClass =
                categoryColors[category] || 'from-primary-500 to-accent-500';

              return (
                <div key={category}>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradientClass} flex items-center justify-center shadow-lg`}
                    >
                      <IconComponent className="text-white" size={20} />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-surface-900 dark:text-surface-50">
                      {category}
                    </h3>
                    <span className="text-sm text-surface-400 dark:text-surface-500">
                      ({grouped[category].length})
                    </span>
                  </div>

                  {/* Achievement Cards */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {grouped[category].map((achievement) => (
                      <div
                        key={achievement.id}
                        className="glass-card gradient-border p-6 group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="font-heading font-semibold text-surface-900 dark:text-surface-50 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {achievement.title}
                            </h4>
                            {achievement.date && (
                              <p className="text-sm text-surface-500 dark:text-surface-500 mt-1">
                                {formatDate(achievement.date)}
                              </p>
                            )}
                            {achievement.description && (
                              <p className="text-sm text-surface-600 dark:text-surface-400 mt-3 leading-relaxed">
                                {achievement.description}
                              </p>
                            )}
                          </div>
                          {achievement.link && (
                            <a
                              href={achievement.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-shrink-0 p-2 rounded-lg text-surface-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all"
                              aria-label={`Link to ${achievement.title}`}
                            >
                              <FiExternalLink size={16} />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
