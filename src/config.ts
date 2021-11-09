const args = process.argv.slice(2);

interface Config {
    APP_PORT: number,
    ENV: string,
}

export const config: Config = {
    APP_PORT: Number(process.env.APP_PORT) || 4000,
    ENV: args[0] || 'default',
}