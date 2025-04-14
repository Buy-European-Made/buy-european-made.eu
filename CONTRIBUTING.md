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
  - [Go to the web page](#go-to-the-web-page)
- [How to Payload](#how-to-payload)
  - [Creating a collection](#creating-a-collection)
  - [Creating a block](#creating-a-block)
  <!--toc:end-->

# Contributing guidelines

Please follow the guidelines published at
https://github.com/Buy-European-Made/.github-private/blob/main/profile/README.md

# Base template

This project is based upon the [Payload Website Template](https://github.com/payloadcms/payload/blob/main/templates/website).
You can find their documentation [here](https://payloadcms.com/docs/getting-started/what-is-payload).

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

## Docker development environment

### Docker prerequisites

- [Docker](https://docs.docker.com) with docker compose.

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
- a [PostgreSQL](https://www.postgresql.org) database for the application to store its data.

## Go to the web page

The application will be available in your browser at:

- [localhost:3000](http://localhost:3000) for the end user website.
- [localhost:3000/admin](http://localhost:3000/admin) for the CMS administration UI.

In development mode the application will only render pages when they are
requested, and it takes a few moments to do so. To keep your sanity it is
strongly advised you keep an eye on the application logs to determine if the
application is still building the page, or legitimately bugged.

For the docker logs simply run `docker compose logs -f`.

# How to Payload

Here's a quick explanation of how Payload works:

- Collections are group of "things", and each collection has its own table in the DB.
- Documents are items in a collection (row in a table).
- Fields are columns in a document (cell in a row).

So typically you would create collections for each important "entity" in your DB, for us it's:

- Categories.
- Subcategories.
- Products.
- Replaced products.

The `Pages` collection is a little special as it's where CMS users can create pages for the website's end users.
You mostly build pages from "blocks".

You can also define predefined routes / pages for a given collection by adding them to [./src/app/(frontend)/](<./src/app/(frontend)>).

## Creating a collection

1. Make a collection in [./src/collections](./src/collections).
1. Import it and add it to the payload configuration in [./src/payload.config.ts](./src/payload.config.ts).

## Creating a block

1. Create a block in [./src/blocks](./src/blocks) (take example on your
   neighbors), you need both the `config` and the `Component` files.
1. Import the config and add it to the `./src/blocks/RenderBlocks.tsx` file.
1. Import the Component and add it to the pages collection.
