// Require dependencies
//const { Client } = require('discord.js');
//const dotenv = require('dotenv');

//load environmental variables
require('dotenv').config();

//Instantiate Block-bot

const Discord = require('discord.js');
const blockBot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

//Block-bot Authentication

blockBot.on('ready', () => {
    console.log(`Logged in as ${blockBot.user.tag}!`);
});





blockBot.on('messageCreate', message => {

// blockBot's commands starting with '!' start here:


if (message.content.substring(0, 1) == '!') {

    var args = message.content.substring(1).split(' ');

    var command = args[0].toLowerCase();


    args = args.splice(1);
    

    switch(command) {

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

    switch(command) {

        // ?help
        case 'help':
            
            message.reply('TODO:IMPORT help list!'); 
        
            break;
            
        default:
            
            message.reply('Incorrect command entered. Please try again!');

        // MORE COMMANDS IF NECESSARY

     }

 } 
 
 if (message.content.substring(0, 1) == '?' && message.content.substring(0, 1) == '!' ) {

       message.reply('Incorrect command/format entered. Please try again!'); 
        
          


 } 
 

});//end of commands input (


blockBot.login(process.env.BLOCK_BOT_TOKEN);
