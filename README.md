# 🎓 TARK AI EdTech

**AI-Powered Career Guidance and Educational Technology Platform**

A Next.js-based educational technology platform providing AI-driven career guidance, data science programs, and innovative learning solutions.

---

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5010
```

### Production Build (Local)

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Docker (Local Testing)

```bash
# Windows
.\scripts\test-docker.bat

# Linux/Mac
./scripts/test-docker.sh
```

---

## 📦 Deployment

This project features **fully automatic deployment** to VPS using Docker and GitHub Actions.

### Quick Deploy

```bash
git add .
git commit -m "Your changes"
git push origin main
```

**That's it!** Deployment happens automatically with:
- ✅ Zero downtime
- ✅ Automatic rollback on failure
- ✅ Automated backups
- ✅ Health checks

### Documentation

- **[Complete Deployment Guide](./DEPLOYMENT.md)** - Full setup instructions
- **[Quick Reference](./QUICK_REFERENCE.md)** - Common commands
- **[Migration Summary](./MIGRATION_SUMMARY.md)** - What changed and why

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** GSAP
- **Email:** Nodemailer
- **Deployment:** Docker + GitHub Actions
- **Web Server:** Nginx (reverse proxy)

---

## 📁 Project Structure

```
tarkai-edtech/
├── app/                    # Next.js app directory
├── public/                 # Static assets
├── scripts/               # Utility scripts
│   ├── test-docker.bat   # Windows Docker test
│   ├── test-docker.sh    # Linux/Mac Docker test
│   ├── vps-setup.sh      # VPS initial setup
│   └── health-check.sh   # Deployment health check
├── .github/
│   └── workflows/
│       └── deploy.yml    # CI/CD pipeline
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Container orchestration
└── Documentation files
```

---

## 🔧 Environment Variables

### Local Development (`.env.local`)

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Production (VPS: `/var/www/tarkaiedtech/.env.production`)

```env
EMAIL_USER=sahil.b.rafaliya@gmail.com
EMAIL_PASS=your-app-password
NODE_ENV=production
```

See `.env.production.example` for template.

---

## 🌐 Live URLs

- **Production:** [https://tarkaiedtech.com](https://tarkaiedtech.com)
- **Server IP:** http://94.249.213.192

---

## 👥 Team

Developed by the TARK AI team.

---

## 📄 License

All rights reserved © 2026 TARK AI EdTech

---

## 🤝 Contributing

This is a private project. For internal team members:

1. Create a feature branch
2. Make your changes
3. Test locally
4. Push to main to deploy

---

## 📞 Support

For deployment issues, see [DEPLOYMENT.md](./DEPLOYMENT.md) troubleshooting section.

For technical questions, contact the development team.

---

**Built with ❤️ by TARK AI**

