// Require dependencies
const { Client } = require('discord.js');
const dotenv = require('dotenv');

//load environmental variables
dotenv.config();

//Instantiate Block-bot

const blockBot = new Client();

//Block-bot Authentication
blockBot.login(process.env.BLOCK_BOT_TOKEN);
