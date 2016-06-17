# Rate a Talk

Rate and leave feedbacks for talks at Agile Asutralia

## Setup Dev Environment

### DB Setup
Install postgres, i.e.

 `brew install postgres`

Once installed start it up and create 'agile-australia' db, i.e.

  `createdb agile-australia`

Run create-tables.sql

  `psql -D agile-australia db/create-tables.sql`

Run populate-data.sql

  `psql -D agile-australia db/create-tables.sql`

## Install

Install dependencies

  `npm install`

## Run

When running the app locally it also builds all of the associated assets.

To run and watch ui locally:

  `npm run ui-start`

To run and watch node server locally:

  `npm run server-start`

## Deployment

The master branch from this project is automatically built and deployed to heroku. The imortant details here are the contets of Procfile and the 'heroku-postbuild' script in package.json.

The app url on Heroku: https://rate-a-talk.herokuapp.com/

## Additonal notes

All dependencies required to build/run an app must be installed as non-dev dependencies, since heroku does not install dev deps automatically by default.
