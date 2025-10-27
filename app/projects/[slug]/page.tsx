import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createServerClient } from '@/lib/supabaseServer';
import ProjectDetail from '@/components/projects/ProjectDetail';
import Section from '@/components/ui/Section';
import { Project, ProjectImage } from '@/types';

interface Params {
  params: { slug: string };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const supabase = createServerClient();
  const { data } = await supabase.from('projects').select('title, excerpt').eq('slug', params.slug).single();

  if (!data) return { title: 'Project' };

  return {
    title: `${data.title} - Project`,
    description: data.excerpt,
  };
}

async function getProjectBySlug(slug: string): Promise<(Project & { images?: ProjectImage[] }) | null> {
  const supabase = createServerClient();

  // Try to fetch project and its images in one request (PostgREST will include related rows if FK exists)
  const { data, error } = await supabase
    .from('projects')
    .select('*, project_images(*)')
    .eq('slug', slug)
    .single();

  if (error) {
    // Log server-side to help debugging during development
    console.error('Error fetching project by slug:', slug, error);
    return null;
  }

  if (!data) return null;

  // Normalize shape: project_images may be present under data.project_images
  const images = (data.project_images as ProjectImage[] | undefined) || [];

  // Remove project_images prop from data when spreading into Project type
  const { project_images, ...project } = data as any;

  return { ...(project as Project), images };
}

export default async function ProjectPage({ params }: Params) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return notFound();

  return (
    <Section className="pt-28">
      <ProjectDetail project={project} />

      {/* Gallery images if any */}
      {project.images && project.images.length > 0 && (
        <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.images.map((img) => (
            <div key={img.id} className="relative h-60 rounded-lg overflow-hidden bg-cream">
              <img src={img.image_url} alt={img.alt} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
