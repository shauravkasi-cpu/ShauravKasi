import { useSupabase } from '../hooks/useSupabase';
import SectionHeading from '../components/SectionHeading';
import {
  FaChess,
  FaCamera,
  FaMountain,
  FaCode,
  FaBook,
  FaMusic,
  FaGamepad,
  FaPaintBrush,
  FaRunning,
  FaPlane,
} from 'react-icons/fa';
import {
  FiMapPin,
  FiBookOpen,
  FiAward,
} from 'react-icons/fi';

// Map icon string names from DB to actual components
const iconMap = {
  FaChess,
  FaCamera,
  FaMountain,
  FaCode,
  FaBook,
  FaMusic,
  FaGamepad,
  FaPaintBrush,
  FaRunning,
  FaPlane,
};

const education = [
  {
    degree: 'M.S. Computer Science',
    school: 'Stanford University',
    years: '2024 — 2026',
    focus: 'Machine Learning & AI Systems',
  },
  {
    degree: 'B.Tech Computer Science & Engineering',
    school: 'Indian Institute of Technology',
    years: '2020 — 2024',
    focus: 'Data Structures, Algorithms, ML fundamentals',
  },
];

export default function About() {
  const { data: hobbies, loading } = useSupabase('hobbies');

  return (
    <div className="min-h-screen pt-24">
      {/* ========== BIO SECTION ========== */}
      <section className="section-container">
        <SectionHeading
          title="About Me"
          subtitle="A bit about my journey, what drives me, and where I'm headed."
        />

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Profile Card */}
          <div className="glass-card p-8 text-center md:col-span-1">
            <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary-100 dark:border-primary-900/50">
              <img
                src="/profile.jpg"
                alt="Shaurav"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.classList.add(
                    'bg-gradient-to-br',
                    'from-primary-500',
                    'to-accent-500',
                    'flex',
                    'items-center',
                    'justify-center'
                  );
                  e.target.parentElement.innerHTML =
                    '<span class="text-3xl font-heading font-bold text-white">S</span>';
                }}
              />
            </div>
            <h3 className="font-heading text-xl font-bold text-surface-900 dark:text-surface-50">
              Shaurav
            </h3>
            <p className="text-primary-500 dark:text-primary-400 text-sm font-medium mt-1">
              SDE & ML Engineer
            </p>
            <div className="flex items-center justify-center gap-1.5 mt-3 text-sm text-surface-500 dark:text-surface-400">
              <FiMapPin size={14} />
              <span>San Francisco, CA</span>
            </div>
          </div>

          {/* Bio Text */}
          <div className="glass-card p-8 md:col-span-2">
            <h3 className="font-heading text-lg font-semibold text-surface-900 dark:text-surface-50 mb-4">
              Background
            </h3>
            <div className="space-y-4 text-surface-600 dark:text-surface-400 leading-relaxed">
              <p>
                I&apos;m a software engineer and machine learning researcher with a passion for
                building intelligent, scalable systems. My work spans the full stack — from designing
                distributed backend services to training and deploying deep learning models in production.
              </p>
              <p>
                Currently pursuing my M.S. in Computer Science at Stanford, I&apos;ve had the privilege
                of interning at companies like Google DeepMind, AWS, and Stripe, where I&apos;ve worked
                on everything from transformer architectures to real-time data pipelines.
              </p>
              <p>
                I&apos;m particularly excited about the intersection of systems engineering and AI —
                building the infrastructure that makes machine learning work at scale. When I&apos;m not
                coding, you&apos;ll find me playing chess, hiking trails, or contributing to open-source
                ML projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== EDUCATION ========== */}
      <section className="section-container pt-0">
        <SectionHeading title="Education" />

        <div className="max-w-3xl mx-auto space-y-6">
          {education.map((edu, i) => (
            <div
              key={i}
              className="glass-card p-6 flex items-start gap-5"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center">
                {i === 0 ? (
                  <FiAward className="text-primary-500" size={22} />
                ) : (
                  <FiBookOpen className="text-primary-500" size={22} />
                )}
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg text-surface-900 dark:text-surface-50">
                  {edu.degree}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium text-sm">
                  {edu.school}
                </p>
                <p className="text-surface-500 dark:text-surface-500 text-sm mt-1">
                  {edu.years} · {edu.focus}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== HOBBIES ========== */}
      <section className="section-container pt-0">
        <SectionHeading
          title="Hobbies & Interests"
          subtitle="What I enjoy outside of code."
        />

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass-card p-6">
                <div className="skeleton w-10 h-10 rounded-xl mb-4" />
                <div className="skeleton h-4 w-2/3 mb-2" />
                <div className="skeleton h-3 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {hobbies.map((hobby) => {
              const IconComponent = iconMap[hobby.icon] || FaCode;
              return (
                <div
                  key={hobby.id}
                  className="glass-card gradient-border p-6 text-center group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 transition-colors">
                    <IconComponent
                      className="text-primary-500 group-hover:text-primary-400 transition-colors"
                      size={22}
                    />
                  </div>
                  <h3 className="font-heading font-semibold text-surface-900 dark:text-surface-50">
                    {hobby.title}
                  </h3>
                  <p className="text-sm text-surface-500 dark:text-surface-400 mt-2 leading-relaxed">
                    {hobby.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
