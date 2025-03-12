# Contributing to the project

If you want to work on the project, here are the information you need to get
started.

<!--toc:start-->
- [Contributing guidelines](#contributing-guidelines)
- [Base template](#base-template)
- [Development environment](#development-environment)
  - [Local development environment](#local-development-environment)
    - [Local prerequisites](#local-prerequisites)
    - [Local setup](#local-setup)
  - [Docker development environment](#docker-development-environment)
    - [Docker prerequisites](#docker-prerequisites)
    - [Docker setup](#docker-setup)
<!--toc:end-->


# Contributing guidelines

Please follow the guidelines published at
https://github.com/Buy-European-Made/.github-private/blob/main/profile/README.md


# Base template

This project is based upon the [Payload Website Template](https://github.com/payloadcms/payload/blob/main/templates/website).

More broadly speaking this is a [Next.js](https://nextjs.org) project.


# Development environment

Here are the instructions for quickly setting up a development environment.

The [docker compose development environment](#docker-development-environment) is the easiest.


## Local development environment

### Local prerequisites

- NodeJS
- pnpm (`npm i -g pnpm`).

You should also have a [PostgreSQL](https://www.postgresql.org) database running
on your machine or somewhere accessible.


### Local setup

Copy the example .env file:
```sh
cp ./.env.example .env
```
In `.env`, make sure to modify the `DATABASE_URI` variables to point to your
PostgreSQL DB. A postgreSQL connection string looks like this:
`postgresql://[user[:password]@][host][:port][/dbname][?param1=value1&param2=value2]`

Install the NPM dependencies:

```
pnpm install
```

And run the development server for the application:
```sh
pnpm dev
```
The application will be available at `http://localhost:3000` in your browser, it
may take a few seconds for the app to render the first time.


## Docker development environment

### Docker prerequisites

- docker with docker compose


### Docker setup

You can use the provided example .env file as is:
```sh
cp ./.env.example .env
```

You can spin up the Docker development stack with the following command:
```sh
docker compose up -d
```

- `docker compose ps` will show you the running containers.
- `docker compose logs -f` will show you the logs.

This will start:
- a NodeJS container that will hot reload the application on change.
- a postgresql database for the application to store its data.

The application will be available at `http://localhost:3000` in your browser, it
may take a few seconds for the app to render the first time.


