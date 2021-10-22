const args = process.argv.slice(2);
const data = {};

args.map((item, idx) => {
    if (idx % 2 === 1) {
        data[args[idx - 1].slice(2)] = item;
    }
});

module.exports = {
    APP_PORT: process.env.APP_PORT || 4000,
    ENV: data.env || 'default',
}