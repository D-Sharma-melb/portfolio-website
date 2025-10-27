import { Metadata } from 'next';
import { createServerClient } from '@/lib/supabaseServer';
import { Project } from '@/types';
import ProjectCard from '@/components/projects/ProjectCard';
import Section from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Projects - Portfolio',
  description: 'Browse all my projects and work',
};

export const revalidate = 60;

async function getAllProjects(): Promise<Project[]> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data || [];
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <Section className="pt-32">
      <div className="mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-pine mb-4">
          All Projects
        </h1>
        <p className="text-xl text-moss">
          A comprehensive collection of my work
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-moss">No projects yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index}  />
          ))}
        </div>
      )}
    </Section>
  );
}
