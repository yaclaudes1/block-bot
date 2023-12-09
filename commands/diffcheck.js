const fetch = require('node-fetch');

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('diffcheck')
        .setDescription('Displays NENG & CHTA Difficulty Info'),
    async execute(interaction) {

        await interaction.deferReply();

        const NENG_EXPLORER = 'http://nengexplorer.mooo.com:3001/api/';
        const CHTA_EXPLORER = 'http://chtaexplorer.mooo.com:3002/api/';

        const fetchedNengApi = fetch(NENG_EXPLORER + 'getdifficulty').then(response => response.json());
        const fetchedChtaApi = fetch(CHTA_EXPLORER + 'getdifficulty').then(response => response.json());
        const allData = await Promise.all([fetchedNengApi, fetchedChtaApi]);
        interaction.editReply('NENG current difficulty is: ' + Number((allData[0]).toFixed(6)).toLocaleString() + '\nCHTA current difficulty is: ' + Number((allData[1]).toFixed(6)).toLocaleString());

    }
};
