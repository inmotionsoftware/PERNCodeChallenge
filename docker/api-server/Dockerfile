FROM gradle:7.2-jdk16-openj9 as build

WORKDIR /app
COPY src/backend/EntertainmentApi/ .
RUN gradle build

FROM build as runtime

EXPOSE 8080
ENTRYPOINT ["gradle", "bootRun"]

FROM build as migrations
ENTRYPOINT ["gradle", "flywayMigrate", "-i"]

