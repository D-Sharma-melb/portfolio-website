'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { supabase } from '@/lib/supabaseClient';

export default function NewArticlePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    body_md: '',
    cover_url: '',
    status: 'draft' as 'draft' | 'published',
  });

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  function handleTitleChange(title: string) {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const articleData: any = {
      title: formData.title,
      slug: formData.slug,
      excerpt: formData.excerpt,
      body_md: formData.body_md,
      cover_url: formData.cover_url || null,
      status: formData.status,
    };

    if (formData.status === 'published') {
      articleData.published_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('articles')
      .insert([articleData])
      .select()
      .single();

    setLoading(false);

    if (!error && data) {
      router.push('/admin/articles');
    }
  }

  return (
    <Section className="pt-32">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/admin/articles" 
          className="inline-flex items-center gap-2 text-moss hover:text-forest transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </Link>

        <h1 className="text-4xl font-bold text-pine mb-8">New Article</h1>

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
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-cream bg-white focus:border-forest focus:outline-none transition-colors"
              placeholder="My Article Title"
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-pine mb-2">
              Slug *
            </label>
            <input
              type="text"
              id="slug"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-cream bg-white focus:border-forest focus:outline-none transition-colors"
              placeholder="my-article-title"
            />
            <p className="text-sm text-moss mt-1">URL-friendly version (auto-generated from title)</p>
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-pine mb-2">
              Excerpt *
            </label>
            <textarea
              id="excerpt"
              required
              rows={3}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-cream bg-white focus:border-forest focus:outline-none transition-colors resize-none"
              placeholder="A brief summary of your article..."
            />
          </div>

          <div>
            <label htmlFor="cover_url" className="block text-sm font-medium text-pine mb-2">
              Cover Image URL
            </label>
            <input
              type="url"
              id="cover_url"
              value={formData.cover_url}
              onChange={(e) => setFormData({ ...formData, cover_url: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-cream bg-white focus:border-forest focus:outline-none transition-colors"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div>
            <label htmlFor="body_md" className="block text-sm font-medium text-pine mb-2">
              Content (Markdown) *
            </label>
            <textarea
              id="body_md"
              required
              rows={15}
              value={formData.body_md}
              onChange={(e) => setFormData({ ...formData, body_md: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-cream bg-white focus:border-forest focus:outline-none transition-colors resize-none font-mono text-sm"
              placeholder="# Your article content in Markdown..."
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-pine mb-2">
              Status *
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
              className="w-full px-4 py-3 rounded-xl border-2 border-cream bg-white focus:border-forest focus:outline-none transition-colors"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Creating...' : 'Create Article'}
            </Button>
            <Link href="/admin/articles">
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
