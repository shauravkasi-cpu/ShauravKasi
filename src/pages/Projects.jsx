import { useState, useMemo } from 'react';
import { useSupabase } from '../hooks/useSupabase';
import SectionHeading from '../components/SectionHeading';
import SkeletonCard from '../components/SkeletonCard';
import TagPill from '../components/TagPill';
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi';
import ElectricBorder from '../components/ElectricBorder';

export default function Projects() {
  const { data: projects, loading, error } = useSupabase('projects');
  const [activeFilter, setActiveFilter] = useState('All');

  // Extract unique tech stack tags from all projects
  const allTags = useMemo(() => {
    const tagSet = new Set();
    projects.forEach((p) => {
      if (p.tech_stack) {
        p.tech_stack.forEach((tag) => tagSet.add(tag));
      }
    });
    return ['All', ...Array.from(tagSet).sort()];
  }, [projects]);

  // Filter projects based on selected tag
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter(
      (p) => p.tech_stack && p.tech_stack.includes(activeFilter)
    );
  }, [projects, activeFilter]);

  return (
    <div className="min-h-screen pt-24">
      <section className="section-container">
        <SectionHeading
          title="Projects"
          subtitle="A selection of SDE and ML projects I've built. Filter by technology to explore."
        />

        {loading ? (
          <>
            {/* Skeleton filter bar */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="skeleton h-8 w-20 rounded-full" />
              ))}
            </div>
            {/* Skeleton cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} lines={3} />
              ))}
            </div>
          </>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-surface-500 dark:text-surface-400">
              Unable to load projects. Please try again later.
            </p>
          </div>
        ) : (
          <>
            {/* Filter Tags */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {allTags.map((tag) => (
                <TagPill
                  key={tag}
                  label={tag}
                  active={activeFilter === tag}
                  onClick={() => setActiveFilter(tag)}
                />
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ElectricBorder
                  key={project.id}
                  color="#6366f1"
                  borderRadius={16}
                  className="flex flex-col"
                >
                  <div
                    className="glass-card overflow-hidden flex flex-col h-full group"
                  >
                    {/* Image */}
                    {project.image_url && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      {/* Title + Featured badge */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="font-heading text-lg font-bold text-surface-900 dark:text-surface-50 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {project.title}
                        </h3>
                        {project.featured && (
                          <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
                            <FiStar size={10} />
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed flex-1 mb-4">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      {project.tech_stack && project.tech_stack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.tech_stack.map((tech) => (
                            <span
                              key={tech}
                              className="inline-flex px-2 py-0.5 rounded-md text-xs font-medium bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Links */}
                      <div className="flex items-center gap-3 pt-4 border-t border-surface-200 dark:border-surface-700 mt-auto">
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-surface-600 dark:text-surface-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                          >
                            <FiGithub size={16} />
                            Code
                          </a>
                        )}
                        {project.demo_url && (
                          <a
                            href={project.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-surface-600 dark:text-surface-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                          >
                            <FiExternalLink size={16} />
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </ElectricBorder>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-surface-500 dark:text-surface-400">
                  No projects match the selected filter. Try a different tag.
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
