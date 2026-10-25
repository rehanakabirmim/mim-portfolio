# Rehana Kabir Mim - Portfolio Deployment & Free Hosting Guide

This guide explains how to host your modern portfolio **100% Free** forever with zero server maintenance.

---

## 🚀 Option 1: GitHub Pages (Recommended - 100% Free Forever)
Since you already have a GitHub Pages website at `https://rehanakabirmim.github.io/mim-portfolio/`, this is the best, fastest, and most reliable option.

### Steps to Deploy on GitHub Pages:
1. Open terminal inside this folder (`d:\mim-portfolio`):
   ```bash
   git init
   git add .
   git commit -m "feat: modern production portfolio"
   ```
2. Link to your existing repository (or create a new one called `mim-portfolio`):
   ```bash
   git branch -M main
   git remote add origin https://github.com/rehanakabirmim/mim-portfolio.git
   git push -u origin main --force
   ```
3. In your GitHub repository:
   - Go to **Settings** > **Pages**
   - Under **Build and deployment** > **Branch**, select `main` and `/ (root)`
   - Click **Save**
4. Within 1 minute, your portfolio will be live at:
   👉 **`https://rehanakabirmim.github.io/mim-portfolio/`**!

---

## ⚡ Option 2: Vercel or Netlify (100% Free, Global CDN, Custom Domain)

### Deploy on Vercel:
1. Go to [vercel.com](https://vercel.com) and log in with GitHub.
2. Click **"Add New Project"** > Import `mim-portfolio`.
3. Keep default settings and click **Deploy**.
4. You get an instant URL like `rehana-portfolio.vercel.app` + SSL certificate for free.

---

## 🛠️ Testing Locally

You can test this portfolio on your computer right now:

### Method 1: Simply Double Click (No Command Needed)
Double click `index.html` in your file explorer to view it directly in Google Chrome, Edge, or Firefox!

### Method 2: Node.js Local Server
```bash
node server.js
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

