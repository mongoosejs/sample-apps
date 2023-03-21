# discord-bot

This sample demonstrates using Mongoose to build a sample 
[Discord](https://discord.com) bot.

## Setup

Make sure you have a local Stargate instance running as described on the [main page](../README.md) of this repo.

## Running This Example

1. Create a `.env` file with the keys from `.env.example` and the values from the developer portal and your Discord server.*
1. Run npm install
1. Run node ./deploy-commands.js
1. Run node ./index.js

* `DISCORD_GUILD_ID`: go into your server's settings and click on "Widget". The "Server ID" is the `guildId`.
* `DISCORD_CLIENT_ID`: go to the [Discord developer portal](https://discord.com/developers/applications), click your bot, and then click "OAuth2". The "Application ID" is the `clientId`.
* `DISCORD_TOKEN`: go to the [Discord developer portal](https://discord.com/developers/applications), click your bot, and then click on "Bot".
* Make sure to enable slash commands when selecting bot permissions.

For more information on setting up your bot and adding it to your server: https://discordjs.guide/preparations/setting-up-a-bot-application.html

<img src="https://user-images.githubusercontent.com/1620265/226195771-52cad494-ad35-4098-83fd-b22001fc2de9.png">

<img src="https://user-images.githubusercontent.com/1620265/226195959-ade64ca0-1279-438e-beae-4793ed877cc4.png">

<img src="https://user-images.githubusercontent.com/1620265/226196076-947e5afa-d6ba-4e8c-ab94-8a937dc4dc0e.png">

## Commands

Once the Discord bot is running, you should be able to execute the following commands:

- `/ping`: replies "Pong!"
- `/count`: returns the number of documents currently in your local MongoDB collection.
- `/createdocument`: inserts a new document into your local MongoDB collection.

Below is a screenshot

![image](https://user-images.githubusercontent.com/1620265/213293087-53505a73-3038-4db8-b21b-d9149a5396ed.png)

Anytime you add or update commands in the command folder, run step 3 again.