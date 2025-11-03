'use strict';

// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');
const path = require('node:path');
const mongoose = require('mongoose');
const express = require('express');
const studio = require('@mongoosejs/studio/express');

const app = express();
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });



client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', async () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

run();

async function run() {
	// connect to mongoose
	await mongoose.connect('mongodb://localhost:27017');
	app.use('/studio',  await studio('/studio/api', mongoose));
	app.listen(3000, () => {
		console.log('Server is running on port 3000');
	});

	// Login to Discord with your client's token
	client.login(token);
}
