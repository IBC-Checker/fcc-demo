ARG imagefactory_registry=p21d4020250r001.azurecr.io/
FROM ${imagefactory_registry}base/openjdk:11-alpine

USER root
COPY target/clientfccFO.jar app.jar
COPY build/lib/thirdparty/postgresql-42.2.19.jar postgresql-42.2.19.jar
RUN mkdir -p /logs
RUN chown root /logs
#RUN chown -R  /logs
RUN chmod 755 /logs
RUN mkdir -p /static
RUN chown root /static
RUN chmod 755 /static
ADD warcontent/content /static/content
ADD warcontent/config /static/config
USER finastra
#ENTRYPOINT [ "java", "-Djava.security.egd=file:/dev/urandom", "-jar", "app.jar"]
ENTRYPOINT [ "java", "-Djava.security.egd=file:/dev/urandom", "-cp", "app.jar",  "-Dloader.path=postgresql-42.2.19.jar","org.springframework.boot.loader.PropertiesLauncher"]
