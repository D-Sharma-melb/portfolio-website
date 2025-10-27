import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn('py-20 md:py-32', className)}>
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl">
        {children}
      </div>
    </section>
  );
}
