const { SlashCommandBuilder } = require('discord.js');
const Bot = require('../bot-model')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('count')
		.setDescription('counts documents in the database'),
	async execute(interaction) {
        const num = await Bot.countDocuments();
        console.log(num);
		await interaction.reply(num.toString());
	},
};