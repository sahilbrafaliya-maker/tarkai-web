#!/bin/bash
# Clean start
docker stop tarkaiedtech-web || true
docker rm tarkaiedtech-web || true

# Rebuild image
docker build --no-cache -t tarkaiedtech-web .

# Start container with host networking for simplest setup, OR port mapping
# Using host network avoids port mapping issues but only works on Linux
# For safety, we stick to port mapping but bind to 0.0.0.0
docker run -d \
  --name tarkaiedtech-web \
  -p 5010:5010 \
  --restart always \
  --env PORT=5010 \
  --env HOSTNAME="0.0.0.0" \
  tarkaiedtech-web

# Wait for Next.js to start
echo "Waiting for container to initialize..."
sleep 10

# Test local connection inside the server
curl -v http://127.0.0.1:5010

# Setup Nginx
cat <<EOF > /etc/nginx/sites-available/tarkaiedtech
server {
    listen 80;
    server_name tarkaiedtech.com www.tarkaiedtech.com;

    location / {
        proxy_pass http://127.0.0.1:5010;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable site
rm -f /etc/nginx/sites-enabled/default
rm -f /etc/nginx/sites-enabled/tarkaiedtech
ln -s /etc/nginx/sites-available/tarkaiedtech /etc/nginx/sites-enabled/

# Reload Nginx
nginx -t && systemctl restart nginx
echo "Deployment Finished."
