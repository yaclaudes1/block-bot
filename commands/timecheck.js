const fetch = require('node-fetch');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timecheck')
        .setDescription('Displays solve time for last 20 blocks on CHTA & NENG blockchains'),
    async execute(interaction) {
        await interaction.deferReply();

        const NENG_EXPLORER = 'http://nengexplorer.mooo.com:3001/api/';
        const CHTA_EXPLORER = 'http://chtaexplorer.mooo.com:3002/api/';

        // Get current block index and place in corresponding promiseArray

        const getCurrentNengBlockHeightAPI = fetch(NENG_EXPLORER + 'getblockcount').then(response => response.json());
        const getCurrentChtaBlockHeightAPI = fetch(CHTA_EXPLORER + 'getblockcount').then(response => response.json());
        const promiseDataArray = await Promise.all([getCurrentNengBlockHeightAPI, getCurrentChtaBlockHeightAPI]);

        const currentNengBlockHeight = NENG_EXPLORER + 'getblockhash?index=' + (promiseDataArray[0]);
        const currentChtaBlockHeight = CHTA_EXPLORER + 'getblockhash?index=' + (promiseDataArray[1]);

        // Last 20 blocks
        const previousNengBlockHeightAtTwenty = NENG_EXPLORER + 'getblockhash?index=' + (promiseDataArray[0] - 20);
        const previousChtaBlockHeightAtTwenty = CHTA_EXPLORER + 'getblockhash?index=' + (promiseDataArray[1] - 20);

        const getCurrentNengBlockHashAPI = fetch(currentNengBlockHeight).then(response => response.text());
        const getCurrentChtaBlockHashAPI = fetch(currentChtaBlockHeight).then(response => response.text());
        const getPreviousNengBlockHashAPI = fetch(previousNengBlockHeightAtTwenty).then(response => response.text());
        const getPreviousChtaBlockHashAPI = fetch(previousChtaBlockHeightAtTwenty).then(response => response.text());

        const blockHashArray = await Promise.all([getCurrentNengBlockHashAPI, getCurrentChtaBlockHashAPI, getPreviousNengBlockHashAPI, getPreviousChtaBlockHashAPI]);

        // Getblock[hash] info -->Return json/text with info relevant to median timestamp; Note: timestamp with attribute time is based on the miner's time and will have variation between block solves.

        const currentNengBlockHash = NENG_EXPLORER + 'getblock?hash=' + blockHashArray[0];
        const currentChtaBlockHash = CHTA_EXPLORER + 'getblock?hash=' + blockHashArray[1];
        const previousNengBlockHash = NENG_EXPLORER + 'getblock?hash=' + blockHashArray[2];
        const previousChtaBlockHash = CHTA_EXPLORER + 'getblock?hash=' + blockHashArray[3];

        const timeRegEx = (/"mediantime": \d+/i);
        const filterLetterRegEx = (/\D/g);

        const getCurrentNengBlockHashInfoAPI = fetch(currentNengBlockHash).then(response => response.text()).then(extractTime => extractTime.match(timeRegEx)).then(keepNumbers => keepNumbers.toString().replace(filterLetterRegEx, ''));
        const getCurrentChtaBlockHashInfoAPI = fetch(currentChtaBlockHash).then(response => response.text()).then(extractTime => extractTime.match(timeRegEx)).then(keepNumbers => keepNumbers.toString().replace(filterLetterRegEx, ''));
        const getPreviousNengBlockHashInfoAPI = fetch(previousNengBlockHash).then(response => response.text()).then(extractTime => extractTime.match(timeRegEx)).then(keepNumbers => keepNumbers.toString().replace(filterLetterRegEx, ''));
        const getPreviousChtaBlockHashInfoAPI = fetch(previousChtaBlockHash).then(response => response.text()).then(extractTime => extractTime.match(timeRegEx)).then(keepNumbers => keepNumbers.toString().replace(filterLetterRegEx, ''));

        const filteredTimeArray = await Promise.all([getCurrentNengBlockHashInfoAPI, getCurrentChtaBlockHashInfoAPI, getPreviousNengBlockHashInfoAPI, getPreviousChtaBlockHashInfoAPI]);

        const nengTimeTwentyLastTwentyBlocks = Math.round(((filteredTimeArray[0] - filteredTimeArray[2]) / 60));
        const chtaTimeTwentyLastTwentyBlocks = Math.round(((filteredTimeArray[1] - filteredTimeArray[3]) / 60));

        interaction.editReply('Neng solve time for the previous 20 blocks is: ' + nengTimeTwentyLastTwentyBlocks + ' minutes' + '\n\nChta solve time for the previous 20 blocks is: ' + chtaTimeTwentyLastTwentyBlocks + ' minutes');
    }
};
