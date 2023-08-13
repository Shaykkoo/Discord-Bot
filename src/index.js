require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, IntentsBitField, PermissionsBitField, Permissions, MessageManager, Embed, Collection, Events, Activity, ComponentType } = require(`discord.js`);
const fs = require('fs');
const { Stream } = require('stream');

const prefix = '>';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] }); 

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
});

const process = require('node:process')

process.on('unhandleddRejection', async (reason, promise) => {
    console.log(`Unhandled Rejection at:`, promise, `reason`, reason);
})

process.on('uncaughtException', (err) => {
    console.log(`Uncaught Expectation`, err);
})

process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(`Uncaught Expection Monitor`, err, origin);
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
})

client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");


(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.login(process.env.token)
})();

// Embeds & Buttons //

        // Recruitment Embed
        const embedRecruitment = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("**Welcome to GitGud Recruitment**")
        .setURL("https://discord.gg/NkDSpXKf7z")
        .setDescription('**To join GitGud, you have to meet the conditions below !** __**You will have to send screenshots later !**__ ')
        .setThumbnail(`https://cdn.discordapp.com/attachments/1082808904322384083/1082808904565669969/gitgud-thepruld.gif`)
        .addFields({name: `📜**・Conditions :**`, value: `>>> <:levelup:1139002916942925825> Level 10.000. 
                                                            \r  <:Contrib:1139001315138220032> 600.000 Contribution Weekly in your previous guild. 
                                                            \r  <:Tier_icon:1139001835806531664> Tier 24 Weekly. 
                                                            \r  <:HoL:1139199071714807918> Good Craftings with Blue Lines such as : **+2, Demon Power, Manticore**.`, inline: true})
        .addFields({name: ` `, value: `*If you don't meet the conditions you can still click on **visitor** button to talk with other GitGud member :speech_left: * `, inline: false})
        .addFields({name: ` `, value: `__*If you need help to improve, join the Raid the Dungeon server with link in my profile 😉*__ `, inline: false})
        .setFooter({ text: "GitGud", iconURL: `https://cdn.discordapp.com/attachments/1004032905636495434/1138839802859491410/image.png`}
    ); 

    const buttonIMC = new ButtonBuilder()
        .setCustomId('meetCond-button')
        .setLabel('I Meet Conditions')
        .setEmoji(`✅`)
        .setStyle(ButtonStyle.Success)      
        
    const rowIMC = new ActionRowBuilder()
        .addComponents(buttonIMC);
    

        // Meet Conditions Embed

    const embedMC = new EmbedBuilder()
        .setColor("Green")
        .addFields({name: " ", value: '<a:Check:1139204240326262834> You have now <@&1139195888741400677> role, go in to continue the recruitment <#1139360074830204969>. '})
        .setFooter({ text: "GitGud", iconURL: `https://cdn.discordapp.com/attachments/1004032905636495434/1138839802859491410/image.png`}
        ); 

    const embedVisitor = new EmbedBuilder()
        .setColor("Yellow")
        .addFields({name: " ", value: '<a:Check:1139204240326262834> You have now <@&1138944347400843294> role. '})
        .setFooter({ text: "GitGud", iconURL: `https://cdn.discordapp.com/attachments/1004032905636495434/1138839802859491410/image.png`}
        ); 

// Events //


client.on(Events.InteractionCreate, async interaction => {   // Recrutement
    if (interaction.customId !== 'recruitment-button') return;

    if (interaction.customId === 'recruitment-button') {

        const member = interaction.member;

        if (member.roles.cache.some(role => role.name === 'Member') ) {
            await interaction.reply({ content: `You can't do the recruitment since you are already a <@&1014525605364113548>`, ephemeral: true});
        };
        if (member.roles.cache.some(role => role.name === 'Officer') ) {
            await interaction.reply({ content: `You can't do the recruitment since you are already an <@&1069252431394910300>`, ephemeral: true});
        };


        await interaction.reply({embeds: [embedRecruitment], components: [rowIMC], ephemeral: true});
    }
});


client.on(Events.InteractionCreate, async interaction => { // Visiteur
    
    if (interaction.customId !== 'visitor-button') return; 

    const member2 = interaction.member;

    if (member2.roles.cache.some(role => role.name === 'Member') ) {
        await interaction.reply({ content: `You can't pick the  <@&1138944347400843294> role since you are already a <@&1014525605364113548>`, ephemeral: true});
    };
    if (member2.roles.cache.some(role => role.name === 'Officer') ) {
        await interaction.reply({ content: `You can't pick the  <@&1138944347400843294> role since you are already an <@&1069252431394910300>`, ephemeral: true});
    };

    const myGuild = client.guilds.cache.get('1014524762178994247');
    const role1 = myGuild.roles.cache.find(role => role.name === 'Visitor');

    const collector = interaction.channel.createMessageComponentCollector();

    collector.on('collect', async (i) =>{
    
        
        const member = i.member;

        

        if (i.customId == 'visitor-button' && member.roles.cache.some(role => role.name !== 'Visitor') ) {
            member.roles.add(role1);
            await i.reply({ embeds: [embedVisitor], ephemeral: true});
        };
        

    })

    collector.on('end', async (collected) => {
        console.log(`Collected ${collected.size} interactions.`);
    });
    
});

// Event 2nd embed

client.on(Events.InteractionCreate, async interaction => {

    if (interaction.customId !== 'meetCond-button') return;

    const myGuild = client.guilds.cache.get('1014524762178994247');
    const role1 = myGuild.roles.cache.find(role => role.name === 'Conditions Meet');

    const member = interaction.member;


    if (interaction.customId == 'meetCond-button' && member.roles.cache.some(role => role.name !== 'Conditions Meet') ) {
        member.roles.add(role1);
        await interaction.reply({embeds: [embedMC], ephemeral: true}); 
    }
});
 


// Rich presence

/* const ID = '1138488299279892592';
const DiscordRPC = require("discord-rpc");
const RPC = new DiscordRPC.Client({ transport: "ipc" });

DiscordRPC.register(ID);


async function activity() {
  if (!RPC) return;

  RPC.setActivity({
    details: "League of Legends",
    state: "Ranked",
    largeImageKey: "https://pbs.twimg.com/profile_images/1146442344662798336/X1Daf_aS_400x400.png",
    largeimagetext: "U.GG",
    smallImageKey: "https://yt3.googleusercontent.com/V3r1ulI_qpPjFwr0Nq5y2d0LewJaGlyJyrfK9u9jGEuBQfCQ2vbh6Pc5DcXHkucyi9FCYGSG=s900-c-k-c0x00ffffff-no-rj",
    smallImageText: "League of Legends",
    instance: false,
    startTimestamp: Date.now(),
    buttons: [
        {
            label: `Šhaykkø`,
            url: `https://u.gg/lol/profile/euw1/%C5%A1haykk%C3%B8/overview`
        },
        {
            label: `Okkyahs`,
            url: `https://u.gg/lol/profile/euw1/okkyahs/overview`
        },
    ],
  });
}

RPC.on("ready", async () => {
    console.log("RPC Presence Up");
    activity();
  
    setInterval(() => {
      activity();
    }, 15000);
  });


RPC.login({ clientId: ID }); */




