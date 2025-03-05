pipeline {
    agent { label 'victorybeach.nl' }

    environment {
        SITE = "victorybeach.nl"
        HTML = "ngnix/html/${SITE}"
        GITHUB_REPO = "stolkie78/${SITE}"
        SOURCE_DIR = "${HTML}"
        DESTINATION_DIR = "/home/debian/websites/${HTML}"
    }

    triggers {
        pollSCM('* * * * *') // Alternatief als webhooks niet werken
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
                checkout scm
            }
        }

        stage('Prepare Destination') {
            steps {
                echo 'Preparing destination directory...'
                sh '''
                if [ ! -d ${DESTINATION_DIR} ]; then
                    sudo mkdir -p ${DESTINATION_DIR}
                fi
                sudo rm -rf ${DESTINATION_DIR}/
                '''
            }
        }

        stage('Copy Application') {
            steps {
                echo 'Copying application to destination...'
                sh '''
                sudo cp -r ${SOURCE_DIR} ${DESTINATION_DIR}
                sudo chown -R debian:debian ${DESTINATION_DIR}
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}