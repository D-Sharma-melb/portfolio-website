'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
  index?: number;
}

export default function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-cream"
    >
      <Link href={`/articles/${article.slug}`}>
        {/* Cover Image */}
        {article.cover_url && (
          <div className="relative h-56 overflow-hidden bg-cream">
            <Image
              src={article.cover_url}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {publishedDate && (
            <div className="flex items-center gap-2 text-sm text-moss mb-3">
              <Calendar className="w-4 h-4" />
              <time dateTime={article.published_at}>{publishedDate}</time>
            </div>
          )}

          <h3 className="text-2xl font-bold text-pine mb-3 group-hover:text-forest transition-colors">
            {article.title}
          </h3>

          <p className="text-moss line-clamp-3">
            {article.excerpt}
          </p>

          <div className="mt-4 text-forest font-medium group-hover:underline">
            Read more →
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
