#!/bin/bash

# Starting react-backend
echo "Starting react-backend!"
cd react-backend
npm start &
BACKEND=$!

# Starting client
echo "Starting client!"
cd ../client
npm start

kill ${BACKEND}
