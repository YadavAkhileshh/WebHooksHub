# 🚀 WebhookHub - Professional Webhook Testing Platform

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-20.x-green?style=for-the-badge&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/Docker-Ready-blue?style=for-the-badge&logo=docker" alt="Docker" />
  <img src="https://img.shields.io/badge/Kubernetes-Ready-326CE5?style=for-the-badge&logo=kubernetes" alt="Kubernetes" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License" />
</div>

<div align="center">
  <h3>🎯 Professional webhook monitoring and testing platform built for DevOps excellence</h3>
  <p><strong>Real-time monitoring • Enterprise security • Production-ready infrastructure</strong></p>
</div>

---

## ✨ What is WebhookHub?

WebhookHub is a **production-grade webhook testing and monitoring platform** designed for modern development teams. It provides real-time webhook inspection, secure endpoint management, and complete DevOps infrastructure with Kubernetes and ArgoCD support.

### 🎯 Perfect for:
- **API Development**: Test webhooks from Stripe, GitHub, Shopify, etc.
- **DevOps Teams**: Monitor webhook reliability and performance
- **Production Monitoring**: Track webhook health and metrics
- **Learning**: Understand webhook flows and API integrations

---

## 🚀 Quick Start

### Local Development
```bash
# Clone repository
git clone https://github.com/YadavAkhileshh/WebHooksHub.git
cd WebHooksHub

# Install dependencies
npm install
cd frontend && npm install && cd ..

# Start development environment
npm run dev
```

### Docker Compose (Recommended)
```bash
# Start all services
docker-compose up -d

# Access applications
# WebhookHub: http://localhost:3000
# Grafana: http://localhost:3001 (admin/admin)
# Prometheus: http://localhost:9090
```

### Kubernetes + ArgoCD
```bash
# Start Minikube
minikube start

# Deploy to Kubernetes
kubectl apply -f k8s/

# Get service URL
minikube service webhookhub-service -n webhookhub --url
```

---

## 🏗️ Architecture

### Frontend (React + Vite)
- ⚛️ **React 18** with modern hooks and Suspense
- 🎨 **Tailwind CSS** for professional styling
- ✨ **Framer Motion** for smooth animations
- 🔄 **Real-time updates** with automatic refresh
- 📱 **Responsive design** for all devices

### Backend (Node.js + Hono)
- 🚀 **Hono.js** - Ultra-fast web framework
- 📡 **RESTful API** with comprehensive endpoints
- 🔄 **Real-time webhook reception** and processing
- 💾 **PostgreSQL** for reliable data persistence
- 🔄 **Redis** for caching and pub/sub messaging
- 📊 **Prometheus metrics** for monitoring

### DevOps Infrastructure
- 🐳 **Docker** - Multi-container orchestration
- ⚙️ **Kubernetes** - Production deployment with auto-scaling
- 🔄 **ArgoCD** - GitOps continuous deployment
- 🗄️ **PostgreSQL** - Reliable data persistence
- 🔄 **Redis** - Real-time pub/sub messaging
- 📊 **Prometheus + Grafana** - Comprehensive monitoring
- 🔍 **Elasticsearch + Kibana** - Advanced log analysis

---

## 🔒 Security Features

### ✅ Production Security
- 🔐 **Environment variable isolation** - No hardcoded secrets
- 🛡️ **Input validation and sanitization** on all endpoints
- 👤 **Non-root Docker containers** for security
- 🔄 **Health checks and monitoring** for all services
- 📝 **Comprehensive audit logging**
- 🚫 **CORS protection** with configurable origins
- 🔑 **JWT-based authentication** ready for implementation

### 🔑 Secret Management
```bash
# Development (.env - never committed)
cp .env.example .env
# Edit .env with your secure values

# Production (use environment variables)
export POSTGRES_PASSWORD="your-secure-password"
export JWT_SECRET="your-jwt-secret-256-bit"
export SESSION_SECRET="your-session-secret"
```

---

## 📊 Monitoring & Observability

### Available Services
| Service | URL | Purpose | Credentials |
|---------|-----|---------|-------------|
| **WebhookHub** | http://localhost:3000 | Main application | - |
| **Grafana** | http://localhost:3001 | Metrics dashboards | admin/admin |
| **Prometheus** | http://localhost:9090 | Metrics collection | - |
| **Kibana** | http://localhost:5601 | Log analysis | - |

