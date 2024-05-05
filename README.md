## Description

This project is an authentication nestjs project utilizing TypeORM(PostgreSQL) and Passport.js(JWT).

## Prerequisite

Install Node >= 18.0.0 and [Docker](https://docs.docker.com/engine/install/ubuntu/)

## Running the app

```bash
# watch mode
$ npm run docker:dev
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run docker:e2e
```

## Summary

This project uses a docker container to run nestjs and built-in PostgreSQL image.
After running the watch mode, visit [here](http://localhost:3000/help), where all entry points can be tested manually.
Especially, e2e tests are done within the docker container, which is an efficient way in case of applying CI workflow.
