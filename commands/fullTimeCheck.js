const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fullTimeCheck')
        .setDescription('Displays a full day solve time for last 720 blocks on CHTA & last 1440 blocks on NENG blockchains'),
    async execute(interaction) {
        await interaction.reply('TODO:Find currentBlockIndexTime - BlockIndex[current - 720] convert into minutes to show length of time to solve last 720 blocks(chta)/1440 block (neng), repeat on both chains');
    },
};