### Key Metrics
- Webhook request rates and response times
- Endpoint usage statistics and patterns
- System resource utilization
- Error rates and success ratios
- Database connection pool status
- Redis cache hit/miss ratios

---

## 🧪 API Documentation

### Webhook Management
```bash
# Create endpoint
POST /api/endpoints
Content-Type: application/json
{
  "name": "my-webhook-endpoint"
}

# List all endpoints
GET /api/endpoints

# Get endpoint details
GET /api/endpoints/:id

# Delete endpoint
DELETE /api/endpoints/:id
```

### Webhook Reception
```bash
# Receive webhook (supports all HTTP methods)
POST /w/:endpointId
PUT /w/:endpointId
PATCH /w/:endpointId
DELETE /w/:endpointId

# Get webhook history
GET /api/webhooks
GET /api/endpoints/:id/requests
```

### System Endpoints
```bash
# Health check
GET /health

# Prometheus metrics
GET /metrics

# API documentation
GET /api/docs
```

---

## 🔧 Configuration

### Environment Variables
```bash
# Application
NODE_ENV=production
PORT=3000
BASE_URL=https://your-domain.com

# Database
DATABASE_URL=postgresql://user:pass@host:5432/webhookhub

# Cache
REDIS_URL=redis://host:6379

# Security
JWT_SECRET=your-256-bit-secret-key
SESSION_SECRET=your-session-secret-key

# Monitoring (Optional)
ELASTICSEARCH_URL=http://elasticsearch:9200
GRAFANA_PASSWORD=secure-password
```

### Docker Configuration
```yaml
# docker-compose.yml includes:
# - WebhookHub application
# - PostgreSQL database
# - Redis cache
# - Prometheus monitoring
# - Grafana dashboards
# - Elasticsearch + Kibana logging
```

---

## ⚙️ Kubernetes Deployment

### Prerequisites
- Kubernetes cluster (minikube, EKS, GKE, AKS)
- kubectl configured
- Docker images built and pushed to registry

### Deployment
```bash
# Deploy all resources
kubectl apply -f k8s/

# Check deployment status
kubectl get pods -n webhookhub
kubectl get services -n webhookhub

# Access application
kubectl port-forward service/webhookhub-service 3000:80 -n webhookhub
```

### ArgoCD GitOps
```bash
# Install ArgoCD
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Deploy WebhookHub via ArgoCD
kubectl apply -f k8s/argocd-app.yaml

# Access ArgoCD UI
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

---

## 🧪 API Testing Examples

### Thunder Client / Postman Examples

#### 1. Health Check
```http
GET http://localhost:3000/health
Content-Type: application/json
```

**Expected Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-28T10:30:00.000Z",
  "uptime": 3600,
  "version": "1.0.0"
}
```

#### 2. Create Webhook Endpoint
```http
POST http://localhost:3000/api/endpoints
Content-Type: application/json

{
  "name": "stripe-payments"
}
```

**Expected Response:**
```json
{
  "id": "ep_abc123def456",
  "name": "stripe-payments",
  "url": "http://localhost:3000/w/ep_abc123def456",
  "createdAt": "2024-01-28T10:30:00.000Z"
}
```

#### 3. Send Test Webhook
```http
POST http://localhost:3000/w/ep_abc123def456
Content-Type: application/json
User-Agent: Stripe/1.0
Stripe-Signature: t=1234567890,v1=signature_here

{
  "id": "evt_1234567890",
  "object": "event",
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_1234567890",
      "amount": 2000,
      "currency": "usd",
      "status": "succeeded",
      "customer": "cus_1234567890"
    }
  },
  "created": 1234567890
}
```

**Expected Response:**
```json
{
  "received": true,
  "id": "wh_abc123def456",
  "timestamp": "2024-01-28T10:30:00.000Z"
}
```

#### 4. Get All Endpoints
```http
GET http://localhost:3000/api/endpoints
Content-Type: application/json
```

**Expected Response:**
```json
[
  {
    "id": "ep_abc123def456",
    "name": "stripe-payments",
    "url": "http://localhost:3000/w/ep_abc123def456",
    "createdAt": "2024-01-28T10:30:00.000Z",
    "requestCount": 5,
    "lastRequest": "2024-01-28T10:35:00.000Z"
  }
]
```

