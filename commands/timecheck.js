const fetch = require('node-fetch');

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timecheck')
        .setDescription('Displays solve time for last 20 blocks on CHTA & NENG blockchains'),
    async execute(interaction) {


        await interaction.deferReply();

        //Get current block index
        const fetchedNengApi = fetch('http://nengexplorer.mooo.com:3001/api/getblockcount').then(response => response.json());
        const fetchedChtaApi = fetch('http://chtaexplorer.mooo.com:3002/api/getblockcount').then(response => response.json());

       

        const allData = await Promise.all([fetchedNengApi, fetchedChtaApi]);
        //TODO: change to const iff vars are never reused again.
        const currentNengBlockHeight = allData[0];
        const currentChtaBlockHeight = allData[1]; 
        const previousNengBlockHeightAtTwenty = currentNengBlockHeight - 20;
        const previousChtaBlockHeightAtTwenty = currentChtaBlockHeight - 20;
        
        // 
        //***DONE***S1 fetch Block height and calculate prior 20.
        //S2 ReturnblockHash
        //S3 use S2 to return block hash stats
        //S4 parse JSON and keep time
        //S5 Get time of currentBlockTime - time of currentBlockTimeMinusTwenty
        //Echo info from S5 as reply in human readable language
      //  await interaction.editReply('NENG current block minus twenty is : ' + currentNengBlockMinusTwenty + '\nCheetah current block minus twenty is: ' + currentChtaBlockMinusTwenty);
       // NOTE: multiple edit replies will overwrite previous. a single reply after doesn't work in a defer reply chain.
      // await interaction.followUp('Find currentBlockIndexTime - BlockIndex[current - 20] convert into minutes to show length of time to solve last 20 blocks, repeat on both chains');
    },
};
