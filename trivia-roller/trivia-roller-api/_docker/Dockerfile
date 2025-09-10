FROM eclipse-temurin:23.0.2_7-jre-ubi9-minimal

ADD quarkus-app /var/app

WORKDIR /var/app

ENTRYPOINT [ "java", "-jar", "quarkus-run.jar" ]