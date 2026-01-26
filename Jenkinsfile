pipeline {
  agent {
    kubernetes {
      yaml '''
        apiVersion: v1
        kind: Pod
        spec:
          containers:
          - name: docker
            image: docker:latest
            command:
            - cat
            tty: true
        '''
    }
  }
  stages {
    stage('Clone') {
      steps {
        container('docker') {
          git branch: 'main', changelog: false, poll: false, url: 'https://github.com/CaffeinatedOpe/blog'
        }
      }
    }
    stage('Build-Docker-Image') {
      steps {
        container('docker') {
          sh 'docker build -t ss69261/testing-image:latest .'
        }
      }
    }
    stage('Login-to-github') {
      steps {
        container('docker') {
          withCredentials([usernamePassword(credentialsId: 'ghcr-credentials',
                                  usernameVariable: 'USER',
                                  passwordVariable: 'PASS')]) {
            sh 'docker login -u $USER -p $PASS'
                                  }
        }
      }
    }
    stage('Push-Images-to-github') {
      steps {
        container('docker') {
          sh 'docker push ss69261/testing-image:latest'
        }
      }
    }
  }
    post {
      always {
        container('docker') {
          sh 'docker logout'
        }
      }
    }
}
