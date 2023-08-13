const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription(`Ban a user`)
    .addUserOption(option => option.setName('user').setDescription(`The member you want to ban`).setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription(`The reason for banning the member`).setRequired(true)),
    async execute(interaction, client) {

        const users = interaction.options.getUser('user');
        const ID = users.id;
        const banUser = client.users.cache.get(ID)

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return await interaction.reply({ content: "You must have the ban permission", ephemeral: true});
        if (interaction.member.id === ID) return await interaction.reply({ content: "You cannot ban yourself", ephemeral: true});

        let reason = interaction.options.getString('reason');
        if (!reason) reason = "No reason given";

        const embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`:white_check_mark: ${banUser.tag} has been __**banned**__  | Reason : ${reason}`)
    
        const dmEmbed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`:white_check_mark: You were **banned** from ${interaction.guild.name} | ${reason}`)

        await interaction.guild.bans.create(banUser.id, {reason}).catch(err => {
            return interaction.reply({ content: "You cannot ban this member", ephemeral: true})
        })

        await banUser.send({ embeds: [dmEmbed]}).catch(err =>{
            return;
        })

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
}