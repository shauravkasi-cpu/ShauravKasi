import { FiDownload, FiExternalLink } from 'react-icons/fi';
import SectionHeading from '../components/SectionHeading';

export default function Resume() {
  const resumePath = '/resume.pdf';

  return (
    <div className="min-h-screen pt-24">
      <section className="section-container">
        <SectionHeading
          title="Resume"
          subtitle="View or download my resume below."
        />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href={resumePath}
            download="Shaurav_Resume.pdf"
            className="btn-primary"
          >
            <FiDownload size={18} />
            Download Resume
          </a>
          <a
            href={resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <FiExternalLink size={18} />
            Open in New Tab
          </a>
        </div>

        {/* PDF Viewer */}
        <div className="max-w-4xl mx-auto glass-card overflow-hidden">
          <div className="w-full" style={{ height: '80vh' }}>
            <iframe
              src={resumePath}
              title="Shaurav's Resume"
              className="w-full h-full border-0"
              style={{ minHeight: '600px' }}
            />
          </div>

          {/* Fallback */}
          <div className="p-6 text-center border-t border-surface-200 dark:border-surface-700">
            <p className="text-sm text-surface-500 dark:text-surface-400">
              Can&apos;t see the PDF?{' '}
              <a
                href={resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 underline underline-offset-2"
              >
                Open it directly in your browser
              </a>{' '}
              or{' '}
              <a
                href={resumePath}
                download="Shaurav_Resume.pdf"
                className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 underline underline-offset-2"
              >
                download the file
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
