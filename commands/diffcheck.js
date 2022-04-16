const fetch = require('node-fetch');

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('diffcheck')
        .setDescription('Displays NENG & CHTA Difficulty Info'),
    async execute(interaction) {

        interaction.deferReply();
        // TODO: Fix round off issues when a reset for neng is < 0. Show the decimal spaces with conditionals
        const fetchedNengApi = fetch('http://nengexplorer.mooo.com:3001/api/getdifficulty').then(response => response.json());
        const fetchedChtaApi = fetch('http://chtaexplorer.mooo.com:3002/api/getdifficulty').then(response => response.json());
        const allData = await Promise.all([fetchedNengApi, fetchedChtaApi]);
        interaction.editReply('NENG current difficulty is: ' + Number(Math.round(allData[0])).toLocaleString() + '\nCHTA current difficulty is: ' + Number(Math.round(allData[1])).toLocaleString());

    },
};
