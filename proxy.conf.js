const PROXY_CONFIG = [
    {
        context: ['/api'],
        target: 'http://localhost:44323/api',
        secure: true, //para https colocar true
        logLevel: 'debug'
    }
];

module.exports = PROXY_CONFIG;