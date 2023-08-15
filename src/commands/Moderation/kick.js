const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`kick`)
    .setDescription(`Kick a user`)
    .addUserOption(option => option.setName('user').setDescription(`The member you want to kick`).setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription(`The reason for kicking the member`).setRequired(true)),
    async execute(interaction, client) {

        const kickUser = interaction.options.getUser('user');
        const kickMember = await interaction.guild.members.fetch(kickUser.id);
        /* const channel = interaction.channel; */

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await interaction.reply({ content: "You must have the Kick Members permission"});
        if (!kickMember) return await interaction.reply({content : 'The user mentioned is no longer within the server', ephemeral: true});
        if (!kickMember.kickable) return await interaction.reply({content: 'I cannot kick this user because they have roles above me.', ephemeral: true})
        if (interaction.member.id === kickMember) return await interaction.reply({ content: "You cannot kick yourself", ephemeral: true});


        let reason = interaction.options.getString('reason');
        if (!reason) reason = "No reason given";

        const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle(` :rotating_light: **${kickUser.username} has been kicked** :rotating_light: !`)
        .setDescription(` *By* : <@${interaction.member.id}> \r *Reason* : ${reason}`)
    
        const dmEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle(' :rotating_light:  **You were kicked ! ** :rotating_light: ')
        .setDescription(`*From* : **${interaction.guild.name}** \r *By* : **<@${interaction.member.id}>** \r *Reason* : **${reason}**`)

        
        await kickMember.send({ embeds: [dmEmbed]}).catch(err =>{
            return;
        })

        await kickMember.kick({reason: reason}).catch(err =>{
            interaction.reply({content: 'There was an error ', ephemeral: true})
        })

        await interaction.reply({ embeds: [embed]});
    }
}