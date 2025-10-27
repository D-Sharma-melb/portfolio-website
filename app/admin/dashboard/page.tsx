'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, Folder, LogOut, PlusCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { supabase } from '@/lib/supabaseClient';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
  });

  useEffect(() => {
    checkAuth();
    fetchStats();
  }, []);

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin');
    }
    setLoading(false);
  }

  async function fetchStats() {
    const [projectsRes, articlesRes] = await Promise.all([
      supabase.from('projects').select('id', { count: 'exact', head: true }),
      supabase.from('articles').select('status', { count: 'exact' }),
    ]);

    const publishedCount = articlesRes.data?.filter(a => a.status === 'published').length || 0;
    const draftCount = articlesRes.data?.filter(a => a.status === 'draft').length || 0;

    setStats({
      totalProjects: projectsRes.count || 0,
      totalArticles: articlesRes.count || 0,
      publishedArticles: publishedCount,
      draftArticles: draftCount,
    });
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/admin');
  }

  if (loading) {
    return (
      <Section className="pt-32 min-h-screen flex items-center justify-center">
        <p className="text-moss">Loading...</p>
      </Section>
    );
  }

  return (
    <Section className="pt-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-pine"
          >
            Admin Dashboard
          </motion.h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-2xl border-2 border-cream"
          >
            <Folder className="w-8 h-8 text-forest mb-2" />
            <p className="text-3xl font-bold text-pine mb-1">{stats.totalProjects}</p>
            <p className="text-moss text-sm">Total Projects</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-2xl border-2 border-cream"
          >
            <FileText className="w-8 h-8 text-forest mb-2" />
            <p className="text-3xl font-bold text-pine mb-1">{stats.totalArticles}</p>
            <p className="text-moss text-sm">Total Articles</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-2xl border-2 border-cream"
          >
            <FileText className="w-8 h-8 text-sage mb-2" />
            <p className="text-3xl font-bold text-pine mb-1">{stats.publishedArticles}</p>
            <p className="text-moss text-sm">Published</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-2xl border-2 border-cream"
          >
            <FileText className="w-8 h-8 text-moss mb-2" />
            <p className="text-3xl font-bold text-pine mb-1">{stats.draftArticles}</p>
            <p className="text-moss text-sm">Drafts</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-8 rounded-2xl border-2 border-cream"
          >
            <Folder className="w-12 h-12 text-forest mb-4" />
            <h2 className="text-2xl font-bold text-pine mb-2">Projects</h2>
            <p className="text-moss mb-6">Manage your portfolio projects</p>
            <div className="flex gap-3">
              <Link href="/admin/projects">
                <Button variant="secondary">View All</Button>
              </Link>
              <Link href="/admin/projects/new">
                <Button>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-8 rounded-2xl border-2 border-cream"
          >
            <FileText className="w-12 h-12 text-forest mb-4" />
            <h2 className="text-2xl font-bold text-pine mb-2">Articles</h2>
            <p className="text-moss mb-6">Write and publish articles</p>
            <div className="flex gap-3">
              <Link href="/admin/articles">
                <Button variant="secondary">View All</Button>
              </Link>
              <Link href="/admin/articles/new">
                <Button>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  New Article
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
