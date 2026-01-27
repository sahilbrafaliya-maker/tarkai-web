# 🚀 TARK AI EdTech - Deployment Guide

## Overview
This project is configured for **fully automatic deployment** to a VPS server using:
- **Docker** for containerization
- **GitHub Actions** for CI/CD
- **Nginx** as reverse proxy
- **Zero-downtime deployments** with automatic rollback

---

## 📋 Prerequisites

### On your VPS Server:
1. **Docker & Docker Compose installed**
2. **Nginx installed**
3. **SSH access configured**
4. **GitHub Actions can SSH into the server** (SSH key added to GitHub Secrets)

---

## 🔧 Initial VPS Setup

### 1. Install Required Software

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose -y

# Install Nginx
sudo apt install nginx -y

# Enable services
sudo systemctl enable docker
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 2. Configure Firewall

```bash
# Allow SSH, HTTP, and HTTPS
sudo ufw allow 22192/tcp  # Your custom SSH port
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 3. Set up Environment Variables on VPS

```bash
# Create the deployment directory
sudo mkdir -p /var/www/tarkaiedtech

# Create production environment file
sudo nano /var/www/tarkaiedtech/.env.production
```

Add your environment variables:
```env
EMAIL_USER=sahil.b.rafaliya@gmail.com
EMAIL_PASS=qliw qfww fupe hveb

# Add any other production variables
NODE_ENV=production
```

---

## 🔐 GitHub Secrets Configuration

Add the following secret to your GitHub repository:

1. Go to: **Repository → Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Add:
   - **Name:** `VPS_SSH_KEY`
   - **Value:** Your VPS private SSH key content

To get your SSH key:
```bash
# On your local machine or VPS
cat ~/.ssh/id_rsa  # Copy this entire content
```

---

## 🎯 Deployment Process

### Automatic Deployment (Recommended)

**Every push to `main` branch triggers automatic deployment:**

1. Commit and push your changes:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

2. Watch the deployment progress:
   - Go to **GitHub → Actions tab**
   - Monitor the deployment workflow

3. The workflow will:
   - ✅ Build the Docker image
   - ✅ Upload to VPS
   - ✅ Create backup of current deployment
   - ✅ Deploy new version
   - ✅ Configure Nginx (first time)
   - ✅ Automatically rollback if deployment fails

### Manual Deployment

You can also trigger deployment manually:
1. Go to **GitHub → Actions → Deploy to VPS with Docker**
2. Click **Run workflow**
3. Select `main` branch
4. Click **Run workflow**

---

## 🌐 Nginx Configuration

The deployment automatically configures Nginx on first run. The config is located at:
```
/etc/nginx/sites-available/tarkaiedtech
```

### To manually update Nginx config:

```bash
sudo nano /etc/nginx/sites-available/tarkaiedtech
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔒 SSL/HTTPS Setup (Optional but Recommended)

### Using Let's Encrypt (Free SSL):

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d tarkaiedtech.com -d www.tarkaiedtech.com

# Auto-renewal is configured by default
# Test renewal
sudo certbot renew --dry-run
```

After SSL setup, the Nginx config will automatically redirect HTTP to HTTPS.

---

## 📊 Monitoring & Management

### Check Application Status

```bash
# SSH to VPS
ssh -p 22192 root@94.249.213.192

# Navigate to deployment directory
cd /var/www/tarkaiedtech

# Check container status
docker-compose ps

# View logs
docker-compose logs -f

# View last 100 lines
docker-compose logs --tail=100
```

### Restart Application

```bash
cd /var/www/tarkaiedtech
docker-compose restart
```

### Manual Deployment on VPS

```bash
cd /var/www/tarkaiedtech
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### View Application Health

```bash
# Check if app is responding
curl http://localhost:5010

# Check Nginx status
sudo systemctl status nginx

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

---

## 🔄 Rollback Procedure

### Automatic Rollback
If deployment fails, the system automatically rolls back to the previous version.

### Manual Rollback

```bash
# SSH to VPS
cd /opt/backups/tarkai-edtech

# List available backups
ls -lth

# Choose a backup and restore
cd /var/www/tarkaiedtech
docker-compose down
tar -xzf /opt/backups/tarkai-edtech/backup_YYYYMMDD_HHMMSS.tar.gz -C .
docker-compose up -d
```

---

## 🐛 Troubleshooting

### Container won't start:

```bash
# Check logs
docker-compose logs app

# Check environment variables
cat /var/www/tarkaiedtech/.env.production

# Rebuild from scratch
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Nginx issues:

```bash
# Test configuration
sudo nginx -t

# Check if nginx is running
sudo systemctl status nginx

# Restart nginx
sudo systemctl restart nginx

# Check error logs
sudo tail -f /var/log/nginx/error.log
```

### Port 5010 already in use:

```bash
# Find what's using the port
sudo lsof -i :5010

# Kill the process
sudo kill -9 <PID>

# Restart containers
docker-compose restart
```

### Deployment fails in GitHub Actions:

1. Check the Actions logs on GitHub
2. Verify SSH key is correct in GitHub Secrets
3. Ensure VPS has enough disk space:
   ```bash
   df -h
   ```
4. Clean up old Docker images:
   ```bash
   docker system prune -a
   ```

---

## 🗂️ File Structure on VPS

```
/var/www/tarkaiedtech/
├── app/                    # Your application code
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose config
└── .env.production        # Production environment variables

/var/www/backups/tarkaiedtech/
├── backup_20260127_120000.tar.gz
├── backup_20260127_130000.tar.gz
└── ...                    # Last 5 backups kept
```

---

## ⚡ Performance Optimization

### Enable Docker layer caching:
The Dockerfile is already optimized with multi-stage builds.

### Monitor container resources:

```bash
# Check container resource usage
docker stats

# View system resources
htop
```

### Clean up regularly:

```bash
# Remove unused Docker resources
docker system prune -a

# Remove old backups (keeps last 5)
# This is done automatically during deployment
```

---

## 🔐 Security Best Practices

1. **Keep SSH key secure** - Never commit to repository
2. **Use environment variables** - Never hardcode secrets
3. **Enable firewall** - Only allow necessary ports
4. **Set up SSL** - Use HTTPS for production
5. **Regular updates**:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```
6. **Monitor logs** regularly for suspicious activity

---

## 📝 Environment Variables

Update `/var/www/tarkaiedtech/.env.production` with:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Node Environment
NODE_ENV=production

# Add any API keys, database URLs, etc.
# NEXT_PUBLIC_API_URL=https://api.example.com
# DATABASE_URL=postgresql://...
```

---

## 🎉 Success Checklist

After successful deployment, verify:

- [ ] Application accessible at http://your-domain.com
- [ ] Docker container is running: `docker-compose ps`
- [ ] Nginx is configured: `sudo nginx -t`
- [ ] Logs show no errors: `docker-compose logs`
- [ ] SSL certificate installed (if applicable)
- [ ] Environment variables are set correctly
- [ ] Backups are being created
- [ ] Auto-deployment works on push to main

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review GitHub Actions logs
3. Check VPS logs: `docker-compose logs -f`
4. Ensure all prerequisites are met

---

## 🔄 Continuous Improvement

The deployment setup includes:
- ✅ Automated builds
- ✅ Zero-downtime deployments
- ✅ Automatic rollback on failure
- ✅ Backup before each deployment
- ✅ Health checks
- ✅ Docker layer caching
- ✅ Production optimizations

**Happy Deploying! 🚀**
