const fetch = require('node-fetch');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fulltimecheck')
        .setDescription('Displays a full day solve time for last 720 blocks on CHTA & last 1440 blocks on NENG blockchains'),
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

        // Full day's worth --> 720:CHTA, 1440:NENG
        const previousNengBlockHeightAtFourteenFourty = NENG_EXPLORER + 'getblockhash?index=' + (promiseDataArray[0] - 1440);
        const previousChtaBlockHeightAtSevenTwenty = CHTA_EXPLORER + 'getblockhash?index=' + (promiseDataArray[1] - 720);


        const getCurrentNengBlockHashAPI = fetch(currentNengBlockHeight).then(response => response.text());
        const getCurrentChtaBlockHashAPI = fetch(currentChtaBlockHeight).then(response => response.text());
        const getPreviousNengBlockHashAPI = fetch(previousNengBlockHeightAtFourteenFourty).then(response => response.text());
        const getPreviousChtaBlockHashAPI = fetch(previousChtaBlockHeightAtSevenTwenty).then(response => response.text());

        const blockHashArray = await Promise.all([getCurrentNengBlockHashAPI, getCurrentChtaBlockHashAPI, getPreviousNengBlockHashAPI, getPreviousChtaBlockHashAPI]);

        // Getblock[hash] info -->Return json/text with info relevant to median timestamp; Note: timestamp with attribute time is based on the miner's time and will have variation between block solves.
        // Modify time check command code to handle a full's day (block time) worth of time
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

        const nengTimeLastFourteenFortyBlocks = Math.round(((filteredTimeArray[0] - filteredTimeArray[2]) / 60));
        const chtaTimeLastSevenTwentyBlocks = Math.round(((filteredTimeArray[1] - filteredTimeArray[3]) / 60));


        interaction.editReply('Neng solve time for the previous 1440 blocks is: ' + nengTimeLastFourteenFortyBlocks + ' minutes' + '\n\nChta solve time for the previous 720 blocks is: ' + chtaTimeLastSevenTwentyBlocks + ' minutes');
    }
};
