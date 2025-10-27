import { Metadata } from 'next';
import { createServerClient } from '@/lib/supabaseServer';
import { Article } from '@/types';
import ArticleCard from '@/components/articles/ArticleCard';
import Section from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Articles - Portfolio',
  description: 'Read my latest articles and thoughts',
};

export const revalidate = 60;

async function getPublishedArticles(): Promise<Article[]> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
    return [];
  }

  return data || [];
}

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();

  return (
    <Section className="pt-32">
      <div className="mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-pine mb-4">
          Articles
        </h1>
        <p className="text-xl text-moss">
          Thoughts, tutorials, and insights
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-20 bg-cream/30 rounded-2xl">
          <p className="text-2xl text-moss mb-2">No articles yet</p>
          <p className="text-sage">Check back soon for new content!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      )}
    </Section>
  );
}
