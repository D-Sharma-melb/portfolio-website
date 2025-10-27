'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '@/types';
import Chip from '@/components/ui/Chip';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-cream"
    >
      {/* Cover Image */}
      {project.cover_url && (
        <div className="relative h-64 overflow-hidden bg-cream">
          <Image
            src={project.cover_url}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-pine mb-3 group-hover:text-forest transition-colors">
          {project.title}
        </h3>

        <p className="text-moss mb-4 line-clamp-3">
          {project.excerpt}
        </p>

        {/* Tech Stack */}
        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech_stack.slice(0, 4).map((tech) => (
              <Chip key={tech} label={tech} variant="sage" />
            ))}
            {project.tech_stack.length > 4 && (
              <Chip label={`+${project.tech_stack.length - 4} more`} variant="default" />
            )}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-4">
          {project.live_url && (
            <Link
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-forest hover:text-forest-dark font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </Link>
          )}
          {project.repo_url && (
            <Link
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-pine hover:text-pine-dark font-medium transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
            </Link>
          )}
        </div>

        {/* View project button */}
        <div className="mt-4 flex justify-end">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-pine border-2 border-pine shadow-sm hover:bg-pine hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-forest"
            aria-label={`View project ${project.title}`}
          >
            View project
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