#### 5. Get Webhook History
```http
GET http://localhost:3000/api/webhooks
Content-Type: application/json
```

**Expected Response:**
```json
[
  {
    "id": "wh_abc123def456",
    "endpointId": "ep_abc123def456",
    "method": "POST",
    "headers": {
      "content-type": "application/json",
      "user-agent": "Stripe/1.0",
      "stripe-signature": "t=1234567890,v1=signature_here"
    },
    "body": {
      "id": "evt_1234567890",
      "type": "payment_intent.succeeded",
      "data": {...}
    },
    "timestamp": "2024-01-28T10:30:00.000Z",
    "ip": "192.168.1.100"
  }
]
```

#### 6. Get Specific Endpoint Requests
```http
GET http://localhost:3000/api/endpoints/ep_abc123def456/requests
Content-Type: application/json
```

#### 7. Delete Endpoint
```http
DELETE http://localhost:3000/api/endpoints/ep_abc123def456
Content-Type: application/json
```

**Expected Response:**
```json
{
  "deleted": true,
  "id": "ep_abc123def456"
}
```

### Real-World Webhook Examples

#### GitHub Webhook (Push Event)
```http
POST http://localhost:3000/w/your-endpoint-id
Content-Type: application/json
User-Agent: GitHub-Hookshot/abc123
X-GitHub-Event: push
X-GitHub-Delivery: 12345678-1234-1234-1234-123456789012

{
  "ref": "refs/heads/main",
  "before": "abc123def456",
  "after": "def456ghi789",
  "repository": {
    "id": 123456789,
    "name": "my-repo",
    "full_name": "username/my-repo",
    "private": false
  },
  "pusher": {
    "name": "username",
    "email": "user@example.com"
  },
  "commits": [
    {
      "id": "def456ghi789",
      "message": "Add new feature",
      "author": {
        "name": "Developer",
        "email": "dev@example.com"
      }
    }
  ]
}
```

#### Shopify Webhook (Order Created)
```http
POST http://localhost:3000/w/your-endpoint-id
Content-Type: application/json
User-Agent: Shopify/1.0
X-Shopify-Topic: orders/create
X-Shopify-Shop-Domain: myshop.myshopify.com

{
  "id": 1234567890,
  "email": "customer@example.com",
  "created_at": "2024-01-28T10:30:00-05:00",
  "updated_at": "2024-01-28T10:30:00-05:00",
  "number": 1001,
  "total_price": "199.99",
  "currency": "USD",
  "financial_status": "paid",
  "fulfillment_status": null,
  "line_items": [
    {
      "id": 987654321,
      "product_id": 123456789,
      "title": "Awesome Product",
      "quantity": 2,
      "price": "99.99"
    }
  ],
  "customer": {
    "id": 456789123,
    "email": "customer@example.com",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```

### PowerShell Testing Script

