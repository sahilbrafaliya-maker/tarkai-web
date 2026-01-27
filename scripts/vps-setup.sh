#!/bin/bash

# TARK AI EdTech - VPS Initial Setup Script
# This script sets up the VPS server for automated Docker deployments

echo "🚀 TARK AI EdTech - VPS Setup"
echo "================================"
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "❌ Please run as root (use sudo)"
    exit 1
fi

echo "📦 Step 1: Updating system..."
apt update && apt upgrade -y

echo ""
echo "🐳 Step 2: Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    echo "✅ Docker installed"
else
    echo "ℹ️  Docker already installed"
fi

echo ""
echo "🔧 Step 3: Installing Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    apt install docker-compose -y
    echo "✅ Docker Compose installed"
else
    echo "ℹ️  Docker Compose already installed"
fi

echo ""
echo "🌐 Step 4: Installing Nginx..."
if ! command -v nginx &> /dev/null; then
    apt install nginx -y
    echo "✅ Nginx installed"
else
    echo "ℹ️  Nginx already installed"
fi

echo ""
echo "🔥 Step 5: Configuring firewall..."
apt install ufw -y

# Check current SSH port
SSH_PORT=$(ss -tlnp | grep sshd | awk '{print $4}' | cut -d':' -f2 | head -1)
if [ -z "$SSH_PORT" ]; then
    SSH_PORT=22
fi

echo "ℹ️  Detected SSH port: $SSH_PORT"

ufw allow $SSH_PORT/tcp
ufw allow 80/tcp
ufw allow 443/tcp

echo "y" | ufw enable

echo "✅ Firewall configured"

echo ""
echo "📁 Step 6: Creating deployment directories..."
mkdir -p /var/www/tarkaiedtech
mkdir -p /opt/backups/tarkai-edtech

echo "✅ Directories created"

echo ""
echo "⚙️  Step 7: Enabling services..."
systemctl enable docker
systemctl start docker
systemctl enable nginx
systemctl start nginx

echo "✅ Services enabled and started"

echo ""
echo "🔐 Step 8: Setting up environment file..."
if [ ! -f "/var/www/tarkaiedtech/.env.production" ]; then
    cat > /var/www/tarkaiedtech/.env.production << 'EOF'
# Production Environment Variables
# IMPORTANT: Update these values!

EMAIL_USER=sahil.b.rafaliya@gmail.com
EMAIL_PASS=qliw qfww fupe hveb

NODE_ENV=production

# Add any other production variables below:
# NEXT_PUBLIC_API_URL=https://api.tarkaiedtech.com
# DATABASE_URL=postgresql://...
EOF
    echo "✅ Created .env.production"
    echo "⚠️  IMPORTANT: Edit /var/www/tarkaiedtech/.env.production with your actual values!"
else
    echo "ℹ️  .env.production already exists"
fi

echo ""
echo "🧹 Step 9: Cleaning up..."
apt autoremove -y
apt autoclean

echo ""
echo "================================"
echo "✅ VPS Setup Complete!"
echo "================================"
echo ""
echo "📋 Summary:"
echo "  ✓ Docker installed and running"
echo "  ✓ Docker Compose installed"
echo "  ✓ Nginx installed and running"
echo "  ✓ Firewall configured (ports: $SSH_PORT, 80, 443)"
echo "  ✓ Deployment directories created"
echo "  ✓ Environment file template created"
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Edit environment variables:"
echo "   nano /var/www/tarkaiedtech/.env.production"
echo ""
echo "2. Ensure GitHub Actions has SSH access:"
echo "   - Add VPS_SSH_KEY secret to GitHub repository"
echo ""
echo "3. Push to main branch to trigger deployment"
echo ""
echo "4. (Optional) Set up SSL certificate:"
echo "   apt install certbot python3-certbot-nginx -y"
echo "   certbot --nginx -d tarkaiedtech.com -d www.tarkaiedtech.com"
echo ""
echo "🎉 Your VPS is ready for automated deployments!"
