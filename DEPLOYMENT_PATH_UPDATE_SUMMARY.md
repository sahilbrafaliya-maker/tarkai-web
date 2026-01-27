# 📂 Deployment Path Update Summary

## Overview
The deployment directory has been updated from `/opt/tarkai-edtech` to **/var/www/tarkaiedtech** to match your server's file structure.

## Changes Made

### 1. GitHub Actions Workflow
- **`.github/workflows/deploy.yml`**
  - Updated `DEPLOY_DIR` to `/var/www/tarkaiedtech`
  - Updated `BACKUP_DIR` to `/var/www/backups/tarkaiedtech`

### 2. Scripts
- **`scripts/vps-setup.sh`** - Updated installation and configuration paths
- **`scripts/health-check.sh`** - Updated health check paths

### 3. Documentation
- **`DEPLOYMENT.md`** - Updated all setup instructions and file structure
- **`README.md`** - Updated production env file path
- **`QUICK_REFERENCE.md`** - Updated commands
- **`MIGRATION_SUMMARY.md`** - Updated deployment paths
- **`SETUP_COMPLETE.md`** - Updated verification steps

## Required Actions on VPS

Since the deployment path has changed, you need to set up the new directory on your VPS:

```bash
# SSH to VPS
ssh -p 22192 root@94.249.213.192

# Create new directories
sudo mkdir -p /var/www/tarkaiedtech
sudo mkdir -p /var/www/backups/tarkaiedtech

# Move existing .env.production (if you had one in /opt)
if [ -f "/opt/tarkai-edtech/.env.production" ]; then
    sudo mv /opt/tarkai-edtech/.env.production /var/www/tarkaiedtech/
else
    # Or create a new one
    sudo nano /var/www/tarkaiedtech/.env.production
fi

# (Optional) Clean up old directory
# sudo rm -rf /opt/tarkai-edtech
# sudo rm -rf /opt/backups/tarkaiedtech
```

## Next Deployment
The next time you push to `main`, GitHub Actions will automatically deploy to `/var/www/tarkaiedtech`! 🚀
