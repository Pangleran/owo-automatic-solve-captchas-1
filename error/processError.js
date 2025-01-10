module.exports = {
    loadError: async function(client) {
        process.on('beforeExit', (code) => {
            sending(code);
        });
        process.on('exit', (error) => {
            sending(error);
        });
        process.on('unhandledRejection', (reason, promise) => {
            sending(reason);
        });
        process.on('rejectionHandled', (promise) => {
            sending(promise);
        });
        process.on('uncaughtException', (error, origin) => {
            sending(error);
        });
        process.on('uncaughtExceptionMonitor', (error, origin) => {
            sending(error);
        });
        process.on('warning', (warning) => {
            sending(warning);
        });
    }
}

async function sending(err) {
    console.clear();
    console.error(err.message);
}