pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps { git branch: 'main', url: 'https://github.com/ramishminhas91-star/mern-food.git'}
    }

    stage('Prepare Env File') {
        steps {
             withCredentials([string(credentialsId: 'JWT_SECRET', variable: 'JWT_SECRET')]) {
            sh '''
            echo "PORT=5000" > backend/.env
            echo "MONGO_URI=mongodb://mongo:27017/mern_food" >> backend/.env
            echo "JWT_SECRET=${JWT_SECRET}" >> backend/.env
            '''
                 }
            }
    }

    stage('Build Docker Images') {
      steps {
        sh 'docker-compose build'
      }
    }

    stage('Deploy Containers') {
      steps {
        sh 'docker-compose down'
        sh 'docker-compose up -d'
      }
    }
  }
  post {
    success { echo '✅ Deployment successful!' }
    failure { echo '❌ Deployment failed.' }
  }
}
