#!/bin/bash

echo "Building Client"
cd client
npm install &

echo "Building react-backend"
cd ../react-backend
npm install &

