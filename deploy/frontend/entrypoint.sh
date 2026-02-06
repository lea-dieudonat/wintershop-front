#!/bin/sh
set -e

echo "🚀 Starting WinterShop Frontend..."

# This script runs at container startup to inject runtime environment variables
# into the built JavaScript files (since they were compiled at build time)

# Create a JavaScript file with environment variables
cat > /usr/share/nginx/html/env-config.js <<EOF
window.ENV = {
  VITE_API_BASE_URL: "${VITE_API_BASE_URL}",
  VITE_STRIPE_PUBLIC_KEY: "${VITE_STRIPE_PUBLIC_KEY}",
  VITE_TOLGEE_API_KEY: "${VITE_TOLGEE_API_KEY}"
};
EOF

echo "✅ Environment variables injected!"
echo "🌐 API URL: ${VITE_API_BASE_URL}"
echo "🎉 Frontend is ready!"
