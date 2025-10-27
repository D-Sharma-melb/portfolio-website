'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
    }
  };

  return (
    <Section className="pt-32">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-pine mb-6">
            Let's work together
          </h1>
          <p className="text-xl text-moss mb-12">
            Have a project in mind? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-pine mb-6">
                Get in touch
              </h2>
              
              <div className="space-y-4">
                <Link
                  href="mailto:your.email@example.com"
                  className="flex items-center gap-4 p-4 bg-cream/30 rounded-xl hover:bg-cream/50 transition-colors group"
                >
                  <Mail className="w-6 h-6 text-forest" />
                  <div>
                    <p className="font-medium text-pine group-hover:text-forest transition-colors">
                      Email
                    </p>
                    <p className="text-moss">div_sharma1685@gmail.com</p>
                  </div>
                </Link>

                <Link
                  href="https://github.com/D-Sharma-melb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-cream/30 rounded-xl hover:bg-cream/50 transition-colors group"
                >
                  <Github className="w-6 h-6 text-forest" />
                  <div>
                    <p className="font-medium text-pine group-hover:text-forest transition-colors">
                      GitHub
                    </p>
                    <p className="text-moss">@D-Sharma-melb</p>
                  </div>
                </Link>

                <Link
                  href="https://linkedin.com/in/divyamsharmamelb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-cream/30 rounded-xl hover:bg-cream/50 transition-colors group"
                >
                  <Linkedin className="w-6 h-6 text-forest" />
                  <div>
                    <p className="font-medium text-pine group-hover:text-forest transition-colors">
                      LinkedIn
                    </p>
                    <p className="text-moss">@divyamsharmamelb</p>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-pine mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-cream bg-white focus:border-forest focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-pine mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-cream bg-white focus:border-forest focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-pine mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-cream bg-white focus:border-forest focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={status === 'sending'}
                className="w-full"
              >
                {status === 'sending' ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>

              {status === 'success' && (
                <p className="text-forest text-center font-medium">Message sent successfully!</p>
              )}
              {status === 'error' && (
                <p className="text-red-600 text-center font-medium">Failed to send message. Please try again.</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
