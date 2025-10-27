# Setup Guide

Complete step-by-step guide to set up and deploy your portfolio website.

## Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed ([download](https://nodejs.org/))
- **npm** or **yarn** package manager
- A **Supabase account** ([sign up free](https://supabase.com))
- **Git** installed
- A code editor (VS Code recommended)

## Step 1: Project Setup

### 1.1 Clone the Repository

```bash
git clone <your-repository-url>
cd portfolio
```

### 1.2 Install Dependencies

```bash
npm install
# or
yarn install
```

This will install all required packages including Next.js, React, Tailwind CSS, and more.

## Step 2: Supabase Configuration

### 2.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: My Portfolio
   - **Database Password**: (generate a strong password)
   - **Region**: Choose closest to your users
5. Wait for project to be created (~2 minutes)

### 2.2 Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase/schema.sql`
4. Paste into the SQL Editor
5. Click "Run" to execute

This creates three tables:
- `projects` - Your portfolio projects
- `articles` - Blog articles
- `project_images` - Project screenshots/images

### 2.3 Add Demo Data (Optional)

To populate your database with sample content:

1. In SQL Editor, create another new query
2. Copy contents of `supabase/seed.sql`
3. Paste and run

This adds 3 demo projects and 2 sample articles.

### 2.4 Configure Storage

1. Go to **Storage** in Supabase dashboard
2. Click "Create Bucket"
3. Name it `portfolio-images`
4. Make it **Public** (for serving images)
5. Click "Create"

### 2.5 Get Your API Keys

1. Go to **Project Settings** > **API**
2. Copy these values:
   - **Project URL** (e.g., https://xxxxx.supabase.co)
   - **anon/public key** (long string starting with "eyJ...")

## Step 3: Environment Variables

### 3.1 Create Environment File

```bash
cp .env.example .env.local
```

### 3.2 Add Your Credentials

Open `.env.local` and replace the placeholder values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**: Never commit `.env.local` to version control!

## Step 4: Create Admin User

### 4.1 Enable Email Auth

1. In Supabase dashboard, go to **Authentication** > **Providers**
2. Ensure **Email** is enabled
3. Scroll down to **Email Templates**
4. Customize if desired (optional)

### 4.2 Create Your Admin Account

1. Go to **Authentication** > **Users**
2. Click "Add User"
3. Choose "Create User"
4. Enter your email and password
5. Click "Create User"

This is the account you'll use to access `/admin`.

## Step 5: Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

You should see your portfolio homepage!

## Step 6: Test Admin Panel

1. Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Sign in with the email/password you created
3. You should see the admin dashboard
4. Try creating a test project or article

## Step 7: Customize Your Portfolio

### 7.1 Update Personal Information

Edit these files:

**`app/page.tsx`** - Homepage hero section:
```typescript
<h1>Your Name</h1>
<p>Your tagline or description</p>
```

**`components/layout/Footer.tsx`** - Footer text and links

**`components/layout/Navbar.tsx`** - Navigation items

**`app/contact/page.tsx`** - Contact information:
- Email address
- GitHub profile
- LinkedIn profile

### 7.2 Customize Colors (Optional)

The earthy color palette is defined in `tailwind.config.ts`:

```typescript
colors: {
  cream: {...},
  sage: {...},
  forest: {...},
  pine: {...},
  moss: {...},
}
```

Modify these hex values to match your brand.

### 7.3 Update Metadata

Edit `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Your Name - Portfolio',
  description: 'Your description',
  // ... other SEO settings
}
```

## Step 8: Add Your Content

### 8.1 Add Projects

1. Go to `/admin/projects`
2. Click "New Project"
3. Fill in:
   - Title
   - Description
   - Tech stack (comma-separated)
   - Project URL (if deployed)
   - GitHub URL (if public)
4. Save

### 8.2 Write Articles

1. Go to `/admin/articles`
2. Click "New Article"
3. Write content in Markdown
4. Add a cover image URL (Unsplash recommended)
5. Choose Draft or Published
6. Save

## Step 9: Deploy to Production

### 9.1 Push to GitHub

```bash
git add .
git commit -m "Initial portfolio setup"
git push origin main
```

### 9.2 Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click "Deploy"

Vercel will:
- Build your Next.js app
- Configure optimizations automatically
- Provide a production URL
- Set up preview deployments

### 9.3 Update Supabase URL Settings

1. In Supabase dashboard, go to **Authentication** > **URL Configuration**
2. Add your Vercel URL to:
   - Site URL: `https://your-portfolio.vercel.app`
   - Redirect URLs: `https://your-portfolio.vercel.app/**`

## Step 10: Final Checks

- [ ] Homepage loads correctly
- [ ] Projects page shows your projects
- [ ] Articles page displays published articles
- [ ] Contact form submits successfully
- [ ] Admin login works
- [ ] Can create/edit/delete projects
- [ ] Can create/edit/delete articles
- [ ] Images load properly
- [ ] Site is responsive on mobile

## Troubleshooting

### "Invalid API key" Error

- Check that environment variables are set correctly
- Restart dev server after changing `.env.local`
- Verify credentials in Supabase dashboard

### Images Not Loading

- Ensure `next.config.ts` has correct image domains
- Check storage bucket is public
- Verify image URLs are valid

### Admin Login Not Working

- Verify user exists in Supabase Auth
- Check email/password are correct
- Ensure `supabase.auth.signInWithPassword` is called

### Build Errors

- Run `npm run build` locally to test
- Check for TypeScript errors
- Ensure all dependencies are installed

### ISR Not Updating

- Wait 60 seconds (revalidate time)
- Clear browser cache
- Check Vercel function logs

## Next Steps

- **Custom Domain**: Add your domain in Vercel settings
- **Analytics**: Add Vercel Analytics or Google Analytics
- **SEO**: Customize metadata for each page
- **Performance**: Test with Lighthouse
- **Email**: Set up actual email sending in contact form

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

## Support

If you encounter issues:

1. Check this guide thoroughly
2. Review error messages in console
3. Check Supabase logs
4. Search GitHub issues
5. Ask for help in discussions

---

Happy building! 🚀
