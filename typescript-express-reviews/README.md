# typescript-express-reviews

This sample demonstrates integrating Mongoose with [`express`](https://www.npmjs.com/package/express).

## Prerequisites

To run or test this app, have either a stargate running *_OR_* start an AstraDB instance on https://astra.datastax.com/ 


## Testing
Update ASTRA_URI OR the STARGATE_* variables in the .env.test file and then run below

```sh
npm run start
```

Set `ASTRA_URI` environment variable to point to your Astra instance in below format
``
https://${databaseId}-${region}.apps.astra.datastax.com/${keyspace}?applicationToken=${applicationToken}
``


## Running

Update ASTRA_URI OR the STARGATE_* variables in the .env.local file and then run below

Start this example with:

```sh
npm run start
```

and then access it via `localhost:3000`.

Available routes:

- `/status`
