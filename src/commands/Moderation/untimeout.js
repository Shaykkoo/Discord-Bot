const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('untimeout')
    .setDescription('untimeout a member')
    .addUserOption(option => option.setName('user').setDescription(`The member you want to untimeout`).setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription(`The reason for untiming out the member`).setRequired(true)),
    async execute (interaction) {
        const timeUser = interaction.options.getUser('user');
        const timeMember = await interaction.guild.members.fetch(timeUser.id);


        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) return await interaction.reply({ content: "You must have the moderate members permission.", ephemeral: true});
        if (!timeMember) return await interaction.reply({content: 'The user mentioned is no longer within the server.', ephemeral: true});
        if (!timeMember.kickable) return await interaction.reply({content: 'I cannot untimeout this member, his/her role is above mine.', ephemeral: true});
        if (interaction.member.id === timeMember.id) return await interaction.reply({content: 'You cannot untimeout yourself.', ephemeral: true});
        if (timeMember.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({content: 'You cannot untimeout a member with administrator permission', ephemeral:true});

        let reason = interaction.options.getString('reason') || 'No reason given';
        
        await timeMember.timeout(null, reason);

        const embed = new EmbedBuilder()
        .setColor("Yellow")
        .setDescription(`:white_check_mark: ${timeUser.tag}'s timeout has been **removed** | Reason : ${reason}`)

        const dmEmbed = new EmbedBuilder()
        .setColor("Yellow")
        .setDescription(`:white_check_mark: You have been **untimed out** out in __**${interaction.guild.name}**__. | Reason : ${reason}`)

        await timeMember.send({embeds: [dmEmbed]}).catch(err => {
            return;
        })

        await interaction.reply({embeds: [embed], ephemeral: true})

    }

}