import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { createServerClient } from '@/lib/supabaseServer';
import { Article } from '@/types';
import Section from '@/components/ui/Section';

export const revalidate = 60;

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

async function getArticle(slug: string): Promise<Article | null> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticle(params.slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} - Portfolio`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.published_at || undefined,
      images: article.cover_url ? [article.cover_url] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <Section className="pt-32">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/articles" 
          className="inline-flex items-center gap-2 text-moss hover:text-forest transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </Link>

        {article.cover_url && (
          <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-8">
            <Image
              src={article.cover_url}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-pine mb-4">
            {article.title}
          </h1>
          
          {publishedDate && (
            <div className="flex items-center gap-2 text-moss">
              <Calendar className="w-5 h-5" />
              <time dateTime={article.published_at}>{publishedDate}</time>
            </div>
          )}
        </header>

        <article className="prose prose-lg max-w-none prose-pine">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => <h1 className="text-4xl font-bold mt-8 mb-4 text-pine" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-3xl font-bold mt-8 mb-4 text-pine" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-2xl font-bold mt-6 mb-3 text-pine" {...props} />,
              p: ({ node, ...props }) => <p className="text-moss leading-relaxed mb-4" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
              li: ({ node, ...props }) => <li className="text-moss" {...props} />,
              code: ({ node, ...props }) => <code className="bg-cream px-2 py-1 rounded text-sm font-mono text-pine" {...props} />,
              pre: ({ node, ...props }) => <pre className="bg-pine text-cream p-4 rounded-xl overflow-x-auto mb-4" {...props} />,
              blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-forest pl-4 italic my-4 text-moss" {...props} />,
              a: ({ node, ...props }) => <a className="text-forest hover:underline font-medium" {...props} />,
            }}
          >
            {article.body_md}
          </ReactMarkdown>
        </article>
      </div>
    </Section>
  );
}
