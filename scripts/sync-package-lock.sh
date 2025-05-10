#!/bin/bash

# Script to synchronize package.json and package-lock.json

echo "Synchronizing package.json and package-lock.json..."

# Remove node_modules and package-lock.json
echo "Removing node_modules and package-lock.json..."
rm -rf node_modules package-lock.json

# Install dependencies to regenerate package-lock.json
echo "Installing dependencies to regenerate package-lock.json..."
npm install

echo "Done! package-lock.json has been regenerated and is now in sync with package.json."
echo "Please commit the updated package-lock.json file."
