#!/bin/bash

# 1. Stop and remove existing container
echo "Stopping existing container..."
docker stop tarkaiedtech-web || true
docker rm tarkaiedtech-web || true

# 2. Build Docker image with no cache to ensure fresh code
echo "Building Docker image..."
docker build --no-cache -t tarkaiedtech-web .

# 3. Run Docker container
# Explicitly binding to 0.0.0.0:5010 on host to map to container's 5010
echo "Starting container..."
docker run -d \
  --name tarkaiedtech-web \
  -p 127.0.0.1:5010:5010 \
  --restart always \
  --env PORT=5010 \
  --env HOSTNAME="0.0.0.0" \
  tarkaiedtech-web

# 4. Wait for it to be ready
echo "Waiting for container to start..."
sleep 5

# 5. Check if curl works locally
echo "Checking local connectivity..."
curl -v http://127.0.0.1:5010

# 6. Setup Nginx
echo "Configuring Nginx..."
# Ensure directory exists
sudo mkdir -p /etc/nginx/sites-available
sudo mkdir -p /etc/nginx/sites-enabled

# Copy config (Assuming this script is run from the project root where deployment/nginx-app.conf exists)
# If running manually, we assume the file content is provided or present.
# Here we copy if file exists, else we write it.
if [ -f "deployment/nginx-app.conf" ]; then
    sudo cp deployment/nginx-app.conf /etc/nginx/sites-available/tarkaiedtech
else
    # Fallback if file not found (copy-paste scenario)
    cat <<EOF | sudo tee /etc/nginx/sites-available/tarkaiedtech
server {
    listen 80;
    server_name tarkaiedtech.com www.tarkaiedtech.com;

    location / {
        proxy_pass http://127.0.0.1:5010;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF
fi

# Fix symlink
sudo rm -f /etc/nginx/sites-enabled/tarkaiedtech
sudo ln -s /etc/nginx/sites-available/tarkaiedtech /etc/nginx/sites-enabled/

# Test and Reload Nginx
echo "Testing Nginx config..."
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "Reloading Nginx..."
    sudo systemctl reload nginx
    echo "Deployment Complete! Visit http://tarkaiedtech.com"
else
    echo "Nginx config test failed!"
    exit 1
fi
