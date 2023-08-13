const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions } = require('discord.js');

const prefix = '>';

const client = new Client ({ intents:  [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on("ready", () =>{
    console.log("Bot is Online");

    const activities = [
        'Dracz\'s Slave',
        'Looking at Hkzk',
        'Top 1 EU Guild'
    ]
     
    setInterval(() => {
        const status = activities[Math.floor(Math.random() * activities.length)];
        client.user.setPresence({activities: [{name: `${status}`}]})
    }, 5000);
})

client.on("messageCreate", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);

    const command = args.shift().toLowerCase();

    // Message array

     const messageArray = message.content.split(" ");
     const argument = messageArray.slice(1);
     const cmd = messageArray[0];

    // Commands

// Hk command

if (command === 'hk') {
    message.channel.send("The Strongest")
}

// Ban Command

if (command === 'ban') {
    const member = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" " || x.user.username === argument[0] ));

    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return message.channel.send("You don't have permissions to ban people in this server.");
    if (!member) return message.channel.send("You must specify someone !")
    if (message.member === member) return message.channel.send("You cannot ban yourself.");
    if (!member.kickable) return message.channel.send("You cannot ban this person !");

    /* if (!argument[0]) return message.channel.send("You must specify someone to ban !"); */

    let reason = argument.slice(1).join(" ") || "No reason given."

    const embed = new EmbedBuilder()
    .setColor("Red")
    .setDescription(`:white_check_mark: ${member.user.tag} has been __**banned**__  | ${reason}`)

    const dmEmbed = new EmbedBuilder()
    .setColor("Red")
    .setDescription(`:white_check_mark: You were **banned** from ${message.guild.name} | ${reason}`)

    member.send({embeds: [dmEmbed]}).catch(err =>  {
        console.log(`${member.user.tag} has their DMs off and cannot receive the ban message.`)
    })

    member.ban().catch(err => {
        message.channel.send("There was an error banning this member")
    })

    message.channel.send({ embeds: [embed] });
}
 










}) 















client.login("MTEzODQ4ODI5OTI3OTg5MjU5Mg.GvX1tY._0mnuXGKNdv2iyhpR8laWpeKc4Hyw5GxrkzphU");