// Require dependencies
const fetch = require('node-fetch');
const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');

require('dotenv').config();
const TOKEN = process.env['TOKEN'];


// Instantiate Block-bot with its independent commands
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

// Block-bot Authentication
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('interactionCreate', async interaction => {

    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;


    try {
        await command.execute(interaction);
    }

    catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }


});

// Login to Discord with blockBot's token
client.login(TOKEN);
