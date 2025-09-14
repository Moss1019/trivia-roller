# trivia-roller
A technical test to implement a trivia questionnaire

# Service requirements
The application requires the open trivia db service to be available, https://opentdb.com/api.php

# Technologies
- Java 23
- Gradle
- Docker

# Running the application
## Locally
This is a quarkus application, it can be started in development mode by running gradle quarkusDev. Building the application also goes via gradle, with gradle quarkusBuild.
The app can then be started with java -jar quarkus-run.jar in the travia-roller-api/build/quarkus-app directory
```
cd travia-roller
gradle quarkusBuild
cd travia-roller-api/build/quarkus-app
java -jar quarkus-run.jar
```
## Docker
There is a docker image available as well, in the _docker directory, run build.sh. This will put the image together.
The app can then be started with docker compose up.
```
cd travia-roller/trivia-roller-api/_docker
./build.sh
docker compose up
```
# Deployed to AWS
The app is also deployed to an ec2 instance, it can be accessed here http://ec2-3-75-199-90.eu-central-1.compute.amazonaws.com:8080/trivia-start
