import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';
import { createServerClient } from '@/lib/supabaseServer';
import Section from '@/components/ui/Section';
import Chip from '@/components/ui/Chip';
import Button from '@/components/ui/Button';
import ProjectImageCarousel from '@/components/projects/ProjectImageCarousel';
import TestimonialCard, { Testimonial } from '@/components/projects/TestimonialCard';
import { Project, ProjectImage } from '@/types';
import ReactMarkdown from 'react-markdown';

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createServerClient();
  const { data } = await supabase.from('projects').select('title, excerpt').eq('slug', slug).single();

  if (!data) return { title: 'Project' };

  return {
    title: `${data.title} - Project`,
    description: data.excerpt,
  };
}

async function getProjectBySlug(slug: string): Promise<(Project & { images?: ProjectImage[] }) | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('projects')
    .select('*, project_images(*)')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching project by slug:', slug, error);
    return null;
  }

  if (!data) return null;

  const images = (data.project_images as ProjectImage[] | undefined) || [];
  const { project_images, ...project } = data as any;

  return { ...(project as Project), images };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return notFound();

  // Prepare carousel images: cover first, then gallery images
  const carouselImages = [
    ...(project.cover_url ? [{ url: project.cover_url, alt: project.title }] : []),
    ...(project.images?.map(img => ({ url: img.image_url, alt: img.alt })) || [])
  ];

  // Mock testimonials - in real app, fetch from database
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'John Doe',
      role: 'Project Manager',
      company: 'Tech Corp',
      content: 'Outstanding work! The attention to detail and clean code architecture made this project a success.',
      rating: 5
    },
    {
      id: '2',
      name: 'Jane Smith',
      role: 'Lead Developer',
      company: 'StartupXYZ',
      content: 'Impressive technical skills and great communication throughout the development process.',
      rating: 5
    }
  ];

  return (
    <Section className="pt-28 pb-20">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Title and Subtitle*/}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-pine">
            {project.title}
          </h1>
          <p className="text-sm md:text-base text-moss">
            {project.excerpt}
          </p>
        </div>

        {/* Image Carousel - Full viewport height minus header */}
        {carouselImages.length > 0 && (
          <div className="h-[calc(100vh-280px)] min-h-[400px]">
            <ProjectImageCarousel images={carouselImages} />
          </div>
        )}

        {/* Links and Tech Stack - In Box */}
        <div className="bg-white rounded-2xl p-6 border-2 border-cream">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            {/* Tech Stack - Left Side */}
            {project.tech_stack && project.tech_stack.length > 0 && (
              <div className="space-y-3 flex-1">
                <h3 className="text-lg font-semibold text-pine">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech) => (
                    <Chip key={tech} label={tech} variant="sage" />
                  ))}
                </div>
              </div>
            )}

            {/* Links - Right Side */}
            <div className="flex flex-wrap gap-4">
              {project.repo_url && (
                <Link href={project.repo_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg">
                    <Github className="w-5 h-5 mr-2" />
                    View Code
                  </Button>
                </Link>
              )}
              {project.live_url && (
                <Link href={project.live_url} target="_blank" rel="noopener noreferrer">
                  <Button size="lg">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Live Demo
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Description Card */}
        <div className="bg-white rounded-2xl p-8 border-2 border-cream shadow-lg">
          <h2 className="text-3xl font-bold text-pine mb-6">About This Project</h2>
          <div className="prose prose-lg max-w-none text-moss">
            <ReactMarkdown>{project.body_md}</ReactMarkdown>
          </div>
        </div>

        {/* Testimonials Section */}
        {testimonials.length > 0 && (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-pine">
                What People Say
              </h2>
              <p className="text-sm md:text-base text-moss">
                Feedback from collaborators and clients
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
