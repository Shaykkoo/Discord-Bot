require('dotenv').config();
const { SlashCommandBuilder, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('welcome-embed')
    .setDescription('Welcome Embed'),

    async execute(interaction) {
        

        /* const role1 = interaction.options.getRole('Visitor'); */

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle(" <a:Welcome:1139199055357026435> **Welcome to GitGud Server**")
        .setURL("https://discord.gg/NkDSpXKf7z")
        /* .setAuthor({name: `GitGud`, iconURL: `https://cdn.discordapp.com/attachments/1004032905636495434/1138839802859491410/image.png`}) */
        .setDescription(" ")
        .setThumbnail(`https://cdn.discordapp.com/attachments/1082808904322384083/1082808904565669969/gitgud-thepruld.gif`)
        .addFields({name: `📝**・__Recruitment__**`, value: `**Want to join GitGud ? Click on the button and follow the instructions below.**`, inline: true})
        .addFields({name: `👤**・__Visitor__**`, value: `**You've come only to chat with GitGud members.**`, inline: true})
        .addFields({name: ` `, value: `:warning: __*Please do not click on the visitor button to speed up your application by contacting Commander.*__`, inline: false})
        .addFields({name: ` `, value: `*If you have a problem during the process, please contact <@776766024795553804> by private message.*`, inline: false})
        .setFooter({ text: "GitGud", iconURL: `https://cdn.discordapp.com/attachments/1004032905636495434/1138839802859491410/image.png`}
        );
        
        const button = new ButtonBuilder()
            .setCustomId('recruitment-button')
            .setLabel('Recruitment')
            .setEmoji(`📝`)
            .setStyle(ButtonStyle.Success)
        
        const button2 = new ButtonBuilder()
            .setCustomId('visitor-button')
            .setLabel('Visitor')
            .setEmoji(`👤`)
            .setStyle(ButtonStyle.Primary)

        const row = new ActionRowBuilder()
			.addComponents(button, button2);

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: "You must have the administrator permission.", ephemeral: true});

        await interaction.reply({embeds: [embed], components: [row]});
        
       /*  const collector = await interaction.channel.createMessageComponentCollector();

        collector.on('collect', async (i) =>{
            const member = i.member;

            if (i.CustomId === 'visitor-button'){
                member.roles.add(role1);
                i.reply({ content: `You have now ${role1.name} role`, ephemeral: true})
            }
        }) */

    }
}