const fetch = require('node-fetch');

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('halvingTimeCheck')
        .setDescription('Displays estimated time for next halving rewards event on NENG & CHTA blockchain.'),
    async execute(interaction) {

        await interaction.deferReply();

       // const fetchedNengApi = fetch('http://nengexplorer.mooo.com:3001/api/getdifficulty').then(response => response.json());
        //const fetchedChtaApi = fetch('http://chtaexplorer.mooo.com:3002/api/getdifficulty').then(response => response.json());
        //const allData = await Promise.all([fetchedNengApi, fetchedChtaApi]);
        //await interaction.editReply('NENG current difficulty is: ' + allData[0] + '\nCHTA current difficulty is: ' + allData[1]);

    },
};
