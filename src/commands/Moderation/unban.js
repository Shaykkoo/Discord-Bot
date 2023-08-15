const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription(`Unban a user`)
    .addUserOption(option => option.setName('user').setDescription(`The member you want to unban`).setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription(`The reason for unbanning the member`).setRequired(true)),
    async execute(interaction, client) {

        const userID = interaction.options.getUser('user');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return await interaction.reply({ content: "You must have the unban permission", ephemeral: true});
        if (interaction.member.id === userID) return await interaction.reply({ content: "You cannot unban yourself", ephemeral: true});

        let reason = interaction.options.getString('reason');
        if (!reason) reason = "No reason given";

        const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle(`👼 **${userID.username} has been Unbanned** 👼`)
        .setDescription(`*By* : <@${interaction.member.id}>\r *Reason* : **${reason}**`)

        await interaction.guild.bans.fetch()
        .then(async bans => {
            if (bans.size == 0 ) return await interaction.reply({ content: "There is no one banned from this guild", ephemeral: true})
            let bannedID = bans.find(ban => ban.user.id == userID);
            if (!bannedID ) return await interaction.reply({content: "The ID Stated is not banned from this server", ephemeral: true})

            await interaction.guild.bans.remove(userID, reason).catch(err => {
                return interaction.reply({ content: "You cannot unban this member", ephemeral: true})
            })
        })

        

        await interaction.reply({ embeds: [embed] });
    }
}