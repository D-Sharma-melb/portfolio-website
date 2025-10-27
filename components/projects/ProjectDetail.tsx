import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Github, ExternalLink } from 'lucide-react';
import Chip from '@/components/ui/Chip';
import { Project } from '@/types';

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="max-w-4xl mx-auto py-16">
      {project.cover_url && (
        <div className="w-full h-80 relative rounded-xl overflow-hidden mb-8 bg-cream">
          <Image src={project.cover_url} alt={project.title} fill className="object-cover" />
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-4xl font-bold text-pine mb-3">{project.title}</h1>

        <div className="flex items-center gap-4">
          {project.repo_url && (
            <Link href={project.repo_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-pine hover:text-forest">
              <Github className="w-5 h-5" />
              <span className="underline">GitHub</span>
            </Link>
          )}

          {project.live_url && (
            <Link href={project.live_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-forest hover:text-forest-dark">
              <ExternalLink className="w-5 h-5" />
              <span className="underline">Live demo</span>
            </Link>
          )}
        </div>
      </header>

      {/* Tech stack */}
      {project.tech_stack && project.tech_stack.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech_stack.map((tech) => (
            <Chip key={tech} label={tech} variant="sage" />
          ))}
        </div>
      )}

      {/* Description / Markdown */}
      <article className="prose prose-lg max-w-none text-moss">
        <ReactMarkdown>{project.body_md}</ReactMarkdown>
      </article>
    </div>
  );
}
