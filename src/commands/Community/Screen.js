require('dotenv').config();
const { SlashCommandBuilder, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('screen-embed')
    .setDescription('Screenshot channel'),

    async execute(interaction) {
        

        /* const role1 = interaction.options.getRole('Visitor'); */

    const embed = new EmbedBuilder() 
        .setColor("33FFAC")
        .setTitle("**Screenshot Here**")
        .setURL("https://discord.gg/NkDSpXKf7z")
        .setImage(`https://cdn.discordapp.com/attachments/1004032905636495434/1139343945109885039/Screenshot_20230811_014403_RaidtheDungeon.jpg`)
        /* .setAuthor({name: `GitGud`, iconURL: `https://cdn.discordapp.com/attachments/1004032905636495434/1138839802859491410/image.png`}) */
        .setDescription(":warning: __**Send all screenshots in Full Screen, we can verify your level and name in same time !**__")
        /* .setThumbnail(`https://cdn.discordapp.com/attachments/1082808904322384083/1082808904565669969/gitgud-thepruld.gif`) */
        .addFields({name: `<:Contrib:1139001315138220032> **・__Contribution__**`, value: `Send a Contribution screenshot in your previous guild.`, inline: true})
        .addFields({name: `<:Tier_icon:1139001835806531664> **・__Tier__**`, value: `Send your Tier Ranking screenshot.`, inline: false})
        .addFields({name: `<:HoL:1139199071714807918> **・__Craftings__**`, value: `Send all your mythics craft screenshot.`, inline: false})
        .addFields({name: ` `, value: `__***LIKE THIS***__ 👇`, inline: false})
        .setFooter({ text: "GitGud", iconURL: `https://cdn.discordapp.com/attachments/1004032905636495434/1138839802859491410/image.png`})
        const embed2 = new EmbedBuilder()
        .setURL("https://discord.gg/NkDSpXKf7z")
        .setImage(`https://cdn.discordapp.com/attachments/1004032905636495434/1139343945357344818/Screenshot_20230811_014413_RaidtheDungeon.jpg`)
        const embed3 = new EmbedBuilder()
        .setURL("https://discord.gg/NkDSpXKf7z")
        .setImage(`https://cdn.discordapp.com/attachments/1004032905636495434/1139343945617379459/Screenshot_20230811_014432_RaidtheDungeon.jpg`)
        const embed4 = new EmbedBuilder()
        .setURL("https://discord.gg/NkDSpXKf7z")
        .setImage(`https://cdn.discordapp.com/attachments/1004032905636495434/1139343945856471180/Screenshot_20230811_014504_RaidtheDungeon.jpg`)
        

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "You must have the administrator permission.", ephemeral: true});

        await interaction.reply({embeds: [embed, embed2, embed3, embed4]});

    }
}