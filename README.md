# buy-european-made.eu

Here resides the v2 version of the [goeuropean.org](https://www.goeuropean.org)
website.

# Contributors

If you are a contributor, it's good that you familiarise yourself with the
README, and there are loads of useful information in the
[CONTRIBUTING.md](./CONTRIBUTING.md) to setup your development environment for
example.

# Prerequisites

## TODO software prerequisites

## TODO third party prerequisites

# TODO Build

## TODO Build locally

## Build docker

In order to build and run the project locally:

1. copy the content of the file `.env.example` to a new file called `.env`: `cp .env.example .env`
2. build and run the docker containers: `docker compose up -d`

- if you want to inspect the internal DB run this command instead: `docker compose -f docker-compose.yml -f docker-compose.local.yml up -d`,
  this will spin up also a _cloudBeaver_ instance.

### Connecting to the local DB

Once you build and start the application using `docker compose -f docker-compose.yml -f docker-compose.local.yml up -d`,
connect to `localhost:8978` and create a new admin user (this is just a cloudBeaver user -- pick any username/password you like).
After creating the user and logging in you can add the application database:

- click on the `+` sign at the top-left of the screen
- click on `find database`
- type localhost in the input field and press enter, a database should now appear in the list
- click on the database and configure it according to the values in the `.env` file, by default:
  - database: cms
  - user password: cms
  - user name: cms

# TODO Configuration
