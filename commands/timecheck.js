const fetch = require('node-fetch');

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timecheck')
        .setDescription('Displays solve time for last 20 blocks on CHTA & NENG blockchains'),
    async execute(interaction) {


        await interaction.deferReply();
        // TODO: After a working prototype is made first task towards easier to read code is to make two arrays/maps one of the specific blockchain url and the other of the specific API components such as getblockcount, etc.
        // Get current block index and place in corresponding promiseArray
        const getCurrentNengBlockHeightAPI = fetch('http://nengexplorer.mooo.com:3001/api/getblockcount').then(response => response.json());
        const getCurrentChtaBlockHeightAPI = fetch('http://chtaexplorer.mooo.com:3002/api/getblockcount').then(response => response.json());
        const promiseDataArray = await Promise.all([getCurrentNengBlockHeightAPI, getCurrentChtaBlockHeightAPI]);

        const currentNengBlockHeight = 'http://nengexplorer.mooo.com:3001/api/getblockhash?index=' + (promiseDataArray[0]);
        const currentChtaBlockHeight = 'http://nengexplorer.mooo.com:3001/api/getblockhash?index=' + (promiseDataArray[1]);

        // Getblockhash[index] and append to promise array after setting lower bounds
        const previousNengBlockHeightAtTwenty = 'http://nengexplorer.mooo.com:3001/api/getblockhash?index=' + (promiseDataArray[0] - 20);
        const previousChtaBlockHeightAtTwenty = 'http://chtaexplorer.mooo.com:3002/api/getblockhash?index=' + (promiseDataArray[1] - 20);
        // hash too big to fit in buffer directly as json so trying string() instead. NOTE:WORKED!


        const getCurrentNengBlockHashAPI = fetch(currentNengBlockHeight).then(response => response.text());
        const getCurrentChtaBlockHashAPI = fetch(currentChtaBlockHeight).then(response => response.text());
        const getPreviousNengBlockHashAPI = fetch(previousNengBlockHeightAtTwenty).then(response => response.text());
        const getPreviousChtaBlockHashAPI = fetch(previousChtaBlockHeightAtTwenty).then(response => response.text());

        const blockHashArray = await Promise.all([getCurrentNengBlockHashAPI, getCurrentChtaBlockHashAPI, getPreviousNengBlockHashAPI, getPreviousChtaBlockHashAPI]);
        // promiseDataArray.concat(blockHashArray);
        // Getblock[hash] info -->Return json with info relevant to timestamp

        const currentNengBlockHash = 'http://nengexplorer.mooo.com:3001/api/getblock?hash=' + blockHashArray[0];
        const currentChtaBlockHash = 'http://chtaexplorer.mooo.com:3002/api/getblock?hash=' + blockHashArray[1];
        const previousNengBlockHash = 'http://nengexplorer.mooo.com:3001/api/getblock?hash=' + blockHashArray[2];
        const previousChtaBlockHash = 'http://chtaexplorer.mooo.com:3002/api/getblock?hash=' + blockHashArray[3];

        const timeRegEx = (/"time": \d+/i);
        const filterLetterRegEx = (/\D/g, '');
         const getCurrentNengBlockHashInfoAPI = fetch(currentNengBlockHash).then(response => response.text()).then(extractTime => extractTime.match(timeRegEx)).then(keepNumbers => keepNumbers.toString().replace(filterLetterRegEx));
         const getCurrentChtaBlockHashInfoAPI = fetch(currentChtaBlockHash).then(response => response.text()).then(extractTime => extractTime.match(timeRegEx)).then(keepNumbers => keepNumbers.toString().replace(filterLetterRegEx));
         const getPreviousNengBlockHashInfoAPI = fetch(previousNengBlockHash).then(response => response.text()).then(extractTime => extractTime.match(timeRegEx)).then(keepNumbers => keepNumbers.toString().replace(filterLetterRegEx));
         const getPreviousChtaBlockHashInfoAPI = fetch(previousChtaBlockHash).then(response => response.text()).then(extractTime => extractTime.match(timeRegEx)).then(keepNumbers => keepNumbers.toString().replace(filterLetterRegEx));

         const filteredTimeArray = await Promise.all([getCurrentNengBlockHashInfoAPI, getCurrentChtaBlockHashInfoAPI, getPreviousNengBlockHashInfoAPI, getPreviousChtaBlockHashInfoAPI ]);

        //
        // ***DONE***S1 fetch Block height and calculate prior 20.
        // ***DONE***S2 ReturnblockHash
        // ***DONE*** S3 use S2 to return block hash stats
        // ***Temp Workaround used regexp to process response.text() + splice string method ***S4 parse JSON and keep time 
        // S5 Get time of currentBlockTime - time of currentBlockTimeMinusTwenty
        // Echo info from S5 as reply in human readable language
        await interaction.editReply('NENG current block height is : ' + promiseDataArray[0] + '\n\nCheetah current block height is: ' + promiseDataArray[1] + '\n\nNENG block current hash is : ' + blockHashArray[0] + '\n\nChta block hash is : ' + blockHashArray[1] + '\n\nNENG block hash at previous 20 blocks is: ' + blockHashArray[2] + '\n\nChta block hash at previous 20 blocks is: ' + blockHashArray[3]);
        // NOTE: multiple edit replies will overwrite previous. a single reply after doesn't work in a defer reply chain.
        await interaction.followUp('\n' + previousNengBlockHeightAtTwenty + '\n' + previousChtaBlockHeightAtTwenty);
        await interaction.followUp('\n' + filteredTimeArray[0] + '\n' + filteredTimeArray[1] + '\n' + filteredTimeArray[2] + '\n' + filteredTimeArray[3]);
       //);

        // Find currentBlockIndexTime - BlockIndex[current - 20] convert into minutes to show length of time to solve last 20 blocks, repeat on both chains');
    },
};
