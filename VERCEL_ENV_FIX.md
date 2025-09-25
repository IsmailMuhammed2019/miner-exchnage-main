# 🔧 Fix Vercel Environment Variables

## 🚨 **Current Issue**
- `VITE_SUPABASE_URL` is not loading (shows as literal string)
- `VITE_SUPABASE_ANON_KEY` is loading correctly
- This causes "Invalid URL" error

## 🔍 **Debug Output Analysis**
```
Supabase URL: VITE_SUPABASE_URL  ❌ (Should show actual URL)
Supabase Anon Key: Set           ✅ (Working correctly)
```

## 🛠️ **Fix Steps**

### Step 1: Check Vercel Environment Variables

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Go to Settings → Environment Variables**
4. **Check these variables exist:**

```
Name: VITE_SUPABASE_URL
Value: https://pfsttrrbqsnzhvurchxp.supabase.co

Name: VITE_SUPABASE_ANON_KEY  
Value: your-anon-key-here
```

### Step 2: Common Issues

#### Issue A: Variable Not Set for Production
- Make sure variables are set for "Production" environment
- Or set for "All Environments"

#### Issue B: Variable Name Wrong
- Must be exactly `VITE_SUPABASE_URL` (not `SUPABASE_URL`)
- The `VITE_` prefix is required

#### Issue C: Value Format Wrong
- URL must start with `https://`
- No trailing slash
- Example: `https://pfsttrrbqsnzhvurchxp.supabase.co`

### Step 3: Redeploy After Fixing

1. **Save environment variables in Vercel**
2. **Go to Deployments tab**
3. **Click "Redeploy" on latest deployment**
4. **Or push a new commit**

### Step 4: Verify Fix

After redeploying, check console for:
```
Supabase URL: https://pfsttrrbqsnzhvurchxp.supabase.co  ✅
Supabase Anon Key: Set                                 ✅
```

## 🔧 **Temporary Fix Applied**

I've added a fallback URL in the code that will work even if the environment variable isn't loading:

```typescript
// Fallback for testing
const fallbackUrl = 'https://pfsttrrbqsnzhvurchxp.supabase.co';
```

This should make your app work immediately, but you should still fix the environment variable issue.

## 📋 **Checklist**

- [ ] `VITE_SUPABASE_URL` exists in Vercel
- [ ] Variable value is correct URL format
- [ ] Variable is set for Production environment
- [ ] App redeployed after fixing variables
- [ ] Console shows correct URL (not literal string)

## 🚨 **If Still Not Working**

### Alternative: Delete and Recreate Variable
1. Delete `VITE_SUPABASE_URL` from Vercel
2. Recreate it with exact name and value
3. Redeploy

### Alternative: Check Vercel Build Logs
1. Go to Deployments tab
2. Click on latest deployment
3. Check build logs for any environment variable warnings
