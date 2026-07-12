#!/bin/bash
set -e

echo "Building auth-service..."
docker build -t auth-service:latest -f ./services/auth-service/Dockerfile .

echo "Building product-service..."
docker build -t product-service:latest -f ./services/product-service/Dockerfile .

echo "Building inventory-service..."
docker build -t inventory-service:latest -f ./services/inventory-service/Dockerfile .

echo "Building order-service..."
docker build -t order-service:latest -f ./services/order-service/Dockerfile .

echo "Building notification-service..."
docker build -t notification-service:latest -f ./services/notification-service/Dockerfile .
