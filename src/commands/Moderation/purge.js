const { SlashCommandBuilder } = require('@discordjs/builders');
const {IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription(`Purge channel messages`)
    .addIntegerOption(option => option.setName('amount').setDescription(`amount of message you want to delete`).setMinValue(1).setMaxValue(100).setRequired(true)),
    async execute(interaction) {

        const embedRefused = new EmbedBuilder()
        .setColor("red")
        .setDescription("❌ You dont have permission to purge message")

        if (!interaction.member.permission.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({embed: [embedRefused], ephemeral : true})
        
        let number = interaction.option.getInteger('amount');

        const embed = new EmbedBuilder()
        .setColor("green")
        .setDescription(`✅ Deleted ${number} messages`)

        await interaction.channel.bulkDelete(number)

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`purge`)
            .setEmoji(`🗑`)
            .setStyle(ButtonStyle.Danger),
        )

        const message = await interaction.reply({embed: [embed], components: [button]});

        const collector = message.createComponentColector();

        collector.on("Collect", async i => {
            if(i.customId === 'purge') {
                if (!i.member.permission.has(PermissionsBitField.Flags.ManageMessages)) return;

                interaction.deleteReply();
            }
        })
    }
}