const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('hkzk')
    .setDescription('Try and See'),
    async execute(interaction, client) {
        await interaction.reply({ content: 'The Strongest'});
    }
}