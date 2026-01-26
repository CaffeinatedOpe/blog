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
        stage('clone') {
      steps {
        container('buildah') {
          git branch: 'main', changelog: false, poll: false, url: 'https://mohdsabir-cloudside@bitbucket.org/mohdsabir-cloudside/java-app.git'
        }
      }
        }
        stage('build') {
      steps {
        container('buildah') {
          sh 'buildah build -t blog:latest .'
        }
      }
        }
        stage('login') {
      steps {
        container('buildah') {
          withCredentials([usernamePassword(credentialsId: 'ghcr-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
            sh 'buildah login -u $USERNAME -p $PASSWORD'
          }
        }
      }
        }
        stage('push') {
      steps {
        container('buildah') {
          sh 'buildah push blog:latest'
        }
      }
        }
    }
    post {
        always {
      container('buildah') {
        sh 'buildah logout'
      }
        }
    }
}