```powershell
# Complete WebhookHub API Test Script
$baseUrl = "http://localhost:3000"

# 1. Health Check
Write-Host "🔍 Testing Health Endpoint..." -ForegroundColor Yellow
$health = Invoke-RestMethod -Uri "$baseUrl/health" -Method GET
Write-Host "✅ Health Status: $($health.status)" -ForegroundColor Green

# 2. Create Endpoint
Write-Host "📝 Creating Webhook Endpoint..." -ForegroundColor Yellow
$endpointData = @{ name = "test-endpoint-$(Get-Date -Format 'yyyyMMdd-HHmmss')" } | ConvertTo-Json
$endpoint = Invoke-RestMethod -Uri "$baseUrl/api/endpoints" -Method POST -Body $endpointData -ContentType "application/json"
Write-Host "✅ Created Endpoint: $($endpoint.id)" -ForegroundColor Green
Write-Host "🔗 Webhook URL: $($endpoint.url)" -ForegroundColor Cyan

# 3. Send Test Webhooks
Write-Host "📡 Sending Test Webhooks..." -ForegroundColor Yellow

# Stripe-style webhook
$stripeWebhook = @{
    id = "evt_$(Get-Random)"
    type = "payment_intent.succeeded"
    data = @{
        object = @{
            id = "pi_$(Get-Random)"
            amount = 2000
            currency = "usd"
            status = "succeeded"
        }
    }
} | ConvertTo-Json -Depth 3

Invoke-RestMethod -Uri "$baseUrl/w/$($endpoint.id)" -Method POST -Body $stripeWebhook -ContentType "application/json" -Headers @{"User-Agent"="Stripe/1.0"}
Write-Host "✅ Sent Stripe webhook" -ForegroundColor Green

# GitHub-style webhook
$githubWebhook = @{
    ref = "refs/heads/main"
    repository = @{
        name = "test-repo"
        full_name = "user/test-repo"
    }
    commits = @(
        @{
            id = "abc123"
            message = "Test commit"
            author = @{
                name = "Test User"
                email = "test@example.com"
            }
        }
    )
} | ConvertTo-Json -Depth 3

Invoke-RestMethod -Uri "$baseUrl/w/$($endpoint.id)" -Method POST -Body $githubWebhook -ContentType "application/json" -Headers @{"User-Agent"="GitHub-Hookshot/abc123"; "X-GitHub-Event"="push"}
Write-Host "✅ Sent GitHub webhook" -ForegroundColor Green

# 4. Get Webhook History
Write-Host "📊 Fetching Webhook History..." -ForegroundColor Yellow
$webhooks = Invoke-RestMethod -Uri "$baseUrl/api/webhooks" -Method GET
Write-Host "✅ Total Webhooks Received: $($webhooks.Count)" -ForegroundColor Green

# 5. Get All Endpoints
Write-Host "📋 Fetching All Endpoints..." -ForegroundColor Yellow
$endpoints = Invoke-RestMethod -Uri "$baseUrl/api/endpoints" -Method GET
Write-Host "✅ Total Endpoints: $($endpoints.Count)" -ForegroundColor Green

# 6. Display Results
Write-Host "\n📈 Test Results Summary:" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan
Write-Host "Health Status: $($health.status)" -ForegroundColor White
Write-Host "Endpoint Created: $($endpoint.name)" -ForegroundColor White
Write-Host "Webhooks Sent: 2" -ForegroundColor White
Write-Host "Total Webhooks: $($webhooks.Count)" -ForegroundColor White
Write-Host "\n🎉 All tests completed successfully!" -ForegroundColor Green
Write-Host "🌐 Open WebhookHub: $baseUrl" -ForegroundColor Cyan
```

### Metrics Endpoint
```http
GET http://localhost:3000/metrics
Content-Type: text/plain
```

**Expected Response (Prometheus format):**
```
# HELP webhookhub_requests_total Total number of webhook requests
# TYPE webhookhub_requests_total counter
webhookhub_requests_total{method="POST",endpoint="ep_abc123"} 15

# HELP webhookhub_request_duration_seconds Request duration in seconds
# TYPE webhookhub_request_duration_seconds histogram
webhookhub_request_duration_seconds_bucket{le="0.1"} 10
webhookhub_request_duration_seconds_bucket{le="0.5"} 15
webhookhub_request_duration_seconds_bucket{le="1"} 15
```

---

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### Integration Testing
```bash
# Test webhook endpoints
curl -X POST http://localhost:3000/api/endpoints \
  -H "Content-Type: application/json" \
  -d '{"name": "test-endpoint"}'

# Send test webhook
curl -X POST http://localhost:3000/w/your-endpoint-id \
  -H "Content-Type: application/json" \
  -d '{"event": "test", "data": {"message": "Hello World"}}'
```

### Load Testing
```bash
# Install artillery
npm install -g artillery

# Run load test
artillery quick --count 100 --num 10 http://localhost:3000/health
```

---

## 🔍 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find process using port
netstat -ano | findstr :3000
# Kill process
taskkill /PID <process-id> /F
```

#### Database Connection Issues
```bash
# Check PostgreSQL status
docker-compose logs postgres

# Reset database
docker-compose down -v
docker-compose up -d
```

#### Memory Issues
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm start
```

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow ESLint configuration
- Write tests for new features
- Update documentation
- Use conventional commit messages

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Hono.js** for the lightning-fast backend
- **Docker** for containerization excellence
- **Kubernetes** for orchestration power
- **ArgoCD** for GitOps automation
- **Open Source Community** for inspiration

---

<div align="center">
  <h3>🚀 Ready to monitor your webhooks like a pro?</h3>
  <p><strong>Star ⭐ this repo if it helped you!</strong></p>
  
  <p>Built with ❤️ for the DevOps community</p>
</div>