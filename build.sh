#!/bin/bash

echo "Building Client"
cd client
rm -rf node_modules/ package-lock.json
npm install &

echo "Building react-backend"
cd ../react-backend
rm -rf node_modules/ package-lock.json
npm install &
