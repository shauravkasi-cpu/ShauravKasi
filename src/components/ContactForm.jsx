import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    // Basic validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error');
      setErrorMsg('Please fill in all fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    try {
      const { error } = await supabase.from('contact_messages').insert([
        {
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        },
      ]);

      if (error) throw error;

      setStatus('success');
      setForm({ name: '', email: '', message: '' });

      // Reset success state after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('Contact form error:', err);
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" id="contact-form">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="input-field"
            disabled={status === 'sending'}
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="input-field"
            disabled={status === 'sending'}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me about your project or just say hi..."
          className="input-field resize-none"
          disabled={status === 'sending'}
        />
      </div>

      {/* Status Messages */}
      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-500 dark:text-red-400 text-sm">
          <FiAlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      {status === 'success' && (
        <div className="flex items-center gap-2 text-green-500 dark:text-green-400 text-sm">
          <FiCheck size={16} />
          <span>Message sent successfully! I&apos;ll get back to you soon.</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending' || status === 'success'}
        className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Sending...
          </>
        ) : status === 'success' ? (
          <>
            <FiCheck size={18} />
            Sent!
          </>
        ) : (
          <>
            <FiSend size={18} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
