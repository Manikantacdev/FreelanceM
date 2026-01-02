# FreelanceM - Client

Modern React frontend for the FreelanceM freelancing platform.

## 🚀 Tech Stack

- **React 18** with Vite
- **Socket.io Client** for real-time chat
- **React Router** for navigation
- **Axios** for API requests

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

App runs at `http://localhost:5173`

## 🌐 Deployment to Vercel

### Step 1: Push to GitHub

```bash
cd client
git init
git add .
git commit -m "Initial commit - FreelanceM client"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/freelancem-client.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your `freelancem-client` repository
4. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**

### Step 3: Configure for Production

The app automatically uses `https://freelancerm-api.onrender.com` as the API backend in production mode (configured in `src/config.js`).

## 📁 Project Structure

```
src/
├── components/      # Reusable UI components
├── context/         # React Context providers
├── pages/           # Page components
│   ├── admin/       # Admin dashboard pages
│   ├── client/      # Client dashboard pages
│   └── freelancer/  # Freelancer dashboard pages
├── styles/          # CSS stylesheets
├── config.js        # API configuration
└── App.jsx          # Main app component
```

## 🎨 Design System

The app uses a custom dark theme with:
- **Primary Accent**: #f26b21 (Orange)
- **Canvas**: #070b12 (Deep navy)
- **Fonts**: Syne (headings), Epilogue (body)

