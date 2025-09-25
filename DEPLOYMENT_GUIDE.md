# 🚀 Deploy Miner Exchange to Vercel

## Prerequisites
- GitHub account
- Vercel account
- Supabase project with credentials

## Step 1: Prepare Your Project

### 1.1 Push to GitHub
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/miner-exchange.git
git push -u origin main
```

### 1.2 Environment Variables
Create a `.env` file in your project root with:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 2: Deploy to Vercel

### 2.1 Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your GitHub repository

### 2.2 Configure Environment Variables
In Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add these variables:
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key

### 2.3 Build Settings
Vercel will auto-detect your Vite project. Settings should be:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Step 3: Deploy

### 3.1 Deploy
1. Click "Deploy" in Vercel
2. Wait for build to complete
3. Your app will be live at `https://your-project.vercel.app`

### 3.2 Custom Domain (Optional)
1. Go to project settings
2. Navigate to "Domains"
3. Add your custom domain

## Step 4: Verify Deployment

### 4.1 Test Your App
1. Visit your Vercel URL
2. Test login/register functionality
3. Verify Supabase connection
4. Check all features work correctly

### 4.2 Monitor Performance
- Use Vercel Analytics
- Monitor Supabase usage
- Check for any errors

## Troubleshooting

### Common Issues:
1. **Build Errors**: Check environment variables
2. **Supabase Connection**: Verify URL and keys
3. **CORS Issues**: Check Supabase settings
4. **Database Errors**: Ensure RLS policies are correct

### Environment Variables Checklist:
- ✅ VITE_SUPABASE_URL is correct
- ✅ VITE_SUPABASE_ANON_KEY is correct
- ✅ No typos in variable names
- ✅ Variables are set in Vercel dashboard

## Security Notes:
- Never commit `.env` files to Git
- Use Vercel's environment variables for production
- Keep your Supabase keys secure
- Enable RLS policies in Supabase

## Next Steps:
1. Set up custom domain
2. Configure analytics
3. Set up monitoring
4. Plan for scaling
