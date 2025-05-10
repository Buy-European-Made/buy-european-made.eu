# buy-european-made.eu

Here resides the v2 version of the [goeuropean.org](https://www.goeuropean.org)
website.

This project is built on top of the [PayloadCMS](https://payloadcms.com/) Javascript framework.
This repository contains the "entire stack" so-to-speak.

<!--toc:start-->

- [buy-european-made.eu](#buy-european-madeeu)
- [Contributors](#contributors)
- [Prerequisites](#prerequisites)
  - [Services](#services)
- [Build the application](#build-the-application)
  - [Install the npm dependencies](#install-the-npm-dependencies)
  - [Configuration](#configuration)
  - [Apply the migration](#apply-the-migration)
  - [Build the Docker image](#build-the-docker-image)
    - [Troubleshooting permission issues](#troubleshooting-permission-issues)
- [Configuration](#configuration)
- [Run the application](#run-the-application)
<!--toc:end-->

# Contributors

If you are a contributor, it's good that you familiarise yourself with the
README, and there are loads of useful information in the
[CONTRIBUTING.md](./CONTRIBUTING.md) to setup your development environment for
example.

If you plan to buid and run the application in "production", please follow below.

# Prerequisites

You will need this software in order to work with the application:

- [NodeJS](https://nodejs.org/en/download) 18+.
- [pnpm](https://pnpm.io/) (`npm i -g pnpm`).
- [Docker](https://docs.docker.com).

## Services

This application needs a [PostgreSQL](https://www.postgresql.org) database to store its data.

# Build the application

These are the instructions to build the application starting with a blank DB.

NextJS needs to be able to connect to the database to compile static pages
ahead of time.

If you want to quickly start a database as a Docker container, you can do:

```sh
docker compose --file docker-compose.local.yml --file docker-compose.yml up postgres --detach
```

## Install the npm dependencies

`pnpm install`

## Configuration

Create the `.env` file with the configuration values described in the
[configuration](#configuration) section ([example file](./.env.example)).

The only value that actually matters (for building the app) is `DATABASE_URI`
(you still need to define the rest).

Examples values for `DATABASE_URI` :

```sh
DATABASE_URI=postgres://user:password@db_host:db_port/db_name
DATABASE_URI=postgres://myadmin:SomePassword@mypostgresdb.com:5432/goeuropean
```

If you started the DB as a Docker container as described earlier, it would be:

```sh
DATABASE_URI=postgres://cms:cms@localhost:5432/cms
```

## Apply the migration

`pnpm payload migrate`

## Build the Docker image

```sh
docker buildx build --network host --tag goeu:test .
```

### Troubleshooting permission issues

If you are having trouble with "Access denied" errors for some files, this
might be Docker's fault, use the following command from the projects' root to
fix it:

```sh
sudo chown --reference . --recursive .
```

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

You can define all of the [environment variables](#configuration) in a `.env`
file, and then:

```sh
docker run --env-file .env --publish 3000:3000 goeu:test
```
