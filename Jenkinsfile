pipeline {
  agent any
  stages {
    stage('Checkout Code') {
      steps {
        git(url: 'https://github.com/ARJ2160/React-Blog-Backend', branch: 'master')
      }
    }

    stage('Build Image') {
      steps {
        bat 'docker build -t arj1612/blog-backend-v2:latest .'
      }
    }

    stage('Log in to Docker') {
      environment {
        DOCKERHUB_USERNAME = 'arj1612'
        DOCKERHUB_PASSWORD = 'GH4kgLRx4Xv?B.C'
      }
      steps {
        bat 'docker login -u %DOCKERHUB_USERNAME% -p %DOCKERHUB_PASSWORD%'
      }
    }

    stage('Push build to Docker') {
      steps {
        bat 'docker push arj1612/blog-backend-v2:latest'
      }
    }

  }
}