# Portfolio Website

A modern, production-ready personal portfolio website built with Next.js 14+, TypeScript, Tailwind CSS, and Supabase. Features a clean design with earthy hues, subtle animations, and a full-featured admin panel for content management.

## ✨ Features

- **Modern Stack**: Next.js App Router, TypeScript, Tailwind CSS v4
- **Database-Driven**: All content stored in Supabase PostgreSQL with ISR
- **Admin Panel**: Full CRUD interface for projects and articles
- **Responsive Design**: Mobile-first, looks great on all devices
- **Animations**: Smooth page transitions with Framer Motion
- **Markdown Support**: Write articles in Markdown
- **Image Optimization**: Next.js Image component with Unsplash support
- **Authentication**: Supabase Auth for admin access
- **Contact Form**: Built-in contact form with validation

## 🎨 Design

Inspired by minimalist portfolios with:
- Large, bold typography
- Generous whitespace
- Earthy color palette (cream, sage, forest, pine, moss)
- Subtle motion and transitions
- Clean, professional aesthetic

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account (free tier works)
- Git

### Quick Setup

1. **Clone and install**
   ```bash
   git clone <your-repo>
   cd portfolio
   npm install
   ```

2. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the SQL in `supabase/schema.sql` in the SQL Editor
   - Optionally run `supabase/seed.sql` for demo data

3. **Configure environment**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your Supabase credentials

4. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

For detailed setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md).

## 📁 Project Structure

```
portfolio/
├── app/                      # Next.js App Router pages
│   ├── (public)/            # Public-facing pages
│   │   ├── page.tsx         # Homepage
│   │   ├── projects/        # Projects listing
│   │   ├── articles/        # Blog articles
│   │   └── contact/         # Contact form
│   ├── admin/               # Admin panel
│   │   ├── dashboard/       # Admin dashboard
│   │   ├── projects/        # Project management
│   │   └── articles/        # Article management
│   └── api/                 # API routes
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   ├── layout/              # Layout components
│   ├── sections/            # Page sections
│   ├── projects/            # Project components
│   └── articles/            # Article components
├── lib/                     # Utilities and configs
├── types/                   # TypeScript types
└── supabase/               # Database schema and seeds
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Animations**: Framer Motion
- **Carousel**: Embla Carousel
- **Markdown**: React Markdown
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📝 Content Management

### Adding Projects

1. Log in at `/admin`
2. Navigate to Projects
3. Click "New Project"
4. Fill in details (title, description, tech stack, URLs)
5. Save

### Writing Articles

1. Log in at `/admin`
2. Navigate to Articles
3. Click "New Article"
4. Write content in Markdown
5. Choose Draft or Published
6. Save

## 🎨 Color Palette

The site uses an earthy color scheme:

- **Cream** (#DAD7CD): Light backgrounds
- **Sage** (#A3B18A): Muted accents
- **Forest** (#588157): Primary actions
- **Pine** (#344E41): Headings and dark text
- **Moss** (#3A5A40): Body text

Customize in `tailwind.config.ts`.

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

Vercel automatically:
- Configures Next.js optimization
- Sets up ISR caching
- Provides preview deployments
- Optimizes images

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 🙏 Credits

- Design inspired by modern portfolio trends
- Built with amazing open-source tools
- Icons by Lucide
- Images from Unsplash (in demo)

## 📧 Support

Need help? Open an issue or reach out via the contact form on your deployed site.

---

Built with ❤️ using Next.js and Supabase

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
