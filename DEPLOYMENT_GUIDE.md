# BookVault Deployment Guide

## 🚀 Complete Deployment Instructions

### **Phase 1: Backend Deployment (Railway)**

#### 1. Prepare Your Repository
```bash
# Make sure all changes are committed
git add .
git commit -m "Prepare for deployment"
git push origin main
```

#### 2. Deploy to Railway
1. **Sign up/Login**: Go to [railway.app](https://railway.app)
2. **Connect GitHub**: Link your GitHub account
3. **New Project**: Click "New Project" → "Deploy from GitHub repo"
4. **Select Repository**: Choose your BookVault repository
5. **Root Directory**: Keep as root (BookVault folder)

#### 3. Configure Environment Variables
In Railway dashboard, go to **Variables** tab and add:
```
MONGODB_URL=mongodb+srv://prashantyug23cs:x6KpO51lv9tW8jL7@cluster0.wffsn.mongodb.net/bookvault?retryWrites=true&w=majority
JWT_SECRET_KEY=nodejs
PORT=5000
NODE_ENV=production
```

#### 4. Deploy Settings
- **Start Command**: `npm start`
- **Build Command**: `npm install`
- **Root Directory**: `/` (default)

Your backend will be available at: `https://your-app-name.railway.app`

---

### **Phase 2: Frontend Deployment (Vercel)**

#### 1. Prepare Frontend Configuration
Create `.env.production` in frontend folder:
```
REACT_APP_API_URL=https://your-backend-url.railway.app
GENERATE_SOURCEMAP=false
```

#### 2. Deploy to Vercel
1. **Sign up/Login**: Go to [vercel.com](https://vercel.com)
2. **Import Project**: Click "New Project" → Import from GitHub
3. **Select Repository**: Choose your BookVault repository
4. **Framework Preset**: React
5. **Root Directory**: `frontend`
6. **Build Command**: `npm run build`
7. **Output Directory**: `build`

#### 3. Configure Environment Variables
In Vercel dashboard, go to **Settings** → **Environment Variables**:
```
REACT_APP_API_URL=https://your-backend-railway-url.railway.app
```

#### 4. Deploy
Click **Deploy** - Your frontend will be available at: `https://your-app-name.vercel.app`

---

## 🛠️ **Alternative Deployment Options**

### **Option 1: Both on Railway**
- Deploy backend as described above
- Deploy frontend as separate Railway service
- Set root directory to `frontend`

### **Option 2: Both on Render**
- Similar process to Railway
- Deploy backend first, then frontend
- Configure environment variables

### **Option 3: Frontend on Netlify**
- Drag and drop `build` folder after running `npm run build`
- Configure environment variables in Netlify dashboard

---

## 🔧 **Pre-Deployment Checklist**

### Backend ✅
- [x] Environment variables configured
- [x] CORS enabled for frontend domain
- [x] MongoDB connection string updated
- [x] PORT environment variable set
- [x] Dependencies in package.json

### Frontend ✅
- [x] Build script working (`npm run build`)
- [x] API URLs configurable via environment variables
- [x] Authentication token handling
- [x] Proxy removed for production

---

## 🚀 **Quick Deploy Commands**

### Backend (Railway)
```bash
# After connecting to Railway
railway login
railway link [project-id]
railway up
```

### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

---

## 🌐 **Final URLs**
- **Backend API**: `https://bookvault-backend.railway.app`
- **Frontend App**: `https://bookvault.vercel.app`

## 🔄 **Auto-Deployment**
Both Railway and Vercel will automatically redeploy when you push to your main branch on GitHub!

---

## 📞 **Troubleshooting**

### Common Issues:
1. **CORS Errors**: Add frontend domain to CORS whitelist in backend
2. **API Not Found**: Check REACT_APP_API_URL is correctly set
3. **Build Fails**: Ensure all dependencies are in package.json
4. **Database Connection**: Verify MongoDB Atlas whitelist includes Railway IPs (0.0.0.0/0)
