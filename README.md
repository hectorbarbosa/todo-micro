## Description

[Nest](https://github.com/nestjs/nest) Todo application backend. NestJs, TypeOrm, PostgreSQL, RabbitMQ, Docker

## Installation

```bash
$ git clone https://github.com/hectorbarbosa/todo-micro.git 
```

## Running the app

```bash
# start postgres and rabbitmq services first
$ docker compose up postgres rabbitmq -d 

# start auth microservice and gateway application
$ docker compose up auth todo 

```