#!/bin/bash

# TARK AI EdTech - Health Check Script
# Run this on your VPS to check the deployment status

echo "🏥 TARK AI EdTech - Health Check"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
    fi
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "ℹ️  $1"
}

# Check Docker
echo "🐳 Checking Docker..."
if command -v docker &> /dev/null; then
    print_status 0 "Docker is installed"
    docker --version
else
    print_status 1 "Docker is NOT installed"
fi
echo ""

# Check Docker Compose
echo "🔧 Checking Docker Compose..."
if command -v docker-compose &> /dev/null; then
    print_status 0 "Docker Compose is installed"
    docker-compose --version
else
    print_status 1 "Docker Compose is NOT installed"
fi
echo ""

# Check if deployment directory exists
echo "📁 Checking deployment directory..."
if [ -d "/var/www/tarkaiedtech" ]; then
    print_status 0 "Deployment directory exists"
else
    print_status 1 "Deployment directory does NOT exist"
fi
echo ""

# Check if .env.production exists
echo "⚙️  Checking environment file..."
if [ -f "/var/www/tarkaiedtech/.env.production" ]; then
    print_status 0 ".env.production exists"
else
    print_warning ".env.production does NOT exist"
    echo "   Create it with: nano /var/www/tarkaiedtech/.env.production"
fi
echo ""

# Check Docker containers
echo "📦 Checking Docker containers..."
cd /var/www/tarkaiedtech 2>/dev/null
if [ $? -eq 0 ]; then
    if docker-compose ps 2>/dev/null | grep -q "Up"; then
        print_status 0 "Container is running"
        docker-compose ps
    else
        print_status 1 "Container is NOT running"
        print_info "Start with: cd /var/www/tarkaiedtech && docker-compose up -d"
    fi
else
    print_warning "Could not access deployment directory"
fi
echo ""

# Check Nginx
echo "🌐 Checking Nginx..."
if command -v nginx &> /dev/null; then
    print_status 0 "Nginx is installed"
    
    if systemctl is-active --quiet nginx; then
        print_status 0 "Nginx is running"
    else
        print_status 1 "Nginx is NOT running"
        print_info "Start with: systemctl start nginx"
    fi
    
    # Test Nginx configuration
    if nginx -t &> /dev/null; then
        print_status 0 "Nginx configuration is valid"
    else
        print_status 1 "Nginx configuration has errors"
        print_info "Check with: nginx -t"
    fi
else
    print_status 1 "Nginx is NOT installed"
fi
echo ""

# Check application availability
echo "🔍 Checking application..."
if curl -sf http://localhost:5010 > /dev/null; then
    print_status 0 "Application is responding on port 5010"
else
    print_status 1 "Application is NOT responding on port 5010"
fi
echo ""

# Check disk space
echo "💾 Checking disk space..."
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $DISK_USAGE -lt 80 ]; then
    print_status 0 "Disk space OK ($DISK_USAGE% used)"
else
    print_warning "Disk space is running low ($DISK_USAGE% used)"
    print_info "Clean up with: docker system prune -a"
fi
echo ""

# Check memory
echo "🧠 Checking memory..."
FREE_MEM=$(free -m | awk 'NR==2 {print $4}')
if [ $FREE_MEM -gt 200 ]; then
    print_status 0 "Memory OK (${FREE_MEM}MB free)"
else
    print_warning "Memory is low (${FREE_MEM}MB free)"
fi
echo ""

# Check backups
echo "💾 Checking backups..."
BACKUP_COUNT=$(ls -1 /opt/backups/tarkai-edtech/backup_*.tar.gz 2>/dev/null | wc -l)
if [ $BACKUP_COUNT -gt 0 ]; then
    print_status 0 "Found $BACKUP_COUNT backup(s)"
    print_info "Latest backup:"
    ls -lth /opt/backups/tarkai-edtech/ | head -2
else
    print_warning "No backups found"
fi
echo ""

# Check firewall
echo "🔥 Checking firewall..."
if command -v ufw &> /dev/null; then
    if ufw status | grep -q "Status: active"; then
        print_status 0 "Firewall is active"
        print_info "Allowed ports:"
        ufw status | grep ALLOW
    else
        print_warning "Firewall is NOT active"
    fi
else
    print_warning "UFW firewall is not installed"
fi
echo ""

# Summary
echo "================================"
echo "📊 Health Check Summary"
echo "================================"
echo ""

# Quick status check
ALL_GOOD=true

if ! command -v docker &> /dev/null; then ALL_GOOD=false; fi
if ! command -v docker-compose &> /dev/null; then ALL_GOOD=false; fi
if ! [ -d "/var/www/tarkaiedtech" ]; then ALL_GOOD=false; fi
if ! docker-compose ps 2>/dev/null | grep -q "Up"; then ALL_GOOD=false; fi
if ! systemctl is-active --quiet nginx; then ALL_GOOD=false; fi

if $ALL_GOOD; then
    echo -e "${GREEN}✅ All systems operational!${NC}"
else
    echo -e "${YELLOW}⚠️  Some issues detected. Please review the report above.${NC}"
fi

echo ""
echo "📝 Useful commands:"
echo "  View logs:    cd /var/www/tarkaiedtech && docker-compose logs -f"
echo "  Restart app:  cd /var/www/tarkaiedtech && docker-compose restart"
echo "  Stop app:     cd /var/www/tarkaiedtech && docker-compose down"
echo "  Start app:    cd /var/www/tarkaiedtech && docker-compose up -d"
echo "  Clean Docker: docker system prune -a"
echo ""
