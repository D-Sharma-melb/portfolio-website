'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PlusCircle, Edit, Trash2, Eye } from 'lucide-react';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { supabase } from '@/lib/supabaseClient';
import { Article } from '@/types';

export default function AdminArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchArticles();
  }, []);

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin');
    }
  }

  async function fetchArticles() {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setArticles(data);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this article?')) return;

    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);

    if (!error) {
      setArticles(articles.filter(a => a.id !== id));
    }
  }

  if (loading) {
    return (
      <Section className="pt-32 min-h-screen">
        <p className="text-moss">Loading...</p>
      </Section>
    );
  }

  return (
    <Section className="pt-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-pine">Articles</h1>
          <div className="flex gap-3">
            <Link href="/admin/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
            <Link href="/admin/articles/new">
              <Button>
                <PlusCircle className="w-4 h-4 mr-2" />
                New Article
              </Button>
            </Link>
          </div>
        </div>

        {articles.length === 0 ? (
          <div className="bg-cream/30 rounded-2xl p-12 text-center">
            <p className="text-moss mb-4">No articles yet</p>
            <Link href="/admin/articles/new">
              <Button>Write your first article</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl border-2 border-cream hover:border-sage transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-pine">{article.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          article.status === 'published'
                            ? 'bg-forest/20 text-forest'
                            : 'bg-moss/20 text-moss'
                        }`}
                      >
                        {article.status}
                      </span>
                    </div>
                    <p className="text-moss line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {article.status === 'published' && (
                      <Link href={`/articles/${article.slug}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                    )}
                    <Link href={`/admin/articles/${article.id}`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(article.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
