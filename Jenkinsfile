pipeline {
  agent any
  stages {
    stage('Checkout Code') {
      steps {
        git 'https://github.com/ARJ2160/React-Blog-Backend'
      }
    }

    stage('Build') {
      steps {
        sh 'docker build -f React-Blog-Backend/Dockerfile -t arj1612/blog-backend-v2:latest .'
      }
    }

    stage('Log into Dockerhub') {
      environment {
        DOCKERHUB_USER = 'arj1612'
        DOCKERHUB_PASSWORD = 'GH4kgLRx4Xv?B.C'
      }
      steps {
        sh 'docker login -u $DOCKERHUB_USER -p $DOCKERHUB_PASSWORD'
      }
    }

  }
}