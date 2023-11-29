pipeline {
  agent any
  stages {
    stage('Checkout Code') {
      steps {
        git 'https://github.com/ARJ2160/React-Blog-Backend'
      }
    }

    stage('') {
      steps {
        bat 'docker build ./Dockerfile -t arj1612/blog-backend-v2:latest .'
      }
    }

  }
}