# Production Deployment Guide

## 🚀 Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free at vercel.com)
- MongoDB Atlas database

---

## Step 1: Prepare for Deployment

### A. Update Environment Variables

**Backend (.env):**
```env
# IMPORTANT: DO NOT commit this file to Git!
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=generate_a_strong_random_secret_here
PORT=5000
CLIENT_URL=https://your-frontend-url.vercel.app
```

**Frontend (.env):**
```env
REACT_APP_API_URL=https://your-backend-url.vercel.app/api
```

### B. Security Checklist
- [ ] Changed JWT_SECRET to a strong random string (min 32 characters)
- [ ] Updated MongoDB password
- [ ] Added MongoDB Atlas IP whitelist: 0.0.0.0/0 (allow all for Vercel)
- [ ] Verified .env is in .gitignore
- [ ] Removed any hardcoded secrets from code

---

## Step 2: Deploy Backend

### Option A: Deploy Backend to Vercel

1. **Push to GitHub:**
```bash
cd backend
git add .
git commit -m "Prepare backend for deployment"
git push origin main
```

2. **Deploy on Vercel:**
   - Go to https://vercel.com/new
   - Import your repository
   - Select the `backend` folder
   - Add environment variables:
     - `MONGO_URI` = your MongoDB connection string
     - `JWT_SECRET` = your secret key
     - `CLIENT_URL` = https://your-frontend.vercel.app
   - Click "Deploy"
   - Copy the deployment URL (e.g., https://1000-days-backend.vercel.app)

### Option B: Deploy Backend to Railway

1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub"
3. Select your repository and `backend` folder
4. Add the same environment variables
5. Deploy and copy the URL

---

## Step 3: Deploy Frontend

1. **Update API URL:**
   Create `frontend/.env.production`:
```env
REACT_APP_API_URL=https://your-backend-url.vercel.app/api
```

2. **Deploy on Vercel:**
   - Go to https://vercel.com/new
   - Import your repository
   - Select the `frontend` folder
   - Add environment variable:
     - `REACT_APP_API_URL` = your backend URL + /api
   - Set "Framework Preset" to "Create React App"
   - Click "Deploy"
   - Your app will be live!

---

## Step 4: Post-Deployment

### Test Your Deployed App

1. Visit your frontend URL
2. Create a test account
3. Log daily progress
4. Check leaderboard
5. Test all pages

### Setup Custom Domain (Optional)

1. Buy domain (Namecheap, Google Domains)
2. In Vercel project settings → Domains
3. Add your custom domain
4. Update DNS records as instructed
5. Update `CLIENT_URL` in backend env vars

### Monitor Your App

- **Vercel Dashboard:** Check deployment logs
- **MongoDB Atlas:** Monitor database usage
- **Google Analytics:** Add tracking code (optional)

---

## Step 5: Maintenance

### Regular Updates

```bash
# Make changes locally
git add .
git commit -m "Your update message"
git push origin main

# Vercel will auto-deploy the changes!
```

### Database Backups

- MongoDB Atlas has automatic backups
- Export data periodically for safety

### Security Updates

- Update dependencies monthly: `npm update`
- Monitor for security alerts
- Rotate JWT_SECRET every 6 months

---

## 📋 Deployment Checklist

**Before First Deploy:**
- [ ] All code pushed to GitHub
- [ ] .env files NOT in Git
- [ ] MongoDB Atlas IP whitelist configured
- [ ] JWT_SECRET changed from default
- [ ] All dependencies installed

**Backend Deployed:**
- [ ] Backend URL copied
- [ ] Environment variables set
- [ ] Health endpoint working (/api/health)
- [ ] MongoDB connected (check logs)

**Frontend Deployed:**
- [ ] API_URL points to backend
- [ ] App loads without errors
- [ ] Login/register working
- [ ] All pages accessible

**Post-Deploy:**
- [ ] Created test account
- [ ] Logged sample progress
- [ ] Verified leaderboard
- [ ] Tested on mobile
- [ ] Shared with friends for feedback

---

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify all environment variables set
- Check Vercel logs for errors

### Frontend can't connect to backend
- Verify REACT_APP_API_URL is correct
- Check CORS settings in backend
- Ensure backend is deployed and running

### "Invalid token" errors
- JWT_SECRET must match between deployments
- Clear browser localStorage and login again

### Database connection fails
- Check MongoDB Atlas IP whitelist
- Verify connection string is correct
- Ensure database user has permissions

---

## 💰 Cost Breakdown

**Free Tier (Good for 1,000+ users):**
- Vercel: Free (100GB bandwidth/month)
- MongoDB Atlas: Free (512MB storage)
- **Total: $0/month**

**When You Need to Scale:**
- Vercel Pro: $20/month (more bandwidth)
- MongoDB Atlas Shared: $9/month (2GB storage)
- Custom Domain: $10-15/year
- **Total: ~$30/month**

---

## 🎯 Next Steps After Deploy

1. **Create Content:**
   - Draw first 10 comic pages
   - Write initial blog posts
   - Populate Kain's full progress data

2. **Share:**
   - Post on Instagram
   - Share on Reddit (r/webdev, r/selfimprovement)
   - Tell friends and family

3. **Iterate:**
   - Gather user feedback
   - Fix bugs
   - Add requested features

4. **Grow:**
   - Regular content updates
   - Community building
   - Consider monetization

---

## 📞 Support Resources

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/
- React Deployment: https://create-react-app.dev/docs/deployment/

**Your app is ready to change lives. Deploy it and start the ascension! 🚀**
