export interface Project {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body_md: string;
  repo_url?: string;
  live_url?: string;
  cover_url?: string;
  tech_stack: string[];
  created_at: string;
  updated_at: string;
  images?: ProjectImage[];
}

export interface ProjectImage {
  id: string;
  project_id: string;
  image_url: string;
  alt: string;
  position: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body_md: string;
  cover_url?: string;
  published_at?: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}
