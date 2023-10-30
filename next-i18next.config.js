// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const LocizeBackend = require('i18next-locize-backend/cjs');
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const ChainedBackend= require('i18next-chained-backend').default;
// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const LocalStorageBackend = require('i18next-localstorage-backend').default;


const isBrowser = typeof window !== 'undefined';

// eslint-disable-next-line no-undef
module.exports = {
    // debug: true,
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'de', 'it'],
    },
    backend: {
        backendOptions: [{
            expirationTime: 60 * 60 * 1000 // 1 hour
        }, {
            projectId: 'd3b405cf-2532-46ae-adb8-99e88d876733',
            version: 'latest'
        }],
        backends: isBrowser ? [LocalStorageBackend, LocizeBackend] : [],
    },
    serializeConfig: false,
    use: isBrowser ? [ChainedBackend] : []
};