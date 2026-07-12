🛒 E-Commerce Microservices Platform

A production-inspired e-commerce platform built using Node.js microservices with a complete DevOps CI/CD pipeline using Docker, Kubernetes, Helm, Jenkins, and AWS.

⸻

Architecture

The application is built using the following microservices:

* Authentication Service
* Product Service
* Inventory Service
* Order Service
* Notification Service

Supporting infrastructure:

* PostgreSQL
* Redis
* Kafka
* Kubernetes Ingress
* Horizontal Pod Autoscaler (HPA)

⸻

Tech Stack

Backend

* Node.js
* Express.js

Database

* PostgreSQL
* Redis

Messaging

* Apache Kafka

Containerization

* Docker
* Docker Compose

Orchestration

* Kubernetes
* Helm

CI/CD

* Jenkins

Cloud

* AWS ECR
* AWS EKS
* AWS Load Balancer
* Terraform

⸻

Project Structure

ecommerce-project/
├── services/
│   ├── auth-service
│   ├── product-service
│   ├── inventory-service
│   ├── order-service
│   └── notification-service
│
├── shared/
│
├── helm/
│   └── ecommerce-project/
│
├── k8s/
│
├── scripts/
│
├── jenkins/
│   ├── Dockerfile.jenkins
│   └── Jenkinsfile
│
├── docker-compose.yml
│
└── README.md

⸻

Features

* Microservice architecture
* JWT Authentication
* Product Management
* Inventory Management
* Order Processing
* Notification Service
* Redis Caching
* Kafka Event Messaging
* PostgreSQL Database
* Kubernetes Deployment
* Helm Packaging
* Jenkins CI/CD Pipeline
* Horizontal Pod Autoscaling

⸻

Running Locally

Clone Repository

git clone <repository-url>
cd ecommerce

⸻

Docker Compose

docker compose up --build

⸻

Kubernetes

Apply manifests

kubectl apply -f k8s/

or deploy using Helm

helm install ecommerce-project helm/ecommerce-project

⸻

Jenkins Pipeline

The pipeline performs:

* Workspace verification
* Dependency installation
* Docker image build
* Helm lint
* Helm template validation
* Helm deployment
* Deployment verification
* Smoke testing

⸻

Kubernetes Resources

* Deployments
* Services
* ConfigMaps
* Secrets
* Persistent Volumes
* Persistent Volume Claims
* Ingress
* Horizontal Pod Autoscaler

⸻

DevOps Workflow

Developer

↓

Git Push

↓

Jenkins Pipeline

↓

Docker Image Build

↓

Helm Validation

↓

Kubernetes Deployment

↓

Smoke Test

⸻

Future Enhancements

* Deploy to AWS EKS
* Push images to Amazon ECR
* Infrastructure provisioning using Terraform
* Monitoring using Prometheus & Grafana
* Logging using ELK Stack
* GitHub Actions support
* SonarQube integration
* Trivy image scanning

⸻

Learning Outcomes

This project demonstrates hands-on experience with:

* Microservices
* Docker
* Docker Compose
* Kubernetes
* Helm
* Jenkins
* CI/CD Pipelines
* PostgreSQL
* Redis
* Kafka
* Kubernetes Ingress
* Horizontal Pod Autoscaling
* Production-style application deployment

⸻

License

This project is intended for learning, demonstration, and portfolio purposes.
