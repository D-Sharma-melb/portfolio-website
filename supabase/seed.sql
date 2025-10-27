-- Seed demo projects
insert into public.projects (title, slug, excerpt, body_md, repo_url, live_url, cover_url, tech_stack)
values 
(
  'E-Commerce Platform',
  'e-commerce-platform',
  'A full-stack e-commerce solution with real-time inventory management and payment processing.',
  '# E-Commerce Platform\n\nA modern e-commerce platform built with cutting-edge technologies.\n\n## Features\n\n- Real-time inventory management\n- Secure payment processing\n- Admin dashboard\n- Customer reviews and ratings\n\n## Tech Stack\n\nBuilt with Next.js, TypeScript, and Stripe for payments.',
  'https://github.com/yourusername/ecommerce',
  'https://ecommerce-demo.vercel.app',
  'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
  ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL']
),
(
  'Task Management App',
  'task-management-app',
  'Collaborative task management tool with real-time updates and team features.',
  '# Task Management App\n\nA powerful task management application for teams.\n\n## Key Features\n\n- Real-time collaboration\n- Drag and drop interface\n- Calendar integration\n- File attachments\n\n## Technology\n\nBuilt with React, Node.js, and Socket.io for real-time features.',
  'https://github.com/yourusername/taskapp',
  'https://taskapp-demo.vercel.app',
  'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop',
  ARRAY['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express']
),
(
  'AI Content Generator',
  'ai-content-generator',
  'AI-powered content generation tool leveraging GPT-4 for marketing copy and blog posts.',
  '# AI Content Generator\n\nGenerate high-quality content using artificial intelligence.\n\n## Capabilities\n\n- Blog post generation\n- Marketing copy\n- Social media content\n- SEO optimization\n\n## Built With\n\nPowered by OpenAI GPT-4 API with a modern Next.js interface.',
  'https://github.com/yourusername/ai-content-gen',
  'https://ai-content-demo.vercel.app',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
  ARRAY['Next.js', 'OpenAI API', 'TypeScript', 'Tailwind CSS']
);

-- Seed demo articles (drafts)
insert into public.articles (title, slug, excerpt, body_md, cover_url, status)
values 
(
  'Building Scalable Web Applications',
  'building-scalable-web-applications',
  'A comprehensive guide to architecting and building web applications that scale.',
  '# Building Scalable Web Applications\n\nScalability is crucial for modern web applications. Here''s what you need to know.\n\n## Key Principles\n\n1. **Horizontal Scaling**: Add more servers rather than upgrading existing ones\n2. **Caching Strategies**: Implement Redis or CDN caching\n3. **Database Optimization**: Use indexes and query optimization\n4. **Load Balancing**: Distribute traffic efficiently\n\n## Best Practices\n\n- Use microservices architecture when appropriate\n- Implement proper monitoring and logging\n- Design for failure and build resilience\n\nStay tuned for more details!',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  'draft'
),
(
  'The Future of Web Development',
  'future-of-web-development',
  'Exploring emerging trends and technologies shaping the future of web development.',
  '# The Future of Web Development\n\nWeb development is evolving rapidly. Let''s explore what''s coming next.\n\n## Emerging Trends\n\n### 1. AI Integration\nArtificial intelligence is becoming integral to web applications.\n\n### 2. WebAssembly\nNear-native performance in the browser.\n\n### 3. Edge Computing\nProcessing closer to users for better performance.\n\n### 4. Web3 and Blockchain\nDecentralized applications and smart contracts.\n\n## Conclusion\n\nThe future is exciting. Stay curious and keep learning!\n\nArticle coming soon...',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
  'draft'
);
