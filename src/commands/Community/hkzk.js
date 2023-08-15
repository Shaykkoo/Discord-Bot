const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('hkzk')
    .setDescription('Try and See'),
    async execute(interaction) {

        const embed = new EmbedBuilder()
        .setColor("9E0808")
        .setTitle(" 💪 __**Hkzk The Strongest**__ 🤙 ")
        .setDescription(" ")
        .setURL("https://cdn.discordapp.com/attachments/1004032991477104740/1141019438712373338/images.png")
        .setImage(`https://cdn.discordapp.com/attachments/1004032991477104740/1141019438712373338/images.png`)

        await interaction.reply({ embeds: [embed]});
    }
}