# Complete Deployment Guide: GitHub + Vercel

## 📋 Prerequisites
- Git installed on your computer
- GitHub account
- Vercel account (sign up at https://vercel.com)
- Node.js installed (v18 or higher)

---

## Part 1: Push Code to GitHub

### Step 1: Check Your Current Repository Status

Open your terminal/PowerShell in the project root directory (`Refferq`):

```bash
cd "C:\Users\easyc\OneDrive\Desktop\easy coding\new-incentive-project\Refferq"
```

Check if this is already a Git repository:
```bash
git status
```

If you see "not a git repository", initialize it:
```bash
git init
```

### Step 2: Create .gitignore (if not exists)

Create or verify you have a `.gitignore` file with these contents:

```
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/
/build
dist/

# Production
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env*.local
.env.production

# Vercel
.vercel

# Database
prisma/dev.db
prisma/dev.db-journal
*.db
*.db-journal

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Build outputs
.next
out
```

### Step 3: Stage and Commit Your Changes

```bash
# Add all files (respects .gitignore)
git add .

# Commit with a descriptive message
git commit -m "Initial commit: Frontend with dummy data ready for deployment"
```

### Step 4: Connect to GitHub Repository

**Option A: If you already have a GitHub repo (sanjay-easycoding/affiliate-program)**

```bash
# Add remote origin (replace with your actual repo URL)
git remote add origin https://github.com/sanjay-easycoding/affiliate-program.git

# Or if remote already exists, update it:
git remote set-url origin https://github.com/sanjay-easycoding/affiliate-program.git

# Verify remote
git remote -v
```

**Option B: Create a new GitHub repository**

1. Go to https://github.com/new
2. Repository name: `affiliate-program` (or your preferred name)
3. Set to **Public** or **Private** (your choice)
4. **DO NOT** initialize with README, .gitignore, or license
5. Click "Create repository"
6. Copy the repository URL
7. Run in terminal:

```bash
git remote add origin https://github.com/YOUR_USERNAME/affiliate-program.git
```

### Step 5: Push to GitHub

```bash
# If your repo has a different branch name (like 'main' instead of 'master')
git branch -M main

# Push to GitHub
git push -u origin main
```

If you get authentication errors, you may need to:
- Use GitHub Personal Access Token (Settings → Developer settings → Personal access tokens)
- Or use GitHub CLI: `gh auth login`

---

## Part 2: Deploy on Vercel

### Step 1: Sign Up / Login to Vercel

1. Go to https://vercel.com
2. Click "Sign Up" or "Log In"
3. Sign in with GitHub (recommended for easy integration)

### Step 2: Import Project from GitHub

1. On Vercel dashboard, click **"Add New..."** → **"Project"**
2. You'll see your GitHub repositories listed
3. Find and select **"affiliate-program"** (or your repo name)
4. Click **"Import"**

### Step 3: Configure Project Settings

Based on your project structure, configure these settings:

#### **Framework Preset:**
- Select: **Next.js** (or **Other** if Next.js is not available)

#### **Root Directory:**
- **If your Next.js app is in the root:** Leave empty or set to `./`
- **If your Next.js app is in a `frontend` folder:** Set to `frontend`

Since your local structure shows Next.js at root, but the image shows "frontend" as root directory, you have two options:

**Option A: Deploy from root (Recommended if Next.js is at root)**
```
Root Directory: ./  (or leave empty)
```

**Option B: Deploy from frontend folder (If your GitHub repo has Next.js in frontend/)**
```
Root Directory: frontend
```

#### **Build and Output Settings:**

Expand "Build and Output Settings" and configure:

```
Build Command: npx prisma generate && npm run build
Output Directory: .next
Install Command: npm install
```

#### **Environment Variables:**

Since you're using dummy data, you might not need environment variables, but if you have any:

1. Click "Environment Variables"
2. Add any required variables (like database URLs, API keys, etc.)
3. For now, you can skip this since you're using dummy data

### Step 4: Deploy

1. Click the big **"Deploy"** button at the bottom
2. Wait for the build to complete (usually 1-3 minutes)
3. You'll see build logs in real-time
4. Once complete, you'll get a deployment URL like: `https://affiliate-program-xxx.vercel.app`

### Step 5: Verify Deployment

1. Click on your deployment URL to open your site
2. Test the login flow:
   - Try logging in with `admin@easy-coding.io`
   - Try logging in with `affiliate@easy-coding.io`
3. Check that the sidebar renders correctly
4. Test navigation between pages

---

## Part 3: Common Issues & Solutions

### Issue 1: Build Fails - "Prisma Client not generated"

**Solution:** Make sure your `vercel.json` has:
```json
{
  "buildCommand": "npx prisma generate && npm run build"
}
```

Or add to your `package.json`:
```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

### Issue 2: Build Fails - "Module not found"

**Solution:** 
- Make sure all dependencies are in `package.json`
- Run `npm install` locally to verify
- Check that `node_modules` is in `.gitignore`

### Issue 3: "Root Directory not found"

**Solution:**
- Verify your GitHub repo structure matches what you set in Vercel
- If Next.js is at root, set Root Directory to `./` or leave empty
- If Next.js is in `frontend/`, set Root Directory to `frontend`

### Issue 4: Database Connection Errors

**Solution:**
- Since you're using dummy data, you don't need a real database
- Make sure all API routes that try to connect to DB are commented out
- Consider removing Prisma if not needed for frontend-only deployment

---

## Part 4: Updating Your Deployment

After making changes to your code:

```bash
# 1. Stage changes
git add .

# 2. Commit
git commit -m "Update: Your change description"

# 3. Push to GitHub
git push origin main
```

Vercel will **automatically** detect the push and trigger a new deployment! 🚀

---

## Quick Checklist

- [ ] Code committed to Git
- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported from GitHub
- [ ] Root Directory configured correctly
- [ ] Build Command: `npx prisma generate && npm run build`
- [ ] Deployed successfully
- [ ] Tested login flow
- [ ] Verified sidebar renders

---

## Need Help?

If you encounter any issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify your GitHub repo structure matches Vercel settings
4. Make sure all environment variables are set (if needed)

Good luck with your deployment! 🎉

