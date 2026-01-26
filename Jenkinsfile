pipeline {
    agent {
        kubernetes {
      yaml '''
            apiVersion: v1
            kind: Pod
            spec:
              containers:
              - name: buildah
                image: quay.io/buildah/stable:latest
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
          git branch: 'main', changelog: false, poll: false, url: 'https://mohdsabir-cloudside@bitbucket.org/mohdsabir-cloudside/java-app.git'
        }
      }
        }
        stage('Build-Docker-Image') {
      steps {
        container('docker') {
          sh 'buildah build -t blog:latest .'
        }
      }
        }
        stage('Login-Into-Docker') {
      steps {
        container('docker') {
          withCredentials([usernamePassword(credentialsId: 'ghcr-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
            sh 'buildah login -u $USERNAME -p $PASSWORD'
          }
        }
      }
        }
        stage('Push-Images-Docker-to-DockerHub') {
      steps {
        container('docker') {
          sh 'buildah push blog:latest'
        }
      }
        }
    }
    post {
        always {
      container('docker') {
        sh 'buildah logout'
      }
        }
    }
}
