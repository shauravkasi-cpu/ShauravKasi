import { Link } from 'react-router-dom';
import { FiArrowRight, FiFileText, FiMail } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaKaggle } from 'react-icons/fa';
import ContactForm from '../components/ContactForm';
import SectionHeading from '../components/SectionHeading';
import Lightfall from '../components/Lightfall';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Lightfall WebGL background */}
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <Lightfall
            colors={['#818cf8', '#6366f1', '#d946ef', '#a78bfa']}
            backgroundColor="#1e1b4b"
            speed={0.6}
            streakCount={6}
            streakWidth={1.2}
            streakLength={1.4}
            glow={1.1}
            density={0.7}
            twinkle={0.8}
            zoom={3}
            backgroundGlow={0.6}
            opacity={1}
            mouseInteraction={true}
            mouseStrength={0.6}
            mouseRadius={0.8}
            mouseDampening={0.12}
          />
          {/* Overlay to blend into site theme */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,8,40,0.15) 0%, rgba(10,8,40,0.45) 100%)' }} />
        </div>

        <div className="relative z-10 section-container text-center" style={{ isolation: 'isolate' }}>
          {/* Profile Photo */}
          <div className="mb-8 animate-fade-in">
            <div className="inline-block relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/50 dark:border-surface-700/50 shadow-2xl shadow-primary-500/20 mx-auto">
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
                      '<span class="text-4xl md:text-5xl font-heading font-bold text-white">S</span>';
                  }}
                />
              </div>
              {/* Online indicator dot */}
              <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 border-2 border-white dark:border-surface-900 rounded-full" />
            </div>
          </div>

          {/* Heading */}
          <div className="animate-fade-in-up">
            <p className="text-sm md:text-base font-medium mb-3 tracking-wide uppercase" style={{ color: '#a5b4fc' }}>
              Software Engineer &amp; ML Researcher
            </p>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6" style={{ color: '#fff' }}>
              Hi, I&apos;m{' '}
              <span className="gradient-text">Shaurav</span>
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
              I build intelligent systems at the intersection of{' '}
              <span style={{ color: '#a5b4fc', fontWeight: 600 }}>software engineering</span>{' '}
              and{' '}
              <span style={{ color: '#f0abfc', fontWeight: 600 }}>machine learning</span>.
              Passionate about scalable architectures, deep learning, and turning research into real-world products.
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-delay-200">
            <Link to="/resume" className="btn-primary">
              <FiFileText size={18} />
              View Resume
            </Link>
            <a href="#contact" className="btn-ghost">
              <FiMail size={18} />
              Contact Me
            </a>
          </div>

          {/* Social Links */}
          <div className="mt-8 flex items-center justify-center gap-4 animate-fade-in-up animate-delay-300">
            {[
              { icon: FaGithub, href: 'https://github.com/shaurav', label: 'GitHub' },
              { icon: FaLinkedin, href: 'https://linkedin.com/in/shaurav', label: 'LinkedIn' },
              { icon: FaKaggle, href: 'https://kaggle.com/shaurav', label: 'Kaggle' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{ color: 'rgba(255,255,255,0.6)', padding: '0.75rem', borderRadius: '0.75rem', display: 'inline-flex', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#a5b4fc'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'transparent'; }}
              >
                <Icon size={22} />
              </a>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <FiArrowRight size={20} className="rotate-90 text-surface-400 dark:text-surface-500" />
          </div>
        </div>
      </section>

      {/* ========== QUICK STATS ========== */}
      <section className="bg-surface-100/50 dark:bg-surface-900/30 border-y border-surface-200 dark:border-surface-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '5+', label: 'Projects Shipped' },
              { value: '3+', label: 'Research Papers' },
              { value: '1800+', label: 'Chess Rating' },
              { value: '2', label: 'Kaggle Golds' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-heading text-3xl md:text-4xl font-bold gradient-text">
                  {value}
                </p>
                <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CONTACT SECTION ========== */}
      <section id="contact" className="section-container">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a question, project idea, or just want to say hi? Drop me a message and I'll get back to you."
        />
        <div className="max-w-xl mx-auto glass-card p-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
