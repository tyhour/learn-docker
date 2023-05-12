# Learn Docker

## Table of contents

-   [Usage](#usage)
    -   [Setup docker-compose.yml config file](#docker-compose-file)
    -   [Project Structure](#project-structure)
    -   [Docker Configuration](#docker-configuration)
    -   [Spring Dockerfile](#spring-dockerfile)
    -   [React Dockerfile](#react-dockerfile)
    -   [Launch Spring Project](#launch-spring-project)
    -   [Launch React Project](#launch-react-project)
  

## Usage

This project was built with [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) as Containers.

### Docker Compose File

Docker compose file we use for combination all docker images. Example we have 3 images like [postgres](https://hub.docker.com/_/postgres), [spring](docker/spring-dockerfile) and [react](docker/react-dockerfile).

- Check out example file here [docker-compose.yml](docker-compose.yml)

### Project Structure
    .
    ├── docker
        ├──nginx                # Config Nginx Server for React (alternatively `default.conf`)
        ├──project              # Control on project folder (alternatively `react & spring`)
            ├──react            # React Project
            ├──spring           # Spring Project
        ├──react-dockerfile     # Docker file for React Project
        ├──spring-dockerfile    # Docker file for Spring Project
    ├── docker-compose.yml      # Use for build multiple images & create multiple containers
    └── README.md

### Docker Configuration

- Firstly you need to install [Docker](https://docs.docker.com/engine/install/) in your machine.
- For Ubuntu [Install Docker](https://docs.docker.com/engine/install/ubuntu/)

After Docker is installed, now you can run the following command for automatically to create containers image.

```
cd ~
sudo apt-get update
sudo apt-get install git git-lfs -y
git clone https://github.com/tyhour/learn-docker.git
cd learn-docker
docker compose build --no-cache && docker compose up --force-recreate -d
```

***Note [git-lfs](https://git-lfs.com/) for clone or push large file from git

After running the Docker command, you should have containers as below:

- postgres-db-cont
    - Ports 5433 instead of 5432
- spring-api-cont
    - Ports 8081 instead of 8080
- react-ui-cont
    - Ports 3001 instead of 3000

Check out the documentation [Docker Hub](https://hub.docker.com/)

### Spring Dockerfile
---
> Check out the file here [spring-dockerfile](/docker/spring-dockerfile)

```
FROM openjdk:11
WORKDIR /app/spring
COPY project/spring/registration-v2.jar ./ROOT.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "ROOT.jar"]
```

*** Note: You can also check out the documentation of [Dockerfile](https://docs.docker.com/engine/reference/builder/) for more information

### React Dockerfile
---
> Check out the file here [react-dockerfile](/docker/react-dockerfile)

```
FROM node:16.18.1 as build
WORKDIR /app/react
COPY project/react ./
RUN npm install --force
RUN npm run build

# Deploy on NGINX
FROM nginx:1.23.2
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/react/build /usr/share/nginx/html
#RUN chown -R nginx:nginx /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

*** Note: You can also check out the documentation of [Dockerfile](https://docs.docker.com/engine/reference/builder/) for more information

### Launch Spring Project

> Use your Public IP Address or Domain Name instead of localhost 

`http://localhost:8081`

### Launch React Project

> Use your Public IP Address or Domain Name instead of localhost 

`http://localhost:3001`


