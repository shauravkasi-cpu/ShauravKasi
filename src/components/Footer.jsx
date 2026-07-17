import { FaGithub, FaLinkedin, FaKaggle, FaEnvelope } from 'react-icons/fa';

const socialLinks = [
  { icon: FaGithub, href: 'https://github.com/shaurav', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://linkedin.com/in/shaurav', label: 'LinkedIn' },
  { icon: FaKaggle, href: 'https://kaggle.com/shaurav', label: 'Kaggle' },
  { icon: FaEnvelope, href: 'mailto:shaurav@example.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="border-t border-surface-200 dark:border-surface-800 bg-white/50 dark:bg-surface-950/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-lg gradient-text">S.</span>
            <span className="text-sm text-surface-500 dark:text-surface-400">
              Built with React & Supabase
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2.5 rounded-lg text-surface-500 dark:text-surface-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-surface-500 dark:text-surface-500">
            © {new Date().getFullYear()} Shaurav. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
