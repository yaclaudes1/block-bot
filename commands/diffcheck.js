const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('diffcheck')
        .setDescription('Displays NENG & CHTA Difficulty Info'),
    async execute(interaction) {
        await interaction.reply('TODO:IMPORT diffcheck API FROM BLOCKCHAIN EXPLORER HERE!');
    },
};
