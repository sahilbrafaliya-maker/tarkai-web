# 🔧 Port Change Summary - Port 5010

## Overview
The entire project has been updated to use **port 5010** instead of port 3000.

## Changes Made

### 1. Environment Configuration
- **`.env.local`** - Added `PORT=5010`

### 2. Application Scripts
- **`package.json`** - Updated start script to use `-p 5010`

### 3. Docker Configuration
- **`Dockerfile`**
  - Changed `EXPOSE 3000` → `EXPOSE 5010`
  - Changed `ENV PORT=3000` → `ENV PORT=5010`
  
- **`docker-compose.yml`**
  - Changed port mapping `"3000:3000"` → `"5010:5010"`
  - Updated healthcheck URL to use port 5010

### 4. Testing Scripts
- **`scripts/test-docker.sh`** - Updated port mapping and URLs
- **`scripts/test-docker.bat`** - Updated port mapping and URLs
- **`scripts/health-check.sh`** - Updated health check to port 5010

### 5. Deployment Scripts
- **`deployment/deploy.sh`**
  - Updated port mapping `-p 127.0.0.1:5010:5010`
  - Updated environment variable `PORT=5010`
  - Updated curl test to port 5010
  - Updated Nginx proxy_pass to `http://127.0.0.1:5010`

- **`deployment/fix_deploy.sh`**
  - Updated port mapping `-p 5010:5010`
  - Updated environment variable `PORT=5010`
  - Updated curl test to port 5010
  - Updated Nginx proxy_pass to `http://127.0.0.1:5010`

### 6. Documentation
- **`README.md`** - Updated local dev URL to `http://localhost:5010`
- **`QUICK_REFERENCE.md`** - Updated all port references to 5010
- **`DEPLOYMENT.md`** - Updated troubleshooting and health check commands
- **`MIGRATION_SUMMARY.md`** - Updated architecture diagram

## What You Need to Do

### For Local Development
1. **Restart your dev server** (important!)
   - Stop the current server (Ctrl+C)
   - Run `npm run dev` again
   - Access at: http://localhost:5010

### For Production/VPS Deployment
When you deploy next time, the deployment scripts will automatically use port 5010. However, **you need to update the Nginx configuration on your VPS** manually:

```bash
# SSH to VPS
ssh -p 22192 root@94.249.213.192

# Edit the Nginx config
sudo nano /etc/nginx/sites-available/tarkaiedtech

# Change this line:
#   proxy_pass http://127.0.0.1:3000;
# To:
#   proxy_pass http://127.0.0.1:5010;

# Test Nginx config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

## URLs After Change

- **Local Dev**: http://localhost:5010
- **Production**: http://tarkaiedtech.com (unchanged)
- **Server IP**: http://94.249.213.192 (unchanged)

## Files Modified

1. `.env.local`
2. `package.json`
3. `Dockerfile`
4. `docker-compose.yml`
5. `scripts/test-docker.sh`
6. `scripts/test-docker.bat`
7. `scripts/health-check.sh`
8. `deployment/deploy.sh`
9. `deployment/fix_deploy.sh`
10. `README.md`
11. `QUICK_REFERENCE.md`
12. `DEPLOYMENT.md`
13. `MIGRATION_SUMMARY.md`

---

**All changes complete! ✅**
