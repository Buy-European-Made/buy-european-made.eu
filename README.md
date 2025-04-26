# buy-european-made.eu

Here resides the v2 version of the [goeuropean.org](https://www.goeuropean.org)
website.

This project is built on top of the [PayloadCMS](https://payloadcms.com/) Javascript framework.
This repository contains the "entire stack" so-to-speak.

<!--toc:start-->

- [Contributors](#contributors)
- [Prerequisites](#prerequisites)
  - [Docker dependencies](#docker-dependencies)
  - [Local dependencies](#local-dependencies)
  - [Services](#services)
- [Build the application](#build-the-application)
  - [Build with Docker](#build-with-docker)
    - [Troubleshooting permission issues](#troubleshooting-permission-issues)
  - [Build with Node](#build-with-node)
- [Configuration](#configuration)
- [Run the application](#run-the-application)
  - [Run with Docker](#run-with-docker)
  - [Run locally](#run-locally)
  <!--toc:end-->

# Contributors

If you are a contributor, it's good that you familiarise yourself with the
README, and there are loads of useful information in the
[CONTRIBUTING.md](./CONTRIBUTING.md) to setup your development environment for
example.

If you plan to buid and run the application in "production", please follow below.

# Prerequisites

Depending on the way you want to run the application, either directly on your
machine or with Docker, you will need additional software and services.

## Docker dependencies

The only thing you need to build and run the application with Docker is [Docker](https://docs.docker.com) itself.

## Local dependencies

If you do not go with Docker, you will need:

- [NodeJS](https://nodejs.org/en/download) 18+.
- [pnpm](https://pnpm.io/) (`npm i -g pnpm`).

## Services

This application needs a [PostgreSQL](https://www.postgresql.org) database to store its data.

# Build the application

To build the application, the PostgreSQL database must be running and reachable.

## Build with Docker

First thing first, you need to declare the `DATABASE_URI` environment variable
in a `.env` file.

If your DB is reachable at `db_host`:

```sh
echo 'DATABASE_URI=postgres://user:password@db_host:db_port/db_name' > .env
docker buildx build --tag goeu:test .
```

If your DB is running on your local machine:

```sh
echo 'DATABASE_URI=postgres://user:password@db_host:db_port/db_name' > .env
docker buildx build --network host --tag goeu:test .
```

e.g.

```sh
echo 'DATABASE_URI=postgres://myadmin:SomePassword@mypostgresdb.com:5432/goeuropean' > .env
docker buildx build --network host --tag goeu:test .
```

e.g. If you followed the development environment instructions in the CONTRIBUTING:

```sh
docker buildx build --network host --tag goeu:test .
```

If everything went according to plan, you should now have a `goeu:test` Docker image on your machine.

### Troubleshooting permission issues

If you are having trouble with "Access denied" errors, this might be Docker's fault, us the following command from the projects' root to easily fix it:

```sh
sudo chown --reference . --recursive .
```

## Build with Node

1. `pnpm install`
1. ```sh
   echo 'DATABASE_URI=postgres://user:password@db_host:db_port/db_name' > .env
   pnpm build
   ```

TODO: where are the build files?

# Configuration

Once your application is built (either way), configuration is done with environment variables.

- `DATABASE_URI`: Connection string to the PostgreSQL database.
- `PAYLOAD_SECRET`: (string) Used to encrypt JWT tokens.
- `NEXT_PUBLIC_SERVER_URL`: e.g. `http://localhost:3000`. Used to configure
  [CORS](https://developer.mozilla.org/fr/docs/Web/HTTP/Guides/CORS), format
  links and more. No trailing slash.
- `CRON_SECRET`: (string) Secret used to authenticate cron jobs.
- `PREVIEW_SECRET`: (string) Used to validate preview requests.

# Run the application

## Run with Docker

You can define all of the [environment variables](#Configuration) in a `.env` file, and then:

```sh
docker run --env-file .env --publish 3000:3000 goeu:test
```

## Run locally

TODO
