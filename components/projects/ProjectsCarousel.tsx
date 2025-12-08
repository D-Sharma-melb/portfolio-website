'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';
import Section from '@/components/ui/Section';

interface ProjectsCarouselProps {
  projects: Project[];
}

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    skipSnaps: false,
    dragFree: true,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  if (projects.length === 0) {
    return null;
  }

  return (
    <Section id="projects" className="bg-cream/30 pt-8">
      <div className="mb-12">
        <div className="mb-4">
          <h2 className="text-5xl md:text-6xl font-bold text-pine mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-moss">
            A selection of my recent work
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="flex items-start md:items-center">
          {/* Left column for previous button (outside card area) */}
          <div className="hidden md:flex items-center mr-4">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 text-pine hover:text-forest"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>

          {/* Carousel area */}
          <div className="flex-1 overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {projects.map((project, index) => (
                <div key={project.id} className="flex-[0_0_100%] md:flex-[0_0_48%] min-w-0">
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Right column for next button (outside card area) */}
          <div className="hidden md:flex items-center ml-4">
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 text-pine hover:text-forest"
              aria-label="Next project"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
