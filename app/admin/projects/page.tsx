'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PlusCircle, Edit, Trash2, Eye } from 'lucide-react';
import Button from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { supabase } from '@/lib/supabaseClient';
import { Project } from '@/types';

export default function AdminProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchProjects();
  }, []);

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin');
    }
  }

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setProjects(data);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this project?')) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (!error) {
      setProjects(projects.filter(p => p.id !== id));
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
          <h1 className="text-4xl font-bold text-pine">Projects</h1>
          <div className="flex gap-3">
            <Link href="/admin/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
            <Link href="/admin/projects/new">
              <Button>
                <PlusCircle className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </Link>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="bg-cream/30 rounded-2xl p-12 text-center">
            <p className="text-moss mb-4">No projects yet</p>
            <Link href="/admin/projects/new">
              <Button>Create your first project</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl border-2 border-cream hover:border-sage transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-pine mb-2">{project.title}</h3>
                    <p className="text-moss line-clamp-2 mb-4">{project.excerpt}</p>
                    <div className="flex gap-2">
                      {project.tech_stack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-sage/20 text-sage rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech_stack.length > 3 && (
                        <span className="px-3 py-1 bg-cream text-moss rounded-full text-sm">
                          +{project.tech_stack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </a>
                    )}
                    <Link href={`/admin/projects/${project.id}`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(project.id)}
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
