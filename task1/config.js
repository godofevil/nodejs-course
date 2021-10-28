const args = process.argv.slice(2);

module.exports = {
    APP_PORT: process.env.APP_PORT || 4000,
    ENV: args[0] || 'default',
}