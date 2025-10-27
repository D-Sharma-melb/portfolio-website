import Hero from '@/components/sections/Hero';
import ProjectsCarousel from '@/components/projects/ProjectsCarousel';
import { createServerClient } from '@/lib/supabaseServer';
import { Project } from '@/types';

export const revalidate = 60; // ISR: revalidate every 60 seconds

async function getFeaturedProjects(): Promise<Project[]> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data || [];
}

export default async function Home() {
  const projects = await getFeaturedProjects();

  return (
    <>
      <Hero />
      <ProjectsCarousel projects={projects} />
    </>
  );
}
