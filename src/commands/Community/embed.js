const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('embedtest')
    .setDescription(`Test Embed`),
    async execute(interation) {


        const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("GG's Recruitment")
        .setURL("https://discord.gg/NkDSpXKf7z")
        .setAuthor({name: `GitGud`, iconURL: `https://cdn.discordapp.com/attachments/1004032905636495434/1138839802859491410/image.png`})
        .setDescription(` Welcome to GG's Recruitment`)
        .setThumbnail(`https://cdn.discordapp.com/attachments/1004032905636495434/1138839802859491410/image.png`)
        .addFields({name: `First Field`, value: `First Field Vlaue`, inline: true})
        .addFields({name: `Second Field`, value: `Second Field Vlaue`, inline: false})
        .setTimestamp()
        .setFooter({ text: "A Footer", iconURL: `https://cdn.discordapp.com/attachments/1004032905636495434/1138839802859491410/image.png`})

        await interation.reply({embeds: [embed], ephemeral: true})
        
    }
}