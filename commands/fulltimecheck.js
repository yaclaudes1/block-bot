const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fulltimecheck')
        .setDescription('Displays time for last 720 (CHTA) & 1440 (NENG) taken to solve'),
    async execute(interaction) {
        await interaction.reply('TODO:IMPORT diffcheck API FROM BLOCKCHAIN EXPLORER HERE!');
    },
};
