'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import Image from 'next/image';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar?: string;
  content: string;
  rating?: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export default function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-6 shadow-lg border-2 border-cream hover:border-sage transition-all h-full flex flex-col"
    >
      {/* Quote Icon */}
      <div className="mb-4">
        <Quote className="w-8 h-8 text-sage" />
      </div>

      {/* Testimonial Content */}
      <p className="text-moss text-base leading-relaxed mb-6 flex-grow">
        "{testimonial.content}"
      </p>

      {/* Rating Stars (if provided) */}
      {testimonial.rating && (
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-lg ${
                i < testimonial.rating! ? 'text-yellow-500' : 'text-gray-300'
              }`}
            >
              ★
            </span>
          ))}
        </div>
      )}

      {/* Author Info */}
      <div className="flex items-center gap-3 pt-4 border-t border-cream">
        {testimonial.avatar ? (
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-sage/20">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center text-forest font-bold text-lg">
            {testimonial.name.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-semibold text-pine">{testimonial.name}</p>
          <p className="text-sm text-moss">
            {testimonial.role}
            {testimonial.company && ` • ${testimonial.company}`}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
