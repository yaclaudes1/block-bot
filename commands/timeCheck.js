const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeCheck')
        .setDescription('Displays solve time for last 20 blocks on CHTA & NENG blockchains'),
    async execute(interaction) {
        await interaction.reply('Find currentBlockIndexTime - BlockIndex[current - 20] convert into minutes to show length of time to solve last 20 blocks, repeat on both chains');
    },
};
