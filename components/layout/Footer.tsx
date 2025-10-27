import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-pine text-cream py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">Portfolio</h3>
            <p className="text-sage-light text-sm">
              © {currentYear} All rights reserved.
            </p>
          </div>

          <div className="flex gap-6">
            <Link
              href="mailto:your.email@example.com"
              className="hover:text-sage transition-colors"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </Link>
            <Link
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sage transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </Link>
            <Link
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sage transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
