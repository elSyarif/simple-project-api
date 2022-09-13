## Description

Simple API, With nestjs

## Installation

```bash
$ npm install
```

## Configuration
### Copy Environment
```bash
$ cp .env.example .env
```
### Environment setup
```bash
DB_DRIVER=
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=

#JWT TOKEN SETUP
JWT_SECRET='HFDIvjorivej083fngkj9384USGHVFjgvnl@qdhjkfhcIU9834DHFSCNIJlhuHDBNFC34_DJSIOFDH'
JWT_EXPIRE_TIME='15m'

#ENCRYPT KEY
KEY_BUFFER='fec4722ef6ed8668edd8aefdc3b81e27df0024f16fdada2d0e2291dfd520649e'
IV_BUFFER='ae2f67dee9d409ed40d4d6a199777f08'
```
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
