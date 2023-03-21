'use strict';

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
    console.log(new Date(), 'ping');
		await interaction.reply('Pong!');
	},
};