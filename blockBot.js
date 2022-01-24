// Require dependencies
const fetch = require('node-fetch');
const { token } = require('dotenv').config();
const { Client, Intents } = require('discord.js');


// Instantiate Block-bot
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Block-bot Authentication
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('messageCreate', message => {

    // client's commands starting with '!' start here:

    if (message.content.substring(0, 1) == '!') {
        var args = message.content.substring(1).split(' ');
        var command = args[0].toLowerCase();


        args = args.splice(1);

        switch (command) {

        // !DiffCheck

        case 'diffcheck':

            message.reply('TODO:IMPORT diffcheck API FROM BLOCKCHAIN EXPLORER HERE! ');
            break;

        // !FullTimeCheck
        case 'fulltimecheck':

            message.reply('TODO:IMPORT Fulltimecheck API FROM BLOCKCHAIN EXPLORER HERE!');
            break;

        // !TimeCheck
        case 'timecheck':

            message.reply('TODO:IMPORT TimeCheck API FROM BLOCKCHAIN EXPLORER HERE!');
            break;

        default:

            message.reply('Incorrect command entered. Please try again!');


        // MORE COMMANDS IF NECESSARY

        }

    }


    else if (message.content.substring(0, 1) == '?') {

        var args = message.content.substring(1).split(' ');

        var command = args[0].toLowerCase();


        args = args.splice(1);

        switch (command) {

        // ?help
        case 'help':

            message.reply('Block Bot - Check NENG & CHTA Block Info\n-----------------------------------------------------------------------------------------------\n!DiffCheck: Displays NENG & CHTA Difficulty Info\n!FullTimeCheck: Displays time for last 720 (CHTA) & 1440 (NENG) taken to solve \n!TimeCheck: Displays time for last 20 (CHTA) & 20 (NENG) taken to solve \n?Help: Shows this message \n-----------------------------------------------------------------------------------------------\nDisclaimer: Commands are not case sensitive.'); 

            break;

        default:

            message.reply('Incorrect command entered. Please try again!');

        // MORE COMMANDS IF NECESSARY

        }

    }

    if (message.content.substring(0, 1) == '?' && message.content.substring(0, 1) == '!' ) {

        message.reply('Incorrect command/format entered. Please try again!'); 


    }

});

// Login to Discord with blockBot's token
client.login(token);
