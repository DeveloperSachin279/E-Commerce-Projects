# Deploying to Vercel - Step by Step Guide

## Prerequisites
1. A GitHub, GitLab, or Bitbucket account
2. Your project pushed to a Git repository
3. A Vercel account (free at vercel.com)

## Step 1: Push Your Code to GitHub

If you haven't already, push your code to a Git repository:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Akash Interio website"

# Create a repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up or log in (you can use GitHub to sign in)

2. **Import Your Project**
   - Click "Add New..." → "Project"
   - Import your Git repository
   - Select your repository from the list

3. **Configure Project**
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` (should be auto-filled)
   - **Output Directory**: `dist` (should be auto-filled)
   - **Install Command**: `npm install` (should be auto-filled)

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add your Gemini API key:
     - **Name**: `VITE_API_KEY`
     - **Value**: Your Gemini API key
     - **Environment**: Production, Preview, Development (select all)
   - Click "Save"

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 1-2 minutes)
   - Your site will be live at a URL like: `your-project-name.vercel.app`

### Option B: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - When asked about environment variables, add `VITE_API_KEY`

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Step 3: Configure Custom Domain (Optional)

1. Go to your project dashboard on Vercel
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Important Notes

- **Environment Variables**: Make sure to add `VITE_API_KEY` in Vercel's environment variables section
- **Build Output**: Vercel will automatically detect Vite and use the correct build settings
- **Automatic Deployments**: Every push to your main branch will trigger a new deployment
- **Preview Deployments**: Pull requests get preview deployments automatically

## Troubleshooting

### Build Fails
- Check the build logs in Vercel dashboard
- Make sure all dependencies are in `package.json`
- Verify environment variables are set correctly

### API Not Working
- Ensure `VITE_API_KEY` is set in Vercel environment variables
- Check that the variable name matches what's used in your code (`import.meta.env.VITE_API_KEY`)

### 404 Errors on Routes
- The `vercel.json` file includes a rewrite rule to handle client-side routing
- This should work automatically with the provided configuration

## Your Live URL

After deployment, you'll get a URL like:
- `https://your-project-name.vercel.app`

You can share this URL or set up a custom domain!

