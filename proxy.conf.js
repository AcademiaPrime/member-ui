const PROXY_CONFIG = [
    {
        context: [
        ],
        target: 'http://localhost:8080',
        secure: false,
        changeOrigin: true,
        logLevel: 'debug',
        headers: {host: 'localhost'}
    },
];

module.exports = PROXY_CONFIG;
