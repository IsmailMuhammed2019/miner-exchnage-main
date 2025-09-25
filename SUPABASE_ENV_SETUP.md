# 🔧 Fix Supabase Environment Variables in Vercel

## 🚨 Problem
Your app shows a blank screen because Supabase environment variables are not set in Vercel.

## ✅ Solution Steps

### Step 1: Get Your Supabase Credentials

1. **Go to [supabase.com](https://supabase.com)**
2. **Sign in to your account**
3. **Select your project**
4. **Go to Settings → API**
5. **Copy these values:**
   - **Project URL**: `https://your-project-id.supabase.co`
   - **Anon Key**: `eyJ...` (long string starting with eyJ)

### Step 2: Set Environment Variables in Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign in and select your project**
3. **Go to Settings → Environment Variables**
4. **Add these variables:**

```
Name: VITE_SUPABASE_URL
Value: https://your-project-id.supabase.co

Name: VITE_SUPABASE_ANON_KEY
Value: eyJ... (your anon key)
```

### Step 3: Redeploy

1. **Go to Deployments tab**
2. **Click "Redeploy" on the latest deployment**
3. **Or push a new commit to trigger redeploy**

## 🔍 Verification

### Check Browser Console
After redeploying, open browser console and look for:
- `Supabase URL: https://your-project-id.supabase.co`
- `Supabase Anon Key: Set`

### If Still Blank Screen
Check for these error messages:
- `Missing VITE_SUPABASE_URL environment variable`
- `Missing VITE_SUPABASE_ANON_KEY environment variable`

## 🚨 Common Issues

### Issue 1: Wrong Variable Names
Make sure you use exactly:
- `VITE_SUPABASE_URL` (not `SUPABASE_URL`)
- `VITE_SUPABASE_ANON_KEY` (not `SUPABASE_ANON_KEY`)

### Issue 2: Missing VITE_ Prefix
Vite only exposes environment variables that start with `VITE_`

### Issue 3: Typos in Values
Double-check your Supabase URL and Anon Key for typos

### Issue 4: Not Redeployed
Environment variables only take effect after redeploying

## 📋 Checklist

- [ ] Supabase project URL copied correctly
- [ ] Supabase anon key copied correctly
- [ ] Environment variables added to Vercel
- [ ] Variables have correct names (VITE_ prefix)
- [ ] Project redeployed after adding variables
- [ ] Browser console shows variables are set

## 🔧 Alternative: Local Testing

To test locally, create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Then run:
```bash
npm run dev
```

## 🆘 Still Having Issues?

1. **Check Vercel logs** for any error messages
2. **Verify Supabase project** is active and accessible
3. **Test Supabase connection** in Supabase dashboard
4. **Contact support** if issues persist
