
# Ichgram/api-gateway

Ichgram/api-gateway is an application that is part of the microservice architecture of the ichgram system.
The purpose of this microservice is to handle all API requests and distribute them among the microservices.


## Installation

### Prepare ichgram/api-gateway for instalation

```bash
  cp .env.example .env
```
* Fill all empty variables with your credentials

### Install ichgram/api-gateway with npm

```bash
  npm install
  npm run dev
```

### Install ichgram/api-gateway with docker

```bash
  docker-compose build
  docker-compose up -d
```
## Deployment

### To run ichgram/api-gateway project in production

```bash
  npm run build
  npm run prod
```


## Troubleshooting

So far, there is no information here.
If you encountered a problem and resolved it, please describe the problem and the steps to resolve it here.

