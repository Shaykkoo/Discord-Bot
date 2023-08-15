const { SlashCommandBuilder } = require('@discordjs/builders');
const {IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription(`Purge channel messages`)
    .addIntegerOption(option => option.setName('amount').setDescription(`amount of message you want to delete`).setMinValue(1).setMaxValue(100).setRequired(true)),
    async execute(interaction) {

        const embedRefused = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`You dont have permission to purge message`)

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({embeds: [embedRefused], ephemeral : true});
        
        let number = interaction.options.getInteger('amount');

        const embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`Deleted **${number}** messages`)

        await interaction.channel.bulkDelete(number)

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('purge-button')
            .setEmoji('🗑')
            .setStyle(ButtonStyle.Danger),
        )

        const message = await interaction.reply({embeds: [embed], components: [button]});

        const collector = message.createMessageComponentCollector();

        collector.on("collect", async i => {
            if(i.customId === 'purge-button') {
                if (!i.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return;

                interaction.deleteReply();
            }
        })
    }
}