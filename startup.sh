#!/bin/bash

# Starting react-backend
echo "Starting react-backend!"
cd react-backend
npm start &

# Starting client
echo "Starting client!"
cd ../client
npm start
echo "Done! go to localhost:3001"
