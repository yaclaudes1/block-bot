const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timecheck')
        .setDescription('Displays time for last 20 (CHTA) & 20 (NENG) taken to solve'),
    async execute(interaction) {
        await interaction.reply('TODO:IMPORT diffcheck API FROM BLOCKCHAIN EXPLORER HERE!');
    },
};
