const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const translate = require('@iamtraction/google-translate');

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`translate`)
    .setDescription(`Translator`)
    .addStringOption(option => option.setName('message').setDescription(`Message you want to translate`).setRequired(true))
    .addStringOption(option => option.setName('language').setDescription(`The language you want to translate to`).addChoices(
        { name : 'English', value : 'en'},
        { name : 'French', value : 'fr'},
        { name : 'German', value : 'de'},
        { name : 'Portugese', value : 'pt'},
        { name : 'Spanish', value : 'es'},
        { name : 'Italian', value : 'it'},
        { name : 'Russian', value : 'ru'},
        { name : 'Japanese', value : 'ja'},
        { name : 'Arabic', value : 'ar'},
    ).setRequired(true)),
    async execute(interaction) {

        const { options } = interaction;
        const text = options.getString('message');
        const lan = options.getString('language');

        await interaction.reply({ content: '🛠 Translating your message... '});

        const applied =  await translate(text, { to: `${lan}`});

        const embed = new EmbedBuilder()
        .setColor("Purple")
        .setTitle('🔎 Translate successful')
        .addFields({ name : 'Original Text : ', value: `\`\`\`${text}\`\`\``, inline: true})
        .addFields({ name : 'Translated Text : ', value: `\`\`\`${applied.text}\`\`\``, inline: false })

        await interaction.editReply({ content : '', embeds: [embed]})
    }
}