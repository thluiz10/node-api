pipeline {
    agent {
        docker { image 'node:alpine' }
    }
    stages {
        stage('Install project dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Tests and code coverage') {
            steps {
                sh 'npm run coverage'
            }
        }

        stage('Check dependencies') {
            steps {
                sh './run-dependency-check.sh'
            }
        }

        stage('Sonar scanner') {
            steps {
                sh 'npm run sonar'
            }
        }
    }
}

