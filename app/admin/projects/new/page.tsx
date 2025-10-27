'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { supabase } from '@/lib/supabaseClient';

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech_stack: '',
    project_url: '',
    github_url: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const techStackArray = formData.tech_stack
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          title: formData.title,
          description: formData.description,
          tech_stack: techStackArray,
          project_url: formData.project_url || null,
          github_url: formData.github_url || null,
        },
      ])
      .select()
      .single();

    setLoading(false);

    if (!error && data) {
      router.push('/admin/projects');
    }
  }

  return (
    <Section className="pt-32">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/admin/projects" 
          className="inline-flex items-center gap-2 text-moss hover:text-forest transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        <h1 className="text-4xl font-bold text-pine mb-8">New Project</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-pine mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-cream bg-white focus:border-forest focus:outline-none transition-colors"
              placeholder="My Awesome Project"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-pine mb-2">
              Description *
            </label>
            <textarea
              id="description"
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-cream bg-white focus:border-forest focus:outline-none transition-colors resize-none"
              placeholder="A brief description of your project..."
            />
          </div>

          <div>
            <label htmlFor="tech_stack" className="block text-sm font-medium text-pine mb-2">
              Tech Stack * (comma-separated)
            </label>
            <input
              type="text"
              id="tech_stack"
              required
              value={formData.tech_stack}
              onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-cream bg-white focus:border-forest focus:outline-none transition-colors"
              placeholder="React, TypeScript, Node.js"
            />
            <p className="text-sm text-moss mt-1">Separate technologies with commas</p>
          </div>

          <div>
            <label htmlFor="project_url" className="block text-sm font-medium text-pine mb-2">
              Project URL
            </label>
            <input
              type="url"
              id="project_url"
              value={formData.project_url}
              onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-cream bg-white focus:border-forest focus:outline-none transition-colors"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label htmlFor="github_url" className="block text-sm font-medium text-pine mb-2">
              GitHub URL
            </label>
            <input
              type="url"
              id="github_url"
              value={formData.github_url}
              onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-cream bg-white focus:border-forest focus:outline-none transition-colors"
              placeholder="https://github.com/username/repo"
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Creating...' : 'Create Project'}
            </Button>
            <Link href="/admin/projects">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </Section>
  );
}
