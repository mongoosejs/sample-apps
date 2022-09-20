const { SlashCommandBuilder } = require('discord.js');
const Bot = require('../bot-model');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createdocument')
		.setDescription('creates a document'),
	async execute(interaction) {
        console.log('hello');
        await Bot.create({ name: 'I am a document'});
		await interaction.reply('done!');
	},
};