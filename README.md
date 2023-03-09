# sample-apps

Official sample apps for [stargate-mongoose](https://npmjs.com/package/stargate-mongoose).

## Getting Started

Each directory contains an isolated sample Node.js application.
The following is a list of available sample apps.

* [discord-bot](discord-bot)
* [netlify-functions-ecommerce](netlify-functions-ecommerce)
* [typescript-express-reviews](typescript-express-reviews)

We recommend trying the [netlify-functions-ecommerce](netlify-functions-ecommerce) app first.

## Prerequisites

In order to run these demos, you'll need to have [Node.js](https://nodejs.org) and  installed. 

You'll also need to run a copy of the Stargate infrastructure stack including the JSON API. 
The simplest way to do this is by using the script found under the [bin](bin) directory 
to start the stack with [Docker](https://docker.com):

```
cd stargate-mongoose-sample-apps 
bin/start_json_api.sh
```