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
- [Git-Hooks](#git-hooks)
  - [Troubleshhoting Husky errors](#troubleshhoting-husky-errors)
  <!--toc:end-->

# Contributing guidelines

Please follow the [guidelines](https://github.com/Buy-European-Made/.github-private/blob/main/profile/README.md).

# Base template

This project is based upon the [Payload Website Template](https://github.com/payloadcms/payload/blob/main/templates/website).

You can find the Payload official documentation [here](https://payloadcms.com/docs/getting-started/what-is-payload).

# Development environment

Here are the instructions for quickly setting up a development environment. You can chose to do either local or Docker.
The [docker compose development environment](#docker-development-environment) is the easiest.

Generally speaking it's good to have the Node JS tools isntalled anyway:

- [NodeJS](https://nodejs.org/en/download) 18+.
- [pnpm](https://pnpm.io/) (`npm i -g pnpm`).

You should also have a [PostgreSQL](https://www.postgresql.org) database running
on your machine or somewhere accessible.

## Local development environment

### Local prerequisites

- [NodeJS](https://nodejs.org/en/download) 18+.
- [pnpm](https://pnpm.io/) (`npm i -g pnpm`).

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

- A NodeJS container that will hot reload the application on change.
- A [PostgreSQL](https://www.postgresql.org) database for the application to store its data.

### DB client

If you wish to inspect the contents of the Database, you can start docker with
additional options to start a "web PostreSQL client":

Instead of the usual `docker compose up -d` command, you can use:

```sh
docker compose -f docker-compose.yml -f docker-compose.local.yml up -d
```

The client will be accessible at [localhost:8978](http://localhost:8978) and
create a new admin user (this is just a cloudBeaver user -- pick any
username/password you like). After creating the user and logging in you can add
the application database:

- Click on the `+` sign at the top-left of the screen.
- Click on `find database`.
- Type localhost in the input field and press enter, a database should now appear in the list.
- Click on the database and configure it according to the values in the `.env` file, by default:
  - Database: `cms`.
  - User password: `cms`.
  - User name: `cms`.

## Go to the application web page

The application will be available in your browser at:

- [localhost:3000](http://localhost:3000) for the end user website. It will be
  empty by default, until you create your own pages in the admin UI.
- [localhost:3000/admin](http://localhost:3000/admin) for the CMS administration UI.

In development mode the application will only render pages when they are
requested, and it takes a few moments to do so. To keep your sanity, it is
strongly advised you keep an eye on the application logs to determine if the
application is still building the page, or legitimately bugged.

For the docker logs simply run `docker compose logs -f`, or `docker compose
logs -f payload` if you only want the application logs.

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
You mostly build pages from "blocks", i.e. "Small" React components.

You can also define predefined routes / pages for a given collection by adding
them to [./src/app/(frontend)/](<./src/app/(frontend)>), e.g. You most likely
want a page for each of your products, this is where you would define them.

## Creating a collection

1. Make a collection in [./src/collections](./src/collections).
1. Import it and add it to the payload configuration in [./src/payload.config.ts](./src/payload.config.ts).

## Creating a block

1. Create a block in [./src/blocks](./src/blocks) (take example on your
   neighbors), you need both the `config` and the `Component` files.
1. Import the config and add it to the `./src/blocks/RenderBlocks.tsx` file.
1. Import the Component and add it to the pages collection.

# Git-Hooks

We use [Husky](https://typicode.github.io/husky/#/) to manage git hooks.

The following hooks are available:

- `pre-commit`: Runs `pnpm lint-staged` to check the code formatting and linting on staged files.
  - lint-staged config can be found in `package.json`
- `pre-push`: Runs `pnpm lint` and `pnpm format:check` to check the code formatting and linting on all files.

Skip the hooks by running `git commit --no-verify` or `git push --no-verify`.

## Troubleshhoting Husky errors

If Husly is complaining about "empty commits": this means you have made "code
style" changes which were completely erased by the linting process, ultimately
resulting in an empty commit.

If Husky is complaining about file permissions. Try running the following in the root of your project:

```sh
sudo chown --reference . --recursive .
```
