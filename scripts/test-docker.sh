#!/bin/bash

# Test Docker Build Locally
# This script helps you test the Docker build before pushing to production

echo "🐳 Testing Docker build locally..."

# Build the Docker image
echo "📦 Building Docker image..."
docker build -t tarkai-edtech-test .

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    echo "🚀 Starting container..."
    # Run the container
    docker run -d \
        --name tarkai-edtech-test \
        -p 5010:5010 \
        --env-file .env.local \
        tarkai-edtech-test
    
    if [ $? -eq 0 ]; then
        echo "✅ Container started successfully!"
        echo "📍 Application should be available at: http://localhost:5010"
        echo ""
        echo "To view logs: docker logs -f tarkai-edtech-test"
        echo "To stop: docker stop tarkai-edtech-test"
        echo "To remove: docker rm tarkai-edtech-test"
        echo "To remove image: docker rmi tarkai-edtech-test"
    else
        echo "❌ Failed to start container"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi
