import { useSupabase } from '../hooks/useSupabase';
import SectionHeading from '../components/SectionHeading';
import SkeletonCard from '../components/SkeletonCard';
import { FiBriefcase, FiCalendar } from 'react-icons/fi';

function formatDate(dateStr) {
  if (!dateStr) return 'Present';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function Experience() {
  const { data: experiences, loading, error } = useSupabase('experience');

  return (
    <div className="min-h-screen pt-24">
      <section className="section-container">
        <SectionHeading
          title="Experience"
          subtitle="My professional journey — internships, research roles, and full-time positions."
        />

        {loading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} lines={4} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-surface-500 dark:text-surface-400">
              Unable to load experience data. Please try again later.
            </p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500 opacity-30" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className="relative pl-16 md:pl-20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-6 top-6 w-4 h-4 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 border-4 border-white dark:border-surface-950 shadow-lg shadow-primary-500/30 z-10" />

                  {/* Card */}
                  <div className="glass-card gradient-border p-6 md:p-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="font-heading text-xl font-bold text-surface-900 dark:text-surface-50">
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <FiBriefcase
                            size={14}
                            className="text-primary-500"
                          />
                          <span className="text-primary-600 dark:text-primary-400 font-medium">
                            {exp.company}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-surface-500 dark:text-surface-400 whitespace-nowrap">
                        <FiCalendar size={14} />
                        <span>
                          {formatDate(exp.start_date)} — {formatDate(exp.end_date)}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-surface-600 dark:text-surface-400 leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Tags */}
                    {exp.tags && exp.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span key={tag} className="tag-pill">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
