# 🚀 Quick Deployment Reference

## Common Commands

### Local Development
```bash
npm run dev              # Start development server
npm run build           # Build for production
npm start              # Start production server locally
```

### Docker Testing (Local)
```bash
# Windows
.\scripts\test-docker.bat

# Linux/Mac
./scripts/test-docker.sh

# Manual Docker commands
docker build -t tarkai-edtech-test .
docker run -p 5010:5010 --env-file .env.local tarkai-edtech-test
```

### Deployment
```bash
# Automatic (recommended)
git add .
git commit -m "Your changes"
git push origin main
# ✅ Deployment starts automatically!

# Manual trigger
# Go to GitHub → Actions → Run workflow
```

### VPS Management
```bash
# SSH to VPS
ssh -p 22192 root@94.249.213.192

# Check status
cd /var/www/tarkaiedtech
docker-compose ps
docker-compose logs -f

# Restart app
docker-compose restart

# View backups
ls -lth /var/www/backups/tarkaiedtech/
```

### Troubleshooting
```bash
# Check logs
docker-compose logs --tail=100

# Rebuild from scratch
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Check Nginx
sudo nginx -t
sudo systemctl status nginx
```

## Environment Variables

### Local (.env.local)
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Production (VPS: /var/www/tarkaiedtech/.env.production)
```env
EMAIL_USER=sahil.b.rafaliya@gmail.com
EMAIL_PASS=qliw qfww fupe hveb
NODE_ENV=production
```

## Deployment Flow

1. **Push to GitHub** → 
2. **GitHub Actions triggered** → 
3. **Build Docker image** → 
4. **Upload to VPS** → 
5. **Backup current version** → 
6. **Deploy new version** → 
7. **Health check** → 
8. **Success! 🎉** (or automatic rollback on failure)

## Key Files

- `Dockerfile` - Docker configuration
- `docker-compose.yml` - Docker Compose setup
- `.github/workflows/deploy.yml` - CI/CD pipeline
- `next.config.ts` - Next.js configuration (standalone mode)
- `.env.production.example` - Production env template
- `DEPLOYMENT.md` - Full deployment guide

## URLs

- **Production**: http://tarkaiedtech.com
- **Server IP**: http://94.249.213.192
- **Local Dev**: http://localhost:5010

## Support

For detailed documentation, see [DEPLOYMENT.md](./DEPLOYMENT.md)
