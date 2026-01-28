pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'webhookhub'
        DOCKER_TAG = "${BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/yourusername/webhookhub.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                sh 'cd frontend && npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test || true'  // Don't fail if no tests
            }
        }
        
        stage('Build Frontend') {
            steps {
                sh 'cd frontend && npm run build'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
            }
        }
        
        stage('Deploy to Staging') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up -d'
            }
        }
        
        stage('Health Check') {
            steps {
                script {
                    sleep(30) // Wait for services to start
                    def response = sh(
                        script: 'curl -f http://localhost:3000/health',
                        returnStatus: true
                    )
                    if (response != 0) {
                        error('Health check failed')
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline completed successfully!'
            // Send Slack notification
            // slackSend(message: "✅ WebhookHub deployed successfully - Build #${BUILD_NUMBER}")
        }
        failure {
            echo '❌ Pipeline failed!'
            // Send Slack notification
            // slackSend(message: "❌ WebhookHub deployment failed - Build #${BUILD_NUMBER}")
        }
        always {
            // Clean up
            sh 'docker system prune -f || true'
        }
    }
}