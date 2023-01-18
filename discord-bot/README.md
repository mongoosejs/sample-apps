## Getting Started

1. Create a config.json with the keys from example.json and the values from the developer portal and your discord server.*
2. Run npm install
3. Set `ASTRA_URI` environment variable to point to your Astra instance in following format: `https://${databaseId}-${region}.apps.astra.datastax.com/${keyspace}?applicationToken=${applicationToken}`
3. Run node ./deploy-commands.js
4. Run node ./index.js

* `guildId` is obtained by going into your server's settings and clicking on the widget tab. The server id is the `guildId`.
* `clientId` is obtained by going to the discord developer portal, clicking your bot, and then clicking OAuth2.
* `token` is obtained by going to the discord developer portal, clicking your bot, and then clicking on Bot.
There will be a button to reset the token and this is by design. Discord will only show the token once so when you hit reset, copy it to a secure place.
* Make sure to enable slash commands when selecting bot permissions.

For more information on setting up your bot and adding it to your server: https://discordjs.guide/preparations/setting-up-a-bot-application.html

## Commands

Once the discord bot is running, you should be able to execute the following commands:

- `/ping`: replies "Pong!"
- `/count`: returns the number of documents currently in your local MongoDB collection.
- `/createdocument`: inserts a new document into your local MongoDB collection.

Below is a screenshot

![image](https://user-images.githubusercontent.com/1620265/213293087-53505a73-3038-4db8-b21b-d9149a5396ed.png)


Anytime you add or update commmands in the command folder, run step 3 again.